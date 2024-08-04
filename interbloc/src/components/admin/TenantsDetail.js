import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, InputGroup, FormControl, Dropdown, DropdownButton, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { getPagedUsers, createCognitoAccount, addUser, toggleCognitoAccountStatus, toggleUserStatus } from '../../api';
import CustomNavbar from './CustomNavbar';
import '../../styles/Dashboard.css';

function TenantDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [inputPage, setInputPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', group: '', displayName: '' });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [tenantId, currentPage, displayCount, searchTerm]);

  const fetchUsers = async () => {
    try {
      const params = {
        show: 0,
        searchText: searchTerm,
        pageSize: displayCount,
        currentPage: currentPage,
        tenantId: tenantId
      };

      const response = await getPagedUsers(params);
      if (response.success) {
        setUsers(response.data.items || []);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      } else {
        throw new Error(response.errorMessage || 'Failed to fetch users');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
    setInputPage('');
  };

  const handleInputPageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber)) {
      setInputPage(pageNumber);
    }
  };

  const handleDisplayCountChange = (count) => {
    setDisplayCount(count);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleAddUser = async () => {
    const cognitoData = {
      username: newUser.email,
      password: 'Pa$$word!2', // This should be handled securely
      tenantId: tenantId,
      group: newUser.group,
      temporaryPassword: false,
      displayName: newUser.displayName
    };

    try {
      const cognitoResponse = await createCognitoAccount(cognitoData);
      if (!cognitoResponse.success) {
        throw new Error(cognitoResponse.errorMessage || 'Failed to create Cognito account');
      }

      const cognitoId = cognitoResponse.data;

      const userData = {
        id: cognitoId,
        username: newUser.email,
        tenantId: tenantId,
        group: newUser.group,
        displayName: newUser.displayName
      };

      const userResponse = await addUser(userData);

      if (!userResponse.success) {
        throw new Error(userResponse.errorMessage || 'Failed to add user');
      }

      fetchUsers();
      setShowAddModal(false);
      setNewUser({ email: '', group: '', displayName: '' });
      showNotification('success', 'Success', 'User added successfully');
    } catch (error) {
      setError(error.message);
      showNotification('error', 'Error', 'Failed to add user');
    }
  };

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleDisableUser = async (user) => {
    try {
      await toggleCognitoAccountStatus(user.userId, true);
      await toggleUserStatus(user.userId,  true);
      fetchUsers();
      showNotification('success', 'Success', 'User disabled successfully');
    } catch (error) {
      setError(error.message);
      showNotification('error', 'Error', 'Failed to disable user');
    }
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(1, currentPage - middlePage);
      endPage = Math.min(totalPages, currentPage + middlePage);

      if (currentPage - middlePage <= 0) {
        endPage = maxPagesToShow;
      }
      if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          className={`pagination-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange({ target: { value: i } })}
          variant="outline-secondary"
        >
          {i}
        </Button>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <Button className="pagination-number" onClick={() => handlePageChange({ target: { value: 1 } })} variant="outline-secondary">
              1
            </Button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Button className="pagination-number" onClick={() => handlePageChange({ target: { value: totalPages } })} variant="outline-secondary">
              {totalPages}
            </Button>
          </>
        )}
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
          <h2>Manage Users</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="custom-primary">Add User</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center custom-margin">
          <div className="d-flex align-items-center search-container">
            <input
              type="text"
              placeholder="Search by ID or Email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="form-control search-input"
            />
            <Button onClick={handleSearch} className="custom-button-search">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </Button>
          </div>
          <div className="d-flex align-items-center ml-auto">
            <span className="mr-2">Show</span> 
            <DropdownButton
              title={displayCount}
              variant="outline-secondary"
              onSelect={(e) => handleDisplayCountChange(Number(e))}
            >
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center custom-margin custom-font">
          <span>Total Items: {totalItems}</span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.group}</td>
                <td className="table-actions">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-view-${user.userId}`}>View Details</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleViewDetail(user)}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-toggle-${user.userId}`}>{user.active ? 'Disable' : 'Enable'}</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleDisableUser(user)}>
                      <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="table-navigation-spacing">
          <div className="pagination-container">
            <Button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="outline-secondary"
            >
              &lt;
            </Button>
            {renderPageNumbers()}
            <Button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="outline-secondary"
            >
              &gt;
            </Button>
            <InputGroup className="pagination-input-group">
              <FormControl
                className="pagination-input"
                placeholder="Page"
                value={inputPage}
                onChange={handleInputPageChange}
                onKeyPress={(e) => e.key === 'Enter' && handlePageChange({ target: { value: inputPage } })} 
              />
              <Button variant="outline-secondary" onClick={() => handlePageChange({ target: { value: inputPage } })}>
                Go
              </Button>
            </InputGroup>
            <span className="pagination-info">of {totalPages} pages</span>
          </div>
        </div>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formGroup">
                <Form.Label>Group</Form.Label>
                <Form.Control
                  type="text"
                  name="group"
                  value={newUser.group}
                  onChange={(e) => setNewUser({ ...newUser, group: e.target.value })}
                  placeholder="Enter group"
                />
              </Form.Group>
              <Form.Group controlId="formDisplayName">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type="text"
                  name="displayName"
                  value={newUser.displayName}
                  onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                  placeholder="Enter display name"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                <p><strong>ID:</strong> {selectedUser.userId}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Group:</strong> {selectedUser.group}</p>
                {/* <p><strong>Active:</strong> {selectedUser.active}</p> */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default TenantDetail;
