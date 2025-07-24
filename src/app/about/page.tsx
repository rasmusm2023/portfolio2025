"use client";

import AnimatedBlob from "@/components/AnimatedBlob";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import TraitsCarousel from "@/components/TraitsCarousel";
import SpotifyIcon from "@/logos/Symbol.svg";
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
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CursorTooltip from "@/components/CursorTooltip";

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
      className="flex-shrink-0 w-32 h-44 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#ffb571] transition-colors duration-200 cursor-pointer group"
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
}: {
  title: string;
  author: string;
  coverImage?: any;
  amazonUrl?: string;
  currentPage?: number;
  totalPages?: number;
  isFinished?: boolean;
}) {
  const progressPercentage =
    currentPage && totalPages ? (currentPage / totalPages) * 100 : 0;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#ffb571] transition-colors duration-200 cursor-pointer group bg-neutral-80/50 backdrop-blur-sm"
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

          {/* Status */}
          {currentPage && totalPages && (
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isFinished ? "bg-green-500" : "bg-blue-500 animate-pulse"
                  }`}
                ></div>
                <span className="text-neutral-60 text-xs font-medium">
                  {isFinished
                    ? "Finished"
                    : `Page ${currentPage} of ${totalPages}`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-100/20 rounded-full h-1.5 overflow-hidden">
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
                <span className="text-neutral-60 text-xs font-medium">
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
}: {
  title: string;
  icon: string;
  skills: string[];
}) {
  return (
    <div className="flex-shrink-0 w-48 h-56 bg-neutral-100 backdrop-blur-sm border border-neutral-100/20 rounded-2xl p-4 cursor-pointer shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-3">
          <span className="text-3xl mb-2">{icon}</span>
          <h3 className="text-neutral-0 font-semibold text-sm">{title}</h3>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <ul className="space-y-1">
            {skills.map((skill, index) => (
              <li key={index} className="text-neutral-60 text-xs text-left">
                • {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
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
                  coverDiv.style.borderColor = "#ffb571";
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
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-neutral-80 border-2 border-transparent transition-all duration-200 relative album-cover">
              <Image
                src={song.albumCover}
                alt={`${song.title} by ${song.artist}`}
                className="w-full h-full object-cover"
                width={112}
                height={112}
              />
              {/* Radial blue shine effect */}
              <div
                className="absolute inset-0 transition-opacity duration-300 rounded-xl glow-effect"
                style={{
                  opacity: "0",
                  background:
                    "radial-gradient(ellipse at top, rgba(255,181,113,0.4) 0%, rgba(255,181,113,0.1) 40%, transparent 80%)",
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
          </div>
        </div>
      ))}
    </>
  );
}

export default function AboutPage() {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  // Calculate scale for each box based on hover state
  const getBoxScale = (boxId: string) => {
    if (!hoveredBox) return 1; // No hover - all boxes normal size
    if (hoveredBox === boxId) return 1.02; // Hovered box grows (reduced from 1.05)
    return 1; // Other boxes stay normal size
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(255, 181, 113, 0.6)", // Peach
                secondary: "rgba(255, 140, 244, 0.4)", // Pink
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-about)] bg-clip-text text-transparent font-hanken">
                    About
                  </span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      My Story
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[40rem]">
                    A passionate designer and developer with a love for creating
                    beautiful, functional experiences that make a difference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Box Layout */}
          <section className="py-16 px-24">
            <div className="text-left w-full max-w-[1600px]">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[320px]">
                {/* Personal Traits - Large section */}
                <div
                  className="md:col-span-5 lg:col-span-6 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 row-span-2 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("traits")})` }}
                  onMouseEnter={() => setHoveredBox("traits")}
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
                      Traits
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                      <span className="animate-pulse-subtle">🎭</span>
                    </span>
                  </div>
                  <TraitsCarousel
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
                        image:
                          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=400&fit=crop&crop=center",
                      },
                      {
                        title: "Animal Lover",
                        description:
                          "I love animals - I have had both cats and dogs as pets.",
                        emoji: "🐶",
                        image:
                          "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop&crop=center",
                      },
                    ]}
                  />
                </div>

                {/* Local Time - Small section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("time")})` }}
                  onMouseEnter={() => setHoveredBox("time")}
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
                      My Time
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                      <span className="animate-pulse-subtle">⏰</span>
                    </span>
                  </div>
                  <div className="space-y-4">
                    {/* Time Display */}
                    <div className="text-center">
                      <div className="relative">
                        <div className="text-4xl font-audiowide font-bold text-[#ffb571] mb-2 tracking-wider">
                          <LiveClock />
                        </div>
                        {/* Animated dots */}
                        <div className="flex justify-center gap-1 mb-2">
                          <div className="w-2 h-2 bg-[#ffb571] rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-[#ffb571] rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#ffb571] rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                        <div className="text-neutral-60 text-xs font-medium">
                          Stockholm Time (CET/CEST)
                        </div>
                      </div>
                    </div>

                    {/* Calendar Style Date */}
                    <div className="text-center">
                      <div className="inline-block bg-neutral-80/30 backdrop-blur-sm border border-neutral-100/20 rounded-xl p-6">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#ffb571] to-[#ff8cf4] rounded-lg flex items-center justify-center">
                            <span className="text-neutral-100 text-2xl font-bold">
                              {new Date().getDate()}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="text-neutral-0 text-base font-semibold">
                              {new Date().toLocaleDateString("en-US", {
                                month: "long",
                              })}
                            </div>
                            <div className="text-neutral-60 text-sm">
                              {new Date().getFullYear()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Music - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("music")})` }}
                  onMouseEnter={() => setHoveredBox("music")}
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
                        Music
                      </h2>
                      <p className="text-lg text-neutral-50 font-hanken">
                        I'm currently listening to
                      </p>
                    </div>
                    <CursorTooltip>
                      <a
                        href="https://open.spotify.com/user/mttssn?si=290f1aee519542bb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer"
                        data-tooltip="Open My Spotify"
                        data-tooltip-icon="↗"
                      >
                        <Image
                          src={SpotifyIcon.src}
                          alt="Spotify"
                          className="w-6 h-6"
                          width={24}
                          height={24}
                        />
                      </a>
                    </CursorTooltip>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <FavoriteSongs />
                    </div>
                  </div>
                </div>

                {/* Currently Reading - Medium section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center relative group hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("books")})` }}
                  onMouseEnter={() => setHoveredBox("books")}
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
                        Books
                      </h2>
                      <p className="text-lg text-neutral-50 font-hanken">
                        I'm currently reading or listening to
                      </p>
                    </div>
                    <CursorTooltip>
                      <a
                        href="/reading-list"
                        className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer"
                        data-tooltip="View Reading List"
                        data-tooltip-icon="→"
                      >
                        📚
                      </a>
                    </CursorTooltip>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <BookCard
                        title="Hjärnstark : hur motion och träning stärker din hjärna"
                        author="Anders Hansen"
                        coverImage={HjarnstarkCover}
                        amazonUrl="https://www.amazon.com/Hjärnstark-hur-motion-träning-stärker/dp/9175031234"
                        currentPage={127}
                        totalPages={280}
                      />
                      <BookCard
                        title="Mikael Persbrandt : så som jag minns det"
                        author="Mikael Persbrandt"
                        coverImage={MikaelPersbrandtCover}
                        amazonUrl="https://www.amazon.com/Mikael-Persbrandt-så-minns-det/dp/9175031234"
                        currentPage={431}
                        totalPages={431}
                        isFinished={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Favourite Films - Large section */}
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-neutral-80/40 rounded-3xl p-8 flex flex-col justify-center hover:shadow-lg hover:border-neutral-80/60 transition-all duration-500 relative group [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{ transform: `scale(${getBoxScale("films")})` }}
                  onMouseEnter={() => setHoveredBox("films")}
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
                      Favourite Films
                    </h2>
                    <span className="text-2xl bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/20 rounded-full w-12 h-12 flex items-center justify-center pointer-events-none">
                      <span className="animate-pulse-subtle">🎬</span>
                    </span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
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
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
