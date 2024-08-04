import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../AuthService';
import '../../styles/Dashboard.css'; // Import the CSS file

function CustomNavbar() {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

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
          <Nav.Link as={Link} to="/admin/manage-database" className="nav-link-custom">Database</Nav.Link>
          <Nav.Link as={Link} to="/admin/manage-server" className="nav-link-custom">Server</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleLogout} className="nav-link-custom">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
