"use client";

import HeroTitleCycle from "@/components/ui/HeroTitleCycle";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bricolageGrotesque } from "@/app/fonts";

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
    id: "el-portero",
    title: "El Portero",
    subtitle:
      "A modern, warm, and premium online presence with effortless booking for visitors",
    image:
      "/assets/case-study-assets/el-portero/Projects-Case-Card-Thumbnail-El-Portero.webp",
    alt: "El Portero Restaurant Website",
    link: "/case-studies/el-portero",
    badge: "Case study",
  },
  {
    id: "emplojd",
    title: "Emplojd",
    subtitle: "Enhancing job applications without compromising authenticity",
    image:
      "/assets/case-study-assets/emplojd/Projects-Case-Card-Thumbnail-Emplojd.webp",
    alt: "Emplojd SaaS Platform Case Study",
    link: "/case-studies/emplojd",
    badge: "Case study",
  },
  {
    id: "noted",
    title: "Noted",
    subtitle:
      "Task management with organizing features built for everyday life",
    image:
      "/assets/case-study-assets/noted/Projects-Case-Card-Thumbnail-Noted.webp",
    alt: "Noted App",
    link: "/case-studies/noted",
    badge: "Coming soon",
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    subtitle:
      "Wearable-connected coaching for stress, activity, and healthier work—powered by AI",
    image:
      "/assets/case-study-assets/zmartrest-ai/Projects-Case-Card-Thumbnail-Zmartrest-AI.webp",
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
    accentGradient:
      "linear-gradient(145deg, #0f766e 0%, #14b8a6 38%, #5eead4 72%, #a7f3d0 100%)",
  },
  {
    title: "UI Design",
    description:
      "I design scalable design systems and high-fidelity interfaces that are clear, accessible, and aligned with your product and brand.",
    accentGradient:
      "linear-gradient(145deg, #6d28d9 0%, #8b5cf6 35%, #c084fc 65%, #f0abfc 100%)",
  },
  {
    title: "Design Systems",
    description:
      "I build and document component libraries and patterns so teams can ship consistent, maintainable UIs at scale.",
    accentGradient:
      "linear-gradient(145deg, #1d4ed8 0%, #2563eb 35%, #38bdf8 70%, #7dd3fc 100%)",
  },
  {
    title: "Product Strategy",
    description:
      "I help shape product discovery, prioritization, and roadmaps tied to outcomes—focusing on growth, retention, and continuous learning.",
    accentGradient:
      "linear-gradient(145deg, #c2410c 0%, #ea580c 32%, #fb923c 62%, #fcd34d 100%)",
  },
  {
    title: "Prototyping",
    description:
      "I create interactive prototypes to validate flows and interactions early, from concept to handoff for development.",
    accentGradient:
      "linear-gradient(145deg, #be185d 0%, #db2777 35%, #f472b6 68%, #fbcfe8 100%)",
  },
  {
    title: "Frontend",
    description:
      "I implement designs in code when needed, using modern tools to bridge design and development and ship real products.",
    accentGradient:
      "linear-gradient(145deg, #047857 0%, #059669 32%, #34d399 65%, #a7f3d0 100%)",
  },
];

const career = [
  { period: "(2025 – now)", role: "Freelance Product Designer" },
  { period: "(2025)", role: "UX/UI Designer Intern at Zmartrest AI" },
  { period: "(2024)", role: "UX/UI Designer Intern at Xbrandify" },
  {
    period: "(2023 – 2025)",
    role: "Full Time UX/UI Design Student at Chas Academy",
  },
];

const personalProjects = [
  { period: "(2025 – now)", role: "Product Designer & Developer on Noted" },
  {
    period: "(2025 – now)",
    role: "Product Designer & Developer on Basecamp.space",
  },
];

const heroHiddenStyle = {
  opacity: 0,
  filter: "blur(12px)",
  transform: "translateY(14px)" as const,
};
const subtitleHiddenStyle = {
  opacity: 0,
  filter: "blur(12px)",
  transform: "translateY(12px)" as const,
};

