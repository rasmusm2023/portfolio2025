"use client";

import { useState, useEffect } from "react";
import CaseStudy from "@/components/case-studies/CaseStudy";
import CaseStudySkeleton from "@/components/case-studies/CaseStudySkeleton";
import CustomCursor from "@/components/CustomCursor";
import VerticalFloatingNavbar from "@/components/layout/VerticalFloatingNavbar";
import VerticalFloatingNavbarSkeleton from "@/components/layout/VerticalFloatingNavbarSkeleton";
import { useTheme } from "@/contexts/ThemeContext";

export default function Emplojd2CaseStudy() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Update page title
  useEffect(() => {
    document.title = "Emplojd 2 — Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Hide skeleton after loading completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      {isLoading ? (
        <>
          <VerticalFloatingNavbarSkeleton loadingProgress={loadingProgress} />
          <CaseStudySkeleton loadingProgress={loadingProgress} />
        </>
      ) : (
        <>
          <VerticalFloatingNavbar />
          <CaseStudy
            title="EMPLOJD 2"
            subtitle="Enhancing job applications without compromising authenticity."
            description={
              <div className="text-neutral-80 dark:text-neutral-20 text-lg sm:text-xl md:text-2xl leading-[150%] space-y-6">
                <p>
                  Emplojd is an AI-powered web app that helps job seekers
                  discover relevant roles and create personalized cover letters
                  that reflect their individual voice. My responsibility was to
                  shape the end-to-end user experience - from research and
                  strategy to UI design, prototyping, and close collaboration
                  with development.
                </p>
                <p>
                  Emplojd was born out of the frustration many feel with
                  repetitive and time-consuming job applications. Created during
                  the{" "}
                  <span className="relative inline-block group">
                    <a
                      href="https://chasacademy.se/article/chas-challenge-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Chas Challenge
                    </a>
                    {/* Custom cursor tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-96">
                      <div className="bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 px-6 py-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 text-sm leading-relaxed">
                        <div className="mb-3">
                          Chas Academy's annual, cross-program student project
                          where first-year students team up across disciplines
                          over an 8‑week period (2024's theme: AI) to ideate and
                          prototype real solutions, then pitch them to industry
                          professionals.
                        </div>
                        <div className="text-xs text-neutral-60 dark:text-neutral-40 font-medium border-t border-neutral-200 dark:border-neutral-700 pt-3">
                          Click to read more
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-100 dark:border-t-neutral-0"></div>
                      </div>
                    </div>
                  </span>
                  , this AI-powered platform was our teams way of exploring how
                  design and tech could simplify the process.
                </p>
                <p>
                  I led the UX/UI work to make sure the experience felt
                  personal, efficient, and genuinely helpful for job seekers.
                </p>

                {/* Logo Box */}
                <div className="w-full h-24 sm:h-32 mt-4 sm:mt-6 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg flex items-center px-4 sm:px-6">
                  <img
                    src="/assets/logos/CaseStudies/Emplojd/Emplojd-App-Icon.svg"
                    alt="App Icon"
                    className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                  />
                  <div className="flex-1 flex justify-center">
                    <img
                      src="/assets/logos/CaseStudies/Emplojd/Emplojd-Logotype-Black.svg"
                      alt="Logotype"
                      className="h-12 sm:h-16 object-contain dark:hidden"
                    />
                    <img
                      src="/assets/logos/CaseStudies/Emplojd/Emplojd-Logotype-White.svg"
                      alt="Logotype"
                      className="h-12 sm:h-16 object-contain hidden dark:block"
                    />
                  </div>
                </div>
              </div>
            }
            duration="8 months"
            teamSize="6 people"
            role="UX/UI Designer"
            challenge="Create an HR platform that serves both HR professionals and employees while maintaining simplicity and efficiency. The platform needed to handle complex workflows while providing a seamless user experience for all user types, with particular focus on reducing administrative burden and improving employee engagement."
            solution="Developed a role-based design system with personalized dashboards for different user types. Implemented comprehensive onboarding flows, performance tracking tools, and communication features. Used React with TypeScript and modern state management, with a focus on accessibility and mobile-first design principles."
            results={[
              "50% reduction in HR administrative tasks",
              "85% employee satisfaction score",
              "30% faster onboarding process",
              "500+ companies using the platform",
            ]}
            technologies={[
              "UX Research",
              "UI Design",
              "Figma",
              "Prototyping",
              "Wireframing",
              "Design System",
              "Workshops",
              "Dev Handoff",
              "Documentation",
              "React",
              "TailwindCSS",
              "API Integration",
              "Mobile Web App",
              "AI Product",
              "Logo Design",
            ]}
            heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center"
            heroImageAlt="Emplojd - HR Platform Dashboard"
            processImages={[
              "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
            ]}
            processImageAlts={[
              "HR workflow research and user interviews",
              "Platform UX/UI design and prototyping",
              "Development and enterprise integration",
              "Final platform dashboard and features",
            ]}
            link="https://emplojd.com"
            linkText="View Live Platform"
            companyOrType="Type"
            companyText="School project"
            roleText="Lead UX/UI Designer: worked on strategy, research, facilitating workshops, prototyping, dev collaboration and delivery."
            teamRoles={[
              "01 Lead UX/UI Designer (me)",
              "01 UX Designer",
              "07 Developers (backend, frontend, devops)",
            ]}
            appIconPath="/assets/logos/CaseStudies/Emplojd/Emplojd-App-Icon.svg"
            logotypeBlackPath="/assets/logos/CaseStudies/Emplojd/Emplojd-Logotype-Black.svg"
            logotypeWhitePath="/assets/logos/CaseStudies/Emplojd/Emplojd-Logotype-White.svg"
            sections={[
              {
                id: "discovery",
                label: "Discovery",
                sections: ["summary", "problem"],
              },
              {
                id: "research-strategy",
                label: "Research & Strategy",
                sections: ["goals-and-constraints", "solution"],
              },
              {
                id: "design",
                label: "Design",
                sections: ["craft", "design-explorations", "design-system"],
              },
              {
                id: "approach",
                label: "Approach",
                sections: ["process", "insights"],
              },
              {
                id: "outcomes",
                label: "Outcomes",
                sections: ["insights", "results"],
              },
            ]}
            processSteps={[
              "Market Research",
              "Competitor Analysis",
              "Kickoff Workshop",
              "Flowcharts",
              "Wireframes",
              "Moderated and Unmoderated User Testing",
              "Lo-fi Mockups",
              "Mini Design system",
              "First Mockups",
              "Expand Design System",
              "Finalize Mockups",
              "Moderated and Unmoderated User Testing",
              "Interactive Prototype",
              "Moderated and Unmoderated User Testing",
              "Recognition as a Likely Winner of Chas Challenge",
            ]}
            problemText={
              <div className="space-y-4 sm:space-y-6">
                <p className="text-neutral-80 dark:text-neutral-20 text-lg sm:text-xl md:text-2xl leading-[150%]">
                  Job seekers often spend hours tailoring each application,
                  leading to frustration, fewer submissions, and generic,
                  uninspired results. Recruiters, on the other hand, struggle
                  with AI-generated applications that feel robotic or
                  repetitive.
                </p>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg sm:text-xl md:text-2xl leading-[150%]">
                  The challenge was to design a solution that reduces effort
                  without removing authenticity, making job applications faster,
                  more motivating, and more personal.
                </p>
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-instrument-serif font-semibold leading-[150%] mt-6 sm:mt-8 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                      : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                  }}
                >
                  Job seekers struggled to navigate an overwhelming and
                  time-consuming search process without clear guidance or
                  tailored opportunities.
                </p>
              </div>
            }
            excludeIds={["emplojd", "emplojd-2"]}
          />
        </>
      )}
    </>
  );
}
