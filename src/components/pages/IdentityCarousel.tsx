"use client";

import { useState, useRef, useEffect } from "react";

interface IdentityCard {
  title: string;
  description: string;
  emoji: string;
  image?: string;
}

interface IdentityCarouselProps {
  identity: IdentityCard[];
  isDark: boolean;
}

export default function IdentityCarousel({
  identity,
  isDark,
}: IdentityCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Create infinite carousel by duplicating identity
  const infiniteIdentity = [...identity, ...identity, ...identity]; // Triple the array for seamless looping

  // Auto-scroll animation with infinite loop
  useEffect(() => {
    const scrollSpeed = isHovered ? 3 : 6; // Slower when hovered, but still moving

    const animate = () => {
      if (carouselRef.current && !isDragging && !isTouching) {
        const container = carouselRef.current;
        const singleSetWidth = container.scrollWidth / 3; // Width of one complete set of identity

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
  }, [isHovered, isDragging, isTouching]);

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
    const walk = (x - startX) * 1.2; // Increased scroll speed multiplier for faster dragging
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

  // Touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
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
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        style={{
          userSelect: "none",
          scrollBehavior: isDragging ? "auto" : "smooth",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={(e) => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-tooltip="Swipe"
        data-tooltip-icon="↔"
      >
        {infiniteIdentity.map((identityItem, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 sm:w-64 md:w-80 border border-neutral-20/10 dark:border-neutral-100/10 rounded-2xl p-5 sm:p-4 md:p-6 hover:border-[#8B5CF6] transition-all duration-300 cursor-pointer relative z-10 group/card overflow-hidden shadow-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(35, 35, 35, 0.5)"
                : "rgba(248, 248, 248, 0.95)",
              userSelect: "none",
            }}
          >
            {/* Blurred Background Layer */}
            {identityItem.image && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${
                    isDark
                      ? "rgba(0,0,0,0.7), rgba(0,0,0,0.9)"
                      : "rgba(255,255,255,0.8), rgba(255,255,255,0.85)"
                  }), url(${identityItem.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(4px)",
                  zIndex: -1,
                }}
              />
            )}
            {!identityItem.image && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(to bottom, rgba(64,64,64,0.8), rgba(32,32,32,0.9))"
                    : "linear-gradient(to bottom, rgba(240,240,240,0.8), rgba(230,230,230,0.9))",
                  zIndex: -1,
                }}
              />
            )}
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                backgroundImage: isDark
                  ? "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at top, rgba(139,92,246,0.15) 0%, transparent 70%)",
              }}
            ></div>

            {/* Image Section */}
            <div className="w-full aspect-square mb-4 sm:mb-3 md:mb-4 rounded-xl overflow-hidden">
              {identityItem.image ? (
                <img
                  src={identityItem.image}
                  alt={identityItem.title}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "center",
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(to bottom right, rgb(64, 64, 64), rgb(32, 32, 32))"
                      : "linear-gradient(to bottom right, rgb(240, 240, 240), rgb(220, 220, 220))",
                  }}
                >
                  <span className="text-3xl sm:text-4xl md:text-6xl">
                    {identityItem.emoji}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div
              className="space-y-3 sm:space-y-2 md:space-y-3 relative z-10"
              style={{ userSelect: "none" }}
            >
              <div className="flex items-center gap-3 sm:gap-2 md:gap-3">
                <span className="text-2xl sm:text-xl md:text-2xl">
                  {identityItem.emoji}
                </span>
                <h3
                  className="font-semibold text-base sm:text-sm md:text-base"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  {identityItem.title}
                </h3>
              </div>
              <p
                className="text-sm sm:text-sm leading-relaxed"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                }}
                dangerouslySetInnerHTML={{ __html: identityItem.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
