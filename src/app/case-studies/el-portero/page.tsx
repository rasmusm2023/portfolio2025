"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import HorizontalScrollGallery from "@/components/case-studies/HorizontalScrollGallery";
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
    caption:
      "Dashboard: where staff start for day-to-day operations.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-dashboard-sign-in.webp",
    alt: "El Portero admin portal sign-in screen",
    title: "Admin sign-in",
    caption:
      "Staff sign-in before any changes to events, menus, or hours.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-events.webp",
    alt: "El Portero admin portal events list",
    title: "Events overview",
    caption:
      "Events list: what's live and what still needs attention.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-events-editor.webp",
    alt: "El Portero admin portal events editor",
    title: "Events editor",
    caption:
      "Events editor: create and update listings before publishing.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-menu-editor.webp",
    alt: "El Portero admin portal menu editor",
    title: "Menu editor",
    caption:
      "Menu editor: update food and drink when the kitchen needs to.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-opening-hours-editor.webp",
    alt: "El Portero admin portal opening hours editor",
    title: "Opening hours editor",
    caption:
      "Opening hours: keep what guests see in sync with the real schedule.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-dinner-menu.webp",
    alt: "El Portero dinner menu on the guest site",
    title: "Published dinner menu",
    caption:
      "Published dinner menu on the guest site, updated from the admin when staff publish.",
  },
  {
    src: "/assets/case-study-assets/el-portero/el-portero-case-snapshot-home.webp",
    alt: "El Portero guest website homepage",
    title: "Guest website homepage",
    caption:
      "Guest homepage: kept current by staff through the admin portal.",
  },
];

