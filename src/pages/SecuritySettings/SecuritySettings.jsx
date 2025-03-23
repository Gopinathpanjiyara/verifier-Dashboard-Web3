import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  KeyIcon, 
  LockClosedIcon, 
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useNotification } from '../../contexts/NotificationContext';

const SecuritySettings = () => {
  const { addNotification } = useNotification();
  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    expiryDays: 90
  });
  
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [ipRestrictions, setIpRestrictions] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [loginAttempts, setLoginAttempts] = useState(5);
  const [biometricAuth, setBiometricAuth] = useState(false);

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

  const handlePasswordSettingChange = (setting, value) => {
    setPasswordSettings({
      ...passwordSettings,
      [setting]: value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would send the settings to an API
    addNotification('Security settings saved successfully', 'success');
  };

  const handleGenerateMfaQR = () => {
    setMfaEnabled(true);
    addNotification('MFA has been enabled', 'success');
  };

  const handleResetMfa = () => {
    if (window.confirm('Are you sure you want to reset MFA? This will require users to set up MFA again.')) {
      setMfaEnabled(false);
      addNotification('MFA has been reset', 'success');
    }
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
        <h1 className="text-3xl font-bold text-white mb-2">Security Settings</h1>
        <p className="text-gray-400">Configure security settings for the verification platform</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Password Policy */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-xl mr-4">
              <KeyIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Password Policy</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum Password Length
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="8"
                  max="24"
                  value={passwordSettings.minLength}
                  onChange={(e) => handlePasswordSettingChange('minLength', parseInt(e.target.value))}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-white font-medium">{passwordSettings.minLength}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  id="requireUppercase"
                  type="checkbox"
                  checked={passwordSettings.requireUppercase}
                  onChange={(e) => handlePasswordSettingChange('requireUppercase', e.target.checked)}
                  className="h-4 w-4 text-primary bg-background border-gray-600 rounded focus:ring-primary focus:ring-offset-background"
                />
                <label htmlFor="requireUppercase" className="ml-2 text-sm text-gray-300">
                  Require uppercase letters
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="requireLowercase"
                  type="checkbox"
                  checked={passwordSettings.requireLowercase}
                  onChange={(e) => handlePasswordSettingChange('requireLowercase', e.target.checked)}
                  className="h-4 w-4 text-primary bg-background border-gray-600 rounded focus:ring-primary focus:ring-offset-background"
                />
                <label htmlFor="requireLowercase" className="ml-2 text-sm text-gray-300">
                  Require lowercase letters
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="requireNumbers"
                  type="checkbox"
                  checked={passwordSettings.requireNumbers}
                  onChange={(e) => handlePasswordSettingChange('requireNumbers', e.target.checked)}
                  className="h-4 w-4 text-primary bg-background border-gray-600 rounded focus:ring-primary focus:ring-offset-background"
                />
                <label htmlFor="requireNumbers" className="ml-2 text-sm text-gray-300">
                  Require numbers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="requireSymbols"
                  type="checkbox"
                  checked={passwordSettings.requireSymbols}
                  onChange={(e) => handlePasswordSettingChange('requireSymbols', e.target.checked)}
                  className="h-4 w-4 text-primary bg-background border-gray-600 rounded focus:ring-primary focus:ring-offset-background"
                />
                <label htmlFor="requireSymbols" className="ml-2 text-sm text-gray-300">
                  Require special characters
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password Expiry (days)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="30"
                  value={passwordSettings.expiryDays}
                  onChange={(e) => handlePasswordSettingChange('expiryDays', parseInt(e.target.value))}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-white font-medium">{passwordSettings.expiryDays}</span>
              </div>
            </div>

            <div className="bg-background rounded-xl p-4 flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-500">Password Strength</h3>
                <div className="mt-2 text-sm text-gray-400">
                  <p>
                    Current policy creates {' '}
                    <span className="font-medium text-green-500">strong</span> passwords with approximately
                    {' '}<span className="font-medium text-white">10^{Math.round(Math.log10(Math.pow(
                      (passwordSettings.requireLowercase ? 26 : 0) +
                      (passwordSettings.requireUppercase ? 26 : 0) +
                      (passwordSettings.requireNumbers ? 10 : 0) +
                      (passwordSettings.requireSymbols ? 32 : 0),
                      passwordSettings.minLength
                    )))}</span> possible combinations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Multi-Factor Authentication */}
        <motion.div
          variants={itemVariants}
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-xl mr-4">
              <DevicePhoneMobileIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Multi-Factor Authentication</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Require MFA for all users</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={mfaEnabled}
                  onChange={(e) => setMfaEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {mfaEnabled ? (
              <div className="bg-background rounded-xl p-4 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-500">MFA Enabled</h3>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>
                      All users will be required to set up MFA on their next login.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleResetMfa}
                      className="text-sm text-red-500 hover:text-red-400 transition-colors"
                    >
                      Reset MFA for all users
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGenerateMfaQR}
                className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                Enable MFA
              </button>
            )}

            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-sm font-medium text-white mb-4">Additional Security Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Biometric Authentication</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={biometricAuth}
                      onChange={(e) => setBiometricAuth(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">IP Restrictions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={ipRestrictions}
                      onChange={(e) => setIpRestrictions(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Session Settings */}
        <motion.div
          variants={itemVariants}
          className="bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-xl mr-4">
              <ClockIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Session Settings</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-white font-medium">{sessionTimeout}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Failed Login Attempts Before Lockout
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={loginAttempts}
                  onChange={(e) => setLoginAttempts(parseInt(e.target.value))}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-white font-medium">{loginAttempts}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Login Security */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-background-lighter rounded-2xl shadow-neumorph p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-xl mr-4">
              <LockClosedIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Login Security</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-4">
                <h3 className="text-white font-medium mb-2 flex items-center">
                  <FingerPrintIcon className="h-5 w-5 mr-2 text-primary" />
                  Login Monitoring
                </h3>
                <p className="text-sm text-gray-400">
                  Track and monitor all login attempts. Notify administrators of suspicious activities.
                </p>
                <div className="mt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-gray-300">Enable</span>
                  </label>
                </div>
              </div>

              <div className="bg-background rounded-xl p-4">
                <h3 className="text-white font-medium mb-2 flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-primary" />
                  Brute Force Protection
                </h3>
                <p className="text-sm text-gray-400">
                  Automatically block IP addresses after multiple failed login attempts.
                </p>
                <div className="mt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-gray-300">Enable</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="mt-8 flex justify-end">
        <motion.button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Security Settings
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SecuritySettings;
