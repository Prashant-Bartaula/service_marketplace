
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs':'450px',
        'md':"900px",
      },
      fontFamily:{
        'rubik':'"Rubik Vinyl", cursive'
      },
      backgroundImage: {
        'signup': "url('./src/assets/Sign Up.png')",
      },
    },
  },
  plugins: [],
}