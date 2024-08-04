import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CreateSurvey from '../../components/admin/CreateSurvey'; // 假设你的 CreateSurvey 组件路径是这样

const feature = loadFeature('./features/createSurvey.feature');

defineFeature(feature, test => {
  let getByLabelText;
  let getByText;
  let container;

  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <CreateSurvey />
      </MemoryRouter>
    );
    getByLabelText = utils.getByLabelText;
    getByText = utils.getByText;
    container = utils.container;
  };

  test('User successfully creates a new survey', ({ given, when, then }) => {
    given('the user is on the create survey page', () => {
      setup();
    });

    when('the user enters the survey name', () => {
      const surveyNameInput = getByLabelText('Survey Name');
      fireEvent.change(surveyNameInput, { target: { value: 'Customer Satisfaction Survey' } });
    });

    when('the user enters the survey description', () => {
      const surveyDescriptionInput = getByLabelText('Survey Description');
      fireEvent.change(surveyDescriptionInput, { target: { value: 'A survey to measure customer satisfaction.' } });
    });

    when('the user creates the survey questions', () => {
      // Assuming the Survey Creator component has been mocked and is working correctly
    });

    when('the user submits the form', () => {
      const createButton = getByText('Save');
      fireEvent.click(createButton);
    });

    then('the user should see a success message', async () => {
      await waitFor(() => {
        expect(getByText('Survey created successfully')).toBeInTheDocument();
      });
    });

    then('the user should be redirected to the survey management page', async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/admin/manage-survey');
      });
    });
  });

  test('User submits an incomplete form', ({ given, when, then }) => {
    given('the user is on the create survey page', () => {
      setup();
    });

    when('the user submits the form without entering the survey name', () => {
      const createButton = getByText('Save');
      fireEvent.click(createButton);
    });

    then('the user should see an error message', async () => {
      await waitFor(() => {
        expect(getByText('Please fill out all fields and create survey questions.')).toBeInTheDocument();
      });
    });
  });
});
