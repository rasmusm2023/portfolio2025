import React, { useState, useEffect, useRef } from "react";
import { HandTap } from "@phosphor-icons/react";
import { useTheme } from "@/contexts/ThemeContext";

const Results: React.FC = () => {
  const { isDark } = useTheme();
  const [currentPrototypeIndex, setCurrentPrototypeIndex] = useState(0);
  const [prototypePositions, setPrototypePositions] = useState([0, 1, 2]); // [left, middle, right]
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isPrototypeSectionVisible, setIsPrototypeSectionVisible] =
    useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Prototype titles
  const prototypeTitles = [
    "Cover Letter Generation Flow",
    "Saved Cover Letters Flow",
    "User Profile States",
  ];

  // Prototype showcase handling functions
  const handlePrototypeClick = (clickedIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (clickedIndex === leftPosition) {
      // Clicking the active (left) prototype - toggle video play/pause
      setIsVideoPlaying(!isVideoPlaying);
    } else if (clickedIndex === middlePosition) {
      // Clicking the middle prototype - rotate positions
      setPrototypePositions([middlePosition, rightPosition, leftPosition]);
      setCurrentPrototypeIndex(middlePosition);
    } else if (clickedIndex === rightPosition) {
      // Clicking the right prototype - rotate positions
      setPrototypePositions([rightPosition, leftPosition, middlePosition]);
      setCurrentPrototypeIndex(rightPosition);
    }
  };

  const getPrototypePosition = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "left-1/2 transform -translate-x-[120px] sm:-translate-x-[140px] md:-translate-x-[160px] lg:-translate-x-[400px] xl:-translate-x-[400px] -translate-y-6 z-20";
    } else if (prototypeIndex === middlePosition) {
      return "left-1/2 transform -translate-x-1/2 translate-y-6 z-10";
    } else {
      return "left-1/2 transform translate-x-[20px] sm:translate-x-[30px] md:translate-x-[40px] lg:translate-x-[52px] xl:translate-x-[52px] translate-y-12 z-5";
    }
  };

  const getPrototypeStyling = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "border-purple-400 shadow-2xl shadow-purple-500/25";
    } else if (prototypeIndex === middlePosition) {
      return "border-neutral-600/60 shadow-lg shadow-neutral-900/20 blur-sm";
    } else {
      return "border-neutral-600/60 shadow-lg shadow-neutral-900/20 blur-sm";
    }
  };

  const getPillText = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];

    if (prototypeIndex === leftPosition) {
      // Active prototype - show play/pause state
      return isVideoPlaying ? "PAUSE" : "PLAY";
    } else {
      // Non-active prototype - show flow description
      const flowNames = [
        "COVER LETTER FLOW",
        "SAVED LETTERS FLOW",
        "USER PROFILE FLOW",
      ];
      return `SEE ${flowNames[prototypeIndex]}`;
    }
  };

  // Control video playback based on isVideoPlaying state
  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (isVideoPlaying) {
        video.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      } else {
        video.pause();
      }
    });
  }, [isVideoPlaying]);

  // Intersection Observer for prototype section visibility
  useEffect(() => {
    const prototypeSection = document.querySelector('[data-section="results"]');
    if (!prototypeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPrototypeSectionVisible(true);
            // Always resume video playback when section comes into view
            setIsVideoPlaying(true);
            // Directly play all visible videos
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.play().catch((error) => {
                  console.log("Video play failed:", error);
                });
              }
            });
          } else {
            setIsPrototypeSectionVisible(false);
            // Pause video playback when section goes out of view
            setIsVideoPlaying(false);
            // Directly pause all videos
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.pause();
              }
            });
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "0px 0px -100px 0px", // Add some margin for better UX
      }
    );

    observer.observe(prototypeSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      data-section="results"
      className="py-12 sm:py-12 md:py-16 fade-in-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <div className="flex justify-start mb-8 sm:mb-12">
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
                Results
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
        </div>

        {/* Mobile Swipe Hint and Prototype Titles - ABOVE prototypes, under title */}
        <div className="block sm:hidden mb-6">
          {/* Click Hint */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 text-neutral-60 dark:text-neutral-40 text-sm">
              <HandTap className="w-4 h-4" />
              <span>Click prototypes to pause or swap</span>
            </div>
          </div>

          {/* Prototype Titles - Mobile Only */}
          <div className="text-center sm:hidden">
            <h3 className="text-lg font-semibold text-neutral-80 dark:text-neutral-20 mb-2">
              {prototypeTitles[currentPrototypeIndex]}
            </h3>
            <p className="text-sm text-neutral-60 dark:text-neutral-40">
              {currentPrototypeIndex + 1} of {prototypeTitles.length}
            </p>
          </div>
        </div>

        {/* Interactive Prototype Showcase */}
        <div className="w-full h-[500px] sm:h-[500px] md:h-[600px] lg:h-[800px] xl:h-[987px] relative rounded-2xl overflow-hidden mb-8 sm:mb-12 lg:mb-16">
          {/* SVG Background Slides - Hidden on mobile */}
          <div className="absolute inset-0 w-full h-full hidden sm:block">
            {/* First Background - Cover Letter Generation Flow */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentPrototypeIndex === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/case-study-assets/emplojd/Emplojd-Results-Cover-Letter-Generation-Flow.svg"
                alt="Cover Letter Generation Flow"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Second Background - Saved Cover Letters Flow */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentPrototypeIndex === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/case-study-assets/emplojd/Emplojd-Results-Saved-Cover-Letters-Flow.svg"
                alt="Saved Cover Letters Flow"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Third Background - User Profile States */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentPrototypeIndex === 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/case-study-assets/emplojd/Emplojd-Results-User-Profile-States.svg"
                alt="User Profile States"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Prototype Device Boxes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Prototype Box 1 */}
            <div
              className={`absolute transition-all duration-500 cursor-pointer prototype-box cursor-pointer ${getPrototypePosition(
                0
              )}`}
              onClick={() => handlePrototypeClick(0)}
              data-tooltip={
                prototypePositions[0] === 0
                  ? "prototype-active"
                  : "prototype-inactive"
              }
              data-video-state={isVideoPlaying ? "playing" : "paused"}
            >
              <div
                className={`w-[180px] sm:w-[200px] md:w-[220px] lg:w-[320px] xl:w-[320px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[710px] xl:h-[710px] bg-neutral-900 rounded-[20px] sm:rounded-[22px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[32px] border-2 transition-all duration-500 ${getPrototypeStyling(
                  0
                )}`}
              >
                <div className="w-full h-full bg-neutral-800 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] overflow-hidden relative">
                  <video
                    ref={(el) => {
                      videoRefs.current[0] = el;
                    }}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay={isVideoPlaying && isPrototypeSectionVisible}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source
                      src="/case-study-assets/emplojd/Emplojd_Results_Cover_Letter_Generation_Flow.webm"
                      type="video/webm"
                    />
                  </video>
                  {/* Dark overlay for non-active prototypes */}
                  {prototypePositions[0] !== 0 && (
                    <div className="absolute inset-0 bg-black/50 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Prototype Box 2 */}
            <div
              className={`absolute transition-all duration-500 cursor-pointer prototype-box cursor-pointer ${getPrototypePosition(
                1
              )}`}
              onClick={() => handlePrototypeClick(1)}
              data-tooltip={
                prototypePositions[0] === 1
                  ? "prototype-active"
                  : "prototype-inactive"
              }
              data-video-state={isVideoPlaying ? "playing" : "paused"}
            >
              <div
                className={`w-[180px] sm:w-[200px] md:w-[220px] lg:w-[320px] xl:w-[320px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[710px] xl:h-[710px] bg-neutral-900 rounded-[20px] sm:rounded-[22px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[32px] border-2 transition-all duration-500 ${getPrototypeStyling(
                  1
                )}`}
              >
                <div className="w-full h-full bg-neutral-800 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] overflow-hidden relative">
                  <video
                    ref={(el) => {
                      videoRefs.current[1] = el;
                    }}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay={isVideoPlaying && isPrototypeSectionVisible}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source
                      src="/case-study-assets/emplojd/Emplojd_Results_Saved_Cover_Letters_Flow.webm"
                      type="video/webm"
                    />
                  </video>
                  {/* Dark overlay for non-active prototypes */}
                  {prototypePositions[0] !== 1 && (
                    <div className="absolute inset-0 bg-black/50 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Prototype Box 3 */}
            <div
              className={`absolute transition-all duration-500 cursor-pointer cursor-pointer ${getPrototypePosition(
                2
              )}`}
              onClick={() => handlePrototypeClick(2)}
              data-tooltip={
                prototypePositions[0] === 2
                  ? "prototype-active"
                  : "prototype-inactive"
              }
              data-video-state={isVideoPlaying ? "playing" : "paused"}
            >
              <div
                className={`w-[180px] sm:w-[200px] md:w-[220px] lg:w-[320px] xl:w-[320px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[710px] xl:h-[710px] bg-neutral-900 rounded-[20px] sm:rounded-[22px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[32px] border-2 transition-all duration-500 ${getPrototypeStyling(
                  2
                )}`}
              >
                <div className="w-full h-full bg-neutral-800 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] overflow-hidden relative">
                  <video
                    ref={(el) => {
                      videoRefs.current[2] = el;
                    }}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay={isVideoPlaying && isPrototypeSectionVisible}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source
                      src="/case-study-assets/emplojd/Emplojd_Results_User_Profile_States.webm"
                      type="video/webm"
                    />
                  </video>
                  {/* Dark overlay for non-active prototypes */}
                  {prototypePositions[0] !== 2 && (
                    <div className="absolute inset-0 bg-black/50 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] xl:rounded-[30px] pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Prototype Titles - Hidden on Mobile */}
        <div className="hidden sm:block text-center mt-8">
          <h3 className="text-xl font-semibold text-neutral-80 dark:text-neutral-20 mb-2">
            {prototypeTitles[currentPrototypeIndex]}
          </h3>
          <p className="text-sm text-neutral-60 dark:text-neutral-40">
            {currentPrototypeIndex + 1} of {prototypeTitles.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Results;
