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
import CircularTooltip from "@/components/CircularTooltip";
import {
  MagnifyingGlass,
  Palette,
  Lightbulb,
  Code,
  ChartLine,
  Robot,
  Icon,
} from "@phosphor-icons/react";

// Custom Floating Label Input Component
function FloatingLabelInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
  isTextarea = false,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(e.target.value.length > 0);
  };

  const isActive = isFocused || hasValue;

  if (isTextarea) {
    return (
      <div className="relative">
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200 resize-none"
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
              : "top-3 text-base text-neutral-40"
          }`}
        >
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
          isActive
            ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
            : "top-1/2 -translate-y-1/2 text-base text-neutral-40"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

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

  // Number Counter Animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const finalValue = parseInt(target.getAttribute("data-value") || "0");

          // Reset to 0 and set opacity to 0
          target.textContent = "0";
          target.style.opacity = "0";

          // Animate counting up and fade in
          let currentValue = 0;
          const increment = finalValue / 24; // 24 steps over 0.8 seconds
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              currentValue = finalValue;
              clearInterval(timer);
            }
            target.textContent = Math.floor(currentValue).toString();
            // Fade in opacity from 0 to 1 over the same duration
            const progress = currentValue / finalValue;
            target.style.opacity = progress.toString();
          }, 33); // ~30fps
        }
      });
    }, observerOptions);

    // Observe all number elements
    scrambleRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
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
                primary: "rgba(255, 181, 113, 0.6)", // Orange from about page
                secondary: "rgba(255, 140, 244, 0.4)", // Pink/magenta variant
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-home-orange)] bg-clip-text text-transparent font-hanken">
                    UX/UI Designer{" "}
                  </span>
                  <span className="text-[#ffb571] font-hanken">&</span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Low-code Developer
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-loose tracking-wide max-w-[40rem]">
                    — with an{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">eye</span>{" "}
                    for{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      detail
                    </span>
                    , a{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">heart</span>{" "}
                    for the{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      user
                    </span>
                    , and a{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">drive</span>
                    for the{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      business
                    </span>
                    .
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
                        <span>View Case Studies</span>
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
                {/* About - Standing section */}
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
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
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
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                      <span className="animate-pulse-subtle">⚡</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <MagnifyingGlass
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Interviews
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Testing
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Data/metrics analysis
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Workshops
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Palette
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Prototyping
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Component systems
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Design systems
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Lightbulb
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  User flows
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Information architecture
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Interaction design
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Wireframing
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  User testing
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Flowcharts
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Code
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Cursor AI
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Lovable
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Frontend
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Firebase
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <ChartLine
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Strategy
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Roadmapping
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Analytics
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Growth
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group/card relative">
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <RadialGradientBorder
                          variant="dash"
                          shineColor={["#00FF9D", "#10b981"]}
                          borderWidth={4}
                          duration={3}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative bg-neutral-90/50 backdrop-blur-sm rounded-2xl p-6 h-52 cursor-pointer transition-all duration-300 group-hover/card:bg-transparent">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col items-center text-center mb-4">
                            <div className="relative mb-3">
                              <Robot
                                size={40}
                                weight="fill"
                                className="text-neutral-60 group-hover/card:text-neutral-3 group-hover/card:scale-110 transition-all duration-300"
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
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Updated workflows
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  AI integration
                                </li>
                              </ul>
                              <ul className="space-y-1.5">
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
                                  Efficiency tools
                                </li>
                                <li className="text-neutral-40 text-sm text-left font-bold flex items-center gap-2 group-hover/card:text-neutral-3 transition-colors duration-200">
                                  <div className="w-2 h-2 bg-neutral-60 group-hover/card:bg-[#00FF9D] rounded-full flex-shrink-0 transition-colors duration-200"></div>
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
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
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

                {/* Currently Working On - Medium section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-start hover:border-neutral-80/60 transition-all duration-500 relative group row-span-2 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
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
                      Currently working on
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                      <span className="animate-pulse-subtle">🚀</span>
                    </span>
                  </div>

                  <div className="flex-1 relative rounded-2xl overflow-hidden bg-neutral-80/30 border border-neutral-100/20">
                    {/* Large Project Image/GIF */}
                    <img
                      src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center"
                      alt="Current Project Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Project Title and Tech Stack Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-white">
                        AI-Powered Design System
                      </h3>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#00FF9D]/20 text-[#00FF9D] text-xs rounded-full font-medium backdrop-blur-sm">
                          React
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                          TypeScript
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                          OpenAI API
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                          Figma
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                          Tailwind CSS
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
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects-orange)] bg-clip-text text-transparent font-hanken pb-2">
                  Some of my previous projects
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ffb571] to-transparent opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-12">
                {/* First Work Box */}
                <CircularTooltip>
                  <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
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
                        <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                          UX/UI Design
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                        Noted
                      </h3>
                      <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                        A comprehensive note-taking app with intuitive design
                        and seamless user experience.
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CircularTooltip>

                {/* Second Work Box */}
                <CircularTooltip>
                  <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
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
                        <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                          AI/ML
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                        Zmartrest AI
                      </h3>
                      <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                        AI-powered platform for intelligent decision making and
                        data analysis.
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CircularTooltip>

                {/* Third Work Box */}
                <CircularTooltip>
                  <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
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
                        <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                          Mobile App
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                        Fokus
                      </h3>
                      <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                        Productivity app designed to help users stay focused and
                        achieve their goals.
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CircularTooltip>

                {/* Fourth Work Box */}
                <CircularTooltip>
                  <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-[#ffb571]/60">
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
                        <span className="inline-block px-4 py-2 bg-[#ffb571]/20 text-[#ffb571] text-base font-medium rounded-full font-hanken">
                          SaaS Platform
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-[#ffb571] transition-colors font-hanken">
                        Emplojd
                      </h3>
                      <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                        Comprehensive HR platform for modern workplace
                        management and employee engagement.
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-[#ffb571]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CircularTooltip>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Contact Form - Redesigned */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-5xl font-bold text-neutral-0 mb-4 font-hanken">
                      Let's have a chat 💬
                    </h3>
                    <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                      I'm always excited to discuss new opportunities and
                      possibilities.
                    </p>
                  </div>

                  <div className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-3xl p-6">
                    <form
                      action="mailto:hello@rasmusmattsson.com?subject=Project Inquiry from Portfolio"
                      method="post"
                      encType="text/plain"
                      className="space-y-6"
                    >
                      <FloatingLabelInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                      />

                      <FloatingLabelInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                      />

                      <FloatingLabelInput
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        required
                      />

                      <FloatingLabelInput
                        id="message"
                        name="message"
                        placeholder="Message"
                        required
                        rows={4}
                        isTextarea
                      />

                      <button
                        type="submit"
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        Send message
                      </button>
                    </form>
                  </div>
                </div>

                {/* Contact Information - Redesigned */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-5xl font-bold text-neutral-50 mb-4 font-hanken">
                      Get in touch
                    </h3>
                    <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                      Prefer to reach out directly? Here are the best ways to
                      get in touch with me.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:border-purple-500/20 transition-all duration-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-0 font-semibold mb-1 text-lg">
                          Email
                        </h4>
                        <a
                          href="mailto:hello@rasmusmattsson.com"
                          className={`transition-colors duration-200 text-base cursor-pointer hover:opacity-90 ${
                            emailCopied
                              ? "text-green-500"
                              : "text-neutral-60 hover:text-neutral-0"
                          }`}
                        >
                          hello@rasmusmattsson.com
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopyEmail}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            emailCopied
                              ? "bg-green-500 text-white shadow-lg"
                              : "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 hover:shadow-lg"
                          }`}
                        >
                          {emailCopied ? "Copied!" : "Copy email"}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 rounded-xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:border-purple-500/20 transition-all duration-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-0 font-semibold mb-1 text-lg">
                          LinkedIn
                        </h4>
                        <a
                          href="https://linkedin.com/in/rasmus-mattsson"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-base"
                        >
                          linkedin.com/in/rasmus-mattsson
                        </a>
                      </div>
                    </div>
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
