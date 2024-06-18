import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import '../../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
