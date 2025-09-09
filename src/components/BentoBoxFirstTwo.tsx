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
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 md:gap-12 auto-rows-[280px] sm:auto-rows-[300px] md:auto-rows-[320px]">
          {/* About - Standing section */}
          <div
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-start relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("about-me")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("about-me")}
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
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
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
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
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
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p
                className="text-base sm:text-lg md:text-xl font-bold leading-relaxed"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                }}
              >
                👋 Hi, I'm Rasmus Mattsson, a digital designer and low-code
                developer with a passion for creating beautiful, seamless
                experiences that make a difference.
              </p>
            </div>
          </div>

          {/* I work in - Large section */}
          <div
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("toolkit")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("toolkit")}
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

            {/* Title section - positioned at top */}
            <div className="flex items-center justify-between p-4 sm:p-6 md:p-8">
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-base sm:text-lg md:text-xl font-bold font-montserrat uppercase tracking-wider"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  <span className="block lg:hidden">My toolkit</span>
                  <span className="hidden lg:block">My toolkit include</span>
                </h2>
                <p
                  className="hidden lg:block text-sm sm:text-base md:text-lg font-hanken"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                  }}
                >
                  but is not limited to:
                </p>
              </div>
              <Image
                src="/icons/3dicons-tools-dynamic-premium.png"
                alt="Tools"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-pulse-subtle"
              />
            </div>

            {/* GSAP-powered Infinite Scroll Banner - centered in remaining space */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
              <InfiniteScrollBanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBoxFirstTwo;
