"use client";

import Footer from "@/components/layout/Footer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    title: "UI Design",
    description:
      "I design scalable design systems and high-fidelity interfaces that are clear, accessible, and aligned with your product and brand.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
  },
  {
    title: "Product Strategy",
    description:
      "I help shape product discovery, prioritization, and roadmaps tied to outcomes—focusing on growth, retention, and continuous learning.",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?w=800&h=600&fit=crop",
  },
  {
    title: "Design Systems",
    description:
      "I build and document component libraries and patterns so teams can ship consistent, maintainable UIs at scale.",
    image: "https://images.unsplash.com/photo-1561070791-2526d31cc5b5?w=800&h=600&fit=crop",
  },
  {
    title: "Prototyping",
    description:
      "I create interactive prototypes to validate flows and interactions early, from concept to handoff for development.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
  },
  {
    title: "Frontend",
    description:
      "I implement designs in code when needed, using modern tools to bridge design and development and ship real products.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
  },
];

const career = [
  { period: "(2025)", role: "UX/UI Designer Intern at Zmartrest AI" },
  { period: "(2024)", role: "UX/UI Designer Intern at Xbrandify" },
  { period: "(2023 – 2025)", role: "Full Time UX/UI Design Student at Chas Academy" },
];

const personalProjects = [
  { period: "(2025 – now)", role: "Product Designer & Developer on Noted" },
  { period: "(2025 – now)", role: "Product Designer & Developer on Basecamp.space" },
];

const heroHiddenStyle = { opacity: 0, filter: "blur(12px)", transform: "translateY(14px)" as const };
const subtitleHiddenStyle = { opacity: 0, filter: "blur(12px)", transform: "translateY(12px)" as const };

