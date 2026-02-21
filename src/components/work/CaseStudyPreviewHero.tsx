"use client";

import Image from "next/image";
import { ArrowSquareOut } from "@phosphor-icons/react";
import type { CaseStudyPreviewData } from "./CaseStudyPreviewModal";

interface CaseStudyPreviewHeroProps {
  data: CaseStudyPreviewData;
  /** Use when this hero is the expand target so view transition can morph from modal */
  asExpandTarget?: boolean;
  /** Optional id for the title (e.g. for modal aria-labelledby) */
  titleId?: string;
  className?: string;
}

export default function CaseStudyPreviewHero({
  data,
  asExpandTarget = false,
  titleId,
  className = "",
}: CaseStudyPreviewHeroProps) {
  const TitleTag = titleId ? "h2" : "h1";
  return (
    <article
      className={className}
      {...(asExpandTarget && {
        style: { viewTransitionName: "case-preview-hero" } as React.CSSProperties,
      })}
    >
      {data.logoUrl && (
        <div className="relative shrink-0 size-16 md:size-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={data.logoUrl}
            alt=""
            fill
            className="object-contain p-2 dark:[filter:invert]"
          />
        </div>
      )}

      <TitleTag
        id={titleId}
        className="font-normal leading-tight text-3xl md:text-4xl text-black dark:text-white"
      >
        {data.title}
      </TitleTag>

      <div className="content-stretch flex flex-wrap gap-5 md:gap-6 items-start w-full max-md:grid max-md:grid-cols-2 max-md:gap-4">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <p className="font-medium text-sm text-[#9ca3af]">Timeline</p>
          <p className="font-normal text-base text-black dark:text-white whitespace-pre-wrap">
            {data.timeline}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <p className="font-medium text-sm text-[#9ca3af]">Role</p>
          <p className="font-normal text-base text-black dark:text-white whitespace-pre-wrap">
            {data.role}
          </p>
        </div>
        {data.location && (
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <p className="font-medium text-sm text-[#9ca3af]">Location</p>
            <p className="font-normal text-base text-black dark:text-white whitespace-pre-wrap">
              {data.location}
            </p>
          </div>
        )}
        {data.industry && (
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <p className="font-medium text-sm text-[#9ca3af]">Industry</p>
            <p className="font-normal text-base text-black dark:text-white whitespace-pre-wrap">
              {data.industry}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <p className="font-medium text-sm text-[#9ca3af]">Team</p>
          <p className="font-normal text-base text-black dark:text-white whitespace-pre-wrap">
            {data.team}
          </p>
        </div>
      </div>

      {data.websiteUrl && (
        <a
          href={data.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-base text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-2"
        >
          View website
          <ArrowSquareOut size={18} weight="regular" className="shrink-0" />
        </a>
      )}

      <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />

      <div className="w-full rounded-[26px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-[1090/591] max-h-[480px] xl:max-h-[520px] relative shrink-0">
        <Image
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          className="object-cover rounded-[26px]"
          sizes="(max-width: 1280px) 100vw, 1400px"
        />
      </div>
    </article>
  );
}
