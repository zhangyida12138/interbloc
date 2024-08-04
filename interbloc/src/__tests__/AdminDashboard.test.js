import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Database from '../components/admin/Database'; 
import { getAllServers, createDatabase } from '../api';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

// Mock dependencies
jest.mock('../api', () => ({
  getAllServers: jest.fn(),
  createDatabase: jest.fn(),
}));

jest.mock('../components/admin/CustomNavbar', () => () => <div>Mocked Navbar</div>);

const mockServerResponse = {
  success: true,
  data: [
    { id: 1, host: 'server1', databases: [{ id: 'db1', dbName: 'Database1' }, { id: 'db2', dbName: 'Database2' }] },
    { id: 2, host: 'server2', databases: [{ id: 'db3', dbName: 'Database3' }] },
  ],
};

describe('Database Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Database component', async () => {
    getAllServers.mockResolvedValue(mockServerResponse);

    render(
      <MemoryRouter>
        <Database />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Database')).toBeInTheDocument();
      expect(screen.getByText('Add New Database')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search by ID or Host')).toBeInTheDocument();
      expect(screen.getByText('Total Items: 3')).toBeInTheDocument(); // Based on mockServerResponse
    });
  });

  test('displays servers and databases correctly', async () => {
    getAllServers.mockResolvedValue(mockServerResponse);

    render(
      <MemoryRouter>
        <Database />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Database1')).toBeInTheDocument();
      expect(screen.getByText('Database2')).toBeInTheDocument();
      expect(screen.getByText('Database3')).toBeInTheDocument();
    });
  });

  test('opens and closes the modal', async () => {
    getAllServers.mockResolvedValue(mockServerResponse);

    render(
      <MemoryRouter>
        <Database />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add New Database'));

    await waitFor(() => {
      expect(screen.getByText('Create Database')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Create Database')).not.toBeInTheDocument();
    });
  });
});
