import React from "react";
import Link from "next/link";

const OtherStudies: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-95 dark:to-neutral-90 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
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

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-8 xl:gap-10 gap-4 sm:gap-6">
          {/* Zmartrest AI Case Study */}
          <Link
            href="/case-studies/zmartrest-ai"
            className="group relative overflow-hidden bg-neutral-0 dark:bg-[#060608] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="aspect-[3/2] bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-orange-200 transition-colors">
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                  <span className="font-semibold text-xs sm:text-sm">
                    View Case Study
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Noted App Case Study */}
          <Link
            href="/case-studies/noted-app"
            className="group relative overflow-hidden bg-neutral-0 dark:bg-[#060608] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="aspect-[3/2] bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-pink-200 transition-colors">
                  Noted App
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  AI-powered note-taking app with intelligent organization and
                  search
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                  <span className="font-semibold text-xs sm:text-sm">
                    View Case Study
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OtherStudies;
