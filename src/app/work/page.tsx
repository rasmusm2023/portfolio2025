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
                  <div className="bg-neutral-3 dark:bg-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[850px] flex flex-col relative">
                    {/* Noise background overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "256px 256px",
                      }}
                    />
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src="/case-study-assets/emplojd/Emplojd-Case-Image-3.jpg"
                        alt="Emplojd HR Platform"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-8 mt-auto">
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          2024
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          Lead UX/UI Designer
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          School project
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Emplojd
                      </h3>
                      <p className="text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed mb-4">
                        Enhancing job applications without compromising
                        authenticity.
                      </p>
                      <div className="flex justify-end">
                        <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-0 group-hover:border-neutral-100/40 dark:group-hover:border-neutral-0/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                          <svg
                            className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-neutral-0 dark:group-hover:text-neutral-100 transition-colors duration-300"
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
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider py-3 pb-4">
                          <span>SaaS Platform</span>
                          <span>•</span>
                          <span>AI-powered</span>
                          <span>•</span>
                          <span>Web Design</span>
                          <span>•</span>
                          <span>UX/UI Design</span>
                          <span>•</span>
                          <span>SaaS Platform</span>
                          <span>•</span>
                          <span>AI-powered</span>
                          <span>•</span>
                          <span>Web Design</span>
                          <span>•</span>
                          <span>UX/UI Design</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Placeholder Case Study 1 */}
                <Link href="/work-in-progress" className="group cursor-pointer">
                  <div className="bg-neutral-3 dark:bg-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[850px] relative flex flex-col">
                    {/* Noise background overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "256px 256px",
                      }}
                    />
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1000&fit=crop&crop=center"
                        alt="Project Alpha Design"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-8 mt-auto">
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-semibold text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-0 dark:bg-neutral-100 px-4 py-2 rounded-full border border-neutral-20 dark:border-neutral-80 uppercase tracking-wider">
                          Coming Soon
                        </span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          2024
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          Product Designer
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          Mobile App
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Case Study Being Developed
                      </h3>
                      <p className="text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed mb-4">
                        Revolutionary design solution for modern challenges
                      </p>
                      <div className="flex justify-end">
                        <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-0 group-hover:border-neutral-100/40 dark:group-hover:border-neutral-0/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                          <svg
                            className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-neutral-0 dark:group-hover:text-neutral-100 transition-colors duration-300"
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
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider py-3 pb-4">
                          <span>Innovation</span>
                          <span>•</span>
                          <span>Design System</span>
                          <span>•</span>
                          <span>User Research</span>
                          <span>•</span>
                          <span>Prototyping</span>
                          <span>•</span>
                          <span>Innovation</span>
                          <span>•</span>
                          <span>Design System</span>
                          <span>•</span>
                          <span>User Research</span>
                          <span>•</span>
                          <span>Prototyping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Placeholder Case Study 2 */}
                <Link href="/work-in-progress" className="group cursor-pointer">
                  <div className="bg-neutral-3 dark:bg-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100/10 dark:border-neutral-90/10 h-[850px] relative flex flex-col">
                    {/* Noise background overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none rounded-2xl z-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "256px 256px",
                      }}
                    />
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1000&fit=crop&crop=center"
                        alt="Project Beta UX Design"
                        className="w-full h-3/4 group-hover:h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 absolute top-0 left-0"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-8 mt-auto">
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-semibold text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-0 dark:bg-neutral-100 px-4 py-2 rounded-full border border-neutral-20 dark:border-neutral-80 uppercase tracking-wider">
                          Coming Soon
                        </span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          2024
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          UX Researcher
                        </span>
                        <span className="text-base font-medium text-neutral-100/60 dark:text-neutral-0/60 bg-neutral-100/5 dark:bg-neutral-0/5 px-3 py-1 rounded-full">
                          Web Application
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-80 dark:text-neutral-30 mb-3 group-hover:text-neutral-100 dark:group-hover:text-neutral-0 transition-colors">
                        Case Study Being Developed
                      </h3>
                      <p className="text-lg text-neutral-60 dark:text-neutral-40 leading-relaxed mb-4">
                        Innovative approach to user experience design
                      </p>
                      <div className="flex justify-end">
                        <div className="w-12 h-12 rounded-full bg-neutral-100/5 dark:bg-neutral-0/5 border border-neutral-100/20 dark:border-neutral-0/20 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-0 group-hover:border-neutral-100/40 dark:group-hover:border-neutral-0/40 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                          <svg
                            className="w-5 h-5 text-neutral-100/60 dark:text-neutral-0/60 group-hover:text-neutral-0 dark:group-hover:text-neutral-100 transition-colors duration-300"
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
                    </div>

                    {/* Scrolling Keywords Banner */}
                    <div className="bg-gradient-to-r from-neutral-100/10 via-neutral-100/5 to-neutral-100/10 dark:from-neutral-0/10 dark:via-neutral-0/5 dark:to-neutral-0/10 backdrop-blur-sm border-t border-neutral-100/20 dark:border-neutral-0/20 overflow-hidden">
                      <div className="flex animate-scroll">
                        <div className="flex space-x-4 whitespace-nowrap text-neutral-100/60 dark:text-neutral-0/60 text-xs font-bold uppercase tracking-wider py-3 pb-4">
                          <span>UX Strategy</span>
                          <span>•</span>
                          <span>Mobile Design</span>
                          <span>•</span>
                          <span>Accessibility</span>
                          <span>•</span>
                          <span>Performance</span>
                          <span>•</span>
                          <span>UX Strategy</span>
                          <span>•</span>
                          <span>Mobile Design</span>
                          <span>•</span>
                          <span>Accessibility</span>
                          <span>•</span>
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
                <h2 className="text-3xl font-bold text-neutral-100/60 dark:text-neutral-0/60 mb-8">
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
                  <button className="px-8 py-4 bg-neutral-10 dark:bg-neutral-90 hover:bg-neutral-20 dark:hover:bg-neutral-80 text-neutral-100/60 dark:text-neutral-0/60 font-bold rounded-lg transition-colors duration-300">
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
