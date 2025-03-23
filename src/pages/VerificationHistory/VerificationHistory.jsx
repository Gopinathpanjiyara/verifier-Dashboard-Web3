import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Mock data for verification history
const mockVerificationHistory = [
  { 
    id: 'vh-001', 
    documentId: 'doc-101', 
    documentName: 'Employment Certificate', 
    organization: 'InnoTech Solutions', 
    verifiedAt: '2025-03-21T09:30:00', 
    status: 'approved', 
    verifier: 'Sarah Johnson',
    notes: 'All information verified with the issuing organization. Document is authentic.',
    documentType: 'Employment'
  },
  { 
    id: 'vh-002', 
    documentId: 'doc-102', 
    documentName: 'Academic Transcript', 
    organization: 'State University', 
    verifiedAt: '2025-03-20T16:45:00', 
    status: 'rejected', 
    verifier: 'Michael Chen', 
    reason: 'Inconsistent information detected between transcript and university records.',
    notes: 'Called university registrar to confirm. The GPA on the document does not match official records.',
    documentType: 'Academic'
  },
  { 
    id: 'vh-003', 
    documentId: 'doc-103', 
    documentName: 'Identity Verification', 
    organization: 'First National Bank', 
    verifiedAt: '2025-03-20T14:15:00', 
    status: 'approved', 
    verifier: 'David Wilson',
    notes: 'Identity confirmed through secure verification process.',
    documentType: 'Identity'
  },
  { 
    id: 'vh-004', 
    documentId: 'doc-104', 
    documentName: 'Professional License', 
    organization: 'Engineering Board', 
    verifiedAt: '2025-03-19T11:30:00', 
    status: 'approved', 
    verifier: 'Emily Rodriguez',
    notes: 'License number verified with Engineering Board database.',
    documentType: 'Professional'
  },
  { 
    id: 'vh-005', 
    documentId: 'doc-105', 
    documentName: 'Background Check', 
    organization: 'Security Services Co.', 
    verifiedAt: '2025-03-19T10:15:00', 
    status: 'flagged', 
    verifier: 'James Wilson',
    notes: 'Minor discrepancy found in employment dates. Requires further investigation.',
    documentType: 'Background'
  },
  { 
    id: 'vh-006', 
    documentId: 'doc-106', 
    documentName: 'Work Experience Letter', 
    organization: 'Global Tech Ltd.', 
    verifiedAt: '2025-03-18T15:45:00', 
    status: 'approved', 
    verifier: 'Sarah Johnson',
    notes: 'All details confirmed with previous employer HR department.',
    documentType: 'Employment'
  },
  { 
    id: 'vh-007', 
    documentId: 'doc-107', 
    documentName: 'Medical Certificate', 
    organization: 'City Hospital', 
    verifiedAt: '2025-03-18T13:20:00', 
    status: 'rejected', 
    verifier: 'Michael Chen',
    reason: 'Document contains unauthorized alterations.',
    notes: 'Digital signature verification failed. Document appears to have been modified after initial issuance.',
    documentType: 'Medical'
  },
  { 
    id: 'vh-008', 
    documentId: 'doc-108', 
    documentName: 'Residence Proof', 
    organization: 'City Bank', 
    verifiedAt: '2025-03-17T11:10:00', 
    status: 'approved', 
    verifier: 'Emily Rodriguez',
    notes: 'Address verified through utility bill cross-check.',
    documentType: 'Identity'
  }
];

