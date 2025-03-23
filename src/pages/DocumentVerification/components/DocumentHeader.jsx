import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const DocumentHeader = ({ document, navigate, variants }) => {
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-500 bg-green-500/10';
      case 'rejected':
        return 'text-red-500 bg-red-500/10';
      case 'new':
        return 'text-blue-500 bg-blue-500/10';
      case 'in-review':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'escalated':
        return 'text-purple-500 bg-purple-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div variants={variants} className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/document-queue')}
            className="flex items-center text-primary hover:text-primary-light mb-4 md:mb-0"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Queue
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(document.status)}`}>
            {document.status.replace('-', ' ')}
          </span>
          <span className={`text-xs font-medium capitalize ${getPriorityColor(document.priority)}`}>
            {document.priority} Priority
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-white">{document.name}</h1>
        <p className="text-gray-400 mt-1">{document.organization}</p>
        <p className="text-gray-500 text-sm mt-2">{document.description}</p>
      </div>
    </motion.div>
  );
};

export default DocumentHeader;
