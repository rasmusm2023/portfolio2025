"use client";

import Footer from "@/components/layout/Footer";
import { MapPin, Briefcase, FileText, ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

const experience = [
  { company: "Stealth Startup", role: "Founder & Product Designer", period: "2025 – Present", logo: null },
  { company: "Zmartrest AI", role: "UX Designer Intern", period: "2025", logo: "/assets/logos/Experience/zmartrest-logo-light-mode.svg" },
  { company: "Xbrandify", role: "UX Designer Intern", period: "2024–25", logo: null },
  { company: "Emplojd", role: "Lead UX/UI Designer", period: "2023–24", logo: "/assets/logos/CaseStudies/Emplojd/Emplojd-Logotype-Black.svg" },
  { company: "Liljekvists Motor AB", role: "Digital Experience Specialist", period: "2022–23", logo: null },
  { company: "Vuxen Group", role: "Digital Designer & E-commerce", period: "2020–22", logo: null },
];

export default function About() {
  useEffect(() => {
    document.title = "About | Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 font-sans">
      <div className="relative z-10">
        {/* Intro — Michelle Liu style: Hi I'm X, location, then blurb; optional hero image */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 pt-[128px] sm:pt-[144px] xl:pt-[160px] pb-16 md:pb-24">
          <div className="max-w-5xl flex flex-col md:flex-row md:items-start md:gap-12 lg:gap-16">
            <div className="max-w-3xl flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight mb-2 text-left">
                Hi, I'm Rasmus!
              </h1>
              <p className="text-base text-[#6e6e73] dark:text-[#a1a1a6] mb-6 text-left flex items-center gap-2">
                <MapPin size={18} weight="regular" className="shrink-0 opacity-70" aria-hidden />
                Stockholm, Sweden
              </p>
            <p className="text-lg text-[#1d1d1f] dark:text-[#a1a1a6] leading-relaxed text-left mb-4">
              I'm a product designer from Sweden, based in Stockholm. I help
              teams find clarity and express it through strong, thoughtful
              design — from research and strategy to UI and implementation.
              I've worked across health-tech, travel, SaaS, and AI.
            </p>
            <p className="text-lg text-[#1d1d1f] dark:text-[#a1a1a6] leading-relaxed text-left mb-4">
              I believe thoughtful design makes complex systems feel simple and
              inclusive. I want to bring more of that into the world—whether
              through digital products or the way we build them.
            </p>
            <p className="text-base text-[#6e6e73] dark:text-[#a1a1a6] italic text-left mb-4">
              3 words to describe me: Curious, systematic, user-obsessed.
            </p>
            <p className="text-lg text-[#1d1d1f] dark:text-[#a1a1a6] text-left flex flex-wrap items-center gap-x-1">
              Working on something cool?{" "}
              <Link
                href="/#contact"
                className="text-[#1d1d1f] dark:text-[#f5f5f7] underline underline-offset-2 hover:no-underline inline-flex items-center gap-1.5"
              >
                <ChatCircleDots size={18} weight="regular" aria-hidden />
                Get in touch
              </Link>
              !
            </p>
            </div>
            {/* Hero image — replace src with your portrait when ready */}
            <div className="mt-8 md:mt-0 w-full md:w-72 lg:w-80 shrink-0 aspect-[4/5] max-h-[420px] relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src="/assets/case-study-assets/placeholder.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
        </section>

        {/* Experience — Resume link + list like Michelle's */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight mb-4 text-left flex items-center gap-2">
              <Briefcase size={28} weight="regular" className="shrink-0 opacity-80" aria-hidden />
              Experience
            </h2>
            <p className="mb-8 text-left">
              <Link
                href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1d1d1f] dark:text-[#f5f5f7] underline underline-offset-2 hover:no-underline font-medium inline-flex items-center gap-2"
              >
                <FileText size={20} weight="regular" aria-hidden />
                Resume
              </Link>
            </p>
            <ul className="space-y-5">
              {experience.map(({ company, role, period, logo }) => (
                <li
                  key={`${company}-${period}`}
                  className="text-left flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <Image
                        src={logo}
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain w-8 h-8 dark:[filter:invert]"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-[#6e6e73] dark:text-[#a1a1a6]">
                        {company.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7] text-lg">
                      {company}
                    </p>
                    <p className="text-[#6e6e73] dark:text-[#a1a1a6] text-base mt-0.5">
                      {role}, {period}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="px-16 max-md:px-6 w-full pt-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full" />
        </div>

        {/* Contact / Footer */}
        <div id="contact" className="pt-16 pb-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
