import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SessionProvider } from './contexts/SessionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import DocumentQueue from './pages/DocumentQueue/DocumentQueue';
import DocumentVerification from './pages/DocumentVerification/DocumentVerification';
import VerificationHistory from './pages/VerificationHistory/VerificationHistory';
import UserManagement from './pages/UserManagement/UserManagement';
import ReportingAnalytics from './pages/ReportingAnalytics/ReportingAnalytics';
import SecuritySettings from './pages/SecuritySettings/SecuritySettings';
import BlockchainVerification from './pages/BlockchainVerification/BlockchainVerification';
import Login from './pages/Login/Login';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="document-queue" element={<DocumentQueue />} />
        <Route path="document-verification/:id" element={<DocumentVerification />} />
        <Route path="verification-history" element={<VerificationHistory />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="reporting-analytics" element={<ReportingAnalytics />} />
        <Route path="security-settings" element={<SecuritySettings />} />
        <Route path="blockchain-verification" element={<BlockchainVerification />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SessionProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-background text-gray-100">
                <AppContent />
                <SessionTimeoutWarning />
              </div>
            </NotificationProvider>
          </SessionProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
