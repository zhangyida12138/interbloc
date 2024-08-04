import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import ManageTenant from '../components/admin/ManageTenant';
import ManageSurvey from '../components/admin/ManageSurvey';
import CreateSurvey from '../components/admin/CreateSurvey';
import EditSurvey from '../components/admin/EditSurvey';
import Database from '../components/admin/Database';
import Server from '../components/admin/Server';
import TenantsDetail from '../components/admin/TenantsDetail';
import LoginAdmin from '../components/admin/LoginAdmin';
import { Amplify } from 'aws-amplify';
import adminConfig from '../aws-exports-admin';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../ProtectedRoute_admin';
import ErrorBoundary from '../components/ErrorBoundary';

Amplify.configure(adminConfig);

const AdminPortal = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="login" element={<LoginAdmin />} />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="manage-tenant" 
          element={
            <ProtectedRoute>
              <ManageTenant />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="manage-survey" 
          element={
            <ProtectedRoute>
              <ManageSurvey />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="create-survey" 
          element={
            <ProtectedRoute>
              <CreateSurvey />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="edit-survey/:id" 
          element={
            <ProtectedRoute>
              <EditSurvey />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="manage-database" 
          element={
            <ProtectedRoute>
              <Database />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="manage-server" 
          element={
            <ProtectedRoute>
              <Server />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="tenants-detail/:tenantId" 
          element={
            <ProtectedRoute>
              <TenantsDetail />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AdminPortal;
