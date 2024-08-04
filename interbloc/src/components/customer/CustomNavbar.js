import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser } from '../../AuthService';
import '../../styles/Dashboard.css'; // Import the CSS file

function CustomNavbar() {
  const navigate = useNavigate();
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        // Assuming user.attributes contains the user's roles or groups
        setIsSuperUser(user.attributes['custom:isSuperUser'] === 'true');
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/customer/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

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
          {/* <Nav.Link as={Link} to="/customer/container" className="nav-link-custom">Container</Nav.Link> */}
          <Nav.Link as={Link} to="/customer/reset" className="nav-link-custom">Reset Password</Nav.Link>
          <Nav.Link onClick={handleLogout} className="nav-link-custom">Log out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