export default function Home() {
  const pathname = usePathname();
  const rowCount = Math.ceil(works.length / 2);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [rowInView, setRowInView] = useState<boolean[]>(() =>
    Array(rowCount).fill(false)
  );
  const servicesRowCount = Math.ceil(services.length / 3);
  const servicesRowRefs = useRef<(HTMLElement | null)[]>([]);
  const [servicesRowInView, setServicesRowInView] = useState<boolean[]>(() =>
    Array(servicesRowCount).fill(false)
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

  // Case cards: entire row fades in when that row’s top edge reaches the center of the viewport
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.rowIndex);
          if (Number.isInteger(i) && i >= 0)
            setRowInView((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px", // root = top half of viewport; trigger when row top reaches center
      }
    );
    const refs = rowRefs.current;
    const alreadyInView: number[] = [];
    for (let i = 0; i < rowCount; i++) {
      const el = refs[i];
      if (el) {
        observer.observe(el);
        if (typeof window !== "undefined") {
          const rect = el.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          if (rect.top <= viewportCenter) alreadyInView.push(i);
        }
      }
    }
    if (alreadyInView.length > 0) {
      setRowInView((prev) => {
        const next = [...prev];
        alreadyInView.forEach((i) => (next[i] = true));
        return next;
      });
    }
    return () => observer.disconnect();
  }, [rowCount]);

  // Services grid: same row entrance as Selected Works (row top reaches viewport center)
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.rowIndex);
          if (Number.isInteger(i) && i >= 0)
            setServicesRowInView((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -50% 0px" }
    );
    const refs = servicesRowRefs.current;
    const alreadyInView: number[] = [];
    for (let i = 0; i < servicesRowCount; i++) {
      const el = refs[i];
      if (el) {
        observer.observe(el);
        if (typeof window !== "undefined") {
          const rect = el.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          if (rect.top <= viewportCenter) alreadyInView.push(i);
        }
      }
    }
    if (alreadyInView.length > 0) {
      setServicesRowInView((prev) => {
        const next = [...prev];
        alreadyInView.forEach((i) => (next[i] = true));
        return next;
      });
    }
    return () => observer.disconnect();
  }, [servicesRowCount]);

  // Section titles: unblur + fade in when scrolled into view (left-to-right)
  // Observe section elements (larger) so intersection fires reliably; set title in view when section enters
  useEffect(() => {
    const keys: ("selectedWorks" | "services" | "aboutMe")[] = ["selectedWorks", "services", "aboutMe"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = (entry.target as HTMLElement).getAttribute("data-section-name") as "selectedWorks" | "services" | "aboutMe" | null;
          if (key && keys.includes(key))
            setSectionTitlesInView((prev) => ({ ...prev, [key]: true }));
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    const timer = setTimeout(() => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-section-name]");
      nodes.forEach((el) => observer.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      const nodes = document.querySelectorAll<HTMLElement>("[data-section-name]");
      nodes.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

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
        className="fixed inset-0 z-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] pointer-events-none"
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
          <p className="text-sm sm:text-base md:text-lg font-normal uppercase tracking-wide max-w-2xl mx-auto text-center">
            <span
              className={`inline-block ${runHeroEntrance ? "hero-entrance-3" : ""}`}
              style={!runHeroEntrance ? subtitleHiddenStyle : undefined}
            >
              <span className="text-neutral-800 dark:text-neutral-200">Product Designer</span>
            </span>
            {" "}
            <span
              className={`inline-block text-neutral-500 dark:text-neutral-400 ${runHeroEntrance ? "hero-entrance-4" : ""}`}
              style={!runHeroEntrance ? subtitleHiddenStyle : undefined}
            >
              from Sweden, currently living in Stockholm.
            </span>
          </p>
        </div>
      </div>

      {/* Spacer so page content starts at expected height */}
      <div className="min-h-[100vh]" aria-hidden />

      {/* Main content: higher z-index and background so it scrolls over hero text */}
      <div className="relative z-10 bg-white dark:bg-[#0a0a0a]">
        {/* Selected Works - two cards span almost full viewport width */}
        <section
          data-section-name="selectedWorks"
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] pt-8 md:pt-12 pb-16 md:pb-24 w-full border-t border-neutral-200 dark:border-[#1a1a1a]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h2
              data-section-title="selectedWorks"
              className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white uppercase tracking-tighter ${sectionTitlesInView.selectedWorks ? "section-title-in-view" : ""}`}
            >
              <span className="section-title-word" style={{ ["--word-index" as string]: 0 }}>Selected</span>{" "}
              <span className="section-title-word" style={{ ["--word-index" as string]: 1 }}>Works</span>
            </h2>
            <Link
              href="/works"
              className="text-sm font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity underline underline-offset-4 uppercase"
            >
              See all works
            </Link>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full ${rowInView.map((v, i) => (v ? `case-row-${i}-in-view` : "")).join(" ")}`}
          >
            {works.map((work, index) => {
              const rowIndex = Math.floor(index / 2);
              const cardIndexInRow = index % 2;
              const isFirstInRow = cardIndexInRow === 0;
              const cardContent = (
                <>
                  <div className="aspect-[6/5] sm:aspect-[1/1] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
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
                  <div className="mt-4 flex flex-col gap-0.5">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white uppercase tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg font-medium">
                      {work.subtitle}
                    </p>
                  </div>
                </>
              );
              const card = (
                <Link
                  href={work.link}
                  className={`group block case-card-entrance case-card-row-${rowIndex}`}
                  aria-label={`View ${work.title} case study`}
                >
                  {cardContent}
                </Link>
              );
              if (isFirstInRow) {
                return (
                  <div
                    key={work.id}
                    ref={(el) => { if (el) rowRefs.current[rowIndex] = el; }}
                    data-row-index={rowIndex}
                    className="block"
                  >
                    {card}
                  </div>
                );
              }
              return <div key={work.id}>{card}</div>;
            })}
          </div>
        </section>

        {/* Skills - image grid: title at top, plus/minus icon top-right, description on hover */}
        <section
          data-section-name="services"
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-16 md:py-24 w-full"
        >
          <h2
            data-section-title="services"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 uppercase tracking-tighter ${sectionTitlesInView.services ? "section-title-in-view" : ""}`}
          >
            <span className="section-title-word" style={{ ["--word-index" as string]: 0 }}>Skills</span>
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full ${servicesRowInView.map((v, i) => (v ? `case-row-${i}-in-view` : "")).join(" ")}`}
          >
            {services.map((service, index) => {
              const rowIndex = Math.floor(index / 3);
              const isFirstInRow = index % 3 === 0;
              const article = (
                <article
                  key={service.title}
                  className={`group block relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[6/5] sm:aspect-[1/1] case-card-entrance case-card-row-${rowIndex}`}
                >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover transition-[transform,filter] duration-700 ease-in-out group-hover:scale-[1.04] group-hover:blur-[2px]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="services-card-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  aria-hidden
                />
                {/* Overlay spanning full image: light by default, hover adds services-card-overlay for more darkness */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/10 pb-4 pt-4 px-4 md:px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-12 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p
                        className="text-white/90 text-sm sm:text-base leading-relaxed font-medium opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                        aria-hidden
                      >
                        {service.description}
                      </p>
                    </div>
                    {/* Plus icon: both lines spin on hover; vertical rotates 90° to form minus */}
                    <div className="relative w-10 h-10 shrink-0 flex items-center justify-center text-white" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
                        {/* Horizontal line: full spin on hover */}
                        <line
                          x1="4"
                          y1="12"
                          x2="20"
                          y2="12"
                          className="origin-center transition-transform duration-500 ease-in-out group-hover:rotate-180"
                        />
                        {/* Vertical line: rotates 90° on hover to overlap horizontal → minus */}
                        <line
                          x1="12"
                          y1="4"
                          x2="12"
                          y2="20"
                          className="origin-center transition-transform duration-500 ease-in-out group-hover:rotate-90"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
              );
              if (isFirstInRow) {
                return (
                  <div
                    key={service.title}
                    ref={(el) => { if (el) servicesRowRefs.current[rowIndex] = el; }}
                    data-row-index={rowIndex}
                    className="block"
                  >
                    {article}
                  </div>
                );
              }
              return <div key={service.title}>{article}</div>;
            })}
          </div>
        </section>

        {/* Info - Jorge template style: content + image (same width as other sections, image right, same size as Services cards) */}
        <section
          id="about-me"
          data-section-name="aboutMe"
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-16 md:py-24 w-full"
        >
          <h2
            data-section-title="aboutMe"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 uppercase tracking-tighter ${sectionTitlesInView.aboutMe ? "section-title-in-view" : ""}`}
          >
            <span className="section-title-word" style={{ ["--word-index" as string]: 0 }}>About</span>{" "}
            <span className="section-title-word" style={{ ["--word-index" as string]: 1 }}>Me</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-8">
            <div className="flex flex-col gap-8 md:gap-10 order-2 md:order-1 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 shrink-0">
                  What I do
                </h3>
                <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                  I’m a product designer looking for my next role. I bring clarity
                  and craft to digital products—from research and strategy to UI
                  and implementation—and I’m keen to join a team where I can
                  contribute and keep learning.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 shrink-0">
                  My background
                </h3>
                <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                  I’ve designed across health-tech, travel, retail, SaaS, and
                  AI—at startups and larger companies. I studied UX/UI design and
                  frontend at Chas Academy in Stockholm and accessibility at Axess
                  Labs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 shrink-0">
                  My approach
                </h3>
                <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                  I start with empathy and user-centered methods: asking
                  questions, listening, and iterating so the result is honest,
                  usable, and built to last.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start">
                <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 shrink-0">
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
                <h3 className="text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 shrink-0">
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
            <div className="relative aspect-[6/5] sm:aspect-[1/1] overflow-hidden bg-neutral-200 dark:bg-neutral-800 order-1 md:order-2 lg:col-span-1">
              <Image
                src="/assets/about/profile-4.png"
                alt="Rasmus Mattsson"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Get in touch / Contact - reduced vertical padding */}
        <section
          id="contact"
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-10 md:py-14 w-full border-t border-neutral-200 dark:border-[#1a1a1a]"
        >
          <Footer />
        </section>
      </div>
    </div>
  );
}
