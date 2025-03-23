import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, cn, animations } from './test';
import { 
  UserIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon 
} from '@heroicons/react/24/outline';

const ExampleComponent = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Example form state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowModal(true);
  };

  return (
    <motion.div
      variants={animations.containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        theme.components.card.base,
        'max-w-md w-full mx-auto mt-10'
      )}
    >
      {/* Card Header */}
      <div className={theme.components.card.header}>
        <h2 className="text-2xl font-bold text-white">Example Component</h2>
        <p className="text-gray-400 mt-1">Showcasing the theme system</p>
      </div>

      {/* Card Body */}
      <div className={theme.components.card.body}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                className={cn(
                  theme.components.input.base,
                  theme.components.input.sizes.md,
                  'pl-10'
                )}
                value={formData.username}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
              />
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={cn(
                  theme.components.input.base,
                  theme.components.input.sizes.md,
                  'pl-10 pr-10'
                )}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
              />
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={cn(
              theme.components.button.base,
              theme.components.button.sizes.lg,
              theme.components.button.variants.primary,
              'w-full'
            )}
            whileHover={animations.buttonHover}
            whileTap={animations.buttonTap}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.span
                className="inline-flex items-center"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </motion.span>
            ) : (
              'Submit'
            )}
          </motion.button>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              variants={animations.modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                theme.components.card.base,
                'max-w-sm w-full mx-4'
              )}
            >
              <div className={theme.components.card.body}>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 text-green-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">Success!</h3>
                  <p className="mt-2 text-gray-400">
                    Your action has been completed successfully.
                  </p>
                  <div className="mt-6">
                    <motion.button
                      onClick={() => setShowModal(false)}
                      className={cn(
                        theme.components.button.base,
                        theme.components.button.sizes.md,
                        theme.components.button.variants.primary
                      )}
                      whileHover={animations.buttonHover}
                      whileTap={animations.buttonTap}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExampleComponent;
