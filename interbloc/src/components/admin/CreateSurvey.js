import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Form } from 'react-bootstrap';
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react';
import CustomNavbar from './CustomNavbar';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';

// Survey creator configuration options
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
};

// Default JSON structure for the survey
const defaultJson = {
  pages: [{
    name: "Name",
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }]
};

const CreateSurvey = ({ surveys = [], setSurveys }) => {
  const [localSurveys, setLocalSurveys] = useState(surveys);
  const [formState, setFormState] = useState({
    surveyName: '',
    surveyDescription: '',
    surveyJSON: {}
  });
  const [error, setError] = useState('');
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  // Initialize SurveyCreator on component mount
  useEffect(() => {
    const surveyCreator = new SurveyCreator(creatorOptions);
    surveyCreator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
    surveyCreator.saveSurveyFunc = (saveNo, callback) => {
      setFormState((prevState) => ({
        ...prevState,
        surveyJSON: surveyCreator.JSON
      }));
      window.localStorage.setItem("survey-json", surveyCreator.text);
      callback(saveNo, true);
    };
    setCreator(surveyCreator);
  }, []);

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

    const newSurvey = {
      id: Date.now(), // Generate a unique ID using Date.now()
      name: formState.surveyName,
      description: formState.surveyDescription,
      json: surveyJSON
    };

    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    savedSurveys.push(newSurvey);
    localStorage.setItem('surveys', JSON.stringify(savedSurveys));

    if (typeof setSurveys === 'function') {
      setSurveys([...surveys, newSurvey]);
    } else {
      console.warn('setSurveys is not a function, using local state for testing.');
      setLocalSurveys([...localSurveys, newSurvey]);
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
        <h2>Create Survey</h2>
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
        <Button variant="primary" onClick={handleSave} className="custom-primary mt-3">Save</Button>
      </Container>
    </div>
  );
};

export default CreateSurvey;
