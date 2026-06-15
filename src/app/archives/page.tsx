"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomLightbox from "@/components/ui/Lightbox";
import AnimatedBlob from "@/components/ui/AnimatedBlob";
import CustomCursor from "@/components/CustomCursor";
import CircularScrollText from "@/components/ui/CircularScrollText";
import { useTheme } from "@/contexts/ThemeContext";
import { gsap } from "gsap";
import ExpoSlider from "@/components/pages/ExpoSlider";

// Case studies for the archives carousel (section 1)
const caseStudiesForArchives = [
  {
    src: "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "Emplojd SaaS Platform Case Study",
    title: "Emplojd",
    link: "/case-studies/emplojd",
  },
  {
    src: "/assets/case-study-assets/noted/Projects-Case-Card-Thumbnail-Noted.webp",
    alt: "Noted App",
    title: "Noted",
    link: "/case-studies/noted",
  },
  {
    src: "/assets/case-study-assets/zmartrest-ai/Projects-Case-Card-Thumbnail-Zmartrest-AI.webp",
    alt: "Zmartrest AI Platform",
    title: "Zmartrest AI",
    link: "/case-studies/zmartrest-ai",
  },
];

// Gallery data - organized by category
const appsAndWebsitesImages = [
  {
    src: "/assets/design-gallery-assets/App design for transfer & payments.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/App design for transfer & payments.webp",
    alt: "App design for transfer & payments",
    title: "App design for transfer & payments",
  },
  {
    src: "/assets/design-gallery-assets/App design for students.webp",
    lightboxSrc: "/assets/design-gallery-assets/App design for students.webp",
    alt: "App design for students",
    title: "App design for students",
  },
  {
    src: "/assets/design-gallery-assets/App explorations for AI app.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/App explorations for AI app.webp",
    alt: "App explorations for AI app",
    title: "App explorations for AI app",
  },
  {
    src: "/assets/design-gallery-assets/App design for AI app.webp",
    lightboxSrc: "/assets/design-gallery-assets/App design for AI app.webp",
    alt: "App design for AI app",
    title: "App design for AI app",
  },
  {
    src: "/assets/design-gallery-assets/Landing page for web agency.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Landing page for web agency.webp",
    alt: "Landing page for web agency",
    title: "Landing page for web agency",
  },
  {
    src: "/assets/design-gallery-assets/Landing page exploration for cybersecurity.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Landing page exploration for cybersecurity.webp",
    alt: "Landing page exploration for cybersecurity",
    title: "Landing page exploration for cybersecurity",
  },
  {
    src: "/assets/design-gallery-assets/Website design for e-commerce.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Website design for e-commerce.webp",
    alt: "Website design for e-commerce",
    title: "Website design for e-commerce",
  },
];

const gamesImages = [
  {
    src: "/assets/design-gallery-assets/UI concept for survival & crafting game.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/UI concept for survival & crafting game.webp",
    alt: "UI concept for survival & crafting game",
    title: "UI concept for survival & crafting game",
  },
  {
    src: "/assets/design-gallery-assets/Game launcher Figma recreation.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Game launcher Figma recreation.webp",
    alt: "Game launcher Figma recreation",
    title: "Game launcher Figma recreation",
  },
];

const printsImages = [
  {
    src: "/assets/design-gallery-assets/Z-Fold brochure design for cybersecurity firm.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Z-Fold brochure design for cybersecurity firm.webp",
    alt: "Z-Fold brochure design for cybersecurity firm",
    title: "Z-Fold brochure design for cybersecurity firm",
  },
  {
    src: "/assets/design-gallery-assets/Z-Fold brochure design for cybersecurity firm-open.webp",
    lightboxSrc:
      "/assets/design-gallery-assets/Z-Fold brochure design for cybersecurity firm-open.webp",
    alt: "Z-Fold brochure design for cybersecurity firm-open",
    title: "Z-Fold brochure design for cybersecurity firm-open",
  },
];

// Combined gallery images for lightbox
const galleryImages = [
  ...appsAndWebsitesImages,
  ...gamesImages,
  ...printsImages,
];

export default function ArchivesPage() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isCircularTextVisible, setIsCircularTextVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCaseStudyClick = (index: number) => {
    const item = caseStudiesForArchives[index];
    if (item?.link) router.push(item.link);
  };

  // Update page title
  useEffect(() => {
    document.title =
      "Archives — Rasmus Mattsson | Product Designer Portfolio";
  }, []);

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
                  <span className="[background-image:var(--gradient-hero-archives)] dark:[background-image:var(--gradient-hero-archives-dark)] bg-clip-text text-transparent font-hanken">
                    Archives
                  </span>
                </h1>
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mt-8 sm:mt-12 lg:mt-16">
                  <div className="flex-1 max-w-full lg:max-w-[48rem]">
                    <p
                      ref={descriptionRef}
                      className="text-neutral-70 dark:text-neutral-30 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed tracking-wide"
                    >
                      A simple collection of various design work. From branding
                      and logos to typography, print design, and experimental
                      projects. These go beyond just UX/UI work.
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

          {/* Expo Sliders */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              {/* Expo Slider - Case Studies (section 1) */}
              <div className="mb-8 sm:mb-12 mt-8 sm:mt-12">
                <div className="mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                      1
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                      <span
                        className="bg-clip-text text-transparent font-hanken"
                        style={{
                          backgroundImage: isDark
                            ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                            : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                        }}
                      >
                        Case Studies
                      </span>
                    </h2>
                  </div>
                </div>
                <ExpoSlider
                  images={caseStudiesForArchives}
                  onImageClick={handleCaseStudyClick}
                />
              </div>

              {/* Expo Slider - Apps & Websites (section 2) */}
              <div className="mb-8 sm:mb-12 mt-8 sm:mt-12">
                <div className="mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                      2
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                      <span
                        className="bg-clip-text text-transparent font-hanken"
                        style={{
                          backgroundImage: isDark
                            ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                            : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                        }}
                      >
                        Apps & Websites
                      </span>
                    </h2>
                  </div>
                </div>
                <ExpoSlider
                  images={appsAndWebsitesImages}
                  onImageClick={(index) => openLightbox(index)}
                />
              </div>

              {/* Expo Slider - Games (section 3) */}
              <div className="mb-8 sm:mb-12 mt-8 sm:mt-12">
                <div className="mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                      3
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                      <span
                        className="bg-clip-text text-transparent font-hanken"
                        style={{
                          backgroundImage: isDark
                            ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                            : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                        }}
                      >
                        Games
                      </span>
                    </h2>
                  </div>
                </div>
                <ExpoSlider
                  images={gamesImages}
                  onImageClick={(index) =>
                    openLightbox(appsAndWebsitesImages.length + index)
                  }
                />
              </div>

              {/* Expo Slider - Prints (section 4) */}
              <div className="mb-8 sm:mb-12 mt-8 sm:mt-12">
                <div className="mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                      4
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                      <span
                        className="bg-clip-text text-transparent font-hanken"
                        style={{
                          backgroundImage: isDark
                            ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                            : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                        }}
                      >
                        Prints
                      </span>
                    </h2>
                  </div>
                </div>
                <ExpoSlider
                  images={printsImages}
                  onImageClick={(index) =>
                    openLightbox(
                      appsAndWebsitesImages.length + gamesImages.length + index
                    )
                  }
                />
              </div>
            </div>
          </section>
        </main>
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
