import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import ManageTenant from '../components/admin/ManageTenant';
import ManageSurvey from '../components/admin/ManageSurvey';
import ManageSuperuser from '../components/admin/ManageSuperuser';
import SuperuserRegister from '../components/admin/SuperuserRegister';
import TenantsDetail from '../components/admin/TenantsDetail';
import LoginAdmin from '../components/admin/LoginAdmin';

const AdminPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAdmin />} />
      <Route path="login" element={<LoginAdmin />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-tenant" element={<ManageTenant />} />
      <Route path="manage-survey" element={<ManageSurvey />} />
      <Route path="manage-superuser" element={<ManageSuperuser />} />
      <Route path="superuser-register" element={<SuperuserRegister />} />
      <Route path="tenants-detail/:id" element={<TenantsDetail />} />
    </Routes>
  );
};

export default AdminPortal;
