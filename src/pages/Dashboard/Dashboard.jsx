import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon, 
  ExclamationCircleIcon,
  ArrowRightIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for the dashboard
const mockPendingVerifications = [
  { id: 'doc-001', name: 'Employment Certificate', organization: 'TechCorp Inc.', submittedAt: '2025-03-20T10:30:00', priority: 'high', status: 'new' },
  { id: 'doc-002', name: 'Academic Transcript', organization: 'University of Technology', submittedAt: '2025-03-20T09:15:00', priority: 'medium', status: 'new' },
  { id: 'doc-003', name: 'Identity Verification', organization: 'Global Finance Ltd.', submittedAt: '2025-03-19T16:45:00', priority: 'low', status: 'in-review' },
  { id: 'doc-004', name: 'Professional License', organization: 'Medical Association', submittedAt: '2025-03-19T14:20:00', priority: 'high', status: 'escalated' },
  { id: 'doc-005', name: 'Background Check', organization: 'Security Services Co.', submittedAt: '2025-03-18T11:10:00', priority: 'medium', status: 'in-review' }
];

const mockRecentVerifications = [
  { id: 'doc-101', name: 'Employment Certificate', organization: 'InnoTech Solutions', verifiedAt: '2025-03-21T09:30:00', status: 'approved', verifier: 'Sarah Johnson' },
  { id: 'doc-102', name: 'Academic Transcript', organization: 'State University', verifiedAt: '2025-03-20T16:45:00', status: 'rejected', verifier: 'Michael Chen', reason: 'Inconsistent information' },
  { id: 'doc-103', name: 'Identity Verification', organization: 'First National Bank', verifiedAt: '2025-03-20T14:15:00', status: 'approved', verifier: 'David Wilson' },
  { id: 'doc-104', name: 'Professional License', organization: 'Engineering Board', verifiedAt: '2025-03-19T11:30:00', status: 'approved', verifier: 'Emily Rodriguez' }
];

const mockNotifications = [
  { id: 'notif-001', title: 'New High Priority Document', message: 'A new high priority document has been submitted for verification.', time: '10 minutes ago', read: false },
  { id: 'notif-002', title: 'System Update', message: 'The verification system will undergo maintenance tonight at 11 PM.', time: '2 hours ago', read: false },
  { id: 'notif-003', title: 'Verification Policy Update', message: 'New guidelines for identity verification have been published.', time: '1 day ago', read: true }
];

const mockPerformanceMetrics = {
  totalVerified: 128,
  pendingCount: 42,
  rejectionRate: 8.5,
  averageTime: 27, // minutes
  weeklyProgress: [23, 19, 25, 32, 18, 11, 0], // Documents verified per day of the week
  verificationTypes: [
    { type: 'Identity', count: 45 },
    { type: 'Academic', count: 32 },
    { type: 'Employment', count: 28 },
    { type: 'Professional', count: 15 },
    { type: 'Background', count: 8 }
  ]
};

