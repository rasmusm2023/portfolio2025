"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface ExpoSliderProps {
  images: Array<{
    src: string;
    alt: string;
    title: string;
    lightboxSrc?: string;
  }>;
  onImageClick?: (index: number) => void;
}

export default function ExpoSlider({ images, onImageClick }: ExpoSliderProps) {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate card width based on viewport - larger images
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 900;
    if (window.innerWidth < 640) return Math.min(380, window.innerWidth - 64); // Account for padding
    if (window.innerWidth < 768) return Math.min(480, window.innerWidth - 64);
    if (window.innerWidth < 1024) return Math.min(620, window.innerWidth - 64);
    if (window.innerWidth < 1280) return Math.min(750, window.innerWidth - 64);
    if (window.innerWidth < 1536) return Math.min(880, window.innerWidth - 64);
    // For very large screens, use 90% of viewport width (with some padding)
    return Math.min(1100, window.innerWidth - 128);
  }, []);

  // Use state for dimensions to avoid hydration mismatch
  const [cardWidth, setCardWidth] = useState(900); // Default SSR value
  // Calculate card height for 16:9 aspect ratio (width * 9/16)
  const cardHeight = cardWidth * (9 / 16); // 16:9 ratio
  const gap = 32; // Gap between cards (increased for larger images)
  const totalWidth = cardWidth + gap;

  // Update dimensions on mount and resize to avoid hydration mismatch
  useEffect(() => {
    const updateDimensions = () => {
      setCardWidth(getCardWidth());
    };

    // Set initial dimensions
    updateDimensions();

    // Listen for resize events
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [getCardWidth]);

  // Handle touch/mouse start
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  }, []);

  // Handle touch/mouse move
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      setCurrentX(clientX);
      const deltaX = clientX - startX;
      setOffset(-deltaX); // Invert to fix drag direction
    },
    [isDragging, startX]
  );

  // Handle touch/mouse end
  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentX - startX;
    const threshold = totalWidth * 0.3; // 30% of card width to trigger slide

    if (Math.abs(deltaX) > threshold) {
      // Infinite scrolling - wrap around
      if (deltaX > 0) {
        // Swipe right - go to previous (wrap to last if at first)
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(prevIndex);
      } else {
        // Swipe left - go to next (wrap to first if at last)
        const nextIndex =
          currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
      }
    }

    setOffset(0);
    setCurrentX(0);
    setStartX(0);
  }, [isDragging, currentX, startX, currentIndex, images.length, totalWidth]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Navigation
  const goToSlide = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      setOffset(0);
    }
  };

  const goNext = () => {
    // Infinite: wrap to first when at last
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    goToSlide(nextIndex);
  };

  const goPrev = () => {
    // Infinite: wrap to last when at first
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    goToSlide(prevIndex);
  };

  // Calculate transform for each card based on its position relative to center
  // Handles wrapping for infinite loop - finds shortest circular distance
  const getWrappedDistance = (index: number, centerIndex: number) => {
    let distance = index - centerIndex;
    // Wrap around - find shortest distance considering circular arrangement
    if (Math.abs(distance) > images.length / 2) {
      if (distance > 0) {
        distance = distance - images.length;
      } else {
        distance = distance + images.length;
      }
    }
    return distance;
  };

  const getCardTransform = (index: number) => {
    const centerIndex = currentIndex;
    const distance = getWrappedDistance(index, centerIndex);
    const absDistance = Math.abs(distance);

    // Calculate horizontal position - center of screen is at 0
    const baseX = distance * totalWidth;
    const currentX = baseX - offset;

    // 3D perspective effect
    let scale = 1;
    let rotateY = 0;
    let translateZ = 0;
    let opacity = 1;

    if (absDistance === 0) {
      // Center card - completely flat, no rotation, full size
      scale = 1;
      rotateY = 0;
      translateZ = 0;
      opacity = 1;
    } else if (absDistance === 1) {
      // Adjacent cards - slightly tilted for panoramic effect
      scale = 0.9;
      rotateY = distance > 0 ? -15 : 15; // Subtle tilt for panoramic feel
      translateZ = -80;
      opacity = 0.85;
    } else if (absDistance === 2) {
      // Further cards - more tilted
      scale = 0.75;
      rotateY = distance > 0 ? -30 : 30;
      translateZ = -150;
      opacity = 0.6;
    } else {
      // Very far cards - heavily tilted
      scale = 0.6;
      rotateY = distance > 0 ? -45 : 45;
      translateZ = -250;
      opacity = 0.3;
    }

    return {
      transform: `translateX(${currentX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex: Math.max(0, images.length - absDistance),
    };
  };

  return (
    <div className="relative w-full py-0">
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        {/* Main slider container with 3D perspective */}
        <div
          className="relative w-full"
          style={{
            height: `${cardHeight + 120}px`, // Add extra height for shadows (60px top + 60px bottom)
            paddingTop: "60px", // Space for top shadows
            paddingBottom: "60px", // Space for bottom shadows
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          <div
            className="absolute w-full"
            style={{
              height: `${cardHeight}px`,
              top: "60px", // Offset to account for padding
              transformStyle: "preserve-3d",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            data-tooltip="Swipe"
            data-tooltip-icon="↔"
          >
            {images.map((image, index) => {
              const transform = getCardTransform(index);
              const isActive = index === currentIndex;

              return (
                <div
                  key={`${image.src}-${index}`}
                  className="absolute left-1/2 cursor-grab active:cursor-grabbing"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    marginLeft: `-${cardWidth / 2}px`,
                    marginTop: 0,
                    transform: transform.transform,
                    opacity: transform.opacity,
                    zIndex: transform.zIndex,
                    transition: isDragging
                      ? "none"
                      : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
                    pointerEvents: isDragging ? "none" : "auto",
                  }}
                  onClick={() => {
                    if (!isDragging) {
                      if (onImageClick) {
                        // Click any card: open (case study, lightbox, etc.)
                        onImageClick(index);
                      } else if (index !== currentIndex) {
                        // No handler: clicking side card just centers it
                        goToSlide(index);
                      }
                    }
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: isActive
                        ? "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)"
                        : "0 10px 30px rgba(0, 0, 0, 0.2)",
                      border: `2px solid ${
                        isActive
                          ? "rgba(139, 92, 246, 0.5)"
                          : isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)"
                      }`,
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all"
                      style={{
                        filter: isActive
                          ? "none"
                          : isDark
                          ? "grayscale(70%) brightness(0.6)" // Lighter in dark mode
                          : "grayscale(100%) brightness(0.3)", // Darker in light mode
                        transition: "filter 0.4s ease",
                      }}
                      sizes={`${cardWidth}px`}
                      priority={isActive}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/50 transition-all duration-200 group"
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white group-hover:scale-110 transition-transform"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/50 transition-all duration-200 group"
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white group-hover:scale-110 transition-transform"
          >
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-purple-500 dark:bg-purple-400"
                  : "bg-purple-400/40 dark:bg-purple-300/50 hover:bg-purple-400/60 dark:hover:bg-purple-300/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image title and counter - displayed below the slider */}
      <div className="mt-4 relative w-full">
        {/* Counter - absolutely positioned so it doesn't affect title centering */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-black/30 dark:bg-white/10 backdrop-blur-md text-white/80 dark:text-white/60 text-xs sm:text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        {/* Title - truly centered */}
        <h3
          className="text-base sm:text-lg md:text-xl font-normal transition-opacity duration-300 text-center w-full"
          style={{
            color: isDark ? "rgb(255, 255, 255)" : "#1f2937",
            minHeight: "2.5rem",
          }}
        >
          {images[currentIndex]?.title || ""}
        </h3>
      </div>
    </div>
  );
}
