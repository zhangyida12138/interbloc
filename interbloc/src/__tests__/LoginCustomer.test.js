import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginAdmin from '../components/admin/LoginAdmin';
import { signIn } from '../AuthService';
import 'mutationobserver-shim';


jest.mock('../AuthService', () => ({
  signIn: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginAdmin Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginAdmin and checks initial state', () => {
    render(
      <MemoryRouter>
        <LoginAdmin />
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  test('updates form state on input change', () => {
    render(
      <MemoryRouter>
        <LoginAdmin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('admin@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error on failed login', async () => {
    signIn.mockImplementation(() => {
      throw new Error('Login failed');
    });

    render(
      <MemoryRouter>
        <LoginAdmin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please check your credentials and try again.')).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful login', async () => {
    signIn.mockResolvedValueOnce(true);

    render(
      <MemoryRouter>
        <LoginAdmin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/Admin/dashboard');
    });
  });
});
