import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useSmoothScroll = () => {
  useEffect(() => {
    console.log("Initializing smooth scroll...");

    // Create smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
      ease: "power2.out",
      speed: 2,
    });

    // Add smooth class to html
    document.documentElement.classList.add("has-scroll-smooth");

    // Cleanup
    return () => {
      smoother.kill();
      document.documentElement.classList.remove("has-scroll-smooth");
    };
  }, []);
};
