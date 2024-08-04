import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Dropdown, DropdownButton, FormControl, InputGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';
import { getPagedTenants, createTenant, updateTenant, disableTenant, getAllServers } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faUser, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

function ManageTenant() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [servers, setServers] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTenant, setCurrentTenant] = useState({ id: '', customerName: '', logoUrl: '', email: '' });
  const [newTenant, setNewTenant] = useState({ customerName: '', logoUrl: '', databaseId: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTenants();
    fetchServers();
  }, [currentPage, displayCount, searchTerm]);

  const fetchTenants = async () => {
    try {
      const params = {
        show: displayCount,
        searchText: searchTerm,
        pageSize: displayCount,
        currentPage: currentPage,
        sortOrder: 0
      };
      const response = await getPagedTenants(params);
      if (response.success) {
        const formattedTenants = response.data.items.map(item => ({
          id: item.id,
          customerName: item.customerName,
          host: item.database.server.host,
          databaseId: item.database.id,
          databaseName: item.database.dbName,
          serverId: item.database.server.id,
          port: item.database.server.portNumber,
          enabled: !item.disabled
        }));
        setTenants(formattedTenants);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error(response.errorMessage || 'Failed to fetch tenants');
      }
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    }
  };

  const fetchServers = async () => {
    try {
      const response = await getAllServers();
      if (response.success) {
        setServers(response.data);
      } else {
        throw new Error(response.errorMessage || 'Failed to fetch servers');
      }
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    }
  };

  const handleEdit = (tenant) => {
    setCurrentTenant(tenant);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateTenant(currentTenant);
      setShowEditModal(false);
      fetchTenants();
    } catch (error) {
      console.error('Failed to update tenant:', error);
    }
  };

  const handleViewDetails = (tenant) => {
    setSelectedTenant(tenant);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTenant(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleAddTenant = async () => {
    const tenantData = {
      customerName: newTenant.customerName,
      logoUrl: newTenant.logoUrl,
      databaseId: newTenant.databaseId,
    };
    try {
      await createTenant(tenantData);
      setShowAddModal(false);
      fetchTenants();
      showNotification('success', 'Success', 'Added new tenant');
    } catch (error) {
      console.error('Failed to create tenant:', error);
      showNotification('error', 'Error', 'Failed to add tenant');
    }
  };

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleToggleDisable = async (tenant) => {
    try {
      await disableTenant(tenant.id, tenant.enabled);
      fetchTenants();
      showNotification('success', 'Success', `Tenant ${tenant.enabled ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      console.error('Failed to toggle tenant status:', error);
      showNotification('error', 'Error', 'Failed to change tenant status');
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
          onClick={() => handlePageChange(i)}
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
            <Button className="pagination-number" onClick={() => handlePageChange(1)} variant="outline-secondary">
              1
            </Button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Button className="pagination-number" onClick={() => handlePageChange(totalPages)} variant="outline-secondary">
              {totalPages}
            </Button>
          </>
        )}
      </>
    );
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
          <h2>Manage Tenants</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="custom-primary">Add Tenant</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center custom-margin">
          <div className="d-flex align-items-center search-container">
            <input
              type="text"
              placeholder="Search by ID or Name"
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
              <th>Tenant ID</th>
              <th>Customer Name</th>
              <th>Host</th>
              <th>Database ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className={tenant.isNew ? 'new-tenant-row' : ''}>
                <td>{tenant.id}</td>
                <td>{tenant.customerName}</td>
                <td>{tenant.host}</td>
                <td>{tenant.databaseId}</td>
                <td className="table-actions">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-view-${tenant.id}`}>View Details</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleViewDetails(tenant)}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-manage-${tenant.id}`}>Manage Users</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => navigate(`/admin/tenants-detail/${tenant.id}`)}>
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-edit-${tenant.id}`}>Edit</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleEdit(tenant)}>
                      <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-toggle-${tenant.id}`}>{tenant.enabled ? 'Disable' : 'Enable'}</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleToggleDisable(tenant)}>
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
                onKeyPress={(e) => e.key === 'Enter' && handlePageChange(Number(inputPage))} 
              />
              <Button variant="outline-secondary" onClick={() => handlePageChange(Number(inputPage))}>
                Go
              </Button>
            </InputGroup>
            <span className="pagination-info">of {totalPages} pages</span>
          </div>
        </div>

        <Modal show={showDetailsModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Tenant Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTenant && (
              <div>
                <p><strong>Tenant Id:</strong> {selectedTenant.id}</p>
                <p><strong>Name:</strong> {selectedTenant.customerName}</p>
                <p><strong>Server:</strong> {selectedTenant.host}</p>
                <p><strong>Database ID:</strong> {selectedTenant.databaseId}</p>
                <p><strong>Database Name:</strong> {selectedTenant.databaseName}</p>
                <p><strong>Server ID:</strong> {selectedTenant.serverId}</p>
                <p><strong>Port:</strong> {selectedTenant.port}</p>
                <p><strong>Enabled:</strong> {selectedTenant.enabled ? 'Yes' : 'No'}</p>
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
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formCustomerName">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={currentTenant.customerName} 
                    onChange={(e) => setCurrentTenant({ ...currentTenant, customerName: e.target.value })} 
                  />
                </Form.Group>
                <Form.Group controlId="formLogoUrl">
                  <Form.Label>Logo URL</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={currentTenant.logoUrl} 
                    onChange={(e) => setCurrentTenant({ ...currentTenant, logoUrl: e.target.value })} 
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
            </Modal.Footer>
          </Modal>
          <Modal className="custom-modal" show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCustomerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newTenant.customerName} 
                  onChange={(e) => setNewTenant({ ...newTenant, customerName: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formLogoUrl">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newTenant.logoUrl} 
                  onChange={(e) => setNewTenant({ ...newTenant, logoUrl: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formDatabaseId">
                <Form.Label>Database ID</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newTenant.databaseId} 
                  onChange={(e) => setNewTenant({ ...newTenant, databaseId: e.target.value })} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddTenant}>Add</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default ManageTenant;
