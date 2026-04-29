"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-3">
      {children}
    </p>
  );
}

function Stat({
  figure,
  label,
}: {
  figure: string;
  label: string;
}) {
  return (
    <div className="min-w-[45%] flex-1 sm:min-w-0">
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-0 tabular-nums">
        {figure}
      </p>
      <p className="mt-1 text-xs sm:text-sm leading-snug text-neutral-60 dark:text-neutral-40 max-w-[14rem]">
        {label}
      </p>
    </div>
  );
}

function MetaCell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-60 dark:text-neutral-40 mb-2">
        {title}
      </p>
      <div className="text-sm sm:text-base text-neutral-80 dark:text-neutral-20 leading-relaxed">
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
        <h3 className="text-base md:text-lg font-semibold text-neutral-100 dark:text-neutral-0 mb-2">
          {title}
        </h3>
        <div className="text-sm sm:text-base text-neutral-80 dark:text-neutral-20 leading-relaxed space-y-2">
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-2">
        {index}
      </p>
      <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-sm font-medium text-neutral-70 dark:text-neutral-30 mb-5">
        {subtitle}
      </p>
      <div className="text-sm sm:text-base text-neutral-80 dark:text-neutral-20 leading-relaxed space-y-4 mb-8">
        {children}
      </div>
      {decision != null && rationale != null ? (
        <div className="rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/35 px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-60 dark:text-neutral-40 mb-2">
            Key decision
          </p>
          <p className="text-sm sm:text-base font-medium text-neutral-100 dark:text-neutral-0 mb-3">
            {decision}
          </p>
          <p className="text-xs sm:text-sm text-neutral-70 dark:text-neutral-40 leading-relaxed">
            <span className="font-semibold text-neutral-80 dark:text-neutral-25">
              Why:{" "}
            </span>
            {rationale}
          </p>
        </div>
      ) : null}
    </article>
  );
}

