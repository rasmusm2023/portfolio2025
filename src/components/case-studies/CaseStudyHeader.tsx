import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface CaseStudyHeaderProps {
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

const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
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

  const handleCaseStudiesClick = () => {
    // Navigate to Work page instead of home
    window.location.href = "/work";
  };

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
    <section className="pt-40 pb-16 relative">
      {/* Left Container - Fixed position, starts at same place as section titles */}
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-start gap-0">
          {/* Back Arrow + Case Studies Rectangle */}
          <button
            onClick={handleCaseStudiesClick}
            className="flex items-center gap-3 px-4 py-3 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-l-lg hover:bg-neutral-20 dark:hover:bg-neutral-80 transition-all duration-200 group h-full"
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
          <div className="px-4 py-3 bg-neutral-90 dark:bg-neutral-0 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 border-l-0 rounded-r-lg flex items-center h-full relative">
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
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-neutral-80 dark:text-neutral-20 mb-8 mt-16">
          {title}
        </h1>

        {/* Bento Boxes and Button Layout */}
        <div className="mt-12 max-w-[640px]">
          {/* Box 1 - Role (Full width) */}
          <div className="w-full p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg mb-6 min-h-[80px] flex flex-col justify-center">
            <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
              Role
            </h3>
            <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
              {roleText}
            </p>
          </div>

          {/* Grid Layout with proper spacing */}
          <div className="grid grid-cols-2 gap-4">
            {/* Company Box - top left */}
            <div className="p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                {companyOrType}
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                {companyOrType === "Type" ? "School project" : companyText}
              </p>
            </div>

            {/* Year Box - top right */}
            <div className="p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                Year
              </h3>
              <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                {yearText}
              </p>
            </div>

            {/* Team Box - bottom, spans full width */}
            <div className="col-span-2 p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
              <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                Team
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {teamRoles.map((role, index) => (
                  <p
                    key={index}
                    className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed"
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
            className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#907EFF] to-[#7c3aed] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Status Dot */}
            <div className="w-3 h-3 bg-gray-400 rounded-full relative flex-shrink-0"></div>

            <span className="whitespace-nowrap">
              Sorry, Emplojd is no longer live 🙁
            </span>
          </button>
        </div>
      </div>

      {/* Title and Purple Box Container - positioned together */}
      <div className="absolute top-24 left-[calc(50%+200px)] right-0 z-10">
        {/* Title */}
        <h1
          className={`text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-100 dark:text-neutral-0 leading-tight tracking-tight ${hanken.className} mt-8 mb-8 text-left`}
        >
          {subtitle}
        </h1>

        {/* Purple box that starts after title and extends to right edge */}
        <div className="w-full h-[860px] bg-[#907EFF] flex flex-col p-8">
          {/* Glass-styled technology pills at the top */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-sm font-medium rounded-full flex items-center gap-2"
              >
                {tech === "Live" && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
                {tech}
              </span>
            ))}
          </div>

          {/* Video Container */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Rounded Container for Videos */}
            <div className="relative w-full max-w-[900px] h-[600px] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-105">
              {/* Single Video */}
              <video
                className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-1000"
                muted
                loop={false}
                playsInline
                controls={false}
                autoPlay={true}
                onLoadedMetadata={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 4.0;
                }}
                onCanPlay={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 4.0;
                  // Try to play immediately when ready
                  if (video.paused) {
                    video.play().catch(() => {
                      // If autoplay fails, play on first user interaction
                      const playOnInteraction = () => {
                        video.play();
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
                }}
                onEnded={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.parentElement?.classList.add("video-bobbing");
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

      {/* Spacer to ensure proper spacing below purple box */}
      <div className="h-[100px]"></div>
    </section>
  );
};

export default CaseStudyHeader;
