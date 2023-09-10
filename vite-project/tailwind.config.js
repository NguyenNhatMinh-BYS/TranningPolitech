/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      height: {
        800: "800px",
        100: "100px",
        158: "158px",
        900: "900",
      },

      translate: {
        50: "-50%",
      },

      margin: {
        25: "25px",
        50: "50px",
        140: "140px",
        200: "260px",
      },
      width: {
        80: "80%",
        260: "260px",
      },
      colors: {
        main: "#0066c1",
        borderContent: "#CCCCCC",
        hoverContent: "#F6F6F6",
        textFooter: "#727272",
      },
      backgroundColor: {
        main: "#0066c1",
        footer: "#F1F1F1",
        nav: "#d3d2d28c",
      },
      fontSize: {
        15: "15px",
      },
    },
    
  },
  plugins: [],
};
