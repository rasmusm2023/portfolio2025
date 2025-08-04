"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  teamSize: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  heroImage: string;
  heroImageAlt: string;
  processImages: string[];
  processImageAlts: string[];
  link: string;
  linkText: string;
}

const CaseStudy = ({
  title,
  subtitle,
  description,
  duration,
  teamSize,
  role,
  challenge,
  solution,
  results,
  technologies,
  heroImage,
  heroImageAlt,
  processImages,
  processImageAlts,
  link,
  linkText,
}: CaseStudyProps) => {
  const router = useRouter();

  const handleCaseStudiesClick = () => {
    // Navigate to home page first
    router.push("/");

    // Set a flag in sessionStorage to trigger scroll after navigation
    sessionStorage.setItem("scrollToCaseStudies", "true");
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100">
      {/* Header Section with 40/60 Layout */}
      <section className="pt-32 pb-16">
        <div className="flex items-start">
          {/* Left Container - 40% width */}
          <div className="w-[40%] px-12">
            <div className="flex items-start gap-0">
              {/* Back Arrow + Case Studies Rectangle */}
              <button
                onClick={handleCaseStudiesClick}
                className="flex items-center gap-3 px-4 py-3 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-l-lg hover:bg-neutral-20 dark:hover:bg-neutral-80 transition-all duration-200 group h-full"
              >
                <ArrowLeft
                  size={16}
                  className="text-neutral-100 dark:text-neutral-0 group-hover:text-neutral-70 dark:group-hover:text-neutral-30 transition-colors"
                />
                <span className="text-neutral-100 dark:text-neutral-0 uppercase group-hover:text-neutral-70 dark:group-hover:text-neutral-30 font-bold text-sm transition-colors">
                  Case studies
                </span>
              </button>

              {/* Project Name Rectangle */}
              <div className="px-4 py-3 bg-neutral-90 dark:bg-neutral-0 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 border-l-0 rounded-r-lg flex items-center h-full relative">
                <span className="text-neutral-0 dark:text-neutral-100 font-bold text-sm uppercase relative z-10">
                  {title.split(" ").slice(0, 3).join(" ")}
                </span>
                {/* Active pill shadow effect */}
                <div
                  className="absolute inset-0 rounded-r-lg -z-10"
                  style={{
                    boxShadow: `0 0 12px ${
                      typeof document !== "undefined" &&
                      document.documentElement.classList.contains("dark")
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(0, 0, 0, 0.4)"
                    }`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Container - 60% width */}
          <div className="w-[60%]">
            <h1
              className={`text-2xl md:text-2xl font-bold text-neutral-100 dark:text-neutral-0 leading-tight ${hanken.className}`}
            >
              {subtitle}
            </h1>
            <div className="w-full h-[800px] bg-neutral-20 dark:bg-neutral-80 mt-4 relative">
              {/* Glass-styled technology pills */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
