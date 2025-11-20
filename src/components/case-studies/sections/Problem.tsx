import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ProblemProps {
  problemText?: React.ReactNode;
  problemRef?: React.RefObject<HTMLElement>;
}

const Problem: React.FC<ProblemProps> = ({
  problemText,
  problemRef,
}) => {
  const { isDark } = useTheme();
  return (
    <section
      ref={problemRef}
      data-section="problem"
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
                Problem
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              {problemText || (
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                  Job seekers often spend hours tailoring each application, leading to frustration, fewer submissions, and generic, uninspired results. Recruiters, on the other hand, struggle with AI-generated applications that feel robotic or repetitive.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;

