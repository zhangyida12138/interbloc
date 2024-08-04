import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getAllServers, createDatabase } from '../../api';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';

function Database() {
  const [show, setShow] = useState(false);
  const [servers, setServers] = useState([]);
  const [newDatabase, setNewDatabase] = useState({ serverId: '', dbName: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // Added totalItems state
  const [notification, setNotification] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNewDatabase({ serverId: '', dbName: '' }); // Reset form values
    setShow(true);
  };

  const fetchServers = async () => {
    try {
      const response = await getAllServers();
      setServers(response.data);
      setSearchResults(response.data);
      setTotalItems(response.data.reduce((total, server) => total + server.databases.length, 0)); // Calculate total items correctly
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const handleAddDatabase = async () => {
    const dbData = {
      dbName: newDatabase.dbName,
      serverId: newDatabase.serverId,
    };
    try {
      const response = await createDatabase(dbData);
      if (response.success) {
        fetchServers(); // Re-fetch all servers and databases after successful creation
        handleClose();
        showNotification('success', 'Success', 'Added new database successfully.');
      } else {
        console.error('Error adding database:', response.errorMessage);
        showNotification('error', 'Error', 'Failed to add database.');
      }
    } catch (error) {
      console.error('Error adding database:', error);
      showNotification('error', 'Error', 'Failed to add database.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDatabase({ ...newDatabase, [name]: value });
  };

  const handleSearch = () => {
    const results = servers.filter(server => 
      server.id.toString().includes(searchTerm) || (server.host && server.host.includes(searchTerm))
    );
    setSearchResults(results);
    setTotalItems(results.reduce((total, server) => total + server.databases.length, 0)); // Update total items based on search results
  };

  const currentResults = searchResults.flatMap(server =>
    server.databases.map(database => ({ ...database, serverId: server.id }))
  );

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
          <h2>Database</h2>
          <Button variant="primary" onClick={handleShow} className="custom-primary">Add New Database</Button>
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
              <th>Database ID</th>
              <th>Database Name</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map(database => (
              <tr key={database.id}>
                <td>{database.serverId}</td>
                <td>{database.id}</td>
                <td>{database.dbName}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal className="custom-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formServerId">
                <Form.Label className="form-label">Server</Form.Label>
                <Form.Control
                  as="select"
                  name="serverId"
                  value={newDatabase.serverId}
                  onChange={handleChange}
                >
                  <option value="">Select a server</option>
                  {servers.map(server => (
                    <option key={server.id} value={server.id}>
                      {server.id}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDbName">
                <Form.Label className="form-label">Database Name</Form.Label>
                <Form.Control
                  type="text"
                  name="dbName"
                  value={newDatabase.dbName}
                  onChange={handleChange}
                  placeholder="Enter database name"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddDatabase}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Database;
