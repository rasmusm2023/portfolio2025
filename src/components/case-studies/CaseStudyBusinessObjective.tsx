import React from "react";

interface CaseStudyBusinessObjectiveProps {
  businessObjectivesText?: React.ReactNode;
}

const CaseStudyBusinessObjective: React.FC<CaseStudyBusinessObjectiveProps> = ({
  businessObjectivesText,
}) => {
  return (
    <section className="py-16 fade-in-section">
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
              Business Objective
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            {businessObjectivesText ? (
              <div>{businessObjectivesText}</div>
            ) : (
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyBusinessObjective;
