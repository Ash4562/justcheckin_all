module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans your files
  theme: {
    extend: {
      colors: {
        customGreen: "#85D200",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: { min: "320px", max: "639px" }, // Custom range for small screens
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],

};
