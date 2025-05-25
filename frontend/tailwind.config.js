/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rabbit-red": "#ea2e0e",
        'pet-brown': '#8B4513',
        'pet-beige': '#F5DEB3',
      },
      keyframes: {
        "color-pop": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "60%": { transform: "scale(1.25) rotate(-10deg)" },
          "80%": { transform: "scale(0.95) rotate(5deg)" },
          "100%": { transform: "scale(1.1) rotate(0deg)" },
        },
        "color-wiggle": {
          "0%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "40%": { transform: "rotate(8deg)" },
          "60%": { transform: "rotate(-4deg)" },
          "80%": { transform: "rotate(4deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'heartbeat': {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      animation: {
        "color-pop": "color-pop 0.4s cubic-bezier(0.4,0,0.2,1)",
        "color-wiggle": "color-wiggle 0.5s ease-in-out",
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'float-fast': 'float 2s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
        'spin-slow-delayed': 'spin 6s linear 3s infinite',
        'bounce-gentle': 'bounce-gentle 1s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out',
      },
      boxShadow: {
        'pet': '0 4px 6px -1px rgba(139, 69, 19, 0.1), 0 2px 4px -1px rgba(139, 69, 19, 0.06)',
      },
    },
  },
  plugins: [],
};
