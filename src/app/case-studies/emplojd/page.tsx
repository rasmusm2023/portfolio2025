"use client";

import CaseStudy from "@/components/CaseStudy";
import CustomCursor from "@/components/CustomCursor";

export default function EmplojdCaseStudy() {
  return (
    <>
      <CustomCursor />
      <CaseStudy
        title="Emplojd"
        subtitle="Enhancing job applications without compromising authenticity."
        description="Designed and developed a comprehensive HR management platform that streamlines employee onboarding, performance tracking, and workplace communication. The platform features an intuitive dashboard for both HR professionals and employees, with advanced analytics and automation capabilities."
        duration="8 months"
        teamSize="6 people"
        role="UX/UI Designer & Frontend Developer"
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
          "01 Lead UX/UI Designer",
          "01 UX Designer",
          "04 Backend developers",
          "03 Frontend developers",
          "01 DevOps Engineer",
        ]}
        appIconPath="/logos/CaseStudies/Emplojd/Emplojd-App-Icon.svg"
        logotypeBlackPath="/logos/CaseStudies/Emplojd/Emplojd-Logotype-Black.svg"
        logotypeWhitePath="/logos/CaseStudies/Emplojd/Emplojd-Logotype-White.svg"
        aboutText={
          <div className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-6">
            <div>
              Emplojd was born out of the frustration many feel with repetitive
              and time-consuming job applications. Created during the{" "}
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
                      Chas Academy's annual, cross-program student project where
                      first-year students team up across disciplines over an
                      8‑week period (2024's theme: AI) to ideate and prototype
                      real solutions, then pitch them to industry professionals.
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
            </div>
          </div>
        }
        processSteps={[
          "Market Research",
          "Competitor Analysis",
          "Ideation Workshop",
          "Flowcharts",
          "Wireframes",
          "Moderated and Unmoderated User Testing",
          "Lo-fi Mockups",
          "Mini Design system",
          "First Hi-fi Mockups",
          "Expand Design System",
          "Finalize Hi-fi mockups",
          "Moderated and Unmoderated User Testing",
          "Interactive Prototype",
          "Moderated and Unmoderated User Testing",
          "Recognition as a Likely Winner of Chas Challenge",
        ]}
        businessObjectivesText={
          <div className="space-y-6">
            <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
              Emplojd was created during the Chas Challenge to simplify the job
              application process and encourage users to apply to more positions
              without added stress.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                }}
              >
                The goal was to reduce the time spent tailoring resumes and
                cover letters, while maintaining the personal touch valued by
                recruiters.
              </span>
            </p>
            <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
              This approach aims to increase the average number of applications
              submitted, improving job seekers' chances without compromising
              quality or individuality.
            </p>
            <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
              The potential gains include higher user engagement and a stronger
              foundation for growth in the competitive job market. This project
              demonstrates how combining thoughtful design with AI can make job
              hunting less daunting and more effective for both applicants and
              recruiters.
            </p>
          </div>
        }
      />
    </>
  );
}
