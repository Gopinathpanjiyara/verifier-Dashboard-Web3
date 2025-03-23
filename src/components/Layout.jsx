import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  UsersIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CubeIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BellIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: '/' },
    { name: 'Document Queue', icon: DocumentTextIcon, href: '/document-queue' },
    { name: 'Verification History', icon: ClockIcon, href: '/verification-history' },
    { name: 'User Management', icon: UsersIcon, href: '/user-management' },
    { name: 'Reporting & Analytics', icon: ChartBarIcon, href: '/reporting-analytics' },
    { name: 'Security Settings', icon: ShieldCheckIcon, href: '/security-settings' },
    { name: 'Blockchain Verification', icon: CubeIcon, href: '/blockchain-verification' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for mobile */}
      <div className="lg:hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className={`fixed inset-0 z-40 flex`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50"
            onClick={toggleSidebar}
          ></motion.div>
          
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background-lighter shadow-neumorph">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-white">Document Verifier</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive
                          ? 'bg-primary/20 text-white'
                          : 'text-gray-300 hover:bg-background hover:text-white'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">{user?.name || 'Verifier User'}</p>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-primary hover:text-primary-light"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </motion.div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-background-lighter shadow-neumorph">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-white">Document Verifier</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary/20 text-white'
                          : 'text-gray-300 hover:bg-background hover:text-white'
                      }`
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name || 'Verifier User'}</p>
                  <button
                    onClick={logout}
                    className="text-xs font-medium text-primary hover:text-primary-light"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-background-lighter shadow-neumorph">
          <button
            type="button"
            className="px-4 border-r border-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold text-white">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={toggleTheme}
              >
                <span className="sr-only">Toggle theme</span>
                {darkMode ? (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
              
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <Outlet />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
