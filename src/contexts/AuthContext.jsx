import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('verifier_isAuthenticated'));
  const [userName, setUserName] = useState(localStorage.getItem('verifier_userName') || 'Verifier');
  const [userRole, setUserRole] = useState(localStorage.getItem('verifier_userRole') || 'Junior Verifier');
  const navigate = useNavigate();

  // Mock database of registered verifiers
  // In a real application, this would be validated against a server API
  const registeredVerifiers = [
    { username: 'test', password: 'test', role: 'Admin', hasPassword: true },
    { username: 'admin@verify.com', password: 'admin123', role: 'Admin', hasPassword: true },
    { username: 'senior@verify.com', password: 'senior123', role: 'Senior Verifier', hasPassword: true },
    { username: 'junior@verify.com', password: 'junior123', role: 'Junior Verifier', hasPassword: true },
    { username: 'new@verify.com', role: 'Junior Verifier', hasPassword: false }
  ];

  const login = (username, password, rememberMe = false) => {
    // Check if the verifier exists and credentials match
    const verifier = registeredVerifiers.find(v => v.username === username);
    
    if (verifier && verifier.hasPassword && verifier.password === password) {
      if (rememberMe) {
        localStorage.setItem('verifier_isAuthenticated', 'true');
        localStorage.setItem('verifier_userName', username);
        localStorage.setItem('verifier_userRole', verifier.role);
      } else {
        // Use session storage for non-persistent sessions
        sessionStorage.setItem('verifier_isAuthenticated', 'true');
        sessionStorage.setItem('verifier_userName', username);
        sessionStorage.setItem('verifier_userRole', verifier.role);
      }
      
      setUserName(username);
      setUserRole(verifier.role);
      setIsAuthenticated(true);
      navigate('/');
      return true;
    }
    
    return false;
  };

  const createPassword = (username, password) => {
    const verifierExists = registeredVerifiers.some(v => v.username === username && !v.hasPassword);
    if (verifierExists) {
      // In a real app, this would update the database
      localStorage.setItem('verifier_isAuthenticated', 'true');
      localStorage.setItem('verifier_userName', username);
      localStorage.setItem('verifier_userRole', 'Junior Verifier');
      setUserName(username);
      setUserRole('Junior Verifier');
      setIsAuthenticated(true);
      navigate('/');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('verifier_isAuthenticated');
    localStorage.removeItem('verifier_userName');
    localStorage.removeItem('verifier_userRole');
    sessionStorage.removeItem('verifier_isAuthenticated');
    sessionStorage.removeItem('verifier_userName');
    sessionStorage.removeItem('verifier_userRole');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const validateUsername = (username) => {
    // Check if username exists in the system
    return registeredVerifiers.some(v => v.username === username);
  };

  const forgotPassword = (username) => {
    // In a real app, this would send a password reset email
    return validateUsername(username);
  };

  const changePassword = (currentPassword, newPassword) => {
    // In a real app, this would verify the current password and update it
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userName,
      userRole,
      login, 
      logout,
      createPassword,
      validateUsername,
      forgotPassword,
      changePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
