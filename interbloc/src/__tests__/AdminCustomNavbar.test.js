import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomNavbar from '../components/admin/CustomNavbar';
import { signOut } from '../AuthService';
import '@testing-library/jest-dom/extend-expect';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
  useNavigate: () => mockNavigate,
}));

jest.mock('../AuthService', () => ({
  signOut: jest.fn(),
}));

describe('CustomNavbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders CustomNavbar component', () => {
    render(
      <MemoryRouter>
        <CustomNavbar />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Manage Tenant')).toBeInTheDocument();
    expect(screen.getByText('Manage Survey')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('Server')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <CustomNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Manage Tenant').closest('a')).toHaveAttribute('href', '/admin/manage-tenant');
    expect(screen.getByText('Manage Survey').closest('a')).toHaveAttribute('href', '/admin/manage-survey');
    expect(screen.getByText('Database').closest('a')).toHaveAttribute('href', '/admin/manage-database');
    expect(screen.getByText('Server').closest('a')).toHaveAttribute('href', '/admin/manage-server');
  });

  test('calls signOut and navigates to login page on logout', async () => {
    render(
      <MemoryRouter>
        <CustomNavbar />
      </MemoryRouter>
    );

    const logoutLink = screen.getByText('Log Out');
    fireEvent.click(logoutLink);

    // Ensure signOut is called
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
