/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('src/assets/images/login.jpg')",
      },
    },
    screens: {
      xs: "576px",
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      xxl: "1536px",
    },
  },
  plugins: [],
};
