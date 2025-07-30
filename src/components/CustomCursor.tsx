"use client";

import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 215, 0, 0.8)"
  );

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

      return "rgba(255, 215, 0, 0.8)"; // Fallback to yellow
    } catch (error) {
      return "rgba(255, 215, 0, 0.8)"; // Fallback to yellow
    }
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.pageX, y: e.pageY });

      // Update background color based on what's beneath the cursor
      if (!hoverTarget) {
        const newColor = getColorAtPosition(e.clientX, e.clientY);
        setBackgroundColor(newColor);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for different hover targets
      if (target.closest(".project-showcase-card")) {
        setHoverTarget("project-card");
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

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
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
          backgroundColor: "rgba(255, 215, 0, 0.3)",
          border: "2px solid rgba(255, 215, 0, 0.8)",
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
    </div>
  );
};

export default CustomCursor;
