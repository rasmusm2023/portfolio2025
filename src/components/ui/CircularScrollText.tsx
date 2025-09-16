"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CircularScrollTextProps {
  text?: string;
  repetitions?: number;
  className?: string;
  textColor?: string;
  fontSize?: string;
  radius?: number;
  animationDuration?: number;
  letterSpacing?: string;
}

const CircularScrollText = ({
  text = "SCROLL DOWN TO EXPLORE MORE",
  repetitions = 3,
  className = "",
  textColor = "#ef4444", // Default to red color from the work page gradient
  fontSize = "10px",
  radius = 80,
  animationDuration = 8,
  letterSpacing = "0.1em",
}: CircularScrollTextProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create the text elements with repetitions
  const textElements: string[] = [];
  for (let i = 0; i < repetitions; i++) {
    textElements.push(text);
    if (i < repetitions - 0) {
      textElements.push(" * ");
    }
  }
  const fullText = textElements.join(" ");

  useEffect(() => {
    if (!svgRef.current) return;

    // Set up the animation
    const svg = svgRef.current;
    const container = svg.parentElement;
    const textPath = svg.querySelector("textPath");
    if (textPath) {
      textPath.textContent = fullText;
    }

    // Set transform origin to center
    gsap.set(svg, { transformOrigin: "50% 50%" });

    // Track if element has been hidden to prevent re-animation
    let isHidden = false;
    let lastOpacity = 1;

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = Math.min(scrollTop / documentHeight, 1);

          // Reset hidden state if user scrolls back to top
          if (scrollTop < 100) {
            // Reset when within 100px of top
            isHidden = false;
          }

          // Calculate fade out based on element position in viewport (one-way only)
          let elementOpacity = 1;
          if (container && !isHidden) {
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Only fade out when element center is at or below viewport center
            if (elementCenter <= viewportCenter) {
              const distanceFromCenter = viewportCenter - elementCenter;
              const fadeDistance = viewportHeight * 0.4; // Slightly longer fade distance

              if (distanceFromCenter < fadeDistance) {
                elementOpacity = Math.max(0, distanceFromCenter / fadeDistance);
              } else {
                elementOpacity = 0;
                isHidden = true; // Mark as hidden to prevent further calculations
              }
            }
          } else if (isHidden) {
            elementOpacity = 0;
          }

          // Always animate rotation based on scroll progress
          const rotation = scrollProgress * 720;
          gsap.to(svg, {
            rotation: rotation,
            duration: 0.4,
            ease: "power1.out",
          });

          // Only animate opacity and glow if they have changed significantly
          if (Math.abs(elementOpacity - lastOpacity) > 0.01) {
            lastOpacity = elementOpacity;

            // Apply fade out to the entire element with smoother animation
            gsap.to(container, {
              opacity: elementOpacity,
              duration: 0.4,
              ease: "power1.out",
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set correct position
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.killTweensOf(svg);
      if (container) {
        gsap.killTweensOf(container);
      }
    };
  }, [text, repetitions, radius, animationDuration, fullText]);

  return (
    <div className={`circular-scroll-text ${className}`}>
      <svg
        ref={svgRef}
        width={radius * 2 + 20}
        height={radius * 2 + 20}
        viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
        className="rotating-text"
      >
        <defs>
          <path
            id="circularPath"
            d={`M ${radius + 10},${
              radius + 10
            } m -${radius},0 a ${radius},${radius} 0 1,1 ${
              radius * 2
            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>

        <text
          fill={textColor}
          fontSize={fontSize}
          fontWeight="700"
          letterSpacing={letterSpacing}
          textAnchor="middle"
        >
          <textPath
            href="#circularPath"
            startOffset="0%"
            style={{
              textAnchor: "middle",
            }}
          >
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularScrollText;
