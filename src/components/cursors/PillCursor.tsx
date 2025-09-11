"use client";

import { forwardRef } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

interface PillCursorProps {
  isDark: boolean;
  text: string;
  icon?: "magnifying" | "close" | "swipe" | null;
}

const PillCursor = forwardRef<HTMLDivElement, PillCursorProps>(
  ({ isDark, text, icon }, ref) => {
    const renderIcon = () => {
      switch (icon) {
        case "magnifying":
          return <MagnifyingGlass size={16} style={{ marginRight: "4px" }} />;
        case "close":
          return <X size={16} style={{ marginRight: "4px" }} />;
        case "swipe":
          return (
            <span style={{ fontSize: "16px", marginRight: "4px" }}>↔</span>
          );
        default:
          return null;
      }
    };

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
          width: 120,
          height: 36,
          borderRadius: "18px",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(35, 35, 35, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDark ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        {renderIcon()}
        <span>{text}</span>
      </div>
    );
  }
);

PillCursor.displayName = "PillCursor";

export default PillCursor;
