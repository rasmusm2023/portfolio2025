"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";
import { Maximize2 } from "lucide-react";
import { figtree } from "@/app/fonts";
import CaseStudyPreviewHero from "./CaseStudyPreviewHero";

const CLOSE_DURATION_MS = 250;
const EXPAND_DURATION_MS = 800;
const NAVIGATE_AFTER_EXPAND_MS = 880;
const CLOSE_AFTER_NAVIGATE_MS = 100;

export interface CaseStudyPreviewData {
  title: string;
  description: string;
  timeline: string;
  team: string;
  role: string;
  location?: string;
  industry?: string;
  websiteUrl?: string;
  logoUrl?: string;
  heroImage: string;
  heroImageAlt: string;
  fullLink: string;
}

interface CaseStudyPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CaseStudyPreviewData | null;
}

export default function CaseStudyPreviewModal({
  isOpen,
  onClose,
  data,
}: CaseStudyPreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const [isExiting, setIsExiting] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsExiting(false);
    setIsExpanding(false);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (expandTimeoutRef.current) clearTimeout(expandTimeoutRef.current);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isExiting || isExpanding) return;
    setIsExiting(true);
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
    }, CLOSE_DURATION_MS);
  };

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    if (!data || isExpanding) return;
    e.preventDefault();
    setIsExpanding(true);
    // Wait for expand animation to finish, then navigate
    expandTimeoutRef.current = setTimeout(() => {
      expandTimeoutRef.current = null;
      router.push(data.fullLink);
      setTimeout(() => onClose(), CLOSE_AFTER_NAVIGATE_MS);
    }, NAVIGATE_AFTER_EXPAND_MS);
  };

  if (!isOpen) return null;

  const modal = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 ${
        isExiting
          ? "animate-preview-overlay-out"
          : isExpanding
            ? "opacity-100"
            : "animate-preview-overlay"
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="preview-modal-title"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className={`${figtree.className} flex flex-col gap-8 items-start justify-center overflow-y-auto rounded-[26px] bg-white dark:bg-[#0a0a0a] shadow-2xl border border-zinc-200 dark:border-zinc-800 px-6 md:px-12 xl:px-[175px] pt-14 pb-10 md:pt-16 md:pb-12 relative origin-center ${
          isExiting
            ? "animate-preview-content-out"
            : isExpanding
              ? "preview-expand-outer w-full max-w-6xl xl:max-w-[1400px] max-h-[92vh]"
              : "opacity-0 scale-[0.96] animate-preview-content w-full max-w-6xl xl:max-w-[1400px] max-h-[92vh]"
        }`}
        style={data ? ({ viewTransitionName: "case-preview-hero" } as React.CSSProperties) : undefined}
      >
        {/* Inner wrapper counter-scaled so content stays crisp while outer grows */}
        <div
          className={`flex flex-col gap-8 items-start w-full min-h-0 ${isExpanding ? "preview-expand-inner" : ""}`}
          style={isExpanding ? { transformOrigin: "center center" } : undefined}
        >
          {/* Top left: expand to full case study */}
          {data && (
            <button
              type="button"
              onClick={handleExpandClick}
              disabled={isExpanding}
              className="absolute top-6 left-6 p-2.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-70"
              aria-label="View full case study"
            >
              <Maximize2 className="size-5 shrink-0" strokeWidth={2} aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            disabled={isExiting}
            className="absolute top-6 right-6 p-2.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-70"
            aria-label="Close preview"
          >
            <X size={20} weight="bold" />
          </button>

          {data ? (
            <CaseStudyPreviewHero data={data} titleId="preview-modal-title" className="flex flex-col gap-8 w-full" />
          ) : null}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined" || !document.body) return null;
  return createPortal(modal, document.body);
}
