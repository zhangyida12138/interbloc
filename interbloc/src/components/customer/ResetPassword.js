import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginAdmin.css'; // Import the CSS file

function ResetPassword() {
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    // add reset password logic here
    navigate('/customer/login'); // after reseting the password turn to the login page
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center reset-container">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="reset-box">
            <div className="logo-container text-center mb-4">
              <img src="../../../logo.svg" alt="Logo" className="logo" />
            </div>
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleResetPassword}>
              <Form.Group controlId="formNewPassword" className="mt-3 text-left">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="New Password" />
              </Form.Group>

              <Form.Group controlId="formConfirmNewPassword" className="mt-3 text-left">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm New Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4 reset-button">
                RESET PASSWORD
              </Button>
            </Form>
            <div className="text-center mt-4">
              <span>Remembered your password? <a className='QuickLink' onClick={() => navigate('/login')}>Login</a></span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
