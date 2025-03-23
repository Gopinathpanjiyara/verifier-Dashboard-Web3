module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // blue-400
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB', // blue-600
        },
        background: {
          lighter: '#1F2937', // gray-800
          DEFAULT: '#111827', // gray-900
          darker: '#030712', // gray-950
        },
        success: {
          light: '#4ADE80', // green-400
          DEFAULT: '#22C55E', // green-500
          dark: '#16A34A', // green-600
        },
        warning: {
          light: '#FCD34D', // yellow-400
          DEFAULT: '#EAB308', // yellow-500
          dark: '#CA8A04', // yellow-600
        },
        error: {
          light: '#F87171', // red-400
          DEFAULT: '#EF4444', // red-500
          dark: '#DC2626', // red-600
        },
        info: {
          light: '#60A5FA', // blue-400
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB', // blue-600
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neumorph: '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
        'neumorph-sm': '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)',
        'neumorph-lg': '10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '85': '0.85',
        '95': '0.95',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
      opacity: ['active', 'disabled'],
      cursor: ['disabled'],
      ringColor: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      scale: ['active', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
