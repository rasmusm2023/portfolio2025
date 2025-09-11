"use client";

import { forwardRef } from "react";

interface CircleCursorProps {
  isDark: boolean;
}

const CircleCursor = forwardRef<HTMLDivElement, CircleCursorProps>(
  ({ isDark }, ref) => {
    return (
      <div
        ref={ref}
        className="custom-cursor"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 99999,
          width: 84,
          height: 84,
          borderRadius: "50%",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(139, 92, 246, 0.3)",
          border: isDark
            ? "2px solid rgba(255, 255, 255, 0.8)"
            : "2px solid rgba(139, 92, 246, 0.8)",
        }}
      />
    );
  }
);

CircleCursor.displayName = "CircleCursor";

export default CircleCursor;
