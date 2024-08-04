import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Form } from 'react-bootstrap';
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react';
import CustomNavbar from './CustomNavbar';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';

// Configuration options for the Survey Creator
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
};

const EditSurvey = ({ surveys = [], setSurveys }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    surveyName: '',
    surveyDescription: '',
    surveyJSON: {}
  });
  const [error, setError] = useState('');
  const [creator, setCreator] = useState(null);

  // Load the survey to edit from local storage on component mount
  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const surveyToEdit = savedSurveys.find(s => s.id === parseInt(id));
    if (surveyToEdit) {
      setFormState({
        surveyName: surveyToEdit.name,
        surveyDescription: surveyToEdit.description,
        surveyJSON: surveyToEdit.json
      });
      const surveyCreator = new SurveyCreator(creatorOptions);
      surveyCreator.text = JSON.stringify(surveyToEdit.json);
      surveyCreator.saveSurveyFunc = (saveNo, callback) => {
        setFormState((prevState) => ({
          ...prevState,
          surveyJSON: surveyCreator.JSON
        }));
        callback(saveNo, true);
      };
      setCreator(surveyCreator);
    }
  }, [id]);

  // Handle the save button click event
  const handleSave = () => {
    if (!creator) {
      setError('Survey creator is not initialized.');
      return;
    }

    const surveyJSON = creator.JSON;

    if (!formState.surveyName || !formState.surveyDescription || !surveyJSON.pages || surveyJSON.pages.length === 0) {
      setError('Please fill out all fields and create survey questions.');
      return;
    }

    const updatedSurvey = {
      id: parseInt(id), // Retain the same ID
      name: formState.surveyName,
      description: formState.surveyDescription,
      json: surveyJSON
    };

    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const updatedSurveys = savedSurveys.map(s => s.id === parseInt(id) ? updatedSurvey : s);
    localStorage.setItem('surveys', JSON.stringify(updatedSurveys));

    if (typeof setSurveys === 'function') {
      setSurveys(updatedSurveys);
    }

    navigate('/admin/manage-survey');
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <CustomNavbar />
      <Container className="dashboard-content">
        <h2>Edit Survey</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formSurveyName">
          <Form.Label>Survey Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter survey name" 
            name="surveyName"
            value={formState.surveyName} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="formSurveyDescription">
          <Form.Label>Survey Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter survey description" 
            name="surveyDescription"
            value={formState.surveyDescription} 
            onChange={handleChange} 
          />
        </Form.Group>
        <div style={{ height: "800px" }}>
          {creator && <SurveyCreatorComponent creator={creator} />}
        </div>
        <Button variant="primary" onClick={handleSave} className="add-survey-btn mt-3">Save</Button>
      </Container>
    </div>
  );
};

export default EditSurvey;
