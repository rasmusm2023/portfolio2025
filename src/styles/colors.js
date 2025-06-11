export const colors = {
  accent: {
    100: "#CDFF71", // Accent Avocado - Most saturated
    80: "#D7FF8D",
    60: "#E1FFAA",
    40: "#EBFFC6",
    20: "#F5FFE3", // Accent Avocado - Least saturated
  },
  neutral: {
    100: "#232323", // Primary Neutral - Darkest
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
    0: "#FFFFFF", // Primary Neutral - Lightest
  },
};

// Theme configuration for future dark/light mode implementation
export const theme = {
  light: {
    background: colors.neutral[0],
    text: colors.neutral[100],
    accent: colors.accent[100],
    // Add more light theme colors as needed
  },
  dark: {
    background: colors.neutral[100],
    text: colors.neutral[0],
    accent: colors.accent[100],
    // Add more dark theme colors as needed
  },
};

// Helper function to get color with opacity
export const withOpacity = (color, opacity) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
