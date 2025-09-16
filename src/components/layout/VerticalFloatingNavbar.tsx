"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useNavbar } from "@/contexts/NavbarContext";

interface Section {
  id: string;
  label: string;
}

// TODO: FIX REQUIRED - This component has several issues that need to be resolved:
// 1. Progress bar not updating on scroll
// 2. Component movement constrained/not following full page scroll
// 3. Active menu highlighting not working properly
// 4. TypeScript linter errors in getActiveGroup function
const VerticalFloatingNavbar = () => {
  const pathname = usePathname();
  const [isCaseStudyPage, setIsCaseStudyPage] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGroup, setActiveGroup] = useState("overview");
  const [isVisible, setIsVisible] = useState(true);
  const { onSectionClick } = useNavbar();
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsCaseStudyPage(pathname?.startsWith("/case-studies/") || false);
  }, [pathname]);

  // State for portal mounting
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Update scroll progress and active group on scroll
  useEffect(() => {
    if (!isCaseStudyPage) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress for the progress bar
        // Navbar position is now fixed and doesn't change

        // Update scroll progress
        const docHeight =
          document.documentElement.scrollHeight - viewportHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        const clampedProgress = Math.min(scrollPercent, 100);

        setScrollProgress(clampedProgress);

        // Update active group based on scroll position
        const newActiveGroup = getActiveGroup();
        setActiveGroup(newActiveGroup);

        // Check if we should hide the navbar (past the Results section)
        const resultsSection = document.querySelector(
          '[data-section="results"]'
        );
        if (resultsSection) {
          const resultsBottom =
            resultsSection.getBoundingClientRect().bottom + window.scrollY;
          const shouldHide = scrollY > resultsBottom - window.innerHeight;
          setIsVisible(!shouldHide);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCaseStudyPage]);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "design", label: "Design" },
    { id: "approach", label: "Approach" },
    { id: "insights", label: "Insights" },
    { id: "outcomes", label: "Outcomes" },
  ];

  // Helper function to determine which group should be active based on scroll position
  const getActiveGroup = () => {
    if (!isCaseStudyPage) return "overview";

    // Get all section elements directly
    const summaryEl = document.querySelector('[data-section="summary"]');
    const aboutEl = document.querySelector('[data-section="about"]');
    const businessObjectiveEl = document.querySelector(
      '[data-section="business-objective"]'
    );
    const challengeEl = document.querySelector('[data-section="challenge"]');
    const solutionEl = document.querySelector('[data-section="solution"]');
    const craftEl = document.querySelector('[data-section="craft"]');
    const designExplorationsEl = document.querySelector(
      '[data-section="design-explorations"]'
    );
    const designSystemEl = document.querySelector(
      '[data-section="design-system"]'
    );
    const processEl = document.querySelector('[data-section="process"]');
    const workshopEl = document.querySelector('[data-section="workshop"]');
    const insightsEl = document.querySelector('[data-section="insights"]');
    const challengesLearningsEl = document.querySelector(
      '[data-section="challenges-learnings"]'
    );
    const resultsEl = document.querySelector('[data-section="results"]');

    if (!summaryEl || !aboutEl || !challengeEl || !craftEl || !insightsEl) {
      return "overview";
    }

    // Check which section is currently visible in the viewport
    const sections = [
      { element: summaryEl, group: "overview" },
      { element: aboutEl, group: "context" },
      { element: businessObjectiveEl, group: "context" },
      { element: challengeEl, group: "context" },
      { element: solutionEl, group: "context" },
      { element: craftEl, group: "design" },
      { element: designExplorationsEl, group: "design" },
      { element: designSystemEl, group: "design" },
      { element: processEl, group: "approach" },
      { element: workshopEl, group: "approach" },
      { element: insightsEl, group: "insights" },
      { element: challengesLearningsEl, group: "insights" },
      { element: resultsEl, group: "outcomes" },
    ].filter((section) => section.element);

    // Find the most recent section that is visible
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (!section.element) continue;

      const element = section.element as HTMLElement;
      const rect = element.getBoundingClientRect();

      // Check if the section is visible in the viewport
      // Visible means: top is above viewport bottom AND bottom is below viewport top
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return section.group;
      }
    }

    // Fallback: if no sections are visible, return overview
    return "overview";
  };

  // Don't render if not on a case study page or not mounted
  if (!isCaseStudyPage || !mounted) {
    return null;
  }

  const handleSectionClick = (sectionId: string) => {
    // Immediately set the active group for immediate visual feedback
    setActiveGroup(sectionId);

    // Update active section
    if (onSectionClick) {
      onSectionClick(sectionId);
    }

    // Scroll to the appropriate section based on the navigation group
    let targetSection: string | null = null;

    switch (sectionId) {
      case "overview":
        // Scroll to top for overview
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      case "context":
        targetSection = "about";
        break;
      case "design":
        targetSection = "craft";
        break;
      case "approach":
        targetSection = "process";
        break;
      case "insights":
        targetSection = "insights";
        break;
      case "outcomes":
        targetSection = "results";
        break;
      default:
        targetSection = "summary";
    }

    // Find and scroll to the target section
    if (targetSection) {
      const targetElement = document.querySelector(
        `[data-section="${targetSection}"]`
      );
      if (targetElement) {
        // Get the target position
        const targetRect = targetElement.getBoundingClientRect();
        const targetTop = targetRect.top + window.scrollY;

        // Consistent offset for all sections to ensure proper activation
        const offset = 100; // Increased offset to ensure the section is properly visible

        // Smooth scroll to the target position
        window.scrollTo({
          top: targetTop - offset,
          behavior: "smooth",
        });
      }
    }
  };

  return createPortal(
    <div
      ref={navbarRef}
      className="hidden 2xl:flex fixed top-1/2 z-[1000] items-center w-18 transition-opacity duration-500"
      style={{
        transform: "translateY(-50%)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Progress Bar - Vertical */}
      <div className="relative">
        <div
          className="w-2 overflow-hidden"
          style={{
            height: "calc(100vh - 192px)", // Full viewport height minus header (96px)
            background:
              "linear-gradient(to bottom, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0))",
          }}
        >
          <div
            className="w-full transition-all duration-300 ease-out absolute top-0"
            style={{
              height: `${scrollProgress}%`,
              background:
                "linear-gradient(to bottom, #3B82F6, #8B5CF6, #A855F7)",
            }}
          />
        </div>
      </div>

      {/* Navigation Items - Vertical Stack */}
      <div className="flex flex-col gap-8 ml-8">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`font-bold text-2xl capitalize transition-all duration-200 relative text-left whitespace-nowrap ${
              activeGroup === section.id
                ? "text-purple-600 dark:text-purple-400"
                : "text-neutral-30 dark:text-neutral-70 hover:text-neutral-70 dark:hover:text-neutral-30"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default VerticalFloatingNavbar;
