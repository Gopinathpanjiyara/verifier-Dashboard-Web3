import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CubeIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Mock blockchain verification data
const mockVerifications = [
  {
    id: '0x1234...5678',
    documentHash: '0xabcd...ef01',
    timestamp: '2025-03-21T14:30:00',
    status: 'verified',
    blockNumber: 12345678,
    transactionHash: '0x9876...5432'
  },
  {
    id: '0x5678...9012',
    documentHash: '0xefgh...ij23',
    timestamp: '2025-03-21T13:15:00',
    status: 'pending',
    blockNumber: null,
    transactionHash: null
  }
];

const BlockchainVerification = () => {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

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

  // Handle document verification
  const handleVerifyDocument = async () => {
    if (!selectedDocument) return;

    setIsVerifying(true);
    // Simulate blockchain verification
    setTimeout(() => {
      const newVerification = {
        id: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        documentHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        status: 'verified',
        blockNumber: Math.floor(Math.random() * 1000000),
        transactionHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
      };
      setVerifications([newVerification, ...verifications]);
      setIsVerifying(false);
      setSelectedDocument(null);
    }, 3000);
  };

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Blockchain Verification</h1>
        <p className="text-gray-400">Verify document authenticity using blockchain technology</p>
      </motion.div>

      {/* Verification Form */}
      <motion.div
        variants={itemVariants}
        className="bg-background-lighter rounded-2xl shadow-neumorph p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <label htmlFor="document" className="block text-sm font-medium text-gray-300 mb-2">
              Select Document
            </label>
            <div className="relative">
              <select
                id="document"
                value={selectedDocument || ''}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="block w-full bg-background border-0 text-white rounded-xl py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Choose a document...</option>
                <option value="doc1">Document_001.pdf</option>
                <option value="doc2">Contract_2025.pdf</option>
                <option value="doc3">Agreement_Final.pdf</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <label className="invisible block text-sm font-medium text-gray-300 mb-2">
              Action
            </label>
            <motion.button
              onClick={handleVerifyDocument}
              disabled={!selectedDocument || isVerifying}
              className={`w-full md:w-auto px-6 py-2.5 rounded-xl flex items-center justify-center ${
                !selectedDocument || isVerifying
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark'
              } text-white transition-colors`}
              whileHover={!isVerifying && selectedDocument ? { scale: 1.05 } : {}}
              whileTap={!isVerifying && selectedDocument ? { scale: 0.95 } : {}}
            >
              {isVerifying ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CubeIcon className="h-5 w-5 mr-2" />
                  Verify on Blockchain
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Verification History */}
      <motion.div
        variants={itemVariants}
        className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden"
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Verification History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-3 text-left text-gray-400">Document Hash</th>
                <th className="px-6 py-3 text-left text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-gray-400">Block Number</th>
                <th className="px-6 py-3 text-left text-gray-400">Transaction Hash</th>
                <th className="px-6 py-3 text-left text-gray-400">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((verification) => (
                <motion.tr
                  key={verification.id}
                  className="border-t border-gray-700 hover:bg-background transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-primary mr-2" />
                      <span className="text-white font-mono">{verification.documentHash}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      verification.status === 'verified'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {verification.status === 'verified' ? (
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ClockIcon className="h-4 w-4 mr-1" />
                      )}
                      {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {verification.blockNumber ? (
                      <span className="text-white font-mono">{verification.blockNumber}</span>
                    ) : (
                      <span className="text-gray-400">Pending...</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {verification.transactionHash ? (
                      <span className="text-white font-mono">{verification.transactionHash}</span>
                    ) : (
                      <span className="text-gray-400">Pending...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(verification.timestamp)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlockchainVerification;
