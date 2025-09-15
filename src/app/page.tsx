"use client";

import VantaBackground from "@/components/VantaBackground";
import AnimatedBlob from "@/components/AnimatedBlob";
import BentoBoxFirstTwo from "@/components/BentoBoxFirstTwo";
import BentoBoxRest from "@/components/BentoBoxRest";
import CaseStudiesShowcase from "@/components/CaseStudiesShowcase";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { gradients, colors } from "@/styles/colors";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();
  const morphRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Refs for entrance animations
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lowCodeRef = useRef<HTMLSpanElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const morphIconRef = useRef<HTMLSpanElement>(null);
  const animatedBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    const morphIcon = morphIconRef.current;
    if (!morphIcon) return;

    const morphPath = morphIcon.querySelector(".morph-path") as SVGPathElement;
    const targets = morphIcon.querySelectorAll(
      ".morph-target"
    ) as NodeListOf<SVGPathElement>;

    if (!morphPath || targets.length === 0) return;

    // Create the morphing timeline - start paused
    const morphTimeline = gsap.timeline({ repeat: -1, paused: true });

    // Add morphing animations for all 9 shapes
    targets.forEach((target, index) => {
      morphTimeline.to(morphPath, {
        morphSVG: target,
        duration: 3,
        ease: "power2.inOut",
      });
    });

    // Return to the first shape to complete the cycle
    morphTimeline.to(morphPath, {
      morphSVG: targets[0],
      duration: 3,
      ease: "power2.inOut",
    });

    // Start the morphing animation after entrance animation completes
    const startMorphing = () => {
      morphTimeline.play();
    };

    // Start morphing after entrance animation (approximately 2.2s total)
    const morphTimer = setTimeout(startMorphing, 2500);

    // Pause/resume on hover
    const handleMouseEnter = () => {
      setIsHovered(true);
      morphTimeline.pause();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      morphTimeline.resume();
    };

    morphIcon.addEventListener("mouseenter", handleMouseEnter);
    morphIcon.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(morphTimer);
      morphIcon.removeEventListener("mouseenter", handleMouseEnter);
      morphIcon.removeEventListener("mouseleave", handleMouseLeave);
      morphTimeline.kill();
    };
  }, [isHovered]);

  // Hero entrance animation
  useEffect(() => {
    // Check if all refs are available
    if (
      !titleRef.current ||
      !lowCodeRef.current ||
      !statementRef.current ||
      !ctaRef.current ||
      !morphIconRef.current ||
      !animatedBlobRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    // Set initial states - start completely hidden
    gsap.set(
      [
        titleRef.current,
        lowCodeRef.current,
        statementRef.current,
        ctaRef.current,
        animatedBlobRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Set morphing icon initial state with scale
    gsap.set(morphIconRef.current, {
      opacity: 0,
      scale: 0.3,
    });

    // Animate all elements together for smoother experience
    tl.to(
      [
        titleRef.current,
        lowCodeRef.current,
        statementRef.current,
        ctaRef.current,
        animatedBlobRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }
    ).to(
      morphIconRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Set client-side flag and mouse tracking for morphing icon tilt effect
  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      console.log("Mouse position:", { x: e.clientX, y: e.clientY });
    };

    // Set initial mouse position to center of screen
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle scrolling to case studies section when coming from case study page
  useEffect(() => {
    const shouldScrollToCaseStudies = sessionStorage.getItem(
      "scrollToCaseStudies"
    );
    if (shouldScrollToCaseStudies === "true") {
      // Clear the flag
      sessionStorage.removeItem("scrollToCaseStudies");

      // Wait a bit for the page to load, then scroll
      setTimeout(() => {
        const element = document.getElementById("case-studies");
        if (element) {
          const offset = 300;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-neutral-0 dark:bg-[#060608]" />
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main>
          {/* Introduction Section */}
          <section
            ref={heroRef}
            id="home"
            className="h-screen relative flex items-center"
          >
            <AnimatedBlob
              ref={animatedBlobRef}
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)", // Purple primary
                secondary: "rgba(168, 85, 247, 0.4)", // Purple secondary
              }}
            />
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
              <div className="text-left w-full flex flex-col justify-start h-full -mt-32 sm:-mt-40 lg:-mt-48">
                {/* Hero content - Responsive layout */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-12">
                  <div className="w-full lg:flex-1">
                    {/* Title Content Container - Easy to manage spacing */}
                    <div className="mt-16 sm:mt-24 lg:mt-32">
                      {/* Morphing SVG Icon - Positioned above title and horizontally centered */}
                      <div className="flex justify-center mb-6 sm:mb-8">
                        <span
                          className="morphing-icon flex-shrink-0 transition-transform duration-300 ease-out pointer-events-auto z-20"
                          ref={morphIconRef}
                          style={{
                            transform: `rotateX(${
                              isClient && typeof window !== "undefined"
                                ? (mousePosition.y - window.innerHeight / 2) *
                                  0.1
                                : 0
                            }deg) rotateY(${
                              isClient && typeof window !== "undefined"
                                ? (mousePosition.x - window.innerWidth / 2) *
                                  0.1
                                : 0
                            }deg)`,
                          }}
                          onMouseEnter={() => {
                            const rotateX =
                              isClient && typeof window !== "undefined"
                                ? (mousePosition.y - window.innerHeight / 2) *
                                  0.1
                                : 0;
                            const rotateY =
                              isClient && typeof window !== "undefined"
                                ? (mousePosition.x - window.innerWidth / 2) *
                                  0.1
                                : 0;
                            console.log("Transform values:", {
                              rotateX,
                              rotateY,
                              isClient,
                              mousePosition,
                            });
                          }}
                          onMouseMove={() => {
                            console.log(
                              "SVG mouse move, isClient:",
                              isClient,
                              "mousePosition:",
                              mousePosition
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 200 200"
                            width="40"
                            height="40"
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                          >
                            {/* Main morphing path */}
                            <path
                              d="M120 80L100 0 80 80 0 100l80 20 20 80 20-80 80-20-80-20z"
                              fill="url(#purpleGradient)"
                              className="morph-path"
                            />

                            {/* Hidden target paths for morphing - Scrambled Order */}
                            {/* Misc 10 */}
                            <path
                              d="M136 0l-36 36L64 0H0v64l36 36-36 36v64h64l36-36 36 36h64v-64l-36-36 36-36V0h-64z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Star 4 */}
                            <path
                              d="M15.535 188.281c40.654-30.669 60.98-46.003 84.465-46.003 23.485 0 43.812 15.334 84.466 46.003L200 200l-11.719-15.534c-30.669-40.654-46.003-60.981-46.003-84.466 0-23.484 15.334-43.811 46.003-84.465L200 0l-15.534 11.72C143.812 42.388 123.485 57.722 100 57.722c-23.484 0-43.811-15.334-84.465-46.003L0 0l11.72 15.535C42.387 56.19 57.721 76.515 57.721 100c0 23.485-15.334 43.812-46.002 84.465L0 200l15.535-11.719z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Ellipse 8 */}
                            <path
                              d="M139 39c0 21.54-17.461 39-39 39-21.54 0-39-17.46-39-39S78.46 0 100 0c21.539 0 39 17.46 39 39zM139 161c0 21.539-17.461 39-39 39-21.54 0-39-17.461-39-39s17.46-39 39-39c21.539 0 39 17.461 39 39zM161 139c-21.539 0-39-17.461-39-39 0-21.54 17.461-39 39-39s39 17.46 39 39c0 21.539-17.461 39-39 39zM39 139c-21.54 0-39-17.461-39-39 0-21.54 17.46-39 39-39s39 17.46 39 39c0 21.539-17.46 39-39 39z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Flower 15 */}
                            <path
                              d="M193.481 31.456c13.436 23.267 5.44 52.966-17.886 66.43l-1.522.88c-15.647 9.031-25.278 25.67-25.278 43.672v2.001c0 26.82-21.845 48.561-48.793 48.561s-48.794-21.741-48.794-48.561v-1.998c0-18.002-9.631-34.642-25.278-43.674l-1.525-.88C1.079 84.423-6.917 54.723 6.519 31.456 20.031 8.058 50.078.046 73.534 13.586l1.205.695a50.559 50.559 0 0050.522 0l1.205-.696c23.456-13.54 53.503-5.527 67.015 17.87z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Moon 12 */}
                            <path
                              d="M100.503 101.907C107.74 125.692 129.849 143 156 143c15.184 0 29.006-5.835 39.345-15.385 1.138-1.051 3.017-.565 3.342.95A59.235 59.235 0 01200 141c0 32.585-26.415 59-59 59s-59-26.415-59-59c0-15.679 6.116-29.93 16.093-40.497C74.308 107.74 57 129.849 57 156c0 15.185 5.835 29.006 15.385 39.345 1.051 1.138.565 3.018-.95 3.343A59.236 59.236 0 0159 200c-32.585 0-59-26.415-59-59 0-32.584 26.415-59 59-59 15.68 0 29.93 6.117 40.497 16.093C92.26 74.308 70.15 57 43.999 57c-15.184 0-29.005 5.835-39.344 15.385-1.138 1.051-3.018.565-3.343-.95A59.234 59.234 0 010 59C0 26.415 26.415 0 59 0c32.584 0 59 26.415 59 59 0 15.68-6.117 29.93-16.093 40.497C125.692 92.26 143 70.151 143 44c0-15.185-5.835-29.006-15.385-39.345-1.051-1.138-.565-3.017.95-3.342A59.23 59.23 0 01141 0c32.585 0 59 26.415 59 59s-26.415 59-59 59c-15.68 0-29.93-6.116-40.497-16.093z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Rectangle 2 */}
                            <path
                              d="M32 32h136v136h-136z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Star 1 */}
                            <path
                              d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Ellipse 3 */}
                            <path
                              d="M200 30c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30zM200 170c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30zM151 100c0 28.167-22.833 51-51 51-28.166 0-51-22.833-51-51 0-28.166 22.834-51 51-51 28.167 0 51 22.834 51 51zM60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30zM60 170c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Moon 2 */}
                            <path
                              d="M186.048 180.392c4.775-4.775 8.458-10.548 10.839-16.989 2.381-6.441 3.413-13.425 3.038-20.553-.375-7.127-2.151-14.258-5.225-20.987-3.074-6.728-7.387-12.922-12.692-18.227-5.305-5.305-11.498-9.618-18.227-12.692-6.728-3.074-13.86-4.85-20.987-5.225-7.128-.375-14.112.658-20.553 3.039-6.441 2.38-12.214 6.064-16.989 10.838l80.796 80.796zM13.952 19.607C9.177 24.38 5.494 30.154 3.113 36.596.733 43.035-.3 50.02.075 57.148c.375 7.127 2.15 14.26 5.225 20.988 3.074 6.728 7.387 12.922 12.692 18.227 5.305 5.305 11.498 9.618 18.227 12.692 6.728 3.074 13.86 4.849 20.987 5.224 7.128.375 14.111-.657 20.553-3.038 6.441-2.381 12.214-6.064 16.989-10.839L13.952 19.607zM19.608 186.048c4.774 4.774 10.547 8.457 16.988 10.838 6.442 2.381 13.426 3.414 20.553 3.038 7.127-.375 14.259-2.15 20.987-5.224 6.729-3.074 12.922-7.387 18.228-12.692 5.305-5.305 9.617-11.499 12.692-18.227 3.074-6.729 4.849-13.86 5.224-20.988.375-7.127-.657-14.111-3.038-20.552-2.381-6.442-6.064-12.214-10.839-16.989l-80.795 80.796zM180.39 13.952c-4.774-4.775-10.547-8.458-16.988-10.839C156.96.733 149.977-.3 142.849.075c-7.127.375-14.259 2.15-20.987 5.225-6.729 3.074-12.922 7.387-18.228 12.692-5.305 5.305-9.618 11.498-12.692 18.227-3.074 6.728-4.85 13.86-5.224 20.987-.375 7.128.657 14.112 3.038 20.553 2.381 6.441 6.064 12.214 10.839 16.989l80.795-80.796z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Polygon 7 */}
                            <path
                              d="M86.449 3.601a27.296 27.296 0 0127.102 0l63.805 36.514C185.796 44.945 191 53.9 191 63.594v72.812c0 9.694-5.204 18.649-13.644 23.479l-63.805 36.514a27.3 27.3 0 01-27.102 0l-63.805-36.514C14.204 155.055 9 146.1 9 136.406V63.594c0-9.694 5.204-18.649 13.644-23.48L86.45 3.602z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Ellipse 10 */}
                            <path
                              d="M100 200c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100zm55-151a4 4 0 00-4-4H49a4 4 0 00-4 4v102a4 4 0 004 4h102a4 4 0 004-4V49z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Moon 5 */}
                            <path
                              d="M50 102a75 75 0 00150 0H50zM0 98a75 75 0 11150 0H0z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Ellipse 12 */}
                            <path
                              d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Misc 5 */}
                            <path
                              d="M145 8c30.376 0 55 25 55 60 0 70-75 110-100 125C75 178 0 138 0 68 0 33 25 8 55 8c18.6 0 35 10 45 20 10-10 26.4-20 45-20z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Star 6 (current) */}
                            <path
                              d="M120 80L100 0 80 80 0 100l80 20 20 80 20-80 80-20-80-20z"
                              fill="none"
                              className="morph-target"
                            />

                            {/* Gradient definition */}
                            <defs>
                              <linearGradient
                                id="purpleGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="50%" stopColor="#A855F7" />
                                <stop offset="100%" stopColor="#C084FC" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      </div>

                      {/* Main title - Responsive typography */}
                      <div className="relative w-full">
                        {/* Title */}
                        <h1
                          ref={titleRef}
                          className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[7.5rem] font-extrabold tracking-tight leading-[0.9] sm:leading-[0.8] lg:leading-[0.6] mb-32 sm:mb-40 lg:mb-48 text-left sm:text-center w-full"
                        >
                          <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                            Product Designer
                          </span>
                        </h1>
                      </div>
                    </div>

                    {/* Low-code Developer text - Responsive positioning */}
                    <div className="mb-6 -mt-24 sm:-mt-32 lg:-mt-40">
                      <div className="flex justify-start md:justify-end">
                        <span
                          ref={lowCodeRef}
                          className="text-2xl xl:text-3xl font-medium font-hanken tracking-wide"
                        >
                          <span
                            className="bg-clip-text text-transparent"
                            style={{
                              backgroundImage: isDark
                                ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                                : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                            }}
                          >
                            & Low-code Developer
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Hero statement - Responsive layout */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16 w-full">
                      <div className="flex-1 max-w-full lg:max-w-[64rem]">
                        <div ref={statementRef} className="hero-statement">
                          {/* First line */}
                          <div className="statement-line flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                            <span className="word text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                              I
                            </span>
                            <span className="word text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                              create
                            </span>
                            <span className="word highlight">
                              <span className="highlight-text text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                                digital
                              </span>
                              <span className="highlight-bg"></span>
                            </span>
                            <span className="word highlight">
                              <span className="highlight-text text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                                products
                              </span>
                              <span className="highlight-bg"></span>
                            </span>
                          </div>
                          {/* Second line */}
                          <div className="statement-line flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                            <span className="word text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                              and
                            </span>
                            <span className="word text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                              make
                            </span>
                            <span className="word highlight">
                              <span className="highlight-text text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                                experiences
                              </span>
                              <span className="highlight-bg"></span>
                            </span>
                            <span className="word text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                              happen.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Box - Positioned just below CTA button within hero section */}
            <div className="absolute bottom-8 left-0 right-0 z-10 transform translate-y-10">
              <BentoBoxFirstTwo />
            </div>
          </section>
        </main>

        {/* Case Studies Showcase Section */}
        <div id="case-studies" className="pt-16">
          <CaseStudiesShowcase />
        </div>

        {/* Experience Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-regular text-neutral-60 dark:text-neutral-40">
                  02
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span
                    className="bg-clip-text text-transparent font-hanken"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                        : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                    }}
                  >
                    Experience
                  </span>
                </h2>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-12">
              {/* Experience Entry 1 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    JAN, 2025 - MAY, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    Product Designer, Zmartrest AI
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    As an intern at Zmartrest AI, I contributed to the design of
                    a cutting-edge leadership tool that functions as a pulse
                    monitor for workplace performance. Working on the platform
                    that captures team performance data through biodata and
                    conversations, I helped create intuitive interfaces for
                    AI-powered coaching and KPI visualization. My role involved
                    designing user experiences that make complex performance
                    insights accessible to leaders at all levels, from team
                    managers to board executives.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/logos/Experience/zmartrest-logo-dark-mode.svg"
                          : "/logos/Experience/zmartrest-logo-light-mode.svg"
                      }
                      alt="Zmartrest AI Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href="https://www.zmartrest.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-neutral-100 dark:border-neutral-0 text-neutral-100 dark:text-neutral-0 font-semibold text-base sm:text-lg rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-0 hover:text-neutral-0 dark:hover:text-neutral-100 transition-all duration-200"
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Experience Entry 2 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    NOV, 2024 - JAN, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    UX/UI Designer, Xbrandify
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    As an intern at Xbrandify, I worked on the platform that
                    builds customer journeys through branded experiences and
                    community building. I contributed to designing interfaces
                    for event management, branded travel clubs, and community
                    features that help brands turn inspiration into measurable
                    growth. My work focused on creating user experiences that
                    engage audiences in ways they love while proving ROI and
                    building lasting loyalty through experiential marketing.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/logos/Experience/xbrandify-logo-dark-mode.svg"
                          : "/logos/Experience/xbrandify-logo-light-mode.svg"
                      }
                      alt="Xbrandify Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href="https://www.yourbrandtravel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-neutral-100 dark:border-neutral-0 text-neutral-100 dark:text-neutral-0 font-semibold text-base sm:text-lg rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-0 hover:text-neutral-0 dark:hover:text-neutral-100 transition-all duration-200"
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Experience Entry 3 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    MAY, 2025
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    Product Designer & Developer, Noted
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Led the design and development of Noted, a comprehensive
                    note-taking and productivity platform. I handled both the
                    user experience design and frontend development, creating an
                    intuitive interface that helps users organize their thoughts
                    and boost productivity. The project involved full-stack
                    development skills combined with user-centered design
                    principles to deliver a seamless digital experience.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/logos/Experience/noted-logo-dark-mode.svg"
                          : "/logos/Experience/noted-logo-light-mode.svg"
                      }
                      alt="Noted Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href="https://noted-beta.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-neutral-100 dark:border-neutral-0 text-neutral-100 dark:text-neutral-0 font-semibold text-base sm:text-lg rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-0 hover:text-neutral-0 dark:hover:text-neutral-100 transition-all duration-200"
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Experience Entry 4 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="text-base font-medium text-neutral-60 dark:text-neutral-40 mb-3">
                    SEP, 2024 - NOV, 2024
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 font-instrument-serif">
                    UX/UI Designer, Fokus
                  </h3>
                  <p className="text-base text-neutral-70 dark:text-neutral-30 leading-relaxed max-w-[70ch]">
                    Collaborated with a team of UX/UI designers on the Fokus
                    project, where our primary focus was conducting
                    comprehensive user research and analysis. We implemented a
                    thorough research methodology that included user interviews,
                    usability testing, and competitive analysis to inform our
                    design decisions. Our meticulous approach to understanding
                    user needs and pain points resulted in data-driven design
                    solutions that significantly improved user experience and
                    engagement metrics.
                  </p>
                </div>
                <div className="lg:ml-2 flex-shrink-0 flex items-center gap-6">
                  {/* Company Logo */}
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Image
                      src={
                        isDark
                          ? "/logos/Experience/fokus-logo-dark-mode.svg"
                          : "/logos/Experience/fokus-logo-light-mode.svg"
                      }
                      alt="Fokus Logo"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-neutral-100 dark:border-neutral-0 text-neutral-100 dark:text-neutral-0 font-semibold text-base sm:text-lg rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-0 hover:text-neutral-0 dark:hover:text-neutral-100 transition-all duration-200"
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of Bento Boxes */}
        <BentoBoxRest />

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto pr-4 pl-4 lg:pr-0 lg:pl-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
