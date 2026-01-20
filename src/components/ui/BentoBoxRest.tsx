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
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-8 auto-rows-[225px] sm:auto-rows-[250px] md:auto-rows-[275px]">
          {/* Expertise with Dotted Background - Large section */}
          <div
            className="md:col-span-6 lg:col-span-8 border-2 border-neutral-80/40 rounded-3xl px-4 py-6 lg:px-8 lg:py-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 h-[450px] sm:h-[500px] md:h-[550px] topography-bg"
            style={{
              transform: `scale(${getBoxScale("skills-dotted")})`,
              backgroundColor: isDark ? "#060608" : "#ffffff",
              userSelect: "none",
            }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
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
                  What I focus on{" "}
                </span>
              </h2>
              <Image
                src="/assets/icons/3dicons-flash-dynamic-premium.png"
                alt="What I focus on"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-pulse-subtle"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-80 lg:cursor-pointer transition-all duration-300 ${
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
                      <ul className="space-y-1.5 flex flex-col items-start">
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Scalable design systems
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          High-fidelity prototyping
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Interaction and visual clarity
                        </li>
                      </ul>
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
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-80 lg:cursor-pointer transition-all duration-300 ${
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
                      <ul className="space-y-1.5 flex flex-col items-start">
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Research synthesis and insights
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          User journeys and flows
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Usability and validation
                        </li>
                      </ul>
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
                  className={`relative backdrop-blur-sm rounded-2xl p-6 h-80 lg:cursor-pointer transition-all duration-300 ${
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
                          alt="Product Strategy"
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
                        Product Strategy
                      </h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <ul className="space-y-1.5 flex flex-col items-start">
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Product discovery and prioritization
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Roadmaps tied to outcomes
                        </li>
                        <li
                          className={`text-neutral-60 text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
                            isDark
                              ? "lg:group-hover/card:text-neutral-3"
                              : "lg:group-hover/card:text-neutral-90"
                          }`}
                        >
                          <div className="w-2 h-2 bg-neutral-60 lg:group-hover/card:bg-[#8B5CF6] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                          Growth, retention, and learning
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Currently Working On - Medium section */}
          <div
            className="md:col-span-6 lg:col-span-8 border-2 border-neutral-80/40 rounded-3xl px-4 py-6 lg:px-8 lg:py-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 topography-bg"
            style={{
              transform: `scale(${getBoxScale("current-work")})`,
              backgroundColor: isDark ? "#060608" : "#ffffff",
              userSelect: "none",
            }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
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

            <div className="flex-1 flex flex-col lg:flex-row gap-3">
              {/* Bookmarks Platform Card */}
              <div className="flex-none lg:flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20 h-80 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center"
                  alt="Bookmarks Platform Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-sm"
                  style={{
                    maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                  <h3 className="text-base font-semibold text-white">
                    Bookmarks platform
                  </h3>
                  <p className="text-xs text-white/80">
                    A space to save important links with a simple way of managing
                    and accessing them.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      TypeScript
                    </span>
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      Tailwind
                    </span>
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                      Figma
                    </span>
                  </div>
                </div>
              </div>

              {/* Dog-sitting App Card */}
              <div className="flex-none lg:flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20 h-80 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center"
                  alt="Dog-sitting App Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-sm"
                  style={{
                    maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                  <h3 className="text-base font-semibold text-white">
                    Dog-sitting app
                  </h3>
                  <p className="text-xs text-white/80">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBoxRest;
