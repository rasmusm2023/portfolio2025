"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "SOFTWARE DEVELOPER",
  "UX/UI DESIGNER",
  "PRODUCT DESIGNER",
] as const;

const LONGEST_TITLE = TITLES[0];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** How long the resolved title stays in the accent color. */
const HOLD_MS = 1500;
/** Wait until the hero subtitle has started fading in. */
const ENTRANCE_DELAY_MS = 520;
/** Slowest step, used at the start and end of a title. */
const SLOW_STEP_MS = 110;
/** Fastest step, used through the middle of a title. */
const FAST_STEP_MS = 28;
/** Random glyphs shown on a letter before it locks to the correct one. */
const FLICKS_PER_LETTER = 1;

/** Ease-in-out: slow at the first letter, fast in the middle, slow on the last. */
function stepInterval(letterIndex: number, letterCount: number) {
  if (letterCount <= 1) return SLOW_STEP_MS;
  const progress = letterIndex / (letterCount - 1);
  const throughMiddle = Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI);
  return SLOW_STEP_MS + (FAST_STEP_MS - SLOW_STEP_MS) * throughMiddle;
}

interface HeroTitleCycleProps {
  scrollBlur?: number;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function differentGlyph(current: string) {
  const next = randomGlyph();
  if (next !== current) return next;
  return GLYPHS[(GLYPHS.indexOf(current) + 1) % GLYPHS.length];
}

function isFixedChar(char: string) {
  return char === " " || char === "/";
}

/** Stable first paint so server and client match before the scramble starts. */
function seededScramble(target: string) {
  let seed = 11;
  let result = "";
  for (const char of target) {
    if (char === " " || char === "/") {
      result += char;
      continue;
    }
    seed = (seed * 16807) % 2147483647;
    result += GLYPHS[seed % GLYPHS.length];
  }
  return result;
}

export default function HeroTitleCycle({ scrollBlur = 0 }: HeroTitleCycleProps) {
  const [display, setDisplay] = useState(() => seededScramble(TITLES[0]));
  const [settled, setSettled] = useState(false);
  const [announced, setAnnounced] = useState<string>(TITLES[0]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(TITLES[0]);
      setSettled(true);
      setAnnounced(TITLES[0]);
      return;
    }

    let frame = 0;
    let timer = 0;
    let cancelled = false;

    const play = (targetIndex: number, from: string | null) => {
      const target = TITLES[targetIndex];
      const chars = target.split("");
      // Letters not yet reached stay put: the previous title, or a static scramble.
      const buffer = (from ?? seededScramble(target)).split("");
      while (buffer.length < chars.length) buffer.push(randomGlyph());
      buffer.length = chars.length;

      let index = 0;
      let flicks = 0;
      let solvedLetters = 0;
      const letterCount = chars.reduce(
        (count, char) => count + (isFixedChar(char) ? 0 : 1),
        0,
      );
      let lastGlyphAt = performance.now();
      let shown = "";

      const publish = () => {
        const nextDisplay = buffer.join("");
        if (nextDisplay === shown) return;
        shown = nextDisplay;
        setDisplay(nextDisplay);
      };

      const skipFixed = () => {
        while (index < chars.length && isFixedChar(chars[index])) {
          buffer[index] = chars[index];
          index += 1;
        }
      };

      setSettled(false);
      skipFixed();
      publish();

      const finish = () => {
        setDisplay(target);
        setSettled(true);
        setAnnounced(target);
        timer = window.setTimeout(() => {
          if (!cancelled) play((targetIndex + 1) % TITLES.length, target);
        }, HOLD_MS);
      };

      const tick = (now: number) => {
        if (cancelled) return;

        if (index >= chars.length) {
          finish();
          return;
        }

        if (now - lastGlyphAt >= stepInterval(solvedLetters, letterCount)) {
          lastGlyphAt = now;

          if (flicks < FLICKS_PER_LETTER) {
            buffer[index] = differentGlyph(buffer[index]);
            flicks += 1;
          } else {
            buffer[index] = chars[index];
            index += 1;
            flicks = 0;
            solvedLetters += 1;
            skipFixed();
          }

          publish();

          if (index >= chars.length) {
            finish();
            return;
          }
        }

        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    timer = window.setTimeout(() => play(0, null), ENTRANCE_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <>
      <span className="hero-title-cycle" aria-hidden="true">
        <span className="hero-title-cycle-sizer">{LONGEST_TITLE}</span>
        <span
          className={`hero-title-cycle-text${settled ? " is-settled" : ""}`}
          style={{
            filter: scrollBlur > 0.05 ? `blur(${scrollBlur}px)` : "none",
          }}
        >
          {display}
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {announced}
      </span>
    </>
  );
}
