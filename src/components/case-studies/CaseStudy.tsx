"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useNavbar } from "@/contexts/NavbarContext";
import Footer from "@/components/layout/Footer";
import VerticalFloatingNavbar from "@/components/layout/VerticalFloatingNavbar";
import Hero from "./sections/Hero";
import Summary from "./sections/Summary";
import About from "./sections/About";
import BusinessObjective from "./sections/BusinessObjective";
import Problem from "./sections/Problem";
import Challenge from "./sections/Challenge";
import GoalsAndConstraints from "./sections/GoalsAndConstraints";
import Solution from "./sections/Solution";
import Craft from "./sections/Craft";
import DesignExplorations from "./sections/DesignExplorations";
import DesignSystem from "./sections/DesignSystem";
import Process from "./sections/Process";
import Workshop from "./sections/Workshop";
import Insights from "./sections/Insights";
import ChallengesLearnings from "./sections/ChallengesLearnings";
import Results from "./sections/Results";
import Mockups from "./sections/Mockups";
import OtherStudies from "./sections/OtherStudies";
const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface Section {
  id: string;
  label: string;
  sections?: string[];
}

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string | string[] | React.ReactNode;
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
  problemText?: React.ReactNode;
  excludeIds?: string[];
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
    {
      id: "discovery",
      label: "Discovery",
      sections: ["summary", "about", "business-objective"],
    },
    {
      id: "research-strategy",
      label: "Research & Strategy",
      sections: ["challenge", "solution"],
    },
    {
      id: "design",
      label: "Design",
      sections: ["craft", "design-explorations", "design-system"],
    },
    {
      id: "approach",
      label: "Approach",
      sections: ["process", "insights"],
    },
    { id: "outcomes", label: "Outcomes", sections: ["insights", "results"] },
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
  problemText,
  excludeIds = [],
}: CaseStudyProps) => {
  const router = useRouter();
  const morphRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const businessObjectiveRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const goalsAndConstraintsRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLElement>(null);
  const insightsRef = useRef<HTMLElement>(null);

  const craftRef = useRef<HTMLElement>(null);
  const designExplorationsRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const processMorphRef = useRef<HTMLDivElement>(null);
  const { setActiveSection, activeSection } = useNavbar();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDesignExplorationIndex, setCurrentDesignExplorationIndex] =
    useState(0);
  const [currentPrototypeIndex, setCurrentPrototypeIndex] = useState(0);
  const [prototypePositions, setPrototypePositions] = useState([0, 1, 2]); // [left, middle, right]
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isPrototypeSectionVisible, setIsPrototypeSectionVisible] =
    useState(true);

  const textContainerRef = useRef<HTMLDivElement>(null);
  const craftTextContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleCaseStudiesClick = () => {
    // Navigate to Projects page instead of home
    router.push("/projects");
  };

  const nextImage = () => {
    // Animate text out with GSAP
    if (craftTextContainerRef.current) {
      gsap.to(craftTextContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev === 2 ? 0 : prev + 1));
          // Animate text in with GSAP
          gsap.to(craftTextContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setCurrentImageIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    // Animate text out with GSAP
    if (craftTextContainerRef.current) {
      gsap.to(craftTextContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev === 0 ? 2 : prev - 1));
          // Animate text in with GSAP
          gsap.to(craftTextContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? 2 : prev - 1));
    }
  };

  const nextDesignExploration = () => {
    // Animate text out with GSAP
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentDesignExplorationIndex((prev) =>
            prev === 5 ? 0 : prev + 1
          );
          // Animate text in with GSAP
          gsap.to(textContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const prevDesignExploration = () => {
    // Animate text out with GSAP
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentDesignExplorationIndex((prev) =>
            prev === 0 ? 5 : prev - 1
          );
          // Animate text in with GSAP
          gsap.to(textContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }
  };

  // Prototype showcase handling functions
  const handlePrototypeClick = (clickedIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (clickedIndex === leftPosition) {
      // Clicking the active (left) prototype - toggle video play/pause
      setIsVideoPlaying(!isVideoPlaying);
    } else if (clickedIndex === middlePosition) {
      // Clicking the middle prototype - rotate positions
      setPrototypePositions([middlePosition, rightPosition, leftPosition]);
      setCurrentPrototypeIndex(middlePosition);
    } else if (clickedIndex === rightPosition) {
      // Clicking the right prototype - rotate positions
      setPrototypePositions([rightPosition, leftPosition, middlePosition]);
      setCurrentPrototypeIndex(rightPosition);
    }
  };

  const getPrototypePosition = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "left-1/2 transform -translate-x-[400px] -translate-y-6 z-20";
    } else if (prototypeIndex === middlePosition) {
      return "left-1/2 transform -translate-x-1/2 translate-y-6 z-10";
    } else {
      return "left-1/2 transform translate-x-[52px] translate-y-12 z-5";
    }
  };

  const getPrototypeStyling = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "border-purple-400 shadow-2xl shadow-purple-500/25";
    } else if (prototypeIndex === middlePosition) {
      return "border-neutral-600/60 shadow-lg shadow-neutral-900/20 blur-sm";
    } else {
      return "border-neutral-600/60 shadow-lg shadow-neutral-900/20 blur-sm";
    }
  };

  const getPillText = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];

    if (prototypeIndex === leftPosition) {
      // Active prototype - show play/pause state
      return isVideoPlaying ? "PAUSE" : "PLAY";
    } else {
      // Non-active prototype - show flow description
      const flowNames = [
        "COVER LETTER FLOW",
        "SAVED LETTERS FLOW",
        "USER PROFILE FLOW",
      ];
      return `SEE ${flowNames[prototypeIndex]}`;
    }
  };

  const handleSectionClick = (sectionId: string) => {
    // Find the section group and scroll to the first section in that group
    const sectionGroup = sections.find((section) => section.id === sectionId);
    if (
      sectionGroup &&
      sectionGroup.sections &&
      sectionGroup.sections.length > 0
    ) {
      const firstSectionId = sectionGroup.sections[0];
      setActiveSection(firstSectionId);

      // Scroll to the first section in the group
      if (firstSectionId === "summary") {
        summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (firstSectionId === "challenge") {
        challengeRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (firstSectionId === "goals-and-constraints") {
        goalsAndConstraintsRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (firstSectionId === "craft") {
        craftRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (firstSectionId === "process") {
        processRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (firstSectionId === "insights") {
        insightsRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // GSAP Morphing Effect
  useEffect(() => {
    // Safely register MorphSVGPlugin with error handling
    try {
      gsap.registerPlugin(MorphSVGPlugin);
    } catch (error) {
      console.warn(
        "MorphSVGPlugin not available, falling back to scale animation"
      );
    }

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

    // Check if MorphSVGPlugin is available and we have the required elements
    const hasMorphSVG = typeof MorphSVGPlugin !== "undefined";
    const hasRequiredElements = morphPath && starPath && trianglePath;

    if (hasMorphSVG && hasRequiredElements) {
      // Use morphing animation
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
    } else {
      // Fallback to scale animation
      const hoverTimeline = gsap.timeline({ paused: true });

      // Scale and color change on hover
      hoverTimeline.to(morphContainer, {
        scale: 1.1,
        "--gradient-from": "#a855f7",
        "--gradient-to": "#9333ea",
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Handle hover events
      const handleMouseEnter = () => {
        console.log("Button hover enter - scaling up");
        setIsHovered(true);
        hoverTimeline.play();
      };

      const handleMouseLeave = () => {
        console.log("Button hover leave - scaling back");
        setIsHovered(false);
        hoverTimeline.reverse();
      };

      morphContainer.addEventListener("mouseenter", handleMouseEnter);
      morphContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        morphContainer.removeEventListener("mouseenter", handleMouseEnter);
        morphContainer.removeEventListener("mouseleave", handleMouseLeave);
        hoverTimeline.kill();
      };
    }
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

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get section positions
      const summaryTop = summaryRef.current?.offsetTop || 0;
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const businessObjectiveTop = businessObjectiveRef.current?.offsetTop || 0;
      const problemTop = problemRef.current?.offsetTop || 0;
      const processTop = processRef.current?.offsetTop || 0;
      const challengeTop = challengeRef.current?.offsetTop || 0;
      const goalsAndConstraintsTop = goalsAndConstraintsRef.current?.offsetTop || 0;
      const solutionTop = solutionRef.current?.offsetTop || 0;
      const craftTop = craftRef.current?.offsetTop || 0;
      const designExplorationsTop =
        designExplorationsRef.current?.offsetTop || 0;
      const roleTop = roleRef.current?.offsetTop || 0;
      const insightsTop = insightsRef.current?.offsetTop || 0;

      const resultsTop = resultsRef.current?.offsetTop || 0;

      // Calculate section boundaries
      const summaryBottom =
        summaryTop + (summaryRef.current?.offsetHeight || 0);
      const aboutBottom = aboutTop + (aboutRef.current?.offsetHeight || 0);
      const businessObjectiveBottom =
        businessObjectiveTop +
        (businessObjectiveRef.current?.offsetHeight || 0);
      const problemBottom =
        problemTop + (problemRef.current?.offsetHeight || 0);
      const processBottom =
        processTop + (processRef.current?.offsetHeight || 0);
      const challengeBottom =
        challengeTop + (challengeRef.current?.offsetHeight || 0);
      const goalsAndConstraintsBottom =
        goalsAndConstraintsTop + (goalsAndConstraintsRef.current?.offsetHeight || 0);
      const solutionBottom =
        solutionTop + (solutionRef.current?.offsetHeight || 0);
      const craftBottom = craftTop + (craftRef.current?.offsetHeight || 0);
      const designExplorationsBottom =
        designExplorationsTop +
        (designExplorationsRef.current?.offsetHeight || 0);
      const roleBottom = roleTop + (roleRef.current?.offsetHeight || 0);
      const insightsBottom =
        insightsTop + (insightsRef.current?.offsetHeight || 0);

      // Calculate Results section bottom
      const resultsBottom =
        resultsTop + (resultsRef.current?.offsetHeight || 0);

      // Determine which section is currently in view
      const scrollCenter = scrollY + windowHeight / 2;

      // Find which section group should be active based on current scroll position
      let activeSectionId = "summary";

      if (scrollCenter < summaryBottom) {
        activeSectionId = "summary";
      } else if (scrollCenter >= aboutTop && scrollCenter < aboutBottom) {
        activeSectionId = "about";
      } else if (
        scrollCenter >= problemTop &&
        scrollCenter < problemBottom
      ) {
        activeSectionId = "problem";
      } else if (
        scrollCenter >= businessObjectiveTop &&
        scrollCenter < businessObjectiveBottom
      ) {
        activeSectionId = "business-objective";
      } else if (scrollCenter >= processTop && scrollCenter < processBottom) {
        activeSectionId = "process";
      } else if (
        scrollCenter >= goalsAndConstraintsTop &&
        scrollCenter < goalsAndConstraintsBottom
      ) {
        activeSectionId = "goals-and-constraints";
      } else if (
        scrollCenter >= challengeTop &&
        scrollCenter < challengeBottom
      ) {
        activeSectionId = "challenge";
      } else if (scrollCenter >= solutionTop && scrollCenter < solutionBottom) {
        activeSectionId = "solution";
      } else if (scrollCenter >= craftTop && scrollCenter < craftBottom) {
        activeSectionId = "craft";
      } else if (
        scrollCenter >= designExplorationsTop &&
        scrollCenter < designExplorationsBottom
      ) {
        activeSectionId = "design-explorations";
      } else if (scrollCenter >= roleTop && scrollCenter < roleBottom) {
        activeSectionId = "role";
      } else if (scrollCenter >= insightsTop && scrollCenter < insightsBottom) {
        activeSectionId = "insights";
      } else if (scrollCenter >= resultsTop && scrollCenter < resultsBottom) {
        activeSectionId = "results";
      }

      // Find which group this section belongs to and set the active group
      const activeGroup = sections.find(
        (group) => group.sections && group.sections.includes(activeSectionId)
      );

      if (activeGroup) {
        setActiveSection(activeGroup.id);
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

  // Insights Section Spinning Icons Effect with GSAP
  useEffect(() => {
    // Select all SVG icon containers in the insights sections
    const spinningIcons = document.querySelectorAll(".spinning-icon");

    spinningIcons.forEach((icon) => {
      gsap.to(icon, {
        rotation: 360,
        duration: 8, // Slower rotation (8 seconds per full rotation)
        repeat: -1,
        ease: "power2.inOut", // Smooth ease in/out instead of linear
      });
    });
  }, []);

  // Start video after page is fully loaded
  useEffect(() => {
    const handleLoad = () => {
      const video = document.querySelector("video");
      if (video) {
        video.play().catch((error) => {
          console.log("Video autoplay failed:", error);
        });
      }
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Wait for page to fully load
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Control video playback based on isVideoPlaying state
  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (isVideoPlaying) {
        video.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      } else {
        video.pause();
      }
    });
  }, [isVideoPlaying]);

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      try {
        // Kill all GSAP animations to prevent DOM manipulation conflicts
        gsap.killTweensOf("*");

        // Specific cleanup for refs with null checks
        const refs = [
          textContainerRef.current,
          craftTextContainerRef.current,
          summaryRef.current,
          aboutRef.current,
          businessObjectiveRef.current,
          problemRef.current,
          processRef.current,
          challengeRef.current,
          goalsAndConstraintsRef.current,
          solutionRef.current,
          roleRef.current,
          insightsRef.current,
          craftRef.current,
          designExplorationsRef.current,
          resultsRef.current,
          processMorphRef.current,
        ];

        refs.forEach((ref) => {
          if (ref) {
            gsap.killTweensOf(ref);
          }
        });

        // Clear all GSAP timelines
        gsap.globalTimeline.clear();
      } catch (error) {
        console.warn("Error during GSAP cleanup:", error);
      }
    };
  }, []);

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // Observe all fade-in sections
    const fadeInSections = document.querySelectorAll(".fade-in-section");
    fadeInSections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      fadeInSections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Click outside tooltip handler for mobile/tablet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tooltip = document.getElementById("chas-tooltip");
      const chasButton = document.querySelector("[data-chas-button]");

      if (tooltip && chasButton && window.innerWidth < 1024) {
        if (
          !chasButton.contains(event.target as Node) &&
          !tooltip.contains(event.target as Node)
        ) {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.remove("pointer-events-auto");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Intersection Observer for prototype section visibility
  useEffect(() => {
    const prototypeSection = document.querySelector('[data-section="results"]');
    if (!prototypeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPrototypeSectionVisible(true);
            // Always resume video playback when section comes into view
            setIsVideoPlaying(true);
            // Directly play all visible videos
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.play().catch((error) => {
                  console.log("Video play failed:", error);
                });
              }
            });
          } else {
            setIsPrototypeSectionVisible(false);
            // Pause video playback when section goes out of view
            setIsVideoPlaying(false);
            // Directly pause all videos
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.pause();
              }
            });
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Add some margin for better UX
      }
    );

    observer.observe(prototypeSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* TODO: FIX REQUIRED - VerticalFloatingNavbar has issues:
          - Progress bar not updating on scroll
          - Component movement constrained/not following full page scroll
          - Active menu highlighting not working properly
          - TypeScript linter errors */}
      <VerticalFloatingNavbar />
      <div className="animate-fade-in">
        <style jsx>{`
          @keyframes gentle-bob {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes radiate {
            0% {
              box-shadow: 0 0 20px rgba(144, 126, 255, 0.5),
                0 0 40px rgba(144, 126, 255, 0.3),
                0 0 60px rgba(144, 126, 255, 0.1);
            }
            50% {
              box-shadow: 0 0 30px rgba(144, 126, 255, 0.7),
                0 0 60px rgba(144, 126, 255, 0.5),
                0 0 90px rgba(144, 126, 255, 0.3);
            }
            100% {
              box-shadow: 0 0 20px rgba(144, 126, 255, 0.5),
                0 0 40px rgba(144, 126, 255, 0.3),
                0 0 60px rgba(144, 126, 255, 0.1);
            }
          }

          .video-bobbing {
            animation: gentle-bob 3s ease-in-out infinite;
          }

          .radiating-purple-box {
            animation: radiate 3s ease-in-out infinite;
          }

          .cursor-ring {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #907eff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
          }

          .prototype-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid #907eff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.2s ease;
            transform: translate(-50%, -50%);
            background: rgba(144, 126, 255, 0.3);
          }

          /* Fade-in animation classes */
          .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }

          .fade-in-section.fade-in-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
        <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] relative">
          {/* Hero Section with Responsive Layout */}
          {/* Hero Section with Responsive Layout */}
          <Hero
            title={title}
            subtitle={subtitle}
            roleText={roleText}
            companyOrType={companyOrType}
            companyText={companyText}
            yearText={yearText}
            teamRoles={teamRoles}
            technologies={technologies}
            link={link}
            linkText={linkText}
          />

          {/* Summary Section */}
          <Summary description={description} />

          {/* About Section - Only render if "about" is in sections */}
          {sections.some(section => section.sections?.includes("about")) && (
            <About
              aboutText={aboutText}
              appIconPath={appIconPath}
              logotypeBlackPath={logotypeBlackPath}
              logotypeWhitePath={logotypeWhitePath}
            />
          )}

          {/* Business Objective or Problem Section */}
          {sections.some(section => section.sections?.includes("problem")) ? (
            <Problem problemText={problemText} problemRef={problemRef} />
          ) : sections.some(section => section.sections?.includes("business-objective")) ? (
            <BusinessObjective businessObjectivesText={businessObjectivesText} />
          ) : null}

          {/* The challenge or Goals & Constraints Section */}
          {sections.some(section => section.sections?.includes("goals-and-constraints")) ? (
            <GoalsAndConstraints goalsAndConstraintsRef={goalsAndConstraintsRef} />
          ) : sections.some(section => section.sections?.includes("challenge")) ? (
            <Challenge challenge="AI-powered job application platform" />
          ) : null}

          {/* The Solution Section */}
          <Solution solution="AI-powered job application platform" />

          {/* The Craft Section */}
          <Craft />

          {/* Design Explorations Section */}
          <DesignExplorations />

          {/* Design Guide / Design System Section */}
          <DesignSystem />

          {/* The Process Section */}
          <Process processSteps={processSteps} />

          {/* Kickoff Workshop Section */}
          <Workshop />

          {/* Insights Section */}
          <Insights />

          {/* Challenges & Learnings Section */}
          <ChallengesLearnings />

          {/* Results Section */}
          <Results />
        </div>

        {/* Mockup Section - Full Width (Outside main container) */}
        <Mockups />

        {/* Other Case Studies Section */}
        <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] relative">
          <OtherStudies excludeIds={excludeIds} />

          {/* Footer Section */}
          <div className="pt-16 pb-16 pr-4 pl-4">
            <div className="container mx-auto">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
