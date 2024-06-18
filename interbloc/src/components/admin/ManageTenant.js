import React, { useState } from 'react';
import { Container, Table, Button, Modal, Dropdown, DropdownButton, FormControl, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';

function ManageTenant() {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState([
    { email: 'admin@test.com', id: '1', firstname: 'admin', lastname: 'test' },
    { email: 'test2@test.com', id: '2', firstname: 'test2', lastname: 'test' },
    { email: 'staff@example.com', id: '3', firstname: 'staff', lastname: 'example' },
    { email: '551850757@qq.com', id: '4', firstname: 'wei', lastname: 'zhang' },
    { email: 'mingjun.zhong@abdn.ac.uk', id: '5', firstname: 'mingjun', lastname: 'zhong' },
  ]);

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [inputPage, setInputPage] = useState('');
  const [searchResults, setSearchResults] = useState(tenants);
  const [currentTenant, setCurrentTenant] = useState({ id: '', firstname: '', lastname: '', email: '' });

  const handleDelete = (id) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
    setSearchResults(searchResults.filter(tenant => tenant.id !== id));
  };

  const handleEdit = (tenant) => {
    setCurrentTenant(tenant);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setTenants(tenants.map(tenant => tenant.id === currentTenant.id ? currentTenant : tenant));
    setSearchResults(searchResults.map(tenant => tenant.id === currentTenant.id ? currentTenant : tenant));
    setShowEditModal(false);
  };

  const handleViewDetails = (tenant) => {
    navigate(`/admin/tenants-detail/${tenant.id}`);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTenant(null);
  };

  const handleSearch = () => {
    const results = tenants.filter(tenant => 
      tenant.id.includes(searchTerm) || tenant.firstname.includes(searchTerm) || tenant.lastname.includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleAddTenant = () => {
    console.log('Adding a new Tenant...');
  };

  const handleDeleteConfirmation = (tenant) => {
    setTenantToDelete(tenant);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (tenantToDelete) {
      handleDelete(tenantToDelete.id);
    }
    setShowDeleteModal(false);
    setTenantToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTenantToDelete(null);
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

  const currentTenants = searchResults.slice((currentPage - 1) * displayCount, currentPage * displayCount);
  const totalPages = Math.ceil(searchResults.length / displayCount);

  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2>Manage Tenants</h2>
          <div className="d-flex align-items-center">
            <Button variant="primary" onClick={handleAddTenant} className="add-tenant-btn">Add Tenant</Button>
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input mx-2"
            />
            <Button variant="primary" onClick={handleSearch} className="button-height">Search</Button>
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
            <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
            <span className="mx-2">Page {currentPage} of {totalPages}</span>
            <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTenants.map((tenant) => (
              <tr key={`${tenant.id}-${tenant.email}`}>
                <td>{tenant.id}</td>
                <td>{tenant.firstname}</td>
                <td>{tenant.lastname}</td>
                <td>{tenant.email}</td>
                <td className="table-actions">
                  <Button variant="info" onClick={() => handleViewDetails(tenant)} className="mr-2">View Details</Button>
                  <Button variant="warning" onClick={() => handleEdit(tenant)} className="mr-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteConfirmation(tenant)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showDetailsModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Tenant Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTenant && (
              <div>
                <p><strong>ID:</strong> {selectedTenant.id}</p>
                <p><strong>First Name:</strong> {selectedTenant.firstname}</p>
                <p><strong>Last Name:</strong> {selectedTenant.lastname}</p>
                <p><strong>Email:</strong> {selectedTenant.email}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formID">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                  type="text" 
                  value={currentTenant.id} 
                  onChange={(e) => setCurrentTenant({ ...currentTenant, id: e.target.value })} 
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={currentTenant.firstname} 
                  onChange={(e) => setCurrentTenant({ ...currentTenant, firstname: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={currentTenant.lastname} 
                  onChange={(e) => setCurrentTenant({ ...currentTenant, lastname: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={currentTenant.email} 
                  onChange={(e) => setCurrentTenant({ ...currentTenant, email: e.target.value })} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this tenant? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>No</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default ManageTenant;
