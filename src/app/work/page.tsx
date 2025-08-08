"use client";

import CustomCursor from "@/components/CustomCursor";
import ProjectShowcase from "@/components/ProjectShowcase";
import Footer from "@/components/Footer";
import AnimatedBlob from "@/components/AnimatedBlob";
import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export default function WorkPage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
        {/* Hero Section */}
        <section className="h-[80vh] relative">
          <AnimatedBlob
            gradientColors={{
              primary: "rgba(139, 92, 246, 0.6)", // Purple primary
              secondary: "rgba(168, 85, 247, 0.4)", // Purple secondary
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-start w-full"
            style={{ height: "100vh" }}
          >
            <div
              className="w-full max-w-[1600px] mx-auto px-8"
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                    Selected works
                  </span>
                </h1>
                <div className="flex justify-between items-start mt-16">
                  <div className="flex-1 max-w-[48rem]">
                    <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                      Projects that quickly show how I solve problems and make
                      great user experiences happen.
                    </p>
                  </div>
                  <div className="ml-8">
                    <span className="text-neutral-60 dark:text-neutral-40 text-5xl font-medium font-hanken tracking-wide">
                      Case Studies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase Section - 4 Case Study Banners */}
        <ProjectShowcase showTitle={false} />

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
                {/* Design Gallery */}
                <Link href="/design-gallery" className="group cursor-pointer">
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                </Link>
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

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
