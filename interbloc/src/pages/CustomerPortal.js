import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginCustomer from '../components/customer/LoginCustomer';
import ResetPassword from '../components/customer/ResetPassword';
import Dashboard from '../components/customer/Dashboard';
import CompletedSurvey from '../components/customer/CompletedSurvey';
import { Amplify } from 'aws-amplify';
import customerConfig from '../aws-exports-customer';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../ProtectedRoute_customer';
import ContainerPage from '../components/customer/ContainerPage';

Amplify.configure(customerConfig);

const CustomerPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginCustomer />} />
      <Route path="login" element={<LoginCustomer />} />
      <Route 
        path="dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="reset" 
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="mySurvey" 
        element={
          <ProtectedRoute>
            <CompletedSurvey />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="container" 
        element={
          <ProtectedRoute>
            <ContainerPage />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomerPortal;
