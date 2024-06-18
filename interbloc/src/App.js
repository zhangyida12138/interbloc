import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPortal from './pages/AdminPortal';
import CustomerPortal from './pages/CustomerPortal';
import NotFound from './components/NotFound';
import TestPage from './pages/TestPage'; // 导入测试页面
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPortal />} />
        <Route path="/customer/*" element={<CustomerPortal />} />
        <Route path="/test" element={<TestPage />} /> {/* used for testing */}
        <Route path="/" element={<Navigate to="/test" />} /> {/* change admin into customer if u want to load customer portal */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
