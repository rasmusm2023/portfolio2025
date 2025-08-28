import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const CaseStudyDesignExplorations: React.FC = () => {
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
            prev === 5 ? 0 : prev + 1
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
            prev === 0 ? 5 : prev - 1
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
    <section className="py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex justify-center gap-12"
          style={{
            paddingTop: "calc(40vmax / 10)",
            paddingBottom: "calc(40vmax / 10)",
          }}
        >
          <div className="w-[600px]">
            <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
              Design Explorations
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            <div className="mb-16">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-8">
                During the design process, we explored several concepts and
                features some of which made it to the final design and some that
                ultimately didn't make it into the final prototype. These
                explorations, while not all implemented, provided valuable
                insights and helped refine our understanding of direction, user
                needs and technical constraints.
              </p>
            </div>
          </div>
        </div>

        {/* Image Placeholder with Navigation - Full Width */}
        <div className="mt-16">
          {/* Container with overflow hidden to clip images during drag */}
          <div className="w-full bg-white relative rounded-2xl overflow-hidden">
            {/* Inner container that moves based on current index */}
            <div
              className="w-full relative min-h-[987px] flex"
              style={{
                transform: `translateX(${
                  -currentDesignExplorationIndex * 100
                }%)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Image 1 - Other Color Themes */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <img
                  src="/case-study-assets/emplojd/Emplojd-Design Explorations-Alternative-Color-Themes.svg"
                  alt="Emplojd design exploration showing alternative color themes and visual directions"
                  className="w-auto h-auto max-w-full object-contain"
                  draggable={false}
                />
              </div>

              {/* Image 2 - Page Layout for Saved Cover Letters */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <img
                  src="/case-study-assets/emplojd/Emplojd-Design Explorations-Page-Layout-For-Saved-Cover-Letters.svg"
                  alt="Emplojd design exploration showing page layout for saved cover letters and user management"
                  className="w-auto h-auto max-w-full object-contain"
                  draggable={false}
                />
              </div>

              {/* Image 3 - Peer Review & Collaboration */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-[987px] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg">
                  <p className="text-neutral-60 dark:text-neutral-40 text-lg">
                    [Design Exploration Image 3: Peer Review & Collaboration]
                  </p>
                </div>
              </div>

              {/* Image 4 - Placeholder */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-[987px] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg">
                  <p className="text-neutral-60 dark:text-neutral-40 text-lg">
                    [Design Exploration Image 4: Placeholder]
                  </p>
                </div>
              </div>

              {/* Image 5 - Placeholder */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-[987px] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg">
                  <p className="text-neutral-60 dark:text-neutral-40 text-lg">
                    [Design Exploration Image 5: Placeholder]
                  </p>
                </div>
              </div>

              {/* Image 6 - Placeholder */}
              <div className="w-full h-[987px] flex-shrink-0 flex items-center justify-center">
                <div
                  className={`w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-all duration-300 ${
                    true ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <p className="text-neutral-60 dark:text-neutral-40 text-lg">
                    [Design Exploration Image 6: Placeholder]
                  </p>
                </div>
              </div>
            </div>

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
                  {[0, 1, 2, 3, 4, 5].map((index) => (
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
                  {currentDesignExplorationIndex + 1}/6
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Title and Description - Full Width with GSAP Animations */}
          <div className="mt-8 max-w-[600px] relative overflow-hidden">
            <div
              ref={textContainerRef}
              className="opacity-100 transform translate-y-0"
            >
              <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                {currentDesignExplorationIndex === 0 &&
                  "Alternative Color Themes & Visual Directions"}
                {currentDesignExplorationIndex === 1 &&
                  "Page Layout for Saved Cover Letters"}
                {currentDesignExplorationIndex === 2 &&
                  "Concept 3: Peer Review & Collaboration"}
                {currentDesignExplorationIndex === 3 &&
                  "Concept 4: [Placeholder Title]"}
                {currentDesignExplorationIndex === 4 &&
                  "Concept 5: [Placeholder Title]"}
                {currentDesignExplorationIndex === 5 &&
                  "Concept 6: [Placeholder Title]"}
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                {currentDesignExplorationIndex === 0 &&
                  "We explored various color palettes and visual styles to find the right emotional tone for the platform. As part of our learning journey, we experimented with gradients as a primary design component to understand their impact on modern UI design. We ultimately chose to continue with the gradients as a primary component throughout the entire design, both for their modern, contemporary look but also as an opportunity to learn how to effectively implement gradients throughout the entire design."}
                {currentDesignExplorationIndex === 1 &&
                  "We explored different page layouts for the overview of saved cover letters. In the end I decided to go with a later concept  than the one we initially had in mind. This design decision was made to maintain a consistent design language, accessibility and to keep the design simple and clean."}
                {currentDesignExplorationIndex === 2 &&
                  "We explored features allowing users to get peer feedback on their cover letters or resumes directly within the platform. This was a strong contender but required significant moderation and community features beyond our scope."}
                {currentDesignExplorationIndex === 3 &&
                  "[Placeholder description for Concept 4]"}
                {currentDesignExplorationIndex === 4 &&
                  "[Placeholder description for Concept 5]"}
                {currentDesignExplorationIndex === 5 &&
                  "[Placeholder description for Concept 6]"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDesignExplorations;
