"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  sizes?: string;
};

type HorizontalScrollGalleryProps = {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  renderImage: (
    image: GalleryImage,
    index: number,
    onClick: () => void
  ) => ReactNode;
  stickyTopClassName?: string;
  captionClassName?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function SlideCaption({
  caption,
  className = "mt-3 text-xs text-neutral-60 dark:text-neutral-40 leading-relaxed",
}: {
  caption?: string;
  className?: string;
}) {
  if (!caption) return null;

  return <figcaption className={className}>{caption}</figcaption>;
}

export default function HorizontalScrollGallery({
  images,
  onImageClick,
  renderImage,
  stickyTopClassName = "top-24 md:top-28 xl:top-32",
  captionClassName,
}: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const metricsRef = useRef({ sectionHeight: 0, maxTranslate: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const measure = () => {
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!sticky || !track) return;

    const horizontalScroll = Math.max(0, track.scrollWidth - sticky.clientWidth);
    const stickyHeight = sticky.clientHeight;

    const nextSectionHeight = stickyHeight + horizontalScroll;
    metricsRef.current = {
      sectionHeight: nextSectionHeight,
      maxTranslate: horizontalScroll,
    };
    setMaxTranslate(horizontalScroll);
    setSectionHeight(nextSectionHeight);
  };

  useLayoutEffect(() => {
    measure();

    const track = trackRef.current;
    if (!track) return;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images]);

  const updateTransform = useCallback((scrollY: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    const { sectionHeight: measuredHeight, maxTranslate: measuredTranslate } =
      metricsRef.current;

    if (!container || !track || measuredHeight <= 0) return;

    const sticky = stickyRef.current;
    const stickyHeight = sticky?.clientHeight ?? window.innerHeight;
    const scrollable = Math.max(measuredHeight - stickyHeight, 1);
    const scrollStart = container.offsetTop;
    const progress = clamp((scrollY - scrollStart) / scrollable, 0, 1);

    track.style.transform = `translate3d(${-progress * measuredTranslate}px, 0, 0)`;
  }, []);

  useLenis(({ scroll }) => {
    if (prefersReducedMotion) return;
    updateTransform(scroll);
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onScroll = () => updateTransform(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion, sectionHeight, maxTranslate, updateTransform]);

  if (prefersReducedMotion) {
    return (
      <figure>
        <div className="grid gap-6 sm:gap-8">
          {images.map((image, index) => (
            <div key={`${image.src}-${index}`}>
              {renderImage(image, index, () => onImageClick(index))}
              <SlideCaption caption={image.caption} className={captionClassName} />
            </div>
          ))}
        </div>
      </figure>
    );
  }

  return (
    <figure>
      <div
        ref={containerRef}
        style={{ height: sectionHeight ?? "100vh" }}
        className="relative"
        aria-label="Scroll horizontally through admin portal screens"
      >
        <div
          ref={stickyRef}
          className={`sticky ${stickyTopClassName} flex min-h-[min(72vh,640px)] flex-col justify-center overflow-hidden py-2`}
        >
          <div
            ref={trackRef}
            className="flex w-max items-start gap-4 sm:gap-5 md:gap-6 will-change-transform"
          >
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="w-[82vw] shrink-0 sm:w-[72vw] md:w-[min(62vw,720px)] lg:w-[min(56vw,780px)]"
              >
                {renderImage(image, index, () => onImageClick(index))}
                <SlideCaption caption={image.caption} className={captionClassName} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
