import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css'; // Import the CSS file

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/admin/dashboard" className="d-flex align-items-center">
        <img
          src="../../../logo.svg"
          alt="Logo"
          className="d-inline-block align-top logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin/manage-tenant" className="nav-link-custom">Manage Tenant</Nav.Link>
          <Nav.Link as={Link} to="/admin/manage-survey" className="nav-link-custom">Manage Survey</Nav.Link>
          <Nav.Link as={Link} to="/admin/manage-superuser" className="nav-link-custom">Manage Superuser</Nav.Link>
          <Nav.Link as={Link} to="/admin/superuser-register" className="nav-link-custom">Superuser Register</Nav.Link>
          <Nav.Link as={Link} to="/admin/login" className="nav-link-custom">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
