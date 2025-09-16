"use client";

import { useState } from "react";
import RadialGradientBorder from "@/components/ui/RadialGradientBorder";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

const BentoBoxRest = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [cardTilts, setCardTilts] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const { isDark } = useTheme();

  const getBoxScale = (boxId: string) => {
    return hoveredBox === boxId ? 1.02 : 1;
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardId: string
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Calculate tilt angles (max 10 degrees for more subtle effect)
    const tiltX = (deltaY / (rect.height / 2)) * -10;
    const tiltY = (deltaX / (rect.width / 2)) * 10;

    setCardTilts((prev) => ({
      ...prev,
      [cardId]: { x: tiltX, y: tiltY },
    }));
  };

  const handleCardMouseLeave = (cardId: string) => {
    setCardTilts((prev) => ({
      ...prev,
      [cardId]: { x: 0, y: 0 },
    }));
  };

  const getCardTransform = (cardId: string) => {
    const tilt = cardTilts[cardId] || { x: 0, y: 0 };
    return `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
  };

  const getCardTiltIntensity = (cardId: string) => {
    const tilt = cardTilts[cardId] || { x: 0, y: 0 };
    return Math.abs(tilt.x) + Math.abs(tilt.y);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="text-left w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 md:gap-12 auto-rows-[280px] sm:auto-rows-[300px] md:auto-rows-[320px]">
          {/* Expertise with Dotted Background - Large section */}
          <div
            className="md:col-span-6 lg:col-span-8 border-2 border-neutral-80/40 rounded-3xl px-4 py-8 lg:px-8 flex flex-col justify-center hover:border-neutral-80/60 transition-all duration-500 relative group row-span-6 md:row-span-5 lg:row-span-2 topography-bg"
            style={{
              transform: `scale(${getBoxScale("skills-dotted")})`,
              backgroundColor: isDark ? "#060608" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("skills-dotted")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                      : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                  }}
                >
                  Expertise{" "}
                </span>
              </h2>
              <Image
                src="/assets/icons/3dicons-flash-dynamic-premium.png"
                alt="Expertise"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-pulse-subtle"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center -mt-4">
              <div
                className="group/card relative"
                style={{ transform: getCardTransform("ux-research") }}
                onMouseMove={(e) => handleCardMouseMove(e, "ux-research")}
                onMouseLeave={() => handleCardMouseLeave("ux-research")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-zoom-dynamic-premium.png"
                          alt="UX Research"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        UX Research
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interviews
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Usability Tests
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Workshops
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Benchmarking
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Data/Metrics Analysis
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Survey Design
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group/card relative"
                style={{ transform: getCardTransform("ui-design") }}
                onMouseMove={(e) => handleCardMouseMove(e, "ui-design")}
                onMouseLeave={() => handleCardMouseLeave("ui-design")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-color-palette-dynamic-premium.png"
                          alt="UI Design"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        UI Design
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Prototyping
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Design Systems
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Components
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Visual Design
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Accessibility
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Responsive
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group/card relative"
                style={{ transform: getCardTransform("ux-design") }}
                onMouseMove={(e) => handleCardMouseMove(e, "ux-design")}
                onMouseLeave={() => handleCardMouseLeave("ux-design")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-bulb-dynamic-premium.png"
                          alt="UX Design"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        UX Design
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            User Flows
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Information Architecture
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Wireframes
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interaction Design
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Journey Maps
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Flowcharts
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group/card relative"
                style={{ transform: getCardTransform("development") }}
                onMouseMove={(e) => handleCardMouseMove(e, "development")}
                onMouseLeave={() => handleCardMouseLeave("development")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-computer-dynamic-premium.png"
                          alt="Development"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        Development
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Frontend
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Cursor AI
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Framer
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Webflow & Wix
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Working Prototypes
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Low-Code Development
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group/card relative"
                style={{ transform: getCardTransform("product") }}
                onMouseMove={(e) => handleCardMouseMove(e, "product")}
                onMouseLeave={() => handleCardMouseLeave("product")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-chart-dynamic-premium.png"
                          alt="Product"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        Product
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Strategy
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Analytics
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Roadmaps
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Growth & Conversion
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Prioritization Methods
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Facilitation
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group/card relative"
                style={{ transform: getCardTransform("ai-automation") }}
                onMouseMove={(e) => handleCardMouseMove(e, "ai-automation")}
                onMouseLeave={() => handleCardMouseLeave("ai-automation")}
              >
                <div className="absolute inset-0 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <RadialGradientBorder
                    variant="dash"
                    shineColor={["#8B5CF6", "#A855F7"]}
                    borderWidth={4}
                    duration={3}
                    size="md"
                    className="w-full h-full"
                  />
                </div>
                {/* Noise background overlay */}
                <div
                  className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                  }}
                />
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 lg:cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-100/50 lg:group-hover/card:bg-transparent"
                      : "bg-neutral-10/50 lg:group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/assets/icons/3dicons-fire-dynamic-premium.png"
                          alt="AI & Automation"
                          width={56}
                          height={56}
                          className="lg:group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3
                        className="font-black text-xl tracking-wide transition-colors duration-200"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        AI & Automation
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            AI Workflows
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Fast Ideation
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Rapid Prototyping
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Content Generation
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Automation
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "lg:group-hover/card:text-neutral-3"
                                : "lg:group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            AI Assistants
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
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-3xl px-4 py-6 lg:px-8 lg:py-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 topography-bg"
            style={{
              transform: `scale(${getBoxScale("experience")})`,
              backgroundColor: isDark ? "#060608" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("experience")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                        : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                    }}
                  >
                    Track Record
                  </span>
                </h2>
                <p
                  className="hidden lg:block text-lg font-hanken"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  employments & studies
                </p>
              </div>
              <Image
                src="/assets/icons/3dicons-travel-dynamic-premium.png"
                alt="Experience"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-pulse-subtle"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-3 py-2 w-16 h-12 sm:w-18 sm:h-14 lg:w-20 lg:h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                      5
                    </span>
                  </div>
                  <span
                    className={`text-base sm:text-lg lg:text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years within UX/UI Design
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-3 py-2 w-16 h-12 sm:w-18 sm:h-14 lg:w-20 lg:h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                      4
                    </span>
                  </div>
                  <span
                    className={`text-base sm:text-lg lg:text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years within E-Commerce
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-3 py-2 w-16 h-12 sm:w-18 sm:h-14 lg:w-20 lg:h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                      2
                    </span>
                  </div>
                  <span
                    className={`text-base sm:text-lg lg:text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years of Frontend Development
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-3 py-2 w-16 h-12 sm:w-18 sm:h-14 lg:w-20 lg:h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                      1
                    </span>
                  </div>
                  <span
                    className={`text-base sm:text-lg lg:text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    year of SoMe & SEO work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Working On - Medium section */}
          <div
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-3xl px-4 py-6 lg:px-8 lg:py-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 topography-bg"
            style={{
              transform: `scale(${getBoxScale("current-work")})`,
              backgroundColor: isDark ? "#060608" : "#ffffff",
            }}
            onMouseEnter={() => setHoveredBox("current-work")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            {/* Radial shine effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                      : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                  }}
                >
                  Currently working on
                </span>
              </h2>
              <Image
                src="/assets/icons/3dicons-rocket-dynamic-premium.png"
                alt="Currently Working On"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-pulse-subtle"
              />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-4">
              {/* Dog-sitting App Card */}
              <div className="flex-none lg:flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20 h-52 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center"
                  alt="Dog-sitting App Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    Dog-sitting app
                  </h3>
                  <p className="text-sm text-white/80">
                    Designing and developing a mobile booking platform for pet
                    care services.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      React Native
                    </span>
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      TypeScript
                    </span>
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      Firebase
                    </span>
                  </div>
                </div>
              </div>

              {/* E-commerce Website & App Card */}
              <div className="flex-none lg:flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20 h-52 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center"
                  alt="E-commerce Website & App Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    E-commerce website & app
                  </h3>
                  <p className="text-sm text-white/80">
                    Building a modern e-commerce platform with responsive web
                    design and mobile app.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      Next.js
                    </span>
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      React Native
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
      </div>
    </section>
  );
};

export default BentoBoxRest;
