"use client";

import AnimatedBlob from "@/components/AnimatedBlob";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import TraitsCarousel from "@/components/TraitsCarousel";
import SpotifyIcon from "@/logos/Symbol.svg";
import TheEqualizerCover from "@/films/The-Equalizer.png";
import TheEqualizer2Cover from "@/films/The-Equalizer-2.png";
import TheBeekeeperCover from "@/films/the-beekeeper.png";
import RasmusImage from "@/images/rasmus.jpg";
import HjarnstarkCover from "@/books/hjarnstark-anders-hansen.jpg";
import MikaelPersbrandtCover from "@/books/mikael-persbrandt-book.jpg";
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
      className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200 cursor-pointer group bg-neutral-80/50 backdrop-blur-sm"
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
    <div className="flex-shrink-0 w-40 h-52 bg-neutral-90/80 backdrop-blur-sm border border-neutral-100/20 rounded-2xl p-4 cursor-pointer shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-3">
          <span className="text-4xl mb-2">{icon}</span>
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
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  // Calculate scale for each box based on hover state
  const getBoxScale = (boxId: string) => {
    if (!hoveredBox) return 1; // No hover - all boxes normal size
    if (hoveredBox === boxId) return 1.05; // Hovered box grows
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
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-start relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300"
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
                      <img
                        src={RasmusImage.src}
                        alt="Rasmus Mattsson"
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: "center 30%" }}
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
                    <p className="text-neutral-10 text-base font-medium leading-relaxed">
                      👋 Hi, I'm Rasmus Mattsson — a UX/UI Designer and Low-code
                      Developer based in Stockholm, Sweden. I love creating
                      digital experiences that bridge creativity with
                      technology.
                    </p>

                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                        <span className="text-neutral-60 text-sm">
                          📍 Based in Stockholm, Sweden
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
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl flex flex-col justify-center overflow-hidden relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300"
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
                      <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                        My toolkit include
                      </h2>
                      <p className="text-lg text-neutral-30 font-hanken">
                        but is not limited to:
                      </p>
                    </div>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🛠️
                    </span>
                  </div>

                  {/* GSAP-powered Infinite Scroll Banner */}
                  <InfiniteScrollBanner />
                </div>

                {/* Expertise - Large section */}
                <div
                  className="md:col-span-8 lg:col-span-8 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("skills")})` }}
                  onMouseEnter={() => setHoveredBox("skills")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Expertise{" "}
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      ⚡
                    </span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <SkillCard
                      title="UX Research"
                      icon="🔍"
                      skills={[
                        "Interviews",
                        "Testing",
                        "Data/metrics analysis",
                      ]}
                    />
                    <SkillCard
                      title="UI Design"
                      icon="🎨"
                      skills={[
                        "Visual design",
                        "Component systems",
                        "Design systems",
                      ]}
                    />
                    <SkillCard
                      title="UX Design"
                      icon="💡"
                      skills={[
                        "User flows",
                        "Information architecture",
                        "Interaction design",
                      ]}
                    />
                    <SkillCard
                      title="Development"
                      icon="💻"
                      skills={[
                        "React/Next.js",
                        "TypeScript",
                        "Modern web apps",
                      ]}
                    />
                    <SkillCard
                      title="Product"
                      icon="📊"
                      skills={[
                        "Strategy",
                        "Roadmapping",
                        "Analytics",
                        "Growth",
                      ]}
                    />
                    <SkillCard
                      title="AI & Automation"
                      icon="🤖"
                      skills={[
                        "Updated workflows",
                        "AI integration",
                        "Efficiency tools",
                        "Future-ready",
                      ]}
                    />
                    <SkillCard
                      title="Tailwind CSS"
                      icon="🎨"
                      skills={["Utility-first", "Responsive", "Rapid dev"]}
                    />
                  </div>
                </div>

                {/* Experience - Medium section */}
                <div
                  className="md:col-span-3 lg:col-span-4 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("experience")})` }}
                  onMouseEnter={() => setHoveredBox("experience")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Experience
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      💼
                    </span>
                  </div>
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
                <div
                  className="md:col-span-3 lg:col-span-4 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("philosophy")})` }}
                  onMouseEnter={() => setHoveredBox("philosophy")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Philosophy
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🎯
                    </span>
                  </div>
                  <p className="text-neutral-60 text-sm leading-relaxed">
                    Design should be invisible. When users focus on their goals
                    rather than the interface, that's when we've succeeded.
                  </p>
                </div>

                {/* My Approach - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("approach")})` }}
                  onMouseEnter={() => setHoveredBox("approach")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      My Approach
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🔍
                    </span>
                  </div>
                  <p className="text-neutral-60 text-sm leading-relaxed">
                    I believe great design starts with understanding the user.
                    Every project begins with research, empathy, and a deep dive
                    into the problem space.
                  </p>
                </div>

                {/* Values - Medium section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("values")})` }}
                  onMouseEnter={() => setHoveredBox("values")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Values
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      ⭐
                    </span>
                  </div>
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
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center relative hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("music")})` }}
                  onMouseEnter={() => setHoveredBox("music")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Music
                    </h2>
                    <a
                      href="https://open.spotify.com/user/mttssn?si=290f1aee519542bb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer"
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
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center relative group hover:shadow-lg hover:border-[#4F46E5]/80 transition-all duration-300"
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
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Books
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      📚
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-60 text-base font-semibold">
                        I'm currently reading or listening to:
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
                      <BookCard
                        title="Mikael Persbrandt : så som jag minns det"
                        author="Mikael Persbrandt"
                        coverImage={MikaelPersbrandtCover}
                        amazonUrl="https://www.amazon.com/Mikael-Persbrandt-så-minns-det/dp/9175031234"
                        currentPage={431}
                        totalPages={431}
                      />
                    </div>
                  </div>
                </div>

                {/* Currently Working On - Standing section */}
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center row-span-2 hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("current-work")})` }}
                  onMouseEnter={() => setHoveredBox("current-work")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Currently Working On
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🚀
                    </span>
                  </div>
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
                <div
                  className="md:col-span-4 lg:col-span-5 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("films")})` }}
                  onMouseEnter={() => setHoveredBox("films")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Favourite Films
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🎬
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
                <div
                  className="md:col-span-2 lg:col-span-3 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-6 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300"
                  style={{ transform: `scale(${getBoxScale("time")})` }}
                  onMouseEnter={() => setHoveredBox("time")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      My Time
                    </h2>
                    <span className="text-2xl animate-pulse-subtle hover:scale-110 transition-transform duration-200 cursor-pointer">
                      ⏰
                    </span>
                  </div>
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
                <div
                  className="md:col-span-5 lg:col-span-6 bg-neutral-90/50 backdrop-blur-sm border-2 border-[#4F46E5]/40 rounded-3xl p-8 flex flex-col justify-center hover:border-[#4F46E5]/80 transition-all duration-300 row-span-2"
                  style={{ transform: `scale(${getBoxScale("traits")})` }}
                  onMouseEnter={() => setHoveredBox("traits")}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-0 font-hanken">
                      Traits
                    </h2>
                    <span className="text-2xl animate-pulse hover:scale-110 transition-transform duration-200 cursor-pointer">
                      🎭
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
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
