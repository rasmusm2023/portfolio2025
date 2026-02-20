"use client";

import Footer from "@/components/layout/Footer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Work items for 2x2 grid: image + Company • Year + description
const workItems = [
  {
    company: "Emplojd",
    year: "2024",
    description:
      "Enhancing job applications without compromising authenticity.",
    link: "/case-studies/emplojd",
    image:
      "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "Emplojd case study",
  },
  {
    company: "Noted",
    year: "2025",
    description: "Revolutionary note-taking and task management experience.",
    link: "/case-studies/noted",
    image:
      "/assets/case-study-assets/noted/Projects-Case-Card-Thumbnail-Noted.webp",
    alt: "Noted case study",
  },
  {
    company: "Zmartrest AI",
    year: "2025",
    description:
      "Intelligent restaurant management and health-tech for sustainable worklife.",
    link: "/case-studies/zmartrest-ai",
    image:
      "/assets/case-study-assets/zmartrest-ai/Projects-Case-Card-Thumbnail-Zmartrest-AI.webp",
    alt: "Zmartrest AI case study",
  },
  {
    company: "Archives",
    year: "",
    description: "More design work — apps, websites, games, print.",
    link: "/archives",
    image:
      "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "View archives",
  },
];

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  useEffect(() => {
    const section = heroSectionRef.current;
    const content = heroContentRef.current;
    if (!section || !content) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "top -15%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(content, {
          opacity: 1 - progress,
          y: progress * 56,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 font-sans">
      <div className="relative z-10">
        {/* Hero - left-aligned, Michelle Liu style; 88px from bottom of header */}
        <section
          ref={heroSectionRef}
          id="home"
          className="px-4 sm:px-6 md:px-8 lg:px-16 pt-[128px] sm:pt-[144px] xl:pt-[160px] pb-20 lg:pb-8"
        >
          <div ref={heroContentRef} className="max-w-3xl">
            {/* Name: match her text color and spacing */}
            <h1
              className="font-medium tracking-tight mb-3 lowercase text-left text-[#374151] dark:text-[#f5f5f7]"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                lineHeight: 1.08,
              }}
            >
              rasmus mattsson
            </h1>
            {/* Tagline: her body text size and line-height */}
            <p
              className="text-left dark:text-[#a1a1a6] mb-1"
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                color: "var(--hero-subheadline-color, #9CA3AF)",
              }}
            >
              Designing useful products that spark moments of delight and human
              connection.
            </p>
            {/* "Previously at..." + green dot; hover dot reveals "Working on something cool? Get in touch." (Michelle Liu style) */}
            <p
              className="text-left dark:text-[#a1a1a6]"
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                color: "var(--hero-subheadline-color, #9CA3AF)",
              }}
            >
              Previously at{" "}
              <span className="text-[#374151] dark:text-[#a1a1a6]">
                Zmartrest AI
              </span>{" "}
              &{" "}
              <span className="text-[#374151] dark:text-[#a1a1a6]">
                Xbrandify
              </span>
              .
              <span className="relative inline-flex items-center hero-status-group cursor-default align-baseline">
                <span className="hero-status-dot-wrap" aria-hidden>
                  <span className="hero-status-dot-ring hero-status-dot-ring-1" />
                  <span className="hero-status-dot-ring hero-status-dot-ring-2" />
                  <span className="hero-status-dot" />
                </span>
                <span className="hero-hover-reveal">
                  Working on something cool?{" "}
                  <Link
                    href="/#contact"
                    className="underline underline-offset-2 hover:no-underline"
                  >
                    Get in touch
                  </Link>
                  .
                </span>
              </span>
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="px-16 max-md:px-6 w-full pt-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full" />
        </div>

        {/* Work - 2x2 grid, Michelle Liu style: sharp image, minimal type */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 pb-16 md:pt-12 md:pb-24 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 w-full">
            {workItems.map((item) => (
              <Link
                key={`${item.company}-${item.year}`}
                href={item.link}
                className="group block text-left transition-transform duration-200 ease-out hover:scale-[0.99] origin-center"
                aria-label={`${item.company} ${item.year} — ${item.description}`}
              >
                <div className="aspect-[678/367.625] relative overflow-hidden rounded-[26px] border-2 border-white/20 bg-[#e5e7eb] dark:border-white/10 dark:bg-[#2c2c2e]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-opacity duration-200 group-hover:opacity-95"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Pill: company • year, bottom-left on image (Michelle Liu style) */}
                  <span
                    className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-[16px] font-medium tracking-tight shadow-sm dark:bg-black/70"
                    style={{ letterSpacing: "0.01em" }}
                  >
                    <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{item.company}</span>
                    {item.year ? (
                      <span className="text-[#9CA3AF]"> • {item.year}</span>
                    ) : null}
                  </span>
                </div>
                {/* Title only visible on card hover: slide up + fade */}
                <p
                  className="work-card-description mt-4 text-[16px] text-[#a1a1a6] leading-snug"
                  style={{ fontWeight: 400 }}
                >
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="px-16 max-md:px-6 w-full pt-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full" />
        </div>

        {/* About - minimal blurb, left-aligned */}
        <section
          id="about-me"
          className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-3xl py-16 md:py-24"
        >
          <h2 className="text-sm font-medium text-[#6e6e73] dark:text-[#a1a1a6] uppercase tracking-wider mb-4 text-left">
            About
          </h2>
          <p className="text-lg text-[#1d1d1f] dark:text-[#a1a1a6] leading-relaxed text-left">
            I’m a product designer from Sweden, based in Stockholm. I help teams
            find clarity and express it through strong, thoughtful design — from
            research and strategy to UI and implementation. I’ve worked across
            health-tech, travel, SaaS, and AI.
          </p>
          <p className="mt-4 text-base text-[#1d1d1f] dark:text-[#a1a1a6] text-left">
            <Link
              href="/archives"
              className="text-[#1d1d1f] dark:text-[#f5f5f7] underline underline-offset-2 hover:no-underline"
            >
              View archives
            </Link>
            {" · "}
            <Link
              href="/#contact"
              className="text-[#1d1d1f] dark:text-[#f5f5f7] underline underline-offset-2 hover:no-underline"
            >
              Contact
            </Link>
          </p>
        </section>

        {/* Divider */}
        <div className="px-16 max-md:px-6 w-full pt-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full" />
        </div>

        {/* Contact */}
        <div
          id="contact"
          className="pt-16 pb-16"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
