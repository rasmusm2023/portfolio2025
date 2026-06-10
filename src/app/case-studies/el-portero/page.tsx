"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import Footer from "@/components/layout/Footer";
import CustomLightbox from "@/components/ui/Lightbox";

const LOGOTYPE_GALLERY_IMAGES = [
  {
    src: "/assets/case-study-assets/el-portero/el-portero-restaurant-outside.webp",
    alt: "El Portero logotype on the restaurant exterior",
    title: "Logotype on restaurant exterior",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-business-card-mockup.webp",
    alt: "El Portero logotype on a business card mockup",
    title: "Logotype on business card",
  },
];

const ADMIN_PORTAL_GALLERY_IMAGES = [
  {
    src: "/assets/case-study-assets/el-portero/el-portero-admin-portal-dashboard-mockup.webp",
    alt: "El Portero admin portal dashboard",
    title: "Admin portal dashboard",
  },
];

const CASE_STUDY_LIGHTBOX_IMAGES = [
  ...LOGOTYPE_GALLERY_IMAGES,
  ...ADMIN_PORTAL_GALLERY_IMAGES,
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="el-portero-stat-figure text-xs font-bold uppercase tracking-[0.2em] mb-3">
      {children}
    </p>
  );
}

const EDITORIAL_GRID =
  "grid gap-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,16rem)_1fr] xl:grid-cols-[minmax(0,17.5rem)_1fr] md:gap-x-8 lg:gap-x-10 xl:gap-x-12 md:items-start";

function EditorialSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-28">
      <div className={EDITORIAL_GRID}>
        <div className="md:sticky md:top-28 xl:top-32 self-start min-w-0">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-bricolage-grotesque text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] text-neutral-100 dark:text-neutral-0 tracking-tight leading-[1.2] text-pretty">
            {title}
          </h2>
        </div>
        <div className="min-w-0 w-full justify-self-stretch">{children}</div>
      </div>
    </section>
  );
}

