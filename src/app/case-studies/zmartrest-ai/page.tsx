"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CaseStudy from "@/components/case-studies/CaseStudy";
import CaseStudySkeleton from "@/components/case-studies/CaseStudySkeleton";
import { useCaseStudy } from "@/contexts/CaseStudyContext";

// Password protection component
const PasswordProtection = ({
  onPasswordCorrect,
}: {
  onPasswordCorrect: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate password check (replace with actual password)
    if (password === "zmartrest2025") {
      onPasswordCorrect();
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
            Zmartrest AI Case Study
          </h1>
          <p className="text-xl md:text-2xl text-neutral-60 dark:text-neutral-40">
            Enter the password to access this case study
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-neutral-80 dark:text-neutral-20 mb-4"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-neutral-20 dark:border-neutral-80 rounded-xl bg-neutral-0 dark:bg-[#060608] text-neutral-100 dark:text-neutral-0 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-lg text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold text-lg py-5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isLoading ? "Checking..." : "Access Case Study"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-lg text-neutral-60 dark:text-neutral-40 hover:text-neutral-80 dark:hover:text-neutral-20 transition-colors duration-200"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ZmartrestAICaseStudy() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsCaseStudyPage } = useCaseStudy();
  const router = useRouter();

  useEffect(() => {
    // Set case study context
    setIsCaseStudyPage(true);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setIsCaseStudyPage(false);
    };
  }, [setIsCaseStudyPage]);

  const handlePasswordCorrect = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <CaseStudySkeleton loadingProgress={100} />;
  }

  if (!isAuthenticated) {
    return <PasswordProtection onPasswordCorrect={handlePasswordCorrect} />;
  }

  // Zmartrest AI case study data
  const zmartrestCaseStudyData = {
    title: "Zmartrest AI",
    subtitle:
      "AI-powered platform for intelligent decision making and data analysis",
    description:
      "Designed and developed an advanced AI platform that leverages machine learning to provide intelligent insights and automated decision-making capabilities. The platform features a sophisticated dashboard with real-time data visualization and predictive analytics.",
    duration: "6 months",
    teamSize: "5 people",
    role: "UX/UI Designer & Product Manager",
    challenge:
      "Create an AI platform that makes complex machine learning algorithms accessible to non-technical users while providing powerful insights and automation capabilities. The interface needed to be intuitive yet powerful enough for advanced users.",
    solution:
      "Developed a user-centered design with progressive disclosure, allowing users to start simple and access advanced features as needed. Implemented a modular dashboard with customizable widgets, real-time data streams, and intuitive AI model management. Used React with TypeScript for robust frontend development.",
    results: [
      "75% reduction in decision-making time",
      "90% user adoption rate",
      "3.2x increase in data processing efficiency",
      "Enterprise client acquisition within 3 months",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "TensorFlow",
      "D3.js",
      "Figma",
      "AWS",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&crop=center",
    heroImageAlt: "Zmartrest AI - Dashboard Interface",
    processImages: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    ],
    processImageAlts: [
      "AI model research and architecture design",
      "Dashboard UX/UI design and prototyping",
      "Development and AI integration",
    ],
    link: "https://zmartrest-ai.com",
    linkText: "View Live Platform",
    buttonText: "Live site" as const,
    roleText:
      "UX/UI Designer & Product Manager: led the design strategy, user research, interface design, and product management for the AI platform.",
    companyOrType: "Type" as const,
    companyText: "Enterprise Project",
    yearText: "2024",
    teamRoles: [
      "01 UX/UI Designer & Product Manager",
      "02 AI Engineers",
      "01 Frontend Developer",
      "01 Data Scientist",
    ],
    appIconPath: "/assets/case-study-assets/zmartrest/zmartrest-icon.svg",
    logotypeBlackPath:
      "/assets/case-study-assets/zmartrest/zmartrest-logo-black.svg",
    logotypeWhitePath:
      "/assets/case-study-assets/zmartrest/zmartrest-logo-white.svg",
    aboutText: (
      <div className="space-y-4">
        <p>
          Zmartrest AI is an enterprise-grade AI platform designed to
          democratize access to machine learning capabilities. The platform
          enables non-technical users to leverage advanced AI models for data
          analysis, predictive insights, and automated decision-making through
          an intuitive, user-friendly interface.
        </p>
        <p>
          The project focused on bridging the gap between complex AI algorithms
          and practical business applications, making advanced analytics
          accessible to teams across various industries. The design emphasizes
          progressive disclosure, allowing users to start with simple features
          and gradually access more sophisticated capabilities.
        </p>
      </div>
    ),
    processSteps: [
      "User Research & Stakeholder Interviews",
      "AI Model Architecture Planning",
      "Dashboard UX/UI Design",
      "Data Visualization Design",
      "Prototyping & User Testing",
      "Development & AI Integration",
    ],
    businessObjectivesText: (
      <div className="space-y-4">
        <p>
          The primary objective was to create an AI platform that could serve
          both technical and non-technical users, reducing the barrier to entry
          for AI adoption in enterprise environments. The platform needed to
          provide powerful insights while maintaining simplicity and ease of
          use.
        </p>
        <p>
          Key business goals included increasing AI adoption rates, reducing
          time-to-insight for data analysis, and creating a scalable platform
          that could serve multiple enterprise clients across different
          industries.
        </p>
      </div>
    ),
  };

  return <CaseStudy {...zmartrestCaseStudyData} />;
}
