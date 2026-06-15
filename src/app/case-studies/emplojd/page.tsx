"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import Footer from "@/components/layout/Footer";
import EmplojdFlowPrototypeShowcase from "@/components/case-studies/EmplojdFlowPrototypeShowcase";
import HorizontalScrollGallery from "@/components/case-studies/HorizontalScrollGallery";
import CustomLightbox from "@/components/ui/Lightbox";

const SCREEN_GALLERY_IMAGES = [
  {
    src: "/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png",
    alt: "Emplojd job search and results screen",
    title: "Job search & results",
    caption:
      "Search-first discovery: filters, saved roles, and clear paths into cover-letter drafting.",
  },
  {
    src: "/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Sign-In-Create-Account.png",
    alt: "Emplojd sign in and create account screens",
    title: "Sign in & onboarding",
    caption:
      "Account creation and sign-in, designed to feel lightweight before users reach job tools.",
  },
];

const CASE_STUDY_LIGHTBOX_IMAGES = [...SCREEN_GALLERY_IMAGES];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3">
      <span className="emplojd-stat-figure text-xs font-bold uppercase tracking-[0.14em]">
        {children}
      </span>
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
  const isSvg = src.endsWith(".svg");

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-lg border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20 cursor-zoom-in text-left transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-40 dark:focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-0 dark:focus-visible:ring-offset-[#060608]"
      aria-label={`View larger: ${alt}`}
    >
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={sizes}
        />
      )}
    </button>
  );
}

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-neutral-10 bg-neutral-3 px-3.5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-neutral-80 dark:bg-neutral-90/40 dark:shadow-none sm:px-4 sm:py-4">
      <p className="emplojd-stat-figure text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
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
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <p className="emplojd-stat-figure text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
        {title}
      </p>
      <div className="text-sm text-neutral-80 dark:text-neutral-20 leading-relaxed [overflow-wrap:anywhere]">
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
      <p className="emplojd-stat-figure text-[11px] font-semibold uppercase tracking-[0.14em] mb-2">
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
          <p className="emplojd-stat-figure text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
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

function getScrollBarDeliveryBlend(progress: number) {
  return smoothstep01((progress - 75) / 25);
}

