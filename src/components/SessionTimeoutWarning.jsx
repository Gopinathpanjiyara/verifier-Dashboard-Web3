import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '../contexts/SessionContext';
import { ClockIcon } from '@heroicons/react/24/outline';

const SessionTimeoutWarning = () => {
  const { showWarning, extendSession, sessionTimeLeft } = useSession();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (!showWarning) {
      setTimeLeft(5 * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="bg-background-lighter rounded-2xl shadow-neumorph p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-start mb-4">
              <ClockIcon className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white">Session Timeout Warning</h2>
                <p className="text-yellow-500 text-sm mt-1">
                  Time remaining: {formatTime(timeLeft)}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Your session is about to expire due to inactivity. To protect your security, you will be automatically logged out when the timer reaches zero. Click the button below to extend your session.
            </p>
            <div className="flex justify-end space-x-3">
              <motion.button
                onClick={extendSession}
                className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Extend Session
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeoutWarning;
