import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginCustomer from '../components/customer/LoginCustomer';
import RegisterCustomer from '../components/customer/RegisterCustomer';
import ResetPassword from '../components/customer/ResetPassword';
import SendCode from '../components/customer/SendCode';
import Dashboard from '../components/customer/Dashboard';
import CompletedSurvey from '../components/customer/CompletedSurvey';
import Admin from '../components/customer/Admin';

const CustomerPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginCustomer />} />
      <Route path="login" element={<LoginCustomer />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="register" element={<RegisterCustomer />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="send-code" element={<SendCode />} />
      <Route path="mySurvey" element={<CompletedSurvey />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  );
};

export default CustomerPortal;
