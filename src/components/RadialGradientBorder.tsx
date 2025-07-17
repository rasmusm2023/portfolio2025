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
        background: `linear-gradient(135deg, ${colors.join(", ")})`,
        backgroundSize: "100% 100%",
      };
    }

    switch (variant) {
      case "dash":
        return {
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 10%, ${cardBackground} 20%, ${cardBackground} 30%, ${colors[0]} 40%, ${colors[1]} 50%, ${cardBackground} 60%, ${cardBackground} 70%, ${colors[0]} 80%, ${colors[1]} 90%, ${cardBackground} 100%)`,
          backgroundSize: "300% 300%",
          animation: `sweep ${duration * 8}s linear infinite`,
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
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 10%, ${cardBackground} 20%, ${cardBackground} 30%, ${colors[0]} 40%, ${colors[1]} 50%, ${cardBackground} 60%, ${cardBackground} 70%, ${colors[0]} 80%, ${colors[1]} 90%, ${cardBackground} 100%)`,
          backgroundSize: "300% 300%",
          animation: `sweep ${duration * 8}s linear infinite`,
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
      {/* Animated gradient background (larger than content) */}
      <div
        className="absolute rounded-2xl"
        style={{
          ...getBorderStyle(),
          top: `-${borderWidth}px`,
          left: `-${borderWidth}px`,
          right: `-${borderWidth}px`,
          bottom: `-${borderWidth}px`,
        }}
      />

      {/* Content card positioned on top to create border effect */}
      <div
        className={`relative backdrop-blur-sm rounded-2xl ${sizeClasses[size]} flex items-center justify-center`}
        style={{
          position: "absolute",
          top: `${borderWidth}px`,
          left: `${borderWidth}px`,
          right: `${borderWidth}px`,
          bottom: `${borderWidth}px`,
          backgroundColor: "#232323",
          zIndex: 2,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes sweep {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
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
      `}</style>
    </div>
  );
};

export default RadialGradientBorder;
