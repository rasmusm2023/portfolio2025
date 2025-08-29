import React from "react";

interface BusinessObjectiveProps {
  businessObjectivesText?: React.ReactNode;
}

const BusinessObjective: React.FC<BusinessObjectiveProps> = ({
  businessObjectivesText,
}) => {
  return (
    <section
      data-section="business-objective"
      className="py-12 sm:py-12 md:py-16 fade-in-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              Business Objective
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              {businessObjectivesText || (
                <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                  The business objective was to create a platform that
                  simplifies the job application process while maintaining the
                  personal touch that recruiters value.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessObjective;
