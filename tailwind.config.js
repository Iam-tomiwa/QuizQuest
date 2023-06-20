import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwi ndcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#747bff",
        "primary-100": "#747bff27",
        "primary-10": "  #5e64db",
        secondary: "#0a092d",
        "secondary-10": "#2e3856",
        error: "#b00020",
        textClr: "#213547",
        borderClr: "#fff",
      },
      animation: {
        slide: "slide 0.6s ease-in-out",
      },
      boxShadow: {
        card: "0px 0px 40px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        slide: {
          "0%": {transform: "translateX(150vw)"},
          "100%": {transform: "translateX(0)"},
        },
      },
    },
  },
  plugins: [],
};
