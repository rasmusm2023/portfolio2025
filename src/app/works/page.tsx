"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { bricolageGrotesque, figtree } from "@/app/fonts";
import Footer from "@/components/layout/Footer";

type FilterValue = "both" | "design" | "development";

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "both", label: "All" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
];

type PrimaryTag = "DESIGN" | "DEVELOPMENT" | "DESIGN & DEVELOPMENT";

/** Matches home skills card accent gradients (vertical for left border) */
const WORK_HOVER_GRADIENTS = {
  prototyping:
    "linear-gradient(180deg, #be185d 0%, #db2777 35%, #f472b6 68%, #fbcfe8 100%)",
  uiDesign:
    "linear-gradient(180deg, #6d28d9 0%, #8b5cf6 35%, #c084fc 65%, #f0abfc 100%)",
  designSystems:
    "linear-gradient(180deg, #1d4ed8 0%, #2563eb 35%, #38bdf8 70%, #7dd3fc 100%)",
  uxResearch:
    "linear-gradient(180deg, #0f766e 0%, #14b8a6 38%, #5eead4 72%, #a7f3d0 100%)",
  productStrategy:
    "linear-gradient(180deg, #c2410c 0%, #ea580c 32%, #fb923c 62%, #fcd34d 100%)",
} as const;

interface WorkEntry {
  id: string;
  title: string;
  /** Short line that explains the project and piques interest; shown on hover */
  subtitle: string;
  /** Primary tag: DESIGN, DEVELOPMENT, or DESIGN & DEVELOPMENT */
  primaryTag: PrimaryTag;
  /** Secondary tags (lower hierarchy): e.g. DESIGN SYSTEMS, PROTOTYPING */
  categories: string[];
  /** Case study URL; ignored when comingSoon is true */
  link: string;
  /** Image for hover (right-side diagonal reveal); used as video poster when hoverVideo is set */
  image: string;
  /** Left border gradient on row hover (home skills card accents) */
  hoverAccentGradient: string;
  /** Optional looping WebM (or other) clip for the hover panel instead of a static image */
  hoverVideo?: string;
  /** Row is preview-only (no navigation to a case study yet) */
  comingSoon?: boolean;
}

const CASE_STUDIES: WorkEntry[] = [
  {
    id: "el-portero",
    title: "El Portero",
    subtitle:
      "A modern, warm, and premium restaurant presence, custom website and staff admin portal.",
    primaryTag: "DESIGN & DEVELOPMENT",
    categories: [
      "WEB",
      "MOBILE",
      "UI DESIGN",
      "UX DESIGN",
      "BRAND DESIGN",
      "PRINT DESIGN",
    ],
    link: "/case-studies/el-portero",
    image: "/assets/case-study-assets/el-portero/Projects-Case-Card-Thumbnail-El-Portero.webp",
    hoverAccentGradient: WORK_HOVER_GRADIENTS.productStrategy,
  },
  {
    id: "emplojd",
    title: "Emplojd",
    subtitle: "Helping job seekers stand out without losing their voice.",
    primaryTag: "DESIGN",
    categories: ["PRODUCT STRATEGY", "UI DESIGN"],
    link: "/case-studies/emplojd",
    image: "https://picsum.photos/seed/emplojd/800/500",
    hoverAccentGradient: WORK_HOVER_GRADIENTS.uiDesign,
  },
  {
    id: "noted",
    title: "Noted",
    subtitle: "Task management with organizing features built for everyday life",
    primaryTag: "DESIGN",
    categories: ["PROTOTYPING", "UI DESIGN"],
    link: "/case-studies/noted",
    image: "https://picsum.photos/seed/noted/800/500",
    hoverAccentGradient: WORK_HOVER_GRADIENTS.designSystems,
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    subtitle: "Wearable-connected coaching for stress, activity, and healthier work—powered by AI",
    primaryTag: "DESIGN & DEVELOPMENT",
    categories: ["PRODUCT STRATEGY", "DESIGN SYSTEMS"],
    link: "/case-studies/zmartrest-ai",
    image: "https://picsum.photos/seed/zmartrest/800/500",
    hoverAccentGradient: WORK_HOVER_GRADIENTS.uxResearch,
  },
  {
    id: "basecamp-space",
    title: "basecamp.space",
    subtitle:
      "Save and organize links you need to remember—an empowered bookmark experience I designed and developed end-to-end.",
    primaryTag: "DESIGN & DEVELOPMENT",
    categories: ["PRODUCT", "FULL STACK"],
    link: "#",
    image: "https://picsum.photos/seed/basecamp-space/800/500",
    hoverAccentGradient: WORK_HOVER_GRADIENTS.productStrategy,
    comingSoon: true,
  },
];

