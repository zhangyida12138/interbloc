import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faUser, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';
import { getAllServers, createServer } from '../../api';

function Server() {
  const [show, setShow] = useState(false);
  const [servers, setServers] = useState([]);
  const [newServer, setNewServer] = useState({ host: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await getAllServers();
      if (response.success) {
        setServers(response.data);
        setSearchResults(response.data);
        setTotalItems(response.data.length);
      } else {
        console.error('Failed to fetch servers:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNewServer({ host: '' });
    setShow(true);
  };

  const handleAddServer = async () => {
    const serverData = {
      host: newServer.host,
      portNumber: 3306, // Default port number
    };
    try {
      const response = await createServer(serverData);
      if (response.success) {
        fetchServers();
        handleClose();
        showNotification('success', 'Success', 'Added new server successfully');
      } else {
        console.error('Failed to add server:', response.errorMessage);
        showNotification('error', 'Error', 'Failed to add server');
      }
    } catch (error) {
      console.error('Error adding server:', error);
      showNotification('error', 'Error', 'Failed to add server');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewServer({ ...newServer, [name]: value });
  };

  const handleSearch = () => {
    const results = servers.filter(server => 
      server.id.toString().includes(searchTerm) || (server.host && server.host.includes(searchTerm))
    );
    setSearchResults(results);
    setTotalItems(results.length);
  };

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container className="mt-4">
        {notification && (
          <div className={`notification-bar ${notification.type}`}>
            <div>
              <strong>{notification.title}</strong><br />
              {notification.message}
            </div>
            <button className="close-btn" onClick={() => setNotification(null)}>×</button>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center custom-margin">
          <h2>Server Management</h2>
          <Button variant="primary" onClick={handleShow} className="custom-primary">Add New Server</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center custom-margin">
          <div className="d-flex align-items-center search-container">
            <input
              type="text"
              placeholder="Search by ID or Host"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
            <Button onClick={handleSearch} className="custom-button-search">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
          <div className="d-flex align-items-center ml-auto">
            <span className="mr-2">Total Items: {totalItems}</span>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Server ID</th>
              <th>Host</th>
              <th>Database Count</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((server) => (
              <tr key={server.id}>
                <td>{server.id}</td>
                <td>{server.host}</td>
                <td>{server.databases.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal className="custom-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Server</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formServerHost">
                <Form.Label className="form-label">Server Host</Form.Label>
                <Form.Control
                  type="text"
                  name="host"
                  value={newServer.host}
                  onChange={handleChange}
                  placeholder="Enter server host"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddServer}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Server;
