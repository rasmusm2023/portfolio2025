"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Lock, ArrowRight } from "@phosphor-icons/react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
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
    category: "SAAS PLATFORM / AI-POWERED / MOBILE APP DESIGN / UX/UI DESIGN",
    description: "Enhancing job applications without compromising authenticity",
    image:
      "/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png",
    alt: "Emplojd SaaS Platform Case Study",
    link: "/case-studies/emplojd",
    isActive: true,
    isPasswordProtected: false,
    isPlaceholder: false,
  },
  {
    id: "noted",
    title: "Noted",
    category: "Mobile App / Design / UX",
    description: "Revolutionary note-taking experience",
    image: "/case-study-assets/noted/noted-preview.png",
    alt: "Noted App",
    link: "/case-studies/noted",
    isActive: false,
    isPasswordProtected: true,
    isPlaceholder: false,
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    category: "AI Platform / Web Design",
    description: "Intelligent restaurant management system",
    image: "/case-study-assets/zmartrest-ai/zmartrest-preview.png",
    alt: "Zmartrest AI Platform",
    link: "/case-studies/zmartrest-ai",
    isActive: false,
    isPasswordProtected: true,
    isPlaceholder: false,
  },
  {
    id: "coming-soon",
    title: "Coming Soon",
    category: "TBA / Design / Development",
    description: "Exciting new project in development",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=440&fit=crop&crop=center",
    alt: "Coming Soon Project",
    link: "#",
    isActive: false,
    isPasswordProtected: false,
    isPlaceholder: true,
  },
];

interface CaseStudiesShowcaseProps {
  showTitle?: boolean;
}

const CaseStudiesShowcase = ({
  showTitle = true,
}: CaseStudiesShowcaseProps) => {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const { isDark } = useTheme();

  const handleMouseEnter = (caseId: string) => {
    setHoveredCase(caseId);
  };

  const handleMouseLeave = () => {
    setHoveredCase(null);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {showTitle && (
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-60 dark:text-neutral-40">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="group relative bg-neutral-0 dark:bg-[#060608] transition-all duration-300 overflow-hidden cursor-pointer h-[600px] rounded-[3rem]"
              onMouseEnter={() => handleMouseEnter(caseStudy.id)}
              onMouseLeave={handleMouseLeave}
              data-cursor-target="case-study"
            >
              {/* Large image with very rounded corners */}
              <div className="w-full h-[440px] overflow-hidden rounded-[3rem]">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.alt}
                  width={400}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content container below image */}
              <div className="py-6 bg-neutral-0 dark:bg-[#060608]">
                {/* Project title and arrow */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-100 dark:text-neutral-0 text-xl font-bold font-hanken">
                    {caseStudy.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110 flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
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
                <div className="text-neutral-500 dark:text-neutral-400 text-xs font-medium mb-2 tracking-wide">
                  {caseStudy.category}
                </div>

                {/* Descriptive title */}
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>

              {/* Link overlay for all cases */}
              <Link
                href={caseStudy.isPlaceholder ? "#" : caseStudy.link}
                className="absolute inset-0 z-20"
                aria-label={`View ${caseStudy.title} case study`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesShowcase;
