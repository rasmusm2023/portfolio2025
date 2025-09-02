"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedBorder from "@/components/AnimatedBorder";
import RadialGradientBorder from "@/components/RadialGradientBorder";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import RasmusImage from "@/images/rasmus.jpg";
import {
  MagnifyingGlass,
  Palette,
  Lightbulb,
  Code,
  ChartLine,
  Robot,
} from "@phosphor-icons/react";

// Custom Floating Label Input Component
function FloatingLabelInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
  isTextarea = false,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(e.target.value.length > 0);
  };

  const isActive = isFocused || hasValue;

  if (isTextarea) {
    return (
      <div className="relative">
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200 resize-none"
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
              : "top-3 text-base text-neutral-40"
          }`}
        >
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
          isActive
            ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
            : "top-1/2 -translate-y-1/2 text-base text-neutral-40"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

const BentoBox = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const scrambleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Number Counter Animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const finalValue = parseInt(target.getAttribute("data-value") || "0");

          // Reset to 0 and set opacity to 0
          target.textContent = "0";
          target.style.opacity = "0";

          // Animate counting up and fade in
          let currentValue = 0;
          const increment = finalValue / 24; // 24 steps over 0.8 seconds
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              currentValue = finalValue;
              clearInterval(timer);
            }
            target.textContent = Math.floor(currentValue).toString();
            // Fade in opacity from 0 to 1 over the same duration
            const progress = currentValue / finalValue;
            target.style.opacity = progress.toString();
          }, 33); // ~30fps
        }
      });
    }, observerOptions);

    // Observe all number elements
    scrambleRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Calculate scale for each box based on hover state
  const getBoxScale = (boxId: string) => {
    if (!hoveredBox) return 1; // No hover - all boxes normal size
    if (hoveredBox === boxId) return 1.02; // Hovered box grows (reduced from 1.05)
    return 1; // Other boxes stay normal size
  };

  return (
    <section className="py-16 relative">
      <div className="text-left w-full max-w-[1600px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[320px]">
          {/* About - Standing section */}
          <div
            className="md:col-span-3 lg:col-span-4 bg-neutral-50/5 backdrop-blur-sm border-2 border-neutral-20/40 rounded-3xl p-8 flex flex-col justify-start relative group hover:shadow-lg hover:border-neutral-20/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-neutral-90/50 dark:border-neutral-80/40 dark:hover:border-neutral-80/60 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{ transform: `scale(${getBoxScale("about-me")})` }}
            onMouseEnter={() => setHoveredBox("about-me")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-start gap-4 mb-6">
              {/* Profile image with animated border */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src={RasmusImage.src}
                  alt="Rasmus Mattsson"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 30%" }}
                  width={56}
                  height={56}
                />
                {/* Animated border - positioned outside the image */}
                <svg
                  className="absolute -inset-0.5 w-17 h-17"
                  viewBox="0 0 68 68"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <defs>
                    <linearGradient
                      id="borderGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop
                        offset="30%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.7"
                      />
                      <stop
                        offset="60%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.3"
                      />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="34"
                    cy="34"
                    r="32"
                    fill="none"
                    stroke="url(#borderGradient)"
                    strokeWidth="4"
                    strokeDasharray="201"
                    strokeDashoffset="201"
                    style={{
                      animation: "spin-border 5s linear infinite",
                    }}
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-neutral-10 text-lg font-bold leading-relaxed">
                👋 Hi, I'm Rasmus Mattsson — a UX/UI Designer and Low-code
                Developer based in Stockholm, Sweden. I love creating digital
                experiences that bridge creativity with technology.
              </p>
            </div>
          </div>

          {/* I work in - Large section */}
          <div
            className="md:col-span-3 lg:col-span-4 bg-neutral-50/5 backdrop-blur-sm border-2 border-neutral-20/40 rounded-3xl flex flex-col justify-center overflow-hidden relative group hover:shadow-lg hover:border-neutral-20/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-neutral-90/50 dark:border-neutral-80/40 dark:hover:border-neutral-80/60 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{ transform: `scale(${getBoxScale("toolkit")})` }}
            onMouseEnter={() => setHoveredBox("toolkit")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-2 p-8">
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-bold text-neutral-30 font-montserrat uppercase tracking-wider">
                  <span className="block lg:hidden">My toolkit</span>
                  <span className="hidden lg:block">My toolkit include</span>
                </h2>
                <p className="hidden lg:block text-lg text-neutral-50 font-hanken">
                  but is not limited to:
                </p>
              </div>
              <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                <span className="animate-pulse-subtle">🛠️</span>
              </span>
            </div>

            {/* GSAP-powered Infinite Scroll Banner */}
            <InfiniteScrollBanner />
          </div>

          {/* Expertise with Dotted Background - Large section */}
          <div
            className="md:col-span-6 lg:col-span-8 bg-neutral-50/5 backdrop-blur-sm border-2 border-neutral-20/40 rounded-3xl p-8 flex flex-col justify-center hover:border-neutral-20/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-neutral-90/50 dark:border-neutral-80/40 dark:hover:border-neutral-80/60 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("skills-dotted")})`,
            }}
            onMouseEnter={() => setHoveredBox("skills-dotted")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-neutral-30 font-montserrat uppercase tracking-wider">
                Expertise{" "}
              </h2>
              <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                <span className="animate-pulse-subtle">⚡</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-8 items-center -mt-4">
              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <MagnifyingGlass
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-50 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                        UX Research
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interviews
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Testing
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Data/metrics analysis
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Workshops
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Palette
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-50 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                        UI Design
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Prototyping
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Component systems
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Design systems
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Lightbulb
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-50 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                        UX Design
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            User flows
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Information architecture
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interaction design
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Wireframing
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            User testing
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Flowcharts
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Code
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-50 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                        Development
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Cursor AI
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Lovable
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Frontend
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Firebase
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <ChartLine
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                        Product
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Strategy
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Roadmapping
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Analytics
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Growth
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/card relative">
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                <div className="relative bg-neutral-60 backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent dark:bg-neutral-80">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Robot
                          size={40}
                          weight="fill"
                          className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-neutral-10 font-bold text-xl tracking-wide transition-colors duration-200">
                        AI & Automation
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Updated workflows
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            AI integration
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Efficiency tools
                          </li>
                          <li className="text-neutral-60 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Future-ready
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience - Medium section */}
          <div
            className="md:col-span-3 lg:col-span-4 bg-neutral-50/5 backdrop-blur-sm border-2 border-neutral-20/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-20/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-neutral-90/50 dark:border-neutral-80/40 dark:hover:border-neutral-80/60 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{ transform: `scale(${getBoxScale("experience")})` }}
            onMouseEnter={() => setHoveredBox("experience")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-bold text-neutral-30 font-montserrat uppercase tracking-wider">
                  Experience
                </h2>
                <p className="text-lg text-neutral-50 font-hanken">
                  employments & studies
                </p>
              </div>
              <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                <span className="animate-pulse-subtle">💼</span>
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span
                      ref={(el) => {
                        scrambleRefs.current[0] = el;
                      }}
                      className="text-neutral-0 text-4xl font-bold"
                      data-value="5"
                    >
                      5
                    </span>
                  </div>
                  <span className="text-neutral-40 text-xl">
                    years within UX/UI Design
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span
                      ref={(el) => {
                        scrambleRefs.current[1] = el;
                      }}
                      className="text-neutral-0 text-4xl font-bold"
                      data-value="4"
                    >
                      4
                    </span>
                  </div>
                  <span className="text-neutral-40 text-xl">
                    years within E-Commerce
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span
                      ref={(el) => {
                        scrambleRefs.current[2] = el;
                      }}
                      className="text-neutral-0 text-4xl font-bold"
                      data-value="2"
                    >
                      2
                    </span>
                  </div>
                  <span className="text-neutral-40 text-xl">
                    years of Frontend Development
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span
                      ref={(el) => {
                        scrambleRefs.current[3] = el;
                      }}
                      className="text-neutral-0 text-4xl font-bold"
                      data-value="20"
                    >
                      20
                    </span>
                  </div>
                  <span className="text-neutral-40 text-xl">
                    Completed projects
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span
                      ref={(el) => {
                        scrambleRefs.current[4] = el;
                      }}
                      className="text-neutral-0 text-4xl font-bold"
                      data-value="1"
                    >
                      1
                    </span>
                  </div>
                  <span className="text-neutral-40 text-xl">
                    year of SoMe & SEO work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Working On - Medium section */}
          <div
            className="md:col-span-3 lg:col-span-4 bg-neutral-50/5 backdrop-blur-sm border-2 border-neutral-20/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-20/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-neutral-90/50 dark:border-neutral-80/40 dark:hover:border-neutral-80/60 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{ transform: `scale(${getBoxScale("current-work")})` }}
            onMouseEnter={() => setHoveredBox("current-work")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-30 font-montserrat uppercase tracking-wider">
                Currently working on
              </h2>
              <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                <span className="animate-pulse-subtle">🚀</span>
              </span>
            </div>

            <div className="flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20">
              {/* Large Project Image/GIF */}
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center"
                alt="Dog-sitting App Preview"
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Project Title and Tech Stack Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Dog-sitting app
                </h3>
                <p className="text-sm text-white/80">
                  Designing and developing a mobile booking platform for pet
                  care services.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs rounded-full font-medium backdrop-blur-sm">
                    React Native
                  </span>
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    Firebase
                  </span>
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    Figma
                  </span>
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    Stripe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBox;
