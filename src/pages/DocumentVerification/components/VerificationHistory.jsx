import React from 'react';
import { motion } from 'framer-motion';

const VerificationHistory = ({ history }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
      <h2 className="text-lg font-medium text-white mb-4">Verification History</h2>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-700"></div>
        
        <div className="space-y-6">
          {history.map((item, index) => (
            <div key={item.id} className="relative pl-8">
              <div className="absolute left-0 top-1 w-6 h-6 bg-background-lighter border-2 border-primary rounded-full"></div>
              
              <div>
                <h3 className="text-white font-medium">{item.action}</h3>
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>{formatDate(item.timestamp)}</span>
                  <span>{item.user}</span>
                </div>
                {item.notes && (
                  <p className="mt-2 text-sm text-gray-300 bg-background p-2 rounded-lg">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationHistory;
