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
<<<<<<< HEAD
        {/* <Route path="/test" element={<TestPage />} /> used for testing */}
        <Route path="/" element={<Navigate to="/admin" />} /> {/* change admin into customer if u want to load customer portal */}
=======
        <Route path="/test" element={<TestPage />} /> {/* used for testing */}
        <Route path="/" element={<Navigate to="/customer" />} /> {/* change admin into customer if u want to load customer portal */}
>>>>>>> f83c3651c5c64107bd7bb89d6eccf54c1bf4c193
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