const ARCHIVES_ENTRY = {
  id: "archives",
  title: "Archives",
  subtitle: "The rest of my work.",
  primaryTag: "DESIGN & DEVELOPMENT" as PrimaryTag,
  categories: ["BROWSE ARCHIVES"],
  link: "/archives",
  image: "https://picsum.photos/seed/archives/800/500",
};

function WorkProjectRow({ work }: { work: WorkEntry }) {
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  const rowPointerHandlers = work.hoverVideo
    ? {
        onPointerEnter: () => {
          void hoverVideoRef.current?.play();
        },
        onPointerLeave: () => {
          const v = hoverVideoRef.current;
          if (!v) return;
          v.pause();
          v.currentTime = 0;
        },
      }
    : {};

  const rowInner = (
    <div className="flex items-center justify-between min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] pl-0 pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-5 md:py-6 transition-[padding] duration-300 group-hover:pl-5 group-hover:sm:pl-6 group-hover:md:pl-7 group-hover:lg:pl-8">
      <div className="flex flex-col gap-2 z-10 max-w-xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2
            className={`font-bricolage-grotesque whitespace-nowrap shrink-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-neutral-100 dark:text-white transition-colors duration-300 ${
              work.comingSoon
                ? "group-hover:text-neutral-80 dark:group-hover:text-neutral-100"
                : "group-hover:text-white dark:group-hover:text-black"
            }`}
          >
            {work.title}
          </h2>
          {work.comingSoon && (
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-40 border border-neutral-30 dark:border-neutral-60 px-2 py-0.5 rounded-full shrink-0">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-base sm:text-lg font-normal text-neutral-50 dark:text-neutral-40 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-neutral-30 dark:group-hover:text-neutral-60">
          — {work.subtitle}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 text-sm uppercase tracking-wider transition-colors duration-300">
          <span
            className={`font-medium transition-colors duration-300 ${
              work.comingSoon
                ? "text-neutral-70 dark:text-neutral-30 group-hover:text-neutral-80 dark:group-hover:text-neutral-20"
                : "text-neutral-70 dark:text-neutral-30 group-hover:text-white dark:group-hover:text-neutral-90"
            }`}
          >
            {work.primaryTag}
          </span>
          {work.categories.length > 0 && (
            <>
              <span className="text-neutral-40 dark:text-neutral-50 group-hover:text-neutral-20 dark:group-hover:text-neutral-70" aria-hidden>
                ·
              </span>
              <span className="text-xs text-neutral-50 dark:text-neutral-40 group-hover:text-neutral-20 dark:group-hover:text-neutral-70">
                {work.categories.join(" · ")}
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className="works-row-image absolute right-0 top-0 bottom-0 w-[48%] min-w-[240px] max-w-[480px] opacity-0 pointer-events-none transition-opacity duration-500 ease-out group-hover:opacity-100"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-neutral-10 dark:bg-neutral-100 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{
            clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          {work.hoverVideo ? (
            <video
              ref={hoverVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={work.image}
              muted
              playsInline
              loop
              preload="metadata"
            >
              <source src={work.hoverVideo} type="video/webm" />
            </video>
          ) : (
            <Image src={work.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 400px, 480px" />
          )}
        </div>
      </div>
    </div>
  );

  const interactiveClasses =
    "works-row group block border-b border-neutral-10 dark:border-neutral-70 hover:border-b-transparent relative overflow-hidden transition-colors duration-300 bg-transparent hover:bg-black dark:hover:bg-white";
  const comingSoonClasses =
    "works-row group block border-b border-neutral-10 dark:border-neutral-70 hover:border-b-transparent relative overflow-hidden transition-colors duration-300 bg-transparent hover:bg-neutral-10 dark:hover:bg-neutral-90/60 cursor-default";

  const hoverAccentBorder = (
    <div
      className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: work.hoverAccentGradient }}
      aria-hidden
    />
  );

  if (work.comingSoon) {
    return (
      <div
        className={comingSoonClasses}
        aria-disabled="true"
        aria-label={`${work.title} — coming soon`}
        {...rowPointerHandlers}
      >
        {hoverAccentBorder}
        {rowInner}
      </div>
    );
  }

  return (
    <Link href={work.link} className={interactiveClasses} aria-label={`View ${work.title}`} {...rowPointerHandlers}>
      {hoverAccentBorder}
      {rowInner}
    </Link>
  );
}

const worksPageHiddenStyle = { opacity: 0, filter: "blur(12px)", transform: "translateY(14px)" as const };

export default function WorksPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("both");
  const [runEntrance, setRunEntrance] = useState(false);

  useEffect(() => {
    document.title = "Works — Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setRunEntrance(true), 0);
    return () => clearTimeout(t);
  }, []);

  const filteredCaseStudies = useMemo(() => {
    if (selectedFilter === "both") return CASE_STUDIES;
    if (selectedFilter === "design") {
      return CASE_STUDIES.filter(
        (w) => w.primaryTag === "DESIGN" || w.primaryTag === "DESIGN & DEVELOPMENT"
      );
    }
    return CASE_STUDIES.filter(
      (w) => w.primaryTag === "DEVELOPMENT" || w.primaryTag === "DESIGN & DEVELOPMENT"
    );
  }, [selectedFilter]);

  const showArchives = true;

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-100 dark:text-white transition-colors duration-300 ${figtree.className} ${bricolageGrotesque.variable}`}
    >
      <div className="pt-24 sm:pt-28 pb-16 md:pb-24 flex flex-col lg:flex-row">
        {/* Left: filters sidebar */}
        <aside className="lg:w-[25%] xl:w-[22%] shrink-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 lg:pt-2">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-100 dark:text-white uppercase tracking-tighter mb-8 lg:mb-12 ${runEntrance ? "works-entrance-1" : ""}`}
            style={!runEntrance ? worksPageHiddenStyle : undefined}
          >
            Works
          </h1>
          <nav
            className={`flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1 ${runEntrance ? "works-entrance-2" : ""}`}
            style={!runEntrance ? worksPageHiddenStyle : undefined}
            aria-label="Filter by type"
          >
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedFilter(value)}
                className={`py-2 pr-4 text-sm font-medium lg:text-left lg:w-full border-b-2 rounded-none transition-all duration-300 ease-out ${
                  selectedFilter === value
                    ? "pl-0 border-neutral-100 dark:border-white text-neutral-100 dark:text-white bg-transparent"
                    : "pl-4 border-transparent bg-transparent text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-neutral-20"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right: project list ~75% width */}
        <div
          className={`flex-1 w-full lg:max-w-[75%] ${runEntrance ? "works-entrance-3" : ""}`}
          style={!runEntrance ? worksPageHiddenStyle : undefined}
        >
          <div key={selectedFilter} className="works-list-fade">
          {/* Case studies */}
          {filteredCaseStudies.map((work) => (
            <WorkProjectRow key={work.id} work={work} />
          ))}

          {/* Archives — lower contrast (navigation to other work, not a case study) */}
          {showArchives && (
            <Link
                href={ARCHIVES_ENTRY.link}
                className="works-row group block border-b border-neutral-10 dark:border-neutral-70 hover:border-b-transparent relative overflow-hidden transition-colors duration-300 bg-transparent hover:bg-neutral-70 dark:hover:bg-neutral-30"
                aria-label={`View ${ARCHIVES_ENTRY.title}`}
              >
                <div className="flex items-center justify-end min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-5 md:py-6 transition-[padding] duration-300 group-hover:pl-5 group-hover:sm:pl-6 group-hover:md:pl-7 group-hover:lg:pl-8">
                  <div className="flex flex-col gap-2 z-10 max-w-xl text-right">
                    <h2 className="font-bricolage-grotesque text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-40 dark:text-neutral-60 transition-colors duration-300 group-hover:text-neutral-20 dark:group-hover:text-neutral-70">
                      {ARCHIVES_ENTRY.title}
                    </h2>
                    <p className="text-base sm:text-lg font-normal text-neutral-40 dark:text-neutral-60 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-neutral-30 dark:group-hover:text-neutral-60">
                      — {ARCHIVES_ENTRY.subtitle}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 text-sm uppercase tracking-wider transition-colors duration-300 justify-end">
                      {ARCHIVES_ENTRY.categories.length > 0 && (
                        <span className="text-xs text-neutral-50 dark:text-neutral-50 group-hover:text-neutral-30 dark:group-hover:text-neutral-60">
                          {ARCHIVES_ENTRY.categories.join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
          )}
          </div>
        </div>
      </div>

      {/* Get in touch - full width below */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <section
          id="contact"
          className="mt-20 md:mt-28 pt-16 border-t border-neutral-20 dark:border-neutral-80"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100 dark:text-white mb-8">
            Get in touch
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a
              href="mailto:hello@rasmusmattsson.com"
              className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Email
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/rasmus-mattsson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </section>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
