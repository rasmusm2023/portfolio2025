import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

interface CraftProps {
  // Add any props if needed
}

const Craft: React.FC<CraftProps> = () => {
  const { isDark } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const craftTextContainerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    // Animate text out with GSAP
    if (craftTextContainerRef.current) {
      gsap.to(craftTextContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev === 2 ? 0 : prev + 1));
          // Animate text in with GSAP
          gsap.to(craftTextContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setCurrentImageIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    // Animate text out with GSAP
    if (craftTextContainerRef.current) {
      gsap.to(craftTextContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev === 0 ? 2 : prev - 1));
          // Animate text in with GSAP
          gsap.to(craftTextContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? 2 : prev - 1));
    }
  };

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (craftTextContainerRef.current) {
        gsap.killTweensOf(craftTextContainerRef.current);
      }
    };
  }, []);

  return (
    <section
      data-section="craft"
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
                The Craft
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
                  This phase was about turning insights into tangible design
                  work.
                </span>{" "}
                I focused on building a clear and consistent foundation,
                creating flows, wireframes, and mockups that balanced usability
                with scalability.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                  }}
                >
                  Each step aimed to keep the product simple, personal, and
                  efficient, while enabling the team to move quickly under tight
                  time constraints.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Full-width boxes container */}
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {/* User Flows Box */}
            <div className="group relative p-8 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-2xl hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center justify-between sm:justify-start gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-all duration-500 ease-in-out">
                      User Flows for System Thinking
                    </h3>
                    <div className="flex-shrink-0 w-16 h-16 sm:hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                      <img
                        src="/assets/icons/MorphingShapes/CS_Ellipse_8.svg"
                        alt="User Flows Icon"
                        className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                        style={{
                          transition:
                            "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] group-hover:text-neutral-90 dark:group-hover:text-neutral-10 transition-all duration-500 ease-in-out">
                    I started by mapping out the complete user journey from
                    initial profile creation to final application submission.
                    This helped identify potential friction points and ensured
                    the system architecture supported a smooth, logical flow.
                    The flows became a shared language between design and
                    development teams, making it easier to spot technical
                    challenges early and plan solutions collaboratively.
                  </p>
                </div>
                <div className="hidden sm:flex flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                  <img
                    src="/assets/icons/MorphingShapes/CS_Ellipse_8.svg"
                    alt="User Flows Icon"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                    style={{
                      transition:
                        "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Wireframes Box */}
            <div className="group relative p-8 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-2xl hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center justify-between sm:justify-start gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-all duration-500 ease-in-out">
                      Wireframes to Kickstart Development
                    </h3>
                    <div className="flex-shrink-0 w-16 h-16 sm:hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                      <img
                        src="/assets/icons/MorphingShapes/CS_Rectangle_2.svg"
                        alt="Wireframes Icon"
                        className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                        style={{
                          transition:
                            "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] group-hover:text-neutral-90 dark:group-hover:text-neutral-10 transition-all duration-500 ease-in-out">
                    I created wireframes to quickly establish structure and
                    functionality, giving the team a shared blueprint to work
                    from. These early layouts allowed developers to start
                    building sooner while design continued in parallel, keeping
                    momentum under tight deadlines.
                  </p>
                </div>
                <div className="hidden sm:flex flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                  <img
                    src="/assets/icons/MorphingShapes/CS_Rectangle_2.svg"
                    alt="Wireframes Icon"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                    style={{
                      transition:
                        "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mockups Box */}
            <div className="group relative p-8 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-2xl hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center justify-between sm:justify-start gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-all duration-500 ease-in-out">
                      Mockups & Prototyping
                    </h3>
                    <div className="flex-shrink-0 w-16 h-16 sm:hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                      <img
                        src="/assets/icons/MorphingShapes/CS_Polygon_7.svg"
                        alt="Mockups Icon"
                        className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                        style={{
                          transition:
                            "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] group-hover:text-neutral-90 dark:group-hover:text-neutral-10 transition-all duration-500 ease-in-out">
                    Low-fidelity mockups and prototypes brought the product to
                    life, making it easier to test usability and communicate
                    design decisions. These prototypes also served as a bridge
                    between design and development, ensuring the vision was
                    clear for everyone involved.
                  </p>
                </div>
                <div className="hidden sm:flex flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                  <img
                    src="/assets/icons/MorphingShapes/CS_Polygon_7.svg"
                    alt="Mockups Icon"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                    style={{
                      transition:
                        "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Iterative Testing & User Feedback Box */}
            <div className="group relative p-8 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-2xl hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center justify-between sm:justify-start gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-all duration-500 ease-in-out">
                      Iterative Testing & User Feedback
                    </h3>
                    <div className="flex-shrink-0 w-16 h-16 sm:hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                      <img
                        src="/assets/icons/MorphingShapes/CS_Star_1.svg"
                        alt="Iterative Testing Icon"
                        className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                        style={{
                          transition:
                            "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] group-hover:text-neutral-90 dark:group-hover:text-neutral-10 transition-all duration-500 ease-in-out">
                    Most testing was done within the team, where we continuously
                    refined designs and prototypes throughout development. In
                    addition, we conducted two rounds of user testing at
                    different stages of the product, helping us validate key
                    flows and uncover improvements to usability and clarity.
                  </p>
                </div>
                <div className="hidden sm:flex flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                  <img
                    src="/assets/icons/MorphingShapes/CS_Star_1.svg"
                    alt="Iterative Testing Icon"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                    style={{
                      transition:
                        "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Collaboration Box */}
            <div className="group relative p-8 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-2xl hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center justify-between sm:justify-start gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-all duration-500 ease-in-out">
                      Collaboration with Developers
                    </h3>
                    <div className="flex-shrink-0 w-16 h-16 sm:hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                      <img
                        src="/assets/icons/MorphingShapes/CS_Moon_1.svg"
                        alt="Collaboration Icon"
                        className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                        style={{
                          transition:
                            "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] group-hover:text-neutral-90 dark:group-hover:text-neutral-10 transition-all duration-500 ease-in-out">
                    Close collaboration with developers was key throughout the
                    project. By aligning on the design system and maintaining
                    open communication, we ensured consistency between design
                    and implementation, allowing both teams to move quickly and
                    stay coordinated.
                  </p>
                </div>
                <div className="hidden sm:flex flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 ease-in-out">
                  <img
                    src="/assets/icons/MorphingShapes/CS_Moon_1.svg"
                    alt="Collaboration Icon"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:rotate-180"
                    style={{
                      transition:
                        "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Placeholder Below - Full Image Display with Navigation */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="w-full bg-white relative rounded-2xl overflow-hidden">
            {/* First Image - Wireframes */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-The-Craft-Wireframes.svg"
              alt="Emplojd wireframes showing user flow mapping and interface design"
              className={`w-full h-auto object-contain transition-opacity duration-300 ${
                currentImageIndex === 0 ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Second Image - Mockups */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-The-Craft-Various-Mockups.svg"
              alt="Emplojd mockups showing design iterations and final interface concepts"
              className={`w-full h-auto object-contain absolute inset-0 transition-opacity duration-300 ${
                currentImageIndex === 1 ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Third Image - From Swiping to Searching */}
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-The-Craft-From-Swiping-To-Searching.svg"
              alt="Emplojd design exploration showing the evolution from swiping to searching interface patterns"
              className={`w-full h-auto object-contain absolute inset-0 transition-opacity duration-300 ${
                currentImageIndex === 2 ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
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
              onClick={nextImage}
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
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                        index === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                {/* Current position indicator */}
                <div className="w-px h-4 bg-white/30 mx-1" />
                <span className="text-white/90 text-xs font-medium">
                  {currentImageIndex + 1}/3
                </span>
              </div>
            </div>
          </div>

          {/* Image Caption - Updates based on current image */}
          <div className="mt-4 text-center">
            <div
              ref={craftTextContainerRef}
              className="opacity-100 transform translate-y-0"
            >
              <p className="text-neutral-60 dark:text-neutral-40 text-xs sm:text-sm font-medium text-left">
                {currentImageIndex === 0
                  ? "Image 1: Various wireframes showing user flow mapping and interface design iterations."
                  : currentImageIndex === 1
                  ? "Image 2: Design mockups showcasing final interface concepts and visual design decisions."
                  : "Image 3: User testing results that led to key insights and fundamental product decisions, including the shift from swiping to searching interface patterns."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craft;
