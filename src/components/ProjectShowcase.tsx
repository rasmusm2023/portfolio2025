"use client";

import Image from "next/image";
import Link from "next/link";
import { colors } from "@/styles/colors";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Project {
  id: string;
  title: string;
  keywords: string[];
  image: string;
  alt: string;
  link: string;
  isGif?: boolean;
}

const projects: Project[] = [
  {
    id: "emplojd",
    title: "Enhancing job applications without compromising authenticity.",
    keywords: ["SaaS Platform", "AI-powered", "Web Design", "UX/UI Design"],
    image:
      "/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png",
    alt: "Emplojd HR Platform",
    link: "/case-studies/emplojd",
  },
];

interface ProjectShowcaseProps {
  showTitle?: boolean;
}

const ProjectShowcase = ({ showTitle = true }: ProjectShowcaseProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
  };

  const handleMouseEnter = (projectId: string) => {
    setIsHovering(true);
    setHoveredProject(projectId);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredProject(null);
  };

  return (
    <section id="previous-work" className="py-8 sm:py-12 md:py-16">
      <div className="w-full">
        {showTitle && (
          <div className="w-full mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
              <div className="relative w-fit">
                <button
                  onClick={() => {
                    const element = document.getElementById("case-studies");
                    if (element) {
                      const offset = 300; // Increased offset to show part of the hero section
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="text-left cursor-pointer"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold [background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken pb-2">
                    Selected works
                  </h2>
                  <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div id="case-studies" className="space-y-0 w-full">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className="group project-showcase-card block w-full h-60 sm:h-68 md:h-76 lg:h-48 bg-neutral-0 dark:bg-neutral-100 overflow-hidden relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Growing purple background from center */}
              <div className="absolute inset-0 bg-neutral-0 dark:bg-neutral-100" />
              <div
                className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ease-in-out scale-y-100 lg:scale-y-0 lg:group-hover:scale-y-100 origin-center"
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, #4C1D95, #6D28D9, #8B5CF6)"
                    : "linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.25), rgba(196, 181, 253, 0.3))",
                }}
              />
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between h-full py-8 sm:py-10 md:py-12 lg:py-4 xl:py-6 2xl:py-8 relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 gap-4 lg:gap-0">
                {/* Left side - Project info */}
                <div className="flex flex-col justify-center flex-1 pr-6 lg:pr-0">
                  <div className="text-xs sm:text-sm font-black text-neutral-100 dark:text-neutral-3 lg:text-neutral-60 lg:dark:text-neutral-40 lg:group-hover:text-neutral-100 lg:dark:group-hover:text-neutral-3 tracking-wider mb-1 transition-colors duration-500 ease-in-out">
                    {project.id.toUpperCase()}
                  </div>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-500 ease-in-out font-hanken"
                    style={{
                      color: isDark
                        ? hoveredProject === project.id
                          ? "#FFD700"
                          : "rgb(255, 255, 255)"
                        : hoveredProject === project.id
                        ? "#8B5CF6"
                        : "#000000",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-1 sm:gap-2 mt-2 sm:mt-3">
                    {project.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm sm:text-base md:text-lg text-neutral-100 dark:text-neutral-20 lg:text-neutral-70 lg:dark:text-neutral-60 lg:group-hover:text-neutral-100 lg:dark:group-hover:text-neutral-20 font-medium transition-colors duration-500 ease-in-out">
                          {keyword}
                        </span>
                        {index < project.keywords.length - 1 && (
                          <span className="hidden lg:block text-neutral-50 dark:text-neutral-40 group-hover:text-neutral-100 dark:group-hover:text-neutral-20 mx-1 sm:mx-2 transition-colors duration-500 ease-in-out">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom right - Project image positioned in bottom right corner */}
                <div className="absolute bottom-4 right-4 lg:relative lg:bottom-auto lg:right-auto h-24 w-28 sm:h-28 sm:w-36 md:h-32 md:w-40 lg:h-40 lg:w-64 overflow-hidden bg-neutral-20 dark:bg-neutral-80 rounded-lg sm:rounded-xl lg:rounded-2xl lg:self-center">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={256}
                    height={160}
                    className="w-full h-full object-cover"
                  />

                  {/* GIF indicator */}
                  {project.isGif && (
                    <div className="absolute top-2 right-2 bg-[#8B5CF6] text-neutral-0 dark:text-neutral-100 text-xs font-bold px-1.5 py-0.5 rounded">
                      GIF
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Cursor-following image gallery */}
        <div
          className={`absolute pointer-events-none z-50 transition-all duration-150 ease-out hidden lg:block ${
            isHovering && hoveredProject
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            left: mousePosition.x - 320, // Center horizontally (640px total width / 2)
            top: mousePosition.y + 80, // Position below cursor with doubled offset
          }}
        >
          <div className="flex flex-row gap-4 lg:gap-8 bg-neutral-10/20 dark:bg-white/20 backdrop-blur-sm px-4 lg:px-6 py-3 lg:py-4 shadow-lg border-2 border-[#8B5CF6]/30">
            <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg overflow-hidden bg-neutral-20 dark:bg-neutral-80">
              <Image
                src={
                  hoveredProject === "emplojd"
                    ? "/case-study-assets/emplojd/EMPLOJD-Preview-1.svg"
                    : "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop&crop=center"
                }
                alt={
                  hoveredProject === "emplojd"
                    ? "Emplojd Preview 1"
                    : "Gallery image 1"
                }
                width={200}
                height={200}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              />
            </div>
            <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg overflow-hidden bg-neutral-20 dark:bg-neutral-80">
              <Image
                src={
                  hoveredProject === "emplojd"
                    ? "/case-study-assets/emplojd/EMPLOJD-Preview-2.svg"
                    : "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&crop=center"
                }
                alt={
                  hoveredProject === "emplojd"
                    ? "Emplojd Preview 2"
                    : "Gallery image 2"
                }
                width={200}
                height={200}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              />
            </div>
            <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg overflow-hidden bg-neutral-20 dark:bg-neutral-80">
              <Image
                src={
                  hoveredProject === "emplojd"
                    ? "/case-study-assets/emplojd/EMPLOJD-Preview-3.svg"
                    : "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop&crop=center"
                }
                alt={
                  hoveredProject === "emplojd"
                    ? "Emplojd Preview 3"
                    : "Gallery image 3"
                }
                width={200}
                height={200}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
