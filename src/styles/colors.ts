// Color type definitions
export type ColorValue = string;

export type ColorScale = {
  100: ColorValue;
  80: ColorValue;
  60: ColorValue;
  40: ColorValue;
  20: ColorValue;
};

export type NeutralColorScale = ColorScale & {
  90: ColorValue;
  70: ColorValue;
  50: ColorValue;
  30: ColorValue;
  10: ColorValue;
  3: ColorValue;
  0: ColorValue;
};

export type ColorPalette = {
  accent: ColorScale;
  neutral: NeutralColorScale;
  test: ColorValue;
};

// Color values
export const colors: ColorPalette = {
  accent: {
    100: "#00FF9D", // Accent Neon Green
    80: "#33FFB1",
    60: "#66FFC5",
    40: "#99FFD9",
    20: "#CCFFED",
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
  test: "#00FF9D",
} as const;

// Theme type definitions
export type ColorTheme = {
  background: ColorValue;
  text: ColorValue;
  accent: ColorValue;
};

export type Theme = {
  light: ColorTheme;
  dark: ColorTheme;
};

// Theme configuration
export const theme: Theme = {
  light: {
    background: colors.neutral[0],
    text: colors.neutral[100],
    accent: colors.accent[100],
  },
  dark: {
    background: colors.neutral[100],
    text: colors.neutral[0],
    accent: colors.accent[100],
  },
};

// Helper function to get color with opacity
export const withOpacity = (color: ColorValue, opacity: number): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
