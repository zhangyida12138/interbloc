import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Login from '../components/admin/Login'; 
const feature = loadFeature('./features/login.feature');

defineFeature(feature, test => {
  let getByLabelText;
  let getByText;
  let container;

  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    getByLabelText = utils.getByLabelText;
    getByText = utils.getByText;
    container = utils.container;
  };

  test('User successfully logs in', ({ given, when, then }) => {
    given('the user is on the login page', () => {
      setup();
    });

    when('the user enters their email', () => {
      const emailInput = getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    });

    when('the user enters their password', () => {
      const passwordInput = getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    when('the user submits the login form', () => {
      const loginButton = getByText('LOGIN');
      fireEvent.click(loginButton);
    });

    then('the user should be redirected to the dashboard', async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/admin/dashboard');
      });
    });
  });

  test('User enters incorrect credentials', ({ given, when, then }) => {
    given('the user is on the login page', () => {
      setup();
    });

    when('the user enters an incorrect email', () => {
      const emailInput = getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    });

    when('the user enters an incorrect password', () => {
      const passwordInput = getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    });

    when('the user submits the login form', () => {
      const loginButton = getByText('LOGIN');
      fireEvent.click(loginButton);
    });

    then('the user should see an error message', async () => {
      await waitFor(() => {
        expect(getByText('Login failed. Please check your credentials and try again.')).toBeInTheDocument();
      });
    });
  });
});
