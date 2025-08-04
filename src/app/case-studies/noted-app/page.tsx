"use client";

import CaseStudy from "@/components/CaseStudy";

export default function NotedAppCaseStudy() {
  return (
    <CaseStudy
      title="Noted App"
      subtitle="A modern note-taking application for enhanced productivity"
      description="Designed and developed a modern note-taking application that prioritizes user experience and productivity. The app features a clean, minimalist interface with powerful organizational tools and seamless synchronization across devices."
      duration="4 months"
      teamSize="3 people"
      role="UX/UI Designer & Frontend Developer"
      challenge="Create a note-taking app that stands out in a crowded market while providing an intuitive and efficient user experience. The app needed to handle complex organizational needs while maintaining simplicity and speed."
      solution="Developed a user-centered design approach with extensive research and testing. Implemented a clean, card-based interface with smart categorization, search functionality, and real-time collaboration features. Used React Native for cross-platform compatibility."
      results={[
        "40% increase in user engagement",
        "Reduced onboarding time by 60%",
        "4.8/5 user satisfaction rating",
        "50,000+ downloads in first month",
      ]}
      technologies={[
        "React Native",
        "TypeScript",
        "Figma",
        "Firebase",
        "Redux",
        "Expo",
      ]}
      heroImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&crop=center"
      heroImageAlt="Noted App"
      processImages={[
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      ]}
      processImageAlts={[
        "User research and wireframing",
        "UI/UX design and prototyping",
        "Development and testing phase",
      ]}
      link="https://noted-app.com"
      linkText="View Live App"
    />
  );
}
