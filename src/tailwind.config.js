module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 20s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounceSlow: 'bounce 2s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'transform': 'transform'
      }
    }
  },
  plugins: [],
}