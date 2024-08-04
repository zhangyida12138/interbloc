import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CreateServer from '../../components/admin/CreateServer'; // 假设你的 CreateServer 组件路径是这样

const feature = loadFeature('./features/createServer.feature');

defineFeature(feature, test => {
  let getByLabelText;
  let getByText;
  let container;

  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <CreateServer />
      </MemoryRouter>
    );
    getByLabelText = utils.getByLabelText;
    getByText = utils.getByText;
    container = utils.container;
  };

  test('User successfully creates a new server', ({ given, when, then }) => {
    given('the user is on the create server page', () => {
      setup();
    });

    when('the user enters the server host', () => {
      const serverHostInput = getByLabelText('Server Host');
      fireEvent.change(serverHostInput, { target: { value: 'localhost' } });
    });

    when('the user submits the form', () => {
      const createButton = getByText('Create');
      fireEvent.click(createButton);
    });

    then('the user should see a success message', async () => {
      await waitFor(() => {
        expect(getByText('Server created successfully')).toBeInTheDocument();
      });
    });

    then('the user should be redirected to the server management page', async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/admin/manage-server');
      });
    });
  });

  test('User submits an incomplete form', ({ given, when, then }) => {
    given('the user is on the create server page', () => {
      setup();
    });

    when('the user submits the form without entering the server host', () => {
      const createButton = getByText('Create');
      fireEvent.click(createButton);
    });

    then('the user should see an error message', async () => {
      await waitFor(() => {
        expect(getByText('Please fill out all fields')).toBeInTheDocument();
      });
    });
  });
});
