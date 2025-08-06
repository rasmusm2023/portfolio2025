"use client";

import CaseStudy from "@/components/CaseStudy";
import CustomCursor from "@/components/CustomCursor";

export default function Portfolio2025CaseStudy() {
  return (
    <>
      <CustomCursor />
      <CaseStudy
        title="Portfolio Website 2025"
        subtitle="A modern, responsive portfolio showcasing design and development skills"
        description="Designed and developed a cutting-edge portfolio website that demonstrates modern web development practices, responsive design principles, and creative UI/UX solutions. This project showcases the full spectrum of my capabilities from concept to deployment."
        duration="2 months"
        teamSize="1 person"
        role="UX/UI Designer & Full-Stack Developer"
        challenge="Create a portfolio website that not only showcases my work but also demonstrates modern web development skills, responsive design, and creative problem-solving. The site needed to be fast, accessible, and visually striking while maintaining professional credibility."
        solution="Implemented a modern tech stack with Next.js 14, TypeScript, and Tailwind CSS. Created a unique design system with animated components, smooth transitions, and interactive elements. Used GSAP for animations and implemented performance optimizations for fast loading times."
        results={[
          "100% Lighthouse performance score",
          "Fully responsive across all devices",
          "Accessibility compliant (WCAG 2.1)",
          "Sub-2 second load times",
        ]}
        technologies={[
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "GSAP",
          "Framer Motion",
          "Vercel",
        ]}
        heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center"
        heroImageAlt="Portfolio Website 2025 - Modern Design Interface"
        processImages={[
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
        ]}
        processImageAlts={[
          "Wireframing and planning phase",
          "Design system development",
          "Final implementation and testing",
        ]}
        link="https://github.com/yourusername/portfolio-2025"
        linkText="View Source Code"
      />
    </>
  );
}
