"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [pathname]);

  return (
    <>
      <Hero />
      <main ref={contentRef} className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}
