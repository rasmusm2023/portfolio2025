"use client";

import CaseStudy from "@/components/CaseStudy";
import CustomCursor from "@/components/CustomCursor";

export default function ZmartrestAICaseStudy() {
  return (
    <>
      <CustomCursor />
      <CaseStudy
        title="Zmartrest AI"
        subtitle="AI-powered platform for intelligent decision making and data analysis"
        description="Designed and developed an advanced AI platform that leverages machine learning to provide intelligent insights and automated decision-making capabilities. The platform features a sophisticated dashboard with real-time data visualization and predictive analytics."
        duration="6 months"
        teamSize="5 people"
        role="UX/UI Designer & Product Manager"
        challenge="Create an AI platform that makes complex machine learning algorithms accessible to non-technical users while providing powerful insights and automation capabilities. The interface needed to be intuitive yet powerful enough for advanced users."
        solution="Developed a user-centered design with progressive disclosure, allowing users to start simple and access advanced features as needed. Implemented a modular dashboard with customizable widgets, real-time data streams, and intuitive AI model management. Used React with TypeScript for robust frontend development."
        results={[
          "75% reduction in decision-making time",
          "90% user adoption rate",
          "3.2x increase in data processing efficiency",
          "Enterprise client acquisition within 3 months",
        ]}
        technologies={[
          "React",
          "TypeScript",
          "Python",
          "TensorFlow",
          "D3.js",
          "Figma",
          "AWS",
        ]}
        heroImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&crop=center"
        heroImageAlt="Zmartrest AI - Dashboard Interface"
        processImages={[
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
        ]}
        processImageAlts={[
          "AI model research and architecture design",
          "Dashboard UX/UI design and prototyping",
          "Development and AI integration",
        ]}
        link="https://zmartrest-ai.com"
        linkText="View Live Platform"
      />
    </>
  );
}
