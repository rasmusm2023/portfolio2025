"use client";

import ParticlesBackground from "./ParticlesBackground";
import Header from "./Header";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const titles = [
  "UX Designer",
  "UI Designer",
  "Product Designer",
  "Low-code Developer",
];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    titles.forEach((title) => {
      // Get current text length for reverse typing
      const currentText = titleRef.current?.textContent || "";
      const currentLength = currentText.length;

      // Reverse typewriter effect (erasing) - slightly faster
      for (let i = currentLength; i >= 0; i--) {
        tl.to(titleRef.current, {
          duration: 0.03, // Faster erasing
          onComplete: () => {
            if (titleRef.current) {
              titleRef.current.textContent = currentText.slice(0, i);
            }
          },
        });
      }

      // Type out new text with randomized timing
      const chars = title.split("");
      chars.forEach((char) => {
        tl.to(titleRef.current, {
          duration: 0.05 + Math.random() * 0.1, // Random duration between 0.05 and 0.15
          onComplete: () => {
            if (titleRef.current) {
              titleRef.current.textContent += char;
            }
          },
        });
      });

      // Pause before next title
      tl.to({}, { duration: 1.5 }); // Slightly shorter pause
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen">
      <div className="mx-8 my-8 rounded-2xl h-[85vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <ParticlesBackground />
        </div>
        <div className="relative z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <Header />
          </div>
          <div className="flex items-center justify-center h-[calc(85vh-80px)]">
            <div className="text-center pointer-events-auto">
              <h1
                ref={titleRef}
                className="text-8xl font-bold mb-4 text-neutral-0"
              >
                UX Designer
              </h1>
              <p className="text-xl text-neutral-40">Other text</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
