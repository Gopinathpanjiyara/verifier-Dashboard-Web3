import { createContext, useContext } from 'react';

// Theme context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Animation variants
export const animations = {
  // Page transitions
  pageVariants: {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2
      }
    }
  },

  // Container animations
  containerVariants: {
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
  },

  // Item animations
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }
  },

  // Modal animations
  modalVariants: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  },

  // Button hover animations
  buttonHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  buttonTap: {
    scale: 0.95
  }
};

// Color scheme
export const colors = {
  // Primary colors
  primary: {
    light: '#60A5FA', // blue-400
    DEFAULT: '#3B82F6', // blue-500
    dark: '#2563EB', // blue-600
  },

  // Background colors
  background: {
    lighter: '#1F2937', // gray-800
    DEFAULT: '#111827', // gray-900
    darker: '#030712', // gray-950
  },

  // Text colors
  text: {
    primary: '#F9FAFB', // gray-50
    secondary: '#D1D5DB', // gray-300
    muted: '#6B7280', // gray-500
  },

  // Status colors
  status: {
    success: {
      text: '#22C55E', // green-500
      bg: 'rgba(34, 197, 94, 0.1)', // green-500/10
    },
    warning: {
      text: '#EAB308', // yellow-500
      bg: 'rgba(234, 179, 8, 0.1)', // yellow-500/10
    },
    error: {
      text: '#EF4444', // red-500
      bg: 'rgba(239, 68, 68, 0.1)', // red-500/10
    },
    info: {
      text: '#3B82F6', // blue-500
      bg: 'rgba(59, 130, 246, 0.1)', // blue-500/10
    }
  }
};

// Typography
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};

// Spacing
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  neumorph: '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

// Component styles
export const components = {
  // Button styles
  button: {
    base: 'inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    },
    variants: {
      primary: 'bg-primary hover:bg-primary-dark text-white',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-gray-400 hover:text-white hover:bg-gray-700',
    },
  },

  // Input styles
  input: {
    base: 'block w-full rounded-xl bg-background border-0 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-primary',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-4 py-3 text-lg',
    },
  },

  // Card styles
  card: {
    base: 'bg-background-lighter rounded-2xl shadow-neumorph overflow-hidden',
    header: 'p-6 border-b border-gray-700',
    body: 'p-6',
    footer: 'p-6 border-t border-gray-700',
  },

  // Table styles
  table: {
    base: 'min-w-full divide-y divide-gray-700',
    header: 'bg-background',
    headerCell: 'px-6 py-3 text-left text-sm font-semibold text-gray-400',
    row: 'hover:bg-background transition-colors',
    cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-300',
  },

  // Badge styles
  badge: {
    base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    variants: {
      success: 'bg-green-500/10 text-green-500',
      warning: 'bg-yellow-500/10 text-yellow-500',
      error: 'bg-red-500/10 text-red-500',
      info: 'bg-blue-500/10 text-blue-500',
    },
  },
};

// Layout
export const layout = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  container: {
    base: 'mx-auto px-4 sm:px-6 lg:px-8',
    maxWidth: '1536px',
  },
  grid: {
    base: 'grid grid-cols-12 gap-6',
  },
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const theme = {
    colors,
    typography,
    spacing,
    shadows,
    borderRadius,
    components,
    layout,
    animations,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Utility function to combine classes
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Custom hooks for animations
export const useAnimationConfig = () => {
  return animations;
};

// Export everything as a theme object
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  components,
  layout,
  animations,
};

export default theme;
