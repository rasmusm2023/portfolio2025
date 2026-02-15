"use client";

import Footer from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  link: string;
  badge?: string;
}

const works: WorkItem[] = [
  {
    id: "emplojd",
    title: "Emplojd",
    subtitle: "Enhancing job applications without compromising authenticity",
    image: "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "Emplojd SaaS Platform Case Study",
    link: "/case-studies/emplojd",
    badge: "Case study",
  },
  {
    id: "noted",
    title: "Noted",
    subtitle: "Revolutionary note-taking experience",
    image: "/assets/case-study-assets/noted/Projects-Case-Card-Thumbnail-Noted.webp",
    alt: "Noted App",
    link: "/case-studies/noted",
    badge: "Coming soon",
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    subtitle: "Intelligent restaurant management system",
    image: "/assets/case-study-assets/zmartrest-ai/Projects-Case-Card-Thumbnail-Zmartrest-AI.webp",
    alt: "Zmartrest AI Platform",
    link: "/case-studies/zmartrest-ai",
    badge: "Coming soon",
  },
];

const services = [
  {
    title: "UX Research",
    description:
      "I uncover user needs through research synthesis, interviews, and usability testing, turning insights into clear direction for product and design decisions.",
  },
  {
    title: "UI Design",
    description:
      "I design scalable design systems and high-fidelity interfaces that are clear, accessible, and aligned with your product and brand.",
  },
  {
    title: "Product Strategy",
    description:
      "I help shape product discovery, prioritization, and roadmaps tied to outcomes—focusing on growth, retention, and continuous learning.",
  },
  {
    title: "Design Systems",
    description:
      "I build and document component libraries and patterns so teams can ship consistent, maintainable UIs at scale.",
  },
  {
    title: "Prototyping",
    description:
      "I create interactive prototypes to validate flows and interactions early, from concept to handoff for development.",
  },
  {
    title: "Frontend",
    description:
      "I implement designs in code when needed, using modern tools to bridge design and development and ship real products.",
  },
];

const career = [
  { period: "2025", role: "Product Designer & Developer, Noted" },
  { period: "Jan – May 2025", role: "Product Designer Intern, Zmartrest AI" },
  { period: "Nov 2024 – Jan 2025", role: "UX/UI Designer Intern, Xbrandify" },
  { period: "Sep – Nov 2024", role: "UX/UI Designer, Fokus" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroScrollStyle, setHeroScrollStyle] = useState({
    translateY: 0,
    blur: 0,
    opacity: 1,
  });

  useEffect(() => {
    document.title = "Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  // Scroll-driven parallax (slide down behind cards), blur, and fade for hero text
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Blur: only when hero top has left the viewport (rect.top < 0), then ramp 0→8
      const blur =
        rect.top >= 0
          ? 0
          : Math.min(8, (-rect.top / viewportHeight) * 12);
      // Fade: 0 when hero in view, 1 when scrolled well up
      const fadeProgress = Math.max(
        0,
        Math.min(1, (viewportHeight * 0.5 - rect.top) / viewportHeight)
      );
      const opacity = Math.max(0.2, 1 - fadeProgress * 0.9);
      // Parallax: text slides downward as user scrolls, so it glides behind the cards section
      const slideFactor = 0.4;
      const translateY = rect.top <= 0 ? -rect.top * slideFactor : 0;
      setHeroScrollStyle({ translateY, blur, opacity });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="relative z-10">
        {/* Hero - scroll-driven parallax, blur, and slide */}
        <section
          ref={heroRef}
          id="home"
          className="min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto pt-24 pb-16"
        >
          <div
            className="will-change-transform"
            style={{
              transform: `translateY(${heroScrollStyle.translateY}px)`,
              filter: `blur(${heroScrollStyle.blur}px)`,
              opacity: heroScrollStyle.opacity,
              transition: "filter 0.1s ease-out, opacity 0.1s ease-out",
            }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 uppercase whitespace-nowrap">
              Rasmus Mattsson
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal uppercase tracking-wide max-w-2xl">
              Product Designer from Sweden, currently living in Stockholm.
            </p>
          </div>
        </section>

        {/* Selected Works - two cards span almost full viewport width */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white">
              Selected Works
            </h2>
            <Link
              href="/archives"
              className="text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              See all works
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
            {works.map((work) => (
              <Link
                key={work.id}
                href={work.link}
                className="group block"
                aria-label={`View ${work.title} case study`}
              >
                <div className="aspect-[16/10] sm:aspect-[3/2] relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={work.image}
                    alt={work.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {work.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-black/80 text-neutral-800 dark:text-white backdrop-blur-sm">
                      {work.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
                    {work.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
                    {work.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-12 md:mb-16">
            Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service) => (
              <div key={service.title} className="group">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info */}
        <section
          id="about-me"
          className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-12 md:mb-16">
            Info
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                What I do
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                I help teams and products find clarity and express it through
                strong, thoughtful design—from research and strategy to UI and
                implementation.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                My background
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                I’ve designed across health-tech, travel, retail, SaaS, and
                AI—at startups and larger companies. I studied UX/UI design and
                frontend at Chas Academy in Stockholm and accessibility at Axess
                Labs.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                My approach
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                I start with empathy and user-centered methods: asking
                questions, listening, and iterating so the result is honest,
                usable, and built to last.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                Career
              </h3>
              <ul className="space-y-3">
                {career.map((item) => (
                  <li
                    key={item.role}
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                      ({item.period})
                    </span>{" "}
                    {item.role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Get in touch */}
        <div id="contact" className="pt-16 pb-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
