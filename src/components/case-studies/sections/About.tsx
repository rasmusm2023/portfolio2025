import React, { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface AboutProps {
  aboutText?: React.ReactNode;
  appIconPath?: string;
  logotypeBlackPath?: string;
  logotypeWhitePath?: string;
}

const About: React.FC<AboutProps> = ({
  aboutText,
  appIconPath,
  logotypeBlackPath,
  logotypeWhitePath,
}) => {
  const { isDark } = useTheme();
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

  return (
    <section
      data-section="about"
      className="py-12 sm:py-12 md:py-12 fade-in-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-left font-instrument-serif">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)"
                    : "linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)",
                }}
              >
                About
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            {aboutText ? (
              aboutText
            ) : (
              <div className="relative">
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] mb-4 sm:mb-6 text-left">
                  Emplojd was born out of the frustration many feel with
                  repetitive and time-consuming job applications. Created during
                  the{" "}
                  <span
                    data-chas-button
                    className="relative inline-block cursor-pointer group"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                      textDecoration: "none",
                      color: "inherit",
                      border: "none",
                      padding: "0",
                      font: "inherit",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Only handle click on mobile/tablet
                      if (window.innerWidth < 1024) {
                        const tooltip = document.getElementById("chas-tooltip");
                        if (tooltip) {
                          tooltip.classList.toggle("opacity-100");
                          tooltip.classList.toggle("pointer-events-auto");
                        }
                      }
                    }}
                    onMouseEnter={() => {
                      // Only handle hover on desktop
                      if (window.innerWidth >= 1024) {
                        const tooltip = document.getElementById("chas-tooltip");
                        if (tooltip) {
                          tooltip.classList.add("opacity-100");
                          tooltip.classList.add("pointer-events-auto");
                        }
                      }
                    }}
                    onMouseLeave={() => {
                      // Only handle hover on desktop
                      if (window.innerWidth >= 1024) {
                        const tooltip = document.getElementById("chas-tooltip");
                        if (tooltip) {
                          tooltip.classList.remove("opacity-100");
                          tooltip.classList.remove("pointer-events-auto");
                        }
                      }
                    }}
                  >
                    Chas Challenge
                  </span>
                  , this AI-powered platform was our teams way of exploring how
                  design and tech could simplify the process.
                </p>
                {/* Custom cursor tooltip - responsive behavior */}
                <div
                  id="chas-tooltip"
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 transition-opacity duration-300 pointer-events-none z-50 w-80 sm:w-96 lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto"
                >
                  <div className="bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-80 text-xs sm:text-sm leading-relaxed">
                    <div className="mb-3">
                      Chas Academy's annual, cross-program student project where
                      first-year students team up across disciplines over an
                      8‑week period (2024's theme: AI) to ideate and prototype
                      real solutions, then pitch them to industry professionals.
                    </div>
                    <div className="text-xs text-neutral-60 dark:text-neutral-40 font-medium border-t border-neutral-200 dark:border-neutral-70 pt-3">
                      <a
                        href="https://chasacademy.se/article/chas-challenge-2024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                      >
                        Click to read more
                      </a>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-100 dark:border-t-neutral-0"></div>
                  </div>
                </div>
              </div>
            )}
            <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
              <span
                style={{
                  background:
                    "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                }}
              >
                I led the UX/UI work to make sure the experience felt personal,
                efficient, and genuinely helpful
              </span>{" "}
              for job seekers.
            </p>

            {/* Logo Box */}
            <div className="w-full h-24 sm:h-32 mt-4 sm:mt-6 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg flex items-center px-4 sm:px-6">
              {appIconPath && (
                <img
                  src={appIconPath}
                  alt="App Icon"
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                />
              )}
              <div className="flex-1 flex justify-center">
                {logotypeBlackPath && logotypeWhitePath && (
                  <img
                    src={logotypeBlackPath}
                    alt="Logotype"
                    className="h-12 sm:h-16 object-contain dark:hidden"
                  />
                )}
                {logotypeBlackPath && logotypeWhitePath && (
                  <img
                    src={logotypeWhitePath}
                    alt="Logotype"
                    className="h-12 sm:h-16 object-contain hidden dark:block"
                  />
                )}
              </div>
              {!appIconPath && !logotypeBlackPath && (
                <span className="text-neutral-60 dark:text-neutral-40 text-xs sm:text-sm">
                  Logo placeholder
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
