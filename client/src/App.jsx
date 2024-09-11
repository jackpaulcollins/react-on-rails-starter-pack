import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/auth/ProtectedRoute';
import Dashboard from './pages/dashboard/index';
import Plans from './pages/plans/index';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/plans" element={<Plans />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
