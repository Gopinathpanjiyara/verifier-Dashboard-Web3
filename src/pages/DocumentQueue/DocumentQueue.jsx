import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// Mock data for documents
const mockDocuments = [
  { id: 'doc-001', name: 'Employment Certificate', organization: 'TechCorp Inc.', submittedAt: '2025-03-20T10:30:00', priority: 'high', status: 'new', type: 'Employment', size: '1.2 MB' },
  { id: 'doc-002', name: 'Academic Transcript', organization: 'University of Technology', submittedAt: '2025-03-20T09:15:00', priority: 'medium', status: 'new', type: 'Academic', size: '3.5 MB' },
  { id: 'doc-003', name: 'Identity Verification', organization: 'Global Finance Ltd.', submittedAt: '2025-03-19T16:45:00', priority: 'low', status: 'in-review', type: 'Identity', size: '0.8 MB' },
  { id: 'doc-004', name: 'Professional License', organization: 'Medical Association', submittedAt: '2025-03-19T14:20:00', priority: 'high', status: 'escalated', type: 'Professional', size: '2.1 MB' },
  { id: 'doc-005', name: 'Background Check', organization: 'Security Services Co.', submittedAt: '2025-03-18T11:10:00', priority: 'medium', status: 'in-review', type: 'Background', size: '4.7 MB' },
  { id: 'doc-006', name: 'Certification Validation', organization: 'Certification Board', submittedAt: '2025-03-18T10:05:00', priority: 'high', status: 'new', type: 'Professional', size: '1.5 MB' },
  { id: 'doc-007', name: 'Reference Check', organization: 'HR Solutions Inc.', submittedAt: '2025-03-17T15:30:00', priority: 'low', status: 'new', type: 'Employment', size: '0.9 MB' },
  { id: 'doc-008', name: 'Diploma Verification', organization: 'Education Department', submittedAt: '2025-03-17T13:45:00', priority: 'medium', status: 'new', type: 'Academic', size: '2.3 MB' },
  { id: 'doc-009', name: 'Address Proof', organization: 'City Bank', submittedAt: '2025-03-16T11:20:00', priority: 'medium', status: 'escalated', type: 'Identity', size: '1.1 MB' },
  { id: 'doc-010', name: 'Work Experience Letter', organization: 'Previous Employer Inc.', submittedAt: '2025-03-16T09:10:00', priority: 'low', status: 'in-review', type: 'Employment', size: '1.8 MB' }
];

const DocumentQueue = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    type: [],
    date: null
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

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

  // Load documents
  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setDocuments(mockDocuments);
        setIsLoading(false);
      }, 1500);
    };

    loadDocuments();
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

  // Handle document selection
  const toggleDocumentSelection = (docId) => {
    if (selectedDocuments.includes(docId)) {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    } else {
      setSelectedDocuments([...selectedDocuments, docId]);
    }
  };

  // Select all documents
  const selectAllDocuments = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    // In a real app, this would make API calls
    console.log(`Performing ${action} on documents:`, selectedDocuments);
    
    // Simulate action
    if (action === 'approve') {
      alert(`Approved ${selectedDocuments.length} documents`);
    } else if (action === 'reject') {
      alert(`Rejected ${selectedDocuments.length} documents`);
    }
    
    setSelectedDocuments([]);
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    // Search term filter
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(doc.status);
    
    // Priority filter
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(doc.priority);
    
    // Type filter
    const matchesType = filters.type.length === 0 || filters.type.includes(doc.type);
    
    // Date filter - simplified for demo
    const matchesDate = true; // In a real app, we'd check against filters.date
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesDate;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.submittedAt) - new Date(a.submittedAt)
        : new Date(a.submittedAt) - new Date(b.submittedAt);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sortOrder === 'desc'
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'name') {
      return sortOrder === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    } else if (sortBy === 'organization') {
      return sortOrder === 'desc'
        ? b.organization.localeCompare(a.organization)
        : a.organization.localeCompare(b.organization);
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
      priority: [],
      type: [],
      date: null
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
          Loading document queue...
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
        <h1 className="text-3xl font-bold text-white mb-2">Document Queue</h1>
        <p className="text-gray-400">Review and verify submitted documents</p>
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
              placeholder="Search by name, organization, or type..."
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
                  {['new', 'in-review', 'escalated'].map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm text-gray-400 capitalize">{status.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Priority</h3>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map(priority => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.priority.includes(priority)}
                        onChange={() => toggleFilter('priority', priority)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className={`text-sm capitalize ${getPriorityColor(priority)}`}>{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Document Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Document Type</h3>
                <div className="space-y-2">
                  {['Identity', 'Academic', 'Employment', 'Professional', 'Background'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleFilter('type', type)}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm text-gray-400">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter - Simplified for demo */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Date Range</h3>
                <select 
                  className="bg-background border-0 text-white w-full px-3 py-2 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                  onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                  value={filters.date || ''}
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

      {/* Bulk Actions */}
      {selectedDocuments.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-primary/10 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between"
        >
          <div className="flex items-center">
            <span className="text-white font-medium mr-2">
              {selectedDocuments.length} {selectedDocuments.length === 1 ? 'document' : 'documents'} selected
            </span>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <motion.button
              onClick={() => handleBulkAction('approve')}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckIcon className="h-5 w-5 mr-2" />
              Approve All
            </motion.button>
            <motion.button
              onClick={() => handleBulkAction('reject')}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Reject All
            </motion.button>
            <motion.button
              onClick={() => setSelectedDocuments([])}
              className="flex items-center px-4 py-2 bg-background text-gray-300 hover:bg-background-lighter rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Selection
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Documents Table */}
      <motion.div variants={itemVariants} className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden">
        {sortedDocuments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background">
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                        onChange={selectAllDocuments}
                        className="rounded text-primary focus:ring-primary mr-2"
                      />
                      <button 
                        onClick={() => toggleSort('name')}
                        className="flex items-center text-gray-400 hover:text-white"
                      >
                        Document
                        {sortBy === 'name' && (
                          <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </div>
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
                    <span className="text-gray-400">Type</span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('date')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Submitted
                      {sortBy === 'date' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => toggleSort('priority')}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      Priority
                      {sortBy === 'priority' && (
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
                {sortedDocuments.map((doc) => (
                  <motion.tr
                    key={doc.id}
                    className="border-t border-gray-700 hover:bg-background transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDocuments.includes(doc.id)}
                          onChange={() => toggleDocumentSelection(doc.id)}
                          className="rounded text-primary focus:ring-primary mr-3"
                        />
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-6 w-6 text-primary mr-2" />
                          <div>
                            <Link to={`/document-verification/${doc.id}`} className="text-white hover:text-primary">
                              {doc.name}
                            </Link>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{doc.organization}</td>
                    <td className="px-4 py-3 text-gray-400">{doc.type}</td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(doc.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium capitalize ${getPriorityColor(doc.priority)}`}>
                        {doc.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Link
                          to={`/document-verification/${doc.id}`}
                          className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Verify
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
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
      {sortedDocuments.length > 0 && (
        <motion.div variants={itemVariants} className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing <span className="text-white">{sortedDocuments.length}</span> of <span className="text-white">{documents.length}</span> documents
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
              3
            </button>
            <button className="px-3 py-1 bg-background text-gray-400 rounded-lg hover:bg-background-lighter transition-colors">
              Next
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DocumentQueue;
