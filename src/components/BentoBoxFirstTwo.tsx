"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RasmusImage from "@/images/test-profile-image.png";
import { useTheme } from "@/contexts/ThemeContext";

const BentoBoxFirstTwo = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
            <div className="flex items-center xl:items-center gap-3 min-[450px]:gap-6 sm:gap-8 md:gap-12 h-full">
              {/* Left side - Introduction (60%) */}
              <div className="w-[60%] flex items-center xl:items-start gap-3 min-[450px]:gap-6 sm:gap-8">
                {/* Profile image with animated border */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={RasmusImage.src}
                    alt="Rasmus Mattsson"
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: "center 20%" }}
                    width={56}
                    height={56}
                  />
                  {/* Animated border - positioned outside the image */}
                  <svg
                    className="absolute -inset-0.5 w-11 h-11 sm:w-17 sm:h-17"
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
                    className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-regular leading-tight font-instrument-serif"
                    style={{
                      color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                    }}
                  >
                    Hi — I'm Rasmus Mattsson.
                  </p>
                </div>
              </div>

              {/* Right side - CTA Button (40%) */}
              <div className="w-[40%] flex items-center justify-end">
                <button
                  ref={ctaRef}
                  onClick={() => {
                    const element = document.getElementById("case-studies");
                    if (element) {
                      const offset = 20;
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="shimmer-button-green w-fit"
                  style={{
                    fontSize: isMobile ? "0.875rem" : "1rem", // 14px for mobile, 16px for desktop
                    padding: isMobile ? "0.5rem 1rem" : "0.75rem 1.5rem", // px-4 py-2 for mobile, px-6 py-3 for desktop
                  }}
                >
                  <span className="text">
                    <svg
                      className="w-4 h-4 hidden min-[450px]:inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    <span className="hidden min-[450px]:inline">
                      View Projects
                    </span>
                    <span className="min-[450px]:hidden">Projects</span>
                  </span>
                  <span className="shimmer"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBoxFirstTwo;
