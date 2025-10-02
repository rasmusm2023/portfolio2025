"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Lock, ArrowRight } from "@phosphor-icons/react";
import { gsap } from "gsap";

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
    category: "AI-Powered / App Design / UX / UI",
    description: "Enhancing job applications without compromising authenticity",
    subtitle: "— Cover Letter Generator AI SaaS Platform",
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

interface CaseStudiesShowcaseProps {
  showTitle?: boolean;
  excludeIds?: string[];
}

const CaseStudiesShowcase = ({
  showTitle = true,
  excludeIds = [],
}: CaseStudiesShowcaseProps) => {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const { isDark } = useTheme();
  const buttonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filter case studies to exclude specified IDs
  const filteredCaseStudies = caseStudies.filter(
    (caseStudy) => !excludeIds.includes(caseStudy.id)
  );

  const handleMouseEnter = (caseId: string) => {
    setHoveredCase(caseId);

    // GSAP morphing animation - responsive pill shape
    const button = buttonRefs.current[caseId];
    if (button) {
      // Get current button height to maintain aspect ratio
      const currentHeight = button.offsetHeight;
      const pillWidth = currentHeight * 1.4; // 1.4:1 aspect ratio for pill shape

      gsap.to(button, {
        width: pillWidth,
        borderRadius: currentHeight / 2, // Half of height for pill shape
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCase(null);

    // Reset all buttons to original state - responsive circle shape
    Object.values(buttonRefs.current).forEach((button) => {
      if (button) {
        const currentHeight = button.offsetHeight;

        gsap.to(button, {
          width: currentHeight, // Square shape (width = height)
          borderRadius: currentHeight / 2, // Perfect circle
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {showTitle && (
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
                  Projects
                </span>
              </h2>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {filteredCaseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="group relative transition-all duration-300 overflow-hidden cursor-pointer rounded-[3rem] case-study-card"
              onMouseEnter={() => handleMouseEnter(caseStudy.id)}
              onMouseLeave={handleMouseLeave}
              data-cursor-target="case-study"
            >
              {/* Large image with very rounded corners */}
              <div className="w-full aspect-square overflow-hidden rounded-[3rem] relative">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                {/* Coming Soon pill for specific case studies */}
                {(caseStudy.id === "zmartrest-ai" ||
                  caseStudy.id === "noted") && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    Coming Soon
                  </div>
                )}
                {/* Tags at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {caseStudy.id === "emplojd" && (
                    <>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        2024
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        Lead UX/UI Designer
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        School Project
                      </span>
                    </>
                  )}
                  {caseStudy.id === "noted" && (
                    <>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        2025
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        Designer & Developer
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        Solo Project
                      </span>
                    </>
                  )}
                  {caseStudy.id === "zmartrest-ai" && (
                    <>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        2025
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        Product Designer
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        Internship Project
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Content container below image */}
              <div className="py-4 sm:py-6 pb-8 sm:pb-10 md:pb-12">
                {/* Project title and arrow */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <h3 className="text-neutral-800 dark:text-neutral-200 text-base sm:text-lg md:text-xl font-semibold font-hanken">
                      {caseStudy.title}
                    </h3>
                    <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base font-medium">
                      {caseStudy.subtitle}
                    </span>
                  </div>
                  <div
                    ref={(el) => {
                      buttonRefs.current[caseStudy.id] = el;
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 flex items-center justify-center flex-shrink-0"
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

                {/* Tags */}
                <div className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">
                  {caseStudy.category}
                </div>
              </div>

              {/* Link overlay for all cases */}
              <Link
                href={caseStudy.isPlaceholder ? "#" : caseStudy.link}
                className="absolute inset-0 z-20"
                aria-label={`View ${caseStudy.title} case study`}
                data-cursor-target="case-study"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesShowcase;
