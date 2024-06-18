const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url} with body: ${JSON.stringify(req.body)}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 配置AWS SDK
AWS.config.update({ region: 'eu-west-2' });

const cognito = new AWS.CognitoIdentityServiceProvider();

// 获取JWT token的端点
app.post('/api/auth', (req, res) => {
  const options = {
    url: 'https://cognito-idp.eu-west-2.amazonaws.com/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
    },
    json: true,
    body: {
      AuthParameters: {
        USERNAME: "uniAdmin@intebloc.com",
        PASSWORD: "Pa$$wordUn!v3rs!ty"
      },
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "5usjjfgg2ap4pt4uboaocsv72"
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send(error);
    } else {
      console.log('Response from Cognito:', body);
      if (response.statusCode === 200) {
        res.status(200).send(body.AuthenticationResult);
      } else {
        res.status(response.statusCode).send(body);
      }
    }
  });
});

// 添加用户到Cognito的端点
app.post('/api/addUserToCognito', (req, res) => {
  const { username, email } = req.body;

  const params = {
    UserPoolId: 'eu-west-2_SLJKn90dj',
    Username: username,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      }
    ],
    TemporaryPassword: 'TempPass123!'
  };

  cognito.adminCreateUser(params, (err, data) => {
    if (err) {
      console.error('Error adding user to Cognito:', err);
      res.status(500).send(err);
    } else {
      console.log('User added to Cognito:', data);
      res.status(200).send({ uuid: data.User.Username }); // 返回用户UUID
    }
  });
});

// 代理API请求并使用JWT token
app.use('/api', (req, res) => {
  console.log(`Proxying request: ${req.method} ${req.url} with body: ${JSON.stringify(req.body)}`);
  const apiUrl = `https://2rk4fbmjib.execute-api.eu-west-2.amazonaws.com/Prod${req.url}`;
  const options = {
    url: apiUrl,
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization
    },
    json: true,
    body: req.body
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send(error);
    } else {
      console.log('Response from API:', body);
      res.status(response.statusCode).send(body);
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send({ error: 'Unexpected error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
