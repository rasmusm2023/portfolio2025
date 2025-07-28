"use client";

import CaseStudy from "@/components/CaseStudy";

export default function FokusCaseStudy() {
  return (
    <CaseStudy
      title="Fokus"
      subtitle="Productivity app designed to help users stay focused and achieve their goals"
      description="Designed and developed a comprehensive productivity app that combines time management, goal tracking, and focus techniques. The app features a beautiful, distraction-free interface with gamification elements to keep users motivated."
      duration="5 months"
      teamSize="4 people"
      role="UX/UI Designer & Mobile Developer"
      challenge="Create a productivity app that actually helps users stay focused in an increasingly distracting digital world. The app needed to be engaging enough to compete with social media while providing genuine value for productivity."
      solution="Developed a minimalist design philosophy with focus on reducing cognitive load. Implemented smart notifications, progress tracking, and social accountability features. Used React Native for cross-platform development with native performance."
      results={[
        "65% increase in user productivity",
        "Average focus sessions increased by 40%",
        "4.9/5 user satisfaction rating",
        "100,000+ active users within 6 months",
      ]}
      technologies={[
        "React Native",
        "TypeScript",
        "Firebase",
        "Figma",
        "Redux",
        "Expo",
        "Push Notifications",
      ]}
      heroImage="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&crop=center"
      heroImageAlt="Fokus - Productivity App Interface"
      processImages={[
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      ]}
      processImageAlts={[
        "User research and behavioral analysis",
        "Mobile UX/UI design and prototyping",
        "Development and gamification implementation",
      ]}
      link="https://fokus-app.com"
      linkText="Download App"
    />
  );
}
