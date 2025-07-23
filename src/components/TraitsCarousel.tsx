"use client";

import { useState, useRef, useEffect } from "react";
import CursorTooltip from "./CursorTooltip";

interface TraitCard {
  title: string;
  description: string;
  emoji: string;
  image?: string;
}

interface TraitsCarouselProps {
  traits: TraitCard[];
}

export default function TraitsCarousel({ traits }: TraitsCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Create infinite carousel by duplicating traits
  const infiniteTraits = [...traits, ...traits, ...traits]; // Triple the array for seamless looping

  // Auto-scroll animation with infinite loop
  useEffect(() => {
    const scrollSpeed = isHovered ? 3 : 6; // Slower when hovered, but still moving

    const animate = () => {
      if (carouselRef.current && !isDragging) {
        const container = carouselRef.current;
        const singleSetWidth = container.scrollWidth / 3; // Width of one complete set of traits

        if (container.scrollLeft >= singleSetWidth * 2) {
          // Reset to middle set when reaching the end
          container.scrollLeft = singleSetWidth;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging]);

  // Mouse event handlers for drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.5; // Reduced scroll speed multiplier for less sensitivity
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = (e?: React.MouseEvent) => {
    setIsDragging(false);
  };

  const scrollToDirection = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = 350; // Scroll by approximately one card width + gap (w-80 = 320px + gap)

      if (direction === "left") {
        container.scrollLeft = Math.max(0, container.scrollLeft - scrollAmount);
      } else {
        container.scrollLeft = Math.min(
          container.scrollWidth - container.clientWidth,
          container.scrollLeft + scrollAmount
        );
      }
    }
  };

  return (
    <div className="relative">
      <CursorTooltip>
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={(e) => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
          data-tooltip="Swipe"
          data-tooltip-icon="↔"
        >
          {infiniteTraits.map((trait, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-6 hover:border-[#ffb571] transition-all duration-300 cursor-pointer relative z-10 group/card"
            >
              {/* Radial shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(255,181,113,0.1) 0%, transparent 70%)",
                }}
              ></div>

              {/* Image Section */}
              <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-neutral-70/50">
                {trait.image ? (
                  <img
                    src={trait.image}
                    alt={trait.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-70 to-neutral-80 flex items-center justify-center">
                    <span className="text-4xl">{trait.emoji}</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{trait.emoji}</span>
                  <h3 className="text-neutral-0 font-semibold text-base">
                    {trait.title}
                  </h3>
                </div>
                <p className="text-neutral-60 text-sm leading-relaxed">
                  {trait.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CursorTooltip>
    </div>
  );
}
