import React from "react";

const Mockups: React.FC = () => {
  return (
    <section className="w-full">
      {/* Responsive mockups container */}
      <div className="w-full">
        {/* Mobile: Vertical stacking, each image 100% width */}
        <div className="grid grid-cols-1 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
          {/* Sign-in Interface - Full width on mobile */}
          <div className="w-full bg-neutral-0 dark:bg-[#060608] relative overflow-hidden">
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Sign-In-Create-Account.png"
              alt="Emplojd sign-in interface mockup"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Job Search Results - Full width on mobile */}
          <div className="w-full bg-neutral-0 dark:bg-[#060608] relative overflow-hidden">
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png"
              alt="Emplojd job search results interface mockup"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Desktop: Side by side, each image 50% width */}
        <div
          className="hidden sm:grid md:grid lg:grid xl:grid 2xl:grid sm:grid-cols-2"
          style={{ aspectRatio: "2/1" }}
        >
          {/* Left Background - Sign-in */}
          <div className="bg-neutral-0 dark:bg-[#060608] relative overflow-hidden rounded-lg">
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Sign-In-Create-Account.png"
              alt="Emplojd sign-in interface mockup"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Background - Job Search Results */}
          <div className="bg-neutral-0 dark:bg-[#060608] relative overflow-hidden rounded-lg">
            <img
              src="/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png"
              alt="Emplojd job search results interface mockup"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mockups;
