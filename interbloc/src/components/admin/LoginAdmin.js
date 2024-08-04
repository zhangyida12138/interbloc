import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../AuthService'; // Import the signIn function
import '../../styles/LoginAdmin.css';

function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password, 'admin'); // Pass 'admin' as userType
      navigate('/Admin/dashboard'); // Navigate to dashboard page after login
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center login-container">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="login-box">
            <div className="logo-container text-center mb-4">
              <img src="../../../intebloc.png" alt="Logo" className="logo" />
            </div>
            <h2 className="text-center mb-4">Admin Login</h2>
            <Form onSubmit={handleLogin}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4 login-button">
                LOGIN
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAdmin;
