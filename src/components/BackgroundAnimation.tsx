"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the initial animation
    const createAnimation = () => {
      const container = containerRef.current;
      if (!container) return;

      // Create gradient elements
      const gradient1 = document.createElement("div");
      const gradient2 = document.createElement("div");

      gradient1.className =
        "absolute inset-0 bg-gradient-to-br from-accent-100/20 to-accent-60/20";
      gradient2.className =
        "absolute inset-0 bg-gradient-to-tr from-accent-80/20 to-accent-40/20";

      container.appendChild(gradient1);
      container.appendChild(gradient2);

      // Create the animation timeline
      animationRef.current = gsap
        .timeline({ repeat: -1 })
        .to(gradient1, {
          x: "100%",
          y: "100%",
          duration: 20,
          ease: "none",
        })
        .to(
          gradient2,
          {
            x: "-100%",
            y: "-100%",
            duration: 15,
            ease: "none",
          },
          0
        );
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position as percentage
      mouseRef.current = {
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      };

      // Update gradient positions based on mouse movement
      if (containerRef.current) {
        const gradients = containerRef.current.querySelectorAll("div");
        gradients.forEach((gradient, index) => {
          gsap.to(gradient, {
            x: `${mouseRef.current.x * (index === 0 ? 0.5 : -0.5)}%`,
            y: `${mouseRef.current.y * (index === 0 ? 0.5 : -0.5)}%`,
            duration: 1,
            ease: "power2.out",
          });
        });
      }
    };

    createAnimation();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-neutral-100"
      style={{
        background:
          "radial-gradient(circle at center, #2a2a2a 0%, #232323 100%)",
      }}
    />
  );
};

export default BackgroundAnimation;
