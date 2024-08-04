import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateSurvey from '../components/admin/CreateSurvey';
import CustomNavbar from '../components/admin/CustomNavbar'; 
import '@testing-library/jest-dom/extend-expect';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../components/admin/CustomNavbar', () => () => <div>Mocked Navbar</div>);

jest.mock('survey-creator-react', () => ({
  SurveyCreatorComponent: ({ creator }) => <div>Mocked SurveyCreatorComponent</div>,
  SurveyCreator: class {
    constructor(options) {
      this.options = options;
      this.JSON = {};
      this.text = '';
    }
    saveSurveyFunc(saveNo, callback) {
      callback(saveNo, true);
    }
  }
}));

describe('CreateSurvey Component', () => {
  test('renders CreateSurvey component', () => {
    render(
      <MemoryRouter>
        <CreateSurvey />
      </MemoryRouter>
    );
    expect(screen.getByText('Create Survey')).toBeInTheDocument();
  });

  test('updates form fields correctly', () => {
    render(
      <MemoryRouter>
        <CreateSurvey />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText('Enter survey name');
    const descriptionInput = screen.getByPlaceholderText('Enter survey description');

    fireEvent.change(nameInput, { target: { value: 'Test Survey' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test survey' } });

    expect(nameInput.value).toBe('Test Survey');
    expect(descriptionInput.value).toBe('This is a test survey');
  });


  test('shows error when form is incomplete', () => {
    render(
      <MemoryRouter>
        <CreateSurvey />
      </MemoryRouter>
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(screen.getByText('Please fill out all fields and create survey questions.')).toBeInTheDocument();
  });
});
