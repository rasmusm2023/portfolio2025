"use client";

import CustomCursor from "@/components/CustomCursor";
import ProjectShowcase from "@/components/ProjectShowcase";
import Footer from "@/components/Footer";
import AnimatedBlob from "@/components/AnimatedBlob";
import CircularScrollText from "@/components/CircularScrollText";
import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export default function ProjectsPage() {
  const { isDark } = useTheme();
  const [isCircularTextVisible, setIsCircularTextVisible] = useState(true);

  // Refs for entrance animations
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const circularTextRef = useRef<HTMLDivElement>(null);
  const animatedBlobRef = useRef<HTMLDivElement>(null);
  const titleElementRef = useRef<HTMLHeadingElement>(null);

  // Hero entrance animation
  useEffect(() => {
    // Check if all refs are available
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !subtitleRef.current ||
      !circularTextRef.current ||
      !animatedBlobRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    // Set initial states - start completely hidden
    gsap.set(
      [
        titleRef.current,
        descriptionRef.current,
        subtitleRef.current,
        circularTextRef.current,
        animatedBlobRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Animate all elements together for smoother experience
    tl.to(
      [
        animatedBlobRef.current,
        titleRef.current,
        descriptionRef.current,
        subtitleRef.current,
        circularTextRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll effect for circular text visibility
  useEffect(() => {
    const handleScroll = () => {
      if (titleElementRef.current) {
        const rect = titleElementRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight; // Visible when any part of the title is in the viewport
        setIsCircularTextVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
        <div className="relative z-10">
          <main className="container mx-auto">
            {/* Hero Section */}
            <section
              ref={heroRef}
              className="h-screen relative flex items-center"
            >
              <AnimatedBlob
                ref={animatedBlobRef}
                gradientColors={{
                  primary: isDark
                    ? "rgba(239, 68, 68, 0.6)" // Red primary for dark mode
                    : "rgba(239, 68, 68, 0.8)", // Slightly more opaque red for light mode
                  secondary: isDark
                    ? "rgba(251, 146, 60, 0.4)" // Orange secondary for dark mode
                    : "rgba(251, 146, 60, 0.6)", // Slightly more opaque orange for light mode
                }}
              />

              {/* Circular Scroll Text - Positioned at bottom right of viewport */}
              <div
                ref={circularTextRef}
                className={`absolute bottom-8 right-32 sm:right-36 md:right-40 lg:right-44 xl:right-48 z-20 transition-opacity duration-500 hidden lg:block ${
                  isCircularTextVisible ? "opacity-80" : "opacity-0"
                }`}
              >
                <CircularScrollText
                  text="SCROLL DOWN TO EXPLORE MORE"
                  repetitions={4}
                  textColor="#fb923c"
                  fontSize="12px"
                  radius={88}
                  animationDuration={12}
                  letterSpacing="0.2em"
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
                <div className="text-left w-full">
                  <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[7.5rem] font-extrabold tracking-tight leading-[0.9] sm:leading-[0.8] lg:leading-[0.6] mb-4 sm:mb-6 lg:mb-8"
                  >
                    <span className="[background-image:var(--gradient-hero-work)] dark:[background-image:var(--gradient-hero-work-dark)] bg-clip-text text-transparent font-hanken">
                      Projects
                    </span>
                  </h1>
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mt-8 sm:mt-12 lg:mt-16">
                    <div className="flex-1 max-w-full lg:max-w-[48rem]">
                      <p
                        ref={descriptionRef}
                        className="text-neutral-70 dark:text-neutral-30 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed tracking-wide"
                      >
                        This is a selection of projects to showcase my design
                        process. Moving from clear problem statements to
                        meaningful solutions with a focus on process, impact and
                        learnings.
                      </p>
                    </div>
                    <div className="lg:ml-8 mt-4 lg:mt-0">
                      <span
                        ref={subtitleRef}
                        className="text-2xl sm:text-3xl md:text-4xl font-medium font-hanken tracking-wide"
                      >
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: isDark
                              ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                              : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                          }}
                        >
                          Case Studies
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Studies Cards Section */}
            <section className="pt-[200px] pb-8 sm:pb-12 lg:pb-16">
              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12">
                  {/* Emplojd Case Study */}
                  <Link
                    href="/case-studies/emplojd"
                    className="group cursor-pointer"
                  >
                    <div className="case-study-card bg-neutral-3 dark:bg-[#060608] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[500px] sm:h-[650px] lg:h-[750px] xl:h-[850px] flex flex-col relative">
                      {/* Noise background overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          backgroundSize: "256px 256px",
                        }}
                      />
                      {/* Image */}
                      <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] overflow-hidden relative">
                        <img
                          src="/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png"
                          alt="Emplojd HR Platform"
                          className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                        />
                        {/* SaaS Platform label - gets covered on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-radial from-purple-500/15 to-transparent dark:from-purple-400/15 dark:to-transparent py-8 px-4 group-hover:opacity-0 transition-opacity duration-500 flex justify-center"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 60%)",
                          }}
                        >
                          <span className="text-base font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider relative z-10">
                            SaaS Platform
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 pb-6 sm:pb-8 mt-auto mb-12 sm:mb-16 lg:mb-12">
                        <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            2024
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            Lead UX/UI Designer
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            School Project
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-2 sm:mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                          Emplojd
                        </h3>
                        <div className="flex items-end justify-between gap-3 sm:gap-4">
                          <p className="text-sm sm:text-base xl:text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed flex-1 max-w-[calc(100%-4rem)]">
                            Enhancing job applications without compromising
                            authenticity.
                          </p>
                          <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110 flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
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
                          </div>
                        </div>
                      </div>

                      {/* Scrolling Keywords Banner */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden h-8 sm:h-12 flex items-center">
                        <div className="flex animate-scroll">
                          <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider">
                            <span>SaaS Platform</span>
                            <span>•</span>
                            <span>AI-powered</span>
                            <span>•</span>
                            <span>Web Design</span>
                            <span>•</span>
                            <span>UX/UI Design</span>
                            <span>•</span>
                            <span>SaaS Platform</span>
                            <span>•</span>
                            <span>AI-powered</span>
                            <span>•</span>
                            <span>Web Design</span>
                            <span>•</span>
                            <span>UX/UI Design</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Noted Case Study - Password Protected */}
                  <Link
                    href="/case-studies/noted"
                    className="group cursor-pointer"
                  >
                    <div className="case-study-card bg-neutral-3 dark:bg-[#060608] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[500px] sm:h-[650px] lg:h-[750px] xl:h-[850px] relative flex flex-col">
                      {/* Coming Soon Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          COMING SOON
                        </span>
                      </div>
                      {/* Noise background overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          backgroundSize: "256px 256px",
                        }}
                      />
                      {/* Image */}
                      <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] overflow-hidden relative">
                        <img
                          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1000&fit=crop&crop=center"
                          alt="Project Alpha Design"
                          className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                        />
                        {/* Mobile App label - gets covered on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-radial from-purple-500/15 to-transparent dark:from-purple-400/15 dark:to-transparent py-8 px-4 group-hover:opacity-0 transition-opacity duration-500 flex justify-center"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 60%)",
                          }}
                        >
                          <span className="text-base font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider relative z-10">
                            Web & SaaS Application
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 pb-6 sm:pb-8 mt-auto mb-12 sm:mb-16 lg:mb-12">
                        <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            2025
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            Designer & Developer
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            Solo Project
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-2 sm:mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                          Noted
                        </h3>
                        <div className="flex items-end justify-between gap-3 sm:gap-4">
                          <p className="text-sm sm:text-base xl:text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed flex-1 max-w-[calc(100%-4rem)]">
                            Insert fancy and long description here, make sure it
                            covers 2 lines.
                          </p>
                          <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110 flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
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
                          </div>
                        </div>
                      </div>

                      {/* Scrolling Keywords Banner */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden h-8 sm:h-12 flex items-center">
                        <div className="flex animate-scroll">
                          <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider">
                            <span>AI-Powered</span>
                            <span>•</span>
                            <span>Note-Taking</span>
                            <span>•</span>
                            <span>Mobile App</span>
                            <span>•</span>
                            <span>UX/UI Design</span>
                            <span>•</span>
                            <span>AI-Powered</span>
                            <span>•</span>
                            <span>Note-Taking</span>
                            <span>•</span>
                            <span>Mobile App</span>
                            <span>•</span>
                            <span>UX/UI Design</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Zmartrest AI Case Study - Password Protected */}
                  <Link
                    href="/case-studies/zmartrest-ai"
                    className="group cursor-pointer"
                  >
                    <div className="case-study-card bg-neutral-3 dark:bg-[#060608] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[500px] sm:h-[650px] lg:h-[750px] xl:h-[850px] relative flex flex-col">
                      {/* Coming Soon Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          COMING SOON
                        </span>
                      </div>
                      {/* Noise background overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          backgroundSize: "256px 256px",
                        }}
                      />
                      {/* Image */}
                      <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] overflow-hidden relative">
                        <img
                          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1000&fit=crop&crop=center"
                          alt="Project Beta UX Design"
                          className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                        />
                        {/* Web Application label - gets covered on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-radial from-purple-500/15 to-transparent dark:from-purple-400/15 dark:to-transparent py-8 px-4 group-hover:opacity-0 transition-opacity duration-500 flex justify-center"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 60%)",
                          }}
                        >
                          <span className="text-base font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider relative z-10">
                            Mobile App & Web Portal
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 pb-6 sm:pb-8 mt-auto mb-12 sm:mb-16 lg:mb-12">
                        <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            2025
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            Product Designer
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-2 sm:px-3 py-1 rounded-full">
                            Internship Project
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-2 sm:mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                          Zmartrest AI
                        </h3>
                        <div className="flex items-end justify-between gap-3 sm:gap-4">
                          <p className="text-sm sm:text-base xl:text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed flex-1 max-w-[calc(100%-4rem)]">
                            Insert fancy and long description here, make sure it
                            covers 2 lines.
                          </p>
                          <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110 flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-white transition-colors duration-300"
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
                          </div>
                        </div>
                      </div>

                      {/* Scrolling Keywords Banner */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden h-8 sm:h-12 flex items-center">
                        <div className="flex animate-scroll">
                          <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider">
                            <span>AI Platform</span>
                            <span>•</span>
                            <span>Data Visualization</span>
                            <span>•</span>
                            <span>Machine Learning</span>
                            <span>•</span>
                            <span>Startup UX/UI</span>
                            <span>•</span>
                            <span>AI Platform</span>
                            <span>•</span>
                            <span>Data Visualization</span>
                            <span>•</span>
                            <span>Machine Learning</span>
                            <span>•</span>
                            <span>User Journey</span>
                            <span>•</span>
                            <span>Connected wearables</span>
                            <span>•</span>
                            <span>Sensor data</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-8 sm:py-12 lg:py-16">
              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-70 dark:text-neutral-30 mb-6 sm:mb-8">
                    Want to see what else I do?
                  </h2>
                  <p className="text-lg sm:text-xl text-neutral-50 dark:text-neutral-50 mb-8 sm:mb-12 leading-relaxed">
                    Browse my design gallery to see more of my creative work and
                    visual projects.
                  </p>
                  <div className="flex justify-center">
                    <Link href="/design-gallery">
                      <button className="px-8 sm:px-12 py-4 sm:py-6 bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 text-sm sm:text-base font-bold rounded-lg transition-all duration-500 ease-in-out flex items-center gap-2 sm:gap-3 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            className="sm:w-5 sm:h-5"
                          >
                            <path d="M104,60H52A16,16,0,0,0,36,76v48a16,16,0,0,0,16,16h52a16,16,0,0,0,16-16V76A16,16,0,0,0,104,60Zm0,64H52V76h52v48Zm100-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h52a16,16,0,0,0,16-16V76A16,16,0,0,0,204,60Zm0,64H152V76h52v48Zm-100,32H52a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h52a16,16,0,0,0,16-16V172A16,16,0,0,0,104,156Zm0,64H52V172h52v48Zm100-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h52a16,16,0,0,0,16-16V172A16,16,0,0,0,204,156Zm0,64H152V172h52v48Z" />
                          </svg>
                          Browse Design Gallery
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <div className="pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
