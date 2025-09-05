import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Global smoother instance to prevent multiple initializations
let globalSmoother: any = null;
let preventSmoothScrollOnFormElements: ((e: WheelEvent) => void) | null = null;

export const useSmoothScroll = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobileOrTablet = () => {
      // Check for touch capability and screen size
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // lg breakpoint
      return hasTouch && isSmallScreen;
    };

    // Handle resize and orientation changes
    const handleResize = () => {
      const isMobile = isMobileOrTablet();

      if (isMobile && globalSmoother) {
        // Kill ScrollSmoother on mobile/tablet
        console.log("Switching to mobile/tablet - killing smooth scroll");
        globalSmoother.kill();
        globalSmoother = null;
        document.documentElement.classList.remove("has-scroll-smooth");
        isInitialized.current = false;
      } else if (!isMobile && !globalSmoother && !isInitialized.current) {
        // Initialize ScrollSmoother on desktop
        console.log("Switching to desktop - initializing smooth scroll");
        initializeSmoother();
      }
    };

    // Initialize ScrollSmoother function
    const initializeSmoother = () => {
      if (globalSmoother || isInitialized.current) {
        return;
      }

      console.log("Desktop detected - initializing smooth scroll...");

      // Create smooth scrolling only for desktop
      globalSmoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: false,
        normalizeScroll: true,
        smoothTouch: 0, // Disable touch smoothing
        ease: "power2.out",
        speed: 1,
        ignoreMobileResize: true,
      });

      // Add event listeners to prevent ScrollSmoother from interfering with form elements
      preventSmoothScrollOnFormElements = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === "TEXTAREA" ||
            target.tagName === "INPUT" ||
            target.tagName === "SELECT" ||
            target.contentEditable === "true" ||
            target.closest('textarea, input, select, [contenteditable="true"]'))
        ) {
          e.stopPropagation();
          e.preventDefault();
          // Allow the native scrolling to work
          const textarea = target.tagName === "TEXTAREA" ? target : target.closest('textarea');
          if (textarea) {
            const scrollAmount = e.deltaY;
            textarea.scrollTop += scrollAmount;
          }
        }
      };

      // Add wheel event listener to prevent ScrollSmoother interference
      document.addEventListener("wheel", preventSmoothScrollOnFormElements, {
        passive: false,
      });

      // Add smooth class to html
      document.documentElement.classList.add("has-scroll-smooth");
      isInitialized.current = true;
    };

    // Initial setup
    if (isMobileOrTablet()) {
      console.log("Mobile/tablet detected - using native scrolling");
    } else {
      initializeSmoother();
    }

    // Add resize listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Cleanup function for app shutdown
  useEffect(() => {
    return () => {
      if (globalSmoother) {
        globalSmoother.kill();
        globalSmoother = null;
        document.documentElement.classList.remove("has-scroll-smooth");
      }
      // Remove wheel event listener
      if (preventSmoothScrollOnFormElements) {
        document.removeEventListener(
          "wheel",
          preventSmoothScrollOnFormElements
        );
        preventSmoothScrollOnFormElements = null;
      }
    };
  }, []);
};
