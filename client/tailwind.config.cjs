/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('/src/assets/background.png')",
        homeBg: "url('/src/assets/home.png')",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      animation: {
        loading: "loading 1s ease infinite",
      },
      keyframes: {
        loading: {
          "0%": { transform: "rotate(0turn)" },
          "100%": { transform: " rotate(1turn)" },
        },
      },
    },
    fontFamily: {
      title: ["SimSun"],
    },
  },
  plugins: [],
};
