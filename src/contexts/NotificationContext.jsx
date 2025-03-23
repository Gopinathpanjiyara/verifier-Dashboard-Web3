import React, { createContext, useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    
    if (duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
        <AnimatePresence>
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-xl shadow-neumorph ${
                notification.type === 'success' ? 'bg-green-500/10 text-green-500' :
                notification.type === 'error' ? 'bg-red-500/10 text-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-background-lighter text-primary'
              }`}
            >
              <div className="flex justify-between items-start">
                <p>{notification.message}</p>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
