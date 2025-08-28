"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X, Play, Pause } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastClientPosition, setLastClientPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [prototypeVideoState, setPrototypeVideoState] =
    useState<string>("playing");
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255, 0.8)"
  );
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastClientPositionRef = useRef({ x: 0, y: 0 });

  // Function to update prototype video state
  const updatePrototypeVideoState = () => {
    const activePrototype = document.querySelector(
      "[data-tooltip='prototype-active']"
    );
    if (activePrototype) {
      const video = activePrototype.querySelector("video");
      if (video) {
        const isPlaying = !video.paused;
        const newState = isPlaying ? "playing" : "paused";
        console.log("Video state check:", {
          isPlaying,
          newState,
          current: prototypeVideoState,
        });
        if (newState !== prototypeVideoState) {
          console.log("Setting new video state:", newState);
          setPrototypeVideoState(newState);
        }
      }
    }
  };

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
    // Set up MutationObserver to watch for video state changes
    const observer = new MutationObserver((mutations) => {
      console.log("MutationObserver detected changes:", mutations);
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-video-state"
        ) {
          console.log("Video state attribute changed:", mutation);
          updatePrototypeVideoState();
        }
      });
    });

    // Start observing the document for attribute changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-video-state"],
      subtree: true,
    });

    // Periodic check as fallback to ensure video state stays in sync
    const periodicCheck = setInterval(() => {
      if (hoverTarget === "prototype-active") {
        updatePrototypeVideoState();
      }
    }, 100); // Check every 100ms when hovering over prototype

    // Set up video event listeners for all videos in the document
    const setupVideoListeners = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        const handlePlay = () => {
          console.log("Video play event detected");
          if (hoverTarget === "prototype-active") {
            updatePrototypeVideoState();
          }
        };
        const handlePause = () => {
          console.log("Video pause event detected");
          if (hoverTarget === "prototype-active") {
            updatePrototypeVideoState();
          }
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        // Store listeners for cleanup
        video._customCursorListeners = { handlePlay, handlePause };
      });
    };

    // Initial setup
    setupVideoListeners();

    // Watch for new videos being added to the DOM
    const videoObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === "VIDEO") {
              console.log("New video detected, setting up listeners");
              setupVideoListeners();
            }
          }
        });
      });
    });

    videoObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const updateMousePosition = (e: MouseEvent) => {
      const newClientPos = { x: e.clientX, y: e.clientY };

      // Get the ScrollSmoother instance (only available on desktop)
      const smoother = ScrollSmoother.get();

      let newPagePos;
      if (smoother && window.innerWidth >= 1024) {
        // Use the smooth scroll position only on desktop
        const smoothScrollY = smoother.scrollTop();
        newPagePos = {
          x: e.clientX,
          y: e.clientY + smoothScrollY,
        };
      } else {
        // Use native scroll position for mobile/tablet
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
      // Get the ScrollSmoother instance (only available on desktop)
      const smoother = ScrollSmoother.get();

      if (smoother && window.innerWidth >= 1024) {
        // Use the smooth scroll position only on desktop
        const smoothScrollY = smoother.scrollTop();
        const newPagePos = {
          x: lastClientPositionRef.current.x,
          y: lastClientPositionRef.current.y + smoothScrollY,
        };
        setMousePosition(newPagePos);
        mousePositionRef.current = newPagePos;
      } else {
        // Use native scroll position for mobile/tablet
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
      if (smoother && window.innerWidth >= 1024) {
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
      if (target.closest("[data-tooltip='prototype-active']")) {
        setHoverTarget("prototype-active");
        setIsHovering(true);
        updatePrototypeVideoState(); // Update video state when hovering
        console.log("Hovering over prototype-active, updating video state");
      } else if (target.closest(".project-showcase-card")) {
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
      } else if (target.closest("[data-tooltip='AI-creativity slider']")) {
        setHoverTarget("tooltip");
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
      observer.disconnect();
      clearInterval(periodicCheck);
      videoObserver.disconnect();

      // Clean up video event listeners
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        if (video._customCursorListeners) {
          video.removeEventListener(
            "play",
            video._customCursorListeners.handlePlay
          );
          video.removeEventListener(
            "pause",
            video._customCursorListeners.handlePause
          );
          delete video._customCursorListeners;
        }
      });
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
      case "prototype-active":
        return {
          ...baseStyle,
          left: mousePosition.x + 80, // More offset to the right
          top: mousePosition.y + 20, // Offset like default cursor
          width: "120px", // Same size as other cursor pills
          height: "36px", // Same height as other cursor pills
          borderRadius: "18px", // Same as other cursor pills
          backgroundColor: "rgb(35, 35, 35)", // Always dark
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(255, 255, 255)", // Always white text
          fontSize: "12px", // Same as other cursor pills
          fontWeight: "bold",
          letterSpacing: "0.5px",
          transition: "all 0.3s ease-out", // Same timing as TRAITS carousel pill
        };
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
      case "tooltip":
        return {
          ...baseStyle,
          left: mousePosition.x, // Center perfectly
          top: mousePosition.y, // Center perfectly
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(35, 35, 35, 0.3)",
          border: isDarkMode
            ? "2px solid rgba(255, 255, 255, 0.8)"
            : "2px solid rgba(35, 35, 35, 0.8)",
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
    <div className="hidden lg:block">
      <div style={cursorStyle} className="custom-cursor">
        {hoverTarget === "prototype-active" &&
          (prototypeVideoState === "playing" ? (
            <>
              <Pause size={16} style={{ marginRight: "4px" }} />
              <span style={{ marginLeft: "4px" }}>PAUSE</span>
            </>
          ) : (
            <>
              <Play size={16} style={{ marginRight: "4px" }} />
              <span style={{ marginLeft: "4px" }}>PLAY</span>
            </>
          ))}
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
    </div>
  );
};

export default CustomCursor;
