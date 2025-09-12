"use client";

import { useState } from "react";
import Image from "next/image";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import RasmusImage from "@/images/rasmus.jpg";
import { useTheme } from "@/contexts/ThemeContext";

const BentoBoxFirstTwo = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const { isDark } = useTheme();

  const getBoxScale = (boxId: string) => {
    return hoveredBox === boxId ? 1.02 : 1;
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="text-left w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12">
          {/* Combined Introduction and Toolkit - Full width section */}
          <div
            className="border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 topography-bg"
            style={{
              transform: `scale(${getBoxScale("combined")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("combined")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
              }}
            ></div>

            {/* Introduction and Toolkit - 60/40 layout */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12 h-full">
              {/* Left side - Introduction (60%) */}
              <div className="w-[60%] flex items-start gap-3 sm:gap-4">
                {/* Profile image with animated border */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={RasmusImage.src}
                    alt="Rasmus Mattsson"
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                    width={56}
                    height={56}
                  />
                  {/* Animated border - positioned outside the image */}
                  <svg
                    className="absolute -inset-0.5 w-17 h-17"
                    viewBox="0 0 68 68"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <defs>
                      <linearGradient
                        id="borderGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                        <stop
                          offset="30%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="60%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#8B5CF6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="34"
                      cy="34"
                      r="32"
                      fill="none"
                      stroke="url(#borderGradient)"
                      strokeWidth="4"
                      strokeDasharray="201"
                      strokeDashoffset="201"
                      style={{
                        animation: "spin-border 5s linear infinite",
                      }}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p
                    className="text-3xl sm:text-4xl md:text-5xl font-regular leading-tight"
                    style={{
                      color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                    }}
                  >
                    Hi, I'm Rasmus Mattsson.
                  </p>
                </div>
              </div>

              {/* Right side - Toolkit icons (40%) */}
              <div className="w-[40%] flex items-center justify-center overflow-hidden">
                <div className="scale-75 sm:scale-85 md:scale-95">
                  <InfiniteScrollBanner className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBoxFirstTwo;