const VerificationHistory = () => {
  const [verifications, setVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    documentType: [],
    verifier: [],
    dateRange: null
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedVerification, setSelectedVerification] = useState(null);

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

  // Load verification history
  useEffect(() => {
    const loadVerificationHistory = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVerifications(mockVerificationHistory);
        setIsLoading(false);
      }, 1500);
    };

    loadVerificationHistory();
  }, []);

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

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-500 bg-green-500/10';
      case 'rejected':
        return 'text-red-500 bg-red-500/10';
      case 'flagged':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Filter verifications
  const filteredVerifications = verifications.filter(verification => {
    // Search term filter
    const matchesSearch = 
      verification.documentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      verification.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.verifier.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(verification.status);
    
    // Document type filter
    const matchesType = filters.documentType.length === 0 || filters.documentType.includes(verification.documentType);
    
    // Verifier filter
    const matchesVerifier = filters.verifier.length === 0 || filters.verifier.includes(verification.verifier);
    
    // Date filter - simplified for demo
    const matchesDate = true; // In a real app, we'd check against filters.dateRange
    
    return matchesSearch && matchesStatus && matchesType && matchesVerifier && matchesDate;
  });

  // Sort verifications
  const sortedVerifications = [...filteredVerifications].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.verifiedAt) - new Date(a.verifiedAt)
        : new Date(a.verifiedAt) - new Date(b.verifiedAt);
    } else if (sortBy === 'name') {
      return sortOrder === 'desc'
        ? b.documentName.localeCompare(a.documentName)
        : a.documentName.localeCompare(b.documentName);
    } else if (sortBy === 'organization') {
      return sortOrder === 'desc'
        ? b.organization.localeCompare(a.organization)
        : a.organization.localeCompare(b.organization);
    } else if (sortBy === 'verifier') {
      return sortOrder === 'desc'
        ? b.verifier.localeCompare(a.verifier)
        : a.verifier.localeCompare(b.verifier);
    }
    return 0;
  });

  // Toggle filter
  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentFilters = [...prev[filterType]];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value]
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: [],
      documentType: [],
      verifier: [],
      dateRange: null
    });
    setSearchTerm('');
  };

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // View verification details
  const viewVerificationDetails = (verification) => {
    setSelectedVerification(verification);
  };

  // Close verification details modal
  const closeVerificationDetails = () => {
    setSelectedVerification(null);
  };

  // Get unique verifiers
  const uniqueVerifiers = [...new Set(verifications.map(v => v.verifier))];

  // Get unique document types
  const uniqueDocumentTypes = [...new Set(verifications.map(v => v.documentType))];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-primary rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
              borderRadius: ["50%", "40%", "50%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
        <motion.p
          className="mt-4 text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading verification history...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Verification History</h1>
        <p className="text-gray-400">Review past document verifications</p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div variants={itemVariants} className="bg-background-lighter rounded-2xl p-4 shadow-neumorph mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-0 text-white w-full pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Search by document name, organization, or verifier..."
            />
          </div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-xl transition-colors ${showFilters ? 'bg-primary text-white' : 'bg-background text-gray-300 hover:bg-background-lighter'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
              <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <motion.button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }}
              className="flex items-center px-4 py-2 bg-background text-gray-300 hover:bg-background-lighter rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Refresh
            </motion.button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-700 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Status</h3>
                <div className="space-y-2">
                  {['approved', 'rejected', 'flagged'].map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className={`text-sm capitalize ${getStatusColor(status)}`}>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Document Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Document Type</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueDocumentTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.documentType.includes(type)}
                        onChange={() => toggleFilter('documentType', type)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm text-gray-400">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verifier Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Verifier</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueVerifiers.map(verifier => (
                    <label key={verifier} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.verifier.includes(verifier)}
                        onChange={() => toggleFilter('verifier', verifier)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm text-gray-400">{verifier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter - Simplified for demo */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Date Range</h3>
                <select 
                  className="bg-background border-0 text-white w-full px-3 py-2 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  value={filters.dateRange || ''}
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                
                <button
                  onClick={clearFilters}
                  className="mt-4 w-full py-2 text-sm text-primary hover:text-primary-light"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Verification History Table */}
      <motion.div variants={itemVariants} className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden">
        {sortedVerifications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background">
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('name')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Document
                      {sortBy === 'name' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('organization')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Organization
                      {sortBy === 'organization' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('date')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Verified At
                      {sortBy === 'date' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('verifier')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Verifier
                      {sortBy === 'verifier' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-gray-400">Status</span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-gray-400">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedVerifications.map((verification) => (
                  <motion.tr
                    key={verification.id}
                    className="border-t border-gray-700 hover:bg-background transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-6 w-6 text-primary mr-2" />
                        <div>
                          <p className="text-white">{verification.documentName}</p>
                          <p className="text-xs text-gray-500">{verification.documentType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{verification.organization}</td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(verification.verifiedAt)}</td>
                    <td className="px-4 py-3 text-gray-300">{verification.verifier}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(verification.status)}`}>
                        {verification.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => viewVerificationDetails(verification)}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No verification history found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Pagination - Simplified for demo */}
      {sortedVerifications.length > 0 && (
        <motion.div variants={itemVariants} className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing <span className="text-white">{sortedVerifications.length}</span> of <span className="text-white">{verifications.length}</span> verifications
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-background text-gray-400 rounded-lg hover:bg-background-lighter transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary text-white rounded-lg">1</button>
            <button className="px-3 py-1 bg-background text-gray-400 rounded-lg hover:bg-background-lighter transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-background text-gray-400 rounded-lg hover:bg-background-lighter transition-colors">
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Verification Details Modal */}
      {selectedVerification && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVerificationDetails}
        >
          <motion.div
            className="bg-background-lighter rounded-2xl shadow-neumorph w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedVerification.documentName}</h2>
                  <p className="text-gray-400">{selectedVerification.organization}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(selectedVerification.status)}`}>
                  {selectedVerification.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Verified At</h3>
                      <p className="text-white">{formatDate(selectedVerification.verifiedAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Verified By</h3>
                      <p className="text-white">{selectedVerification.verifier}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <DocumentTextIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Document Type</h3>
                      <p className="text-white">{selectedVerification.documentType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <DocumentTextIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Document ID</h3>
                      <p className="text-white">{selectedVerification.documentId}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl mb-6">
                <h3 className="text-white font-medium mb-2">Verification Notes</h3>
                <p className="text-gray-300">{selectedVerification.notes}</p>
                
                {selectedVerification.reason && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h3 className="text-red-500 font-medium mb-2">Rejection Reason</h3>
                    <p className="text-red-400">{selectedVerification.reason}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeVerificationDetails}
                  className="px-4 py-2 bg-background text-gray-300 hover:bg-background-lighter rounded-xl transition-colors"
                >
                  Close
                </button>
                <Link
                  to={`/document-verification/${selectedVerification.documentId}`}
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  View Document
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VerificationHistory;
