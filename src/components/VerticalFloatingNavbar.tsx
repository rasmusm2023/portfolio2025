"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const [delayedY, setDelayedY] = useState(0);
  const [activeGroup, setActiveGroup] = useState("discovery");
  const { onSectionClick } = useNavbar();

  useEffect(() => {
    setIsCaseStudyPage(pathname?.startsWith("/case-studies/") || false);
  }, [pathname]);

  // Set initial position to center of viewport
  useEffect(() => {
    if (!isCaseStudyPage) return;

    const setInitialPosition = () => {
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;
      setDelayedY(centerY);
    };

    setInitialPosition();
    window.addEventListener("resize", setInitialPosition);

    return () => {
      window.removeEventListener("resize", setInitialPosition);
    };
  }, [isCaseStudyPage]);

  // Follow scroll with delayed movement effect, update progress, and update active group
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
        const centerY = viewportHeight / 2;

        // Update scroll progress
        const docHeight =
          document.documentElement.scrollHeight - viewportHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        setScrollProgress(Math.min(scrollPercent, 100));

        // Add delayed movement effect - the navbar moves slightly slower than scroll
        // This creates the interesting "floating" effect
        setDelayedY(centerY + scrollY * 0.3);

        // Update active group based on scroll position
        const newActiveGroup = getActiveGroup();
        setActiveGroup(newActiveGroup);
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
    { id: "discovery", label: "Discovery" },
    { id: "research-strategy", label: "Research & Strategy" },
    { id: "design-craft", label: "Design & Craft" },
    { id: "process-workshop", label: "Process & Workshop" },
    { id: "outcomes", label: "Outcomes" },
  ];

  // Helper function to determine which group should be active based on scroll position
  const getActiveGroup = () => {
    if (!isCaseStudyPage) return "discovery";

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollCenter = scrollY + windowHeight / 2;

    // Get all section elements
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
    const roleEl = document.querySelector('[data-section="role"]');
    const insightsEl = document.querySelector('[data-section="insights"]');
    const resultsEl = document.querySelector('[data-section="results"]');

    if (!summaryEl || !aboutEl || !challengeEl || !craftEl || !insightsEl) {
      return "discovery";
    }

    const summaryTop = summaryEl.getBoundingClientRect().top + window.scrollY;
    const aboutTop = aboutEl.getBoundingClientRect().top + window.scrollY;
    const businessObjectiveTop =
      businessObjectiveEl?.getBoundingClientRect().top + window.scrollY || 0;
    const challengeTop =
      challengeEl.getBoundingClientRect().top + window.scrollY;
    const solutionTop =
      solutionEl?.getBoundingClientRect().top + window.scrollY || 0;
    const craftTop = craftEl.getBoundingClientRect().top + window.scrollY;
    const designExplorationsTop =
      designExplorationsEl?.getBoundingClientRect().top + window.scrollY || 0;
    const designSystemTop =
      designSystemEl?.getBoundingClientRect().top + window.scrollY || 0;
    const processTop = processEl?.getBoundingClientRect().top + window.scrollY;
    const roleTop = roleEl?.getBoundingClientRect().top + window.scrollY;
    const insightsTop = insightsEl.getBoundingClientRect().top + window.scrollY;
    const resultsTop =
      resultsEl?.getBoundingClientRect().top + window.scrollY || 0;

    // Calculate section boundaries
    const summaryBottom = summaryTop + (summaryEl as HTMLElement).offsetHeight;
    const aboutBottom = aboutTop + (aboutEl as HTMLElement).offsetHeight;
    const businessObjectiveBottom =
      businessObjectiveTop +
        (businessObjectiveEl as HTMLElement)?.offsetHeight || 0;
    const challengeBottom =
      challengeTop + (challengeEl as HTMLElement).offsetHeight;
    const solutionBottom =
      solutionTop + (solutionEl as HTMLElement)?.offsetHeight || 0;
    const craftBottom = craftTop + (craftEl as HTMLElement).offsetHeight;
    const designExplorationsBottom =
      designExplorationsTop +
        (designExplorationsEl as HTMLElement)?.offsetHeight || 0;
    const designSystemBottom =
      designSystemTop + (designSystemEl as HTMLElement)?.offsetHeight || 0;
    const processBottom = processTop + (processEl as HTMLElement).offsetHeight;
    const roleBottom = roleTop + (roleEl as HTMLElement).offsetHeight;
    const insightsBottom =
      insightsTop + (insightsEl as HTMLElement).offsetHeight;
    const resultsBottom =
      resultsTop + (resultsEl as HTMLElement)?.offsetHeight || 0;

    // Determine which section is currently in view
    if (scrollCenter < summaryBottom) {
      return "discovery";
    } else if (scrollCenter >= aboutTop && scrollCenter < aboutBottom) {
      return "discovery";
    } else if (
      scrollCenter >= businessObjectiveTop &&
      scrollCenter < businessObjectiveBottom
    ) {
      return "discovery";
    } else if (scrollCenter >= challengeTop && scrollCenter < challengeBottom) {
      return "research-strategy";
    } else if (scrollCenter >= solutionTop && scrollCenter < solutionBottom) {
      return "research-strategy";
    } else if (scrollCenter >= craftTop && scrollCenter < craftBottom) {
      return "design-craft";
    } else if (
      scrollCenter >= designExplorationsTop &&
      scrollCenter < designExplorationsBottom
    ) {
      return "design-craft";
    } else if (
      scrollCenter >= designSystemTop &&
      scrollCenter < designSystemBottom
    ) {
      return "design-craft";
    } else if (scrollCenter >= processTop && scrollCenter < processBottom) {
      return "process-workshop";
    } else if (scrollCenter >= roleTop && scrollCenter < roleBottom) {
      return "process-workshop";
    } else if (scrollCenter >= insightsTop && scrollCenter < insightsBottom) {
      return "outcomes";
    } else if (scrollCenter >= resultsTop && scrollCenter < resultsBottom) {
      return "outcomes";
    }

    return "discovery";
  };

  // Don't render if not on a case study page
  if (!isCaseStudyPage) {
    return null;
  }

  const handleSectionClick = (sectionId: string) => {
    // Update active section
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <div
      className="fixed left-8 z-[9999] flex flex-row items-center"
      style={{
        top: `${delayedY}px`,
        transform: "translateY(-50%)",
      }}
    >
      {/* Progress Bar - Vertical */}
      <div className="relative">
        <div
          className="w-1 bg-neutral-20 dark:bg-neutral-80 rounded-full overflow-hidden"
          style={{ height: "80vh" }}
        >
          <div
            className="w-full rounded-full transition-all duration-300 ease-out"
            style={{
              height: `${scrollProgress}%`,
              background:
                "linear-gradient(to bottom, #8B5CF6, #907EFF, #10B981)",
            }}
          />
        </div>
      </div>

      {/* Navigation Items - Vertical Stack */}
      <div className="flex flex-col gap-6 ml-8">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`font-bold text-2xl uppercase transition-all duration-200 relative text-left whitespace-nowrap ${
              activeGroup === section.id
                ? "text-purple-600 dark:text-purple-400"
                : "text-neutral-30 dark:text-neutral-70 hover:text-neutral-70 dark:hover:text-neutral-30"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerticalFloatingNavbar;
