"use client";

import { useState, useEffect } from "react";
import CustomLightbox from "@/components/Lightbox";
import AnimatedBlob from "@/components/AnimatedBlob";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useTheme } from "@/contexts/ThemeContext";
import { Pause } from "@phosphor-icons/react";

// Sample gallery data - replace with your actual images
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    alt: "UI Design Mockup",
    title: "E-commerce Dashboard Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    alt: "Mobile App Interface",
    title: "Mobile Banking App Interface",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    alt: "Data Visualization",
    title: "Analytics Dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: "Web Design",
    title: "Corporate Website Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=800&fit=crop",
    alt: "App Screens",
    title: "Fitness App Screens",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    alt: "Dashboard Design",
    title: "Admin Panel Design",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
    alt: "Brand Identity",
    title: "Brand Identity Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: "Landing Page",
    title: "SaaS Landing Page",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    alt: "Mobile Design",
    title: "Travel App Design",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
    alt: "UI Design",
    title: "Modern UI Design",
  },
  {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
    alt: "App Design",
    title: "Mobile App Design",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    alt: "Web Design",
    title: "Creative Web Design",
  },
];

// Carousel component
const MovingCarousel = ({
  images,
  direction,
  speed,
  isPaused,
  onImageClick,
}: {
  images: typeof galleryImages;
  direction: "left" | "right";
  speed: number;
  isPaused: boolean;
  onImageClick: (index: number) => void;
}) => {
  const [position, setPosition] = useState(0);
  const duplicatedImages = [...images, ...images]; // Duplicate for seamless loop

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        // Responsive image width calculation
        const imageWidth = window.innerWidth < 640 ? 480 + 16 : 560 + 32; // width + margin
        const maxPosition = images.length * imageWidth;
        const newPosition = direction === "left" ? prev - speed : prev + speed;

        if (direction === "left" && newPosition <= -maxPosition) {
          return 0;
        } else if (direction === "right" && newPosition >= 0) {
          return -maxPosition;
        }
        return newPosition;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [direction, speed, isPaused, images.length]);

  // Reset position on window resize to prevent layout issues
  useEffect(() => {
    const handleResize = () => {
      setPosition(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative overflow-hidden whitespace-nowrap py-4">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-neutral-0 dark:from-neutral-100 to-transparent z-10 pointer-events-none" />

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-neutral-0 dark:from-neutral-100 to-transparent z-10 pointer-events-none" />

      <div
        className="inline-flex transition-none"
        style={{
          transform: `translateX(${position}px)`,
          transition: isPaused ? "none" : "none",
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="inline-block w-[480px] sm:w-[560px] h-[320px] sm:h-[400px] mx-2 sm:mx-4 cursor-pointer group"
            onClick={() => onImageClick(index % images.length)}
          >
            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border-2 border-neutral-80/40 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 gallery-image">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm sm:text-base font-medium truncate">
                  {image.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DesignGalleryPage() {
  const { isDark } = useTheme();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      <div className="relative z-10">
        <main className="container mx-auto">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(255, 181, 113, 0.6)", // Orange
                secondary: "rgba(255, 217, 61, 0.4)", // Yellow
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-design-gallery)] dark:[background-image:var(--gradient-hero-design-gallery-dark)] bg-clip-text text-transparent font-hanken">
                    Design Gallery
                  </span>
                </h1>
                <div className="flex justify-between items-start mt-16">
                  <div className="flex-1 max-w-[48rem]">
                    <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                      A collection of design work that doesn't fit into
                      traditional case studies — from branding and logos to
                      typography, print design, and experimental projects. These
                      go beyond just UX/UI work.
                    </p>
                  </div>
                  <div className="ml-8">
                    <span className="text-neutral-60 dark:text-neutral-40 text-5xl font-medium font-hanken tracking-wide">
                      Miscellaneous
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Moving Gallery Carousels */}
          <section
            className="py-16"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="text-left w-full max-w-[1600px]">
              {/* Hover instruction */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <p className="text-xs text-neutral-50 dark:text-neutral-50 font-bold opacity-60 tracking-wider">
                  HOVER TO PAUSE
                </p>
                <Pause
                  size={14}
                  className="text-neutral-50 dark:text-neutral-50 opacity-60"
                />
              </div>

              {/* First Carousel - Scrolls Left */}
              <div className="mb-8 sm:mb-12">
                <MovingCarousel
                  images={galleryImages.slice(0, 6)}
                  direction="left"
                  speed={2.5}
                  isPaused={isHovered}
                  onImageClick={openLightbox}
                />
              </div>

              {/* Second Carousel - Scrolls Right */}
              <div className="mb-8 sm:mb-12">
                <MovingCarousel
                  images={galleryImages.slice(6, 12)}
                  direction="right"
                  speed={3}
                  isPaused={isHovered}
                  onImageClick={openLightbox}
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <CustomLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