export default function EmplojdCaseStudyPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lenis = useLenis();
  const scrollBarDeliveryBlend = getScrollBarDeliveryBlend(scrollProgress);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useLenis((instance) => {
    setScrollProgress(Math.min(Math.max(instance.progress * 100, 0), 100));
  });

  useEffect(() => {
    document.title =
      "Emplojd | Case Study | Rasmus Mattsson | Product Designer Portfolio";
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
        <header className="sticky top-12 sm:top-14 xl:top-16 z-50 bg-neutral-0/95 dark:bg-[#060608]/95 backdrop-blur-md border-b border-neutral-10/80 emplojd-section-rule">
          <div className="site-content-shell px-5 py-3 sm:px-6 md:px-8 md:py-4">
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
                className="emplojd-scroll-progress-design absolute inset-0"
                style={{ opacity: 1 - scrollBarDeliveryBlend }}
              />
              <div
                className="emplojd-scroll-progress-delivery absolute inset-0"
                style={{ opacity: scrollBarDeliveryBlend }}
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
                  Emplojd
                </span>
              </p>

              <h1 className="font-bricolage-grotesque mt-4 text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-neutral-100 dark:text-neutral-0">
                Product &amp; UX Design
              </h1>
              <p className="font-bricolage-grotesque mt-5 text-lg sm:text-xl md:text-2xl font-normal leading-snug text-neutral-70 dark:text-neutral-30 max-w-3xl lg:max-w-none">
                Helping job seekers apply with confidence, without losing their
                voice to generic AI.
              </p>
            </div>

            <figure className="min-w-0 w-full max-w-sm mx-auto md:max-w-none md:mx-0 md:justify-self-end">
              <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/case-study-assets/emplojd/EMPLOJD-Preview-2.svg"
                  alt="Emplojd product preview"
                  className="w-full h-auto"
                />
              </div>
            </figure>
          </div>

          <hr className="my-12 md:my-16 border-neutral-10 emplojd-section-rule" />

          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
            <div>
              <SectionLabel>Background</SectionLabel>
              <div className="space-y-5 text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                <p>
                  Job hunting often means repeating the same effort across dozens
                  of listings: tweaking CVs, rewriting cover letters, and
                  second-guessing tone. Many candidates burn out or fall back on
                  copy-paste applications that recruiters recognise instantly.
                </p>
                <p>
                  Emplojd explores how AI can shorten the boring parts of
                  applying while keeping recommendations and drafts anchored in
                  what each person actually cares about. The product combines{" "}
                  <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
                    job discovery
                  </strong>{" "}
                  with assistance for tailored cover letters: always editable,
                  never a black box.
                </p>
                <p>
                  The work ran as part of{" "}
                  <a
                    href="https://chasacademy.se/article/chas-challenge-2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-100 dark:text-neutral-0 underline decoration-neutral-30 underline-offset-[5px] hover:decoration-neutral-50"
                  >
                    Chas Challenge 2024
                  </a>
                  , an eight-week cross-disciplinary sprint with a brief centred
                  on AI, from problem framing to a tested, presentable prototype.
                </p>
              </div>
              <p className="mt-8 text-base font-semibold leading-relaxed text-neutral-90 dark:text-neutral-10">
                How might we use AI to speed up job applications without making
                every cover letter sound the same?
              </p>
            </div>

            <div>
              <SectionLabel>My role</SectionLabel>
              <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                Lead UX/UI designer: discovery workshops, research synthesis,
                information architecture, interaction design, a lightweight design
                system, prototyping, usability testing, and handoff with
                frontend developers. I collaborated daily with engineering and
                kept the team aligned through critiques and structured
                checkpoints.
              </p>
            </div>
          </div>

          <div className="my-14 md:my-16">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">
              <Stat
                figure="8 weeks"
                label="Chas Challenge sprint from kickoff to showcase"
              />
              <Stat figure="6" label="Designers & developers in the core team" />
              <Stat
                figure="15+"
                label="Research & usability rounds (moderated + async)"
              />
              <Stat
                figure="3"
                label="Product pillars: discover, draft, refine"
              />
            </div>
          </div>

          <div className="border-t border-neutral-10 emplojd-section-rule pt-10">
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-x-8 md:gap-x-10">
              <MetaCell title="Role">Lead UX/UI Designer</MetaCell>
              <MetaCell title="Tools">
                Figma · FigJam · Prototyping · UserTesting · Notion · Slack ·
                Git
              </MetaCell>
              <MetaCell title="Timeline">Jan to Mar 2024 (8 weeks)</MetaCell>
              <MetaCell title="Context">
                Student project · Chas Challenge · AI brief
              </MetaCell>
            </div>
            <div className="mt-10 md:mt-12 max-w-2xl">
              <MetaCell title="Collaboration">
                Paired with engineering throughout the sprint; validated flows
                with peers and potential users; presented outcomes to an industry
                jury at showcase.
              </MetaCell>
            </div>
          </div>

          <figure className="mt-16 md:mt-20">
            <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
              <Image
                src="/assets/case-study-assets/emplojd/Emplojd-Case-Image-3.jpg"
                alt="Emplojd interface showing job search and results"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 1440px"
              />
            </div>
            <figcaption className="mt-4 text-xs sm:text-sm text-neutral-60 dark:text-neutral-40 leading-relaxed">
              Core discover experience: search, filters, and saved roles.
            </figcaption>
          </figure>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Research" title="Discovery before design">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="🗣️"
                title="Applicant interviews"
                body={
                  <>
                    <p>
                      Mapped pains across the application journey with
                      interviews and lightweight surveys: where time disappears,
                      what feels impersonal, and when people abandon a listing.
                    </p>
                    <p>
                      A clear pattern emerged: candidates want speed, but not at
                      the cost of sounding like everyone else.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🔎"
                title="Competitor & landscape review"
                body={
                  <>
                    <p>
                      Reviewed job boards, AI writing tools, and application
                      assistants to see what felt helpful, what felt spammy, and
                      where discovery and document creation were stitched
                      together awkwardly.
                    </p>
                    <p>
                      Many products optimised for output volume, not for trust
                      or editability.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🧭"
                title="Workshops & alignment"
                body={
                  <>
                    <p>
                      Facilitated kickoff workshops (Crazy 8s, storyboarding) so
                      design, engineering, and stakeholders shared the same
                      problem frame before screen work piled up.
                    </p>
                    <p>
                      We agreed early on who v1 optimises for: time-starved
                      applicants who still want believable, personal outreach.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Process" title="UX approach">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="📐"
                title="Flows & structure"
                body={
                  <>
                    <p>
                      Consolidated flows for onboarding, job discovery,
                      cover-letter drafting, and revisions, with a narrative
                      that keeps users in control of edits and tone.
                    </p>
                    <p>
                      Paths for find roles, save, and draft a letter for this
                      listing read as three honest steps, not buried shortcuts.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🎨"
                title="System & craft"
                body={
                  <>
                    <p>
                      Moved from wireframes into a compact UI kit so developers
                      could implement consistently without endless one-offs.
                    </p>
                    <p>
                      Typography, spacing, and form patterns were locked early;
                      new components only when a screen proved the need.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🧪"
                title="Test & handoff"
                body={
                  <>
                    <p>
                      Ran moderated sessions on clickable prototypes; tightened
                      copy, empty states, and error paths where hesitation
                      showed up.
                    </p>
                    <p>
                      Documented component behaviour and edge cases so the build
                      stayed faithful to intent after the course deadline.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Challenges" title="What made this hard">
            <div className="space-y-10 md:space-y-12">
              <ProcessStep
                icon="🤖"
                title="AI trust, not magic"
                body={
                  <>
                    <p>
                      Applicants were curious about AI help but wary of generic
                      drafts. One-tap automation demos impressed in meetings
                      and failed in testing.
                    </p>
                    <p>
                      The product had to show sources, allow edits, and make tone
                      adjustments obvious, not hide them behind a single
                      generate button.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="⏱️"
                title="Eight weeks, full scope"
                body={
                  <>
                    <p>
                      Chas Challenge compressed research, IA, visual design,
                      prototyping, testing, and presentation into two months with
                      a cross-functional student team.
                    </p>
                    <p>
                      Scope discipline mattered: we could not explore every AI
                      feature idea and still ship something testable.
                    </p>
                  </>
                }
              />
              <ProcessStep
                icon="🔀"
                title="Search vs swipe"
                body={
                  <>
                    <p>
                      Early concepts leaned on swipe-style browsing. Testing
                      showed many users arrived with intent: role, city, remote.
                    </p>
                    <p>
                      Balancing exploration with structured search meant
                      revisiting IA more than once before the team felt aligned.
                    </p>
                  </>
                }
              />
            </div>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Process" title="What I did">
            <div className="space-y-16 md:space-y-20">
              <Workstream
                index="01"
                title="Grounding the team"
                subtitle="Kickoff workshop & problem framing"
                decision="Translated workshop outputs into jobs-to-be-done and explicit non-goals for v1 before visual exploration spread."
                rationale="Without a shared frame, AI features balloon fast; the team needed a filter for what belonged in the first prototype."
              >
                <p>
                  Facilitated early sessions to surface assumptions about
                  recruiters, candidates, and acceptable use of AI. Sticky-note
                  chaos became a concise problem statement the whole squad could
                  reference daily.
                </p>
              </Workstream>

              <Workstream
                index="02"
                title="From swipe-first to search-first"
                subtitle="Information architecture"
                decision="Kept search and structured filters primary; treated swipe-style browsing as secondary exploration."
                rationale="Participants with intent (title, location, remote) fatigued on swipe-only patterns before seeing strong matches."
              >
                <p>
                  Iterated IA until discover, save, and draft a letter for this
                  listing felt like one coherent journey, with no dark-pattern
                  shortcuts.
                </p>
              </Workstream>

              <Workstream
                index="03"
                title="Design system in miniature"
                subtitle="UI kit & core screens"
                decision="Locked navigation, cards, forms, and AI-assisted panels early; expanded the kit only when new screens proved gaps."
                rationale="A short runway meant rework was expensive; a tight system kept mobile layouts predictable for engineering."
              >
                <p>
                  Established core components and applied them across flows so
                  critique stayed about semantics and trust, not one-off pixels.
                </p>
                <figure className="my-8 md:my-10">
                  <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
                      alt="Emplojd design guide and component library"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-neutral-60 dark:text-neutral-40">
                    Design guide and components: typography, buttons, forms, and
                    shared patterns for the build.
                  </figcaption>
                </figure>
                <figure className="my-8 md:my-10">
                  <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/case-study-assets/emplojd/Emplojd-The-Craft-Various-Mockups.svg"
                      alt="Grid of Emplojd UI mockups and iterations"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-neutral-60 dark:text-neutral-40">
                    Craft explorations across core surfaces before locking final
                    UI.
                  </figcaption>
                </figure>
                <HorizontalScrollGallery
                  images={SCREEN_GALLERY_IMAGES}
                  onImageClick={(index) => openLightbox(index)}
                  stickyTopClassName="top-28 xl:top-32"
                  renderImage={(image, _index, onClick) => (
                    <ClickableCaseImage
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 1440}
                      height={image.height ?? 900}
                      sizes={
                        image.sizes ??
                        "(max-width: 768px) 82vw, (max-width: 1200px) 62vw, 780px"
                      }
                      onClick={onClick}
                    />
                  )}
                />
              </Workstream>

              <Workstream
                index="04"
                title="Evidence before polish"
                subtitle="Testing & handoff"
                decision="Favoured traceable AI suggestions with clear sources and editable output over maximal automation."
                rationale="Participants trusted assistance more when they could adjust tone and see why a job was recommended."
              >
                <p>
                  Consolidated findings into playback decks for the team and a
                  pragmatic handoff: states, validation rules, and breakpoints
                  that survived first implementation.
                </p>
                <p>
                  Interactive prototypes focused on the flows we tested most:
                  cover-letter generation, saved letters, and profile setup.
                  Click the active phone to pause; click a side device to swap
                  flows.
                </p>
                <EmplojdFlowPrototypeShowcase />
              </Workstream>
            </div>
          </EditorialSection>

          <div className={`my-16 md:my-20 ${EDITORIAL_GRID}`}>
            <div className="hidden md:block" aria-hidden />
            <blockquote className="emplojd-quote w-full justify-self-stretch pl-6 md:pl-8 py-1">
              <p className="font-bricolage-grotesque text-base leading-relaxed text-neutral-90 dark:text-neutral-10 italic">
                &ldquo;The strongest iterations came when we treated AI as
                scaffolding, not the applicant&apos;s voice. That constraint made
                the product feel ethical and still useful.&rdquo;
              </p>
              <footer className="mt-4 text-xs sm:text-sm font-medium not-italic text-neutral-60 dark:text-neutral-40">
                Reflection note, design critique
              </footer>
            </blockquote>
          </div>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Insights" title="What the research revealed">
            <ol className="space-y-8 counter-reset-none list-none">
              {[
                {
                  n: "01",
                  t: "Applicants decide on trust before they use AI. Editable drafts and visible reasoning beat one-click generation.",
                },
                {
                  n: "02",
                  t: "Job search works best when intent is honoured. Filters and search beat infinite swipe for most participants.",
                },
                {
                  n: "03",
                  t: "Workshops earn alignment fast, but only when outputs become artefacts the whole team uses the next morning.",
                },
                {
                  n: "04",
                  t: "Empty states and error copy matter as much as happy paths. Hesitation showed up where the product felt vague about next steps.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-5">
                  <span className="emplojd-stat-figure text-xs font-semibold tabular-nums shrink-0 pt-1">
                    {item.n}
                  </span>
                  <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                    {item.t}
                  </p>
                </li>
              ))}
            </ol>
          </EditorialSection>

          <hr className="my-16 md:my-24 border-neutral-10 emplojd-section-rule" />

          <EditorialSection label="Takeaways" title="What I learned">
            <ol className="space-y-8 counter-reset-none list-none">
              {[
                {
                  n: "01",
                  t: "AI features live or die on trust. Visible controls and editable output consistently outperformed magic demos in feedback.",
                },
                {
                  n: "02",
                  t: "A compact design system pays off in student sprints the same way it does in product teams: fewer debates about pixels, more about behaviour.",
                },
                {
                  n: "03",
                  t: "If I repeated the project, I would define lightweight success metrics earlier so we could prioritise flows with evidence, not only intuition.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-5">
                  <span className="emplojd-stat-figure text-xs font-semibold tabular-nums shrink-0 pt-1">
                    {item.n}
                  </span>
                  <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                    {item.t}
                  </p>
                </li>
              ))}
            </ol>
          </EditorialSection>

          <footer className="mt-20 md:mt-28 pt-10 border-t border-neutral-10 emplojd-section-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="emplojd-stat-figure text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
                Next project
              </p>
              <p className="font-bricolage-grotesque text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                Noted
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/case-studies/noted"
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
      <section className="py-10 md:py-14 w-full border-t border-neutral-10 emplojd-section-rule bg-neutral-0 dark:bg-[#060608]">
        <div className="site-content-shell px-4 sm:px-6 md:px-8 lg:px-12">
          <Footer />
        </div>
      </section>
    </>
  );
}
