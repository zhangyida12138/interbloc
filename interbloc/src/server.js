// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());

// const corsOptions = {
//     origin: 'http://localhost:3000', // 允许访问的来源
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//     optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));

// // 处理预检请求
// app.options('*', cors(corsOptions));

// app.use('/api', async (req, res) => {
//     if (req.method === 'OPTIONS') {
//         // 处理预检请求
//         console.log('Received OPTIONS request');
//         return res.sendStatus(204);
//     }

//     const apiUrl = `https://cdxsetximf.execute-api.eu-west-2.amazonaws.com/Prod/api${req.url}`;
//     const token = req.headers.authorization ? req.headers.authorization : '';

//     console.log(`Proxying request: ${req.method} ${apiUrl} with body: ${JSON.stringify(req.body)}`);
//     // console.log(`Authorization: ${token}`);

//     if (!token) {
//         console.log('No authorization token found');
//         return res.status(401).send('Unauthorized');
//     }

//     const options = {
//         url: apiUrl,
//         method: req.method,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//         },
//         data: req.body
//     };

//     try {
//         const response = await axios(options);
//         console.log(`Response from API: ${response.status} - ${JSON.stringify(response.data)}`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         if (error.response) {
//             console.error(`Error response from API: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
//             res.status(error.response.status).send(error.response.data);
//         } else {
//             console.error(`Error making request to API: ${error.message}`);
//             res.status(500).send(error.message);
//         }
//     }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000', // 允许访问的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // 允许跨域请求

app.options('*', cors(corsOptions)); // 处理所有的预检请求

app.use('/api', async (req, res) => {
    const apiUrl = `https://cdxsetximf.execute-api.eu-west-2.amazonaws.com/Prod/api${req.url}`;
    const token = req.headers.authorization ? req.headers.authorization : '';

    console.log(`Proxying request: ${req.method} ${apiUrl} with body: ${JSON.stringify(req.body)}`);

    if (!token) {
        console.log('No authorization token found');
        return res.status(401).send('Unauthorized');
    }

    const options = {
        url: apiUrl,
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: req.body
    };

    try {
        const response = await axios(options);
        console.log(`Response from API: ${response.status} - ${JSON.stringify(response.data)}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            console.error(`Error response from API: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            res.status(error.response.status).send(error.response.data);
        } else {
            console.error(`Error making request to API: ${error.message}`);
            res.status(500).send(error.message);
        }
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
