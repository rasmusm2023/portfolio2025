"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  DefaultCursor,
  CircleCursor,
  PillCursor,
  VideoCursor,
} from "./cursors";

type CursorType = "default" | "circle" | "pill" | "video";

interface CursorConfig {
  type: CursorType;
  text?: string;
  icon?: "magnifying" | "close" | "swipe" | null;
  isPlaying?: boolean;
}

const CustomCursor = () => {
  const pathname = usePathname();
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  // Get cursor configuration based on hover target
  const getCursorConfig = (): CursorConfig => {
    if (!hoverTarget) return { type: "default" };

    // Circle cursors for buttons, links, cards
    if (
      hoverTarget.includes("button") ||
      hoverTarget.includes("link") ||
      hoverTarget.includes("card") ||
      hoverTarget.includes("tooltip")
    ) {
      return { type: "circle" };
    }

    // Video cursor for prototype videos
    if (hoverTarget.includes("prototype")) {
      return { type: "video", isPlaying: true }; // You can make this dynamic
    }

    // Pill cursors with specific text and icons
    if (hoverTarget.includes("gallery") || hoverTarget.includes("expand")) {
      return { type: "pill", text: "EXPAND", icon: "magnifying" };
    }

    if (hoverTarget.includes("close")) {
      return { type: "pill", text: "CLOSE", icon: "close" };
    }

    if (hoverTarget.includes("swipe") || hoverTarget.includes("traits")) {
      return { type: "pill", text: "SWIPE", icon: "swipe" };
    }

    if (hoverTarget.includes("project") || hoverTarget.includes("case-study")) {
      return { type: "pill", text: "VIEW" };
    }

    // Default pill for other hover states
    return { type: "pill", text: "VIEW" };
  };

  // Reset cursor state when pathname changes
  useEffect(() => {
    setHoverTarget(null);
  }, [pathname]);

  // Check dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Main cursor animation effect
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const config = getCursorConfig();

    // Set initial position
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.pageX, y: e.pageY };
      isVisible.current = true;
    };

    // Update cursor position
    const updateCursor = () => {
      if (isVisible.current && cursor) {
        const config = getCursorConfig();

        // Different offsets based on cursor type
        let offsetX = 0;
        let offsetY = 0;

        if (config.type === "circle") {
          offsetX = 0; // Centered
          offsetY = 0;
        } else {
          offsetX = 20; // Offset for default and pill
          offsetY = 20;
        }

        gsap.to(cursor, {
          x: mousePosition.current.x + offsetX,
          y: mousePosition.current.y + offsetY,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    // Start animation loop
    const animationId = gsap.ticker.add(updateCursor);
    window.addEventListener("mousemove", handleMouseMove);

    // Hover detection
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("button")) {
        setHoverTarget("button");
      } else if (target.closest("a")) {
        setHoverTarget("link");
      } else if (target.closest(".project-showcase-card")) {
        setHoverTarget("project-card");
      } else if (target.closest(".case-study-card")) {
        setHoverTarget("case-study-card");
      } else if (target.closest(".gallery-image")) {
        setHoverTarget("gallery-image");
      } else if (target.closest("[data-tooltip='Swipe']")) {
        setHoverTarget("traits-card");
      } else if (target.closest("[data-tooltip='Close']")) {
        setHoverTarget("lightbox-close");
      } else if (target.closest("[data-tooltip='prototype-active']")) {
        setHoverTarget("prototype-active");
      } else {
        setHoverTarget(null);
      }
    };

    const handleMouseLeave = () => {
      setHoverTarget(null);
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      gsap.ticker.remove(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [hoverTarget, isDark]);

  // Render the appropriate cursor component
  const renderCursor = () => {
    const config = getCursorConfig();

    switch (config.type) {
      case "circle":
        return <CircleCursor ref={cursorRef} isDark={isDark} />;
      case "pill":
        return (
          <PillCursor
            ref={cursorRef}
            isDark={isDark}
            text={config.text || "VIEW"}
            icon={config.icon}
          />
        );
      case "video":
        return (
          <VideoCursor
            ref={cursorRef}
            isDark={isDark}
            isPlaying={config.isPlaying || false}
          />
        );
      default:
        return <DefaultCursor ref={cursorRef} isDark={isDark} />;
    }
  };

  return <div className="hidden lg:block">{renderCursor()}</div>;
};

export default CustomCursor;
