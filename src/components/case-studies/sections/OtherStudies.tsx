import React from "react";
import Link from "next/link";
import Image from "next/image";
import CaseStudiesShowcase from "@/components/case-studies/CaseStudiesShowcase";

interface OtherStudiesProps {
  excludeIds?: string[];
}

const OtherStudies: React.FC<OtherStudiesProps> = ({ excludeIds = [] }) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-95 dark:to-neutral-90 fade-in-section">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-3 sm:mb-4">
            Explore More Case Studies
          </h2>
          <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover more of my design work and see how I approach different
            challenges across various industries and project types.
          </p>
        </div>

        {/* Case Studies Showcase */}
        <CaseStudiesShowcase showTitle={false} excludeIds={excludeIds} />
      </div>
    </section>
  );
};

export default OtherStudies;
