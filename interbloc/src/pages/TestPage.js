import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { getToken, addUserToCognito, addUserToTenant, getPagedUsers, toggleUserStatus, createDatabase, createServer, getAllServers, createTenant, updateTenant, getPagedTenants, disableTenant } from '../api';
import adminConfig from '../aws-exports-admin';
import customerConfig from '../aws-exports-customer';

const TestPage = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [configType, setConfigType] = useState(null);

  const checkCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setUser(currentUser);
      setToken(token);
    } catch (err) {
      setError('No current user');
    }
  };

  const handleLogin = async (type) => {
    try {
      if (type === 'admin') {
        Auth.configure(adminConfig);
      } else if (type === 'customer') {
        Auth.configure(customerConfig);
      }
      const user = await Auth.signIn('uniAdmin@intebloc.com', 'Pa$$wordUn!v3rs!ty');
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setUser(user);
      setToken(token);
      setConfigType(type);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleAddUser = async () => {
    try {
      const uuid = await addUserToCognito('newuser', 'newuser@example.com');
      const user = {
        id: uuid,  // Cognito中的UUID
        username: 'newuser',
        tenantId: 'tenant123'
      };
      const res = await addUserToTenant(user, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleGetPagedUsers = async () => {
    try {
      const params = {
        Show: 'all',
        PageSize: 10,
        CurrentPage: 1
      };
      const res = await getPagedUsers(params, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleToggleUserStatus = async () => {
    try {
      const params = {
        id: 'user-uuid',  // 用户UUID
        enabled: false
      };
      const res = await toggleUserStatus(params, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleCreateDatabase = async () => {
    try {
      const db = {
        dbName: 'newDatabase',
        serverId: 'server-uuid'
      };
      const res = await createDatabase(db, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleCreateServer = async () => {
    try {
      const server = {
        host: 'localhost',
        portNumber: 5432
      };
      const res = await createServer(server, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleGetAllServers = async () => {
    try {
      const res = await getAllServers(token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleCreateTenant = async () => {
    try {
      const tenant = {
        customerName: 'New Customer',
        logoUrl: 'http://example.com/logo.png',
        databaseId: 'database-uuid'
      };
      const res = await createTenant(tenant, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleUpdateTenant = async () => {
    try {
      const tenant = {
        id: 'tenant-uuid',
        customerName: 'Updated Customer',
        logoUrl: 'http://example.com/updated-logo.png',
        archived: false
      };
      const res = await updateTenant(tenant, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleGetPagedTenants = async () => {
    try {
      const params = {
        show: 0,  // 状态
        searchText: '',
        pageSize: 10,
        currentPage: 1,
        sortOrder: 0
      };
      const res = await getPagedTenants(params, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDisableTenant = async () => {
    try {
      const params = {
        id: 'tenant-uuid',
        disable: true
      };
      const res = await disableTenant(params, token);
      setResponse(res);
    } catch (err) {
      setError(err.toString());
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {!user ? (
        <div>
          <h2>Login</h2>
          <button onClick={() => handleLogin('admin')}>Login as Admin</button>
          <button onClick={() => handleLogin('customer')}>Login as Customer</button>
        </div>
      ) : (
        <>
          <button onClick={handleAddUser}>Add User</button>
          <button onClick={handleGetPagedUsers}>Get Paged Users</button>
          <button onClick={handleToggleUserStatus}>Toggle User Status</button>
          <button onClick={handleCreateDatabase}>Create Database</button>
          <button onClick={handleCreateServer}>Create Server</button>
          <button onClick={handleGetAllServers}>Get All Servers</button>
          <button onClick={handleCreateTenant}>Create Tenant</button>
          <button onClick={handleUpdateTenant}>Update Tenant</button>
          <button onClick={handleGetPagedTenants}>Get Paged Tenants</button>
          <button onClick={handleDisableTenant}>Disable Tenant</button>
        </>
      )}
      <pre>{response && JSON.stringify(response, null, 2)}</pre>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
    </div>
  );
};

export default TestPage;
