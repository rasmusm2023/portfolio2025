import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Workshop: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <section
      data-section="workshop"
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
                Kickoff Workshop
              </span>
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                At the start of the project,{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                  }}
                >
                  I facilitated a kickoff workshop to align the entire team
                  around our vision and expectations
                </span>{" "}
                for Emplojd. The session was designed to get to know each other,
                define what we wanted to achieve, and explore possible
                directions for the product.
              </p>

              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                We began with a Mentimeter quiz to spark discussion, then moved
                into a Crazy 8 exercise to quickly capture individual ideas.
                After sharing and consolidating our thoughts, we identified a
                set of themes that would guide our design approach.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 10%, rgba(144, 126, 255, 0.3) 10%, rgba(144, 126, 255, 0.3) 95%, transparent 95%)",
                  }}
                >
                  These insights became the foundation
                </span>{" "}
                for how we defined the product's goals and features:
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-12">
          {/* Workshop Insights Cards - Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
            {/* User Experience Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                User Experience
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
                The platform should feel simple, modern, and stress-free, with
                no learning curve.
              </p>
            </div>

            {/* Personalisation Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                Personalisation
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
                AI should assist the user while preserving their individuality,
                avoiding anything that feels "generic" or "robotic."
              </p>
            </div>

            {/* Value for Both Sides Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                Value for Both Sides
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
                The service must be useful to job seekers and recruiters,
                ensuring quality applications that stand out.
              </p>
            </div>

            {/* Accessibility & Inclusivity Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                Accessibility & Inclusivity
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
                The product should be easy to use for everyone, including those
                with less experience or language challenges.
              </p>
            </div>

            {/* Efficiency Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                Efficiency
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
                The process should save time, reduce anxiety, and encourage
                applicants to apply to more jobs with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Crazy 8 Workshop Image */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="w-full bg-white relative rounded-2xl overflow-hidden">
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-The-Craft-Ideation Workshop-Crazy-8.svg"
              alt="Emplojd Crazy 8 kickoff workshop showing the teams' ideas, thoughts and goals for the product"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Image Caption - Similar to The Craft section */}
          <div className="mt-4 text-center">
            <p className="text-neutral-60 dark:text-neutral-40 text-xs sm:text-sm font-medium">
              Slide from the Kickoff Workshop, specifically the Crazy 8
              exercise, showing the teams' ideas, thoughts and goals for the
              product
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop;
