import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/LoginAdmin.css'; // Import the CSS file
import CustomNavbar from './CustomNavbar';

function SuperuserRegister() {
  return (
    <div className="dashboard-container">
      <CustomNavbar />
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center register-container">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <div className="register-box">
            <div className="logo-container text-center mb-3">
              <img src="../../logo.svg" alt="Logo" className="logo"/>
            </div>
            <h2 className="text-center mb-3">Super User Register</h2>
            <Form>
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

              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>

              <Form.Text className="text-muted mt-2">
                By registering, you agree to our Terms and Conditions and Privacy Policy.
              </Form.Text>

              <Button variant="primary" type="submit" className="w-100 mt-3 register-button">
                REGISTER
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already have an account? <a href="/login">Login</a></span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default SuperuserRegister;
