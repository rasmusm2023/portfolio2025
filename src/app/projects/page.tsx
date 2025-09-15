"use client";

import CustomCursor from "@/components/CustomCursor";
import ProjectShowcase from "@/components/ProjectShowcase";
import CaseStudiesShowcase from "@/components/CaseStudiesShowcase";
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
                  {/* Main Projects Title */}
                  <div className="mb-8 sm:mb-12 lg:mb-16">
                    <h1
                      ref={titleRef}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-hanken leading-none"
                    >
                      <span className="[background-image:var(--gradient-hero-projects)] dark:[background-image:var(--gradient-hero-projects-dark)] bg-clip-text text-transparent font-hanken">
                        Projects
                      </span>
                    </h1>
                  </div>

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
            <div className="pt-[200px] pb-8 sm:pb-12 lg:pb-16">
              <CaseStudiesShowcase showTitle={false} />
            </div>

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
