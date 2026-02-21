"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import { figtree } from "@/app/fonts";
import CaseStudyPreviewHero from "./CaseStudyPreviewHero";
import type { CaseStudyPreviewData } from "./CaseStudyPreviewModal";

/** Same max-width and padding as the preview modal so expand feels like the modal grew into the page */
/** Top padding clears the fixed header (h-16 sm:h-20 xl:h-24) so the Back button is clickable */
const PREVIEW_CONTAINER_CLASS =
  "w-full max-w-6xl xl:max-w-[1400px] px-6 md:px-12 xl:px-[175px] pt-20 sm:pt-24 xl:pt-28 pb-10 md:pb-12 mx-auto";

interface CaseStudyExpandLayoutProps {
  data: CaseStudyPreviewData;
  title: string;
  children?: React.ReactNode;
}

export default function CaseStudyExpandLayout({
  data,
  title,
  children,
}: CaseStudyExpandLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    document.title = `${title} — Rasmus Mattsson | Product Designer Portfolio`;
  }, [title]);

  return (
    <div
      className={`${figtree.className} min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white`}
    >
      <div className={PREVIEW_CONTAINER_CLASS}>
        <div className="flex flex-col gap-8 items-start">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors -ml-1 cursor-pointer bg-transparent border-0 font-inherit p-0"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} weight="regular" />
            Back
          </button>

          <CaseStudyPreviewHero data={data} asExpandTarget className="flex flex-col gap-8 w-full" />

          {children}
        </div>
      </div>
    </div>
  );
}
