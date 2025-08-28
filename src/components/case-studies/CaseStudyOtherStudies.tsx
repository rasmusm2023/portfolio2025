import React from "react";
import Link from "next/link";

const CaseStudyOtherStudies: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-95 dark:to-neutral-90 fade-in-section">
      <div className="flex">
        {/* Left margin - 10% */}
        <div className="w-[10%]"></div>

        {/* Main content - 80% */}
        <div className="w-[80%] px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-neutral-100 dark:text-neutral-0 mb-4">
              Explore More Case Studies
            </h2>
            <p className="text-neutral-80 dark:text-neutral-20 text-lg leading-relaxed max-w-2xl mx-auto">
              Discover more of my design work and see how I approach different
              challenges across various industries and project types.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Zmartrest AI Case Study */}
            <Link
              href="/case-studies/zmartrest-ai"
              className="group relative overflow-hidden bg-neutral-0 dark:bg-neutral-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="aspect-[3/2] bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-orange-200 transition-colors">
                    Zmartrest AI
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    AI-powered restaurant management system with intelligent
                    inventory and ordering
                  </p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">
                      View Case Study
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Noted App Case Study */}
            <Link
              href="/case-studies/noted-app"
              className="group relative overflow-hidden bg-neutral-0 dark:bg-neutral-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="aspect-[3/2] bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-pink-200 transition-colors">
                    Fokus
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Fokus description
                  </p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">
                      View Case Study
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right margin - 10% */}
        <div className="w-[10%]"></div>
      </div>
    </section>
  );
};

export default CaseStudyOtherStudies;
