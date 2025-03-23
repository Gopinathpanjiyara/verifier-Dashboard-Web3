import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { login, createPassword, validateUsername, forgotPassword } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (showTwoFactor) {
        // Handle 2FA verification
        if (twoFactorCode.length !== 6) {
          setError('Please enter a valid 6-digit code');
          setIsLoading(false);
          return;
        }
        
        // In a real app, this would verify the 2FA code
        setTimeout(() => {
          const success = login(username, password, rememberMe);
          if (!success) {
            setError('Invalid verification code');
          }
          setIsLoading(false);
        }, 1500);
      } else {
        // Regular login
        const success = login(username, password, rememberMe);
        if (!success) {
          setError('Invalid username or password');
          setIsLoading(false);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCreatePassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username) {
      setError('Please enter your username');
      return;
    }
    
    if (!isCreatingPassword) {
      // Validate username first
      setIsLoading(true);
      setTimeout(() => {
        const isValid = validateUsername(username);
        setIsLoading(false);
        
        if (isValid) {
          setIsCreatingPassword(true);
        } else {
          setError('Username not found in our system');
        }
      }, 1500);
      return;
    }
    
    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const success = createPassword(username, password);
      setIsLoading(false);
      
      if (!success) {
        setError('Failed to create password. Please try again.');
      }
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username) {
      setError('Please enter your username');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const success = forgotPassword(username);
      setIsLoading(false);
      
      if (success) {
        setResetEmailSent(true);
      } else {
        setError('Username not found in our system');
      }
    }, 1500);
  };

  const resetForm = () => {
    setIsCreatingPassword(false);
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-background-lighter p-4">
      <motion.div
        className="w-full max-w-md bg-background-lighter rounded-2xl shadow-neumorph p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Verifier Portal</h1>
          <p className="text-gray-400">
            {showForgotPassword 
              ? 'Reset your password'
              : isCreatingPassword 
                ? 'Create your password' 
                : showTwoFactor 
                  ? 'Two-Factor Authentication' 
                  : 'Sign in to your account'}
          </p>
        </motion.div>

        {resetEmailSent ? (
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-green-500/10 text-green-500 p-4 rounded-xl mb-6">
              Password reset instructions have been sent to your email.
            </div>
            <button
              onClick={resetForm}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Login
            </button>
          </motion.div>
        ) : showForgotPassword ? (
          <motion.form onSubmit={handleForgotPassword} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Email/Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                placeholder="Enter your email or username"
                required
              />
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-3 bg-red-500/10 text-red-500 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-primary text-sm text-center transition-colors"
              >
                Back to Login
              </button>
            </motion.div>
          </motion.form>
        ) : isCreatingPassword ? (
          <motion.form onSubmit={handleCreatePassword} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Email/Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                placeholder="Enter your email or username"
                disabled
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-3 bg-red-500/10 text-red-500 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Password...
                  </span>
                ) : (
                  'Create Password'
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-primary text-sm text-center transition-colors"
              >
                Back to Login
              </button>
            </motion.div>
          </motion.form>
        ) : showTwoFactor ? (
          <motion.form onSubmit={handleLogin} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                id="twoFactorCode"
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the 6-digit code sent to your device
              </p>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-3 bg-red-500/10 text-red-500 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify'
                )}
              </button>
              <p className="text-gray-400 text-sm text-center">
                Didn't receive a code? <button type="button" className="text-primary hover:underline">Resend</button>
              </p>
              <button
                type="button"
                onClick={() => setShowTwoFactor(false)}
                className="text-gray-400 hover:text-primary text-sm text-center transition-colors"
              >
                Back to Login
              </button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.form onSubmit={handleLogin} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Email/Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                placeholder="Enter your email or username"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border-b-2 border-gray-700 focus:border-primary px-4 py-2 rounded-lg focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-3 bg-red-500/10 text-red-500 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowTwoFactor(true)}
                className="text-gray-400 hover:text-primary text-sm text-center transition-colors"
              >
                Use two-factor authentication
              </button>
              <p className="text-gray-400 text-sm text-center">
                First time here?{' '}
                <button
                  type="button"
                  onClick={() => setIsCreatingPassword(true)}
                  className="text-primary hover:underline"
                >
                  Create password
                </button>
              </p>
            </motion.div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
