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
    image: "https://picsum.photos/seed/ux-research/800/600",
  },
  {
    title: "UI Design",
    description:
      "I design scalable design systems and high-fidelity interfaces that are clear, accessible, and aligned with your product and brand.",
    image: "https://picsum.photos/seed/ui-design/800/600",
  },
  {
    title: "Product Strategy",
    description:
      "I help shape product discovery, prioritization, and roadmaps tied to outcomes—focusing on growth, retention, and continuous learning.",
    image: "https://picsum.photos/seed/product-strategy/800/600",
  },
  {
    title: "Design Systems",
    description:
      "I build and document component libraries and patterns so teams can ship consistent, maintainable UIs at scale.",
    image: "https://picsum.photos/seed/design-systems/800/600",
  },
  {
    title: "Prototyping",
    description:
      "I create interactive prototypes to validate flows and interactions early, from concept to handoff for development.",
    image: "https://picsum.photos/seed/prototyping/800/600",
  },
  {
    title: "Frontend",
    description:
      "I implement designs in code when needed, using modern tools to bridge design and development and ship real products.",
    image: "https://picsum.photos/seed/frontend/800/600",
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
  const rowCount = Math.ceil(works.length / 2);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [rowInView, setRowInView] = useState<boolean[]>(() =>
    Array(rowCount).fill(false)
  );
  const [heroScrollStyle, setHeroScrollStyle] = useState({
    scale: 1,
    blur: 0,
  });

  // Case cards: fade + slide up when first card of each row reaches center of viewport (2-by-2)
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
        threshold: 0.1,
        rootMargin: "-35% 0px -35% 0px", // trigger when row is in center ~30% of viewport
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
          const centerY = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          if (Math.abs(centerY - viewportCenter) < window.innerHeight * 0.4)
            alreadyInView.push(i);
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
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] pt-8 md:pt-12 pb-16 md:pb-24 w-full border-t border-neutral-200 dark:border-[#1a1a1a]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
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
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-medium">
                      {work.subtitle}
                    </p>
                  </div>
                </>
              );
              const card = (
                <Link
                  href={work.link}
                  className={`group block case-card-entrance case-card-row-${rowIndex}`}
                  style={{ ["--card-index" as string]: cardIndexInRow }}
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

        {/* Services - same image grid as Selected Works: 3×2, title on image, description slides in on hover */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-16 md:py-24 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-6 uppercase tracking-tighter">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {services.map((service) => (
              <article
                key={service.title}
                className="group block relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[6/5] sm:aspect-[1/1]"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="card-hover-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  aria-hidden
                />
                {/* Overlay bottom-left: title visible; on hover title slides up, description slides in just below */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-4 px-4 md:px-5">
                  <div className="flex flex-col justify-end gap-1.5">
                    <div className="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out group-hover:max-h-20">
                      <p
                        className="text-white/90 text-xs sm:text-sm leading-relaxed font-semibold pt-0.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                        aria-hidden
                      >
                        {service.description}
                      </p>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-white uppercase tracking-tight shrink-0 transition-transform duration-300 ease-out translate-y-0 group-hover:-translate-y-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Info - Jorge template style: content + image (same width as other sections, image right, same size as Services cards) */}
        <section
          id="about-me"
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-16 md:py-24 w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-6 uppercase tracking-tighter">
            Info
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-2 gap-y-10 lg:gap-y-2">
            <div className="flex flex-col gap-10 md:gap-12 order-2 md:order-1 lg:col-span-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  What I do
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
                  I help teams and products find clarity and express it through
                  strong, thoughtful design—from research and strategy to UI and
                  implementation.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  My background
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
                  I’ve designed across health-tech, travel, retail, SaaS, and
                  AI—at startups and larger companies. I studied UX/UI design and
                  frontend at Chas Academy in Stockholm and accessibility at Axess
                  Labs.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  My approach
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
                  I start with empathy and user-centered methods: asking
                  questions, listening, and iterating so the result is honest,
                  usable, and built to last.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Career
                </h3>
                <ul className="space-y-2">
                  {career.map((item) => (
                    <li
                      key={item.role}
                      className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg"
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
            <div className="relative aspect-[6/5] sm:aspect-[1/1] overflow-hidden bg-neutral-200 dark:bg-neutral-800 order-1 md:order-2 lg:col-span-1">
              <Image
                src="https://picsum.photos/seed/about-info/600/800"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Get in touch */}
        <div id="contact" className="pt-16 pb-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
