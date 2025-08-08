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
      />
    </>
  );
}
