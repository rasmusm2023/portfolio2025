"use client";

import { useEffect, useRef, forwardRef } from "react";

interface AnimatedBlobProps {
  gradientColors?: {
    primary: string;
    secondary: string;
  };
}

const AnimatedBlob = forwardRef<HTMLDivElement, AnimatedBlobProps>(
  ({ gradientColors }, ref) => {
    const blobRef = useRef<HTMLDivElement>(null);

    // Default gradient colors (fallback)
    const defaultColors = {
      primary: "rgba(237, 125, 255, 0.6)",
      secondary: "rgba(26, 177, 130, 0.4)",
    };

    const colors = gradientColors || defaultColors;

    return (
      <div ref={ref} className="absolute inset-0">
        <div
          ref={blobRef}
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-[500px] h-[500px] rounded-full opacity-40 animate-pulse-blob"
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
        </div>
      </div>
    );
  }
);

AnimatedBlob.displayName = "AnimatedBlob";

export default AnimatedBlob;
