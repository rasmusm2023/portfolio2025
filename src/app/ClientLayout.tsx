"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Skip animation on first load for better performance
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Scroll to top on page navigation with smooth behavior
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Scroll to top immediately when pathname changes
    scrollToTop();

    if (contentRef.current) {
      // Use a lighter animation for better performance
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 10, // Reduced from 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3, // Reduced from 0.5
          ease: "power1.out", // Lighter easing
        }
      );
    }
  }, [pathname]);

  return (
    <div className="relative w-full h-full">
      <div ref={contentRef} className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
