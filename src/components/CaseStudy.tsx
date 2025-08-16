"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useNavbar } from "@/contexts/NavbarContext";
import Footer from "@/components/Footer";

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
  appIconPath?: string;
  logotypeBlackPath?: string;
  logotypeWhitePath?: string;
  aboutText?: React.ReactNode;
  processSteps?: string[];
  businessObjectivesText?: React.ReactNode;
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
    { id: "about", label: "About" },
    { id: "business-objective", label: "Business Objective" },
    { id: "challenge", label: "The Challenge" },
    { id: "solution", label: "The Solution" },
    { id: "craft", label: "The Craft" },
    { id: "design-system", label: "Design Guide & Components" },
    { id: "process", label: "The Process" },
    { id: "role", label: "My Role" },
    { id: "insights", label: "Insights" },
    { id: "results", label: "Results" },
  ],
  buttonText = "Live prototype",
  roleText = "Lead Product Designer: worked on strategy, research, facilitating ideation workshops, prototyping, testing, and delivery.",
  companyOrType = "Company",
  companyText = "Emplojd",
  yearText = "2024",
  teamRoles = ["01 Lead UX/UI Designer", "01 UX Designer"],
  appIconPath,
  logotypeBlackPath,
  logotypeWhitePath,
  aboutText,
  processSteps,
  businessObjectivesText,
}: CaseStudyProps) => {
  const router = useRouter();
  const morphRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const businessObjectiveRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLElement>(null);
  const insightsRef = useRef<HTMLElement>(null);
  const designSystemRef = useRef<HTMLElement>(null);
  const craftRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const processMorphRef = useRef<HTMLDivElement>(null);
  const { setActiveSection, activeSection } = useNavbar();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCaseStudiesClick = () => {
    // Navigate to home page first
    router.push("/");

    // Set a flag in sessionStorage to trigger scroll after navigation
    sessionStorage.setItem("scrollToCaseStudies", "true");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 2);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 2) % 2);
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    if (sectionId === "summary") {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "business-objective") {
      businessObjectiveRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "process") {
      processRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "challenge") {
      challengeRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "solution") {
      solutionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "craft") {
      craftRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "role") {
      roleRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "insights") {
      insightsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "design-system") {
      designSystemRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "results") {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
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
    const starPath = morphContainer.querySelector(
      ".star-target"
    ) as SVGPathElement;
    const trianglePath = morphContainer.querySelector(
      ".triangle-target"
    ) as SVGPathElement;

    if (!morphPath || !starPath || !trianglePath) return;

    // Set initial state to star
    gsap.set(morphPath, { morphSVG: starPath });

    // Create morphing timeline - only on hover
    const morphTimeline = gsap.timeline({ paused: true });

    // Morph to triangle on hover
    morphTimeline.to(morphPath, {
      morphSVG: trianglePath,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Handle hover events
    const handleMouseEnter = () => {
      console.log("Button hover enter - morphing to triangle");
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
      console.log("Button hover leave - morphing back to star");
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
      morphTimeline.kill();
    };
  }, []);

  // Flower Icons Spinning Animation
  useEffect(() => {
    // Add flower-icon class to all flower SVG containers
    const flowerContainers = document.querySelectorAll('[class*="flower-2"]');
    flowerContainers.forEach((container) => {
      container.classList.add("flower-icon");
    });

    // Animate all flower icons with GSAP
    const flowerIcons = document.querySelectorAll(".flower-icon");
    flowerIcons.forEach((icon) => {
      gsap.to(icon, {
        rotation: 360,
        duration: 3,
        ease: "none",
        repeat: -1,
      });
    });
  }, []);

  // Design System Infinite Scroll Effect
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".infinite-scroll-container"
    );
    if (!scrollContainer) return;

    const images = scrollContainer.querySelectorAll(".design-system-svg");
    if (images.length === 0) return;

    // Wait for images to load before calculating height
    const firstImage = images[0] as HTMLImageElement;
    let scrollTimeline: gsap.core.Timeline | null = null;
    let animationStarted = false;

    const startAnimation = () => {
      if (animationStarted) return; // Prevent multiple animations

      const imageHeight = firstImage.offsetHeight;

      if (imageHeight === 0) {
        // If height is still 0, try again after a short delay
        setTimeout(startAnimation, 100);
        return;
      }

      // Position the second image below the first for seamless looping
      if (images[1]) {
        (images[1] as HTMLImageElement).style.top = `${imageHeight}px`;
      }

      // Create infinite scroll animation
      scrollTimeline = gsap.timeline({ repeat: -1 });

      scrollTimeline.to(images, {
        y: -imageHeight,
        duration: 30, // Adjust speed: lower = faster, higher = slower
        ease: "none", // Linear movement for smooth scrolling
      });

      animationStarted = true;
      console.log("Design system animation started");
    };

    // Hover effects to slow down animation
    const handleMouseEnter = () => {
      if (scrollTimeline) {
        scrollTimeline.timeScale(0.3); // Slow down to 30% speed on hover
      }
    };

    const handleMouseLeave = () => {
      if (scrollTimeline) {
        scrollTimeline.timeScale(1); // Return to normal speed
      }
    };

    // Add hover event listeners
    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Intersection Observer to start animation only when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            // Section is now visible, start animation if images are loaded
            if (firstImage.complete) {
              startAnimation();
            } else {
              firstImage.addEventListener("load", startAnimation);
            }
          }
        });
      },
      { threshold: 0.3 } // Start when 30% of section is visible
    );

    // Observe the design system section
    const designSystemSection = designSystemRef.current;
    if (designSystemSection) {
      observer.observe(designSystemSection);
    }

    return () => {
      firstImage.removeEventListener("load", startAnimation);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollTimeline) {
        scrollTimeline.kill();
      }
      observer.disconnect();
    };
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get section positions
      const summaryTop = summaryRef.current?.offsetTop || 0;
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const businessObjectiveTop = businessObjectiveRef.current?.offsetTop || 0;
      const processTop = processRef.current?.offsetTop || 0;
      const challengeTop = challengeRef.current?.offsetTop || 0;
      const solutionTop = solutionRef.current?.offsetTop || 0;
      const craftTop = craftRef.current?.offsetTop || 0;
      const roleTop = roleRef.current?.offsetTop || 0;
      const insightsTop = insightsRef.current?.offsetTop || 0;
      const designSystemTop = designSystemRef.current?.offsetTop || 0;
      const resultsTop = resultsRef.current?.offsetTop || 0;

      // Calculate section boundaries
      const summaryBottom =
        summaryTop + (summaryRef.current?.offsetHeight || 0);
      const aboutBottom = aboutTop + (aboutRef.current?.offsetHeight || 0);
      const businessObjectiveBottom =
        businessObjectiveTop +
        (businessObjectiveRef.current?.offsetHeight || 0);
      const processBottom =
        processTop + (processRef.current?.offsetHeight || 0);
      const challengeBottom =
        challengeTop + (challengeRef.current?.offsetHeight || 0);
      const solutionBottom =
        solutionTop + (solutionRef.current?.offsetHeight || 0);
      const craftBottom = craftTop + (craftRef.current?.offsetHeight || 0);
      const roleBottom = roleTop + (roleRef.current?.offsetHeight || 0);
      const insightsBottom =
        insightsTop + (insightsRef.current?.offsetHeight || 0);
      const designSystemBottom =
        designSystemTop + (designSystemRef.current?.offsetHeight || 0);
      // Calculate Results section bottom to include the mockup section
      const mockupTop = mockupRef.current?.offsetTop || 0;
      const mockupBottom = mockupTop + (mockupRef.current?.offsetHeight || 0);
      const resultsBottom = Math.max(
        resultsTop + (resultsRef.current?.offsetHeight || 0),
        mockupBottom
      );

      // Determine which section is currently in view
      const scrollCenter = scrollY + windowHeight / 2;

      if (scrollCenter < summaryBottom) {
        setActiveSection("summary");
      } else if (scrollCenter >= aboutTop && scrollCenter < aboutBottom) {
        setActiveSection("about");
      } else if (
        scrollCenter >= businessObjectiveTop &&
        scrollCenter < businessObjectiveBottom
      ) {
        setActiveSection("business-objective");
      } else if (scrollCenter >= processTop && scrollCenter < processBottom) {
        setActiveSection("process");
      } else if (
        scrollCenter >= challengeTop &&
        scrollCenter < challengeBottom
      ) {
        setActiveSection("challenge");
      } else if (scrollCenter >= solutionTop && scrollCenter < solutionBottom) {
        setActiveSection("solution");
      } else if (scrollCenter >= craftTop && scrollCenter < craftBottom) {
        setActiveSection("craft");
      } else if (scrollCenter >= roleTop && scrollCenter < roleBottom) {
        setActiveSection("role");
      } else if (scrollCenter >= insightsTop && scrollCenter < insightsBottom) {
        setActiveSection("insights");
      } else if (
        scrollCenter >= designSystemTop &&
        scrollCenter < designSystemBottom
      ) {
        setActiveSection("design-system");
      } else if (scrollCenter >= resultsTop && scrollCenter < resultsBottom) {
        setActiveSection("results");
      }
      // Removed fallback to summary - will keep previous section active
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  // Process Section Morphing Effect
  useEffect(() => {
    if (!processMorphRef.current) return;

    const morphContainer = processMorphRef.current;
    const shapes = morphContainer.querySelectorAll("path");
    let currentShapeIndex = 0;

    const morphToNextShape = () => {
      if (shapes.length === 0) return;

      const currentShape = shapes[currentShapeIndex];
      const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
      const nextShape = shapes[nextShapeIndex];

      gsap.to(currentShape, {
        morphSVG: nextShape,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          currentShapeIndex = nextShapeIndex;
          setTimeout(morphToNextShape, 300);
        },
      });
    };

    if (shapes.length > 0) {
      morphToNextShape();
    }

    return () => {
      gsap.killTweensOf(shapes);
    };
  }, []);

  // Hero Section Spinning Icons Effect
  useEffect(() => {
    // Add spinning-icon class to all hero image containers
    const heroContainers = document.querySelectorAll(
      '[class*="hero-image-container"]'
    );
    heroContainers.forEach((container) => {
      container.classList.add("spinning-icon");
    });

    // Animate all hero images with GSAP
    const heroImages = document.querySelectorAll(".spinning-icon");
    heroImages.forEach((image) => {
      gsap.to(image, {
        rotation: 360,
        duration: 10, // Adjust duration as needed
        repeat: -1,
        ease: "linear",
      });
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 relative">
        {/* Header Section with 40/60 Layout */}
        <section
          ref={summaryRef}
          data-section="summary"
          className="pt-32 pb-16 relative"
        >
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

              {/* Project Title */}
              <h1 className="text-8xl font-black text-neutral-80 dark:text-neutral-20 mb-8 mt-16 ml-12">
                {title}
              </h1>

              {/* Bento Boxes and Button Layout */}
              <div className="mt-12 ml-12 max-w-[640px]">
                {/* Box 1 - Role (Full width) */}
                <div className="w-full p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg mb-6 min-h-[80px] flex flex-col justify-center">
                  <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                    Role
                  </h3>
                  <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                    {roleText}
                  </p>
                </div>

                {/* Grid Layout with proper spacing */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Company Box - top left */}
                  <div className="p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
                    <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                      {companyOrType}
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                      {companyOrType === "Type"
                        ? "School project"
                        : companyText}
                    </p>
                  </div>

                  {/* Year Box - top right */}
                  <div className="p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
                    <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                      Year
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base leading-relaxed">
                      {yearText}
                    </p>
                  </div>

                  {/* Team Box - bottom, spans full width */}
                  <div className="col-span-2 p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[80px] flex flex-col justify-center">
                    <h3 className="text-neutral-80 dark:text-neutral-0 font-black text-sm mb-2">
                      Team
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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

                {/* Live Prototype Button - spans same width as grid */}
                <button
                  ref={morphRef}
                  className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#907EFF] to-[#7c3aed] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Status Dot */}
                  <div className="w-3 h-3 bg-gray-400 rounded-full relative flex-shrink-0"></div>

                  <span className="whitespace-nowrap">
                    Sorry, Emplojd is no longer live 🙁
                  </span>
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
                      className="px-3 py-1.5 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 text-neutral-100 dark:text-neutral-0 text-sm font-medium rounded-full flex items-center gap-2"
                    >
                      {tech === "Live" && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  Summary
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent mb-8"></div>
              </div>
              <div className="w-[600px]">
                <div className="mb-12">
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%]">
                    Emplojd is an AI-powered SaaS platform designed to make job
                    applications smarter and more personal. The platform
                    recommends relevant job listings and also writes tailored
                    cover letters using AI.
                  </p>
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%] mt-4">
                    My role focused extensively on leading and managing the
                    UX/UI design process, ensuring the platform is not only
                    functional but also provides an intuitive and enjoyable user
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} data-section="about" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            {/* About Box */}
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  About
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                {aboutText ? (
                  aboutText
                ) : (
                  <div className="relative">
                    <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-6">
                      Emplojd was born out of the frustration many feel with
                      repetitive and time-consuming job applications. Created
                      during the{" "}
                      <a
                        href="https://chasacademy.se/article/chas-challenge-2024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block cursor-pointer group"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        Chas Challenge
                      </a>
                      , this AI-powered platform was our teams way of exploring
                      how design and tech could simplify the process.
                    </p>
                    {/* Custom cursor tooltip - moved outside p element */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-96">
                      <div className="bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 px-6 py-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 text-sm leading-relaxed">
                        <div className="mb-3">
                          Chas Academy's annual, cross-program student project
                          where first-year students team up across disciplines
                          over an 8‑week period (2024's theme: AI) to ideate and
                          prototype real solutions, then pitch them to industry
                          professionals.
                        </div>
                        <div className="text-xs text-neutral-60 dark:text-neutral-40 font-medium border-t border-neutral-200 dark:border-neutral-700 pt-3">
                          Click to read more
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-100 dark:border-t-neutral-0"></div>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                  I led the UX/UI work to make sure the experience felt
                  personal, efficient, and genuinely helpful for job seekers.
                </p>

                {/* Logo Box */}
                <div className="w-full h-32 mt-6 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg flex items-center px-6">
                  {appIconPath && (
                    <img
                      src={appIconPath}
                      alt="App Icon"
                      className="h-20 w-20 object-contain"
                    />
                  )}
                  <div className="flex-1 flex justify-center">
                    {logotypeBlackPath && logotypeWhitePath && (
                      <img
                        src={logotypeBlackPath}
                        alt="Logotype"
                        className="h-10 object-contain dark:hidden"
                      />
                    )}
                    {logotypeBlackPath && logotypeWhitePath && (
                      <img
                        src={logotypeWhitePath}
                        alt="Logotype"
                        className="h-10 object-contain hidden dark:block"
                      />
                    )}
                  </div>
                  {!appIconPath && !logotypeBlackPath && (
                    <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                      Logo placeholder
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Objective Section */}
        <section
          ref={businessObjectiveRef}
          data-section="business-objective"
          className="py-16"
        >
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  Business Objective
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                {businessObjectivesText ? (
                  <div>{businessObjectivesText}</div>
                ) : (
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* The challenge Section with Centered Layout */}
        <section ref={challengeRef} data-section="challenge" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  The Challenge
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                {/* Main Challenge Statement */}
                <div className="mb-16 space-y-6">
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                    We had eight weeks, a small cross-disciplinary team, and the
                    broad theme of "AI" to work with. In that time, we needed to
                    design and deliver a functional, interactive prototype that
                    could stand out at the Chas Challenge showcase.
                  </p>

                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                    The job-search market is already crowded, yet most platforms
                    still demand time-consuming, repetitive application
                    processes. Job seekers risk losing opportunities by applying
                    to fewer roles, while recruiters lose time reviewing
                    generic, low-quality submissions.
                  </p>

                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                    Our challenge was to create a solution that used AI
                    meaningfully,{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                      }}
                    >
                      reducing friction for applicants without sacrificing the
                      personal touch recruiters value. All within tight time and
                      resource limits
                    </span>
                    .
                  </p>
                </div>

                {/* Additional Context */}
                <div className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-10">
                  <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-2xl mb-6">
                    Context & Background
                  </h3>
                  <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      <span>
                        Limited time, as the project ran alongside my regular
                        studies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      <span>
                        Broad initial theme (AI), requiring us to define our own
                        scope and boundaries
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      <span>
                        Had to start development early, adding extra pressure on
                        the design process
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Goals */}
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-700/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-10 mt-8">
                  <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-2xl mb-6">
                    Goals
                  </h3>
                  <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold mt-1">•</span>
                      <span>
                        Design and deliver a functional, interactive prototype
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold mt-1">•</span>
                      <span>
                        Create a solution that meaningfully uses AI to reduce
                        friction
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold mt-1">•</span>
                      <span>Stand out at the Chas Challenge showcase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold mt-1">•</span>
                      <span>
                        Intuitive design and highly satisfactory experience
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section ref={solutionRef} data-section="solution" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  The Solution
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:text-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                <div className="mb-16">
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-8">
                    Built with a{" "}
                    <span
                      className="relative inline-block cursor-pointer group"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      user-first mindset
                    </span>
                    , the platform shifts focus away from the recruiter and
                    towards the needs of the applicant.{" "}
                    <span
                      className="relative inline-block cursor-pointer group"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Three core tools work together
                    </span>{" "}
                    seamlessly: saving a personalised profile, searching for
                    relevant job postings, and tailoring cover letters. All in
                    one place, the process becomes faster, simpler, and more
                    personal.
                  </p>
                  <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>Smart job discovery</strong> — integrates with
                        job listing APIs and offers strong search functionality
                        to quickly find relevant opportunities.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>On-the-go convenience</strong> — allows
                        logged-in users to save jobs with a single click to
                        revisit and generate cover letters later.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>Respectful balance</strong> — ensures
                        applications remain personal while avoiding generic
                        overload for recruiters.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>User-focused UI</strong> — designed a clean,
                        intuitive interface that encourages productivity and
                        removes overwhelm.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Solution Features */}
                <div className="bg-gradient-to-r from-green-500/10 to-green-700/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-10">
                  <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-2xl mb-6">
                    Key Features
                  </h3>
                  <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>AI-powered personalization</strong> — uses each
                        job seeker's "job profile" and specific job postings to
                        create tailored cover letters that preserve their unique
                        voice.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>Streamlined workflow</strong> — enables users to
                        apply to more jobs with less friction.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-1">•</span>
                      <span>
                        <strong>Flexible profile data</strong> — store your
                        information to avoid re-entering details for every
                        application, with the option to edit for each cover
                        letter when needed.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Craft Section */}
        <section ref={craftRef} data-section="craft" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  The Craft
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                    Design Approach & Methodology
                  </h3>
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-8">
                    Mapped user flows to create a natural, low-friction journey.
                    Built wireframes, tested, and iterated for clarity and
                    usability. Developed a consistent design system to unify
                    visuals and speed up production. Designed features to
                    simplify job applications without sacrificing
                    personalisation.
                  </p>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20">
                        User Experience Design
                      </h3>
                      <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                        Created intuitive user flows that guide job seekers
                        through the application process seamlessly, reducing
                        cognitive load and improving completion rates.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20">
                        Design System & Components
                      </h3>
                      <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                        Established a lightweight design system with reusable
                        components, ensuring visual consistency and accelerating
                        development across the platform.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20">
                        Iterative Testing
                      </h3>
                      <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                        Conducted multiple rounds of user testing and iteration,
                        refining the interface based on real user feedback to
                        optimize usability and satisfaction.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-80 dark:text-neutral-20">
                        Personalization Balance
                      </h3>
                      <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                        Carefully balanced automation with personal touch,
                        ensuring AI-generated content maintains authenticity
                        while streamlining the application process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Placeholder Below - Constrained Width with Navigation */}
          <div className="mt-16">
            <div className="max-w-[1200px] mx-auto px-8">
              <div className="w-full h-[800px] bg-white relative rounded-2xl overflow-hidden">
                {/* First Image - Wireframes */}
                <img
                  src="/case-study-assets/emplojd/Emplojd-The-Craft-Various-Wireframes.svg"
                  alt="Emplojd wireframes showing user flow mapping and interface design"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    currentImageIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Second Image - Ideation Workshop */}
                <img
                  src="/case-study-assets/emplojd/Emplojd-The-Craft-Ideation Workshop-Crazy-8.svg"
                  alt="Emplojd ideation workshop showing Crazy 8 sketching process and design exploration"
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                    currentImageIndex === 1 ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 group"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-white/90 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 group"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-white/90 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm border border-black/50 rounded-full px-4 py-2">
                  <span className="text-white/90 text-sm font-medium">
                    {currentImageIndex + 1} of 2
                  </span>
                </div>
              </div>

              {/* Image Caption - Updates based on current image */}
              <div className="mt-4 text-center">
                <p className="text-neutral-60 dark:text-neutral-40 text-sm font-medium">
                  {currentImageIndex === 0
                    ? "Image 1: Initial wireframes for sign in, job search, and cover letter generation."
                    : "Image 2: Ideation workshop showing Crazy 8 sketching process and design exploration techniques."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Role Section */}
        <section ref={roleRef} data-section="role" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  My Role
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Image Placeholder Below - Full Width */}
            <div className="mt-16">
              <div className="w-full h-[800px] bg-[#907EFF] relative rounded-2xl">
                {/* Placeholder for future image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/60 text-lg font-medium">
                    Image placeholder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section ref={insightsRef} data-section="insights" className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  Insights
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
              </div>
              <div className="w-[600px]">
                {/* Centered Summary Text */}
                <div className="text-left mb-20">
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed max-w-4xl mx-auto">
                    Through comprehensive user research, interviews, and data
                    analysis, we uncovered key insights that shaped the
                    direction of our design decisions. Here are the most
                    significant findings from our research process.
                  </p>
                </div>

                {/* Insights Grid */}
                <div className="grid grid-cols-2 gap-12">
                  {/* Early Insights */}
                  <div className="bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-2xl p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl">
                        Early Insights
                      </h3>
                    </div>

                    <ul className="space-y-6">
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_1_flower-2)">
                              <mask
                                id="cs_mask_1_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_1_flower-2)">
                                <path
                                  fill="#EAB308"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EAB308"></stop>
                                <stop offset="1" stopColor="#CA8A04"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_1_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Users found the job application process overwhelming
                          and time-consuming
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-4 h-4 mt-1 flex-shrink-0 animate-spin">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_2_flower-2)">
                              <mask
                                id="cs_mask_2_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_2_flower-2)">
                                <path
                                  fill="#EAB308"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_2)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_2"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EAB308"></stop>
                                <stop offset="1" stopColor="#CA8A04"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_2_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Cover letter writing was identified as the biggest
                          pain point
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_3_flower-2)">
                              <mask
                                id="cs_mask_3_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_3_flower-2)">
                                <path
                                  fill="#EAB308"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_3)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_3"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EAB308"></stop>
                                <stop offset="1" stopColor="#CA8A04"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_3_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Job seekers wanted more personalized recommendations
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_4_flower-2)">
                              <mask
                                id="cs_mask_4_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_4_flower-2)">
                                <path
                                  fill="#EAB308"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_4)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_4"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EAB308"></stop>
                                <stop offset="1" stopColor="#CA8A04"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_4_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Mobile usage was higher than expected during job
                          searches
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* Later Insights */}
                  <div className="bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-2xl p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl">
                        Later Insights
                      </h3>
                    </div>

                    <ul className="space-y-6">
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_5_flower-2)">
                              <mask
                                id="cs_mask_5_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_5_flower-2)">
                                <path
                                  fill="#EF4444"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_5)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_5"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EF4444"></stop>
                                <stop offset="1" stopColor="#DC2626"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_5_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          AI-generated content needed human oversight for
                          authenticity
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_6_flower-2)">
                              <mask
                                id="cs_mask_6_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_6_flower-2)">
                                <path
                                  fill="#EF4444"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_6)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_6"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EF4444"></stop>
                                <stop offset="1" stopColor="#DC2626"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_6_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Users preferred gradual AI assistance over full
                          automation
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_7_flower-2)">
                              <mask
                                id="cs_mask_7_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_7_flower-2)">
                                <path
                                  fill="#EF4444"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_7)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_7"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EF4444"></stop>
                                <stop offset="1" stopColor="#DC2626"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_7_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Trust in AI recommendations increased with
                          transparency
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 mt-1 flex-shrink-0 animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "ease-in-out",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="16"
                            height="16"
                            className="w-full h-full"
                          >
                            <g clipPath="url(#cs_clip_8_flower-2)">
                              <mask
                                id="cs_mask_8_flower-2"
                                style={{ maskType: "alpha" }}
                                width="200"
                                height="190"
                                x="0"
                                y="5"
                                maskUnits="userSpaceOnUse"
                              >
                                <path
                                  fill="#fff"
                                  d="M106.086 101.973c125.219 40.51 75.067 109.249-2.324 3.183C181.153 211.222 100 237.478 100 106.372c0 131.106-81.146 104.85-3.762-1.216-77.384 106.066-127.543 37.327-2.324-3.183-125.219 40.51-125.219-44.478 0-3.94-125.219-40.517-75.06-109.257 2.324-3.184C18.854-11.224 100-37.48 100 93.633c0-131.113 81.153-104.857 3.762 1.216 77.391-106.073 127.543-37.333 2.324 3.183 125.219-40.516 125.219 44.451 0 3.941z"
                                ></path>
                              </mask>
                              <g mask="url(#cs_mask_8_flower-2)">
                                <path
                                  fill="#EF4444"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                                <path
                                  fill="url(#paint0_linear_748_4701_8)"
                                  d="M200 0H0v200h200V0z"
                                ></path>
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_748_4701_8"
                                x1="158.5"
                                x2="29"
                                y1="12.5"
                                y2="200"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#EF4444"></stop>
                                <stop offset="1" stopColor="#DC2626"></stop>
                              </linearGradient>
                              <clipPath id="cs_clip_8_flower-2">
                                <path fill="#fff" d="M0 0H200V200H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                          Success metrics should focus on user confidence and
                          time saved
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Guide / Design System Section */}
        <section
          ref={designSystemRef}
          data-section="design-system"
          className="py-16 bg-neutral-10 dark:bg-neutral-90"
        >
          <div className="flex">
            {/* Left margin - 15% */}
            <div className="w-[15%]"></div>

            {/* Main content - 70% */}
            <div className="w-[70%] px-6">
              {/* Section Title */}
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  Design Guide & Components
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent mb-8"></div>
              </div>

              {/* Infinite Scroll Design System Showcase */}
              <div className="w-full h-[800px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden relative">
                <div className="infinite-scroll-container h-full relative">
                  <img
                    src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
                    alt="Emplojd Design System Components"
                    className="design-system-svg w-full h-auto absolute top-0 left-0"
                    onError={(e) => {
                      console.error("SVG failed to load:", e);
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                    onLoad={(e) => {
                      console.log("SVG loaded successfully:", e);
                      const target = e.target as HTMLImageElement;
                      console.log(
                        "Image dimensions:",
                        target.offsetWidth,
                        "x",
                        target.offsetHeight
                      );
                    }}
                  />
                  <img
                    src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
                    alt="Emplojd Design System Components"
                    className="design-system-svg w-full h-auto absolute top-0 left-0"
                    onError={(e) => {
                      console.error("SVG failed to load:", e);
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                    onLoad={(e) => {
                      console.log("SVG loaded successfully:", e);
                      const target = e.target as HTMLImageElement;
                      console.log(
                        "Image dimensions:",
                        target.offsetWidth,
                        "x",
                        target.offsetHeight
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right margin - 15% */}
            <div className="w-[15%]"></div>
          </div>
        </section>

        {/* The Process Section */}
        <section
          ref={processRef}
          data-section="process"
          className="py-16 bg-neutral-3 dark:bg-neutral-90"
        >
          <div className="max-w-[1200px] mx-auto px-8">
            <div
              className="flex justify-center gap-12"
              style={{
                paddingTop: "calc(40vmax / 10)",
                paddingBottom: "calc(40vmax / 10)",
              }}
            >
              <div className="w-[600px]">
                <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  The Process
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>

                {/* Morphing SVG Container */}
                <div
                  ref={processMorphRef}
                  className="mt-8 flex items-center justify-center"
                >
                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 200 200"
                    className="morphing-shape"
                  >
                    <path
                      d="M100 20 C 140 20, 180 60, 180 100 C 180 140, 140 180, 100 180 C 60 180, 20 140, 20 100 C 20 60, 60 20, 100 20 Z"
                      fill="url(#gradient1)"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{
                            stopColor: "#8B5CF6",
                            stopOpacity: 0.3,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor: "#EC4899",
                            stopOpacity: 0.3,
                          }}
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{
                            stopColor: "#8B5CF6",
                            stopOpacity: 0.8,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor: "#EC4899",
                            stopOpacity: 0.8,
                          }}
                        />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Hidden shapes for morphing */}
                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 200 200"
                    style={{ display: "none" }}
                  >
                    <path
                      d="M100 20 L 180 100 L 100 180 L 20 100 Z"
                      fill="url(#gradient1)"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                    />
                  </svg>

                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 200 200"
                    style={{ display: "none" }}
                  >
                    <path
                      d="M100 20 L 160 40 L 180 100 L 160 160 L 100 180 L 40 160 L 20 100 L 40 40 Z"
                      fill="url(#gradient1)"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                    />
                  </svg>

                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 200 200"
                    style={{ display: "none" }}
                  >
                    <path
                      d="M100 20 C 120 20, 140 30, 150 50 C 160 70, 160 90, 150 110 C 140 130, 120 140, 100 140 C 80 140, 60 130, 50 110 C 40 90, 40 70, 50 50 C 60 30, 80 20, 100 20 Z"
                      fill="url(#gradient1)"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-[600px]">
                <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                  {processSteps ? (
                    processSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold mt-1">
                          •
                        </span>
                        <span>{step}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold mt-1">
                          •
                        </span>
                        <span>Research & Discovery</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold mt-1">
                          •
                        </span>
                        <span>Design & Prototyping</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold mt-1">
                          •
                        </span>
                        <span>Testing & Iteration</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsRef} data-section="results" className="py-16">
          <div className="flex">
            {/* Left margin - 10% */}
            <div className="w-[10%]"></div>

            {/* Main content - 80% */}
            <div className="w-[80%] px-6">
              {/* Section Title */}
              <div className="flex justify-start max-w-[1200px] mx-auto px-8 mb-8">
                <div className="w-[600px]">
                  <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
                    Results
                  </h2>
                  <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
                </div>
              </div>

              {/* Video Showcase Box */}
              <div className="w-full h-[800px] bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-2xl flex items-center justify-center mb-16">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      className="w-10 h-10 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-neutral-80 dark:text-neutral-20 text-xl font-medium mb-2">
                    Live Website / Prototype Video
                  </p>
                  <p className="text-neutral-60 dark:text-neutral-40 text-base">
                    Showcase of the final product in action
                  </p>
                </div>
              </div>
            </div>

            {/* Right margin - 10% */}
            <div className="w-[10%]"></div>
          </div>
        </section>

        {/* Mockup Section - Full Width */}
        <section ref={mockupRef} className="w-full">
          {/* 60/40 Mockup Layout */}
          <div className="flex gap-0">
            {/* Left Container - 60% */}
            <div className="w-[60%] bg-neutral-20 dark:bg-neutral-80 p-8 h-[800px]">
              <div className="grid grid-cols-2 gap-8 h-full items-center">
                {/* Mockup Placeholder 1 */}
                <div className="h-80 bg-neutral-30 dark:bg-neutral-70 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                    Mockup 1
                  </span>
                </div>
                {/* Mockup Placeholder 2 */}
                <div className="h-80 bg-neutral-30 dark:bg-neutral-70 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                    Mockup 2
                  </span>
                </div>
              </div>
            </div>

            {/* Right Container - 40% */}
            <div className="w-[40%] bg-neutral-30 dark:bg-neutral-70 p-8 h-[800px]">
              <div className="h-full flex items-center justify-center">
                {/* Mockup Placeholder 3 */}
                <div className="h-80 w-4/5 bg-neutral-40 dark:bg-neutral-60 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                    Mockup 3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Mockup Section */}
          <div className="w-full bg-neutral-10 dark:bg-neutral-90 p-8 h-[800px]">
            <div className="grid grid-cols-2 gap-12 h-full items-center">
              {/* Mockup Placeholder 4 */}
              <div className="h-80 bg-neutral-20 dark:bg-neutral-80 rounded-lg flex items-center justify-center">
                <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                  Mockup 4
                </span>
              </div>
              {/* Mockup Placeholder 5 */}
              <div className="h-80 bg-neutral-20 dark:bg-neutral-80 rounded-lg flex items-center justify-center">
                <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                  Mockup 5
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Other Case Studies Section */}
        <section className="py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-95 dark:to-neutral-90">
          <div className="flex">
            {/* Left margin - 10% */}
            <div className="w-[10%]"></div>

            {/* Main content - 80% */}
            <div className="w-[80%] px-8">
              {/* Section Title */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-4">
                  Explore More Case Studies
                </h2>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed max-w-2xl mx-auto">
                  Discover more of my design work and see how I approach
                  different challenges across various industries and project
                  types.
                </p>
              </div>

              {/* Case Studies Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Emplojd Case Study */}
                <Link
                  href="/case-studies/emplojd"
                  className="group relative overflow-hidden bg-neutral-0 dark:bg-neutral-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="aspect-[3/2] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-200 transition-colors">
                        Emplojd
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed">
                        AI-powered job search platform with personalized
                        recommendations and cover letter generation
                      </p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm">
                          View Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* ZMartRest AI Case Study */}
                <Link
                  href="/case-studies/zmartrest-ai"
                  className="group relative overflow-hidden bg-neutral-0 dark:bg-neutral-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="aspect-[3/2] bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-orange-200 transition-colors">
                        ZMartRest AI
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed">
                        AI-powered restaurant management system with intelligent
                        inventory and ordering
                      </p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm">
                          View Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Noted App Case Study */}
                <Link
                  href="/case-studies/noted-app"
                  className="group relative overflow-hidden bg-neutral-0 dark:bg-neutral-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="aspect-[3/2] bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-pink-200 transition-colors">
                        Noted App
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed">
                        Smart note-taking app with AI-powered organization and
                        search capabilities
                      </p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm">
                          View Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right margin - 10% */}
            <div className="w-[10%]"></div>
          </div>
        </section>

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
