"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Eyes, MagnifyingGlassPlus } from "@phosphor-icons/react";
import { useTheme } from "@/contexts/ThemeContext";
// Individual cursor components are now inlined for better morphing performance

type CursorType = "circle" | "pill" | "video" | null;

interface CursorConfig {
  type: CursorType;
  text?: string;
  icon?: "magnifying" | "magnifying-plus" | "close" | "swipe" | "eye" | null;
  isPlaying?: boolean;
}

const CustomCursor = () => {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  // Get cursor configuration based on hover target
  const getCursorConfig = (): CursorConfig => {
    if (!hoverTarget) return { type: null }; // No cursor by default

    // Pill cursors with specific text and icons (check these first)
    if (hoverTarget.includes("case-banner")) {
      return { type: "pill", text: "VIEW CASE", icon: "eye" };
    }

    if (hoverTarget.includes("case-study")) {
      return { type: "pill", text: "VIEW CASE", icon: "eye" };
    }

    if (hoverTarget.includes("project")) {
      return { type: "pill", text: "VIEW CASE", icon: "eye" };
    }

    if (hoverTarget.includes("gallery") || hoverTarget.includes("expand")) {
      return { type: "pill", text: "EXPAND", icon: "magnifying-plus" };
    }

    if (hoverTarget.includes("close")) {
      return { type: "pill", text: "CLOSE", icon: "close" };
    }

    if (hoverTarget.includes("swipe") || hoverTarget.includes("traits")) {
      return { type: "pill", text: "SWIPE", icon: "swipe" };
    }

    // Video cursor for prototype videos
    if (hoverTarget.includes("prototype")) {
      return { type: "video", isPlaying: true }; // You can make this dynamic
    }

    // Circle cursors for buttons, links, and other cards
    if (
      hoverTarget.includes("button") ||
      hoverTarget.includes("link") ||
      hoverTarget.includes("card") ||
      hoverTarget.includes("tooltip")
    ) {
      return { type: "circle" };
    }

    // No cursor for other hover states
    return { type: null };
  };

  // Set mounted state on client side
  useEffect(() => {
    setIsMounted(true);
    // Reset visibility when mounting to ensure proper initialization
    isVisible.current = false;
  }, []);

  // Reset cursor state when pathname changes
  useEffect(() => {
    setHoverTarget(null);
  }, [pathname]);

  // Mouse tracking effect - separate from cursor morphing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/clientY for fixed positioning (viewport coordinates)
      mousePosition.current = { x: e.clientX, y: e.clientY };
      isVisible.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Cursor position and morphing effect
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;

    // Set initial position only if cursor is not visible yet
    if (!isVisible.current) {
      gsap.set(cursor, {
        x: mousePosition.current.x || 0,
        y: mousePosition.current.y || 0,
        opacity: 0,
        visibility: "hidden",
      });
    }

    // Update cursor position and morphing
    const updateCursor = () => {
      if (isVisible.current && cursor) {
        const config = getCursorConfig();
        const currentType = config.type;

        // Show cursor and set visibility
        gsap.set(cursor, { visibility: "visible" });

        // Hide cursor if no type
        if (currentType === null) {
          gsap.to(cursor, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
          });
          return;
        }

        // Different offsets based on cursor type
        let offsetX = 0;
        let offsetY = 0;

        if (currentType === "circle") {
          // For circle, we need to offset by half the circle size to center it
          offsetX = -42; // Half of 84px circle width
          offsetY = -42; // Half of 84px circle height
        } else if (currentType === "pill" || currentType === "video") {
          offsetX = 30; // Larger offset for pills/video
          offsetY = 20;
        }

        // Calculate target position
        const targetX = mousePosition.current.x + offsetX;
        const targetY = mousePosition.current.y + offsetY;

        gsap.to(cursor, {
          x: targetX,
          y: targetY,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    // Start animation loop
    const animationId = gsap.ticker.add(updateCursor);

    return () => {
      gsap.ticker.remove(animationId);
    };
  }, [hoverTarget, isDark]);

  // Cursor morphing effect - separate from position updates
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const config = getCursorConfig();
    const currentType = config.type;

    // Get the inner cursor element (the actual shape)
    const innerCursor = cursor.querySelector("div") as HTMLElement;
    if (!innerCursor) return;

    // Get the content element for pill/video cursors
    const contentElement = innerCursor.querySelector("div") as HTMLElement;

    // If no cursor type, hide the cursor
    if (currentType === null) {
      gsap.to(cursor, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.2,
        ease: "power2.out",
      });
      return;
    }

    // Show cursor for valid types
    gsap.set(cursor, { visibility: "visible" });

    // Calculate the correct position for the new cursor type
    let offsetX = 0;
    let offsetY = 0;

    if (currentType === "circle") {
      offsetX = -42; // Half of 84px circle width
      offsetY = -42; // Half of 84px circle height
    } else if (currentType === "pill" || currentType === "video") {
      offsetX = 30; // Larger offset for pills/video
      offsetY = 20;
    }

    // Set cursor to mouse position with correct offset BEFORE morphing
    gsap.set(cursor, {
      x: mousePosition.current.x + offsetX,
      y: mousePosition.current.y + offsetY,
    });

    // Define cursor properties based on type
    const cursorProperties = {
      circle: {
        width: 84,
        height: 84,
        borderRadius: "50%",
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(139, 92, 246, 0.3)",
        border: isDark
          ? "2px solid rgba(255, 255, 255, 0.8)"
          : "2px solid rgba(139, 92, 246, 0.8)",
        scale: 1,
      },
      pill: {
        width: 120,
        height: 36,
        borderRadius: "18px",
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 1)"
          : "rgba(35, 35, 35, 1)",
        border: "none",
        scale: 1,
        boxShadow: isDark
          ? "0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      video: {
        width: 120,
        height: 36,
        borderRadius: "18px",
        backgroundColor: "rgb(35, 35, 35)",
        border: "none",
        scale: 1,
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    };

    // Create a morphing timeline
    const tl = gsap.timeline();

    // First, scale down slightly for a "squash" effect
    tl.to(innerCursor, {
      scale: 0.8,
      duration: 0.05,
      ease: "power2.out",
    })
      // Then morph to new shape
      .to(innerCursor, {
        ...cursorProperties[currentType],
        duration: 0.2,
        ease: "power2.inOut",
      })
      // Finally, scale back up with a slight bounce
      .to(innerCursor, {
        scale: 1,
        duration: 0.05,
        ease: "back.out(1.2)",
      });

    // Animate content for pill and video cursors
    if (currentType === "pill" || currentType === "video") {
      if (contentElement) {
        // Reset content position and opacity
        gsap.set(contentElement, { opacity: 0, y: 10 });

        // Animate content in after the shape morphing
        tl.to(
          contentElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          "-=0.05"
        );
      }
    } else {
      // Hide content for other cursor types
      if (contentElement) {
        gsap.to(contentElement, {
          opacity: 0,
          y: 10,
          duration: 0.05,
          ease: "power2.out",
        });
      }
    }
  }, [hoverTarget, isDark]);

  // Hover detection effect - separate from cursor animation
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for case banner first (highest priority) - check both the element itself and if it's inside a case banner
      if (
        target.classList.contains("case-banner-bg") ||
        target.closest(".case-banner-bg")
      ) {
        setHoverTarget("case-banner");
        return;
      }

      // Check if we're inside a project showcase card - show pill cursor for entire card
      const projectCard = target.closest(".project-showcase-card");
      if (projectCard) {
        setHoverTarget("case-banner");
        return;
      }

      if (target.closest("button")) {
        setHoverTarget("button");
      } else if (target.closest(".case-study-card")) {
        setHoverTarget("case-study");
      } else if (target.closest("a")) {
        setHoverTarget("link");
      } else if (target.closest(".project-showcase-card")) {
        setHoverTarget("project-card");
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
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  // Render a single cursor element that morphs
  const renderCursor = () => {
    const config = getCursorConfig();

    return (
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 999999, // Even higher z-index for dark mode
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDark ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          isolation: "isolate", // Creates new stacking context
          willChange: "transform", // Optimize for animations
          transform: "translateZ(0)", // Force hardware acceleration
          opacity: 0,
          visibility: "hidden",
        }}
      >
        {/* Single morphing cursor element */}
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Content that appears for pill and video cursors */}
          {(config.type === "pill" || config.type === "video") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
                opacity: 0,
              }}
            >
              {config.type === "pill" && (
                <>
                  {config.icon === "magnifying" && (
                    <span style={{ marginRight: "6px", fontSize: "20px" }}>
                      🔍
                    </span>
                  )}
                  {config.icon === "magnifying-plus" && (
                    <MagnifyingGlassPlus
                      size={20}
                      style={{ marginRight: "6px" }}
                    />
                  )}
                  {config.icon === "close" && (
                    <span style={{ marginRight: "6px", fontSize: "20px" }}>
                      ✕
                    </span>
                  )}
                  {config.icon === "swipe" && (
                    <span style={{ marginRight: "6px", fontSize: "20px" }}>
                      ↔
                    </span>
                  )}
                  <span>{config.text || "VIEW"}</span>
                </>
              )}
              {config.type === "video" && (
                <>
                  {config.isPlaying ? (
                    <>
                      <span style={{ marginRight: "4px" }}>⏸</span>
                      <span style={{ marginLeft: "4px" }}>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: "4px" }}>▶</span>
                      <span style={{ marginLeft: "4px" }}>PLAY</span>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Only render on client side to avoid SSR issues
  if (!isMounted) {
    return null;
  }

  // Render cursor using portal to ensure it's always on top
  return createPortal(
    <div className="hidden lg:block">{renderCursor()}</div>,
    document.body
  );
};

export default CustomCursor;
