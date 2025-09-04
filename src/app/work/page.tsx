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

        {/* Case Studies Cards Section */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Emplojd Case Study */}
                <Link
                  href="/case-studies/emplojd"
                  className="group cursor-pointer"
                >
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop&crop=center"
                        alt="Emplojd HR Platform"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-125 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 mt-auto">
                      <div className="mb-4">
                        <span className="text-sm font-medium text-purple-500 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-500/20 px-3 py-1 rounded-full">
                          2024
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Emplojd
                      </h3>
                      <p className="text-lg text-neutral-80 dark:text-neutral-20 leading-relaxed mb-4">
                        Enhancing job applications without compromising
                        authenticity.
                      </p>
                      <div className="flex items-center text-purple-500 dark:text-purple-400 font-medium group-hover:translate-x-1 transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                        <span className="bg-purple-500/10 dark:bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800/50 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 group-hover:border-purple-300 dark:group-hover:border-purple-700/50 transition-all duration-300">
                          View case study
                        </span>
                        <svg
                          className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-purple-500/10 backdrop-blur-sm border-t border-purple-500/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-8 whitespace-nowrap text-purple-500 dark:text-purple-400 text-sm font-bold uppercase tracking-wider py-2">
                          <span>SaaS Platform</span>
                          <span>AI-powered</span>
                          <span>Web Design</span>
                          <span>UX/UI Design</span>
                          <span>SaaS Platform</span>
                          <span>AI-powered</span>
                          <span>Web Design</span>
                          <span>UX/UI Design</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Placeholder Case Study 1 */}
                <Link href="/work-in-progress" className="group cursor-pointer">
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-full relative flex flex-col">
                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1000&fit=crop&crop=center"
                        alt="Project Alpha Design"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-125 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 mt-auto">
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800/50">
                          Coming Soon
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-neutral-60 dark:text-neutral-40 bg-neutral-20 dark:bg-neutral-80 px-3 py-1 rounded-full">
                          2024
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Case Study Being Developed
                      </h3>
                      <p className="text-lg text-neutral-80 dark:text-neutral-20 leading-relaxed mb-4">
                        Revolutionary design solution for modern challenges
                      </p>
                      <div className="flex items-center text-purple-500 dark:text-purple-400 font-medium group-hover:translate-x-1 transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                        <span className="bg-purple-500/10 dark:bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800/50 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 group-hover:border-purple-300 dark:group-hover:border-purple-700/50 transition-all duration-300">
                          View case study
                        </span>
                        <svg
                          className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 backdrop-blur-sm border-t border-blue-500/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-8 whitespace-nowrap text-blue-500 dark:text-blue-400 text-sm font-bold uppercase tracking-wider py-2">
                          <span>Innovation</span>
                          <span>Design System</span>
                          <span>User Research</span>
                          <span>Prototyping</span>
                          <span>Innovation</span>
                          <span>Design System</span>
                          <span>User Research</span>
                          <span>Prototyping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Placeholder Case Study 2 */}
                <Link href="/work-in-progress" className="group cursor-pointer">
                  <div className="bg-neutral-10 dark:bg-neutral-90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-full relative flex flex-col">
                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1000&fit=crop&crop=center"
                        alt="Project Beta UX Design"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-125 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 mt-auto">
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800/50">
                          Coming Soon
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-neutral-60 dark:text-neutral-40 bg-neutral-20 dark:bg-neutral-80 px-3 py-1 rounded-full">
                          2024
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Case Study Being Developed
                      </h3>
                      <p className="text-lg text-neutral-80 dark:text-neutral-20 leading-relaxed mb-4">
                        Innovative approach to user experience design
                      </p>
                      <div className="flex items-center text-purple-500 dark:text-purple-400 font-medium group-hover:translate-x-1 transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                        <span className="bg-purple-500/10 dark:bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800/50 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 group-hover:border-purple-300 dark:group-hover:border-purple-700/50 transition-all duration-300">
                          View case study
                        </span>
                        <svg
                          className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 backdrop-blur-sm border-t border-green-500/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-8 whitespace-nowrap text-green-500 dark:text-green-400 text-sm font-bold uppercase tracking-wider py-2">
                          <span>UX Strategy</span>
                          <span>Mobile Design</span>
                          <span>Accessibility</span>
                          <span>Performance</span>
                          <span>UX Strategy</span>
                          <span>Mobile Design</span>
                          <span>Accessibility</span>
                          <span>Performance</span>
                        </div>
                      </div>
                    </div>
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
