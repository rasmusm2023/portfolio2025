import React from "react";

interface BusinessObjectiveProps {
  businessObjectivesText?: React.ReactNode;
}

const BusinessObjective: React.FC<BusinessObjectiveProps> = ({
  businessObjectivesText,
}) => {
  return (
    <section className="py-6 sm:py-8 md:py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              Business Objective
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[600px]">
            {businessObjectivesText ? (
              <div className="text-left">{businessObjectivesText}</div>
            ) : (
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
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

export default BusinessObjective;
