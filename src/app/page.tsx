"use client";

import VantaBackground from "@/components/VantaBackground";
import AnimatedBlob from "@/components/AnimatedBlob";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import TraitsCarousel from "@/components/TraitsCarousel";
import SpotifyIcon from "@/logos/Symbol.svg";
import TheEqualizerCover from "@/films/The-Equalizer.png";
import TheEqualizer2Cover from "@/films/The-Equalizer-2.png";
import TheBeekeeperCover from "@/films/the-beekeeper.png";
import TheDarkKnightCover from "@/films/the-dark-knight.png";
import RasmusImage from "@/images/rasmus.jpg";
import HjarnstarkCover from "@/books/hjarnstark-anders-hansen.jpg";
import MikaelPersbrandtCover from "@/books/mikael-persbrandt-book.jpg";
import { gradients, colors } from "@/styles/colors";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedBorder from "@/components/AnimatedBorder";
import RadialGradientBorder from "@/components/RadialGradientBorder";
import {
  MagnifyingGlass,
  Palette,
  Lightbulb,
  Code,
  ChartLine,
  Robot,
  Icon,
} from "@phosphor-icons/react";

// Live Clock Component
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Stockholm",
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

// Live Date Component
function LiveDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Europe/Stockholm",
      });
      setDate(dateString);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{date}</span>;
}

// Film Card Component
function FilmCard({
  title,
  year,
  director,
  coverImage,
  imdbUrl,
}: {
  title: string;
  year: string;
  director: string;
  coverImage?: any;
  imdbUrl?: string;
}) {
  return (
    <a
      href={imdbUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-32 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200 cursor-pointer group"
    >
      <div className="relative w-full h-full">
        {coverImage ? (
          <>
            <Image
              src={coverImage.src}
              alt={`${title} (${year})`}
              className="w-full h-full object-cover"
              width={128}
              height={192}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </>
        ) : (
          <div className="w-full h-full bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-4">
            <div className="space-y-2">
              <h3 className="text-neutral-0 font-semibold text-sm">{title}</h3>
              <div className="space-y-1">
                <p className="text-neutral-60 text-xs">{year}</p>
                <p className="text-neutral-60 text-xs">Dir. {director}</p>
              </div>
            </div>
          </div>
        )}
        {coverImage && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <p className="text-white/80 text-xs">{year}</p>
          </div>
        )}
      </div>
    </a>
  );
}

