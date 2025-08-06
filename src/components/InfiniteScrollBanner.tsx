"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";
import FigmaIcon from "@/logos/inner-square-logos-svg/figma.svg";
import MiroIcon from "@/logos/inner-square-logos-svg/miro.svg";
import LovableIcon from "@/logos/inner-square-logos-svg/lovable.svg";
import NextJsIcon from "@/logos/inner-square-logos-svg/nextjs.svg";
import AdobeIcon from "@/logos/inner-square-logos-svg/adobe.svg";
import FramerIcon from "@/logos/inner-square-logos-svg/framer.svg";
import CursorIcon from "@/logos/inner-square-logos-svg/cursor.svg";
import WixIcon from "@/logos/inner-square-logos-svg/wix.svg";
import ReactIcon from "@/logos/inner-square-logos-svg/react.svg";
import StitchIcon from "@/logos/inner-square-logos-svg/stitch.svg";
import NotionIcon from "@/logos/inner-square-logos-svg/notion.svg";
// Light mode icons
import FigmaIconLight from "@/logos/inner-square-logos-light-svg/figma.svg";
import MiroIconLight from "@/logos/inner-square-logos-light-svg/miro.svg";
import LovableIconLight from "@/logos/inner-square-logos-light-svg/lovable.svg";
import NextJsIconLight from "@/logos/inner-square-logos-light-svg/nextjs.svg";
import AdobeIconLight from "@/logos/inner-square-logos-light-svg/adobe.svg";
import FramerIconLight from "@/logos/inner-square-logos-light-svg/framer.svg";
import CursorIconLight from "@/logos/inner-square-logos-light-svg/cursor.svg";
import WixIconLight from "@/logos/inner-square-logos-light-svg/wix.svg";
import ReactIconLight from "@/logos/inner-square-logos-light-svg/react.svg";
import StitchIconLight from "@/logos/inner-square-logos-light-svg/stitch.svg";
import NotionIconLight from "@/logos/inner-square-logos-light-svg/notion.svg";

const InfiniteScrollBanner = () => {
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
      animationRef.current = gsap.timeline({ repeat: -1 }).to(scrollContainer, {
        x: -contentWidth,
        duration: 20,
        ease: "none",
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
      icon: isDark ? FigmaIcon : FigmaIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Framer",
      icon: isDark ? FramerIcon : FramerIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Adobe",
      icon: isDark ? AdobeIcon : AdobeIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Miro",
      icon: isDark ? MiroIcon : MiroIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Lovable",
      icon: isDark ? LovableIcon : LovableIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Wix",
      icon: isDark ? WixIcon : WixIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Next.js",
      icon: isDark ? NextJsIcon : NextJsIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "React",
      icon: isDark ? ReactIcon : ReactIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Cursor",
      icon: isDark ? CursorIcon : CursorIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Google Stitch",
      icon: isDark ? StitchIcon : StitchIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
    {
      name: "Notion",
      icon: isDark ? NotionIcon : NotionIconLight,
      bg: isDark ? "bg-neutral-90" : "bg-neutral-10",
    },
  ];

  return (
    <div className="relative overflow-hidden py-8" ref={bannerRef}>
      <div className="scroll-container flex gap-8">
        {/* Original content */}
        <div className="original-content flex gap-8 flex-shrink-0">
          {tools.map((tool, index) => (
            <div
              key={`original-${index}`}
              className="flex flex-col items-center gap-3 group cursor-pointer flex-shrink-0"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${tool.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2`}
              >
                <img
                  src={tool.icon.src}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className={`text-xs font-medium text-neutral-60 transition-colors ${
                  isDark
                    ? "group-hover:text-neutral-0"
                    : "group-hover:text-neutral-90"
                }`}
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
                className={`w-20 h-20 rounded-2xl ${tool.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2`}
              >
                <img
                  src={tool.icon.src}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className={`text-xs font-medium text-neutral-60 transition-colors ${
                  isDark
                    ? "group-hover:text-neutral-0"
                    : "group-hover:text-neutral-90"
                }`}
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
