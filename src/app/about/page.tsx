"use client";

import AnimatedBlob from "@/components/AnimatedBlob";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import TraitsCarousel from "@/components/TraitsCarousel";
import FilmsCarousel from "@/components/FilmsCarousel";
import CustomCursor from "@/components/CustomCursor";
import RadialGradientBorder from "@/components/RadialGradientBorder";

import TheEqualizerCover from "@/films/The-Equalizer.png";
import TheEqualizer2Cover from "@/films/The-Equalizer-2.png";
import TheBeekeeperCover from "@/films/the-beekeeper.png";
import TheDarkKnightCover from "@/films/the-dark-knight.png";
import ArrivalCover from "@/films/arrival.png";
import RasmusImage from "@/images/rasmus.jpg";
import HjarnstarkCover from "@/books/hjarnstark-anders-hansen.jpg";
import MikaelPersbrandtCover from "@/books/mikael-persbrandt-book.jpg";
import HideawayCover from "@/music/hideaway-hardwell-atmozfears.jpg";
import MoUpFrontCover from "@/music/mo-up-front.jpg";
import MellbystrandImage from "@/images/8bit/mellbystrand.jpg";
import NightOwlImage from "@/images/8bit/nightowl.jpg";
import AnimalsImage from "@/images/8bit/animals.jpg";
import Formula1Image from "@/images/8bit/formula1.jpg";
import StockholmImage from "@/images/8bit/stockholm.jpg";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Footer from "@/components/Footer";

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
      className="flex-shrink-0 w-32 h-44 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#8B5CF6] transition-colors duration-200 cursor-pointer group relative"
    >
      <div className="relative w-full h-full">
        {coverImage ? (
          <>
            <Image
              src={coverImage.src}
              alt={`${title} (${year})`}
              className="w-full h-full object-cover"
              width={128}
              height={176}
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pb-4">
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
  isFinished = false,
  isDark,
}: {
  title: string;
  author: string;
  coverImage?: any;
  amazonUrl?: string;
  currentPage?: number;
  totalPages?: number;
  isFinished?: boolean;
  isDark: boolean;
}) {
  const progressPercentage =
    currentPage && totalPages ? (currentPage / totalPages) * 100 : 0;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-80 h-40 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#8B5CF6] transition-colors duration-200 cursor-pointer group backdrop-blur-sm"
      style={{
        backgroundColor: isDark
          ? "rgba(35, 35, 35, 0.5)"
          : "rgba(255, 255, 255, 0.95)",
      }}
    >
      <div className="flex w-full h-full">
        {/* Book Cover */}
        <div className="w-32 h-40 rounded-l-2xl overflow-hidden flex-shrink-0">
          {coverImage ? (
            <>
              <Image
                src={coverImage.src}
                alt={`${title} by ${author}`}
                className="w-full h-full object-cover"
                width={128}
                height={192}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: isDark
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.1)",
                }}
              ></div>
            </>
          ) : (
            <div
              className="w-full h-full backdrop-blur-sm border rounded-l-2xl p-4"
              style={{
                backgroundColor: isDark
                  ? "rgba(35, 35, 35, 0.5)"
                  : "rgba(255, 255, 255, 0.9)",
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="space-y-2">
                <h3
                  className="font-semibold text-sm"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#000000",
                  }}
                >
                  {title}
                </h3>
                <div className="space-y-1">
                  <p
                    className="text-xs"
                    style={{
                      color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                    }}
                  >
                    by {author}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3
              className="font-semibold text-sm leading-tight"
              style={{
                color: isDark ? "rgb(255, 255, 255)" : "#000000",
              }}
            >
              {title}
            </h3>
            <p
              className="text-xs"
              style={{
                color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
              }}
            >
              by {author}
            </p>
          </div>

          {/* Status */}
          {currentPage && totalPages && (
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isFinished ? "bg-green-500" : "bg-blue-500 animate-pulse"
                  }`}
                ></div>
                <span
                  className="text-xs font-medium"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                  }}
                >
                  {isFinished
                    ? "Finished"
                    : `Page ${currentPage} of ${totalPages}`}
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className="w-full rounded-full h-1.5 overflow-hidden"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isFinished
                      ? "bg-gradient-to-r from-green-500 to-green-400"
                      : "bg-gradient-to-r from-blue-500 to-blue-400"
                  }`}
                  style={{ width: `${isFinished ? 100 : progressPercentage}%` }}
                ></div>
              </div>

              {/* Status Text */}
              <div className="text-right">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                  }}
                >
                  {isFinished
                    ? "100% complete"
                    : `${Math.round(progressPercentage)}% complete`}
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
  icon,
  skills,
  isDark,
}: {
  title: string;
  icon: string;
  skills: string[];
  isDark: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 w-48 h-56 border rounded-2xl p-4 cursor-pointer shadow-lg group/card relative overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(248, 248, 248, 0.95)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage =
          "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #8B5CF6 100%)";
        e.currentTarget.style.backgroundSize = "300% 300%";
        e.currentTarget.style.animation = "sweep 24s linear infinite";
        e.currentTarget.style.backdropFilter = "none";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = "none";
        e.currentTarget.style.backgroundColor = isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(248, 248, 248, 0.95)";
        e.currentTarget.style.backgroundSize = "auto";
        e.currentTarget.style.animation = "none";
        e.currentTarget.style.backdropFilter = "blur(8px)";
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-3">
          <span className="text-3xl mb-2">{icon}</span>
          <h3
            className="font-semibold text-sm"
            style={{
              color: isDark ? "rgb(255, 255, 255)" : "#000000",
            }}
          >
            {title}
          </h3>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <ul className="space-y-1">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="text-xs text-left"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                }}
              >
                • {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes sweep {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .group:hover .group-hover\\/card\\:opacity-100 {
          background-color: transparent !important;
          backdrop-filter: none !important;
        }
      `}</style>
    </div>
  );
}

// Favorite Songs Component
function FavoriteSongs({ isDark }: { isDark: boolean }) {
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
      title: "Hideaway",
      artist: "Hardwell, Atmozfears",
      albumCover: HideawayCover,
      spotifyUrl:
        "https://open.spotify.com/track/1mBF7Ulsa4z5hWor4eduYb?si=45bf22053e694e18",
    },
    {
      title: "MO UP FRONT",
      artist: "NLE Choppa",
      albumCover: MoUpFrontCover,
      spotifyUrl:
        "https://open.spotify.com/track/0wZ0RnMZFR97fq1Yq8Ee57?si=260919d34b1144b0",
    },
  ];

  return (
    <>
      {songs.map((song, index) => (
        <div key={index} className="flex-shrink-0">
          <div className="relative">
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 cursor-pointer"
              onMouseEnter={(e) => {
                const coverDiv = e.currentTarget.parentElement?.querySelector(
                  ".album-cover"
                ) as HTMLElement;
                if (coverDiv) {
                  coverDiv.style.borderColor = "#8B5CF6";
                  const glowElement = coverDiv.querySelector(
                    ".glow-effect"
                  ) as HTMLElement;
                  if (glowElement) {
                    glowElement.style.opacity = "1";
                  }
                }
              }}
              onMouseLeave={(e) => {
                const coverDiv = e.currentTarget.parentElement?.querySelector(
                  ".album-cover"
                ) as HTMLElement;
                if (coverDiv) {
                  coverDiv.style.borderColor = "transparent";
                  const glowElement = coverDiv.querySelector(
                    ".glow-effect"
                  ) as HTMLElement;
                  if (glowElement) {
                    glowElement.style.opacity = "0";
                  }
                }
              }}
            />
            <div
              className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 border-transparent transition-all duration-200 relative album-cover"
              style={{
                backgroundColor: isDark
                  ? "rgb(35, 35, 35)"
                  : "rgb(240, 240, 240)",
              }}
            >
              <Image
                src={song.albumCover}
                alt={`${song.title} by ${song.artist}`}
                className="w-full h-full object-cover"
                width={96}
                height={96}
              />
              {/* Radial blue shine effect */}
              <div
                className="absolute inset-0 transition-opacity duration-300 rounded-xl glow-effect"
                style={{
                  opacity: "0",
                  background:
                    "radial-gradient(ellipse at top, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)",
                }}
              ></div>
            </div>
            <div className="mt-2 text-center">
              <p
                className="text-xs sm:text-sm font-medium truncate max-w-24 sm:max-w-24 md:max-w-28"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#000000",
                }}
              >
                {song.title}
              </p>
              <p
                className="text-xs sm:text-sm truncate max-w-24 sm:max-w-24 md:max-w-28"
                style={{
                  color: isDark ? "rgb(255, 255, 255)" : "#5D5E63",
                }}
              >
                {song.artist}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function AboutPage() {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const { isDark } = useTheme();

  // Calculate scale for each box based on hover state
  const getBoxScale = (boxId: string) => {
    if (!hoveredBox) return 1; // No hover - all boxes normal size
    if (hoveredBox === boxId) return 1.02; // Hovered box grows (reduced from 1.05)
    return 1; // Other boxes stay normal size
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      <div className="relative z-10">
        <main className="container mx-auto">
          {/* Hero Section */}
          <section className="min-h-screen relative flex items-center">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)", // Purple primary
                secondary: "rgba(168, 85, 247, 0.4)", // Purple secondary
              }}
            />
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
              <div className="text-left w-full">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                    About
                  </span>
                </h1>
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mt-8 sm:mt-12 lg:mt-16">
                  <div className="flex-1 max-w-full lg:max-w-[48rem]">
                    <p className="text-neutral-70 dark:text-neutral-30 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed tracking-wide">
                      I am a passionate designer and developer with a love for
                      creating beautiful, functional experiences that make a
                      difference.
                    </p>
                    <p className="text-neutral-70 dark:text-neutral-30 text-base sm:text-lg lg:text-xl font-semibold leading-loose tracking-wide mt-6 sm:mt-8">
                      — with an{" "}
                      <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">eye</span>{" "}
                      for{" "}
                      <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                        detail
                      </span>
                      , a{" "}
                      <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">
                        heart
                      </span>{" "}
                      for the{" "}
                      <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                        user
                      </span>
                      , and a{" "}
                      <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">
                        drive
                      </span>
                      for the{" "}
                      <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                        business
                      </span>
                      .
                    </p>
                  </div>
                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <span className="text-neutral-60 dark:text-neutral-40 text-3xl sm:text-4xl lg:text-5xl font-medium font-hanken tracking-wide">
                      My Story
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Box Layout */}
          <section className="py-8 sm:py-12 lg:py-16 relative">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 lg:gap-12 auto-rows-[280px] sm:auto-rows-[300px] lg:auto-rows-[320px]">
                {/* Personal Traits - Large section */}
                <div
                  className="md:col-span-3 lg:col-span-5 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-2 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("traits")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("traits")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <h2
                      className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                      style={{
                        color: isDark ? "rgb(255, 255, 255)" : "#000000",
                      }}
                    >
                      Traits
                    </h2>
                    <Image
                      src="/icons/3dicons-puzzle-dynamic-premium.png"
                      alt="Traits"
                      width={60}
                      height={60}
                      className="animate-pulse-subtle sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                  <div className="mt-8">
                    <TraitsCarousel
                      isDark={isDark}
                      traits={[
                        {
                          title: "Home Cook",
                          description:
                            "I cook a lot and love experimenting with new recipes. Food is my creative outlet outside of design.",
                          emoji: "👨‍🍳",
                          image:
                            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
                        },
                        {
                          title: "Tech Explorer",
                          description:
                            "Always curious about new technologies and how they can improve user experiences.",
                          emoji: "🔬",
                          image:
                            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center",
                        },
                        {
                          title: "Design Thinker",
                          description:
                            "I approach problems with empathy and user-centered design principles.",
                          emoji: "💭",
                          image:
                            "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop&crop=center",
                        },
                        {
                          title: "Stockholm Local",
                          description:
                            "Living in one of the world's most design-forward cities inspires my work daily.",
                          emoji: "🏙️",
                          image: StockholmImage.src,
                        },
                        {
                          title: "Animal Lover",
                          description:
                            "I love animals - I have had both cats and dogs as pets.",
                          emoji: "🐶",
                          image: AnimalsImage.src,
                        },
                        {
                          title: "From Mellbystrand, Sweden",
                          description:
                            "Born in coastal Mellbystrand with its warm summers and quiet winters — shaped my appreciation for nature and serenity.",
                          emoji: "🌅",
                          image: MellbystrandImage.src,
                        },
                        {
                          title: "Night Owl",
                          description:
                            "I'm most productive and creative during the late hours when the world is quiet.",
                          emoji: "🦉",
                          image: NightOwlImage.src,
                        },
                        {
                          title: "Formula 1 Enthusiast",
                          description:
                            "Passionate about Formula 1 racing. My favorite team is Mercedes and driver is Lewis Hamilton. I love the engineering, strategy, and pure speed of the sport.",
                          emoji: "🏎️",
                          image: Formula1Image.src,
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* About Me - Medium section */}
                <div
                  className="md:col-span-3 lg:col-span-3 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("about")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("about")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <h2
                      className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                      style={{
                        color: isDark ? "rgb(255, 255, 255)" : "#000000",
                      }}
                    >
                      Who am I?
                    </h2>
                    <Image
                      src="/icons/3dicons-bulb-dynamic-premium.png"
                      alt="About Me"
                      width={60}
                      height={60}
                      className="animate-pulse-subtle sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <p
                      className="leading-relaxed text-sm sm:text-base lg:text-lg"
                      style={{
                        color: isDark ? "#A7A7A7" : "#5D5E63",
                      }}
                    >
                      A passionate designer and developer with a love for
                      creating beautiful, functional experiences that make a
                      difference. I believe in the power of thoughtful design to
                      solve real problems and create meaningful connections.
                    </p>
                  </div>
                </div>

                {/* Why This Portfolio - Medium section */}
                <div
                  className="md:col-span-3 lg:col-span-3 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("portfolio")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("portfolio")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <h2
                      className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                      style={{
                        color: isDark ? "rgb(255, 255, 255)" : "#000000",
                      }}
                    >
                      Why This Portfolio?
                    </h2>
                    <Image
                      src="/icons/3dicons-star-dynamic-premium.png"
                      alt="Why This Portfolio"
                      width={60}
                      height={60}
                      className="animate-pulse-subtle sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <p
                      className="leading-relaxed text-sm sm:text-base lg:text-lg"
                      style={{
                        color: isDark ? "#A7A7A7" : "#5D5E63",
                      }}
                    >
                      This portfolio is more than a showcase — it's a personal
                      space that evolves over time. Case studies are kept
                      lightweight to be easily digested, while also giving room
                      for reflection and a closer connection to who I am as a
                      person and designer.
                    </p>
                  </div>
                </div>

                {/* Local Time - Small section */}
                <div
                  className="md:col-span-2 lg:col-span-3 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("time")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("time")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <h2
                      className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                      style={{
                        color: isDark ? "rgb(255, 255, 255)" : "#000000",
                      }}
                    >
                      My Time
                    </h2>
                    <Image
                      src="/icons/3dicons-clock-dynamic-premium.png"
                      alt="My Time"
                      width={60}
                      height={60}
                      className="animate-pulse-subtle sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Time Display */}
                    <div className="text-center">
                      <div className="relative">
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-audiowide font-bold text-[#fbbf24] mb-2 tracking-wider">
                          <LiveClock />
                        </div>
                        {/* Animated dots */}
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar Style Date */}
                    <div className="text-center">
                      <div
                        className="w-full backdrop-blur-sm border rounded-2xl p-3 shadow-lg"
                        style={{
                          background: isDark
                            ? "linear-gradient(to bottom right, rgba(35, 35, 35, 0.4), rgba(45, 45, 45, 0.4))"
                            : "linear-gradient(to bottom right, rgba(240, 240, 240, 0.4), rgba(230, 230, 230, 0.4))",
                          borderColor: isDark
                            ? "rgba(255, 255, 255, 0.3)"
                            : "rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] via-[#a855f7] to-[#c084fc] rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl font-bold drop-shadow-sm">
                                  {new Date().getDate()}
                                </span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#fbbf24] rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-left">
                              <div
                                className="text-sm font-bold tracking-wide"
                                style={{
                                  color: isDark
                                    ? "rgb(255, 255, 255)"
                                    : "#000000",
                                }}
                              >
                                {new Date().toLocaleDateString("en-US", {
                                  month: "long",
                                })}
                              </div>
                              <div
                                className="text-sm font-medium"
                                style={{
                                  color: isDark
                                    ? "rgb(255, 255, 255)"
                                    : "#5D5E63",
                                }}
                              >
                                {new Date().getFullYear()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className="text-xs font-bold"
                              style={{
                                color: isDark
                                  ? "rgb(255, 255, 255)"
                                  : "#5D5E63",
                              }}
                            >
                              {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                              })}
                            </div>
                            <div
                              className="text-xs font-medium mt-1"
                              style={{
                                color: isDark
                                  ? "rgb(255, 255, 255)"
                                  : "#5D5E63",
                              }}
                            >
                              Stockholm Time (CET/CEST)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Currently Reading - Medium section */}
                <div
                  className="md:col-span-4 lg:col-span-5 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("books")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("books")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <h2
                        className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        Books
                      </h2>
                      <p
                        className="text-sm sm:text-base lg:text-lg font-hanken"
                        style={{
                          color: isDark ? "#A7A7A7" : "#5D5E63",
                        }}
                      >
                        I'm currently reading or listening to
                      </p>
                    </div>
                    <a
                      href="/reading-list"
                      className="animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer"
                      data-tooltip="View Reading List"
                      data-tooltip-icon="→"
                    >
                      <Image
                        src="/icons/3dicons-notebook-dynamic-premium.png"
                        alt="Books"
                        width={60}
                        height={60}
                        className="sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                      />
                    </a>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <BookCard
                      title="Hjärnstark : hur motion och träning stärker din hjärna"
                      author="Anders Hansen"
                      coverImage={HjarnstarkCover}
                      amazonUrl="https://www.amazon.com/Hjärnstark-hur-motion-träning-stärker/dp/9175031234"
                      currentPage={127}
                      totalPages={280}
                      isDark={isDark}
                    />
                    <BookCard
                      title="Mikael Persbrandt : så som jag minns det"
                      author="Mikael Persbrandt"
                      coverImage={MikaelPersbrandtCover}
                      amazonUrl="https://www.amazon.com/Mikael-Persbrandt-så-minns-det/dp/9175031234"
                      currentPage={431}
                      totalPages={431}
                      isFinished={true}
                      isDark={isDark}
                    />
                  </div>
                </div>

                {/* Favourite Films - Large section */}
                <div
                  className="col-span-1 md:col-span-4 lg:col-span-5 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("films")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("films")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <h2
                      className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                      style={{
                        color: isDark ? "rgb(255, 255, 255)" : "#000000",
                      }}
                    >
                      Favourite Films
                    </h2>
                    <Image
                      src="/icons/3dicons-video-cam-dynamic-premium.png"
                      alt="Favourite Films"
                      width={60}
                      height={60}
                      className="animate-pulse-subtle sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                  {/* Mobile/Tablet Carousel */}
                  <div className="lg:hidden">
                    <FilmsCarousel
                      isDark={isDark}
                      films={[
                        {
                          title: "The Equalizer",
                          year: "2014",
                          director: "Antoine Fuqua",
                          coverImage: TheEqualizerCover,
                          imdbUrl:
                            "https://www.imdb.com/title/tt0455944/?ref_=mv_close",
                        },
                        {
                          title: "The Equalizer 2",
                          year: "2018",
                          director: "Antoine Fuqua",
                          coverImage: TheEqualizer2Cover,
                          imdbUrl:
                            "https://www.imdb.com/title/tt0455944/?ref_=mv_close",
                        },
                        {
                          title: "The Beekeeper",
                          year: "2024",
                          director: "David Ayer",
                          coverImage: TheBeekeeperCover,
                          imdbUrl: "https://www.imdb.com/title/tt15314262/",
                        },
                        {
                          title: "The Dark Knight",
                          year: "2008",
                          director: "Christopher Nolan",
                          coverImage: TheDarkKnightCover,
                          imdbUrl: "https://www.imdb.com/title/tt0468569/",
                        },
                        {
                          title: "Arrival",
                          year: "2016",
                          director: "Denis Villeneuve",
                          coverImage: ArrivalCover,
                          imdbUrl: "https://www.imdb.com/title/tt2543164/",
                        },
                      ]}
                    />
                  </div>

                  {/* Desktop Static Display */}
                  <div className="hidden lg:flex gap-4 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide min-h-[176px] items-start">
                    <FilmCard
                      title="The Equalizer"
                      year="2014"
                      director="Antoine Fuqua"
                      coverImage={TheEqualizerCover}
                      imdbUrl="https://www.imdb.com/title/tt0455944/?ref_=mv_close"
                    />
                    <FilmCard
                      title="The Equalizer 2"
                      year="2018"
                      director="Antoine Fuqua"
                      coverImage={TheEqualizer2Cover}
                      imdbUrl="https://www.imdb.com/title/tt0455944/?ref_=mv_close"
                    />
                    <FilmCard
                      title="The Beekeeper"
                      year="2024"
                      director="David Ayer"
                      coverImage={TheBeekeeperCover}
                      imdbUrl="https://www.imdb.com/title/tt15314262/"
                    />
                    <FilmCard
                      title="The Dark Knight"
                      year="2008"
                      director="Christopher Nolan"
                      coverImage={TheDarkKnightCover}
                      imdbUrl="https://www.imdb.com/title/tt0468569/"
                    />
                    <FilmCard
                      title="Arrival"
                      year="2016"
                      director="Denis Villeneuve"
                      coverImage={ArrivalCover}
                      imdbUrl="https://www.imdb.com/title/tt2543164/"
                    />
                  </div>
                </div>

                {/* Music - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 border-2 border-neutral-80/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    transform: `scale(${getBoxScale("music")})`,
                    backgroundColor: isDark
                      ? "rgba(35, 35, 35, 0.5)"
                      : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredBox("music")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between -mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <h2
                        className="text-lg sm:text-xl font-bold font-montserrat uppercase tracking-wider"
                        style={{
                          color: isDark ? "rgb(255, 255, 255)" : "#000000",
                        }}
                      >
                        Music
                      </h2>
                      <p
                        className="text-sm sm:text-base lg:text-lg font-hanken"
                        style={{
                          color: isDark ? "#A7A7A7" : "#5D5E63",
                        }}
                      >
                        I'm currently listening to
                      </p>
                    </div>
                    <a
                      href="https://open.spotify.com/user/mttssn?si=290f1aee519542bb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer"
                      data-tooltip="Open My Spotify"
                      data-tooltip-icon="↗"
                    >
                      <Image
                        src="/icons/3dicons-headphone-dynamic-premium.png"
                        alt="Spotify"
                        width={60}
                        height={60}
                        className="sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                      />
                    </a>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <FavoriteSongs isDark={isDark} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <div className="pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
