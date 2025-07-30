"use client";

import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical pages for faster navigation
    const preloadPages = ["/about", "/contact", "/design-gallery", "/fun"];

    // Preload pages when user hovers over menu items
    const preloadPage = (href: string) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    };

    // Preload critical pages after initial load
    const timer = setTimeout(() => {
      preloadPages.forEach(preloadPage);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
