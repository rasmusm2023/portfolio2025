/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "500px",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "sans-serif"],
        figtree: ["var(--font-figtree)", "sans-serif"],
        hanken: ["var(--font-hanken-grotesk)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "monospace"],
        audiowide: ["var(--font-audiowide)", "cursive"],
        "instrument-serif": ["var(--font-instrument-serif)", "serif"],
        "instrument-sans": ["var(--font-instrument-sans)", "sans-serif"],
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
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "preview-overlay": "previewOverlayIn 0.3s ease-out forwards",
        "preview-content": "previewContentIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards",
        "preview-overlay-out": "previewOverlayOut 0.25s ease-in forwards",
        "preview-content-out": "previewContentOut 0.25s ease-in forwards",
        "preview-expand": "previewExpandVerticalThenHorizontal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        previewOverlayIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        previewContentIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        previewOverlayOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        previewContentOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.96)" },
        },
        /* Expand: first vertical (up/down), then horizontal — clearly visible growth */
        previewExpandVerticalThenHorizontal: {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scaleX(1) scaleY(1.6)" },
          "100%": { transform: "scale(1.85)" },
        },
      },
    },
  },
  plugins: [],
};
