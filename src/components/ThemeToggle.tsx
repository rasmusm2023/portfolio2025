"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-all duration-200 hover:bg-neutral-100/10 dark:hover:bg-neutral-0/10 group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <SunIcon
          weight="fill"
          className={`w-6 h-6 transition-all duration-300 ${
            isDark
              ? "text-yellow-400 opacity-100 rotate-0"
              : "text-neutral-60 opacity-0 -rotate-90"
          }`}
        />
        {/* Moon Icon */}
        <MoonIcon
          weight="fill"
          className={`absolute top-0 left-0 w-6 h-6 transition-all duration-300 ${
            isDark
              ? "text-neutral-60 opacity-0 rotate-90"
              : "text-neutral-60 opacity-100 rotate-0"
          }`}
        />
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neutral-100/5 to-neutral-0/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
};

export default ThemeToggle;
