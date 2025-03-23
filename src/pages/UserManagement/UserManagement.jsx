import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', role: 'Admin', status: 'active', lastLogin: '2025-03-20T14:30:00' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Verifier', status: 'active', lastLogin: '2025-03-21T09:15:00' },
  { id: 3, name: 'David Wilson', email: 'david.wilson@example.com', role: 'Verifier', status: 'active', lastLogin: '2025-03-19T16:45:00' },
  { id: 4, name: 'Emily Rodriguez', email: 'emily.rodriguez@example.com', role: 'Verifier', status: 'inactive', lastLogin: '2025-03-10T11:20:00' },
  { id: 5, name: 'James Wilson', email: 'james.wilson@example.com', role: 'Admin', status: 'active', lastLogin: '2025-03-18T13:10:00' },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUsers(mockUsers);
        setIsLoading(false);
      }, 1500);
    };

    loadUsers();
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
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'inactive':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'text-purple-500 bg-purple-500/10';
      case 'Verifier':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Add new user
  const addUser = (user) => {
    const newUser = {
      id: users.length + 1,
      ...user,
      status: 'active',
      lastLogin: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
  };

  // Edit user
  const updateUser = (user) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, ...user } : u));
    setEditingUser(null);
  };

  // Delete user
  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
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
          Loading users...
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
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Manage users and their permissions</p>
      </motion.div>

      {/* Search and Add User */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background-lighter border-0 text-white w-full pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Search users by name, email, or role..."
          />
        </div>
        
        <motion.button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </motion.button>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={itemVariants} className="bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background">
                  <th className="px-4 py-3 text-left text-gray-400">Name</th>
                  <th className="px-4 py-3 text-left text-gray-400">Email</th>
                  <th className="px-4 py-3 text-left text-gray-400">Role</th>
                  <th className="px-4 py-3 text-left text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-gray-400">Last Login</th>
                  <th className="px-4 py-3 text-left text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="border-t border-gray-700 hover:bg-background transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <span className="text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(user.lastLogin)}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-1 text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-1 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <UsersIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or add a new user</p>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              Add User
            </button>
          </div>
        )}
      </motion.div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAddUserModal(false)}
        >
          <motion.div
            className="bg-background-lighter rounded-2xl shadow-neumorph w-full max-w-md p-6 mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addUser({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  role: formData.get('role')
                });
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="Verifier">Verifier</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-background text-gray-300 hover:bg-background-lighter rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setEditingUser(null)}
        >
          <motion.div
            className="bg-background-lighter rounded-2xl shadow-neumorph w-full max-w-md p-6 mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                updateUser({
                  id: editingUser.id,
                  name: formData.get('name'),
                  email: formData.get('email'),
                  role: formData.get('role'),
                  status: formData.get('status')
                });
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="edit-name"
                  defaultValue={editingUser.name}
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="edit-email"
                  defaultValue={editingUser.email}
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  id="edit-role"
                  defaultValue={editingUser.role}
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="Verifier">Verifier</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  id="edit-status"
                  defaultValue={editingUser.status}
                  required
                  className="w-full bg-background border-0 text-white rounded-xl p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-background text-gray-300 hover:bg-background-lighter rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Update User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserManagement;
