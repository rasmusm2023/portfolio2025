"use client";

import { useEffect, useRef, useState } from "react";
import { HandTap } from "@phosphor-icons/react";

const FLOW_BACKGROUNDS = [
  "/assets/case-study-assets/emplojd/Emplojd-Results-Cover-Letter-Generation-Flow.svg",
  "/assets/case-study-assets/emplojd/Emplojd-Results-Saved-Cover-Letters-Flow.svg",
  "/assets/case-study-assets/emplojd/Emplojd-Results-User-Profile-States.svg",
];

const FLOW_VIDEOS = [
  "/assets/case-study-assets/emplojd/Emplojd_Results_Cover_Letter_Generation_Flow.webm",
  "/assets/case-study-assets/emplojd/Emplojd_Results_Saved_Cover_Letters_Flow.webm",
  "/assets/case-study-assets/emplojd/Emplojd_Results_User_Profile_States.webm",
];

const PROTOTYPE_TITLES = [
  "Cover Letter Generation Flow",
  "Saved Cover Letters Flow",
  "User Profile States",
];

export default function EmplojdFlowPrototypeShowcase() {
  const [currentPrototypeIndex, setCurrentPrototypeIndex] = useState(0);
  const [prototypePositions, setPrototypePositions] = useState([0, 1, 2]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isPrototypeSectionVisible, setIsPrototypeSectionVisible] =
    useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePrototypeClick = (clickedIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (clickedIndex === leftPosition) {
      setIsVideoPlaying(!isVideoPlaying);
    } else if (clickedIndex === middlePosition) {
      setPrototypePositions([middlePosition, rightPosition, leftPosition]);
      setCurrentPrototypeIndex(middlePosition);
    } else if (clickedIndex === rightPosition) {
      setPrototypePositions([rightPosition, leftPosition, middlePosition]);
      setCurrentPrototypeIndex(rightPosition);
    }
  };

  const getPrototypePosition = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "left-1/2 transform -translate-x-[120px] sm:-translate-x-[140px] md:-translate-x-[160px] lg:-translate-x-[400px] xl:-translate-x-[400px] -translate-y-6 z-20";
    }
    if (prototypeIndex === middlePosition) {
      return "left-1/2 transform -translate-x-1/2 translate-y-6 z-10";
    }
    return "left-1/2 transform translate-x-[20px] sm:translate-x-[30px] md:translate-x-[40px] lg:translate-x-[52px] xl:translate-x-[52px] translate-y-12 z-[5]";
  };

  const getPrototypeStyling = (prototypeIndex: number) => {
    const leftPosition = prototypePositions[0];
    const middlePosition = prototypePositions[1];
    const rightPosition = prototypePositions[2];

    if (prototypeIndex === leftPosition) {
      return "border-violet-400 shadow-2xl shadow-violet-500/25";
    }
    if (prototypeIndex === middlePosition) {
      return "border-neutral-60/60 shadow-lg shadow-neutral-100/10 blur-sm dark:border-neutral-50/30 dark:shadow-black/20";
    }
    return "border-neutral-60/60 shadow-lg shadow-neutral-100/10 blur-sm dark:border-neutral-50/30 dark:shadow-black/20";
  };

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (isVideoPlaying && isPrototypeSectionVisible) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [isVideoPlaying, isPrototypeSectionVisible]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPrototypeSectionVisible(true);
            setIsVideoPlaying(true);
            videoRefs.current.forEach((video) => {
              if (video) void video.play().catch(() => undefined);
            });
          } else {
            setIsPrototypeSectionVisible(false);
            setIsVideoPlaying(false);
            videoRefs.current.forEach((video) => {
              if (video) video.pause();
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="emplojd-flow-prototypes"
      className="my-8 md:my-10"
      aria-label="Interactive flow prototype showcase"
    >
      <div className="mb-6 sm:hidden">
        <div className="flex items-center justify-center gap-2 text-neutral-60 dark:text-neutral-40 text-sm">
          <HandTap className="w-4 h-4" aria-hidden />
          <span>Click prototypes to pause or swap</span>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0 mb-1">
            {PROTOTYPE_TITLES[currentPrototypeIndex]}
          </h4>
          <p className="text-sm text-neutral-60 dark:text-neutral-40">
            {currentPrototypeIndex + 1} of {PROTOTYPE_TITLES.length}
          </p>
        </div>
      </div>

      <div className="w-full h-[500px] sm:h-[500px] md:h-[600px] lg:h-[800px] xl:h-[987px] relative overflow-hidden rounded-xl border border-neutral-10 dark:border-neutral-80 bg-neutral-3 dark:bg-neutral-90/25">
        <div className="absolute inset-0 w-full h-full hidden sm:block">
          {FLOW_BACKGROUNDS.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentPrototypeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={PROTOTYPE_TITLES[index]}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {FLOW_VIDEOS.map((src, index) => {
            const isActive = prototypePositions[0] === index;

            return (
              <div
                key={src}
                className={`absolute transition-all duration-500 cursor-pointer prototype-box ${getPrototypePosition(
                  index
                )}`}
                onClick={() => handlePrototypeClick(index)}
                data-tooltip={
                  isActive ? "prototype-active" : "prototype-inactive"
                }
                data-video-state={isVideoPlaying ? "playing" : "paused"}
              >
                <div
                  className={`w-[180px] sm:w-[200px] md:w-[220px] lg:w-[320px] xl:w-[320px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[710px] xl:h-[710px] bg-neutral-90 dark:bg-neutral-100 rounded-[20px] sm:rounded-[22px] md:rounded-[24px] lg:rounded-[32px] border-2 transition-all duration-500 ${getPrototypeStyling(
                    index
                  )}`}
                >
                  <div className="w-full h-full bg-neutral-80 dark:bg-neutral-90 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] overflow-hidden relative">
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay={isVideoPlaying && isPrototypeSectionVisible}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    >
                      <source src={src} type="video/webm" />
                    </video>
                    {!isActive ? (
                      <div className="absolute inset-0 bg-black/50 rounded-[18px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[30px] pointer-events-none" />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:block text-center mt-6">
        <h4 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0 mb-1">
          {PROTOTYPE_TITLES[currentPrototypeIndex]}
        </h4>
        <p className="text-sm text-neutral-60 dark:text-neutral-40">
          {currentPrototypeIndex + 1} of {PROTOTYPE_TITLES.length}
        </p>
      </div>
    </section>
  );
}
