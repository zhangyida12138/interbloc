import React, { useState } from 'react';
import { Container, Table, Button, Modal, FormControl, InputGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';

const ManageSuperuser = () => {
  const navigate = useNavigate();

  const [superusers, setSuperusers] = useState([
    {
      id: 1,
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '123-456-7890',
      userStatus: 1,
      role: 'client',
    },
    {
      id: 2,
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password456',
      phone: '234-567-8901',
      userStatus: 1,
      role: 'client',
    },
    {
      id: 3,
      username: 'user3',
      firstName: 'Jim',
      lastName: 'Beam',
      email: 'jim.beam@example.com',
      password: 'password789',
      phone: '345-678-9012',
      userStatus: 1,
      role: 'client',
    },
    {
      id: 4,
      username: 'user4',
      firstName: 'Jack',
      lastName: 'Daniels',
      email: 'jack.daniels@example.com',
      password: 'password012',
      phone: '456-789-0123',
      userStatus: 1,
      role: 'client',
    },
    {
      id: 5,
      username: 'user5',
      firstName: 'Johnny',
      lastName: 'Walker',
      email: 'johnny.walker@example.com',
      password: 'password345',
      phone: '567-890-1234',
      userStatus: 1,
      role: 'client',
    },
    {
      id: 6,
      username: 'user6',
      firstName: 'George',
      lastName: 'Smith',
      email: 'george.smith@example.com',
      password: 'password678',
      phone: '678-901-2345',
      userStatus: 1,
      role: 'client',
    },
    // More superusers...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(superusers);
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [inputPage, setInputPage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // pop up window
  const [currentUser, setCurrentUser] = useState({ email: '', role: '' });
  const [selectedUser, setSelectedUser] = useState(null); // used to store the selected user

  const handleDelete = (email) => {
    setSuperusers(superusers.filter((user) => user.email !== email));
    setSearchResults(searchResults.filter((user) => user.email !== email));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setSuperusers(superusers.map((user) => (user.email === currentUser.email ? currentUser : user)));
    setSearchResults(searchResults.map((user) => (user.email === currentUser.email ? currentUser : user)));
    setShowEditModal(false);
  };

  const handleDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      handleDelete(userToDelete.email);
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleSearch = () => {
    const results = superusers.filter(
      (user) => user.email.includes(searchTerm) || user.role.includes(searchTerm)
    );
    setSearchResults(results);
    setCurrentPage(1); // Reset to first page of search results
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
    setInputPage('');
  };

  const currentUsers = searchResults.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );
  const totalPages = Math.ceil(searchResults.length / displayCount);

  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2>Manage Superusers</h2>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search by Email or Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input mx-2"
            />
            <Button variant="primary" onClick={handleSearch} className="button-height">
              Search
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
          <DropdownButton
            title={`Show ${displayCount}`}
            variant="secondary"
            onSelect={(e) => setDisplayCount(Number(e))}
          >
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="30">30</Dropdown.Item>
          </DropdownButton>
          <div className="d-flex align-items-center">
            <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
            <InputGroup className="ml-2" style={{ width: '100px' }}>
              <FormControl
                placeholder="Page"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                onBlur={handlePageChange}
              />
            </InputGroup>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th className="wider-column">First Name</th>
              <th className="wider-column">Last Name</th>
              <th>Password</th>
              <th>Phone</th>
              <th className='wider-column'>User Status</th>
              <th className="narrower-column">Email</th>
              <th>Role</th>
              <th className='wider-column'>Actions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.userStatus}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="table-actions">
                  <Button variant="info" onClick={() => handleViewDetails(user)} className="mr-2">
                    View Details
                  </Button>
                
                  
                </td>
                <td><Button variant="warning" onClick={() => handleEdit(user)} className="mr-2">
                    Edit
                  </Button></td>
                <td><Button variant="danger" onClick={() => handleDeleteConfirmation(user)}>
                    Delete
                  </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showDeleteModal} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this superuser? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              No
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Superuser</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.role}
                  onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ManageSuperuser;
