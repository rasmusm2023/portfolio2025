import React from "react";

const Mockups: React.FC = () => {
  return (
    <section className="w-full">
      {/* Full-width bottom section */}
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2"
        style={{ aspectRatio: "2/1" }}
      >
        {/* Left Background - Sign-in */}
        <div className="bg-neutral-0 dark:bg-neutral-100 relative overflow-hidden">
          <img
            src="/case-study-assets/emplojd/Emplojd-Results-Shot-Sign-In-Create-Account.png"
            alt="Emplojd sign-in interface mockup"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Right Background - Job Search Results */}
        <div className="bg-neutral-0 dark:bg-neutral-100 relative overflow-hidden">
          <img
            src="/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png"
            alt="Emplojd job search results interface mockup"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Mockups;
