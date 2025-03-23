import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DocumentMetadata = ({ document }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <motion.div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
      <h2 className="text-lg font-medium text-white mb-4">Document Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <DocumentTextIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Document Type</h3>
            <p className="text-white">{document.type}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Submitted By</h3>
            <p className="text-white">{document.submittedBy}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <ClockIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Submission Date</h3>
            <p className="text-white">{formatDate(document.submittedAt)}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Issue Date</h3>
            <p className="text-white">{document.metadata.issueDate}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Expiry Date</h3>
            <p className="text-white">{document.metadata.expiryDate}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Additional Details</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Document ID</span>
            <span className="text-white">{document.metadata.documentId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Issuer</span>
            <span className="text-white">{document.metadata.issuer}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Signed By</span>
            <span className="text-white">{document.metadata.signedBy}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">File Size</span>
            <span className="text-white">{document.size}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentMetadata;
