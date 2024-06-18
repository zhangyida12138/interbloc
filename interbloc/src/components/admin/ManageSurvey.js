import React, { useState } from 'react';
import { Container, Table, Button, Modal, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import '../../styles/Dashboard.css';
import CustomNavbar from './CustomNavbar';

function ManageSurvey() {
  const [surveys, setSurveys] = useState([
    { id: 1, name: 'Survey 1', description: 'Description for Survey 1' },
    { id: 2, name: 'Survey 2', description: 'Description for Survey 2' },
    { id: 3, name: 'Survey 3', description: 'Description for Survey 3' },
    // Add more surveys here for demonstration
  ]);

  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(surveys);
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);
  const [inputPage, setInputPage] = useState('');


  const handleDelete = (id) => {
    setSurveys(surveys.filter(survey => survey.id !== id));
    setSearchResults(searchResults.filter(survey => survey.id !== id));
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit survey with id:', id);
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
      survey.id.toString().includes(searchTerm) || survey.name.includes(searchTerm) || survey.description.includes(searchTerm)
    );
    setSearchResults(results);
    setCurrentPage(1);  // Reset to first page of search results
  };

  const handleAddSurvey = () => {
    // Implement your logic to add a new survey here
    console.log('Adding a new survey...');
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

  const currentSurveys = searchResults.slice((currentPage - 1) * displayCount, currentPage * displayCount);
  const totalPages = Math.ceil(searchResults.length / displayCount);

  return (
    <div className="dashboard-container">
      <CustomNavbar />
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Manage Surveys</h2>
        <div className="d-flex align-items-center">
          <Button variant="primary" onClick={handleAddSurvey} className="add-survey-btn">Add Survey</Button>
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
                <Button variant="info" onClick={() => handleViewDetails(survey)} className="mr-2">View Details</Button>
                <Button variant="warning" onClick={() => handleEdit(survey.id)} className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteConfirmation(survey)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
              {/* Add other details as needed */}
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
