"use client";

import Image from "next/image";
import CircularTooltip from "@/components/CircularTooltip";

const Projects = () => {
  return (
    <section id="projects-section" className="pt-48 pb-24">
      <div className="text-left w-full max-w-[1600px] p-8">
        <div className="relative w-fit mx-auto mb-16">
          <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects-orange)] bg-clip-text text-transparent font-hanken pb-2">
            Some of my previous projects
          </h2>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ffb571] to-transparent opacity-50" />
        </div>
        <div className="grid grid-cols-2 gap-12">
          {/* First Project Box */}
          <CircularTooltip>
            <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
              {/* Project background image */}
              <Image
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center"
                alt="Emplojd"
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={900}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

              {/* Project content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                    UX/UI Design
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                  Noted
                </h3>
                <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                  Enhancing job applicants without sacrificing authenticity
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CircularTooltip>

          {/* Second Project Box */}
          <CircularTooltip>
            <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
              {/* Project background image */}
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
                alt="Zmartrest AI Dashboard"
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={900}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

              {/* Project content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                    AI/ML
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                  Zmartrest AI
                </h3>
                <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                  AI-powered platform for intelligent decision making and data
                  analysis.
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CircularTooltip>

          {/* Third Project Box */}
          <CircularTooltip>
            <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
              {/* Project background image */}
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
                alt="Fokus Mobile App"
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={900}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

              {/* Project content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                    Mobile App
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                  Fokus
                </h3>
                <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                  Productivity app designed to help users stay focused and
                  achieve their goals.
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CircularTooltip>

          {/* Fourth Project Box */}
          <CircularTooltip>
            <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
              {/* Project background image */}
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
                alt="Emplojd HR Platform"
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={900}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

              {/* Project content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                    SaaS Platform
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                  Emplojd
                </h3>
                <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                  Comprehensive HR platform for modern workplace management and
                  employee engagement.
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CircularTooltip>
        </div>
      </div>
    </section>
  );
};

export default Projects;
