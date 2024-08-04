import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Database from '../components/admin/Database';
import CustomNavbar from '../components/admin/CustomNavbar';
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
    { id: 1, databases: [{ id: 1, dbName: 'DB1' }, { id: 2, dbName: 'DB2' }] },
    { id: 2, databases: [{ id: 3, dbName: 'DB3' }] },
  ],
};

const mockDatabaseResponse = {
  success: true,
  data: { id: 4, dbName: 'DB4', serverId: 1 },
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
    });

    expect(screen.getByText('Add New Database')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by ID or Host')).toBeInTheDocument();
  });

  test('displays data correctly after successful API calls', async () => {
    getAllServers.mockResolvedValue(mockServerResponse);

    render(
      <MemoryRouter>
        <Database />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('DB1')).toBeInTheDocument();
      expect(screen.getByText('DB2')).toBeInTheDocument();
      expect(screen.getByText('DB3')).toBeInTheDocument();
    });
  });
});
