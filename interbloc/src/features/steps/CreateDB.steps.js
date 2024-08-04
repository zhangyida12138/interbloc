import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CreateDB from '../../components/admin/CreateDB'; // 假设你的 CreateDB 组件路径是这样

const feature = loadFeature('./features/createDB.feature');

defineFeature(feature, test => {
  let getByLabelText;
  let getByText;
  let container;

  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <CreateDB />
      </MemoryRouter>
    );
    getByLabelText = utils.getByLabelText;
    getByText = utils.getByText;
    container = utils.container;
  };

  test('User successfully creates a new database', ({ given, when, then }) => {
    given('the user is on the create database page', () => {
      setup();
    });

    when('the user enters the database name', () => {
      const dbNameInput = getByLabelText('Database Name');
      fireEvent.change(dbNameInput, { target: { value: 'NewDatabase' } });
    });

    when('the user selects a server', () => {
      const serverSelect = getByLabelText('Server');
      fireEvent.change(serverSelect, { target: { value: '1' } });
    });

    when('the user submits the form', () => {
      const createButton = getByText('Create');
      fireEvent.click(createButton);
    });

    then('the user should see a success message', async () => {
      await waitFor(() => {
        expect(getByText('Database created successfully')).toBeInTheDocument();
      });
    });

    then('the user should be redirected to the database management page', async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/admin/manage-database');
      });
    });
  });

  test('User submits an incomplete form', ({ given, when, then }) => {
    given('the user is on the create database page', () => {
      setup();
    });

    when('the user submits the form without entering the database name', () => {
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