const CASE_STUDY_LIGHTBOX_IMAGES = [
  ...LOGOTYPE_GALLERY_IMAGES,
  ...ADMIN_PORTAL_GALLERY_IMAGES,
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="el-portero-stat-figure text-xs font-bold uppercase tracking-[0.14em] mb-3 w-fit max-w-full">
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
      "El Portero | Case Study | Rasmus Mattsson | Product Designer Portfolio";
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
          <div className="site-content-shell flex items-center justify-between gap-4 px-5 py-3 sm:px-6 md:px-8 md:py-4">
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

        <article className="site-content-shell px-5 pt-12 sm:px-6 md:px-8 md:pt-16 lg:pt-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-10 lg:gap-12 md:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-60 dark:text-neutral-40">
                Case study ·{" "}
                <span className="text-neutral-80 dark:text-neutral-20">
                  El Portero
                </span>
              </p>

              <h1 className="font-bricolage-grotesque mt-4 text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-neutral-100 dark:text-neutral-0">
                Website Design &amp; Development
              </h1>
              <p className="font-bricolage-grotesque mt-5 text-lg sm:text-xl md:text-2xl font-normal leading-snug text-neutral-70 dark:text-neutral-30 max-w-3xl lg:max-w-none">
                A warm, premium site where browsing menus and booking a table
                feel effortless.
              </p>
            </div>

            <figure className="min-w-0 w-full max-w-sm mx-auto md:max-w-none md:mx-0 md:justify-self-end">
              <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
                <Image
                  src="/assets/case-study-assets/el-portero/el-portero-works-thumbnail.webp"
                  alt="El Portero website preview"
                  width={1600}
                  height={1000}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 88vw, (max-width: 1280px) 280px, 416px"
                  priority
                />
              </div>
            </figure>
          </div>

          <hr className="my-12 md:my-16 border-neutral-10 el-portero-section-rule" />

          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
            <div>
              <SectionLabel>Background</SectionLabel>
              <div className="space-y-5 text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                <p>
                  El Portero is a restaurant in Spain. They wanted a site that
                  felt as warm and polished as dining in the room, not cold or
                  over-designed, and made it easy to browse menus and book a
                  table.
                </p>
                <p>
                  The brief came with a tight deadline and almost nothing to
                  start from: no website, no brand kit, and an owner and manager
                  who knew hospitality, not tech. We skipped a site builder and
                  built a custom guest site and admin portal instead, shaped in
                  ongoing dialogue so it could grow with new features and,
                  eventually, more locations.
                </p>
                <p>
                  Two surfaces, one system: a{" "}
                  <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
                    public website
                  </strong>{" "}
                  for atmosphere, menus, and BokaBord booking, and a{" "}
                  <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
                    staff admin portal
                  </strong>{" "}
                  for events, menus, and hours, published when the team is ready.
                </p>
              </div>
              <p className="mt-8 text-base font-semibold leading-relaxed text-neutral-90 dark:text-neutral-10">
                How might we give guests that same warm, premium feeling
                online, and make booking feel effortless?
              </p>
            </div>

            <div>
              <SectionLabel>My role</SectionLabel>
              <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                Sole designer and developer from concept to launch: brand
                (logo and menus), guest website, and staff admin portal, plus
                BokaBord integration, performance tuning, and hands-on training
                so the team could publish updates on their own.
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
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-x-8 md:gap-x-10">
              <MetaCell title="Role">
                Product Designer, Digital Designer &amp; Developer
              </MetaCell>
              <MetaCell title="Tools">
                Figma · Next.js · TypeScript · Tailwind CSS · Firebase ·
                Google Gemini · GitHub · Cursor
              </MetaCell>
              <MetaCell title="Timeline">
                2026
              </MetaCell>
              <MetaCell title="Context">
                Freelance project · Client project · Restaurant in Spain
              </MetaCell>
            </div>
            <div className="mt-10 md:mt-12 max-w-2xl">
              <MetaCell title="Collaboration">
                Stayed in close touch with the owner and manager on brand,
                day-to-day operations, and booking, before and after launch.
                Once the admin portal was live, I trained staff on updating
                events, menus, and hours, and on publishing when they were ready.
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
              The public site: warm, premium, and built around easy browsing
              and booking.
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
                      Early and ongoing conversations with the owner and
                      manager: how the brand should feel online, what guests ask
                      before booking, and what staff update most: events, menus,
                      and hours.
                    </p>
                    <p>
                      The tension was familiar: modern and premium, but never
                      cold. It had to feel as welcoming as walking through the
                      door.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🧭"
                title="Direction before screens"
                body={
                  <>
                    <p>
                      Sat down with the owner and manager to walk through early
                      ideas: mood, layout approaches, and how the site could feel
                      premium without going cold. We discussed options and agreed
                      on a general direction before any deep screen work.
                    </p>
                    <p>
                      The point was to avoid pouring hours into explorations that
                      would miss the mark. Locking in the feel upfront made the
                      detailed design phase faster and more confident.
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
                      Mapped how people find the restaurant (search, social,
                      word of mouth) and what they need before booking: the vibe,
                      readable menus, practical details, and booking that works
                      on a phone.
                    </p>
                    <p>
                      Browsing and booking are one flow. Friction in the middle
                      costs trust before anyone reaches BokaBord.
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
                      Looked at peer restaurant sites to see what felt premium,
                      what looked like a template, and where booking got buried.
                    </p>
                    <p>
                      The same patterns kept showing up: beautiful photos, messy
                      menus, hidden booking buttons, and admin tools that break
                      when the restaurant outgrows them.
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
                      Mapped what guests need before they trust enough to book:
                      clear menus, atmosphere, location, and a straight path to
                      reserve, on mobile or desktop.
                    </p>
                    <p>
                      That guest lens, together with the direction agreed with
                      the owner and manager, shaped restrained type, generous
                      space, and photography-led layouts.
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
                      Built clear paths for menus, practical info, and BokaBord
                      booking, short and easy to follow.
                    </p>
                    <p>
                      For staff: workflows for events, menus, and hours that
                      publish to the public site only when they&apos;re ready.
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
                      Built the guest site and admin portal in code, wired
                      booking to BokaBord, and kept staff updates in sync across
                      both. GitHub for version control; Cursor for day-to-day
                      design and development.
                    </p>
                    <p>
                      Tuned how content, images, and video are stored and
                      served so the site stays fast under real traffic, not just
                      on launch day.
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
                icon="🏗️"
                title="Custom scope on a real deadline"
                body={
                  <>
                    <p>
                      A guest site plus a custom admin portal on a short
                      deadline: no site builder, no big team. Brand, menus, and
                      visual direction all had to be created in the same push,
                      with no existing assets to lean on.
                    </p>
                    <p>
                      Every choice had to work for day one while leaving room to
                      add features and scale beyond one location, without
                      building tools staff would never use.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="⏱️"
                title="A shareholder with limited time"
                body={
                  <>
                    <p>
                      The main shareholder had very little time to spare and was
                      often hard to reach. Quick check-ins were the exception,
                      not the rhythm of the project.
                    </p>
                    <p>
                      To keep momentum on a tight deadline, many decisions had
                      to be made from research, peer benchmarks, and design
                      instinct, then brought back for validation when we did
                      connect.
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
                      Guests want atmosphere, clear menus, and a fast path to
                      book. Staff want simple tools to update events, menus, and
                      hours, and control over when changes go live.
                    </p>
                    <p>
                      The hard part was serving both without admin complexity
                      leaking into the public site, or brand polish getting in
                      the way of back-office tasks.
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
                      With thousands of monthly visitors, the site had to stay
                      fast after launch, not just look good on day one, while
                      serving menus, images, and video under real load.
                    </p>
                    <p>
                      Performance became a design constraint: rich media without
                      punishing load times on mobile.
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
                      BokaBord handles reservations well, but the handoff from
                      the restaurant&apos;s site often feels bolted on: wrong
                      visuals, unclear next step, CTAs that break the brand
                      moment.
                    </p>
                    <p>
                      The job was making BokaBord feel native to El Portero
                      while accepting that the booking flow itself lived outside
                      my scope.
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
                decision="Led with video and photography, restrained type, and calm navigation. Booking via BokaBord always one clear step away."
                rationale="Guests should feel the restaurant's warmth right away. Burying reservations behind brand theatre would hurt conversion."
              >
                <p>
                  A public site that reads premium through layout and pacing,
                  not decoration: browsing feels considered, booking feels
                  obvious. I also designed the logotype and print menus so the
                  brand carries from screen to street.
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
                    The logotype on the building and in print, aligned with how
                    the brand shows up online.
                  </figcaption>
                </figure>
              </Workstream>

              <Workstream
                index="02"
                title="Booking without reinventing the wheel"
                subtitle="BokaBord integration"
                decision="Linked booking on the guest site to BokaBord instead of building a reservation flow from scratch."
                rationale="BokaBord already works. My job was making it easy to reach from the restaurant's own site."
              >
                <p>
                  I didn&apos;t design the booking flow itself. CTAs across the
                  site link to BokaBord where guests expect them, styled to fit
                  the restaurant&apos;s look and feel.
                </p>
              </Workstream>

              <Workstream
                index="03"
                title="Tools the team actually needs"
                subtitle="Admin portal"
                decision="Built a staff portal around events, menus, and hours, not a generic CMS, with room to add features and scale beyond one location."
                rationale="The client needed something they could grow into. Off-the-shelf builders tend to hit walls when operations change or new locations come online."
              >
                <p>
                  Admin views for what staff do every day: events, food and drink
                  menus, opening hours, published to the guest site when they
                  choose.
                </p>
                <p>
                  The owner, manager, and floor team aren&apos;t technical, so
                  delivery included walking them through the portal: what each
                  screen does, how drafts work, and how changes show up
                  publicly.
                </p>
                <HorizontalScrollGallery
                  images={ADMIN_PORTAL_GALLERY_IMAGES}
                  onImageClick={(index) =>
                    openLightbox(LOGOTYPE_GALLERY_IMAGES.length + index)
                  }
                  stickyTopClassName="top-28 xl:top-32"
                  renderImage={(image, _index, onClick) => (
                    <ClickableCaseImage
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 1440}
                      height={image.height ?? 900}
                      sizes={
                        image.sizes ?? "(max-width: 768px) 82vw, (max-width: 1200px) 62vw, 780px"
                      }
                      onClick={onClick}
                    />
                  )}
                />
              </Workstream>

              <Workstream
                index="04"
                title="One system, two audiences"
                subtitle="Integrations & delivery"
                decision="One product, shared data: guest site and admin portal built together, not as separate projects that drift apart."
                rationale="When booking and admin updates live in the same system, staff and guests always see the same information."
              >
                <p>
                  Wired BokaBord on the guest side to staff publishing on the
                  back office, then shipped both so the restaurant could run
                  the full loop from day one: discover, book, and keep menus,
                  events, and hours current.
                </p>
              </Workstream>

              <Workstream
                index="05"
                title="Built for sustained traffic"
                subtitle="Performance optimization"
                decision="Treated performance as a design requirement from the start, not a polish pass at the end."
                rationale="Guests browse menus and book in steady numbers. A site that stutters under load undermines the brand as fast as a weak layout."
              >
                <p>
                  Tuned storage, images, and page loading so the experience stays
                  fast when traffic is high, not only on launch day.
                </p>
              </Workstream>
            </div>
          </EditorialSection>

          <div className={`my-16 md:my-20 ${EDITORIAL_GRID}`}>
            <div className="hidden md:block" aria-hidden />
            <blockquote className="el-portero-quote w-full justify-self-stretch pl-6 md:pl-8 py-1">
              <p className="font-bricolage-grotesque text-base leading-relaxed text-neutral-90 dark:text-neutral-10 italic">
                &ldquo;The site had to feel like the restaurant, not a template
                with a logo dropped in. That shaped every layout and every
                booking decision.&rdquo;
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
                  t: "Guests decide on trust long before they book. Atmosphere, readable menus, and practical details matter more than decorative flourishes.",
                },
                {
                  n: "02",
                  t: "Staff didn't want a CMS that publishes instantly by default. They needed to know edits go live only when they choose.",
                },
                {
                  n: "03",
                  t: "A site builder might have worked for launch, but would have fought the restaurant later, especially as operations grew and more locations became part of the plan.",
                },
                {
                  n: "04",
                  t: "Booking conversion is about placement and clarity, not reinventing the reservation flow. Clear CTAs to BokaBord beat clever navigation.",
                },
                {
                  n: "05",
                  t: "On a busy hospitality site, a slow load feels unprofessional faster than a weak photo. Performance is part of the brand promise.",
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
                  t: "Design for staff as much as guests. A beautiful public site fails if the team can't run it, and training non-technical staff was as important as the UI.",
                },
                {
                  n: "03",
                  t: "Performance deserves the same care as the hero section. A premium site that loads slowly, or chokes under traffic, breaks the promise immediately.",
                },
                {
                  n: "04",
                  t: "End-to-end ownership helped: decisions in Figma survived in code because the same person carried them through build, integrations, and optimization.",
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
    </>
  );
}

export default function ElPorteroCaseStudyPage() {
  return <ElPorteroEditorialContent />;
}
