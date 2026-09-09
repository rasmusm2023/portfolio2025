"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TITLES = [
  { lead: "Product", role: "Designer" },
  { lead: "UX", role: "Designer" },
  { lead: "UI", role: "Designer" },
  { lead: "Digital", role: "Designer" },
  { lead: "Software", role: "Developer" },
] as const;
const HOLD_MS = 3000;
const SWAP_DURATION_MS = 1100;
const ENTRANCE_DELAY_MS = 1300;
const SWAP_BLUR_PX = 7;
const SWAP_OPACITY_DIP = 0.45;

interface HeroTitleCycleProps {
  scrollBlur?: number;
}

export default function HeroTitleCycle({ scrollBlur = 0 }: HeroTitleCycleProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swapBlur, setSwapBlur] = useState(0);
  const [swapOpacity, setSwapOpacity] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timeoutIds = useRef<number[]>([]);
  const cancelAnimation = useRef<(() => void) | null>(null);

  const clearTimers = () => {
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
    timeoutIds.current = [];
    cancelAnimation.current?.();
    cancelAnimation.current = null;
  };

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutIds.current.push(id);
  };

  const runSwapAnimation = useCallback((nextIndex: number) => {
    cancelAnimation.current?.();

    const start = performance.now();
    let frameId = 0;
    let swapped = false;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / SWAP_DURATION_MS);
      const envelope = Math.sin(progress * Math.PI);

      setSwapBlur(envelope * SWAP_BLUR_PX);
      setSwapOpacity(1 - envelope * SWAP_OPACITY_DIP);

      if (progress >= 0.5 && !swapped) {
        swapped = true;
        setActiveIndex(nextIndex);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setSwapBlur(0);
        setSwapOpacity(1);
        cancelAnimation.current = null;
      }
    };

    frameId = requestAnimationFrame(tick);
    cancelAnimation.current = () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    clearTimers();

    if (reducedMotion) {
      setActiveIndex(0);
      setSwapBlur(0);
      setSwapOpacity(1);
      return clearTimers;
    }

    let currentIndex = 0;

    const advance = () => {
      const nextIndex = (currentIndex + 1) % TITLES.length;
      runSwapAnimation(nextIndex);
      currentIndex = nextIndex;
      schedule(advance, HOLD_MS + SWAP_DURATION_MS);
    };

    schedule(advance, ENTRANCE_DELAY_MS + HOLD_MS);

    return clearTimers;
  }, [reducedMotion, runSwapAnimation]);

  const isScrolling = scrollBlur > 0;
  const blurPx = isScrolling ? scrollBlur : swapBlur;
  const opacity = isScrolling ? 1 : swapOpacity;
  const { lead, role } = TITLES[activeIndex];

  return (
    <>
      <span
        className="hero-title-cycle"
        style={{
          opacity,
          transition: isScrolling
            ? "filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "none",
          ...(blurPx > 0.05 ? { filter: `blur(${blurPx}px)` } : {}),
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="hero-title-cycle-text">
          {lead} {role}
        </span>
      </span>
      <span className="sr-only">
        {lead} {role}
      </span>
    </>
  );
}
