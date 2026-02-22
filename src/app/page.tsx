"use client";

import Footer from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const heroHiddenStyle = { opacity: 0, filter: "blur(12px)", transform: "translateY(14px)" as const };
const subtitleHiddenStyle = { opacity: 0, filter: "blur(12px)", transform: "translateY(12px)" as const };

export default function Home() {
  const pathname = usePathname();
  const [heroScrollStyle, setHeroScrollStyle] = useState({
    scale: 1,
    blur: 0,
  });

  // Run entrance every time we're on home: new key + delay adding class so browser always runs the animation (works even if Next.js reuses the component)
  const [entranceKey, setEntranceKey] = useState(() => (typeof window !== "undefined" ? Date.now() : 0));
  const [runHeroEntrance, setRunHeroEntrance] = useState(false);
  useEffect(() => {
    if (pathname !== "/") {
      setRunHeroEntrance(false);
      return;
    }
    setEntranceKey(Date.now());
    setRunHeroEntrance(false);
    // Two frames so the DOM sees the class removed before we add it back (forces animation to replay)
    let id2: number | undefined;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setRunHeroEntrance(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      if (id2 !== undefined) cancelAnimationFrame(id2);
    };
  }, [pathname]);

  useEffect(() => {
    document.title = "Rasmus Mattsson | Product Designer Portfolio";
  }, []);
  const [scrollEffectReady, setScrollEffectReady] = useState(false);

  // Sticky hero: text stays centered; on scroll it shrinks and blurs
  const SCROLL_DISTANCE = 680;
  const updateHeroScroll = (scrollY: number) => {
    const progress = Math.min(1, scrollY / SCROLL_DISTANCE);
    const scale = 1 - progress * 0.4; // 1 → 0.6
    const blur = progress * 8; // 0 → 8px
    setHeroScrollStyle({ scale, blur });
  };

  // Delay enabling scroll-based scale/blur until after entrance so nothing can hide the hero on load
  useEffect(() => {
    if (pathname !== "/") {
      setScrollEffectReady(false);
      return;
    }
    const t = setTimeout(() => setScrollEffectReady(true), 1600);
    return () => clearTimeout(t);
  }, [pathname]);

  // Hero shrink/blur: use window.scrollY only (not Lenis) so we never get a wrong value that hides the hero
  useEffect(() => {
    if (!scrollEffectReady || pathname !== "/") return;
    setHeroScrollStyle({ scale: 1, blur: 0 });
    const handleScroll = () => updateHeroScroll(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollEffectReady, pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Hero text: fixed to viewport center, behind scrolling content; key forces remount on navigate back so entrance replays */}
      <div
        id="home"
        className="fixed inset-0 z-0 flex items-center justify-center px-4 pointer-events-none"
      >
        <div
          key={entranceKey}
          className="will-change-transform origin-center text-center"
          style={{
            transform: `scale(${heroScrollStyle.scale})`,
            filter: `blur(${heroScrollStyle.blur}px)`,
            transition:
              "transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tighter text-neutral-900 dark:text-white mb-4 uppercase whitespace-nowrap">
            <span className={`inline-block ${runHeroEntrance ? "hero-entrance-1" : ""}`} style={!runHeroEntrance ? heroHiddenStyle : undefined}>Rasmus</span>
            <span className={`inline-block ml-5 sm:ml-6 ${runHeroEntrance ? "hero-entrance-2" : ""}`} style={!runHeroEntrance ? heroHiddenStyle : undefined}>Mattsson</span>
          </h1>
          <p
            className={`text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal uppercase tracking-wide max-w-2xl mx-auto text-center ${runHeroEntrance ? "hero-entrance-3" : ""}`}
            style={!runHeroEntrance ? subtitleHiddenStyle : undefined}
          >
            <span className="text-neutral-500 dark:text-neutral-200">Product Designer</span>
            {" "}
            from Sweden, currently living in Stockholm.
          </p>
        </div>
      </div>

      {/* Spacer so page content starts at expected height */}
      <div className="min-h-[100vh]" aria-hidden />

      {/* Main content: higher z-index and background so it scrolls over hero text */}
      <div className="relative z-10 bg-white dark:bg-[#0a0a0a]">
        {/* Selected Works - two cards span almost full viewport width */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pt-2 md:pt-4 pb-16 md:pb-24 w-full border-t border-[#1a1a1a]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white uppercase tracking-tighter">
              Selected Works
            </h2>
            <Link
              href="/archives"
              className="text-sm font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity underline underline-offset-4 uppercase"
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
