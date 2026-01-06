"use client";

import VantaBackground from "@/components/background/VantaBackground";
import AnimatedBlob from "@/components/ui/AnimatedBlob";
import BentoBoxRest from "@/components/ui/BentoBoxRest";
import CaseStudiesShowcase from "@/components/case-studies/CaseStudiesShowcase";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/CustomCursor";
import InfiniteScrollBanner from "@/components/pages/InfiniteScrollBanner";
import IdentityCarousel from "@/components/pages/IdentityCarousel";
import { gradients, colors, withOpacity } from "@/styles/colors";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

// Import images for Identity Carousel
import MellbystrandImage from "@/../public/assets/images/16bit/mellbystrand.webp";
import NightOwlImage from "@/../public/assets/images/16bit/nightowl.webp";
import Formula1Image from "@/../public/assets/images/16bit/formula-1-enthusiast.webp";
import StockholmImage from "@/../public/assets/images/16bit/stockholm-local.webp";
import AvidGamerImage from "@/../public/assets/images/16bit/avid-gamer.webp";
import HomeCookImage from "@/../public/assets/images/16bit/home-cook.webp";
import AnimalLoverImage from "@/../public/assets/images/16bit/animal-lover.webp";
import DesignThinkerImage from "@/../public/assets/images/16bit/design-thinker.webp";
import MusicFestivalsImage from "@/../public/assets/images/16bit/music-and-festivals.webp";
import InfjAImage from "@/../public/assets/images/16bit/INFJ-A.png";
import TechExplorerImage from "@/../public/assets/images/16bit/tech-explorer.webp";
import AiAdvocateImage from "@/../public/assets/images/16bit/AI-advocate.webp";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  subtitle: string;
  image: string;
  alt: string;
  link: string;
  isActive: boolean;
  isPasswordProtected: boolean;
  isPlaceholder: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "emplojd",
    title: "Emplojd",
    category: "AI / Design lead / Design system / Workshop",
    description: "Enhancing job applications without compromising authenticity",
    subtitle: "— Enhancing job applications without compromising authenticity",
    image:
      "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "Emplojd SaaS Platform Case Study",
    link: "/case-studies/emplojd",
    isActive: true,
    isPasswordProtected: false,
    isPlaceholder: false,
  },
  {
    id: "noted",
    title: "Noted",
    category: "Web Design / UX / UI / Development / Mobile Design",
    description: "Revolutionary note-taking experience",
    subtitle: "— Task Management SaaS Website",
    image:
      "/assets/case-study-assets/noted/Projects-Case-Card-Thumbnail-Noted.webp",
    alt: "Noted App",
    link: "/case-studies/noted",
    isActive: false,
    isPasswordProtected: true,
    isPlaceholder: false,
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    category: "AI / ML / App Design / New Features / UX Research / UI Design",
    description: "Intelligent restaurant management system",
    subtitle: "— Health-Tech App For A Sustainable Worklife",
    image:
      "/assets/case-study-assets/zmartrest-ai/Projects-Case-Card-Thumbnail-Zmartrest-AI.webp",
    alt: "Zmartrest AI Platform",
    link: "/case-studies/zmartrest-ai",
    isActive: false,
    isPasswordProtected: true,
    isPlaceholder: false,
  },
];

// Date pill component (liquid glass style)
const DatePill = ({ year, isDark }: { year: string; isDark: boolean }) => {
  return (
    <span
      className="text-xs sm:text-sm font-bold px-2 py-1 rounded-full backdrop-blur-md border shadow-lg"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#ffffff", // Always white text for better contrast
        borderColor: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
      }}
    >
      {year}
    </span>
  );
};

// Hollow pill component (sharp rectangles with black and white)
const HollowPill = ({ text, isDark }: { text: string; isDark: boolean }) => {
  return (
    <span
      className="text-xs sm:text-sm font-bold px-2 py-1 rounded-md border"
      style={{
        color: colors.neutral[0],
        borderColor: withOpacity(colors.neutral[0], 0.25),
        backgroundColor: colors.neutral[100],
      }}
    >
      {text}
    </span>
  );
};

