import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginAdmin.css'; // Import the CSS file

function LoginCustomer() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/customer/dashboard'); // turn to dashboard page after login
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center login-container">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="login-box">
            <div className="logo-container text-center mb-4">
              <img src="../../../logo.svg" alt="Logo" className="logo" />
            </div>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <span className="password-icon">&#128065;</span>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4 login-button">
                LOGIN
              </Button>
            </Form>
            <div className="text-center mt-4">
              <span>Don't have an account? <a className='QuickLink' onClick={() => navigate('/customer/register')}>Sign Up</a></span>
            </div>
            <div className="text-center mt-4">
              <span>Forgot password? <a className='QuickLink' onClick={() => navigate('/customer/send-code')}>Reset Password</a></span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginCustomer;
