"use client";

import { useState, useEffect, useRef } from "react";
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
      if (!element) return "rgba(255, 215, 0, 0.8)";

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

        // Return contrasting color based on brightness
        if (brightness > 128) {
          return "rgba(0, 0, 0, 0.8)"; // Dark color for light backgrounds
        } else {
          return "rgba(255, 255, 255, 0.8)"; // Light color for dark backgrounds
        }
      }

      return "rgba(255, 255, 255, 0.8)"; // Fallback to white
    } catch (error) {
      return "rgba(255, 255, 255, 0.8)"; // Fallback to white
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
      } else if (target.closest("button")) {
        setHoverTarget("button");
        setIsHovering(true);
      } else if (target.closest("a")) {
        setHoverTarget("link");
        setIsHovering(true);
      } else if (target.closest(".group")) {
        setHoverTarget("card");
        setIsHovering(true);
      } else if (target.closest("[class*='hover:']")) {
        // Detect any element with hover classes
        setHoverTarget("card");
        setIsHovering(true);
      } else if (target.closest("[class*='group-hover:']")) {
        // Detect elements with group-hover classes
        setHoverTarget("card");
        setIsHovering(true);
      } else if (target.closest("[class*='transition']")) {
        // Detect elements with transition classes
        setHoverTarget("card");
        setIsHovering(true);
      } else if (
        target.style.cursor === "pointer" ||
        target.closest("[style*='cursor: pointer']")
      ) {
        // Detect elements with pointer cursor
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
          backgroundColor: "rgb(255, 255, 255)", // white
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(51, 51, 51)", // neutral-3 (black text)
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
          backgroundColor: "rgb(255, 255, 255)", // white
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(51, 51, 51)", // neutral-3 (black text)
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
          backgroundColor: "rgb(255, 255, 255)", // white
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(51, 51, 51)", // neutral-3 (black text)
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
          backgroundColor: "rgb(255, 255, 255)", // white
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(51, 51, 51)", // neutral-3 (black text)
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
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
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
          backgroundColor: backgroundColor,
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
          <span style={{ fontSize: "16px" }}>↗</span>
          <span style={{ marginLeft: "4px" }}>OPEN MY SPOTIFY</span>
        </>
      )}
      {hoverTarget === "reading-card" && (
        <>
          <span style={{ fontSize: "16px" }}>→</span>
          <span style={{ marginLeft: "4px" }}>VIEW READING LIST</span>
        </>
      )}
    </div>
  );
};

export default CustomCursor;
