"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-3">
      {children}
    </p>
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
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-60 dark:text-neutral-40 mb-2">
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-2">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-60 dark:text-neutral-40 mb-2">
            Key decision
          </p>
          <p className="text-base font-medium text-neutral-100 dark:text-neutral-0 mb-3">
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

function ElPorteroEditorialContent() {
  useEffect(() => {
    document.title =
      "El Portero — Case Study | Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  return (
    <>
    <main className="min-h-screen bg-neutral-0 dark:bg-[#060608] pb-16 md:pb-20">
      <header className="sticky top-0 z-20 border-b border-neutral-10 dark:border-neutral-80/80 bg-neutral-0/90 dark:bg-[#060608]/90 backdrop-blur-md">
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
      </header>

      <article className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-6 md:px-8 md:pt-16 lg:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-60 dark:text-neutral-40">
          Case study ·{" "}
          <span className="text-neutral-80 dark:text-neutral-25">
            El Portero
          </span>
        </p>

        <h1 className="font-bricolage-grotesque mt-4 text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-neutral-100 dark:text-neutral-0">
          Design &amp; development
        </h1>
        <p className="font-bricolage-grotesque mt-5 text-lg sm:text-xl md:text-2xl font-normal leading-snug text-neutral-70 dark:text-neutral-30 max-w-3xl lg:max-w-4xl">
          A modern, warm, and premium online presence with effortless paths to
          booking for visitors.
        </p>

        <hr className="my-12 md:my-16 border-neutral-10 dark:border-neutral-80" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
          <div>
            <SectionLabel>Background</SectionLabel>
            <div className="space-y-5 text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
              <p>
                El Portero is a restaurant in Spain that needed a digital
                presence matching the quality of the in-room experience —
                modern, premium, warm, and welcoming — without feeling cold or
                inaccessible to guests browsing menus and making a reservation.
              </p>
              <p>
                Rather than a popular site builder, we designed and built a
                custom website and admin portal. Through discussions with
                restaurant management, it became clear they wanted a system that
                could be shaped over time to fit their specific needs — without
                the sudden limitations that off-the-shelf tools and builders
                often introduce later.
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
                for staff — where the team can update events, menus, and opening
                hours, publishing to the guest site when they choose to.
              </p>
              <p>
                I designed and built the experience end-to-end — including the
                logo and menu designs — from visual direction and interaction
                design through to frontend implementation, performance
                optimization, and admin tooling.
              </p>
            </div>
            <p className="mt-8 text-base font-semibold leading-relaxed text-neutral-90 dark:text-neutral-10">
              How might we give a restaurant a modern yet warm and premium
              digital presence — while making browsing and booking feel
              effortless for every visitor?
            </p>
          </div>

          <div>
            <SectionLabel>My role</SectionLabel>
            <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
              Product Designer, Digital Designer &amp; Developer: logo and menu
              design, brand and UI direction, information architecture, frontend
              development, performance optimization, admin portal design and
              build, and BokaBord booking button integration. I owned the full
              journey from concept to shipped product.
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

        <div className="border-t border-neutral-10 dark:border-neutral-80 pt-10">
          <div className="grid grid-cols-[repeat(2,minmax(0,10rem))] gap-x-6 gap-y-8 sm:grid-cols-[repeat(4,10rem)] sm:gap-x-8 md:gap-x-10">
            <MetaCell title="Role">
              Product Designer, Digital Designer &amp; Developer
            </MetaCell>
            <MetaCell title="Tools">
              Figma · Next.js · TypeScript · BokaBord · GitHub · Cursor
            </MetaCell>
            <MetaCell title="Timeline">2026</MetaCell>
            <MetaCell title="Context">
              Client project · restaurant in Spain
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
              src="/assets/case-study-assets/el-portero/el-portero-works-thumbnail.webp"
              alt="El Portero restaurant website"
              width={1600}
              height={1000}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 1440px"
              priority
            />
          </div>
          <figcaption className="mt-4 text-xs sm:text-sm text-neutral-60 dark:text-neutral-40 leading-relaxed">
            Hero — public-facing site direction: modern, warm, premium, and
            built around effortless browsing and booking.
          </figcaption>
        </figure>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Process</SectionLabel>
        <h2 className="font-bricolage-grotesque text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-10 md:mb-12">
          UX approach
        </h2>
        <div className="space-y-10 md:space-y-12">
          <ProcessStep
            icon="🍽️"
            title="Discovery & direction"
            body={
              <>
                <p>
                  Mapped how guests discover the restaurant online and what
                  signals trust before booking — menu clarity, atmosphere,
                  location, and a reservation path that feels straightforward on
                  mobile and desktop.
                </p>
                <p>
                  Aligned with the team on a visual tone that reads premium,
                  warm, and welcoming without losing seriousness: restrained
                  typography, generous spacing, and video- and photography-led
                  layouts.
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
                  information, and clear paths to BokaBord booking — keeping the
                  journey short and legible at every step.
                </p>
                <p>
                  In parallel, defined admin workflows for staff: creating and
                  editing events, updating food and drink menus, and managing
                  opening hours — with every change publishing straight to the
                  public site when the staff wishes it.
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
                  connecting booking buttons on the guest site to BokaBord while
                  keeping staff-controlled admin updates in sync across both
                  surfaces. The codebase is version-controlled in GitHub; Cursor
                  supported day-to-day design and development work.
                </p>
                <p>
                  Optimized the site for sustained heavy traffic: where content
                  is stored, how images and video are served, and how pages load
                  under continuous visitor load — not just ideal demo
                  conditions.
                </p>
              </>
            }
          />
        </div>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Process</SectionLabel>
        <h2 className="font-bricolage-grotesque text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-12 md:mb-14">
          What I did
        </h2>

        <div className="space-y-16 md:space-y-20">
          <Workstream
            index="01"
            title="Premium without friction"
            subtitle="Brand & guest experience"
            decision="Led with video and photography, restrained type, and calm navigation — BokaBord booking always one honest step away, never buried."
            rationale="Guests needed to feel the restaurant's warmth and quality immediately; hiding reservations behind heavy brand theatre would hurt conversion."
          >
            <p>
              Shaped a public site that communicates seriousness and care
              through layout and pacing, not decorative noise — so browsing
              feels premium and booking feels obvious. I also designed the
              restaurant logo and food and drink menus, supporting the brand
              without letting print collateral overshadow the digital
              experience.
            </p>
            <figure className="my-8 md:my-10 max-w-2xl">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="overflow-hidden rounded-lg border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20">
                  <Image
                    src="/assets/case-study-assets/el-portero/el-portero-works-thumbnail.webp"
                    alt="El Portero logo design"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 45vw, 320px"
                  />
                </div>
                <div className="overflow-hidden rounded-lg border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/20">
                  <Image
                    src="/assets/case-study-assets/el-portero/el-portero-works-thumbnail.webp"
                    alt="El Portero menu design"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 45vw, 320px"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-neutral-60 dark:text-neutral-40">
                Brand craft — logo and menu designs (supporting the site, not
                the headline story).
              </figcaption>
            </figure>
          </Workstream>

          <Workstream
            index="02"
            title="Booking without reinventing the wheel"
            subtitle="BokaBord integration"
            decision="Connected booking buttons on the guest site to BokaBord — an industry-leading restaurant booking system in Sweden — rather than designing or building a reservation flow from scratch."
            rationale="BokaBord already handles the booking experience reliably; my work was integrating it cleanly so guests reach it naturally from the restaurant's own site."
          >
            <p>
              I did not design the booking flow itself. Booking CTAs across the
              site link into BokaBord&apos;s service, placed where guests expect
              them and styled to feel native to the restaurant&apos;s brand
              environment.
            </p>
          </Workstream>

          <Workstream
            index="03"
            title="Tools the team actually needs"
            subtitle="Admin portal"
            decision="Built a dedicated staff portal instead of bending a generic CMS or site builder — shaped around events, menus, and opening hours, with room to grow."
            rationale="The client wanted a system they could evolve over time without hitting sudden platform limits — custom tooling gave them that flexibility from day one."
          >
            <p>
              Designed admin views for the tasks staff own day to day: creating
              and editing events, updating food and drink menus, and changing
              opening hours — published to the guest-facing site when staff
              choose to push changes live.
            </p>
          </Workstream>

          <Workstream
            index="04"
            title="One system, two audiences"
            subtitle="Integrations & delivery"
            decision="Treated guest site and admin portal as one product with shared data — not two separate builds that drift apart."
            rationale="When booking integrations and live admin updates live in one coherent system, staff and guests see the same truth."
          >
            <p>
              Connected BokaBord booking buttons on the guest side and
              staff-controlled admin publishing on the back office, then shipped
              both surfaces so the restaurant could run the full loop —
              discover, book via BokaBord, and keep menus, events, and hours
              current — from day one.
            </p>
          </Workstream>

          <Workstream
            index="05"
            title="Built for sustained traffic"
            subtitle="Performance optimization"
            decision="Treated performance as a design requirement from the start — optimizing content storage, images, and video for continuous heavy visitor load."
            rationale="We expected a steady stream of guests browsing menus and booking; a premium site that stutters under load would undermine the brand as quickly as a weak layout."
          >
            <p>
              Audited how content is stored and delivered, tuned image and video
              handling, and optimized page loading so the experience stays fast
              and stable even when visitor numbers stay high — not only on
              launch day.
            </p>
          </Workstream>
        </div>

        <blockquote className="my-16 md:my-20 border-l-[3px] border-neutral-100 dark:border-neutral-0 pl-6 md:pl-8 py-1">
          <p className="font-bricolage-grotesque text-base leading-relaxed text-neutral-90 dark:text-neutral-10 italic">
            &ldquo;The site had to feel like the restaurant — not like a
            template with a logo swapped in. That constraint shaped every layout
            and every booking decision.&rdquo;
          </p>
          <footer className="mt-4 text-xs sm:text-sm font-medium not-italic text-neutral-60 dark:text-neutral-40">
            — Reflection note, project retrospective
          </footer>
        </blockquote>

        <hr className="my-16 md:my-24 border-neutral-10 dark:border-neutral-80" />

        <SectionLabel>Takeaways</SectionLabel>
        <h2 className="font-bricolage-grotesque text-2xl md:text-3xl text-neutral-100 dark:text-neutral-0 tracking-tight mb-8">
          What I learned
        </h2>
        <ol className="space-y-8 counter-reset-none list-none">
          {[
            {
              n: "01",
              t: "Premium hospitality UI is often about restraint — fewer elements, clearer hierarchy, and confidence in whitespace.",
            },
            {
              n: "02",
              t: "Designing for staff is as important as designing for guests; a beautiful public site fails if the team can't run it reliably.",
            },
            {
              n: "03",
              t: "Performance and brand craft deserve the same rigour as the hero flows — a site that looks premium but loads slowly, or collapses under traffic, breaks the promise immediately.",
            },
            {
              n: "04",
              t: "End-to-end ownership helped: decisions made in Figma survived implementation because the same person carried them into code, integrations, and optimization.",
            },
          ].map((item) => (
            <li key={item.n} className="flex gap-5">
              <span className="text-xs font-semibold tabular-nums text-neutral-60 dark:text-neutral-40 shrink-0 pt-1">
                {item.n}
              </span>
              <p className="text-base leading-relaxed text-neutral-80 dark:text-neutral-20">
                {item.t}
              </p>
            </li>
          ))}
        </ol>

        <footer className="mt-20 md:mt-28 pt-10 border-t border-neutral-10 dark:border-neutral-80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-60 dark:text-neutral-40 mb-2">
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
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-10 md:py-14 w-full border-t border-neutral-200 dark:border-[#1a1a1a] bg-neutral-0 dark:bg-[#060608]">
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
