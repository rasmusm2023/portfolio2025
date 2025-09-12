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
            className="w-[500px] h-[500px] rounded-full opacity-40 animate-pulse-blob relative"
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          >
            {/* Noise layer overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-60 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

AnimatedBlob.displayName = "AnimatedBlob";

export default AnimatedBlob;
