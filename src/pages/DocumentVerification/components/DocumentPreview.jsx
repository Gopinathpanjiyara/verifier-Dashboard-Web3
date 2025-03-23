import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowsPointingOutIcon, 
  ArrowsPointingInIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const DocumentPreview = ({ document }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Mock value, would come from actual document

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <motion.div 
      className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden"
      layout
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Document Preview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-white hover:bg-background rounded-lg transition-colors"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <div 
        className={`relative bg-gray-900 ${isFullscreen ? 'h-screen' : 'h-[600px]'}`}
      >
        {/* Mock document preview - in a real app, this would be a PDF viewer or similar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl p-8 bg-white text-black">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold uppercase mb-2">Employment Certificate</h1>
              <h2 className="text-xl">TechCorp Inc.</h2>
            </div>
            
            <div className="mb-6">
              <p className="mb-4">This is to certify that <strong>John Smith</strong> has been employed with TechCorp Inc. as a <strong>Senior Software Engineer</strong> from <strong>January 15, 2022</strong> to <strong>Present</strong>.</p>
              
              <p className="mb-4">During this period, the employee has demonstrated excellent performance and professional conduct.</p>
              
              <p>This certificate is issued upon the request of the employee for whatever legal purpose it may serve.</p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Maria Johnson</p>
                  <p>HR Director</p>
                  <p>TechCorp Inc.</p>
                </div>
                <div>
                  <p>Document ID: TC-EMP-2025-0042</p>
                  <p>Issue Date: January 15, 2025</p>
                  <p>Valid Until: January 15, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page navigation controls */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full bg-background-lighter ${currentPage === 1 ? 'text-gray-600' : 'text-white hover:bg-primary/20'}`}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full bg-background-lighter ${currentPage === totalPages ? 'text-gray-600' : 'text-white hover:bg-primary/20'}`}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentPreview;
