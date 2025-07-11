"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PerformanceMonitor = () => {
  const pathname = usePathname();
  const navigationStart = useRef<number>(0);

  useEffect(() => {
    // Track navigation performance
    const startTime = performance.now();
    navigationStart.current = startTime;

    // Measure navigation completion
    const measureNavigation = () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > 100) {
        // Only log slow navigations
        console.log(`Navigation to ${pathname} took ${duration.toFixed(2)}ms`);
      }
    };

    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(measureNavigation);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
