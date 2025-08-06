"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useNavbar } from "@/contexts/NavbarContext";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface Section {
  id: string;
  label: string;
}

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  teamSize: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  heroImage: string;
  heroImageAlt: string;
  processImages: string[];
  processImageAlts: string[];
  link: string;
  linkText: string;
  sections?: Section[];
  buttonText?: "Live site" | "Live prototype";
  roleText?: string;
  companyOrType?: "Company" | "Type";
  companyText?: string;
  yearText?: string;
  teamRoles?: string[];
}

const CaseStudy = ({
  title,
  subtitle,
  description,
  duration,
  teamSize,
  role,
  challenge,
  solution,
  results,
  technologies,
  heroImage,
  heroImageAlt,
  processImages,
  processImageAlts,
  link,
  linkText,
  sections = [
    { id: "summary", label: "Summary" },
    { id: "process", label: "Process" },
    { id: "problem", label: "Problem" },
    { id: "role", label: "My role" },
    { id: "insights", label: "Insights" },
    { id: "design-system", label: "Design System" },
    { id: "results", label: "Results" },
  ],
  buttonText = "Live prototype",
  roleText = "Lead Product Designer: worked on strategy, research, facilitating ideation workshops, prototyping, testing, and delivery.",
  companyOrType = "Company",
  companyText = "Emplojd",
  yearText = "2024",
  teamRoles = ["01 Lead UX/UI Designer", "01 UX Designer"],
}: CaseStudyProps) => {
  const router = useRouter();
  const morphRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const processMorphRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useNavbar();

  const handleCaseStudiesClick = () => {
    // Navigate to home page first
    router.push("/");

    // Set a flag in sessionStorage to trigger scroll after navigation
    sessionStorage.setItem("scrollToCaseStudies", "true");
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    if (sectionId === "summary") {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "process") {
      processRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // GSAP Morphing Effect
  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    const morphContainer = morphRef.current;
    if (!morphContainer) return;

    const morphPath = morphContainer.querySelector(
      ".morph-path"
    ) as SVGPathElement;
    const moon1Path = morphContainer.querySelector(
      ".moon-1-path"
    ) as SVGPathElement;
    const moon2Path = morphContainer.querySelector(
      ".moon-2-path"
    ) as SVGPathElement;

    if (!morphPath || !moon1Path || !moon2Path) return;

    // Set initial state
    gsap.set(morphPath, { morphSVG: moon1Path });

    // Create morphing timeline
    const morphTimeline = gsap.timeline({ paused: true });

    morphTimeline.to(morphPath, {
      morphSVG: moon2Path,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Handle hover events
    const handleMouseEnter = () => {
      setIsHovered(true);
      morphTimeline.play();
      // Smooth gradient transition to different purple
      gsap.to(morphContainer, {
        "--gradient-from": "#a855f7",
        "--gradient-to": "#9333ea",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      morphTimeline.reverse();
      // Smooth gradient transition back to original purple
      gsap.to(morphContainer, {
        "--gradient-from": "#907EFF",
        "--gradient-to": "#7c3aed",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    morphContainer.addEventListener("mouseenter", handleMouseEnter);
    morphContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      morphContainer.removeEventListener("mouseenter", handleMouseEnter);
      morphContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Process Section Morphing Effect
  useEffect(() => {
    const processContainer = processMorphRef.current;
    if (!processContainer) return;

    const morphPath = processContainer.querySelector(
      ".process-morph-path"
    ) as SVGPathElement;
    const shape1Path = processContainer.querySelector(
      ".shape-1-path"
    ) as SVGPathElement;
    const shape2Path = processContainer.querySelector(
      ".shape-2-path"
    ) as SVGPathElement;
    const shape3Path = processContainer.querySelector(
      ".shape-3-path"
    ) as SVGPathElement;
    const shape4Path = processContainer.querySelector(
      ".shape-4-path"
    ) as SVGPathElement;

    if (!morphPath || !shape1Path || !shape2Path || !shape3Path || !shape4Path)
      return;

    // Set initial state
    gsap.set(morphPath, { morphSVG: shape1Path });

    // Create morphing timeline with longer duration and smoother easing
    const morphTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      ease: "power1.inOut",
    });

    morphTimeline
      .to(morphPath, {
        morphSVG: shape2Path,
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        morphSVG: shape3Path,
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        morphSVG: shape4Path,
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        morphSVG: shape1Path,
        duration: 3,
        ease: "power1.inOut",
      });

    // Create gradient animation timeline synchronized with morphing
    const gradientTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      ease: "power1.inOut",
    });

    gradientTimeline
      .to(morphPath, {
        attr: { fill: "url(#processGradient2)" },
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        attr: { fill: "url(#processGradient3)" },
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        attr: { fill: "url(#processGradient4)" },
        duration: 3,
        ease: "power1.inOut",
      })
      .to(morphPath, {
        attr: { fill: "url(#processGradient1)" },
        duration: 3,
        ease: "power1.inOut",
      });

    return () => {
      morphTimeline.kill();
      gradientTimeline.kill();
    };
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get section positions
      const summaryTop = summaryRef.current?.offsetTop || 0;
      const processTop = processRef.current?.offsetTop || 0;

      // Calculate section boundaries
      const summaryBottom =
        summaryTop + (summaryRef.current?.offsetHeight || 0);
      const processBottom =
        processTop + (processRef.current?.offsetHeight || 0);

      // Determine which section is currently in view
      const scrollCenter = scrollY + windowHeight / 2;

      if (scrollCenter < summaryBottom) {
        setActiveSection("summary");
      } else if (scrollCenter >= processTop && scrollCenter < processBottom) {
        setActiveSection("process");
      } else {
        // Default to summary if not in any specific section
        setActiveSection("summary");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 relative">
        {/* Header Section with 40/60 Layout */}
        <section ref={summaryRef} className="pt-32 pb-16">
          <div className="flex items-start">
            {/* Left Container - 40% width */}
            <div className="w-[40%] px-12">
              <div className="flex items-start gap-0">
                {/* Back Arrow + Case Studies Rectangle */}
                <button
                  onClick={handleCaseStudiesClick}
                  className="flex items-center gap-3 px-4 py-3 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-l-lg hover:bg-neutral-20 dark:hover:bg-neutral-80 transition-all duration-200 group h-full"
                >
                  <ArrowLeft
                    size={16}
                    className="text-neutral-100 dark:text-neutral-0 group-hover:text-neutral-70 dark:group-hover:text-neutral-30 transition-colors"
                  />
                  <span className="text-neutral-100 dark:text-neutral-0 uppercase group-hover:text-neutral-70 dark:group-hover:text-neutral-30 font-bold text-xs transition-colors">
                    Case studies
                  </span>
                </button>

                {/* Project Name Rectangle */}
                <div className="px-4 py-3 bg-neutral-90 dark:bg-neutral-0 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 border-l-0 rounded-r-lg flex items-center h-full relative">
                  <span className="text-neutral-0 dark:text-neutral-100 font-bold text-xs uppercase relative z-10">
                    {title.split(" ").slice(0, 3).join(" ")}
                  </span>
                  {/* Active pill shadow effect */}
                  <div
                    className="absolute inset-0 rounded-r-lg -z-10"
                    style={{
                      boxShadow: `0 0 12px ${
                        typeof document !== "undefined" &&
                        document.documentElement.classList.contains("dark")
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(0, 0, 0, 0.4)"
                      }`,
                    }}
                  />
                </div>
              </div>

              {/* Description Text */}
              <div className="mt-12 ml-12">
                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%]">
                  <span className="text-3xl font-black text-neutral-100 dark:text-neutral-0">
                    Emplojd
                  </span>{" "}
                  is an AI-powered job search platform designed to make job
                  applications smarter and more personal. The platform
                  recommends relevant job listings and also writes tailored
                  cover letters using AI.
                </p>
                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%] mt-4">
                  My focus was on creating a clean, intuitive experience that
                  reduces overwhelm while keeping the process authentic and
                  user-driven.
                </p>
              </div>

              {/* Bento Boxes */}
              <div className="mt-12 ml-12 space-y-6">
                {/* Box 1 - Role */}
                <div className="w-full p-4 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg">
                  <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                    Role
                  </h3>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                    {roleText}
                  </p>
                </div>

                {/* Box 2 & 3 - Company/Type and Year */}
                <div className="flex gap-4">
                  {/* Box 2 - Company/Type */}
                  <div className="w-1/2 p-4 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg">
                    <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                      {companyOrType}
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                      {companyOrType === "Type"
                        ? "School project"
                        : companyText}
                    </p>
                  </div>

                  {/* Box 3 - Year */}
                  <div className="w-1/2 p-4 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg">
                    <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                      Year
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                      {yearText}
                    </p>
                  </div>
                </div>

                {/* Box 4 - Team */}
                <div className="w-full p-4 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg">
                  <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                    Team
                  </h3>
                  <div className="flex gap-8">
                    {teamRoles.map((role, index) => (
                      <p
                        key={index}
                        className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed"
                      >
                        {role}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Button with Morphing SVG */}
              <div className="mt-12 ml-12">
                <button
                  ref={morphRef}
                  className="w-full flex items-center justify-between px-6 py-6 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(to right, var(--gradient-from, #907EFF), var(--gradient-to, #7c3aed))",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Pulsating Live Dot */}
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                    </div>

                    <span className="text-white font-bold text-2xl">
                      {buttonText}
                    </span>
                  </div>

                  {/* Morphing SVG Container */}
                  <div className="w-8 h-8 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 200 200"
                      width="24"
                      height="24"
                      className="w-full h-full"
                    >
                      <defs>
                        <linearGradient
                          id="yellowGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F8F8F8" />
                          <stop offset="50%" stopColor="#E9E9E9" />
                          <stop offset="100%" stopColor="#D3D3D3" />
                        </linearGradient>
                        <linearGradient
                          id="purpleGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#F8F8F8" />
                        </linearGradient>
                      </defs>
                      {/* Main morphing path */}
                      <path
                        d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z"
                        fill="url(#yellowGradient)"
                        className="morph-path"
                        style={{ transition: "fill 0.3s ease-in-out" }}
                      />

                      {/* Hidden target paths for morphing */}
                      <path
                        d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z"
                        fill="none"
                        className="moon-1-path"
                      />
                      <path
                        d="M193.481 31.456c13.436 23.267 5.44 52.966-17.886 66.43l-1.522.88c-15.647 9.031-25.278 25.67-25.278 43.672v2.001c0 26.82-21.845 48.561-48.793 48.561s-48.794-21.741-48.794-48.561v-1.998c0-18.002-9.631-34.642-25.278-43.674l-1.525-.88C1.079 84.423-6.917 54.723 6.519 31.456 20.031 8.058 50.078.046 73.534 13.586l1.205.695a50.559 50.559 0 0050.522 0l1.205-.696c23.456-13.54 53.503-5.527 67.015 17.87z"
                        fill="none"
                        className="moon-2-path"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Container - 60% width */}
            <div className="w-[60%]">
              <h1
                className={`text-4xl md:text-5xl font-bold text-neutral-100 dark:text-neutral-0 leading-tight tracking-tight ${hanken.className}`}
              >
                {subtitle}
              </h1>
              <div className="w-full h-[700px] bg-[#907EFF] mt-4 relative">
                {/* Glass-styled technology pills */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="flex">
            {/* Left margin - 20% */}
            <div className="w-[20%]"></div>

            {/* Left container - 30% */}
            <div className="w-[30%] px-6">
              <h2 className="text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-4">
                About
              </h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-neutral-0 dark:to-neutral-100"></div>

              {/* Business Objectives Title */}
              <div className="mt-96">
                <h2 className="text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-4">
                  Business objectives
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-neutral-0 dark:to-neutral-100"></div>
              </div>
            </div>

            {/* Right container - 30% */}
            <div className="w-[30%] px-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-6">
                Emplojd is an AI-powered job search platform designed to make
                job applications smarter and more personal. The platform
                recommends relevant job listings and even writes tailored cover
                letters using AI.
              </p>
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                My focus was on creating a clean, intuitive experience that
                reduces overwhelm while keeping the process authentic and
                user-driven.
              </p>

              {/* Logo Box */}
              <div className="w-full h-32 mt-6 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg flex items-center justify-center">
                <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                  Logo placeholder
                </span>
              </div>

              {/* Business Objectives Text */}
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mt-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Right margin - 20% */}
            <div className="w-[20%]"></div>
          </div>
        </section>

        {/* The Process Section */}
        <section ref={processRef} className="py-16 mt-32">
          <div className="flex">
            {/* Left margin - 20% */}
            <div className="w-[20%]"></div>

            {/* Left container - 30% */}
            <div className="w-[30%] px-6">
              <h2 className="text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-4">
                The Process
              </h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-neutral-0 dark:to-neutral-100"></div>

              {/* Morphing SVGs Container */}
              <div
                ref={processMorphRef}
                className="mt-8 flex justify-center items-center h-96"
              >
                <div className="w-80 h-80 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 200 200"
                    width="320"
                    height="320"
                    className="w-full h-full"
                  >
                    <defs>
                      {/* Gradient 1 - Purple to Blue */}
                      <linearGradient
                        id="processGradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#907EFF" />
                        <stop offset="50%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1E40AF" />
                      </linearGradient>

                      {/* Gradient 2 - Orange to Pink */}
                      <linearGradient
                        id="processGradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FF6B6B" />
                        <stop offset="50%" stopColor="#FF8E53" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>

                      {/* Gradient 3 - Green to Cyan */}
                      <linearGradient
                        id="processGradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="50%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#0EA5E9" />
                      </linearGradient>

                      {/* Gradient 4 - Yellow to Orange */}
                      <linearGradient
                        id="processGradient4"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>

                    {/* Main morphing path */}
                    <path
                      d="M200 25c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM200 175c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM175 125c13.807 0 25-11.193 25-25s-11.193-25-25-25-25 11.193-25 25 11.193 25 25 25zM125 175c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM100 50c13.807 0 25-11.193 25-25S113.807 0 100 0 75 11.193 75 25s11.193 25 25 25zM50 175c0 13.807-11.193 25-25 25S0 188.807 0 175s11.193-25 25-25 25 11.193 25 25zM100 125c13.807 0 25-11.193 25-25s-11.193-25-25-25-25 11.193-25 25 11.193 25 25 25zM50 25c0 13.807-11.193 25-25 25S0 38.807 0 25 11.193 0 25 0s25 11.193 25 25zM25 125c13.807 0 25-11.193 25-25S38.807 75 25 75 0 86.193 0 100s11.193 25 25 25z"
                      fill="url(#processGradient1)"
                      className="process-morph-path"
                    />

                    {/* Hidden target paths for morphing */}
                    <path
                      d="M200 25c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM200 175c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM175 125c13.807 0 25-11.193 25-25s-11.193-25-25-25-25 11.193-25 25 11.193 25 25 25zM125 175c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zM100 50c13.807 0 25-11.193 25-25S113.807 0 100 0 75 11.193 75 25s11.193 25 25 25zM50 175c0 13.807-11.193 25-25 25S0 188.807 0 175s11.193-25 25-25 25 11.193 25 25zM100 125c13.807 0 25-11.193 25-25s-11.193-25-25-25-25 11.193-25 25 11.193 25 25 25zM50 25c0 13.807-11.193 25-25 25S0 38.807 0 25 11.193 0 25 0s25 11.193 25 25zM25 125c13.807 0 25-11.193 25-25S38.807 75 25 75 0 86.193 0 100s11.193 25 25 25z"
                      fill="none"
                      className="shape-1-path"
                    />
                    <path
                      d="M200 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.334-14.924-33.334-33.334C133.333 14.923 148.257 0 166.667 0 185.076 0 200 14.924 200 33.333zM200 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.333 33.334-33.333C185.076 66.667 200 81.59 200 100zM200 166.667C200 185.076 185.076 200 166.667 200c-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.334 33.334-33.334 18.409 0 33.333 14.924 33.333 33.334zM133.333 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.333-14.924-33.333-33.334C66.667 14.923 81.59 0 100 0s33.333 14.924 33.333 33.333zM133.333 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.333 33.333-33.333S133.333 81.59 133.333 100zM133.333 166.667C133.333 185.076 118.409 200 100 200c-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.334 33.333-33.334s33.333 14.924 33.333 33.334zM66.667 33.333c0 18.41-14.924 33.334-33.334 33.334C14.923 66.667 0 51.743 0 33.333 0 14.923 14.924 0 33.333 0c18.41 0 33.334 14.924 33.334 33.333zM66.667 100c0 18.409-14.924 33.333-33.334 33.333C14.923 133.333 0 118.409 0 100c0-18.41 14.924-33.333 33.333-33.333 18.41 0 33.334 14.924 33.334 33.333zM66.667 166.667c0 18.409-14.924 33.333-33.334 33.333C14.923 200 0 185.076 0 166.667c0-18.41 14.924-33.334 33.333-33.334 18.41 0 33.334 14.924 33.334 33.334z"
                      fill="none"
                      className="shape-2-path"
                    />
                    <path
                      d="M200 30c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30zM200 170c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30zM151 100c0 28.167-22.833 51-51 51-28.166 0-51-22.833-51-51 0-28.166 22.834-51 51-51 28.167 0 51 22.834 51 51zM60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30zM60 170c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30z"
                      fill="none"
                      className="shape-3-path"
                    />
                    <path
                      d="M200 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.334-14.924-33.334-33.334C133.333 14.923 148.257 0 166.667 0 185.076 0 200 14.924 200 33.333zM200 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.333 33.334-33.333C185.076 66.667 200 81.59 200 100zM200 166.667C200 185.076 185.076 200 166.667 200c-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.334 33.334-33.334 18.409 0 33.333 14.924 33.333 33.334zM133.333 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.333-14.924-33.333-33.334C66.667 14.923 81.59 0 100 0s33.333 14.924 33.333 33.333zM133.333 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.333 33.333-33.333S133.333 81.59 133.333 100zM133.333 166.667C133.333 185.076 118.409 200 100 200c-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.334 33.333-33.334s33.333 14.924 33.333 33.334zM66.667 33.333c0 18.41-14.924 33.334-33.334 33.334C14.923 66.667 0 51.743 0 33.333 0 14.923 14.924 0 33.333 0c18.41 0 33.334 14.924 33.334 33.333zM66.667 100c0 18.409-14.924 33.333-33.334 33.333C14.923 133.333 0 118.409 0 100c0-18.41 14.924-33.333 33.333-33.333 18.41 0 33.334 14.924 33.334 33.333zM66.667 166.667c0 18.409-14.924 33.333-33.334 33.333C14.923 200 0 185.076 0 166.667c0-18.41 14.924-33.334 33.333-33.334 18.41 0 33.334 14.924 33.334 33.334z"
                      fill="none"
                      className="shape-4-path"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right container - 30% */}
            <div className="w-[30%] px-6">
              {/* First Iteration */}
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-sm uppercase mb-3">
                FIRST ITERATION
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed mb-8 space-y-1">
                <li>• App Review</li>
                <li>• User Interviews</li>
                <li>• Competitor analysis</li>
                <li>• Ideation Workshop</li>
                <li>• Design Principles</li>
                <li>• Moderated and Unmoderated User Testing</li>
                <li>• New UI Exploration</li>
                <li>• Build Design System</li>
                <li>• Finalise UI</li>
                <li>• Release → 18% engagement rate</li>
              </ul>

              {/* Second Iteration */}
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-sm uppercase mb-3">
                SECOND ITERATION
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed space-y-1">
                <li>• Opportunity Solution Tree</li>
                <li>• Customer Journey Mapping</li>
                <li>• Diary Study (attempted)</li>
                <li>• Competitor Analysis</li>
                <li>• Moderated and Unmoderated User Testing</li>
                <li>• Release → 42% engagement rate</li>
              </ul>
            </div>

            {/* Right margin - 20% */}
            <div className="w-[20%]"></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudy;
