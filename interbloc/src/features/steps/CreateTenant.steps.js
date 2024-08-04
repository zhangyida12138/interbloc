import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CreateTenant from '../../components/admin/CreateTenant'; // 假设你的 CreateTenant 组件路径是这样

const feature = loadFeature('./features/createTenant.feature');

defineFeature(feature, test => {
  let getByLabelText;
  let getByText;
  let container;

  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <CreateTenant />
      </MemoryRouter>
    );
    getByLabelText = utils.getByLabelText;
    getByText = utils.getByText;
    container = utils.container;
  };

  test('User successfully creates a new tenant', ({ given, when, then }) => {
    given('the user is on the create tenant page', () => {
      setup();
    });

    when('the user enters the tenant name', () => {
      const tenantNameInput = getByLabelText('Tenant Name');
      fireEvent.change(tenantNameInput, { target: { value: 'New Tenant' } });
    });

    when('the user enters the tenant logo URL', () => {
      const tenantLogoInput = getByLabelText('Logo URL');
      fireEvent.change(tenantLogoInput, { target: { value: 'http://example.com/logo.png' } });
    });

    when('the user selects a database ID', () => {
      const databaseIdInput = getByLabelText('Database ID');
      fireEvent.change(databaseIdInput, { target: { value: '1' } });
    });

    when('the user submits the form', () => {
      const createButton = getByText('Create');
      fireEvent.click(createButton);
    });

    then('the user should see a success message', async () => {
      await waitFor(() => {
        expect(getByText('Tenant created successfully')).toBeInTheDocument();
      });
    });

    then('the user should be redirected to the tenant management page', async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/admin/manage-tenants');
      });
    });
  });

  test('User submits an incomplete form', ({ given, when, then }) => {
    given('the user is on the create tenant page', () => {
      setup();
    });

    when('the user submits the form without entering the tenant name', () => {
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
