import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Mock data for charts
const mockVerificationData = [
  { date: '2025-03-15', approved: 24, rejected: 8, pending: 12 },
  { date: '2025-03-16', approved: 18, rejected: 5, pending: 9 },
  { date: '2025-03-17', approved: 32, rejected: 10, pending: 15 },
  { date: '2025-03-18', approved: 28, rejected: 7, pending: 11 },
  { date: '2025-03-19', approved: 35, rejected: 12, pending: 18 },
  { date: '2025-03-20', approved: 29, rejected: 9, pending: 14 },
  { date: '2025-03-21', approved: 31, rejected: 11, pending: 16 },
];

const mockUserPerformance = [
  { name: 'Sarah Johnson', verified: 78, approved: 65, rejected: 13, avgTime: 4.5 },
  { name: 'Michael Chen', verified: 92, approved: 80, rejected: 12, avgTime: 3.8 },
  { name: 'David Wilson', verified: 64, approved: 52, rejected: 12, avgTime: 5.2 },
  { name: 'Emily Rodriguez', verified: 45, approved: 38, rejected: 7, avgTime: 6.1 },
];

const mockDocumentTypes = [
  { type: 'Passport', count: 120, percentage: 30 },
  { type: 'Driver License', count: 95, percentage: 23.75 },
  { type: 'ID Card', count: 85, percentage: 21.25 },
  { type: 'Birth Certificate', count: 60, percentage: 15 },
  { type: 'Other', count: 40, percentage: 10 },
];

const ReportingAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [stats, setStats] = useState({
    totalVerified: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    avgTime: 0
  });

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

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Calculate summary statistics
        const totalVerified = mockVerificationData.reduce((sum, day) => sum + day.approved + day.rejected, 0);
        const approved = mockVerificationData.reduce((sum, day) => sum + day.approved, 0);
        const rejected = mockVerificationData.reduce((sum, day) => sum + day.rejected, 0);
        const pending = mockVerificationData.reduce((sum, day) => sum + day.pending, 0);
        const avgTime = mockUserPerformance.reduce((sum, user) => sum + user.avgTime, 0) / mockUserPerformance.length;
        
        setStats({
          totalVerified,
          approved,
          rejected,
          pending,
          avgTime
        });
        
        setIsLoading(false);
      }, 1500);
    };

    loadData();
  }, [timeRange]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
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
          Loading analytics...
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
        <h1 className="text-3xl font-bold text-white mb-2">Reporting & Analytics</h1>
        <p className="text-gray-400">Track verification performance and document statistics</p>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex space-x-2 bg-background-lighter p-1 rounded-xl w-fit">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-background'
              } transition-colors`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Verified */}
        <motion.div
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Verified</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalVerified}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <DocumentTextIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">12% from last {timeRange}</span>
          </div>
        </motion.div>

        {/* Approved */}
        <motion.div
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <h3 className="text-3xl font-bold text-white">{stats.approved}</h3>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <ChartBarIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">8% from last {timeRange}</span>
          </div>
        </motion.div>

        {/* Rejected */}
        <motion.div
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <h3 className="text-3xl font-bold text-white">{stats.rejected}</h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl">
              <ChartBarIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="flex items-center text-red-500">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">5% from last {timeRange}</span>
          </div>
        </motion.div>

        {/* Average Time */}
        <motion.div
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Avg. Verification Time</p>
              <h3 className="text-3xl font-bold text-white">{stats.avgTime.toFixed(1)} min</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <ClockIcon className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowDownIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">3% from last {timeRange}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Verification Trend */}
        <motion.div
          variants={itemVariants}
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Verification Trend</h3>
          <div className="h-64">
            {/* Chart would go here - using a placeholder */}
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-end space-x-4">
                {mockVerificationData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col space-y-1">
                      <div 
                        className="w-full bg-green-500 rounded-t-sm" 
                        style={{ height: `${(day.approved / 50) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-red-500" 
                        style={{ height: `${(day.rejected / 50) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-blue-500 rounded-b-sm" 
                        style={{ height: `${(day.pending / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">{formatDate(day.date)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-400">Approved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-400">Rejected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-400">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Document Types */}
        <motion.div
          variants={itemVariants}
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Document Types</h3>
          <div className="h-64">
            {/* Chart would go here - using a placeholder */}
            <div className="h-full flex flex-col justify-center">
              {mockDocumentTypes.map((doc, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">{doc.type}</span>
                    <span className="text-sm text-gray-400">{doc.count} ({doc.percentage}%)</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${doc.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verifier Performance */}
      <motion.div
        variants={itemVariants}
        className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden mb-8"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Verifier Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-3 text-left text-gray-400">Verifier</th>
                <th className="px-6 py-3 text-left text-gray-400">Documents Verified</th>
                <th className="px-6 py-3 text-left text-gray-400">Approved</th>
                <th className="px-6 py-3 text-left text-gray-400">Rejected</th>
                <th className="px-6 py-3 text-left text-gray-400">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {mockUserPerformance.map((user, index) => (
                <motion.tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-background transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.verified}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">{user.approved}</span>
                      <span className="text-gray-400 text-sm">({Math.round((user.approved / user.verified) * 100)}%)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">{user.rejected}</span>
                      <span className="text-gray-400 text-sm">({Math.round((user.rejected / user.verified) * 100)}%)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.avgTime} min</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Export Options */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ReportingAnalytics;