export default function Home() {
  const pathname = usePathname();
  const servicesRowCount = Math.ceil(services.length / 3);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [servicesRowInView, setServicesRowInView] = useState<boolean[]>(() =>
    Array(servicesRowCount).fill(false),
  );
  const [sectionTitlesInView, setSectionTitlesInView] = useState({
    selectedWorks: false,
    services: false,
    aboutMe: false,
  });
  const [heroScrollStyle, setHeroScrollStyle] = useState({
    scale: 1,
    blur: 0,
  });

  // Skills grid: reveal all rows together when the grid crosses the same threshold (was per-row)
  useLayoutEffect(() => {
    const grid = servicesGridRef.current;
    if (!grid) return;

    const markAllInView = () => {
      setServicesRowInView((prev) =>
        prev.every(Boolean) ? prev : Array(servicesRowCount).fill(true),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) markAllInView();
        });
      },
      { threshold: 0, rootMargin: "0px 0px -50% 0px" },
    );

    observer.observe(grid);

    if (typeof window !== "undefined") {
      const rect = grid.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      if (rect.top <= viewportCenter) markAllInView();
    }

    return () => observer.disconnect();
  }, [servicesRowCount]);

  // Section titles: unblur + fade in when scrolled into view (left-to-right)
  // Observe section elements (larger) so intersection fires reliably; set title in view when section enters
  useEffect(() => {
    const keys: ("selectedWorks" | "services" | "aboutMe")[] = [
      "selectedWorks",
      "services",
      "aboutMe",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = (entry.target as HTMLElement).getAttribute(
            "data-section-name",
          ) as "selectedWorks" | "services" | "aboutMe" | null;
          if (key && keys.includes(key))
            setSectionTitlesInView((prev) => ({ ...prev, [key]: true }));
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    const timer = setTimeout(() => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-section-name]",
      );
      nodes.forEach((el) => observer.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-section-name]",
      );
      nodes.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Run entrance every time we're on home: new key + delay adding class so browser always runs the animation (works even if Next.js reuses the component)
  const [entranceKey, setEntranceKey] = useState(() =>
    typeof window !== "undefined" ? Date.now() : 0,
  );
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
    <div
      className={`min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 ${bricolageGrotesque.variable}`}
    >
      {/* Hero text: fixed to viewport center, behind scrolling content; key forces remount on navigate back so entrance replays */}
      <div
        id="home"
        className="fixed inset-0 z-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] pointer-events-none"
      >
        <div
          key={entranceKey}
          className="will-change-transform origin-center flex flex-col items-center"
          style={{
            transform: `scale(${heroScrollStyle.scale})`,
            transition: "transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="w-fit max-w-full">
            <h1
              className="font-bricolage-grotesque text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tighter text-neutral-900 dark:text-white mb-4 whitespace-nowrap"
              style={{
                filter: `blur(${heroScrollStyle.blur}px)`,
                transition: "filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <span
                className={`inline-block ${runHeroEntrance ? "hero-entrance-1" : ""}`}
                style={!runHeroEntrance ? heroHiddenStyle : undefined}
              >
                Rasmus
              </span>
              <span
                className={`inline-block ml-5 sm:ml-6 ${runHeroEntrance ? "hero-entrance-2" : ""}`}
                style={!runHeroEntrance ? heroHiddenStyle : undefined}
              >
                Mattsson
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal uppercase tracking-wide w-full text-right md:whitespace-nowrap">
              <span
                className={`inline ${runHeroEntrance ? "hero-entrance-3-lite" : ""}`}
                style={
                  !runHeroEntrance
                    ? { opacity: 0, transform: "translateY(12px)" }
                    : undefined
                }
              >
                <span className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-20">
                  <HeroTitleCycle scrollBlur={heroScrollStyle.blur} />{" "}
                  <span
                    style={{
                      filter: `blur(${heroScrollStyle.blur}px)`,
                      transition:
                        "filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    Designer
                  </span>
                </span>{" "}
                <span
                  className="text-neutral-500 dark:text-neutral-40"
                  style={{
                    filter: `blur(${heroScrollStyle.blur}px)`,
                    transition:
                      "filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  from Sweden, currently living in Stockholm.
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Spacer: less than full viewport so Selected Works teases above the fold */}
      <div className="min-h-[85vh]" aria-hidden />

      {/* Main content: higher z-index and background so it scrolls over hero text */}
      <div className="relative z-10 bg-white dark:bg-[#0a0a0a]">
        {/* Selected Works — 2×2 up to 1920px; 3-up from 1921px; 4-up from 2560px */}
        <section
          data-section-name="selectedWorks"
          className="pt-8 md:pt-12 pb-16 md:pb-24 w-full border-t border-neutral-200 dark:border-[#1a1a1a]"
        >
          <div className="site-content-shell px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <SectionEyebrow>Experience</SectionEyebrow>
                <h2
                  data-section-title="selectedWorks"
                  className={`font-bricolage-grotesque text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tighter ${sectionTitlesInView.selectedWorks ? "section-title-in-view" : ""}`}
                >
                  <span
                    className="section-title-word"
                    style={{ ["--word-index" as string]: 0 }}
                  >
                    Selected
                  </span>{" "}
                  <span
                    className="section-title-word"
                    style={{ ["--word-index" as string]: 1 }}
                  >
                    works
                  </span>
                </h2>
              </div>
              <Link
                href="/works"
                className="text-sm font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity underline underline-offset-4 uppercase"
              >
                See all works
              </Link>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 works-3col:grid-cols-3 works-4col:grid-cols-4 gap-4 md:gap-5 w-full ${
                sectionTitlesInView.selectedWorks
                  ? "selected-works-in-view"
                  : ""
              }`}
            >
              {works.map((work, index) => (
                <Link
                  key={work.id}
                  href={work.link}
                  className="group block case-card-entrance"
                  style={{ ["--card-index" as string]: index }}
                  aria-label={`View ${work.title} case study`}
                >
                  <div className="aspect-[6/5] sm:aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-90">
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1920px) 50vw, (max-width: 2559px) 33vw, 25vw"
                    />
                    {work.badge && (
                      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-black/80 text-neutral-800 dark:text-white backdrop-blur-sm">
                        {work.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col gap-0.5">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white uppercase tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-40 text-base sm:text-lg font-medium">
                      {work.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills — gradient morphs into alternating bottom corners (clip-path), black fills the rest */}
        <section data-section-name="services" className="py-10 md:py-14 w-full">
          <div className="site-content-shell px-4 sm:px-6 md:px-8 lg:px-12">
            <SectionEyebrow>Capabilities</SectionEyebrow>
            <h2
              data-section-title="services"
              className={`font-bricolage-grotesque text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4 md:mb-5 tracking-tighter ${sectionTitlesInView.services ? "section-title-in-view" : ""}`}
            >
              <span
                className="section-title-word"
                style={{ ["--word-index" as string]: 0 }}
              >
                Skills
              </span>
            </h2>
            <div
              ref={servicesGridRef}
              className={`skills-cards-root grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full ${servicesRowInView.map((v, i) => (v ? `case-row-${i}-in-view` : "")).join(" ")}`}
            >
              {services.map((service, index) => {
                const rowIndex = Math.floor(index / 3);
                const cornerPos =
                  index % 2 === 0
                    ? ({
                        "--skills-corner-x": "100%",
                        "--skills-corner-y": "100%",
                      } as const)
                    : ({
                        "--skills-corner-x": "0%",
                        "--skills-corner-y": "100%",
                      } as const);
                const article = (
                  <article
                    tabIndex={0}
                    className={`group relative overflow-hidden aspect-[3/2] sm:aspect-[4/3] skills-card-entrance skills-card-row-${rowIndex} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none bg-black"
                      aria-hidden
                    />
                    <div
                      className="skills-card-gradient-morph absolute inset-0"
                      style={{
                        backgroundImage: service.accentGradient,
                        ...cornerPos,
                      }}
                    />
                    <div className="absolute inset-0 z-10 pb-3 pt-3 px-4 md:px-5 flex flex-col">
                      <div className="flex items-start justify-between gap-3 flex-1 min-h-0">
                        <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
                          <h3 className="font-bricolage-grotesque text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                            {service.title}
                          </h3>
                          <p className="skills-card-description text-sm sm:text-base font-normal leading-snug opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                            — {service.description}
                          </p>
                        </div>
                        <div
                          className="relative w-10 h-10 shrink-0 flex items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                          aria-hidden
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                          >
                            <line
                              x1="4"
                              y1="12"
                              x2="20"
                              y2="12"
                              className="origin-center transition-transform duration-500 ease-in-out group-hover:rotate-180 group-focus-within:rotate-180"
                            />
                            <line
                              x1="12"
                              y1="4"
                              x2="12"
                              y2="20"
                              className="origin-center transition-transform duration-500 ease-in-out group-hover:rotate-90 group-focus-within:rotate-90"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                );
                return (
                  <div key={service.title} className="block">
                    {article}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Info - Jorge template style: content + image (same width as other sections, image right, same size as Services cards) */}
        <section
          id="about-me"
          data-section-name="aboutMe"
          className="py-16 md:py-24 w-full"
        >
          <div className="site-content-shell px-4 sm:px-6 md:px-8 lg:px-12">
            <SectionEyebrow>Profile</SectionEyebrow>
            <h2
              data-section-title="aboutMe"
              className={`font-bricolage-grotesque text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 tracking-tighter ${sectionTitlesInView.aboutMe ? "section-title-in-view" : ""}`}
            >
              <span
                className="section-title-word"
                style={{ ["--word-index" as string]: 0 }}
              >
                About
              </span>{" "}
              <span
                className="section-title-word"
                style={{ ["--word-index" as string]: 1 }}
              >
                me
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-8">
              <div className="flex flex-col gap-8 md:gap-10 order-2 md:order-1 lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                  <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-40 shrink-0">
                    What I do
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    I’m a product designer looking for my next role. I bring
                    clarity and craft to digital products—from research and
                    strategy to UI and implementation—and I’m keen to join a
                    team where I can contribute and keep learning.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                  <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-40 shrink-0">
                    My background
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    I’ve designed across health-tech, travel, retail, SaaS, and
                    AI—at startups and larger companies. I studied UX/UI design
                    and frontend at Chas Academy in Stockholm and accessibility
                    at Axess Labs.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                  <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-40 shrink-0">
                    My approach
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    I start with empathy and user-centered methods: asking
                    questions, listening, and iterating so the result is honest,
                    usable, and built to last.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                  <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-40 shrink-0">
                    Career
                  </h3>
                  <ul className="space-y-2 text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    {career.map((item) => (
                      <li key={item.role}>
                        {item.period} — {item.role}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                  <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-40 shrink-0">
                    Personal projects
                  </h3>
                  <ul className="space-y-2 text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    {personalProjects.map((item) => (
                      <li key={item.role}>
                        {item.period} — {item.role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative aspect-[6/5] sm:aspect-[1/1] overflow-hidden bg-neutral-200 dark:bg-neutral-80 order-1 md:order-2 lg:col-span-1">
                <Image
                  src="/assets/about/profile-4.png"
                  alt="Rasmus Mattsson"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
