"use client";

import CaseStudy from "@/components/CaseStudy";

export default function EmplojdCaseStudy() {
  return (
    <CaseStudy
      title="Emplojd"
      subtitle="Comprehensive HR platform for modern workplace management and employee engagement"
      description="Designed and developed a comprehensive HR management platform that streamlines employee onboarding, performance tracking, and workplace communication. The platform features an intuitive dashboard for both HR professionals and employees."
      duration="8 months"
      teamSize="6 people"
      role="UX/UI Designer & Frontend Developer"
      challenge="Create an HR platform that serves both HR professionals and employees while maintaining simplicity and efficiency. The platform needed to handle complex workflows while providing a seamless user experience for all user types."
      solution="Developed a role-based design system with personalized dashboards for different user types. Implemented comprehensive onboarding flows, performance tracking tools, and communication features. Used React with TypeScript and modern state management."
      results={[
        "50% reduction in HR administrative tasks",
        "85% employee satisfaction score",
        "30% faster onboarding process",
        "500+ companies using the platform",
      ]}
      technologies={[
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Figma",
        "Redux",
        "AWS",
      ]}
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center"
      heroImageAlt="Emplojd - HR Platform Dashboard"
      processImages={[
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
      ]}
      processImageAlts={[
        "HR workflow research and user interviews",
        "Platform UX/UI design and prototyping",
        "Development and enterprise integration",
      ]}
      link="https://emplojd.com"
      linkText="View Live Platform"
    />
  );
}
