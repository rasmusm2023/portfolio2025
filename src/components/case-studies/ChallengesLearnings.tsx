import React from "react";

const ChallengesLearnings: React.FC = () => {
  return (
    <section data-section="challenges-learnings" className="py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              Challenges & Learnings
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-12 sm:mb-16 space-y-4 sm:space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                Every project comes with hurdles, and Emplojd was no exception.
                These challenges not only shaped the product but also provided
                valuable lessons that strengthened both the process and the
                outcome.
              </p>
            </div>

            {/* Challenges & Learnings List */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%] text-left">
                  Working under tight deadlines taught us the value of a
                  lightweight design system to enable faster iteration.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%] text-left">
                  Balancing automation and personalization highlighted the need
                  for AI to enhance, not replace, human voice.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%] text-left">
                  Team members coming from different backgrounds showed how
                  early alignment workshops reduce friction later.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-[150%] text-left">
                  Designing for both job seekers and recruiters reminded us that
                  trust and perceived authenticity are non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesLearnings;
