"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastClientPosition, setLastClientPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255, 0.8)"
  );
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastClientPositionRef = useRef({ x: 0, y: 0 });

  const getColorAtPosition = (x: number, y: number) => {
    try {
      const element = document.elementFromPoint(x, y);
      if (!element) return "rgba(139, 92, 246, 0.8)"; // Purple fallback

      // Check if dark mode is active
      const isDarkMode = document.documentElement.classList.contains("dark");

      // Get computed styles
      const styles = window.getComputedStyle(element);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;

      // Parse background color
      const bgMatch = backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
      );
      if (bgMatch) {
        const r = parseInt(bgMatch[1]);
        const g = parseInt(bgMatch[2]);
        const b = parseInt(bgMatch[3]);

        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Return contrasting color based on brightness and theme
        if (isDarkMode) {
          if (brightness > 128) {
            return "rgba(0, 0, 0, 0.8)"; // Dark color for light backgrounds in dark mode
          } else {
            return "rgba(255, 255, 255, 0.8)"; // Light color for dark backgrounds in dark mode
          }
        } else {
          if (brightness > 128) {
            return "rgba(139, 92, 246, 0.8)"; // Purple for light backgrounds in light mode
          } else {
            return "rgba(0, 0, 0, 0.8)"; // Dark color for dark backgrounds in light mode
          }
        }
      }

      // Fallback based on theme
      return isDarkMode
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(139, 92, 246, 0.8)";
    } catch (error) {
      const isDarkMode = document.documentElement.classList.contains("dark");
      return isDarkMode
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(139, 92, 246, 0.8)";
    }
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newClientPos = { x: e.clientX, y: e.clientY };

      // Get the ScrollSmoother instance
      const smoother = ScrollSmoother.get();

      let newPagePos;
      if (smoother) {
        // Use the smooth scroll position instead of e.pageY
        const smoothScrollY = smoother.scrollTop();
        newPagePos = {
          x: e.clientX,
          y: e.clientY + smoothScrollY,
        };
      } else {
        // Fallback to page position if smoother is not available
        newPagePos = { x: e.pageX, y: e.pageY };
      }

      setLastClientPosition(newClientPos);
      setMousePosition(newPagePos);
      lastClientPositionRef.current = newClientPos;
      mousePositionRef.current = newPagePos;

      // Update background color based on what's beneath the cursor
      if (!hoverTarget) {
        const newColor = getColorAtPosition(e.clientX, e.clientY);
        setBackgroundColor(newColor);
      }
    };

    const updatePositionOnScroll = () => {
      // Get the ScrollSmoother instance
      const smoother = ScrollSmoother.get();

      if (smoother) {
        // Use the smooth scroll position instead of window scroll position
        const smoothScrollY = smoother.scrollTop();
        const newPagePos = {
          x: lastClientPositionRef.current.x,
          y: lastClientPositionRef.current.y + smoothScrollY,
        };
        setMousePosition(newPagePos);
        mousePositionRef.current = newPagePos;
      } else {
        // Fallback to window scroll position if smoother is not available
        const newPagePos = {
          x: lastClientPositionRef.current.x + window.scrollX,
          y: lastClientPositionRef.current.y + window.scrollY,
        };
        setMousePosition(newPagePos);
        mousePositionRef.current = newPagePos;
      }
    };

    // Continuous update function for smooth cursor following during scroll
    const continuousUpdate = () => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        const smoothScrollY = smoother.scrollTop();
        const newPagePos = {
          x: lastClientPositionRef.current.x,
          y: lastClientPositionRef.current.y + smoothScrollY,
        };
        setMousePosition(newPagePos);
        mousePositionRef.current = newPagePos;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for different hover targets
      if (target.closest(".project-showcase-card")) {
        setHoverTarget("project-card");
        setIsHovering(true);
      } else if (
        target.closest(".group\\/card") &&
        target.closest("[data-tooltip='Swipe']")
      ) {
        setHoverTarget("traits-card");
        setIsHovering(true);
      } else if (target.closest("[data-tooltip='Open My Spotify']")) {
        setHoverTarget("spotify-card");
        setIsHovering(true);
      } else if (target.closest("[data-tooltip='View Reading List']")) {
        setHoverTarget("reading-card");
        setIsHovering(true);
      } else if (target.closest(".gallery-image")) {
        setHoverTarget("gallery-image");
        setIsHovering(true);
      } else if (
        target.closest(".lightbox-backdrop") &&
        !target.closest(".lightbox-image-container") &&
        !target.closest(".lightbox-close-btn")
      ) {
        setHoverTarget("lightbox-close");
        setIsHovering(true);
      } else if (target.closest("button")) {
        setHoverTarget("button");
        setIsHovering(true);
      } else if (target.closest("a")) {
        setHoverTarget("link");
        setIsHovering(true);
      } else if (target.closest("button") || target.closest("a")) {
        // Only show large circle for actual interactive elements
        setHoverTarget("card");
        setIsHovering(true);
      } else {
        setHoverTarget(null);
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverTarget(null);
    };

    let scrollAnimationId: number | null = null;
    let isScrolling = false;
    let continuousUpdateId: number | null = null;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;

        // Start continuous updates during scroll
        const startContinuousUpdate = () => {
          continuousUpdate();
          continuousUpdateId = requestAnimationFrame(startContinuousUpdate);
        };
        startContinuousUpdate();
      }

      if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId);
      }

      scrollAnimationId = requestAnimationFrame(() => {
        updatePositionOnScroll();
        isScrolling = false;

        // Stop continuous updates after scroll ends
        if (continuousUpdateId) {
          cancelAnimationFrame(continuousUpdateId);
          continuousUpdateId = null;
        }
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId);
      }
      if (continuousUpdateId) {
        cancelAnimationFrame(continuousUpdateId);
      }
    };
  }, [hoverTarget]);

  const getCursorStyle = () => {
    // SSR check
    const isDarkMode =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    const baseStyle = {
      position: "fixed" as const,
      left: mousePosition.x + 20, // Offset from actual cursor
      top: mousePosition.y + 20, // Offset from actual cursor
      pointerEvents: "none" as const,
      zIndex: 99999,
      transition: "all 0.1s ease-out",
    };

    switch (hoverTarget) {
      case "project-card":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "120px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "traits-card":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "120px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "spotify-card":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "160px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "reading-card":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "160px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "gallery-image":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "140px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "lightbox-close":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "140px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: isDarkMode
            ? "rgb(255, 255, 255)"
            : "rgb(35, 35, 35)", // white in dark mode, dark in light mode
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)", // black text in dark mode, white text in light mode
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        };
      case "button":
        return {
          ...baseStyle,
          left: mousePosition.x, // Center perfectly
          top: mousePosition.y, // Center perfectly
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          backgroundColor: "rgba(139, 92, 246, 0.3)",
          border: "2px solid rgba(139, 92, 246, 0.8)",
          transform: "translate(-50%, -50%)",
        };
      case "link":
        return {
          ...baseStyle,
          left: mousePosition.x, // Center perfectly
          top: mousePosition.y, // Center perfectly
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(35, 35, 35, 0.3)", // Dark in light mode, white in dark mode
          border: isDarkMode
            ? "2px solid rgba(255, 255, 255, 0.8)"
            : "2px solid rgba(35, 35, 35, 0.8)", // Dark border in light mode, white border in dark mode
          transform: "translate(-50%, -50%)",
        };
      case "card":
        return {
          ...baseStyle,
          left: mousePosition.x, // Center perfectly
          top: mousePosition.y, // Center perfectly
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          backgroundColor: "rgba(139, 92, 246, 0.8)",
          border: "2px solid rgba(139, 92, 246, 0.6)",
          transform: "translate(-50%, -50%)",
        };
      default:
        return {
          ...baseStyle,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? backgroundColor
            : "rgba(35, 35, 35, 0.8)", // Dark color in light mode
          transform: "translate(-50%, -50%)",
        };
    }
  };

  const cursorStyle = getCursorStyle();

  return (
    <div style={cursorStyle} className="custom-cursor">
      {hoverTarget === "project-card" && "VIEW CASE"}
      {hoverTarget === "traits-card" && (
        <>
          <span style={{ fontSize: "16px" }}>↔</span>
          <span style={{ marginLeft: "4px" }}>SWIPE</span>
        </>
      )}
      {hoverTarget === "spotify-card" && (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 226.73334 226.73334"
            style={{ marginRight: "4px" }}
          >
            <g transform="matrix(1.3333333,0,0,-1.3333333,0,226.73333)">
              <g transform="scale(0.1)">
                <path
                  fill="currentColor"
                  d="m 1345.62,945.281 c -269.94,160.309 -715.202,175.049 -972.893,96.839 -41.383,-12.56 -85.145,10.81 -97.68,52.18 -12.543,41.41 10.793,85.14 52.207,97.72 295.812,89.79 787.556,72.45 1098.316,-112.02 37.22,-22.1 49.43,-70.17 27.37,-107.328 -22.08,-37.219 -70.19,-49.488 -107.32,-27.391 z m -8.84,-237.441 c -18.94,-30.731 -59.12,-40.371 -89.81,-21.5 -225.05,138.336 -568.216,178.41 -834.466,97.59 -34.527,-10.434 -70.996,9.035 -81.484,43.496 -10.403,34.527 9.074,70.929 43.539,81.429 304.152,92.295 682.261,47.59 940.741,-111.253 30.69,-18.903 40.35,-59.102 21.48,-89.762 z M 1234.31,479.809 c -15.05,-24.68 -47.18,-32.411 -71.77,-17.368 -196.653,120.188 -444.173,147.329 -735.673,80.75 -28.09,-6.441 -56.086,11.161 -62.492,39.25 -6.434,28.079 11.102,56.079 39.254,62.489 318.996,72.925 592.633,41.539 813.361,-93.34 24.61,-15.031 32.36,-47.18 17.32,-71.781 z M 850.254,1687.68 c -462.496,0 -837.4337,-374.93 -837.4337,-837.418 0,-462.543 374.9377,-837.4417 837.4337,-837.4417 462.506,0 837.426,374.8987 837.426,837.4417 0,462.488 -374.92,837.418 -837.426,837.418"
                />
              </g>
            </g>
          </svg>
          <span style={{ marginLeft: "4px" }}>OPEN MY SPOTIFY</span>
        </>
      )}
      {hoverTarget === "reading-card" && (
        <>
          <span style={{ fontSize: "16px" }}>→</span>
          <span style={{ marginLeft: "4px" }}>VIEW READING LIST</span>
        </>
      )}
      {hoverTarget === "gallery-image" && (
        <>
          <MagnifyingGlass size={16} style={{ marginRight: "4px" }} />
          <span style={{ marginLeft: "4px" }}>EXPAND</span>
        </>
      )}
      {hoverTarget === "lightbox-close" && (
        <>
          <X size={16} style={{ marginRight: "4px" }} />
          <span style={{ marginLeft: "4px" }}>CLOSE</span>
        </>
      )}
    </div>
  );
};

export default CustomCursor;
