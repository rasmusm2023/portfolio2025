"use client";

import { useState } from "react";
import RadialGradientBorder from "@/components/RadialGradientBorder";
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
    <section className="py-16 relative">
      <div className="text-left w-full max-w-[1600px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-12 auto-rows-[320px]">
          {/* Expertise with Dotted Background - Large section */}
          <div
            className="md:col-span-6 lg:col-span-8 border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("skills-dotted")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
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
              <h2
                className="text-xl font-bold font-montserrat uppercase tracking-wider"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#000000",
                }}
              >
                Expertise{" "}
              </h2>
              <Image
                src="/icons/3dicons-flash-dynamic-premium.png"
                alt="Expertise"
                width={80}
                height={80}
                className="animate-pulse-subtle"
              />
            </div>
            <div className="grid grid-cols-3 gap-8 items-center -mt-4">
              <div
                className="group/card relative"
                style={{ transform: getCardTransform("ux-research") }}
                onMouseMove={(e) => handleCardMouseMove(e, "ux-research")}
                onMouseLeave={() => handleCardMouseLeave("ux-research")}
              >
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-zoom-dynamic-premium.png"
                          alt="UX Research"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interviews
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Testing
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Data/metrics analysis
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Workshops
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-color-palette-dynamic-premium.png"
                          alt="UI Design"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Prototyping
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Component systems
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Design systems
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-bulb-dynamic-premium.png"
                          alt="UX Design"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            User flows
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Information architecture
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Interaction design
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Wireframing
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            User testing
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-computer-dynamic-premium.png"
                          alt="Development"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Cursor AI
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Lovable
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Wix
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Miro
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-chart-dynamic-premium.png"
                          alt="Product"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Strategy
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Roadmapping
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Analytics
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Growth
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
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-64 cursor-pointer transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-80/50 group-hover/card:bg-transparent"
                      : "bg-[rgba(248,248,248,0.95)] group-hover/card:bg-transparent"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative mb-3">
                        <Image
                          src="/icons/3dicons-fire-dynamic-premium.png"
                          alt="AI & Automation"
                          width={56}
                          height={56}
                          className="group-hover/card:scale-110 transition-all duration-300"
                        />
                        {/* Glow effect only on card hover */}
                        <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
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
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Updated workflows
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            AI integration
                          </li>
                        </ul>
                        <ul className="space-y-1.5">
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
                            <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                            Efficiency tools
                          </li>
                          <li
                            className={`text-neutral-60 text-sm text-left font-bold flex items-center gap-2 transition-colors duration-200 ${
                              isDark
                                ? "group-hover/card:text-neutral-3"
                                : "group-hover/card:text-neutral-90"
                            }`}
                          >
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
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("experience")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
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
                <h2
                  className="text-xl font-bold font-montserrat uppercase tracking-wider"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  Experience
                </h2>
                <p
                  className="text-lg font-hanken"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  employments & studies
                </p>
              </div>
              <Image
                src="/icons/3dicons-travel-dynamic-premium.png"
                alt="Experience"
                width={80}
                height={80}
                className="animate-pulse-subtle"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-4xl font-bold">5</span>
                  </div>
                  <span
                    className={`text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years within UX/UI Design
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-4xl font-bold">4</span>
                  </div>
                  <span
                    className={`text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years within E-Commerce
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-4xl font-bold">2</span>
                  </div>
                  <span
                    className={`text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    years of Frontend Development
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-4xl font-bold">20</span>
                  </div>
                  <span
                    className={`text-xl ${
                      isDark ? "text-neutral-40" : "text-neutral-100"
                    }`}
                  >
                    Completed projects
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <span className="text-white text-4xl font-bold">1</span>
                  </div>
                  <span
                    className={`text-xl ${
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
            className="md:col-span-3 lg:col-span-4 border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              transform: `scale(${getBoxScale("current-work")})`,
              backgroundColor: isDark ? "rgba(35, 35, 35, 0.5)" : "#ffffff",
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
              <h2
                className="text-xl font-bold font-montserrat uppercase tracking-wider"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#000000",
                }}
              >
                Currently working on
              </h2>
              <Image
                src="/icons/3dicons-rocket-dynamic-premium.png"
                alt="Currently Working On"
                width={80}
                height={80}
                className="animate-pulse-subtle"
              />
            </div>

            <div className="flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center"
                alt="Dog-sitting App Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Dog-sitting app
                </h3>
                <p className="text-sm text-white/80">
                  Designing and developing a mobile booking platform for pet
                  care services.
                </p>
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

export default BentoBoxRest;
