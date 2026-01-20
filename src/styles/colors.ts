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
  accentEmerald: ColorScale;
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
  accentEmerald: {
    100: "#10b981", // Accent Emerald Green
    80: "#34d399",
    60: "#6ee7b7",
    40: "#a7f3d0",
    20: "#d1fae5",
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

// Gradients
export const gradients = {
  "gradient-hero-home":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #ffb571 0%, #ff8cf4 36.01%, #fff 82.09%)",
  "gradient-hero-home-accent":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #00FF9D 0%, #00FF9D 36.01%, #fff 82.09%)",
  "gradient-hero-home-orange":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #ffb571 0%, #ff8cf4 36.01%, #fff 82.09%)",
  "gradient-hero-accent":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #00FF9D 0%, #99FFD9 36.01%, #fff 82.09%)",
  "gradient-hero-archives":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #3b82f6 0%, #06b6d4 36.01%, #fff 82.09%)",
  "gradient-hero-about":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #dc2626 0%, #b91c1c 36.01%, #fff 82.09%)",
  "gradient-hero-contact":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #8B5CF6 0%, #A855F7 36.01%, #fff 82.09%)",
  "gradient-heading-projects":
    "radial-gradient(47.08% 208.33% at 79.71% 128.33%,rgba(237,125,255,.8) 11.69%,rgba(108,84,255,.8) 35.44%,rgba(248,248,248,.8) 70.24%)",
  "gradient-heading-projects-orange":
    "radial-gradient(47.08% 208.33% at 79.71% 128.33%,rgba(255,181,113,.8) 11.69%,rgba(255,140,244,.8) 35.44%,rgba(248,248,248,.8) 70.24%)",
  "gradient-home-who":
    "radial-gradient(55.95% 97.37% at 46.69% 2.63%, #00FF9D 0%, #99FFD9 36.01%, #fff 82.09%)",
} as const;

// Helper function to get color with opacity
export const withOpacity = (color: ColorValue, opacity: number): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