const Dashboard = () => {
  const { userName, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [recentVerifications, setRecentVerifications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate loading data from an API
    const loadDashboardData = async () => {
      setIsLoading(true);
      // In a real app, these would be API calls
      setTimeout(() => {
        setMetrics(mockPerformanceMetrics);
        setPendingVerifications(mockPendingVerifications);
        setRecentVerifications(mockRecentVerifications);
        setNotifications(mockNotifications);
        setIsLoading(false);
      }, 1500);
    };

    loadDashboardData();
  }, []);

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

  // Format date to readable format
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
          Loading dashboard data...
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
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {userName}</h1>
        <p className="text-gray-400">{userRole} Dashboard • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </motion.div>

      {/* Metrics Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-background-lighter rounded-2xl p-6 shadow-neumorph"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-xl mr-4">
              <DocumentTextIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Pending</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{metrics.pendingCount}</p>
          <p className="text-sm text-gray-400">Documents awaiting verification</p>
        </motion.div>

        <motion.div 
          className="bg-background-lighter rounded-2xl p-6 shadow-neumorph"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl mr-4">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Verified</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{metrics.totalVerified}</p>
          <p className="text-sm text-gray-400">Total documents verified</p>
        </motion.div>

        <motion.div 
          className="bg-background-lighter rounded-2xl p-6 shadow-neumorph"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-red-500/10 rounded-xl mr-4">
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Rejection Rate</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{metrics.rejectionRate}%</p>
          <p className="text-sm text-gray-400">Average rejection percentage</p>
        </motion.div>

        <motion.div 
          className="bg-background-lighter rounded-2xl p-6 shadow-neumorph"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl mr-4">
              <ClockIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Average Time</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{metrics.averageTime} min</p>
          <p className="text-sm text-gray-400">Per document verification</p>
        </motion.div>
      </motion.div>

      {/* Quick Access Buttons */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/document-queue" className="group">
          <motion.div 
            className="bg-primary/10 hover:bg-primary/20 rounded-xl p-4 flex items-center justify-between transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-primary mr-3" />
              <span className="text-white font-medium">Pending Documents</span>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
        
        <Link to="/verification-history" className="group">
          <motion.div 
            className="bg-primary/10 hover:bg-primary/20 rounded-xl p-4 flex items-center justify-between transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-primary mr-3" />
              <span className="text-white font-medium">Verification History</span>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
        
        <Link to="/reporting-analytics" className="group">
          <motion.div 
            className="bg-primary/10 hover:bg-primary/20 rounded-xl p-4 flex items-center justify-between transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-primary mr-3" />
              <span className="text-white font-medium">Analytics & Reports</span>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Verifications */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Pending Verifications</h2>
              <Link to="/document-queue" className="text-primary hover:text-primary-light text-sm flex items-center">
                View All
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {pendingVerifications.slice(0, 4).map((doc) => (
                <motion.div
                  key={doc.id}
                  className="bg-background rounded-xl p-4 hover:bg-background-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/document-verification/${doc.id}`} className="text-white font-medium hover:text-primary transition-colors">
                        {doc.name}
                      </Link>
                      <p className="text-gray-400 text-sm">{doc.organization}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`text-xs mt-1 ${getPriorityColor(doc.priority)}`}>
                        {doc.priority.toUpperCase()} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Submitted: {formatDate(doc.submittedAt)}</span>
                    <Link to={`/document-verification/${doc.id}`} className="text-primary hover:underline">
                      Verify Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Verifications */}
          <motion.div variants={itemVariants} className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Verifications</h2>
              <Link to="/verification-history" className="text-primary hover:text-primary-light text-sm flex items-center">
                View History
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentVerifications.slice(0, 3).map((doc) => (
                <motion.div
                  key={doc.id}
                  className="bg-background rounded-xl p-4 hover:bg-background-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/verification-history/${doc.id}`} className="text-white font-medium hover:text-primary transition-colors">
                        {doc.name}
                      </Link>
                      <p className="text-gray-400 text-sm">{doc.organization}</p>
                    </div>
                    <div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Verified: {formatDate(doc.verifiedAt)}</span>
                    <span>By: {doc.verifier}</span>
                  </div>
                  {doc.reason && (
                    <div className="mt-2 text-xs text-red-400 bg-red-400/10 p-2 rounded">
                      Reason: {doc.reason}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Notifications and Weekly Performance */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* System Notifications */}
          <div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Notifications</h2>
              <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length} New
              </span>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`p-4 rounded-xl ${notification.read ? 'bg-background/50' : 'bg-background'}`}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start">
                    {!notification.read && (
                      <div className="mt-1 mr-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-white font-medium">{notification.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-center text-primary text-sm hover:underline">
              View All Notifications
            </button>
          </div>

          {/* Weekly Performance */}
          <div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Performance</h2>
            
            <div className="h-40 flex items-end justify-between space-x-2">
              {metrics.weeklyProgress.map((count, index) => {
                const height = count === 0 ? 0 : Math.max(10, (count / Math.max(...metrics.weeklyProgress)) * 100);
                return (
                  <motion.div
                    key={index}
                    className="bg-primary/20 hover:bg-primary/30 rounded-t-md w-full"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-primary font-medium -mt-6">{count}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="text-sm font-medium text-white mb-3">Verification Types</h3>
              
              {metrics.verificationTypes.map((type) => (
                <div key={type.type} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{type.type}</span>
                    <span className="text-white">{type.count}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(type.count / metrics.totalVerified) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
