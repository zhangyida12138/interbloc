import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Dropdown, DropdownButton, FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faUser, faPenToSquare, faBoxArchive, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';

function ManageSurvey() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);
  const [inputPage, setInputPage] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [notification, setNotification] = useState(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    setSurveys(savedSurveys);
    setSearchResults(savedSurveys);
    setTotalItems(savedSurveys.length);
  }, []);
  
  const handleDelete = (id) => {
    const updatedSurveys = surveys.filter(survey => survey.id !== id);
    setSurveys(updatedSurveys);
    setSearchResults(updatedSurveys);
    localStorage.setItem('surveys', JSON.stringify(updatedSurveys));
    setTotalItems(updatedSurveys.length);
    showNotification('success', 'Success', 'Survey deleted successfully.');
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-survey/${id}`);
  };

  const handleViewDetails = (survey) => {
    setSelectedSurvey(survey);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedSurvey(null);
  };

  const handleSearch = () => {
    const results = surveys.filter(survey => 
      survey.id.toString().includes(searchTerm) || (survey.name && survey.name.includes(searchTerm)) || (survey.description && survey.description.includes(searchTerm))
    );
    setSearchResults(results);
    setCurrentPage(1);
    setTotalItems(results.length);
  };

  const handleAddSurvey = () => {
    navigate('/admin/create-survey');
  };

  const handleDeleteConfirmation = (survey) => {
    setSurveyToDelete(survey);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (surveyToDelete) {
      handleDelete(surveyToDelete.id);
    }
    setShowDeleteModal(false);
    setSurveyToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSurveyToDelete(null);
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

  const handleInputPageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber)) {
      setInputPage(pageNumber);
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

  const currentSurveys = searchResults.slice((currentPage - 1) * displayCount, currentPage * displayCount);
  const totalPages = Math.ceil(searchResults.length / displayCount);
  
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
          <h2>Manage Surveys</h2>
          <Button variant="primary" onClick={handleAddSurvey} className="custom-primary">Add Survey</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center custom-margin">
          <div className="d-flex align-items-center search-container">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
            <Button onClick={handleSearch} className="custom-button-search">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
          <div className="d-flex align-items-center ml-auto">
            <span className="mr-2">Show</span> 
            <DropdownButton
              title={displayCount}
              variant="outline-secondary"
              onSelect={(e) => setDisplayCount(Number(e))}
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
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSurveys.map((survey) => (
              <tr key={survey.id}>
                <td>{survey.id}</td>
                <td>{survey.name}</td>
                <td>{survey.description}</td>
                <td className="table-actions">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-view-${survey.id}`}>View Details</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleViewDetails(survey)}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-edit-${survey.id}`}>Edit</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleEdit(survey.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-delete-${survey.id}`}>Delete</Tooltip>}
                  >
                    <span className="icon-style" onClick={() => handleDeleteConfirmation(survey)}>
                      <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
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

        <Modal show={showDetailsModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Survey Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSurvey && (
              <div>
                <p><strong>ID:</strong> {selectedSurvey.id}</p>
                <p><strong>Name:</strong> {selectedSurvey.name}</p>
                <p><strong>Description:</strong> {selectedSurvey.description}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this survey? This action cannot be undone.
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

export default ManageSurvey;
