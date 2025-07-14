"use client";

import { colors, gradients } from "@/styles/colors";
import AnimatedBlob from "@/components/AnimatedBlob";

// Sample case study data - you can replace with your actual projects
const caseStudies = {
  "2025": [
    {
      id: 1,
      title: "Portfolio Website 2025",
      description: "Modern portfolio built with Next.js and Tailwind CSS",
      category: "Web Development",
      image: "/placeholder-project.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with modern UI/UX",
      category: "Full Stack",
      image: "/placeholder-project.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Real-time chat app with AI-powered responses and analytics",
      category: "AI/ML",
      image: "/placeholder-project.jpg",
      link: "#",
    },
  ],
  "2024": [
    {
      id: 4,
      title: "Mobile App Design",
      description: "Cross-platform mobile application with intuitive design",
      category: "Mobile Development",
      image: "/placeholder-project.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Brand Identity System",
      description: "Complete brand identity and design system for startup",
      category: "Branding",
      image: "/placeholder-project.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "SaaS Dashboard",
      description: "Comprehensive admin dashboard with advanced analytics",
      category: "SaaS",
      image: "/placeholder-project.jpg",
      link: "#",
    },
  ],
  "2023": [
    {
      id: 7,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for business analytics",
      category: "Data Visualization",
      image: "/placeholder-project.jpg",
      link: "#",
    },
    {
      id: 8,
      title: "Restaurant Management System",
      description: "Complete POS and inventory management solution",
      category: "Business Software",
      image: "/placeholder-project.jpg",
      link: "#",
    },
  ],
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(255, 181, 113, 0.6)", // Peach/orange
                secondary: "rgba(255, 140, 244, 0.4)", // Pink
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-home)] bg-clip-text text-transparent font-hanken">
                    My Work
                  </span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Case Studies
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[48rem]">
                    A collection of projects that showcase my journey in design
                    and development.
                  </p>
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[48rem]">
                    From web apps to mobile experiences, these projects
                    demonstrate my approach.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="py-16">
            <div className="text-left w-full max-w-[1600px]">
              {/* Year-based case studies */}
              <div className="space-y-16">
                {Object.keys(caseStudies)
                  .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
                  .map((year) => (
                    <div key={year} className="relative">
                      {/* Year label */}
                      <div className="mb-8">
                        <h2
                          className="text-6xl font-bold font-hanken bg-clip-text text-transparent"
                          style={{
                            backgroundImage: gradients["gradient-hero-home"],
                          }}
                        >
                          {year}
                        </h2>
                        <div className="w-64 h-1 bg-gradient-to-r from-accent-100/80 to-neutral-100/80 mt-2"></div>
                      </div>

                      {/* Projects grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies[year as keyof typeof caseStudies].map(
                          (project) => (
                            <div
                              key={project.id}
                              className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                              {/* Project background - you can add actual images here */}
                              <div className="absolute inset-0 bg-gradient-to-br from-neutral-80 to-neutral-90" />

                              {/* Overlay gradient */}
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                              {/* Project content */}
                              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="mb-2">
                                  <span className="inline-block px-3 py-1 bg-accent-100/20 text-accent-100 text-sm font-medium rounded-full font-hanken">
                                    {project.category}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-0 mb-2 group-hover:text-accent-100 transition-colors font-hanken">
                                  {project.title}
                                </h3>
                                <p className="text-neutral-30 text-sm leading-relaxed font-hanken">
                                  {project.description}
                                </p>
                              </div>

                              {/* Hover effect */}
                              <div className="absolute inset-0 bg-accent-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Call to action */}
              <div className="mt-16 text-center">
                <p className="text-neutral-30 mb-4 font-hanken">
                  Interested in working together?
                </p>
                <a
                  href="/contact"
                  className="inline-block px-8 py-3 bg-accent-100 text-neutral-100 font-medium rounded-full hover:bg-accent-200 transition-colors duration-300 font-hanken"
                >
                  Message me
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
