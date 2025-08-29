import React, { useEffect } from "react";
import { gsap } from "gsap";

const CaseStudyInsights: React.FC = () => {
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

  return (
    <section className="py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              Insights
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            {/* Centered Summary Text */}
            <div className="text-left mb-12 sm:mb-16 lg:mb-20">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] max-w-full lg:max-w-4xl mx-auto">
                Through market research, competitor analysis, user research and
                interviews, we uncovered key insights that shaped the direction
                of our design decisions. Here are the most significant findings
                from our research process.
              </p>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 gap-8 sm:gap-12">
              {/* Early Insights */}
              <div className="bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-2xl p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-lg sm:text-xl">
                    Early Insights
                  </h3>
                </div>

                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      The job application process felt overwhelming and
                      time-consuming
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Writing tailored cover letters was the biggest pain point
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient3"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Existing alternatives felt too generic — applicants wanted
                      more personal results
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient4"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Recruiters were skeptical of AI and disliked applications
                      that felt robotic
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient5"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Accessibility and ease of use were essential for a diverse
                      range of job seekers
                    </p>
                  </li>
                </ul>
              </div>

              {/* Later Insights */}
              <div className="bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-2xl p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-lg sm:text-xl">
                    Later Insights
                  </h3>
                </div>

                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient6"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      <span
                        className="relative inline-block group"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        Saving profile data reduced friction and frustration
                      </span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient7"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Flexibility was key — users wanted to reuse information
                      but still edit when needed
                    </p>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient8"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <div className="relative group">
                      <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                        Users preferred{" "}
                        <span
                          className="group relative"
                          data-tooltip="AI-creativity slider"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          gradual AI assistance
                        </span>{" "}
                        over full automation
                      </p>
                      {/* Custom cursor tooltip for gradual AI assistance */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-80 sm:w-96">
                        <div className="bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm leading-relaxed">
                          <div className="mb-3">
                            This insight led us to include an "Independence /
                            AI-creativity" slider where users can control how
                            much freedom the AI gets versus how strictly it
                            should stick to the information provided by the
                            user.
                          </div>
                          <div className="mb-3">
                            <img
                              src="/case-study-assets/emplojd/Emplojd-Insights-Gradual-AI-Automation-Example.svg"
                              alt="AI-creativity slider example"
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-100 dark:border-t-neutral-0"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient9"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Success metrics should focus on user confidence and time
                      saved
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-1 flex-shrink-0 spinning-icon">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id="iconGradient10"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#907EFF" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="10"
                          ry="10"
                          fill="url(#iconGradient1)"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%]">
                      Trust and perceived quality mattered most for both
                      applicants and recruiters
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyInsights;
