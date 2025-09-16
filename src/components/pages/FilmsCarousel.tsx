"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface FilmCard {
  title: string;
  year: string;
  director: string;
  coverImage?: any;
  imdbUrl?: string;
}

interface FilmsCarouselProps {
  films: FilmCard[];
  isDark: boolean;
}

// Film Card Component
function FilmCard({
  title,
  year,
  director,
  coverImage,
  imdbUrl,
}: {
  title: string;
  year: string;
  director: string;
  coverImage?: any;
  imdbUrl?: string;
}) {
  return (
    <a
      href={imdbUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-32 h-44 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#8B5CF6] transition-colors duration-200 cursor-pointer group relative"
    >
      <div className="relative w-full h-full">
        {coverImage ? (
          <>
            <Image
              src={coverImage.src}
              alt={`${title} (${year})`}
              className="w-full h-full object-cover"
              width={128}
              height={176}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </>
        ) : (
          <div className="w-full h-full bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-4">
            <div className="space-y-2">
              <h3 className="text-neutral-0 font-semibold text-sm">{title}</h3>
              <div className="space-y-1">
                <p className="text-neutral-60 text-xs">{year}</p>
                <p className="text-neutral-60 text-xs">Dir. {director}</p>
              </div>
            </div>
          </div>
        )}
        {coverImage && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pb-4">
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <p className="text-white/80 text-xs">{year}</p>
          </div>
        )}
      </div>
    </a>
  );
}

export default function FilmsCarousel({ films, isDark }: FilmsCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Create infinite carousel by duplicating films
  const infiniteFilms = [...films, ...films, ...films]; // Triple the array for seamless looping

  // Auto-scroll animation with infinite loop
  useEffect(() => {
    const scrollSpeed = isHovered ? 2 : 4; // Slower when hovered, but still moving

    const animate = () => {
      if (carouselRef.current && !isDragging && !isTouching) {
        const container = carouselRef.current;
        const singleSetWidth = container.scrollWidth / 3; // Width of one complete set of films

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

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
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
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        data-tooltip="Swipe"
        data-tooltip-icon="↔"
      >
        {infiniteFilms.map((film, index) => (
          <FilmCard
            key={index}
            title={film.title}
            year={film.year}
            director={film.director}
            coverImage={film.coverImage}
            imdbUrl={film.imdbUrl}
          />
        ))}
      </div>
    </div>
  );
}
