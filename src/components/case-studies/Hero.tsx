import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface HeroProps {
  title: string;
  subtitle: string;
  roleText: string;
  companyOrType: "Company" | "Type";
  companyText: string;
  yearText: string;
  teamRoles: string[];
  technologies: string[];
  link: string;
  linkText: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  roleText,
  companyOrType,
  companyText,
  yearText,
  teamRoles,
  technologies,
  link,
  linkText,
}) => {
  const morphRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);
  const { isDark } = useTheme();

  const handleCaseStudiesClick = () => {
    // Navigate to Work page instead of home
    window.location.href = "/work";
  };

  // Loading Animation Component
  const LoadingAnimation = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning loader */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white/90 text-sm font-medium mb-1">
            Loading video
          </p>
          <p className="text-white/70 text-xs">Please wait...</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  // GSAP Morphing Effect
  useEffect(() => {
    const morphContainer = morphRef.current;
    if (!morphContainer) return;

    const morphPath = morphContainer.querySelector(
      ".morph-path"
    ) as SVGPathElement;
    const starPath = morphContainer.querySelector(
      ".star-target"
    ) as SVGPathElement;
    const trianglePath = morphContainer.querySelector(
      ".triangle-target"
    ) as SVGPathElement;

    if (!morphPath || !starPath || !trianglePath) return;

    // Set initial state to star
    gsap.set(morphPath, { morphSVG: starPath });

    // Create morphing timeline - only on hover
    const morphTimeline = gsap.timeline({ paused: true });

    // Morph to triangle on hover
    morphTimeline.to(morphPath, {
      morphSVG: trianglePath,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Handle hover events
    const handleMouseEnter = () => {
      console.log("Button hover enter - morphing to triangle");
      setIsHovered(true);
      morphTimeline.play();
      // Smooth gradient transition to different purple
      gsap.to(morphContainer, {
        "--gradient-from": "#a855f7",
        "--gradient-to": "#9333ea",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    const handleMouseLeave = () => {
      console.log("Button hover leave - morphing back to star");
      setIsHovered(false);
      morphTimeline.reverse();
      // Smooth gradient transition back to original purple
      gsap.to(morphContainer, {
        "--gradient-from": "#907EFF",
        "--gradient-to": "#7c3aed",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    morphContainer.addEventListener("mouseenter", handleMouseEnter);
    morphContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      morphContainer.removeEventListener("mouseenter", handleMouseEnter);
      morphContainer.removeEventListener("mouseleave", handleMouseLeave);
      morphTimeline.kill();
    };
  }, []);

  // Video control effect to prevent looping
  useEffect(() => {
    const video = document.querySelector("video");
    if (!video) return;

    const handleTimeUpdate = () => {
      // If video is near the end, pause it to prevent looping
      if (video.currentTime >= video.duration - 0.1) {
        video.pause();
        video.currentTime = video.duration;
      }
    };

    const handleSeeked = () => {
      // If video is seeked to the end, pause it
      if (video.currentTime >= video.duration - 0.1) {
        video.pause();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Hero Section Spinning Icons Effect
  useEffect(() => {
    // Add spinning-icon class to all hero image containers
    const heroContainers = document.querySelectorAll(
      '[class*="hero-image-container"]'
    );
    heroContainers.forEach((container) => {
      container.classList.add("spinning-icon");
    });

    // Animate all hero images with GSAP
    const heroImages = document.querySelectorAll(".spinning-icon");
    heroImages.forEach((image) => {
      gsap.to(image, {
        rotation: 360,
        duration: 10, // Adjust duration as needed
        repeat: -1,
        ease: "linear",
      });
    });
  }, []);

  return (
    <section className="pt-20 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 relative">
      {/* Left Container - Fixed position, starts at same place as section titles */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-start gap-0 mb-4 sm:mb-0">
          {/* Back Arrow + Case Studies Rectangle */}
          <button
            onClick={handleCaseStudiesClick}
            className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-l-lg hover:bg-neutral-20 dark:hover:bg-neutral-80 transition-all duration-200 group h-full w-40 sm:w-auto justify-start"
          >
            <ArrowLeft
              size={16}
              className="text-neutral-100 dark:text-neutral-0 group-hover:text-neutral-70 dark:group-hover:text-neutral-30 transition-colors"
            />
            <span className="text-neutral-100 dark:text-neutral-0 uppercase group-hover:text-neutral-70 dark:group-hover:text-neutral-30 font-bold text-xs transition-colors">
              Case studies
            </span>
          </button>

          {/* Project Name Rectangle */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-neutral-90 dark:bg-neutral-0 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 sm:border-l-0 rounded-r-lg flex items-center h-full relative w-auto justify-start">
            <span className="text-neutral-0 dark:text-neutral-100 font-bold text-xs uppercase relative z-10">
              {title.split(" ").slice(0, 3).join(" ")}
            </span>
            {/* Active pill shadow effect */}
            <div
              className="absolute inset-0 rounded-r-lg -z-10"
              style={{
                boxShadow: `0 0 12px ${
                  typeof document !== "undefined" &&
                  document.documentElement.classList.contains("dark")
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(0, 0, 0, 0.4)"
                }`,
              }}
            />
          </div>
        </div>

        {/* Project Title */}
        <h1
          className={`text-5xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 sm:mb-6 mt-4 sm:mt-16 leading-tight max-w-full lg:max-w-[640px] ${
            isDark ? "gradient-text-dark" : "gradient-text-light"
          }`}
        >
          {title}
        </h1>

        {/* Subtitle - Moved here from right side */}
        <h2
          className={`text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-neutral-60 dark:text-neutral-40 leading-tight tracking-tight ${hanken.className} mb-8 sm:mb-12 text-left max-w-full lg:max-w-[640px]`}
        >
          {subtitle}
        </h2>

        {/* Bento Boxes and Button Layout */}
        <div className="mt-8 sm:mt-12 max-w-full lg:max-w-[640px]">
          {/* Box 1 - Role (Full width) */}
          <div className="w-full p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg mb-4 sm:mb-6 min-h-[70px] sm:min-h-[80px] flex flex-col justify-center">
            <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
              Role
            </h3>
            <p className="text-neutral-80 dark:text-neutral-20 text-sm sm:text-base leading-relaxed">
              {roleText}
            </p>
          </div>

          {/* Grid Layout with proper spacing */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Company Box - top left */}
            <div className="p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                {companyOrType}
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-sm sm:text-base leading-relaxed">
                {companyOrType === "Type" ? "School project" : companyText}
              </p>
            </div>

            {/* Year Box - top right */}
            <div className="p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                Year
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-sm sm:text-base leading-relaxed">
                {yearText}
              </p>
            </div>

            {/* Team Box - bottom, spans full width */}
            <div className="col-span-2 p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2">
                {teamRoles.map((role, index) => (
                  <p
                    key={index}
                    className="text-neutral-80 dark:text-neutral-20 text-sm sm:text-base leading-relaxed"
                  >
                    {role}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Live Prototype Button - spans same width as grid */}
          <button
            ref={morphRef}
            className="w-full mt-4 flex items-center justify-center gap-3 px-4 sm:px-6 py-4 sm:py-4 bg-gradient-to-r from-[#907EFF] to-[#7c3aed] text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Status Dot */}
            <div className="w-3 h-3 bg-gray-400 rounded-full relative flex-shrink-0"></div>

            <span className="whitespace-nowrap text-sm sm:text-base">
              Sorry, Emplojd is no longer live 🙁
            </span>
          </button>
        </div>
      </div>

      {/* Purple Box Container - Responsive positioning */}
      <div className="mt-8 sm:mt-12 lg:absolute lg:top-24 lg:left-[calc(50%+150px)] lg:right-0 lg:z-10">
        {/* Purple box - Responsive sizing with radiating effect */}
        <div className="w-full h-[600px] sm:h-[600px] lg:h-[860px] bg-[#907EFF] flex flex-col p-4 sm:p-6 lg:p-8 rounded-none lg:rounded-tl-2xl lg:rounded-bl-2xl radiating-purple-box">
          {/* Glass-styled technology pills - Responsive layout */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* On 2xl+ screens (≥1500px): Show all pills */}
            <div className="hidden 2xl:flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/25 dark:bg-black/10 backdrop-blur-md border border-white/40 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1 sm:gap-2 shadow-sm"
                >
                  {tech === "Live" && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                  {tech}
                </span>
              ))}
            </div>

            {/* On smaller screens (<1500px): Show first 8 pills + +X pill */}
            <div className="2xl:hidden flex flex-wrap gap-2">
              {/* Show first 8 pills */}
              {technologies.slice(0, 8).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/25 dark:bg-black/10 backdrop-blur-md border border-white/40 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1 sm:gap-2 shadow-sm"
                >
                  {tech === "Live" && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                  {tech}
                </span>
              ))}

              {/* +X pill if there are more than 8 technologies */}
              {technologies.length > 8 && (
                <div className="group relative">
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/25 dark:bg-black/10 backdrop-blur-md border border-white/40 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1 sm:gap-2 shadow-sm cursor-pointer">
                    +{technologies.length - 8} more
                  </span>

                  {/* Tooltip with hidden pills */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-64">
                    <div className="bg-neutral-0 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-0 px-4 py-3 rounded-lg shadow-lg border border-neutral-800 dark:border-neutral-200 text-sm">
                      <div className="font-medium mb-2 text-center">
                        Additional Technologies
                      </div>
                      <div className="space-y-2">
                        {technologies.slice(8).map((tech, index) => (
                          <div key={index + 8} className="text-center">
                            {tech}
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-neutral-0 dark:border-b-neutral-100"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Container - Responsive sizing */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-full lg:max-w-[900px] h-[470px] sm:h-[500px] lg:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-500 ease-out">
              {/* Loading Animation */}
              {isVideoLoading && !videoError && <LoadingAnimation />}

              {/* Error State */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-xl lg:rounded-2xl">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <p className="text-white/90 text-sm font-medium mb-1">
                      Video failed to load
                    </p>
                    <p className="text-white/70 text-xs">
                      Please refresh the page
                    </p>
                  </div>
                </div>
              )}

              {/* Single Video */}
              <video
                className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-1000 video-bobbing"
                muted
                loop={false}
                playsInline
                controls={false}
                autoPlay={true}
                preload="metadata"
                onLoadStart={() => {
                  setIsVideoLoading(true);
                  setVideoError(false);
                }}
                onLoadedMetadata={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 4.0;
                }}
                onCanPlay={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 4.0;
                  // Only try to play if video hasn't played yet
                  if (video.paused && !hasVideoPlayed) {
                    video.play().catch(() => {
                      // If autoplay fails, play on first user interaction
                      const playOnInteraction = () => {
                        if (!hasVideoPlayed) {
                          video.play();
                        }
                        document.removeEventListener(
                          "click",
                          playOnInteraction
                        );
                        document.removeEventListener(
                          "scroll",
                          playOnInteraction
                        );
                      };
                      document.addEventListener("click", playOnInteraction);
                      document.addEventListener("scroll", playOnInteraction);
                    });
                  }
                }}
                onPlay={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 4.0;
                  // Fade in the video when it starts playing
                  video.style.opacity = "1";
                  setIsVideoLoading(false);
                  setHasVideoPlayed(true);
                }}
                onError={() => {
                  setVideoError(true);
                  setIsVideoLoading(false);
                }}
                onEnded={(e) => {
                  const video = e.target as HTMLVideoElement;
                  // Video ended - ensure it stays at the end and doesn't restart
                  video.currentTime = video.duration;
                  // Remove autoplay to prevent restart
                  video.removeAttribute("autoplay");
                }}
              >
                <source
                  src="/case-study-assets/emplojd/Emplojd-Landing-Page-Hero-Video.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer - Responsive height */}
      <div className="h-[50px] sm:h-[75px] lg:h-[200px]"></div>
    </section>
  );
};

export default Hero;
