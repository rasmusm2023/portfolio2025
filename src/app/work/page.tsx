"use client";

import CustomCursor from "@/components/CustomCursor";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export default function WorkPage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="w-full">
            <div
              className="flex items-center justify-between"
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <div className="relative w-fit">
                <h1
                  className={`text-7xl uppercase font-bold [background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken pb-2 ${hanken.className}`}
                >
                  My Work
                </h1>
                <div className="absolute -bottom-4 left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase Section */}
        <ProjectShowcase />

        {/* Additional Work Categories */}
        <section className="py-16">
          <div className="w-full">
            <div
              className="flex items-center justify-between mb-16"
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <div className="relative w-fit">
                <h2
                  className={`text-5xl uppercase font-bold [background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken pb-2 ${hanken.className}`}
                >
                  Other Work
                </h2>
                <div className="absolute -bottom-4 left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Case Studies */}
                <div className="group cursor-pointer">
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-neutral-100/10 dark:border-neutral-90/10">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
                      Case Studies
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed">
                      In-depth explorations of design challenges, processes, and
                      outcomes from real projects.
                    </p>
                  </div>
                </div>

                {/* Design Gallery */}
                <div className="group cursor-pointer">
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-neutral-100/10 dark:border-neutral-90/10">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
                      Design Gallery
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed">
                      A curated collection of visual designs, prototypes, and
                      creative explorations.
                    </p>
                  </div>
                </div>

                {/* Projects */}
                <div className="group cursor-pointer">
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-neutral-100/10 dark:border-neutral-90/10">
                    <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
                      Projects
                    </h3>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed">
                      Live projects and applications showcasing technical
                      implementation and user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="w-full">
            <div
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-neutral-100 dark:text-neutral-0 mb-8">
                  Ready to explore?
                </h2>
                <p className="text-xl text-neutral-80 dark:text-neutral-20 mb-12 leading-relaxed">
                  Dive into my case studies to see the full design process, or
                  browse the design gallery for visual inspiration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors duration-300">
                    View Case Studies
                  </button>
                  <button className="px-8 py-4 bg-neutral-10 dark:bg-neutral-90 hover:bg-neutral-20 dark:hover:bg-neutral-80 text-neutral-100 dark:text-neutral-0 font-bold rounded-lg transition-colors duration-300">
                    Browse Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