// Book Card Component
function BookCard({
  title,
  author,
  coverImage,
  amazonUrl,
  currentPage,
  totalPages,
}: {
  title: string;
  author: string;
  coverImage?: any;
  amazonUrl?: string;
  currentPage?: number;
  totalPages?: number;
}) {
  const progressPercentage =
    currentPage && totalPages ? (currentPage / totalPages) * 100 : 0;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200 cursor-pointer group bg-neutral-80/50 backdrop-blur-sm"
    >
      <div className="flex w-full h-full">
        {/* Book Cover */}
        <div className="w-32 h-48 rounded-l-2xl overflow-hidden">
          {coverImage ? (
            <>
              <Image
                src={coverImage.src}
                alt={`${title} by ${author}`}
                className="w-full h-full object-cover"
                width={128}
                height={192}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </>
          ) : (
            <div className="w-full h-full bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-l-2xl p-4">
              <div className="space-y-2">
                <h3 className="text-neutral-0 font-semibold text-sm">
                  {title}
                </h3>
                <div className="space-y-1">
                  <p className="text-neutral-60 text-xs">by {author}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-neutral-0 font-semibold text-sm leading-tight">
              {title}
            </h3>
            <p className="text-neutral-60 text-xs">by {author}</p>
          </div>

          {/* Current Page */}
          {currentPage && totalPages && (
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-neutral-60 text-xs font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-100/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <div className="text-right">
                <span className="text-neutral-60 text-xs font-medium">
                  {Math.round(progressPercentage)}% complete
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// Trait Card Component
function TraitCard({
  title,
  description,
  emoji,
}: {
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <div className="flex-shrink-0 w-64 bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-neutral-0 font-semibold text-sm">{title}</h3>
        </div>
        <p className="text-neutral-60 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Skill Card Component
function SkillCard({
  title,
  icon: IconComponent,
  skills,
}: {
  title: string;
  icon: Icon;
  skills: string[];
}) {
  return (
    <AnimatedBorder className="flex-shrink-0 h-52 cursor-pointer hover:scale-105 transition-transform duration-300 group">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <IconComponent
              size={40}
              weight="fill"
              className="text-[#00FF9D] group-hover:scale-110 transition-transform duration-300"
            />
            {/* Subtle glow behind icon */}
            <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-neutral-0 font-bold text-base tracking-wide">
            {title}
          </h3>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <ul className="space-y-1.5">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="text-neutral-80 text-xs text-left font-medium flex items-center gap-2 group-hover:text-neutral-60 transition-colors duration-200"
              >
                <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedBorder>
  );
}

// Skill Card with Gradient Border Component
function SkillCardWithGradientBorder({
  title,
  icon: IconComponent,
  skills,
  borderColors,
  duration = 3,
}: {
  title: string;
  icon: Icon;
  skills: string[];
  borderColors: string[];
  duration?: number;
}) {
  return (
    <RadialGradientBorder
      variant="dash"
      shineColor={borderColors}
      borderWidth={2}
      duration={duration}
      size="md"
      className="flex-shrink-0 h-52 cursor-pointer transition-all duration-300 group"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <IconComponent
              size={40}
              weight="fill"
              className="text-[#00FF9D] group-hover:scale-110 transition-transform duration-300"
            />
            {/* Subtle glow behind icon */}
            <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-neutral-10 font-bold text-lg tracking-wide">
            {title}
          </h3>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Left column */}
            <ul className="space-y-1.5">
              {skills
                .slice(0, Math.ceil(skills.length / 2))
                .map((skill, index) => (
                  <li
                    key={index}
                    className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover:text-neutral-20 transition-colors duration-200"
                  >
                    <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                    {skill}
                  </li>
                ))}
            </ul>
            {/* Right column */}
            <ul className="space-y-1.5">
              {skills
                .slice(Math.ceil(skills.length / 2))
                .map((skill, index) => (
                  <li
                    key={index + Math.ceil(skills.length / 2)}
                    className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover:text-neutral-20 transition-colors duration-200"
                  >
                    <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                    {skill}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </RadialGradientBorder>
  );
}

// Favorite Songs Component
function FavoriteSongs() {
  const songs = [
    {
      title: "Sapphire",
      artist: "Ed Sheeran",
      albumCover:
        "https://upload.wikimedia.org/wikipedia/en/4/40/Ed_Sheeran_-_Sapphire.png",
      spotifyUrl:
        "https://open.spotify.com/track/4Q0qVhFQa7j6jRKzo3HDmP?si=a1ad3bd57d994472ttps://open.spotify.com/track/3z8h0TU7ReDPLIbEnYhWZb",
    },
    {
      title: "whoa (mind in awe) - Remix",
      artist: "Juice WRLD, XXXTENTACION",
      albumCover:
        "https://upload.wikimedia.org/wikipedia/en/8/8c/Whoa_%28Mind_in_Awe%29_cover.png",
      spotifyUrl:
        "https://open.spotify.com/track/4lkpfY2wfmHj958Fr32kHS?si=a5abdd08a45f4c7f",
    },
    {
      title: "MO UP FRONT",
      artist: "NLE Choppa",
      albumCover: "/music/mo-up-front.jpg",
      spotifyUrl:
        "https://open.spotify.com/track/0wZ0RnMZFR97fq1Yq8Ee57?si=260919d34b1144b0",
    },
  ];

  return (
    <>
      {songs.map((song, index) => (
        <div key={index} className="flex-shrink-0">
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer group/song"
          >
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-neutral-80 border-2 border-transparent group-hover/song:border-[#00FF9D] transition-colors duration-200 relative">
              <Image
                src={song.albumCover}
                alt={`${song.title} by ${song.artist}`}
                className="w-full h-full object-cover"
                width={112}
                height={112}
              />
              {/* Radial green shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover/song:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(0,255,157,0.4) 0%, rgba(0,255,157,0.1) 40%, transparent 80%)",
                }}
              ></div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-neutral-0 text-sm font-medium truncate max-w-28">
                {song.title}
              </p>
              <p className="text-neutral-60 text-sm truncate max-w-28">
                {song.artist}
              </p>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const scrambleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP Scramble Effect
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        // Initialize scramble effect for each number
        scrambleRefs.current.forEach((ref, index) => {
          if (ref) {
            const originalText = ref.getAttribute("data-value") || "";

            // Set initial state
            gsap.set(ref, {
              opacity: 0,
              scale: 0.8,
              text: "0+",
            });

            // Create scroll trigger for each number
            ScrollTrigger.create({
              trigger: ref,
              start: "top 80%",
              onEnter: () => {
                // Fade in animation
                gsap.to(ref, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                });

                // Simple fade in animation
                gsap.fromTo(
                  ref,
                  {
                    opacity: 0,
                    scale: 0.8,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                  }
                );
              },
            });
          }
        });
      } catch (error) {
        console.log("GSAP not available for scramble effect");
      }
    };

    loadGSAP();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@rasmusmattsson.com");
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  // Calculate scale for each box based on hover state
  const getBoxScale = (boxId: string) => {
    if (!hoveredBox) return 1; // No hover - all boxes normal size
    if (hoveredBox === boxId) return 1.02; // Hovered box grows (reduced from 1.05)
    return 1; // Other boxes stay normal size
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="container mx-auto px-8">
          {/* Introduction Section */}
          <section id="home" className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(0, 255, 157, 0.6)", // Neon green from gradient-hero-home-accent
                secondary: "rgba(153, 255, 217, 0.4)", // Lighter green variant
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <div className="group inline-flex items-stretch gap-0 mb-8 rounded-full bg-neutral-80 backdrop-blur-sm border-2 border-neutral-100/10 hover:border-transparent overflow-hidden transition-all duration-500 relative">
                  {/* Gradient border on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "var(--gradient-hero-home-accent)",
                      padding: "2px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-neutral-80 backdrop-blur-sm"></div>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-2 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/50 blur-sm rounded-full animate-[pulse_1.5s_ease-in-out_infinite] scale-150"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                    </div>
                    <span className="text-neutral-30 text-base font-medium tracking-wider">
                      Currently exploring opportunities
                    </span>
                  </div>
                  <div className="w-0 group-hover:w-32 overflow-hidden transition-all duration-500 ease-out relative z-10">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00ff9d] to-accent-2-100 text-neutral-10 font-medium text-sm hover:from-[#00ff9d]/90 hover:to-accent-2-100/90 transition-all duration-500 cursor-pointer h-full whitespace-nowrap rounded-r-full -mr-1"
                    >
                      <span>Message me</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-home-accent)] bg-clip-text text-transparent font-hanken">
                    UX/UI Designer{" "}
                  </span>
                  <span className="text-[#00FF9D] font-hanken">&</span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Low-code Developer
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[40rem]">
                    — with an eye for detail, a heart for the user, and a drive
                    for the business.
                  </p>
                  <div className="flex justify-center mt-8">
                    <a href="/work" className="shimmer-button-green">
                      <span className="text">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        <span>View My Work</span>
                      </span>
                      <span className="shimmer"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Box Layout */}
          <section className="py-16 px-24">
            <div className="text-left w-full max-w-[1600px]">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[320px]">
                {/* About Me - Standing section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("about-me")})` }}
                  onMouseEnter={() => setHoveredBox("about-me")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-start gap-4 mb-6">
                    {/* Profile image with animated border */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={RasmusImage.src}
                        alt="Rasmus Mattsson"
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: "center 30%" }}
                        width={56}
                        height={56}
                      />
                      {/* Animated border - positioned outside the image */}
                      <svg
                        className="absolute -inset-0.5 w-17 h-17"
                        viewBox="0 0 68 68"
                        style={{ transform: "rotate(-90deg)" }}
                      >
                        <defs>
                          <linearGradient
                            id="borderGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#00FF9D"
                              stopOpacity="1"
                            />
                            <stop
                              offset="30%"
                              stopColor="#00FF9D"
                              stopOpacity="0.7"
                            />
                            <stop
                              offset="60%"
                              stopColor="#00FF9D"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor="#00FF9D"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="34"
                          cy="34"
                          r="32"
                          fill="none"
                          stroke="url(#borderGradient)"
                          strokeWidth="4"
                          strokeDasharray="201"
                          strokeDashoffset="201"
                          style={{
                            animation: "spin-border 5s linear infinite",
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-neutral-10 text-base font-bold leading-relaxed">
                      👋 Hi, I'm Rasmus Mattsson — a UX/UI Designer and Low-code
                      Developer based in Stockholm, Sweden. I love creating
                      digital experiences that bridge creativity with
                      technology.
                    </p>
                  </div>
                </div>

                {/* I work in - Large section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl flex flex-col justify-center overflow-hidden relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("toolkit")})` }}
                  onMouseEnter={() => setHoveredBox("toolkit")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-2 p-8">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                        My toolkit include
                      </h2>
                      <p className="text-lg text-neutral-50 font-hanken">
                        but is not limited to:
                      </p>
                    </div>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="animate-pulse-subtle">🛠️</span>
                    </span>
                  </div>

                  {/* GSAP-powered Infinite Scroll Banner */}
                  <InfiniteScrollBanner />
                </div>

                {/* Expertise with Dotted Background - Large section */}
                <div
                  className="md:col-span-8 lg:col-span-8 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("skills-dotted")})`,
                  }}
                  onMouseEnter={() => setHoveredBox("skills-dotted")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-16">
                    <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                      Expertise{" "}
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="animate-pulse-subtle">⚡</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <MagnifyingGlass
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                              UX Research
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Interviews
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Testing
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Data/metrics analysis
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Workshops
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Palette
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                              UI Design
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Prototyping
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Component systems
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Design systems
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Lightbulb
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                              UX Design
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  User flows
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Information architecture
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Interaction design
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Wireframing
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  User testing
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Flowcharts
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Code
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                              Development
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Cursor AI
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Lovable
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Frontend
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Firebase
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <ChartLine
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-black text-xl tracking-wide transition-colors duration-200">
                              Product
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Strategy
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Roadmapping
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Analytics
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Growth
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute -inset-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        >
                          <div className="w-full h-full"></div>
                        </RadialGradientBorder>
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 z-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Robot
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-[#00FF9D] group-hover/card:scale-110 transition-all duration-300"
                              />
                              {/* Glow effect only on card hover */}
                              <div className="absolute inset-0 bg-[#00FF9D]/20 blur-md rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-neutral-30 group-hover/card:text-neutral-10 font-bold text-xl tracking-wide transition-colors duration-200">
                              AI & Automation
                            </h3>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-x-4">
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Updated workflows
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  AI integration
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Efficiency tools
                                </li>
                                <li className="text-neutral-40 text-xs text-left font-medium flex items-center gap-2 group-hover/card:text-neutral-20 transition-colors duration-200">
                                  <div className="w-1 h-1 bg-[#00FF9D] rounded-full flex-shrink-0"></div>
                                  Future-ready
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("experience")})` }}
                  onMouseEnter={() => setHoveredBox("experience")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                        Experience
                      </h2>
                      <p className="text-lg text-neutral-50 font-hanken">
                        employments & studies
                      </p>
                    </div>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="animate-pulse-subtle">💼</span>
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                          <span
                            ref={(el) => {
                              scrambleRefs.current[0] = el;
                            }}
                            className="text-neutral-0 text-4xl font-bold"
                            data-value="5"
                          >
                            5
                          </span>
                        </div>
                        <span className="text-neutral-40 text-lg">
                          years within UX/UI Design
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                          <span
                            ref={(el) => {
                              scrambleRefs.current[1] = el;
                            }}
                            className="text-neutral-0 text-4xl font-bold"
                            data-value="4"
                          >
                            4
                          </span>
                        </div>
                        <span className="text-neutral-40 text-lg">
                          years within E-Commerce
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                          <span
                            ref={(el) => {
                              scrambleRefs.current[2] = el;
                            }}
                            className="text-neutral-0 text-4xl font-bold"
                            data-value="2"
                          >
                            2
                          </span>
                        </div>
                        <span className="text-neutral-40 text-lg">
                          years of Frontend Development
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                          <span
                            ref={(el) => {
                              scrambleRefs.current[3] = el;
                            }}
                            className="text-neutral-0 text-4xl font-bold"
                            data-value="20"
                          >
                            20
                          </span>
                        </div>
                        <span className="text-neutral-40 text-lg">
                          Completed projects
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/30 rounded-xl px-4 py-2 w-20 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                          <span
                            ref={(el) => {
                              scrambleRefs.current[4] = el;
                            }}
                            className="text-neutral-0 text-4xl font-bold"
                            data-value="1"
                          >
                            1
                          </span>
                        </div>
                        <span className="text-neutral-40 text-lg">
                          year of SoMe & SEO work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Approach - Medium section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("approach")})` }}
                  onMouseEnter={() => setHoveredBox("approach")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                      My Process
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="animate-pulse-subtle">🔍</span>
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    {/* Process Philosophy */}
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#00FF9D]/10 to-accent-2-100/10 border border-[#00FF9D]/20">
                      <p className="text-neutral-30 text-lg font-medium text-center leading-relaxed">
                        Human-centered. AI-empowered. Always adaptable &
                        reconsidered.
                      </p>
                    </div>

                    {/* Design Process Steps */}
                    <div className="space-y-4">
                      {/* Step 1: Discover */}
                      <div className="flex items-start gap-3 group/step">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D] to-accent-2-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-neutral-100 text-base font-bold drop-shadow-sm">
                            1
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-10 font-semibold text-base mb-3 group-hover/step:text-[#00FF9D] transition-colors duration-200">
                            Discover & Understand
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-sm rounded-full">
                              AI Research Analysis
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              User Interviews
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Research Tools
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              User Needs
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Business Goals
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Market Context
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Deep Search
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Ideate */}
                      <div className="flex items-start gap-3 group/step">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D] to-accent-2-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-neutral-100 text-base font-bold drop-shadow-sm">
                            2
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-10 font-semibold text-base mb-3 group-hover/step:text-[#00FF9D] transition-colors duration-200">
                            Ideate & Concept
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-sm rounded-full">
                              AI Ideation
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Figma
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Google Stitch
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Wireframes
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Sketching
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Prototyping
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Alternatives
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Build */}
                      <div className="flex items-start gap-3 group/step">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D] to-accent-2-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-neutral-100 text-base font-bold drop-shadow-sm">
                            3
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-10 font-semibold text-base mb-3 group-hover/step:text-[#00FF9D] transition-colors duration-200">
                            Build & Test
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-sm rounded-full">
                              Cursor AI
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Next.js
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Component Libraries
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Accessibility
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Performance
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Testing
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Systems */}
                      <div className="flex items-start gap-3 group/step">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D] to-accent-2-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-neutral-100 text-base font-bold drop-shadow-sm">
                            4
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-10 font-semibold text-base mb-3 group-hover/step:text-[#00FF9D] transition-colors duration-200">
                            Systems & Scale
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-sm rounded-full">
                              AI Color Systems
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Design Systems
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Content Patterns
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Color Tokens
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Scalable Content
                            </span>
                            <span className="px-2 py-1 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                              Consistency
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Links - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-neutral-90/50 to-neutral-80/30 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#00FF9D]/60 hover:from-neutral-90/60 hover:to-neutral-80/40 transition-all duration-300 relative group"
                  style={{ transform: `scale(${getBoxScale("work-link")})` }}
                  onMouseEnter={() => setHoveredBox("work-link")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                        View My Work
                      </h2>
                      <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="animate-pulse-subtle">📁</span>
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                      <a
                        href="/work"
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#00FF9D]/20 to-accent-2-100/20 backdrop-blur-sm border border-[#00FF9D]/30 hover:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all duration-200 group/work"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#00FF9D] to-accent-2-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm">📋</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-neutral-10 font-semibold text-base">
                              Case Studies
                            </h3>
                            <p className="text-neutral-40 text-sm">
                              Full project cases & detailed processes
                            </p>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-neutral-60 group-hover/work:text-[#00FF9D] group-hover/work:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>

                      <a
                        href="/design-gallery"
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#ED7DFF]/20 to-[#a855f7]/20 backdrop-blur-sm border border-[#ED7DFF]/30 hover:shadow-[0_0_10px_rgba(237,125,255,0.2)] transition-all duration-200 group/gallery"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#ED7DFF] to-[#a855f7] rounded-lg flex items-center justify-center">
                            <span className="text-sm">🎨</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-neutral-10 font-semibold text-base">
                              Design Gallery
                            </h3>
                            <p className="text-neutral-40 text-sm">
                              Smaller projects & design explorations
                            </p>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-neutral-60 group-hover/gallery:text-[#ED7DFF] group-hover/gallery:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Currently Working On - Standing section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("current-work")})` }}
                  onMouseEnter={() => setHoveredBox("current-work")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-30 font-hanken">
                      Currently Working On
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="animate-pulse-subtle">🚀</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden bg-neutral-80 border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200">
                        <Image
                          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop&crop=center"
                          alt="Project Cover"
                          className="w-full h-full object-cover"
                          width={192}
                          height={192}
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-bold text-neutral-40">
                        Portfolio Website 2025
                      </h3>
                      <p className="text-neutral-60 text-base leading-relaxed">
                        A modern, interactive portfolio showcasing my design and
                        development skills. Built with Next.js, TypeScript, and
                        Tailwind CSS. Features smooth animations, responsive
                        design, and a unique bento box layout for the about
                        page.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                          Next.js{" "}
                        </span>
                        <span className="px-4 py-2 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                          TypeScript{" "}
                        </span>
                        <span className="px-4 py-2 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                          Tailwind CSS{" "}
                        </span>
                        <span className="px-4 py-2 bg-neutral-80/50 text-neutral-40 text-sm rounded-full">
                          GSAP{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section id="projects-section" className="py-48">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="relative w-fit mx-auto mb-16">
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects)] bg-clip-text text-transparent font-hanken pb-2">
                  Some of my previous projects
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ED7DFF] to-transparent opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-12">
                {/* First Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#10b981]/60">
                  {/* Project background image */}
                  <Image
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center"
                    alt="Noted App Interface"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1200}
                    height={900}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-base font-medium rounded-full font-hanken">
                        UX/UI Design
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#10b981] transition-colors font-hanken">
                      Noted
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      A comprehensive note-taking app with intuitive design and
                      seamless user experience.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Second Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#10b981]/60">
                  {/* Project background image */}
                  <Image
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
                    alt="Zmartrest AI Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1200}
                    height={900}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-base font-medium rounded-full font-hanken">
                        AI/ML
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#10b981] transition-colors font-hanken">
                      Zmartrest AI
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      AI-powered platform for intelligent decision making and
                      data analysis.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Third Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#10b981]/60">
                  {/* Project background image */}
                  <Image
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
                    alt="Fokus Mobile App"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1200}
                    height={900}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-base font-medium rounded-full font-hanken">
                        Mobile App
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#10b981] transition-colors font-hanken">
                      Fokus
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      Productivity app designed to help users stay focused and
                      achieve their goals.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Fourth Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#10b981]/60">
                  {/* Project background image */}
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
                    alt="Emplojd HR Platform"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1200}
                    height={900}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-base font-medium rounded-full font-hanken">
                        SaaS Platform
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#10b981] transition-colors font-hanken">
                      Emplojd
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      Comprehensive HR platform for modern workplace management
                      and employee engagement.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-48">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="relative w-fit mx-auto mb-16">
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-hero-accent)] bg-clip-text text-transparent font-hanken pb-2">
                  Sounds interesting?
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ED7DFF] to-transparent opacity-50" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Contact Form */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-6">
                      Let's work together
                    </h3>
                    <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide">
                      Have a project in mind? I'd love to hear about it. Send me
                      a message and let's discuss how we can bring your ideas to
                      life.
                    </p>
                  </div>

                  <form
                    action="mailto:hello@rasmusmattsson.com?subject=Project Inquiry from Portfolio"
                    method="post"
                    encType="text/plain"
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#00FF9D] transition-colors duration-200"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#00FF9D] transition-colors duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#00FF9D] transition-colors duration-200 resize-none"
                          placeholder="Write your message..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#00FF9D] to-[#ED7DFF] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-6">
                      Contact Information
                    </h3>
                    <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide">
                      Prefer to reach out directly? Here are the best ways to
                      get in touch with me.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF9D] to-[#ED7DFF] flex items-center justify-center">
                        <span className="text-white font-bold">✉️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-0 font-semibold mb-1">
                          Email
                        </h4>
                        <a
                          href="mailto:hello@rasmusmattsson.com"
                          className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200"
                        >
                          hello@rasmusmattsson.com
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            window.open(
                              "mailto:hello@rasmusmattsson.com",
                              "_self"
                            )
                          }
                          className="px-3 py-1.5 bg-[#00FF9D] text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity duration-200"
                        >
                          Open
                        </button>
                        <button
                          onClick={handleCopyEmail}
                          className={`px-3 py-1.5 ${
                            emailCopied ? "bg-green-500" : "bg-neutral-80"
                          } text-neutral-0 text-xs font-medium rounded-md hover:bg-neutral-70 transition-colors duration-200`}
                        >
                          {emailCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF9D] to-[#ED7DFF] flex items-center justify-center">
                        <span className="text-white font-bold">💼</span>
                      </div>
                      <div>
                        <h4 className="text-neutral-0 font-semibold mb-1">
                          LinkedIn
                        </h4>
                        <a
                          href="https://linkedin.com/in/rasmus-mattsson"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200"
                        >
                          linkedin.com/in/rasmus-mattsson
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-[#00FF9D]/10 to-[#ED7DFF]/10 border border-neutral-100/10">
                    <h4 className="text-neutral-0 font-semibold mb-3">
                      Response Time
                    </h4>
                    <p className="text-neutral-60 text-sm">
                      I typically respond within 24 hours during business days.
                      For urgent matters, feel free to reach out on LinkedIn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
