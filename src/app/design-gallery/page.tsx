"use client";

import { useState, useEffect, useRef } from "react";
import CustomLightbox from "@/components/Lightbox";
import AnimatedBlob from "@/components/AnimatedBlob";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CircularScrollText from "@/components/CircularScrollText";
import { useTheme } from "@/contexts/ThemeContext";
import { Pause } from "@phosphor-icons/react";
import { gsap } from "gsap";

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
        let imageWidth;
        if (window.innerWidth < 640) {
          imageWidth = 280 + 16; // w-[280px] + mx-2
        } else if (window.innerWidth < 768) {
          imageWidth = 320 + 24; // w-[320px] + mx-3
        } else if (window.innerWidth < 1024) {
          imageWidth = 400 + 32; // w-[400px] + mx-4
        } else if (window.innerWidth < 1280) {
          imageWidth = 480 + 32; // w-[480px] + mx-4
        } else {
          imageWidth = 560 + 32; // w-[560px] + mx-4
        }

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
            className="inline-block w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] h-[200px] sm:h-[240px] md:h-[300px] lg:h-[320px] xl:h-[400px] mx-2 sm:mx-3 md:mx-4 cursor-pointer group"
            onClick={() => onImageClick(index % images.length)}
          >
            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border-2 border-neutral-80/40 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 gallery-image">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm md:text-base font-medium truncate">
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
  const [isCircularTextVisible, setIsCircularTextVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Refs for entrance animations
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const circularTextRef = useRef<HTMLDivElement>(null);
  const animatedBlobRef = useRef<HTMLDivElement>(null);
  const titleElementRef = useRef<HTMLHeadingElement>(null);

  // Hero entrance animation
  useEffect(() => {
    // Check if all refs are available
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !subtitleRef.current ||
      !circularTextRef.current ||
      !animatedBlobRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    // Set initial states - start completely hidden
    gsap.set(
      [
        titleRef.current,
        descriptionRef.current,
        subtitleRef.current,
        circularTextRef.current,
        animatedBlobRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Animate all elements together for smoother experience
    tl.to(
      [
        animatedBlobRef.current,
        titleRef.current,
        descriptionRef.current,
        subtitleRef.current,
        circularTextRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll effect for circular text visibility
  useEffect(() => {
    const handleScroll = () => {
      if (titleElementRef.current) {
        const rect = titleElementRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight; // Visible when any part of the title is in the viewport
        setIsCircularTextVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      <div className="relative z-10">
        <main className="container mx-auto">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="h-screen relative flex items-center"
          >
            <AnimatedBlob
              ref={animatedBlobRef}
              gradientColors={{
                primary: "rgba(59, 130, 246, 0.6)", // Blue
                secondary: "rgba(6, 182, 212, 0.4)", // Cyan
              }}
            />
            {/* Circular Scroll Text - Positioned at bottom right of viewport */}
            <div
              ref={circularTextRef}
              className={`absolute bottom-8 right-32 sm:right-36 md:right-40 lg:right-44 xl:right-48 z-20 transition-opacity duration-500 hidden lg:block ${
                isCircularTextVisible ? "opacity-80" : "opacity-0"
              }`}
            >
              <CircularScrollText
                text="SCROLL DOWN TO EXPLORE MORE"
                repetitions={4}
                textColor="#06b6d4"
                fontSize="12px"
                radius={88}
                animationDuration={12}
                letterSpacing="0.2em"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
              <div className="text-left w-full">
                <h1
                  ref={titleRef}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[7.5rem] font-extrabold tracking-tight leading-[0.9] sm:leading-[0.8] lg:leading-[0.6] mb-4 sm:mb-6 lg:mb-8"
                >
                  <span className="[background-image:var(--gradient-hero-design-gallery)] dark:[background-image:var(--gradient-hero-design-gallery-dark)] bg-clip-text text-transparent font-hanken">
                    Design Gallery
                  </span>
                </h1>
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mt-8 sm:mt-12 lg:mt-16">
                  <div className="flex-1 max-w-full lg:max-w-[48rem]">
                    <p
                      ref={descriptionRef}
                      className="text-neutral-70 dark:text-neutral-30 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed tracking-wide"
                    >
                      A collection of design work that doesn't fit into
                      traditional case studies — from branding and logos to
                      typography, print design, and experimental projects. These
                      go beyond just UX/UI work.
                    </p>
                  </div>
                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <span
                      ref={subtitleRef}
                      className="text-2xl sm:text-3xl md:text-4xl font-medium font-hanken tracking-wide"
                    >
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage: isDark
                            ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                            : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                        }}
                      >
                        Miscellaneous
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Moving Gallery Carousels */}
          <section
            className="py-8 sm:py-12 lg:py-16"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              {/* Instruction text - responsive */}
              <div className="flex justify-center items-center gap-2 mb-4">
                {/* Mobile/Tablet: TAP TO EXPAND */}
                <div className="lg:hidden flex items-center gap-2">
                  <p className="text-xs text-neutral-50 dark:text-neutral-50 font-bold opacity-60 tracking-wider">
                    TAP TO EXPAND
                  </p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-neutral-50 dark:text-neutral-50 opacity-60"
                  >
                    <path
                      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Desktop: HOVER TO PAUSE */}
                <div className="hidden lg:flex items-center gap-2">
                  <p className="text-xs text-neutral-50 dark:text-neutral-50 font-bold opacity-60 tracking-wider">
                    HOVER TO PAUSE
                  </p>
                  <Pause
                    size={14}
                    className="text-neutral-50 dark:text-neutral-50 opacity-60"
                  />
                </div>
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
        <div className="pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
