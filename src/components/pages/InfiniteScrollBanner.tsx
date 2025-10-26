"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

const InfiniteScrollBanner = ({ className = "" }: { className?: string }) => {
  const { isDark } = useTheme();
  const bannerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!bannerRef.current) return;

    const banner = bannerRef.current;
    const scrollContainer = banner.querySelector(
      ".scroll-container"
    ) as HTMLElement;
    const originalContent = scrollContainer?.querySelector(
      ".original-content"
    ) as HTMLElement;

    if (!scrollContainer || !originalContent) return;

    // Function to initialize animation
    const initializeAnimation = () => {
      // Calculate the width of the original content (first set of icons)
      const contentWidth = originalContent.offsetWidth;

      // Only proceed if we have a valid width
      if (contentWidth <= 0) {
        // Retry after a short delay if width is still 0
        setTimeout(initializeAnimation, 100);
        return;
      }

      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Create the infinite scroll animation
      animationRef.current = gsap
        .timeline({ repeat: -1 })
        .to(scrollContainer, {
          x: -contentWidth,
          duration: 12,
          ease: "none",
        })
        .set(scrollContainer, {
          x: 0,
        });
    };

    // Initialize animation immediately
    initializeAnimation();

    // Also initialize after a short delay to ensure images are loaded
    const timeoutId = setTimeout(initializeAnimation, 500);

    // Initialize when window is fully loaded (including all images)
    const handleWindowLoad = () => {
      initializeAnimation();
    };

    // Add window load listener
    if (document.readyState === "complete") {
      // If already loaded, initialize immediately
      setTimeout(initializeAnimation, 100);
    } else {
      // Otherwise wait for load event
      window.addEventListener("load", handleWindowLoad);
    }

    // Use ResizeObserver to detect when content dimensions change
    const resizeObserver = new ResizeObserver(() => {
      // Reinitialize animation when content size changes
      initializeAnimation();
    });

    resizeObserver.observe(originalContent);

    // Slow down/speed up on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.timeScale(0.5); // Slow down to 50% speed
      }
    };

    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.timeScale(1); // Return to normal speed
      }
    };

    banner.addEventListener("mouseenter", handleMouseEnter);
    banner.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", handleWindowLoad);
      resizeObserver.disconnect();
      animationRef.current?.kill();
      banner.removeEventListener("mouseenter", handleMouseEnter);
      banner.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const tools = [
    {
      name: "Figma",
      icon: "/assets/logos/black-white-logos/Figma logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Framer",
      icon: "/assets/logos/black-white-logos/Framer logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Adobe",
      icon: "/assets/logos/black-white-logos/Adobe logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Miro",
      icon: "/assets/logos/black-white-logos/Miro logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Lovable",
      icon: "/assets/logos/black-white-logos/Lovable logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Wix",
      icon: "/assets/logos/black-white-logos/Wix logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Next.js",
      icon: "/assets/logos/black-white-logos/Nextjs logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "React",
      icon: "/assets/logos/black-white-logos/React logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Cursor",
      icon: "/assets/logos/black-white-logos/Cursor logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Google Stitch",
      icon: "/assets/logos/black-white-logos/Stitch logo.svg",
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
  ];

  return (
    <div
      className={`relative overflow-hidden py-8 ${className}`}
      ref={bannerRef}
    >
      {/* Left edge blur overlay */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to right, rgba(6, 6, 8, 0.9), transparent)"
            : "linear-gradient(to right, rgba(255, 255, 255, 0.9), transparent)",
        }}
      />

      {/* Right edge blur overlay */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to left, rgba(6, 6, 8, 0.9), transparent)"
            : "linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent)",
        }}
      />

      <div
        className="scroll-container flex gap-8"
        style={{ userSelect: "none" }}
      >
        {/* Original content */}
        <div className="original-content flex gap-8 flex-shrink-0">
          {tools.map((tool, index) => (
            <div
              key={`original-${index}`}
              className="flex flex-col items-center gap-3 group cursor-pointer flex-shrink-0"
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl ${tool.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2`}
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <span
                className={`text-xs sm:text-xs lg:text-xs font-medium text-neutral-60 transition-colors ${
                  isDark
                    ? "group-hover:text-neutral-0"
                    : "group-hover:text-neutral-90"
                }`}
                style={{ userSelect: "none" }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        {/* Clone for seamless loop */}
        <div className="cloned-content flex gap-8 flex-shrink-0">
          {tools.map((tool, index) => (
            <div
              key={`clone-${index}`}
              className="flex flex-col items-center gap-3 group cursor-pointer flex-shrink-0"
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl ${tool.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2`}
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <span
                className={`text-xs sm:text-xs lg:text-xs font-medium text-neutral-60 transition-colors ${
                  isDark
                    ? "group-hover:text-neutral-0"
                    : "group-hover:text-neutral-90"
                }`}
                style={{ userSelect: "none" }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollBanner;