export default function EmplojdEditorialCaseStudyPage() {
  useEffect(() => {
    document.title =
      "Emplojd — Editorial Case Study | Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  return (
    <main className="min-h-screen bg-neutral-0 dark:bg-[#060608] pb-24 md:pb-32">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-neutral-10 dark:border-neutral-80/80 bg-neutral-0/90 dark:bg-[#060608]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-70 dark:text-neutral-40 transition-colors hover:text-neutral-100 dark:hover:text-neutral-0"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Work
          </Link>
          <Link
            href="/case-studies/emplojd"
            className="text-xs font-medium text-neutral-60 dark:text-neutral-40 underline-offset-4 hover:text-neutral-100 dark:hover:text-neutral-0 hover:underline max-sm:text-[10px] max-sm:uppercase max-sm:tracking-wide"
          >
            Classic layout
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 pt-12 md:px-8 md:pt-16 lg:pt-20">
        <p className="text-sm font-medium text-neutral-60 dark:text-neutral-40">
          Case study ·{" "}
          <span className="text-neutral-80 dark:text-neutral-25">Emplojd</span>
        </p>

        <h1 className="font-[family-name:var(--font-instrument-serif)] mt-4 text-[clamp(2rem,6vw,3.75rem)] font-normal leading-[1.08] tracking-tight text-neutral-100 dark:text-neutral-0">
          Product &amp; UX design
        </h1>
        <p className="mt-5 text-lg sm:text-xl md:text-2xl leading-snug text-neutral-70 dark:text-neutral-30 max-w-2xl">
          Helping job seekers apply with confidence — without losing their voice
          to generic AI.
        </p>

        <SectionLabel>Background</SectionLabel>
        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-neutral-80 dark:text-neutral-20">
          <p>
            Job hunting often means repeating the same effort across dozens of
            listings: tweaking CVs, rewriting cover letters, and second-guessing
            tone. Many candidates either burn out or fall back on bland,
            copy-paste applications that recruiters recognise instantly.
          </p>
          <p>
            Emplojd explores how AI can{" "}
            <strong className="font-semibold text-neutral-100 dark:text-neutral-0">
              shorten the boring parts
            </strong>{" "}
            of applying while keeping recommendations and drafts anchored in what
            each person actually cares about. The product combines job discovery
            with assistance for tailored cover letters — always editable, never a
            black box.
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
            , an eight-week, cross-disciplinary sprint with a brief centred on
            AI — ideal pressure to go from problem framing to a tested,
            presentable product.
          </p>
        </div>

        <SectionLabel>My role</SectionLabel>
        <p className="text-base sm:text-lg leading-relaxed text-neutral-80 dark:text-neutral-20">
          Lead UX/UI designer: discovery workshops, research synthesis,
          information architecture, interaction design, a lightweight design
          system, prototyping, usability testing, and handoff with frontend
          developers. I collaborated daily with engineering and kept stakeholders
          aligned through critiques and structured checkpoints.
        </p>

        {/* Stats */}
        <div className="my-14 md:my-16 border-y border-neutral-10 dark:border-neutral-80 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8">
            <Stat figure="8 wks" label="Chas Challenge sprint from kickoff to showcase" />
            <Stat figure="6" label="Designers & developers in the core team" />
            <Stat figure="15+" label="Research & usability rounds (moderated + async)" />
            <Stat figure="3" label="Major product pillars: discover, draft, refine" />
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid gap-10 sm:grid-cols-2 border-t border-neutral-10 dark:border-neutral-80 pt-10">
          <MetaCell title="Role">Lead UX/UI Designer</MetaCell>
          <MetaCell title="Tools">
            Figma · FigJam · Prototyping · UserTesting · Notion · Slack · Git
          </MetaCell>
          <MetaCell title="Timeline">Jan — Mar 2024 (8 weeks)</MetaCell>
          <MetaCell title="Context">
            Student brief · shipped prototype &amp; design documentation
          </MetaCell>
          <MetaCell title="Collaboration">
            Paired with PM/engineering; validated flows with peers &amp;
            potential users; presented outcomes to industry jury.
          </MetaCell>
        </div>

        {/* Hero figure */}
        <figure className="mt-16 md:mt-20">
          <div className="overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
            <Image
              src="/assets/case-study-assets/emplojd/Emplojd-Results-Shot-Menu-Search-Job-Search-Results.png"
              alt="Emplojd interface showing job search and results"
              width={1600}
              height={1000}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <figcaption className="mt-4 text-xs sm:text-sm text-neutral-60 dark:text-neutral-40 leading-relaxed">
            Hero mockup — core discover experience: search, filters, and saved
            roles.
          </figcaption>
        </figure>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Process</SectionLabel>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-10 md:mb-12">
          UX approach
        </h2>
        <div className="space-y-10 md:space-y-12">
          <ProcessStep
            icon="🔍"
            title="Research & discovery"
            body={
              <>
                <p>
                  Mapped pains across the application journey with interviews and
                  lightweight surveys; reviewed competitor flows for discovery,
                  saved jobs, and document creation.
                </p>
                <p>
                  Workshop outputs (Crazy 8s, storyboarding) helped the team align
                  on who we optimise for first — time-starved applicants who still
                  want believable, personal outreach.
                </p>
              </>
            }
          />
          <ProcessStep
            icon="✏️"
            title="Definition & ideation"
            body={
              <>
                <p>
                  Consolidated flows for onboarding, job discovery, cover-letter
                  drafting, and revisions; prioritised a narrative that keeps users
                  in control of edits and tone.
                </p>
                <p>
                  Iterated wireframes into a coherent UI kit so developers could
                  implement consistently without endless one-offs.
                </p>
              </>
            }
          />
          <ProcessStep
            icon="🚀"
            title="Validation & iteration"
            body={
              <>
                <p>
                  Ran moderated sessions on clickable prototypes; tightened copy,
                  empty states, and error paths where hesitation showed up.
                </p>
                <p>
                  Documented component behaviour and edge cases for handoff so the
                  build stayed faithful to intent after the course deadline.
                </p>
              </>
            }
          />
        </div>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Process</SectionLabel>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-12 md:mb-14">
          What I did
        </h2>

        <div className="space-y-16 md:space-y-20">
          <Workstream
            index="01"
            title="Grounding the team"
            subtitle="Kickoff workshop & problem framing"
          >
            <p>
              Facilitated early workshops to surface assumptions about recruiters,
              candidates, and “acceptable” use of AI. We translated sticky-note
              chaos into clear jobs-to-be-done and non-goals for v1.
            </p>
          </Workstream>
          <Workstream
            index="02"
            title="From swipe-first to search-first"
            subtitle="Information architecture"
            decision="Merged discovery patterns so search and structured filters stay primary; treats swipe-style browsing as secondary exploration."
            rationale="Testing indicated many users arrive with intent (role, city, remote); infinite swipe alone increased fatigue before they saw strong matches."
          >
            <p>
              Iterated IA until paths for “find roles”, “save”, and “draft a
              letter for this listing” read as three honest steps — no buried
              shortcuts that felt like dark patterns.
            </p>
          </Workstream>

          <Workstream
            index="03"
            title="Design system in miniature"
            subtitle="UI kit & craft"
            decision="Locked typography, spacing, button hierarchy, and form patterns early; expanded components only when a screen proved it necessary."
            rationale="With a short runway, a tight system reduced rework and kept mobile layouts predictable for engineering."
          >
            <p>
              Established core components (navigation, cards, modals, AI-assisted
              panels) and applied them across flows so critique stayed about
              semantics, not one-off pixels.
            </p>
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
                Craft — exploration across core surfaces before locking final UI.
              </figcaption>
            </figure>
          </Workstream>

          <Workstream
            index="04"
            title="Evidence before polish"
            subtitle="Testing & handoff"
            decision="Shipped a prototype that favoured traceable AI suggestions (clear sources, editable output) over maximal automation."
            rationale="Participants trusted assistance more when they could adjust tone and see why a job was recommended."
          >
            <p>
              Consolidated findings into short playback decks for the team and a
              pragmatic handoff sheet: states, validation rules, and responsive
              breakpoints that survived first implementation.
            </p>
          </Workstream>
        </div>

        <blockquote className="my-16 md:my-20 border-l-[3px] border-neutral-100 dark:border-neutral-0 pl-6 md:pl-8 py-1">
          <p className="font-[family-name:var(--font-instrument-serif)] text-lg md:text-xl leading-relaxed text-neutral-90 dark:text-neutral-10 italic">
            “The strongest iterations came when we treated AI as scaffolding — not
            the applicant’s voice. That constraint made the product feel
            ethical and still useful.”
          </p>
          <footer className="mt-4 text-xs sm:text-sm font-medium not-italic text-neutral-60 dark:text-neutral-40">
            — Reflection note, design critique (team synthesis)
          </footer>
        </blockquote>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Takeaways</SectionLabel>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-8">
          What I learned
        </h2>
        <ol className="space-y-8 counter-reset-none list-none">
          {[
            {
              n: "01",
              t: "Workshops earn alignment fast — but only if you timebox outputs into concrete artefacts the whole team can point to the next morning.",
            },
            {
              n: "02",
              t: "AI features live or die on trust. Visible controls and editable output consistently outperformed ‘magic’ demos in feedback.",
            },
            {
              n: "03",
              t: "If I repeated the sprint, I’d bake analytics hypotheses earlier (even lightweight) so we could prioritise flows with evidence, not only intuition.",
            },
          ].map((item) => (
            <li key={item.n} className="flex gap-5">
              <span className="text-xs font-semibold tabular-nums text-neutral-60 dark:text-neutral-40 shrink-0 pt-1">
                {item.n}
              </span>
              <p className="text-base sm:text-lg leading-relaxed text-neutral-80 dark:text-neutral-20">
                {item.t}
              </p>
            </li>
          ))}
        </ol>

        {/* Footer next */}
        <footer className="mt-20 md:mt-28 pt-10 border-t border-neutral-10 dark:border-neutral-80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-2">
              Next project
            </p>
            <p className="text-lg font-semibold text-neutral-100 dark:text-neutral-0">
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
  );
}
