"use client";

import { colors, gradients } from "@/styles/colors";
import AnimatedBlob from "@/components/AnimatedBlob";
import Link from "next/link";

// Sample case study data - you can replace with your actual projects
const caseStudies = {
  "2025": [
    {
      id: 1,
      title: "Portfolio Website 2025",
      description: "Modern portfolio built with Next.js and Tailwind CSS",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      link: "/case-studies/portfolio-2025",
    },
    {
      id: 2,
      title: "Noted App",
      description: "A comprehensive note-taking app with intuitive design",
      category: "UX/UI Design",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
      link: "/case-studies/noted-app",
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Real-time chat app with AI-powered responses and analytics",
      category: "AI/ML",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
      link: "#",
    },
  ],
  "2024": [
    {
      id: 4,
      title: "Mobile App Design",
      description: "Cross-platform mobile application with intuitive design",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
      link: "#",
    },
    {
      id: 5,
      title: "Brand Identity System",
      description: "Complete brand identity and design system for startup",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
      link: "#",
    },
    {
      id: 6,
      title: "SaaS Dashboard",
      description: "Comprehensive admin dashboard with advanced analytics",
      category: "SaaS",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      link: "#",
    },
  ],
  "2023": [
    {
      id: 7,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for business analytics",
      category: "Data Visualization",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
      link: "#",
    },
    {
      id: 8,
      title: "Restaurant Management System",
      description: "Complete POS and inventory management solution",
      category: "Business Software",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
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
                primary: "rgba(205, 255, 113, 0.6)", // Lime/avocado green #CDFF71
                secondary: "rgba(215, 255, 141, 0.4)", // Lighter green #D7FF8D
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-work)] bg-clip-text text-transparent font-hanken">
                    Work
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
                            <Link
                              key={project.id}
                              href={project.link}
                              className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                              {/* Project background image */}
                              <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />

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
                            </Link>
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
                  Let's Talk
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
