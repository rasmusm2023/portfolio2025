"use client";

import React from "react";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dotted" | "gradient";
  borderColors?: string[];
  borderWidth?: number;
  duration?: number;
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  className = "",
  variant = "dotted",
  borderColors = ["#00FF9D", "#3b82f6"],
  borderWidth = 2,
  duration = 3,
}) => {
  if (variant === "gradient") {
    return (
      <div className={`relative ${className}`}>
        {/* Content container */}
        <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl h-full">
          {children}
        </div>

        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from 0deg, ${borderColors.join(
              ", "
            )}, ${borderColors[0]})`,
            animation: `rotate ${duration}s linear infinite`,
            padding: `${borderWidth}px`,
            zIndex: -1,
          }}
        />

        <style jsx>{`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Default dotted variant
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border p-6 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedBorder;
