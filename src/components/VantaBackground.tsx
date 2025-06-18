"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

declare global {
  interface Window {
    THREE: typeof THREE;
    VANTA: {
      HALO: (config: any) => any;
    };
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    // Temporarily disabled for performance
    if (false && !vantaEffect.current) {
      console.log("Initializing Vanta effect...");
      // First, set THREE to window
      window.THREE = THREE;

      // Load the scripts dynamically
      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      Promise.all([
        loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js"
        ),
      ])
        .then(() => {
          console.log("Vanta script loaded");
          if (vantaRef.current) {
            try {
              vantaEffect.current = window.VANTA.HALO({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: false,
                gyroControls: false,
                minHeight: 80.0,
                minWidth: 80.0,
                baseColor: 0x1ab182,
                backgroundColor: 0x232323, // Darker background
                size: 0.2,
                THREE: THREE,
                amplitudeFactor: 5,
                xOffset: 0.0,
                yOffset: 0.28, // Center position
                speed: 0.05,
              });
              console.log("Vanta effect initialized");

              // Log the vanta effect object to see what methods are available
              console.log("Vanta effect object:", vantaEffect.current);
            } catch (error) {
              console.error("Error initializing Vanta effect:", error);
            }
          }
        })
        .catch((error) => {
          console.error("Error loading Vanta script:", error);
        });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  // Intersection Observer to detect visibility
  useEffect(() => {
    if (!vantaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible.current;
          isVisible.current = entry.isIntersecting;

          if (vantaEffect.current) {
            if (entry.isIntersecting && !wasVisible) {
              // Component became visible - resume animation
              console.log("Vanta animation resumed");

              // Try different methods to resume animation
              if (vantaEffect.current.resume) {
                vantaEffect.current.resume();
              } else if (
                vantaEffect.current.renderer &&
                vantaEffect.current.renderer.setAnimationLoop
              ) {
                vantaEffect.current.renderer.setAnimationLoop(() => {
                  vantaEffect.current.renderer.render(
                    vantaEffect.current.scene,
                    vantaEffect.current.camera
                  );
                });
              }
            } else if (!entry.isIntersecting && wasVisible) {
              // Component became hidden - pause animation
              console.log("Vanta animation paused");

              // Try different methods to pause animation
              if (vantaEffect.current.pause) {
                vantaEffect.current.pause();
              } else if (
                vantaEffect.current.renderer &&
                vantaEffect.current.renderer.setAnimationLoop
              ) {
                vantaEffect.current.renderer.setAnimationLoop(null);
              }
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: "50px", // Add some margin to start animation slightly before it's fully visible
      }
    );

    observer.observe(vantaRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={vantaRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-neutral-100/10" />
    </div>
  );
};

export default VantaBackground;
