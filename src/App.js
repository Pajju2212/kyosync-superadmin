import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import RequireAuth from './components/RequireAuth';
import Login from './pages/LoginPage/LoginPage'; // OR './pages/login' if you put index.js there
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
           {/* Redirect root to dashboard */}
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
           <Route path="dashboard" element={<Home />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;