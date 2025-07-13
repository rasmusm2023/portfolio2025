"use client";

import AnimatedBlob from "@/components/AnimatedBlob";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import SpotifyIcon from "@/logos/Symbol.svg";
import TheEqualizerCover from "@/films/The-Equalizer.png";
import TheEqualizer2Cover from "@/films/The-Equalizer-2.png";
import RasmusImage from "@/images/rasmus.jpg";
import HjarnstarkCover from "@/books/hjarnstark-anders-hansen.jpg";
import { useState, useEffect } from "react";

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
            <img
              src={coverImage.src}
              alt={`${title} (${year})`}
              className="w-full h-full object-cover"
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
      className="flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200 cursor-pointer group bg-neutral-80/50 backdrop-blur-sm"
    >
      <div className="flex w-full h-full">
        {/* Book Cover */}
        <div className="w-32 h-48 rounded-l-2xl overflow-hidden">
          {coverImage ? (
            <>
              <img
                src={coverImage.src}
                alt={`${title} by ${author}`}
                className="w-full h-full object-cover"
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
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      albumCover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=center",
      spotifyUrl: "https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc",
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
              <img
                src={song.albumCover}
                alt={`${song.title} by ${song.artist}`}
                className="w-full h-full object-cover"
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(79, 70, 229, 0.6)", // Indigo blue
                secondary: "rgba(6, 182, 212, 0.4)", // Cyan/teal
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-about)] bg-clip-text text-transparent font-hanken">
                    About Me
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
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[40rem]">
                    From concept to execution, I bring ideas to life through
                    thoughtful design and clean code.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Box Layout */}
          <section className="py-16 px-24">
            <div className="text-left w-full max-w-[1600px]">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[320px]">
                {/* About Me - Standing section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center row-span-2 relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300">
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex flex-col items-center mb-6">
                    {/* Profile image */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-neutral-100/20 mb-4">
                      <img
                        src={RasmusImage.src}
                        alt="Rasmus Mattsson"
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: "center 30%" }}
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken text-center">
                    TLDR;
                  </h2>
                  <div className="space-y-4">
                    <p className="text-neutral-60 text-base leading-relaxed">
                      I'm Rasmus Mattsson, a UX/UI Designer and Low-code
                      Developer based in Stockholm, Sweden. I love creating
                      digital experiences that bridge creativity with
                      technology.
                    </p>
                    <p className="text-neutral-60 text-base leading-relaxed">
                      When I'm not designing or coding, you'll find me exploring
                      new technologies, reading about design trends, or enjoying
                      the vibrant tech scene in Sweden.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                        <span className="text-neutral-60 text-sm">
                          📍 Stockholm, Sweden
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                        <span className="text-neutral-60 text-sm">
                          🎓 Design & Development
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* I work in - Large section */}
                <div className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl flex flex-col justify-center overflow-hidden relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300">
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-baseline gap-2 mb-2 p-8">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      My toolkit include
                    </h2>
                    <p className="text-lg text-neutral-30 font-hanken">
                      but is not limited to:
                    </p>
                  </div>

                  {/* GSAP-powered Infinite Scroll Banner */}
                  <InfiniteScrollBanner />
                </div>

                {/* Skills - Large section */}
                <div className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    Core Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-neutral-0 font-semibold text-sm">
                        Design
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            User Research
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            Wireframing
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            Prototyping
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-neutral-0 font-semibold text-sm">
                        Development
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            React/Next.js
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            TypeScript
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                          <span className="text-neutral-60 text-xs">
                            Tailwind CSS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience - Medium section */}
                <div className="md:col-span-3 lg:col-span-4 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    Experience
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        5+ years in UX/UI Design
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        3+ years in Development
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        20+ projects completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Philosophy - Medium section */}
                <div className="md:col-span-3 lg:col-span-4 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    Philosophy
                  </h2>
                  <p className="text-neutral-60 text-sm leading-relaxed">
                    Design should be invisible. When users focus on their goals
                    rather than the interface, that's when we've succeeded.
                  </p>
                </div>

                {/* My Approach - Medium section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    My Approach
                  </h2>
                  <p className="text-neutral-60 text-sm leading-relaxed">
                    I believe great design starts with understanding the user.
                    Every project begins with research, empathy, and a deep dive
                    into the problem space.
                  </p>
                </div>

                {/* Values - Medium section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    Values
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        Empathy First
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        Continuous Learning
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                      <span className="text-neutral-60 text-sm">
                        Quality Over Speed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Music - Medium section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center relative hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Music
                    </h2>
                    <a
                      href="https://open.spotify.com/user/mttssn?si=290f1aee519542bb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 animate-pulse hover:scale-110 transition-transform duration-200 cursor-pointer"
                    >
                      <img
                        src={SpotifyIcon.src}
                        alt="Spotify"
                        className="w-full h-full"
                      />
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-60 text-base font-semibold">
                        I'm currently listening to:
                      </span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <FavoriteSongs />
                    </div>
                  </div>
                </div>

                {/* Currently Reading - Medium section */}
                <div className="md:col-span-3 lg:col-span-4 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300">
                  {/* Radial shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  ></div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Books
                    </h2>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-neutral-60 text-base font-semibold">
                        📚 Reading:
                      </span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <BookCard
                        title="Hjärnstark : hur motion och träning stärker din hjärna"
                        author="Anders Hansen"
                        coverImage={HjarnstarkCover}
                        amazonUrl="https://www.amazon.com/Hjärnstark-hur-motion-träning-stärker/dp/9175031234"
                        currentPage={127}
                        totalPages={280}
                      />
                    </div>
                  </div>
                </div>

                {/* Currently Working On - Standing section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center row-span-2 hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-6 font-hanken">
                    Currently Working On
                  </h2>
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-64 h-64 rounded-2xl overflow-hidden bg-neutral-80 border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200">
                        <img
                          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop&crop=center"
                          alt="Project Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-0 text-center">
                        Portfolio Website 2025
                      </h3>
                      <p className="text-neutral-60 text-sm leading-relaxed text-center">
                        A modern, interactive portfolio showcasing my design and
                        development skills. Built with Next.js, TypeScript, and
                        Tailwind CSS. Features smooth animations, responsive
                        design, and a unique bento box layout for the about
                        page.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-accent-100/20 text-accent-100 text-xs font-medium rounded-full">
                          Next.js
                        </span>
                        <span className="px-3 py-1 bg-accent-100/20 text-accent-100 text-xs font-medium rounded-full">
                          TypeScript
                        </span>
                        <span className="px-3 py-1 bg-accent-100/20 text-accent-100 text-xs font-medium rounded-full">
                          Tailwind CSS
                        </span>
                        <span className="px-3 py-1 bg-accent-100/20 text-accent-100 text-xs font-medium rounded-full">
                          GSAP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favourite Films - Large section */}
                <div className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    Favourite Films
                  </h2>
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
                      title="Blade Runner 2049"
                      year="2017"
                      director="Denis Villeneuve"
                    />
                    <FilmCard
                      title="Interstellar"
                      year="2014"
                      director="Christopher Nolan"
                    />
                    <FilmCard
                      title="Arrival"
                      year="2016"
                      director="Denis Villeneuve"
                    />
                  </div>
                </div>

                {/* Local Time - Small section */}
                <div className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-6 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    My Time
                  </h2>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-mono font-bold text-accent-100 mb-1">
                        <LiveClock />
                      </div>
                      <div className="text-neutral-60 text-xs">
                        Stockholm Time (CET/CEST)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-neutral-60 text-sm">
                        <LiveDate />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Traits - Large section */}
                <div className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-neutral-0 mb-4 font-hanken">
                    About Me
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <TraitCard
                      title="Home Cook"
                      description="I cook a lot and love experimenting with new recipes. Food is my creative outlet outside of design."
                      emoji="👨‍🍳"
                    />
                    <TraitCard
                      title="Tech Explorer"
                      description="Always curious about new technologies and how they can improve user experiences."
                      emoji="🔬"
                    />
                    <TraitCard
                      title="Design Thinker"
                      description="I approach problems with empathy and user-centered design principles."
                      emoji="💭"
                    />
                    <TraitCard
                      title="Stockholm Local"
                      description="Living in one of the world's most design-forward cities inspires my work daily."
                      emoji="🏙️"
                    />
                    <TraitCard
                      title="Animal Lover"
                      description="I love animals - I have had both cats and dogs as pets."
                      emoji="🐶"
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
