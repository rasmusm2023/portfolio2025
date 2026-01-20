import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface GoalsAndConstraintsProps {
  goalsAndConstraintsRef?: React.RefObject<HTMLElement | null>;
}

const GoalsAndConstraints: React.FC<GoalsAndConstraintsProps> = ({
  goalsAndConstraintsRef,
}) => {
  const { isDark } = useTheme();
  return (
    <section
      ref={goalsAndConstraintsRef}
      data-section="goals-and-constraints"
      className="py-12 sm:py-12 md:py-16 fade-in-section"
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
                Goals & Constraints
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            {/* Project Goals Box */}
            <div className="bg-gradient-to-r from-green-500/10 to-green-700/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-left">
                Project Goals
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>Reduce friction in the job application process</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    Meaningfully integrate AI without replacing human voice
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    Create a polished, functional prototype for the Chas
                    Challenge showcase
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    Ensure an intuitive, modern, and confidence-boosting user
                    experience
                  </span>
                </li>
              </ul>
            </div>

            {/* Constraints Box */}
            <div className="bg-gradient-to-r from-red-500/10 to-red-700/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 sm:p-8 md:p-10">
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-left">
                Constraints
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span>8-week timeline alongside regular studies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span>Broad theme ("AI") requiring self-defined scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span>
                    Development began early which meant design and dev
                    progressed in parallel
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span>Mixed-discipline team with varying skill levels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsAndConstraints;
