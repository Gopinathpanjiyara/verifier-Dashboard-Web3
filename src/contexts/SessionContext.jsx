import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [sessionTimeoutId, setSessionTimeoutId] = useState(null);
  const [warningTimeoutId, setWarningTimeoutId] = useState(null);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const WARNING_BEFORE_TIMEOUT = 5 * 60 * 1000; // 5 minutes before timeout

  const resetActivity = useCallback(() => {
    if (!isAuthenticated) return;

    setLastActivity(Date.now());
    setShowWarning(false);
    
    // Clear existing timeouts
    if (sessionTimeoutId) clearTimeout(sessionTimeoutId);
    if (warningTimeoutId) clearTimeout(warningTimeoutId);
    
    // Set new timeouts
    const warningId = setTimeout(() => {
      setShowWarning(true);
    }, SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT);
    
    const sessionId = setTimeout(() => {
      handleSessionTimeout();
    }, SESSION_TIMEOUT);
    
    setWarningTimeoutId(warningId);
    setSessionTimeoutId(sessionId);
  }, [isAuthenticated]);

  const handleSessionTimeout = () => {
    setShowWarning(false);
    logout();
    navigate('/login', { replace: true });
    // Clear session storage
    sessionStorage.clear();
    // Clear any stored auth tokens
    localStorage.removeItem('verifier_isAuthenticated');
    localStorage.removeItem('verifier_userName');
    localStorage.removeItem('verifier_userRole');
  };

  const extendSession = () => {
    resetActivity();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear timeouts when user is not authenticated
      if (sessionTimeoutId) clearTimeout(sessionTimeoutId);
      if (warningTimeoutId) clearTimeout(warningTimeoutId);
      setShowWarning(false);
      return;
    }

    // Set up event listeners for user activity
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetActivity();
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    // Initial setup
    resetActivity();
    
    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (sessionTimeoutId) clearTimeout(sessionTimeoutId);
      if (warningTimeoutId) clearTimeout(warningTimeoutId);
    };
  }, [isAuthenticated, resetActivity]);

  return (
    <SessionContext.Provider value={{ 
      showWarning, 
      extendSession,
      lastActivity,
      sessionTimeLeft: isAuthenticated ? Math.max(0, SESSION_TIMEOUT - (Date.now() - lastActivity)) : 0
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
