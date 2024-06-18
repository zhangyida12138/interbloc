import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginAdmin.css'; // Import the CSS file

function SendCode() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  const handleSendCode = (e) => {
  e.preventDefault();
  // You can add the logic of sending verification code here
  setCodeSent(true);
  };

  const handleVerifyCode = (e) => {
  e.preventDefault();
  // You can add the logic of verifying verification code here
  navigate('/reset'); // After successful verification, jump to the password reset page
  };

  return (
  <Container fluid className="vh-100 d-flex justify-content-center align-items-center sendcode-container">
    <Row className="w-100">
    <Col md={6} lg={4} className="mx-auto">
      <div className="sendcode-box">
      <div className="logo-container text-center mb-4">
        <img src="../../../logo.svg" alt="Logo" className="logo" />
      </div>
      <h2 className="text-center mb-4">Send Verification Code</h2>
      {!codeSent ? (
        <Form onSubmit={handleSendCode}>
        <Form.Group controlId="formBasicEmail" className="text-left">
          <Form.Label>Email</Form.Label>
          <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-4 sendcode-button">
          Send Code
        </Button>
        </Form>
      ) : (
        <Form onSubmit={handleVerifyCode}>
        <Form.Group controlId="formBasicCode" className="text-left">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-4 sendcode-button">
          Verify Code
        </Button>
        </Form>
      )}
      </div>
    </Col>
    </Row>
  </Container>
  );
}

export default SendCode;