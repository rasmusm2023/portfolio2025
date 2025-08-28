import React from "react";

interface CaseStudySectionProps {
  children: React.ReactNode;
  title?: string;
  background?: string;
  padding?: string;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  dataSection?: string;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  children,
  title,
  background = "py-16",
  padding = "py-16",
  className = "",
  ref,
  dataSection,
}) => {
  return (
    <section
      ref={ref}
      data-section={dataSection}
      className={`${padding} ${background} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {title && (
          <div className="flex justify-center gap-12 mb-16">
            <div className="w-[600px]">
              <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                {title}
              </h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default CaseStudySection;
