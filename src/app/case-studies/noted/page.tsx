"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import CaseStudySkeleton from "@/components/CaseStudySkeleton";
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
    if (password === "noted2024") {
      onPasswordCorrect();
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-100 dark:text-neutral-0 mb-2">
            Noted Case Study
          </h1>
          <p className="text-neutral-60 dark:text-neutral-40">
            Enter the password to access this case study
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-80 dark:text-neutral-20 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-20 dark:border-neutral-80 rounded-lg bg-neutral-0 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Checking..." : "Access Case Study"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-80 dark:hover:text-neutral-20 transition-colors duration-200"
          >
            ← Back to Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default function NotedCaseStudy() {
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

  // Noted case study data (placeholder content for now)
  const notedCaseStudyData = {
    title: "Noted",
    subtitle: "AI-Powered Note-Taking Application",
    description:
      "A modern note-taking app that uses AI to help users organize, search, and enhance their notes with intelligent features.",
    duration: "6 months",
    teamSize: "3 people",
    role: "Lead Product Designer",
    challenge:
      "Creating an intuitive note-taking experience that leverages AI without overwhelming users",
    solution:
      "A clean, minimalist interface with smart AI features that enhance productivity",
    results: [
      "40% increase in user engagement",
      "60% faster note organization",
      "85% user satisfaction rate",
    ],
    technologies: ["React", "TypeScript", "AI/ML", "Figma", "Framer"],
    heroImage: "/case-study-assets/noted/noted-hero.jpg",
    heroImageAlt: "Noted app interface showing clean note-taking interface",
    processImages: [
      "/case-study-assets/noted/process-1.jpg",
      "/case-study-assets/noted/process-2.jpg",
      "/case-study-assets/noted/process-3.jpg",
    ],
    processImageAlts: [
      "User research and wireframing process",
      "Design system development",
      "Prototype testing and iteration",
    ],
    link: "https://noted-app.com",
    linkText: "Live prototype",
    buttonText: "Live prototype" as const,
    roleText:
      "Lead Product Designer: worked on user research, wireframing, prototyping, and design system development.",
    companyOrType: "Type" as const,
    companyText: "Personal Project",
    yearText: "2024",
    teamRoles: [
      "01 Lead Product Designer",
      "01 Frontend Developer",
      "01 AI Engineer",
    ],
    appIconPath: "/case-study-assets/noted/noted-icon.svg",
    logotypeBlackPath: "/case-study-assets/noted/noted-logo-black.svg",
    logotypeWhitePath: "/case-study-assets/noted/noted-logo-white.svg",
    aboutText: (
      <div className="space-y-4">
        <p>
          Noted is an AI-powered note-taking application designed to help users
          capture, organize, and enhance their thoughts and ideas. The app
          combines the simplicity of traditional note-taking with intelligent
          features that make information more discoverable and actionable.
        </p>
        <p>
          The project focused on creating a seamless user experience that
          leverages AI capabilities without overwhelming users with complexity.
          The design emphasizes clean aesthetics, intuitive navigation, and
          powerful search capabilities.
        </p>
      </div>
    ),
    processSteps: [
      "User Research & Analysis",
      "Wireframing & Information Architecture",
      "Visual Design & Branding",
      "Prototyping & User Testing",
      "Design System Development",
      "Implementation & Launch",
    ],
    businessObjectivesText: (
      <div className="space-y-4">
        <p>
          The primary objective was to create a note-taking application that
          stands out in a crowded market by offering unique AI-powered features
          while maintaining simplicity and ease of use.
        </p>
        <p>
          Key business goals included increasing user retention, reducing the
          time spent organizing notes, and creating a product that users would
          recommend to others.
        </p>
      </div>
    ),
  };

  return <CaseStudy {...notedCaseStudyData} />;
}
