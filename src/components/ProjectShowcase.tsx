"use client";

import Image from "next/image";
import Link from "next/link";
import { colors } from "@/styles/colors";

interface Project {
  id: string;
  title: string;
  keywords: string[];
  image: string;
  alt: string;
  link: string;
  isGif?: boolean;
}

const projects: Project[] = [
  {
    id: "noted",
    title: "Noted",
    keywords: ["UX/UI Design", "Mobile App", "User Research", "Prototyping"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
    alt: "Noted App Interface",
    link: "/case-studies/noted-app",
  },
  {
    id: "zmartrest",
    title: "Zmartrest AI",
    keywords: [
      "AI/ML",
      "Dashboard Design",
      "Data Visualization",
      "User Experience",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    alt: "Zmartrest AI Dashboard",
    link: "/case-studies/zmartrest-ai",
    isGif: true,
  },
  {
    id: "fokus",
    title: "Fokus",
    keywords: ["Mobile App", "Productivity", "User Interface", "App Design"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
    alt: "Fokus Mobile App",
    link: "/case-studies/fokus",
    isGif: true,
  },
  {
    id: "emplojd",
    title: "Emplojd",
    keywords: [
      "SaaS Platform",
      "HR Management",
      "Web Design",
      "User Experience",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    alt: "Emplojd HR Platform",
    link: "/case-studies/emplojd",
  },
];

const ProjectShowcase = () => {
  return (
    <section className="py-16">
      <div className="w-full">
        <div className="container mx-auto px-8 mb-16">
          <div className="relative w-fit mx-auto">
            <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects-orange)] bg-clip-text text-transparent font-hanken pb-2">
              Some of my previous projects
            </h2>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ffb571] to-transparent opacity-50" />
          </div>
        </div>

        <div className="space-y-0 w-full">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className="group block w-full h-48 bg-neutral-100 hover:bg-gradient-to-r hover:from-[#ffb571]/60 hover:via-[#ff8c42]/50 hover:to-[#ff6b35]/60 transition-all duration-300 overflow-hidden"
            >
              <div
                className="flex items-center justify-between h-full py-8"
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                {/* Left side - Project info */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-neutral-0 group-hover:text-[#ffb571] transition-colors font-hanken">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    {project.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-lg text-neutral-60 group-hover:text-neutral-30 font-medium transition-colors duration-300">
                          {keyword}
                        </span>
                        {index < project.keywords.length - 1 && (
                          <span className="text-neutral-40 group-hover:text-neutral-20 mx-2 transition-colors duration-300">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Project image */}
                <div className="relative h-40 w-64 overflow-hidden bg-neutral-80 rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={256}
                    height={160}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-neutral-100/10 group-hover:bg-neutral-100/20 transition-colors duration-300" />
                  {/* GIF indicator */}
                  {project.isGif && (
                    <div className="absolute top-2 right-2 bg-[#ffb571] text-neutral-100 text-xs font-bold px-1.5 py-0.5 rounded">
                      GIF
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
