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

  useEffect(() => {
    if (!vantaEffect.current) {
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
                touchControls: true,
                gyroControls: false,
                minHeight: 80.0,
                minWidth: 80.0,
                baseColor: 0x1ab182,
                backgroundColor: 0x232323, // Darker background
                size: 0.2,
                THREE: THREE,
                amplitudeFactor: 20,
                xOffset: 0.0,
                yOffset: 0.28, // Center position
                speed: 0.05,
              });
              console.log("Vanta effect initialized");
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

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={vantaRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-neutral-100/10" />
    </div>
  );
};

export default VantaBackground;
