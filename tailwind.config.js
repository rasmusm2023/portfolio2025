/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)"],
        hanken: ["var(--font-hanken-grotesk)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "monospace"],
        audiowide: ["var(--font-audiowide)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        accent: {
          100: "#CDFF71",
          80: "#D7FF8D",
          60: "#E1FFAA",
          40: "#EBFFC6",
          20: "#F5FFE3",
        },
        neutral: {
          100: "#232323",
          90: "#393939",
          80: "#4F4F4F",
          70: "#656565",
          60: "#7B7B7B",
          50: "#919191",
          40: "#A7A7A7",
          30: "#BDBDBD",
          20: "#D3D3D3",
          10: "#E9E9E9",
          3: "#F8F8F8",
          0: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
