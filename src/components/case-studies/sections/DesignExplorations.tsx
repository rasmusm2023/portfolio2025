import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

const DesignExplorations: React.FC = () => {
  const { isDark } = useTheme();
  const [currentDesignExplorationIndex, setCurrentDesignExplorationIndex] =
    useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const nextDesignExploration = () => {
    // Animate text out with GSAP
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentDesignExplorationIndex((prev) =>
            prev === 2 ? 0 : prev + 1
          );
          // Animate text in with GSAP
          gsap.to(textContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const prevDesignExploration = () => {
    // Animate text out with GSAP
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentDesignExplorationIndex((prev) =>
            prev === 0 ? 2 : prev - 1
          );
          // Animate text in with GSAP
          gsap.to(textContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }
  };

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (textContainerRef.current) {
        gsap.killTweensOf(textContainerRef.current);
      }
    };
  }, []);

  return (
    <section
      data-section="design-explorations"
      className="py-12 sm:py-12 md:py-16 fade-in-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-left font-instrument-serif">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                    : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                }}
              >
                Design Explorations
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                  }}
                >
                  During the design process, we explored several concepts and
                  features
                </span>{" "}
                some of which made it to the final design and some that
                ultimately didn't make it into the final prototype. These
                explorations, while not all implemented, provided valuable
                insights and helped refine our understanding of direction, user
                needs and technical constraints.
              </p>
            </div>
          </div>
        </div>

        {/* Image Placeholder with Navigation - Full Width */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          {/* Container with overflow hidden to clip images during drag */}
          <div className="w-full bg-white relative rounded-2xl overflow-hidden">
            {/* First Image - Other Color Themes */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Design Explorations-Alternative-Color-Themes.svg"
              alt="Emplojd design exploration showing alternative color themes and visual directions"
              className={`w-full h-auto object-contain transition-opacity duration-300 ${
                currentDesignExplorationIndex === 0
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              draggable={false}
            />

            {/* Second Image - Page Layout for Saved Cover Letters */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Design Explorations-Page-Layout-For-Saved-Cover-Letters.svg"
              alt="Emplojd design exploration showing page layout for saved cover letters and user management"
              className={`w-full h-auto object-contain absolute inset-0 transition-opacity duration-300 ${
                currentDesignExplorationIndex === 1
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              draggable={false}
            />

            {/* Third Image - Page Layout for Saved Jobs */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Design Explorations-Page-Layout-For-Saved-Jobs.svg"
              alt="Emplojd design exploration showing page layout for saved jobs and job management interface"
              className={`w-full h-auto object-contain absolute inset-0 transition-opacity duration-300 ${
                currentDesignExplorationIndex === 2
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              draggable={false}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevDesignExploration}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 group z-10"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-white/90 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextDesignExploration}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 group z-10"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-white/90 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Visual Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full px-4 py-2 z-10">
              <div className="flex items-center gap-2">
                {/* Progress dots */}
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDesignExplorationIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                        index === currentDesignExplorationIndex
                          ? "bg-white scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                {/* Current position indicator */}
                <div className="w-px h-4 bg-white/30 mx-1" />
                <span className="text-white/90 text-xs font-medium">
                  {currentDesignExplorationIndex + 1}/3
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Title and Description - Full Width with GSAP Animations */}
          <div className="mt-8 sm:mt-12 lg:mt-16 max-w-full lg:max-w-[600px] relative overflow-hidden">
            <div
              ref={textContainerRef}
              className="opacity-100 transform translate-y-0"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
                {currentDesignExplorationIndex === 0 &&
                  "Alternative Color Themes & Visual Directions"}
                {currentDesignExplorationIndex === 1 &&
                  "Page Layout for Saved Cover Letters"}
                {currentDesignExplorationIndex === 2 &&
                  "Page Layout for Saved Jobs"}
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                {currentDesignExplorationIndex === 0 &&
                  "We explored various color palettes and visual styles to find the right emotional tone for the platform. As part of our learning journey, we experimented with gradients as a primary design component to understand their impact on modern UI design. We ultimately chose to continue with the gradients as a primary component throughout the entire design, both for their modern, contemporary look but also as an opportunity to learn how to effectively implement gradients throughout the entire design."}
                {currentDesignExplorationIndex === 1 && (
                  <>
                    We explored different page layouts for the overview of saved
                    cover letters. In the end I decided to go with a later
                    concept than the one we initially had in mind.{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      This design decision was made to maintain a consistent
                      design language, accessibility and to keep the design
                      simple and clean.
                    </span>
                  </>
                )}
                {currentDesignExplorationIndex === 2 && (
                  <>
                    We explored different approaches for organizing and
                    displaying saved job listings. This exploration focused on
                    creating an intuitive interface that allows users to easily
                    manage their job applications while maintaining visual
                    consistency with the rest of the platform.{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      The final design prioritizes clarity and quick access to
                      essential job information.
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignExplorations;
