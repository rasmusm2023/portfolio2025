import React from "react";

const CaseStudyChallengesLearnings: React.FC = () => {
  return (
    <section data-section="challenges-learnings" className="py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex justify-center gap-12"
          style={{
            paddingTop: "calc(40vmax / 10)",
            paddingBottom: "calc(40vmax / 10)",
          }}
        >
          <div className="w-[600px]">
            <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
              Challenges & Learnings
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            <div className="mb-16">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                Every project comes with hurdles, and Emplojd was no exception.
                These challenges not only shaped the product but also provided
                valuable lessons that strengthened both the process and the
                outcome.
              </p>
            </div>

            {/* Challenges & Learnings List */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                  Working under tight deadlines taught us the value of a
                  lightweight design system to enable faster iteration.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                  Balancing automation and personalization highlighted the need
                  for AI to enhance, not replace, human voice.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
                  Team members coming from different backgrounds showed how
                  early alignment workshops reduce friction later.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 flex-shrink-0 bg-purple-400 rounded-full"></div>
                <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed">
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

export default CaseStudyChallengesLearnings;
