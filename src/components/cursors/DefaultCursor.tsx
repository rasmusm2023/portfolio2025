"use client";

import { forwardRef } from "react";

interface DefaultCursorProps {
  isDark: boolean;
}

const DefaultCursor = forwardRef<HTMLDivElement, DefaultCursorProps>(
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
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(139, 92, 246, 0.8)",
        }}
      />
    );
  }
);

DefaultCursor.displayName = "DefaultCursor";

export default DefaultCursor;
