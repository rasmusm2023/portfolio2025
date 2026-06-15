"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

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
  const prevPathnameRef = useRef(pathname);
  const lenis = useLenis();

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // Skip animation on first load for better performance
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Only scroll to top and run content animation when the route actually changed (not when lenis becomes available)
    if (!pathnameChanged) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Skip content fade when navigating TO home so the hero entrance animation is visible
    if (pathname === "/") return;
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [pathname, lenis]);

  return (
    <div className="relative w-full h-full">
      <div ref={contentRef} className="relative w-full h-full" key={pathname}>
        {children}
      </div>
    </div>
  );
}
