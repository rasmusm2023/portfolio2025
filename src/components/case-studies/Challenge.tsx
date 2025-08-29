import React from "react";

interface ChallengeProps {
  challenge: string;
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  return (
    <section className="py-6 sm:py-8 md:py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              The Challenge
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            {/* Main Challenge Statement */}
            <div className="mb-12 sm:mb-16 space-y-4 sm:space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                We had eight weeks, a small cross-disciplinary team, and the
                broad theme of "AI" to work with. In that time, we needed to
                design and deliver a functional, interactive prototype that
                could stand out at the Chas Challenge showcase.
              </p>

              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                The job-search market is already crowded, yet most platforms
                still demand time-consuming, repetitive application processes.
                Job seekers risk losing opportunities by applying to fewer
                roles, while recruiters lose time reviewing generic, low-quality
                submissions.
              </p>

              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                Our challenge was to create a solution that used AI
                meaningfully,{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                  }}
                >
                  reducing friction for applicants without sacrificing the
                  personal touch recruiters value. All within tight time and
                  resource limits
                </span>
                .
              </p>
            </div>

            {/* Additional Context */}
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8 md:p-10">
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-left">
                Context & Background
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">•</span>
                  <span>
                    Limited time, as the project ran alongside my regular
                    studies
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">•</span>
                  <span>
                    Broad initial theme (AI), requiring us to define our own
                    scope and boundaries
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">•</span>
                  <span>
                    Had to start development early, adding extra pressure on the
                    design process
                  </span>
                </li>
              </ul>
            </div>

            {/* Goals */}
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-700/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 md:p-10 mt-6 sm:mt-8">
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-left">
                Goals
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>
                    Design and deliver a functional, interactive prototype
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>
                    Create a solution that meaningfully uses AI to reduce
                    friction
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Stand out at the Chas Challenge showcase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>
                    Intuitive design and highly satisfactory experience
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
