import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginAdmin.css'; // Import the CSS file

function RegisterCustomer() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // add register logic here
    navigate('/customer/login'); // after register , turn to login page
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center register-container">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="register-box">
            <div className="logo-container text-center mb-4">
              <img src="../../../logo.svg" alt="Logo" className="logo" />
            </div>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4 register-button">
                REGISTER
              </Button>
            </Form>
            <div className="text-center mt-4">
              <span>Already have an account? <a className='QuickLink' onClick={() => navigate('/login')}>Login</a></span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterCustomer;
