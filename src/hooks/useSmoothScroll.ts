import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Global smoother instance to prevent multiple initializations
let globalSmoother: any = null;

export const useSmoothScroll = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once across the entire app
    if (globalSmoother || isInitialized.current) {
      return;
    }

    console.log("Initializing smooth scroll...");

    // Create smooth scrolling
    globalSmoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: false,
      normalizeScroll: true,
      smoothTouch: 0.05,
      ease: "power2.out",
      speed: 1,
    });

    // Add smooth class to html
    document.documentElement.classList.add("has-scroll-smooth");

    isInitialized.current = true;

    // Cleanup only when component unmounts (but keep the smoother alive)
    return () => {
      // Don't kill the smoother on component unmount
      // It will be reused across page navigations
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
    };
  }, []);
};