function ClickableCaseImage({
  src,
  alt,
  onClick,
  width = 800,
  height = 500,
  sizes = "(max-width: 768px) 45vw, 320px",
}: {
  src: string;
  alt: string;
  onClick: () => void;
  width?: number;
  height?: number;
  sizes?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-lg border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20 cursor-zoom-in text-left transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-40 dark:focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-0 dark:focus-visible:ring-offset-[#060608]"
      aria-label={`View larger: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes={sizes}
      />
    </button>
  );
}

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-neutral-10 bg-neutral-3 px-3.5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-neutral-80 dark:bg-neutral-90/40 dark:shadow-none sm:px-4 sm:py-4">
      <p className="el-portero-stat-figure text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
        {figure}
      </p>
      <p className="mt-2 text-[11px] leading-snug text-neutral-60 dark:text-neutral-40 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function MetaCell({
  title,
  children,
  className = "",
  nowrap = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  nowrap?: boolean;
}) {
  return (
    <div className={`${nowrap ? "shrink-0" : "min-w-0"} ${className}`.trim()}>
      <p className="el-portero-stat-figure text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
        {title}
      </p>
      <div
        className={`text-sm text-neutral-80 dark:text-neutral-20 ${
          nowrap
            ? "whitespace-nowrap"
            : "leading-relaxed [overflow-wrap:anywhere]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ProcessStep({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 md:gap-5">
      <span className="text-xl shrink-0 leading-none" aria-hidden>
        {icon}
      </span>
      <div>
        <h3 className="font-bricolage-grotesque text-base md:text-lg font-semibold text-neutral-100 dark:text-neutral-0 mb-2">
          {title}
        </h3>
        <div className="text-base text-neutral-80 dark:text-neutral-20 leading-relaxed space-y-2">
          {body}
        </div>
      </div>
    </div>
  );
}

function Workstream({
  index,
  title,
  subtitle,
  children,
  decision,
  rationale,
}: {
  index: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  decision?: string;
  rationale?: string;
}) {
  return (
    <article className="scroll-mt-28">
      <p className="el-portero-stat-figure text-[11px] font-semibold uppercase tracking-[0.2em] mb-2">
        {index}
      </p>
      <h3 className="font-bricolage-grotesque text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-sm font-medium text-neutral-70 dark:text-neutral-30 mb-5">
        {subtitle}
      </p>
      <div className="text-base text-neutral-80 dark:text-neutral-20 leading-relaxed space-y-4 mb-8">
        {children}
      </div>
      {decision != null && rationale != null ? (
        <div className="rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/35 px-5 py-5 sm:px-6 sm:py-6">
          <p className="el-portero-stat-figure text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
            Key decision
          </p>
          <p className="text-base font-medium text-neutral-100 dark:text-neutral-0 mb-3">
            {decision}
          </p>
          <p className="text-xs sm:text-sm text-neutral-70 dark:text-neutral-30 leading-relaxed">
            <span className="font-semibold text-neutral-80 dark:text-neutral-20">
              Why:{" "}
            </span>
            {rationale}
          </p>
        </div>
      ) : null}
    </article>
  );
}

const PasswordProtection = ({
  onPasswordCorrect,
}: {
  onPasswordCorrect: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password === "elportero2026") {
      onPasswordCorrect();
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-bricolage-grotesque text-5xl md:text-6xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
            El Portero Case Study
          </h1>
          <p className="text-xl md:text-2xl text-neutral-60 dark:text-neutral-40">
            Enter the password to access this case study
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-neutral-80 dark:text-neutral-20 mb-4"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-neutral-20 dark:border-neutral-80 rounded-xl bg-neutral-0 dark:bg-[#060608] text-neutral-100 dark:text-neutral-0 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-lg text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold text-lg py-5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isLoading ? "Checking..." : "Access Case Study"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-lg text-neutral-60 dark:text-neutral-40 hover:text-neutral-80 dark:hover:text-neutral-20 transition-colors duration-200"
          >
            ← Back to work
          </button>
        </div>
      </div>
    </div>
  );
};

function smoothstep01(value: number) {
  const x = Math.min(1, Math.max(0, value));
  return x * x * (3 - 2 * x);
}

/** Crossfades scroll bar from Product Strategy → Frontend in the final 25% of scroll */
function getScrollBarFrontendBlend(progress: number) {
  return smoothstep01((progress - 75) / 25);
}

function ElPorteroEditorialContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lenis = useLenis();
  const scrollBarFrontendBlend = getScrollBarFrontendBlend(scrollProgress);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useLenis((instance) => {
    setScrollProgress(Math.min(Math.max(instance.progress * 100, 0), 100));
  });

  useEffect(() => {
    document.title =
      "El Portero — Case Study | Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  useEffect(() => {
    if (lenis) return;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [lenis]);

  return (
    <>
      <main className="min-h-screen bg-neutral-0 dark:bg-[#060608] pb-16 md:pb-20 pt-12 sm:pt-14 xl:pt-16">
        <header className="sticky top-12 sm:top-14 xl:top-16 z-50 bg-neutral-0/95 dark:bg-[#060608]/95 backdrop-blur-md border-b border-neutral-10/80 el-portero-section-rule">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-6 md:px-8 md:py-4">
            <Link
              href="/works"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-70 dark:text-neutral-40 transition-colors hover:text-neutral-100 dark:hover:text-neutral-0"
            >
              <span
                aria-hidden
                className="transition-transform group-hover:-translate-x-0.5"
              >
                ←
              </span>
              Work
            </Link>
          </div>
          <div
            className="relative h-[3px] w-full"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Case study reading progress"
          >
            <div
              className="absolute inset-y-0 left-0 h-full min-w-0 overflow-hidden"
              style={{ width: `${scrollProgress}%` }}
            >
              <div
                className="el-portero-scroll-progress-strategy absolute inset-0"
                style={{ opacity: 1 - scrollBarFrontendBlend }}
              />
              <div
                className="el-portero-scroll-progress-frontend absolute inset-0"
                style={{ opacity: scrollBarFrontendBlend }}
              />
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-6 md:px-8 md:pt-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-60 dark:text-neutral-40">
            Case study ·{" "}
            <span className="text-neutral-80 dark:text-neutral-20">
              El Portero
            </span>
          </p>

          <h1 className="font-bricolage-grotesque mt-4 text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-neutral-100 dark:text-neutral-0">
            Website Design &amp; Development
          </h1>
          <p className="font-bricolage-grotesque mt-5 text-lg sm:text-xl md:text-2xl font-normal leading-snug text-neutral-70 dark:text-neutral-30 max-w-3xl lg:max-w-4xl">
            A modern, warm, and premium online presence with effortless paths to
            booking for visitors.
          </p>

          <hr className="my-12 md:my-16 border-neutral-10 el-portero-section-rule" />

          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
            <div>
              <SectionLabel>Background</SectionLabel>
              <div className="space-y-5 text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                <p>
                  El Portero is a restaurant in Spain that needed a digital
                  presence matching the quality of the in-room experience:
                  modern, premium, warm, and welcoming, without feeling cold or
                  inaccessible to guests browsing menus and making a
                  reservation.
                </p>
                <p>
                  Rather than a popular site builder, we designed and built a
                  custom website and admin portal. Through discussions with
                  restaurant management, it became clear they wanted a system
                  that could be shaped over time to fit their specific needs,
                  without the sudden limitations that off-the-shelf tools and
                  builders often introduce later.
                </p>
                <p>
                  The project spans two connected surfaces: a{" "}
                  <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
                    public website
                  </strong>{" "}
                  focused on atmosphere, clarity, and clear paths to booking via
                  BokaBord, and a{" "}
                  <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
                    tailor-made admin portal
                  </strong>{" "}
                  for staff, where the team can update events, menus, and
                  opening hours, publishing to the guest site when they choose
                  to.
                </p>
                <p>
                  I designed and built the experience end-to-end, including the
                  logo and menu designs, from visual direction and interaction
                  design through to frontend implementation, performance
                  optimization, and admin tooling.
                </p>
              </div>
              <p className="mt-8 text-base font-semibold leading-relaxed text-neutral-90 dark:text-neutral-10">
                How might we give a restaurant a modern yet warm and premium
                digital presence while making browsing and booking feel
                effortless for every visitor?
              </p>
            </div>

            <div>
              <SectionLabel>My role</SectionLabel>
              <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                Product Designer, Digital Designer &amp; Developer: logo and
                menu design, brand and UI direction, information architecture,
                frontend development, performance optimization, admin portal
                design and build, and BokaBord booking button integration. I
                owned the full journey from concept to shipped product.
              </p>
            </div>
          </div>

          <div className="my-14 md:my-16">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">
              <Stat
                figure="18 000 +"
                label="Monthly pageviews (sustained traffic)"
              />
              <Stat figure="12 000 +" label="Monthly unique visitors" />
              <Stat
                figure="Seamless booking"
                label="Booking connected via leading platform BokaBord"
              />
              <Stat
                figure="2"
                label="Connected surfaces: guest site & admin portal"
              />
            </div>
          </div>

          <div className="border-t border-neutral-10 el-portero-section-rule pt-10">
            <div className="flex flex-nowrap items-start gap-x-6 sm:gap-x-8 md:gap-x-10 overflow-x-auto pb-1">
              <MetaCell title="Role" nowrap>
                Product Designer, Digital Designer &amp; Developer
              </MetaCell>
              <MetaCell title="Tools" nowrap>
                Figma · Next.js · TypeScript · Tailwind CSS · GitHub · Cursor
              </MetaCell>
              <MetaCell title="Timeline" nowrap>
                2026
              </MetaCell>
              <MetaCell title="Context" nowrap>
                Freelance project · Client project · Restaurant in Spain
              </MetaCell>
            </div>
            <div className="mt-10 md:mt-12 max-w-2xl">
              <MetaCell title="Collaboration">
                Worked directly with the restaurant team to align on brand tone,
                operational needs, and booking workflows before implementation.
              </MetaCell>
            </div>
          </div>

          <figure className="mt-16 md:mt-20">
            <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
              <Image
                src="/assets/case-study-assets/el-portero/Projects-Case-Card-Thumbnail-El-Portero.webp"
                alt="El Portero restaurant website"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 1440px"
                priority
              />
            </div>
            <figcaption className="mt-4 text-xs sm:text-sm text-neutral-60 dark:text-neutral-40 leading-relaxed">
              Hero: public-facing site direction, modern, warm, premium, and
              built around effortless browsing and booking.
            </figcaption>
          </figure>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Research" title="Discovery before design">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="🗣️"
                title="Stakeholder conversations"
                body={
                  <>
                    <p>
                      Ran early sessions with restaurant management to
                      understand how they wanted the brand to feel online, what
                      guests ask about before booking, and which content staff
                      update most often: events, menus, and opening hours.
                    </p>
                    <p>
                      These conversations surfaced a clear tension: the team
                      wanted something that looked modern and premium, but never
                      cold or over-designed. The digital experience had to feel
                      as welcoming as walking through the door.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🗺️"
                title="Guest journey mapping"
                body={
                  <>
                    <p>
                      Mapped how visitors typically arrive via search, social,
                      or word of mouth, and what they need before committing to
                      a reservation: atmosphere, menu clarity, practical
                      details, and a booking path that works on mobile as well
                      as desktop.
                    </p>
                    <p>
                      The journey made it obvious that browsing and booking are
                      one continuous flow; friction anywhere in the middle costs
                      trust before a guest ever reaches BokaBord.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🔎"
                title="Landscape & benchmark review"
                body={
                  <>
                    <p>
                      Reviewed restaurant sites in a similar tier, both locally
                      and in comparable hospitality markets, to see what reads
                      as premium, what feels like a template, and where booking
                      gets buried behind brand theatre.
                    </p>
                    <p>
                      Common patterns emerged: heavy imagery with weak menu
                      hierarchy, booking CTAs hidden in navigation, and admin
                      workflows bolted onto generic site builders that break
                      when operational needs grow.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Process" title="UX approach">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="🍽️"
                title="Discovery & direction"
                body={
                  <>
                    <p>
                      Mapped how guests discover the restaurant online and what
                      signals trust before booking: menu clarity, atmosphere,
                      location, and a reservation path that feels
                      straightforward on mobile and desktop.
                    </p>
                    <p>
                      Aligned with the team on a visual tone that reads premium,
                      warm, and welcoming without losing seriousness: restrained
                      typography, generous spacing, and video- and
                      photography-led layouts.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="📐"
                title="Flows & structure"
                body={
                  <>
                    <p>
                      Structured browsing paths for menu exploration, practical
                      information, and clear paths to BokaBord booking, keeping
                      the journey short and legible at every step.
                    </p>
                    <p>
                      In parallel, defined admin workflows for staff: creating
                      and editing events, updating food and drink menus, and
                      managing opening hours, with every change publishing
                      straight to the public site when the staff wishes it.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="⚙️"
                title="Build & integration"
                body={
                  <>
                    <p>
                      Implemented the guest site and admin portal in code,
                      connecting booking buttons on the guest site to BokaBord
                      while keeping staff-controlled admin updates in sync
                      across both surfaces. The codebase is version-controlled
                      in GitHub; Cursor supported day-to-day design and
                      development work.
                    </p>
                    <p>
                      Optimized the site for sustained heavy traffic: where
                      content is stored, how images and video are served, and
                      how pages load under continuous visitor load, not just
                      ideal demo conditions.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Challenges" title="What made this hard">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="⚖️"
                title="Premium without feeling cold"
                body={
                  <>
                    <p>
                      Hospitality brands often swing too far toward minimal
                      luxury: dark palettes, tight type, and layouts that
                      impress designers but intimidate guests looking for a warm
                      evening out.
                    </p>
                    <p>
                      Finding a visual language that felt serious and premium
                      while still approachable took repeated iteration on
                      photography, spacing, and tone, not just a prettier hero.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🏗️"
                title="Custom scope on a real deadline"
                body={
                  <>
                    <p>
                      Building both a guest site and a tailor-made admin portal,
                      instead of reaching for a site builder, meant owning
                      design, frontend, integrations, and performance as one
                      continuous thread, without a large team to split the work.
                    </p>
                    <p>
                      Every architectural choice had to balance what the
                      restaurant needed on day one with room to grow, without
                      over-building features staff would never touch.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="👥"
                title="Two audiences, one product"
                body={
                  <>
                    <p>
                      Guests need atmosphere, clarity, and a fast path to
                      booking. Staff need simple tools to update events, menus,
                      and hours, with control over when changes go live.
                    </p>
                    <p>
                      Designing for both without letting the admin complexity
                      leak into the public experience, or the brand polish
                      complicate back-office tasks, was a constant balancing
                      act.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="📈"
                title="Performance under sustained load"
                body={
                  <>
                    <p>
                      With thousands of monthly pageviews and a steady stream of
                      unique visitors, the site could not only look good on
                      launch day. It had to stay fast when menus, images, and
                      video were served continuously under real traffic.
                    </p>
                    <p>
                      Performance became a design constraint alongside layout
                      and typography: heavy media had to feel rich without
                      punishing load times on mobile networks.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🔗"
                title="Booking without owning the flow"
                body={
                  <>
                    <p>
                      BokaBord handles reservations reliably, but the handoff
                      from the restaurant&apos;s own site to an external booking
                      system is where many integrations feel bolted on, with
                      different visual language, an unclear next step, or CTAs
                      that break the brand moment.
                    </p>
                    <p>
                      The challenge was making BokaBord feel native to El
                      Portero&apos;s environment while accepting that the
                      booking experience itself lived outside my design scope.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Process" title="What I did">
            <div className="space-y-16 md:space-y-20">
              <Workstream
                index="01"
                title="Premium without friction"
                subtitle="Brand & guest experience"
                decision="Led with video and photography, restrained type, and calm navigation. BokaBord booking always one honest step away, never buried."
                rationale="Guests needed to feel the restaurant's warmth and quality immediately; hiding reservations behind heavy brand theatre would hurt conversion."
              >
                <p>
                  Shaped a public site that communicates seriousness and care
                  through layout and pacing, not decorative noise, so browsing
                  feels premium and booking feels obvious. I also designed the
                  logotype and food and drink menus, carrying the same visual
                  language from screen to street so the online presence feels
                  like a natural extension of the restaurant&apos;s atmosphere,
                  physical environment, and locale.
                </p>
                <figure className="my-8 md:my-10">
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {LOGOTYPE_GALLERY_IMAGES.map((image, index) => (
                      <ClickableCaseImage
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        onClick={() => openLightbox(index)}
                      />
                    ))}
                  </div>
                  <figcaption className="mt-3 text-xs text-neutral-60 dark:text-neutral-40">
                    Logotype in context: how the mark reads on the building and
                    in print, and how the digital brand aligns with the
                    restaurant&apos;s real-world setting.
                  </figcaption>
                </figure>
              </Workstream>

              <Workstream
                index="02"
                title="Booking without reinventing the wheel"
                subtitle="BokaBord integration"
                decision="Connected booking buttons on the guest site to BokaBord, an industry-leading restaurant booking system in Sweden, rather than designing or building a reservation flow from scratch."
                rationale="BokaBord already handles the booking experience reliably; my work was integrating it cleanly so guests reach it naturally from the restaurant's own site."
              >
                <p>
                  I did not design the booking flow itself. Booking CTAs across
                  the site link into BokaBord&apos;s service, placed where
                  guests expect them and styled to feel native to the
                  restaurant&apos;s brand environment.
                </p>
              </Workstream>

              <Workstream
                index="03"
                title="Tools the team actually needs"
                subtitle="Admin portal"
                decision="Built a dedicated staff portal instead of bending a generic CMS or site builder, shaped around events, menus, and opening hours, with room to grow."
                rationale="The client wanted a system they could evolve over time without hitting sudden platform limits. Custom tooling gave them that flexibility from day one."
              >
                <p>
                  Designed admin views for the tasks staff own day to day:
                  creating and editing events, updating food and drink menus,
                  and changing opening hours, published to the guest-facing site
                  when staff choose to push changes live.
                </p>
                <figure>
                  <div className="grid gap-2.5 sm:gap-3">
                    {ADMIN_PORTAL_GALLERY_IMAGES.map((image, index) => (
                      <ClickableCaseImage
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        width={1440}
                        height={900}
                        sizes="(max-width: 768px) 100vw, 720px"
                        onClick={() =>
                          openLightbox(LOGOTYPE_GALLERY_IMAGES.length + index)
                        }
                      />
                    ))}
                  </div>
                  <figcaption className="mt-3 text-xs text-neutral-60 dark:text-neutral-40">
                    Admin portal dashboard: staff-facing views for events,
                    menus, and opening hours, with changes published to the
                    guest site on demand.
                  </figcaption>
                </figure>
              </Workstream>

              <Workstream
                index="04"
                title="One system, two audiences"
                subtitle="Integrations & delivery"
                decision="Treated guest site and admin portal as one product with shared data, not two separate builds that drift apart."
                rationale="When booking integrations and live admin updates live in one coherent system, staff and guests see the same truth."
              >
                <p>
                  Connected BokaBord booking buttons on the guest side and
                  staff-controlled admin publishing on the back office, then
                  shipped both surfaces so the restaurant could run the full
                  loop from day one: discover, book via BokaBord, and keep
                  menus, events, and hours current.
                </p>
              </Workstream>

              <Workstream
                index="05"
                title="Built for sustained traffic"
                subtitle="Performance optimization"
                decision="Treated performance as a design requirement from the start, optimizing content storage, images, and video for continuous heavy visitor load."
                rationale="We expected a steady stream of guests browsing menus and booking; a premium site that stutters under load would undermine the brand as quickly as a weak layout."
              >
                <p>
                  Audited how content is stored and delivered, tuned image and
                  video handling, and optimized page loading so the experience
                  stays fast and stable even when visitor numbers stay high, not
                  only on launch day.
                </p>
              </Workstream>
            </div>
          </EditorialSection>

          <div className={`my-16 md:my-20 ${EDITORIAL_GRID}`}>
            <div className="hidden md:block" aria-hidden />
            <blockquote className="el-portero-quote w-full justify-self-stretch pl-6 md:pl-8 py-1">
              <p className="font-bricolage-grotesque text-base leading-relaxed text-neutral-90 dark:text-neutral-10 italic">
                &ldquo;The site had to feel like the restaurant, not like a
                template with a logo swapped in. That constraint shaped every
                layout and every booking decision.&rdquo;
              </p>
              <footer className="mt-4 text-xs sm:text-sm font-medium not-italic text-neutral-60 dark:text-neutral-40">
                Reflection note, project retrospective
              </footer>
            </blockquote>
          </div>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Insights" title="What the research revealed">
            <ol className="space-y-8 counter-reset-none list-none">
              {[
                {
                  n: "01",
                  t: "Guests decide on trust long before they book. Atmosphere, menu legibility, and practical information carry more weight than decorative brand flourishes.",
                },
                {
                  n: "02",
                  t: "Staff did not want a CMS that publishes instantly by default; they needed confidence that edits to events, menus, and hours go live only when they choose.",
                },
                {
                  n: "03",
                  t: "Off-the-shelf site builders would have worked for a launch, but would have fought the restaurant later. Custom admin tooling paid off when operational needs became specific.",
                },
                {
                  n: "04",
                  t: "Booking conversion lives in placement and clarity, not in reinventing the reservation flow. Honest CTAs that reach BokaBord naturally outperformed clever navigation tricks.",
                },
                {
                  n: "05",
                  t: "For a high-traffic hospitality site, a slow load reads as unprofessional faster than a weak photograph. Performance is part of the brand promise, not a technical afterthought.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-5">
                  <span className="el-portero-stat-figure text-xs font-semibold tabular-nums shrink-0 pt-1">
                    {item.n}
                  </span>
                  <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                    {item.t}
                  </p>
                </li>
              ))}
            </ol>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 el-portero-section-rule" />

          <EditorialSection label="Takeaways" title="What I learned">
            <ol className="space-y-8 counter-reset-none list-none">
              {[
                {
                  n: "01",
                  t: "Premium hospitality UI is often about restraint: fewer elements, clearer hierarchy, and confidence in whitespace.",
                },
                {
                  n: "02",
                  t: "Designing for staff is as important as designing for guests; a beautiful public site fails if the team can't run it reliably.",
                },
                {
                  n: "03",
                  t: "Performance and brand craft deserve the same rigour as the hero flows. A site that looks premium but loads slowly, or collapses under traffic, breaks the promise immediately.",
                },
                {
                  n: "04",
                  t: "End-to-end ownership helped: decisions made in Figma survived implementation because the same person carried them into code, integrations, and optimization.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-5">
                  <span className="el-portero-stat-figure text-xs font-semibold tabular-nums shrink-0 pt-1">
                    {item.n}
                  </span>
                  <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                    {item.t}
                  </p>
                </li>
              ))}
            </ol>
          </EditorialSection>

          <footer className="mt-20 md:mt-28 pt-10 border-t border-neutral-10 el-portero-section-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="el-portero-stat-figure text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                Next project
              </p>
              <p className="font-bricolage-grotesque text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                Emplojd
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/case-studies/emplojd"
                className="inline-flex items-center gap-1.5 text-neutral-100 dark:text-neutral-0 underline decoration-neutral-30 underline-offset-[5px] hover:decoration-neutral-50"
              >
                View next ↗
              </Link>
              <Link
                href="/works"
                className="text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-neutral-0 underline-offset-4 hover:underline"
              >
                Back to all work
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <CustomLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={CASE_STUDY_LIGHTBOX_IMAGES}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-10 md:py-14 w-full border-t border-neutral-10 el-portero-section-rule bg-neutral-0 dark:bg-[#060608]">
        <Footer />
      </section>
    </>
  );
}

export default function ElPorteroCaseStudyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <PasswordProtection onPasswordCorrect={() => setIsAuthenticated(true)} />
    );
  }

  return <ElPorteroEditorialContent />;
}
