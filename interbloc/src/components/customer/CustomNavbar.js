import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css'; // Import the CSS file

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/customer/dashboard" className="d-flex align-items-center">
        <img
          src="../../../logo.svg"
          alt="Logo"
          className="d-inline-block align-top logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/customer/mySurvey" className="nav-link-custom">My Survey</Nav.Link>
          <Nav.Link as={Link} to="/customer/admin" className="nav-link-custom">Admin</Nav.Link>
          {/* need add fuction here. Hide admin when user is not superuser */}
          <Nav.Link as={Link} to="/customer/login" className="nav-link-custom">Log out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
