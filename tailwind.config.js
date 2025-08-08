/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        surface: '#FFFFFF',
        background: '#F9FAFB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -8px rgba(16, 185, 129, 0.4)'
      },
      animation: {
        'task-complete': 'task-complete 0.4s ease-out forwards',
        'checkmark-draw': 'checkmark-draw 0.3s ease-out 0.1s forwards',
        'bounce-in': 'bounce-in 0.6s ease-out forwards'
      },
      keyframes: {
        'task-complete': {
          '0%': { transform: 'scale(1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 20px -8px rgba(16, 185, 129, 0.4)' },
          '100%': { transform: 'scale(1)', opacity: '0.6' }
        },
        'checkmark-draw': {
          '0%': { strokeDasharray: '0 100' },
          '100%': { strokeDasharray: '100 100' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}