"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/contexts/NavbarContext";

interface Section {
  id: string;
  label: string;
}

const FloatingNavbar = () => {
  const pathname = usePathname();
  const [isCaseStudyPage, setIsCaseStudyPage] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { activeSection, onSectionClick } = useNavbar();

  useEffect(() => {
    setIsCaseStudyPage(pathname?.startsWith("/case-studies/") || false);
  }, [pathname]);

  // Calculate scroll progress
  useEffect(() => {
    if (!isCaseStudyPage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCaseStudyPage]);

  const sections = [
    { id: "discovery", label: "Discovery" },
    { id: "research-strategy", label: "Research & Strategy" },
    { id: "design-craft", label: "Design" },
    { id: "process-workshop", label: "Process & Workshop" },
    { id: "outcomes", label: "Outcomes" },
  ];

  // Don't render if not on a case study page OR if we're on a case study page (to hide it)
  if (!isCaseStudyPage || isCaseStudyPage) {
    return null;
  }
  const handleSectionClick = (sectionId: string) => {
    // Update active section
    if (onSectionClick) {
      onSectionClick(sectionId);
    }

    // For grouped sections, we need to find the first section in the group
    // and scroll to it. The CaseStudy component will handle the actual scrolling.
    // We just need to trigger the navigation through the context.
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-fit px-6"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      {/* Progress Bar - Positioned behind menu items */}
      <div className="relative">
        <div className="w-full h-12 bg-neutral-20 dark:bg-neutral-80 rounded-3xl overflow-hidden absolute bottom-0 left-0 right-0 z-0">
          <div
            className="h-full rounded-3xl transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress}%`,
              background:
                "linear-gradient(to right, #8B5CF6, #907EFF, #10B981)",
            }}
          />
        </div>

        {/* Menu Items - Positioned on top */}
        <div className="relative z-10 flex items-center gap-0 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border-l border-r border-b border-neutral-100/10 dark:border-neutral-90/10 rounded-lg shadow-lg overflow-hidden">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-bold text-xs uppercase transition-all duration-200 relative ${
                activeSection === section.id
                  ? "text-white bg-gradient-to-r from-purple-500 to-purple-700"
                  : "text-neutral-70 dark:text-neutral-30 bg-neutral-20 dark:bg-neutral-80 hover:text-neutral-90 dark:hover:text-neutral-10 hover:bg-transparent dark:hover:bg-transparent"
              } ${index === 0 ? "rounded-l-lg" : ""} ${
                index === sections.length - 1 ? "rounded-r-lg" : ""
              } ${index !== 0 && index !== sections.length - 1 ? "" : ""}`}
            >
              {section.label}
              {/* Active pill shadow effect */}
              {activeSection === section.id && (
                <div
                  className={`absolute inset-0 -z-10 ${
                    index === 0 ? "rounded-l-lg" : ""
                  } ${index === sections.length - 1 ? "rounded-r-lg" : ""}`}
                  style={{
                    boxShadow: `0 0 12px rgba(147, 51, 234, 0.4)`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingNavbar;
