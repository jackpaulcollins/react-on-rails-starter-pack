import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/auth/ProtectedRoute';
import Dashboard from './pages/dashboard/index';
import Jobs from './pages/jobs/index';
import Team from './pages/team/index';
import Templates from './pages/templates/index';
import Settings from './pages/settings/index';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile/index';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* app root */}
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/jobs"
          element={(
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/team"
          element={(
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/templates"
          element={(
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/settings"
          element={(
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