export default function HomeV2() {
  const { isDark } = useTheme();
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update page title
  useEffect(() => {
    document.title = "Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  // Refs for entrance animations
  const heroRef = useRef<HTMLElement>(null);
  const animatedBlobRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (caseId: string) => {
    setHoveredCase(caseId);

    // GSAP morphing animation - responsive pill shape
    const button = buttonRefs.current[caseId];
    if (button) {
      const currentHeight = button.offsetHeight;
      const pillWidth = currentHeight * 1.4;

      gsap.to(button, {
        width: pillWidth,
        borderRadius: currentHeight / 2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCase(null);

    Object.values(buttonRefs.current).forEach((button) => {
      if (button) {
        const currentHeight = button.offsetHeight;
        gsap.to(button, {
          width: currentHeight,
          borderRadius: currentHeight / 2,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const getBoxScale = (boxId: string) => {
    return hoveredBox === boxId ? 1.02 : 1;
  };

  // Handle scrolling to case studies section when coming from case study page
  useEffect(() => {
    const shouldScrollToCaseStudies = sessionStorage.getItem(
      "scrollToCaseStudies"
    );
    if (shouldScrollToCaseStudies === "true") {
      // Clear the flag
      sessionStorage.removeItem("scrollToCaseStudies");

      // Wait a bit for the page to load, then scroll
      setTimeout(() => {
        const element = document.getElementById("case-studies");
        if (element) {
          const offset = 300;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-neutral-0 dark:bg-[#060608]" />
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main>
          {/* Hero Section with Project Cards */}
          <section
            ref={heroRef}
            id="home"
            className="min-h-screen relative flex items-center pt-24 sm:pt-28 md:pt-32 pb-2 sm:pb-3 md:pb-4"
          >
            <AnimatedBlob
              ref={animatedBlobRef}
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)",
                secondary: "rgba(168, 85, 247, 0.4)",
              }}
            />
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* Text Card - Hero Content (Top Left) */}
                <div
                  className="border-2 border-neutral-80/40 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 flex flex-col justify-center hover:border-neutral-80/60 transition-all duration-500 relative group topography-bg h-[450px] sm:h-[500px] md:h-[550px]"
                  style={{
                    transform: `scale(${getBoxScale("hero-text")})`,
                    backgroundColor: isDark ? "#060608" : "#ffffff",
                    userSelect: "none",
                  }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onMouseEnter={() => setHoveredBox("hero-text")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>

                  <div className="flex-1 flex flex-col justify-between relative z-10 pb-4 sm:pb-5 md:pb-6">
                    <div>
                      {/* Name title */}
                      <div className="mb-4 sm:mb-5 md:mb-6">
                        <h2
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-regular leading-tight font-instrument-serif text-neutral-80 dark:text-neutral-20"
                          style={{
                            color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                          }}
                        >
                          Rasmus Mattsson
                        </h2>
                      </div>
                      {/* Main title */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4">
                        <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                          UX/UI Designer
                        </span>
                      </h1>

                      {/* Subtitle */}
                      <div className="mb-3 sm:mb-4">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium font-hanken tracking-wide">
                          <span
                            className="bg-clip-text text-transparent"
                            style={{
                              backgroundImage: isDark
                                ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                                : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                            }}
                          >
                            & Developer
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Hero statement */}
                    <div className="hero-statement mt-auto">
                      <div className="statement-line flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-2.5 md:mb-3">
                        <span className="word text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                          I
                        </span>
                        <span className="word text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                          design
                        </span>
                        <span className="word highlight">
                          <span className="highlight-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            digital
                          </span>
                          <span className="highlight-bg"></span>
                        </span>
                        <span className="word highlight">
                          <span className="highlight-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            products
                          </span>
                          <span className="highlight-bg"></span>
                        </span>
                        <span className="word text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                          that
                        </span>
                        <span className="word text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                          make
                        </span>
                      </div>
                      <div className="statement-line flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                        <span className="word highlight">
                          <span className="highlight-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            impactful
                          </span>
                          <span className="highlight-bg"></span>
                        </span>
                        <span className="word highlight">
                          <span className="highlight-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            experiences
                          </span>
                          <span className="highlight-bg"></span>
                        </span>
                        <span className="word text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                          happen.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Card 1 - Emplojd */}
                {caseStudies[0] && (
                  <div
                    className="group relative transition-all duration-300 overflow-hidden cursor-pointer border-2 border-neutral-80/40 rounded-xl sm:rounded-2xl hover:border-neutral-80/60 case-study-card h-[450px] sm:h-[500px] md:h-[550px] flex flex-col"
                    style={{
                      transform: `scale(${getBoxScale(
                        `project-${caseStudies[0].id}`
                      )})`,
                      backgroundColor: isDark ? "#060608" : "#ffffff",
                    }}
                    onMouseEnter={() => {
                      handleMouseEnter(caseStudies[0].id);
                      setHoveredBox(`project-${caseStudies[0].id}`);
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredBox(null);
                    }}
                    data-cursor-target="case-study"
                  >
                    <div className="w-full flex-1 overflow-hidden rounded-xl sm:rounded-2xl relative">
                      <Image
                        src={caseStudies[0].image}
                        alt={caseStudies[0].alt}
                        width={400}
                        height={300}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        {caseStudies[0].id === "emplojd" && (
                          <DatePill year="2024" isDark={isDark} />
                        )}
                        <div className="bg-white/90 text-neutral-800 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          Case study
                        </div>
                      </div>
                      {caseStudies[0].id === "emplojd" && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          <HollowPill text="UX/UI design" isDark={isDark} />
                          <HollowPill text="Mobile" isDark={isDark} />
                          <HollowPill text="AI" isDark={isDark} />
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 pb-4 sm:pb-5 md:pb-6 flex-shrink-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base md:text-lg font-semibold font-hanken">
                            {caseStudies[0].title}
                          </h3>
                          <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base font-medium">
                            {caseStudies[0].subtitle}
                          </span>
                        </div>
                        <div
                          ref={(el) => {
                            buttonRefs.current[caseStudies[0].id] = el;
                          }}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">
                        {caseStudies[0].category}
                      </div>
                    </div>
                    <Link
                      href={caseStudies[0].link}
                      className="absolute inset-0 z-20"
                      aria-label={`View ${caseStudies[0].title} case study`}
                      data-cursor-target="case-study"
                    />
                  </div>
                )}

                {/* Project Card 2 - Noted */}
                {caseStudies[1] && (
                  <div
                    className="group relative transition-all duration-300 overflow-hidden cursor-pointer border-2 border-neutral-80/40 rounded-xl sm:rounded-2xl hover:border-neutral-80/60 case-study-card h-[450px] sm:h-[500px] md:h-[550px] flex flex-col"
                    style={{
                      transform: `scale(${getBoxScale(
                        `project-${caseStudies[1].id}`
                      )})`,
                      backgroundColor: isDark ? "#060608" : "#ffffff",
                    }}
                    onMouseEnter={() => {
                      handleMouseEnter(caseStudies[1].id);
                      setHoveredBox(`project-${caseStudies[1].id}`);
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredBox(null);
                    }}
                    data-cursor-target="case-study"
                  >
                    <div className="w-full flex-1 overflow-hidden rounded-xl sm:rounded-2xl relative">
                      <Image
                        src={caseStudies[1].image}
                        alt={caseStudies[1].alt}
                        width={400}
                        height={300}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        {caseStudies[1].id === "noted" && (
                          <DatePill year="2025" isDark={isDark} />
                        )}
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          Coming soon
                        </div>
                      </div>
                      {caseStudies[1].id === "noted" && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          <HollowPill text="Product design" isDark={isDark} />
                          <HollowPill text="Multiple devices" isDark={isDark} />
                          <HollowPill text="Task management" isDark={isDark} />
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 pb-4 sm:pb-5 md:pb-6 flex-shrink-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base md:text-lg font-semibold font-hanken">
                            {caseStudies[1].title}
                          </h3>
                          <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base font-medium">
                            {caseStudies[1].subtitle}
                          </span>
                        </div>
                        <div
                          ref={(el) => {
                            buttonRefs.current[caseStudies[1].id] = el;
                          }}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">
                        {caseStudies[1].category}
                      </div>
                    </div>
                    <Link
                      href={caseStudies[1].link}
                      className="absolute inset-0 z-20"
                      aria-label={`View ${caseStudies[1].title} case study`}
                      data-cursor-target="case-study"
                    />
                  </div>
                )}

                {/* Project Card 3 - Zmartrest AI */}
                {caseStudies[2] && (
                  <div
                    className="group relative transition-all duration-300 overflow-hidden cursor-pointer border-2 border-neutral-80/40 rounded-xl sm:rounded-2xl hover:border-neutral-80/60 case-study-card h-[450px] sm:h-[500px] md:h-[550px] flex flex-col"
                    style={{
                      transform: `scale(${getBoxScale(
                        `project-${caseStudies[2].id}`
                      )})`,
                      backgroundColor: isDark ? "#060608" : "#ffffff",
                    }}
                    onMouseEnter={() => {
                      handleMouseEnter(caseStudies[2].id);
                      setHoveredBox(`project-${caseStudies[2].id}`);
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredBox(null);
                    }}
                    data-cursor-target="case-study"
                  >
                    <div className="w-full flex-1 overflow-hidden rounded-xl sm:rounded-2xl relative">
                      <Image
                        src={caseStudies[2].image}
                        alt={caseStudies[2].alt}
                        width={400}
                        height={300}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        {caseStudies[2].id === "zmartrest-ai" && (
                          <DatePill year="2025" isDark={isDark} />
                        )}
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          Coming soon
                        </div>
                      </div>
                      {caseStudies[2].id === "zmartrest-ai" && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          <HollowPill text="UX/UI design" isDark={isDark} />
                          <HollowPill text="Mobile" isDark={isDark} />
                          <HollowPill text="Health-tech" isDark={isDark} />
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 pb-4 sm:pb-5 md:pb-6 flex-shrink-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base md:text-lg font-semibold font-hanken">
                            {caseStudies[2].title}
                          </h3>
                          <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base font-medium">
                            {caseStudies[2].subtitle}
                          </span>
                        </div>
                        <div
                          ref={(el) => {
                            buttonRefs.current[caseStudies[2].id] = el;
                          }}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">
                        {caseStudies[2].category}
                      </div>
                    </div>
                    <Link
                      href={caseStudies[2].link}
                      className="absolute inset-0 z-20"
                      aria-label={`View ${caseStudies[2].title} case study`}
                      data-cursor-target="case-study"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Experience Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                  01
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
                    Experience
                  </span>
                </h2>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-12">
              {/* Experience Entry 1 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    JAN, 2025 - MAY, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    Product Designer Intern, Zmartrest AI
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Spearheaded new app features and data visualizations to
                    tackle usability pain points. Engineered a streak mechanic
                    that boosted daily activity, while mapping user journeys and
                    shaping a leader portal MVP that drove a 68% increase in
                    engagement by transforming insights into actionable
                    guidance.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/assets/logos/Experience/zmartrest-logo-dark-mode.svg"
                          : "/assets/logos/Experience/zmartrest-logo-light-mode.svg"
                      }
                      alt="Zmartrest AI Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Entry 2 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    NOV, 2024 - JAN, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    UX/UI Designer Intern, Xbrandify
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Thrived in a fast-paced travel startup, crafting tailored
                    landing pages and demo sites that reflected diverse customer
                    brands. Initiated the company's first style guide to unify
                    design efforts, while energizing sales and investor outreach
                    through impactful pitch decks, logos, and social campaigns.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/assets/logos/Experience/xbrandify-logo-dark-mode.svg"
                          : "/assets/logos/Experience/xbrandify-logo-light-mode.svg"
                      }
                      alt="Xbrandify Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Entry 3 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    MAY, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    Product Designer & Developer, Noted
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Championed a solo passion project by conceiving, designing,
                    and coding a productivity web app. Empowered individuals to
                    streamline tasks and capture ideas seamlessly across desktop
                    and mobile. Forged a scalable design system that balanced
                    simplicity, flexibility, and daily usability.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/assets/logos/Experience/noted-logo-dark-mode.svg"
                          : "/assets/logos/Experience/noted-logo-light-mode.svg"
                      }
                      alt="Noted Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Entry 4 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    SEP, 2024 - NOV, 2024
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    UX/UI Designer, Fokus
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Drove a collaborative design process to develop a study-tech
                    app prototype. Defined goals and KPIs, mapped user journeys,
                    and facilitated workshops on ethics and ideation. Iterative
                    usability testing refined the final solution, supported by
                    empathy mapping, flowcharts, and structured outcomes.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/assets/logos/Experience/fokus-logo-dark-mode.svg"
                          : "/assets/logos/Experience/fokus-logo-light-mode.svg"
                      }
                      alt="Fokus Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                  02
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
                    Education
                  </span>
                </h2>
              </div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-12">
              {/* Education Entry 1 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    UX/UI Designer with Frontend – Diploma
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 mb-2">
                    Chas Academy, Stockholm, Sweden
                  </p>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Specialized in UX/UI design and frontend development, diving
                    deep into design thinking, accessibility, research
                    methodologies, user interviews, and design systems. Built
                    real-world projects from concept to launch, combining
                    creativity with technical expertise.
                  </p>
                  <p className="text-sm text-neutral-60 dark:text-neutral-40 mt-3 italic">
                    Relevant Coursework: UX/UI design, Web design, Frontend
                    development, Design systems, UX research, WCAG
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Institution Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <div className="w-full h-full bg-neutral-100/10 dark:bg-neutral-0/10 border border-neutral-100/20 dark:border-neutral-0/20 rounded-xl flex items-center justify-center">
                      <span className="text-neutral-60 dark:text-neutral-40 text-sm font-medium">
                        Chas Academy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Entry 2 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    Digital Accessibility and Inclusive Design – Diploma
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 mb-2">
                    Axess Labs, Stockholm, Sweden
                  </p>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Focused on creating inclusive digital experiences through
                    comprehensive understanding of accessibility principles,
                    assistive technologies, and WCAG guidelines. Learned to
                    conduct accessibility audits and design with diverse user
                    needs in mind.
                  </p>
                  <p className="text-sm text-neutral-60 dark:text-neutral-40 mt-3 italic">
                    Relevant Coursework: Inclusive design principles, Assistive
                    technology, Accessibility auditing, WCAG, Accessibility
                    guidelines, User needs
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Institution Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <div className="w-full h-full bg-neutral-100/10 dark:bg-neutral-0/10 border border-neutral-100/20 dark:border-neutral-0/20 rounded-xl flex items-center justify-center">
                      <span className="text-neutral-60 dark:text-neutral-40 text-sm font-medium">
                        Axess Labs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of Bento Boxes */}
        <BentoBoxRest />

        {/* About Me Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                  03
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
                    About me
                  </span>
                </h2>
              </div>
            </div>

            {/* Bento Box Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 sm:gap-8 lg:gap-12 auto-rows-[280px] sm:auto-rows-[300px] lg:auto-rows-[320px]">
              {/* About Me - Copy 1 - 50% width */}
              <div
                className="lg:col-span-4 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-2 relative group topography-bg"
                style={{
                  transform: `scale(${getBoxScale("about1")})`,
                  backgroundColor: isDark ? "#060608" : "#ffffff",
                  userSelect: "none",
                }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredBox("about1")}
                onMouseLeave={() => setHoveredBox(null)}
              >
                {/* Radial shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                      : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                  }}
                ></div>
                <div className="flex items-center justify-between -mt-2 relative z-10">
                  <h2 className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: isDark
                          ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                          : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                      }}
                    >
                      RASMUS.TXT
                    </span>
                  </h2>
                  <Image
                    src="/assets/icons/3dicons-boy-dynamic-premium.png"
                    alt="Rasmus"
                    width={60}
                    height={60}
                    className="animate-pulse-subtle w-14 h-14 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20"
                  />
                </div>
                <div className="mt-4 sm:mt-6 relative z-10">
                  <p
                    className="leading-relaxed text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-xl 2xl:text-3xl"
                    style={{
                      color: isDark ? "#A7A7A7" : "#5D5E63",
                    }}
                  >
                    I'm a happy easy-going guy who appreciates tasty food, good
                    music, cozy gaming, designing, brainstorming, and spending
                    quality time with my family, friends, and girlfriend. I
                    design & develop digital solutions with a passion for
                    creating experiences that are seamless and make a
                    difference.
                  </p>
                  <p
                    className="leading-relaxed text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-xl 2xl:text-3xl mt-4"
                    style={{
                      color: isDark ? "#A7A7A7" : "#5D5E63",
                    }}
                  >
                    I specialize in UX/UI design and frontend development using
                    tools like Figma and Cursor to get the job done. Whether you
                    call it low-code, vibe coding, or something else entirely, I
                    enjoy tackling the full journey from concept to finished
                    product.
                  </p>
                </div>
              </div>

              {/* About Me - Copy 2 - 50% width */}
              <div
                className="lg:col-span-4 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-2 relative group topography-bg"
                style={{
                  transform: `scale(${getBoxScale("about2")})`,
                  backgroundColor: isDark ? "#060608" : "#ffffff",
                  userSelect: "none",
                }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredBox("about2")}
                onMouseLeave={() => setHoveredBox(null)}
              >
                {/* Radial shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                      : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                  }}
                ></div>
                <div className="flex items-center justify-between -mt-2 relative z-10">
                  <h2 className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: isDark
                          ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                          : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                      }}
                    >
                      BACKGROUND
                    </span>
                  </h2>
                  <Image
                    src="/assets/icons/3dicons-notebook-dynamic-premium.png"
                    alt="About Me"
                    width={60}
                    height={60}
                    className="animate-pulse-subtle w-14 h-14 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20"
                  />
                </div>
                <div className="mt-4 sm:mt-6 relative z-10">
                  <p
                    className="leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg lg:text-sm 2xl:text-lg"
                    style={{
                      color: isDark ? "#A7A7A7" : "#5D5E63",
                    }}
                  >
                    I've designed across{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      multiple industries
                    </span>
                    , including health-tech, travel, retail, SaaS and AI.
                    Gaining{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      experience at startups, medium-sized businesses, and
                      larger enterprises.
                    </span>{" "}
                    Each one broadening my{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      experience of how design can work and be thought about
                      differently.
                    </span>{" "}
                    This mix has taught me how to adapt quickly, balance
                    creativity with structure, and design solutions that scale.
                  </p>
                  <p
                    className="leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg lg:text-sm 2xl:text-lg mt-4"
                    style={{
                      color: isDark ? "#A7A7A7" : "#5D5E63",
                    }}
                  >
                    My background spans UX/UI design, research, frontend
                    development, all the way to how to connect, understand and
                    support a customer or user on a micro level. Whether I'm
                    crafting dashboards, shaping brand experiences, or
                    experimenting with side projects, I always aim to create
                    digital products that are clear, accessible, and impactful.
                  </p>
                  <p
                    className="leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg lg:text-sm 2xl:text-lg mt-4"
                    style={{
                      color: isDark ? "#A7A7A7" : "#5D5E63",
                    }}
                  >
                    Most recently, I've spent{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      two years at Chas Academy in Stockholm, specializing in
                      UX/UI design and frontend development.
                    </span>{" "}
                    This gave me the space to dive deep into design thinking,
                    accessibility, research methodologies, conducting user
                    interviews, and design systems while also{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                      }}
                    >
                      building real-world projects from concept to launch.
                    </span>{" "}
                    It's where I combined creativity with learning the technical
                    know-how to get the job done.
                  </p>
                </div>
              </div>

              {/* Carousel Bento Box - Full width */}
              <div
                className="lg:col-span-8 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-1 relative group topography-bg w-full overflow-hidden"
                style={{
                  transform: `scale(${getBoxScale("carousel")})`,
                  backgroundColor: isDark ? "#060608" : "#ffffff",
                  userSelect: "none",
                }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredBox("carousel")}
                onMouseLeave={() => setHoveredBox(null)}
              >
                {/* Radial shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                      : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                  }}
                ></div>

                {/* Carousel centered within the bento box */}
                <div className="flex items-center justify-center h-full relative z-10 w-full">
                  <div
                    className="w-full scale-90 xs:scale-95 sm:scale-100 md:scale-95 relative overflow-hidden"
                    style={{ maxWidth: "100%" }}
                  >
                    <InfiniteScrollBanner className="w-full" />
                  </div>
                </div>
              </div>

              {/* Personal Identity - Full width section */}
              <div
                className="lg:col-span-8 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-2 relative group topography-bg"
                style={{
                  transform: `scale(${getBoxScale("identity")})`,
                  backgroundColor: isDark ? "#060608" : "#ffffff",
                  userSelect: "none",
                }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredBox("identity")}
                onMouseLeave={() => setHoveredBox(null)}
              >
                {/* Radial shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                      : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                  }}
                ></div>
                <div className="flex items-center justify-between -mt-2 relative z-10">
                  <h2 className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: isDark
                          ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                          : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                      }}
                    >
                      Identity
                    </span>
                  </h2>
                  <Image
                    src="/assets/icons/3dicons-puzzle-dynamic-premium.png"
                    alt="Identity"
                    width={60}
                    height={60}
                    className="animate-pulse-subtle w-14 h-14 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20"
                  />
                </div>
                <div className="mt-8 relative z-10">
                  <IdentityCarousel
                    isDark={isDark}
                    identity={[
                      {
                        title: "Home Cook",
                        description:
                          "I cook a lot and love experimenting with new recipes. Food is one of my creative outlets outside of design.",
                        emoji: "👨‍🍳",
                        image: HomeCookImage.src,
                      },
                      {
                        title: "Tech Explorer",
                        description:
                          "Always curious about new technologies and how they can improve user experiences.",
                        emoji: "🔬",
                        image: TechExplorerImage.src,
                      },
                      {
                        title: "AI Advocate",
                        description:
                          "I'm fascinated by AI and use it strategically to enhance my creative work. From code generation to ideation, AI helps me push the boundaries of what's possible.",
                        emoji: "🤖",
                        image: AiAdvocateImage.src,
                      },
                      {
                        title: "Design Thinker",
                        description:
                          "I approach problems with empathy and user-centered design principles. I find myself thinking about design a lot even in everyday scenarios.",
                        emoji: "💭",
                        image: DesignThinkerImage.src,
                      },
                      {
                        title: "Stockholm Local",
                        description:
                          "Living in one of the world's most design-forward cities inspires my work daily.",
                        emoji: "🏙️",
                        image: StockholmImage.src,
                      },
                      {
                        title: "Animal Lover",
                        description:
                          "I love animals - I have had both cats and dogs as pets.",
                        emoji: "🐶",
                        image: AnimalLoverImage.src,
                      },
                      {
                        title: "From Mellbystrand, Sweden",
                        description:
                          "Born in coastal Mellbystrand with its warm summers and quiet winters — shaped my appreciation for nature and serenity.",
                        emoji: "🌅",
                        image: MellbystrandImage.src,
                      },
                      {
                        title: "Night Owl",
                        description:
                          "I'm most productive and creative during the late hours when the world is quiet.",
                        emoji: "🦉",
                        image: NightOwlImage.src,
                      },
                      {
                        title: "Formula 1 Enthusiast",
                        description:
                          "Passionate about Formula 1 racing. My favorite team is Mercedes and driver is Lewis Hamilton. I love the engineering, strategy, and pure speed of the sport.",
                        emoji: "🏎️",
                        image: Formula1Image.src,
                      },
                      {
                        title: "Avid Gamer",
                        description:
                          "I love gaming and exploring virtual worlds. From strategy games to action RPGs, gaming fuels my creativity and problem-solving skills.",
                        emoji: "🎮",
                        image: AvidGamerImage.src,
                      },
                      {
                        title: "Music & Festivals",
                        description:
                          "I used to produce my own electronic music and DJ sets. Now I enjoy discovering new artists and experiencing live music at festivals.",
                        emoji: "🎵",
                        image: MusicFestivalsImage.src,
                      },
                      {
                        title: "INFJ-A",
                        description:
                          "According to MBTI tests - I'm a slightly introverted, intuitive, and feeling individual with an assertive nature and vivid imagination.",
                        emoji: "🧠",
                        image: InfjAImage.src,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto pr-4 pl-4 lg:pr-0 lg:pl-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
