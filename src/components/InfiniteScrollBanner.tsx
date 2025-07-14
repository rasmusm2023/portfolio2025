"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import FigmaIcon from "@/logos/Figma-Icon.svg";
import MiroIcon from "@/logos/Miro_Miro_Icon_0.svg";
import LovableIcon from "@/logos/Lovable_Icon_1.webp";
import NextJsIcon from "@/logos/Next.js_Symbol_Alternative_0.svg";
import AdobeIcon from "@/logos/adobe-creative-cloud-svgrepo-com.svg";
import FramerIcon from "@/logos/framer-svgrepo-com.svg";
import CursorIcon from "@/logos/Icon.jpeg";
import WixIcon from "@/logos/idyfLKvIsN_1752235000777.png";

const InfiniteScrollBanner = () => {
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

    // Calculate the width of the original content (first set of icons)
    const contentWidth = originalContent.offsetWidth;

    // Create the infinite scroll animation
    animationRef.current = gsap.timeline({ repeat: -1 }).to(scrollContainer, {
      x: -contentWidth,
      duration: 20,
      ease: "none",
    });

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
      animationRef.current?.kill();
      banner.removeEventListener("mouseenter", handleMouseEnter);
      banner.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const tools = [
    { name: "Figma", icon: FigmaIcon, bg: "bg-neutral-3" },
    { name: "Framer", icon: FramerIcon, bg: "bg-neutral-90" },
    { name: "Adobe", icon: AdobeIcon, bg: "bg-neutral-90" },
    { name: "Miro", icon: MiroIcon, bg: "bg-neutral-90" },
    { name: "Lovable", icon: LovableIcon, bg: "bg-neutral-90" },
    { name: "Wix", icon: WixIcon, bg: "bg-neutral-90" },
    { name: "Next.js", icon: NextJsIcon, bg: "bg-neutral-90" },
    { name: "Cursor", icon: CursorIcon, bg: "bg-neutral-3" },
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
              <span className="text-xs font-medium text-neutral-60 group-hover:text-neutral-0 transition-colors">
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
              <span className="text-xs font-medium text-neutral-60 group-hover:text-neutral-0 transition-colors">
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
