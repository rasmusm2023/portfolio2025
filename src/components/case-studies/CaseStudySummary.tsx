import React from "react";

interface CaseStudySummaryProps {
  description: string;
}

const CaseStudySummary: React.FC<CaseStudySummaryProps> = ({ description }) => {
  return (
    <section className="pt-32 pb-16 fade-in-section">
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
              Summary
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent mb-8"></div>
          </div>
          <div className="w-[600px]">
            <div className="mb-12 space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%]">
                {description}
              </p>
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-[150%]">
                My role focused extensively on leading and managing the UX/UI
                design process, ensuring the platform is not only functional but
                also provides an intuitive and enjoyable user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySummary;
