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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-bold [background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken pb-2">
                    Selected works
                  </h2>
                  <div className="absolute -bottom-4 left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
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
              className="group project-showcase-card block w-full h-32 sm:h-40 md:h-48 bg-neutral-0 dark:bg-neutral-100 overflow-hidden relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Growing purple background from center */}
              <div className="absolute inset-0 bg-neutral-0 dark:bg-neutral-100" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out scale-y-0 group-hover:scale-y-100 origin-center"
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, #4C1D95, #6D28D9, #8B5CF6)"
                    : "linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.25), rgba(196, 181, 253, 0.3))",
                }}
              />
              <div className="flex items-center justify-between h-full py-4 sm:py-6 md:py-8 relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
                {/* Left side - Project info */}
                <div className="flex flex-col justify-center">
                  <div className="text-xs sm:text-sm font-black text-neutral-60 dark:text-neutral-40 group-hover:text-neutral-100 dark:group-hover:text-neutral-3 tracking-wider mb-1 transition-colors duration-500 ease-in-out">
                    {project.id.toUpperCase()}
                  </div>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-100 dark:text-neutral-0 transition-colors duration-500 ease-in-out font-hanken"
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
                  <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                    {project.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm sm:text-base md:text-lg text-neutral-70 dark:text-neutral-60 group-hover:text-neutral-100 dark:group-hover:text-neutral-20 font-medium transition-colors duration-500 ease-in-out">
                          {keyword}
                        </span>
                        {index < project.keywords.length - 1 && (
                          <span className="text-neutral-50 dark:text-neutral-40 group-hover:text-neutral-100 dark:group-hover:text-neutral-20 mx-1 sm:mx-2 transition-colors duration-500 ease-in-out">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Project image */}
                <div className="relative h-24 w-32 sm:h-32 sm:w-48 md:h-40 md:w-64 overflow-hidden bg-neutral-20 dark:bg-neutral-80 rounded-xl sm:rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={256}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-neutral-100/10 dark:bg-neutral-100/10 group-hover:bg-neutral-100/20 dark:group-hover:bg-neutral-100/20 transition-colors duration-500 ease-in-out" />
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
                  hoveredProject === "zmartrest"
                    ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop&crop=center"
                    : "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop&crop=center"
                }
                alt="Gallery image 1"
                width={200}
                height={200}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              />
            </div>
            <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg overflow-hidden bg-neutral-20 dark:bg-neutral-80">
              <Image
                src={
                  hoveredProject === "zmartrest"
                    ? "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=200&h=200&fit=crop&crop=center"
                    : "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&crop=center"
                }
                alt="Gallery image 2"
                width={200}
                height={200}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              />
            </div>
            <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg overflow-hidden bg-neutral-20 dark:bg-neutral-80">
              <Image
                src={
                  hoveredProject === "zmartrest"
                    ? "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200&h=200&fit=crop&crop=center"
                    : "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop&crop=center"
                }
                alt="Gallery image 3"
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
