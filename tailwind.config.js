/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true
    },
    extend: {
      colors:{
        'main':'#0aad0a'
      },
      boxShadow:{
        'sub-btn':'0px 1px 3px 0px #0000004d, 0px 4px 8px 3px #00000026'
      }
    },
  },
  plugins: [
   
  ],
}