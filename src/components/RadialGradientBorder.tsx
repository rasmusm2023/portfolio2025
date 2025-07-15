"use client";

import React, { useState } from "react";

interface RadialGradientBorderProps {
  children: React.ReactNode;
  variant?: "dash" | "gradient" | "pulse";
  shineColor?: string[];
  borderWidth?: number;
  duration?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const RadialGradientBorder: React.FC<RadialGradientBorderProps> = ({
  children,
  variant = "dash",
  shineColor = ["#3b82f6", "#f43f5e"],
  borderWidth = 4,
  duration = 3,
  className = "",
  size = "md",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  const getBorderStyle = () => {
    // Take only the first 2 colors from shineColor array and make them less dominant
    const colors = shineColor.slice(0, 2).map((color) => `${color}80`); // Add 50% opacity
    // Use the darkest background color (neutral-100)
    const cardBackground = "#232323"; // This is the darkest color from colors.js

    // When hovered, show static green gradient border
    if (isHovered) {
      return {
        background: `linear-gradient(180deg, ${colors.join(", ")})`,
        backgroundSize: "100% 100%",
      };
    }

    switch (variant) {
      case "dash":
        return {
          background: `linear-gradient(180deg, ${cardBackground}, ${colors.join(
            ", "
          )}, ${cardBackground})`,
          backgroundSize: "200% 200%",
          animation: `dash ${duration}s ease-in-out infinite`,
        };
      case "gradient":
        return {
          background: `conic-gradient(from 0deg, ${cardBackground}, ${colors.join(
            ", "
          )}, ${cardBackground})`,
          animation: `gradient ${duration}s linear infinite`,
        };
      case "pulse":
        return {
          background: `linear-gradient(180deg, ${cardBackground}, ${colors.join(
            ", "
          )}, ${cardBackground})`,
          backgroundSize: "200% 200%",
          animation: `pulse ${duration}s ease-in-out infinite`,
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Animated gradient background (full size) */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out"
        style={{
          ...getBorderStyle(),
          zIndex: 1,
        }}
      />

      {/* Layer 2: Dark content card (smaller to create border) */}
      <div
        className={`relative backdrop-blur-sm rounded-2xl ${sizeClasses[size]}`}
        style={{
          margin: `${borderWidth}px`,
          height: `calc(100% - ${borderWidth * 2}px)`,
          backgroundColor: "#232323",
          zIndex: 2,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes dash {
          0% {
            background-position: 50% 200%;
          }
          100% {
            background-position: 50% 0%;
          }
        }

        @keyframes gradient {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse {
          0% {
            background-position: 50% 200%;
          }
          50% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 50% 200%;
          }
        }
      `}</style>
    </div>
  );
};

export default RadialGradientBorder;
