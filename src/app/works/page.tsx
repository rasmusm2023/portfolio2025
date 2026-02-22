"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { figtree } from "@/app/fonts";
import Footer from "@/components/layout/Footer";

const CATEGORIES = [
  "UI Design",
  "Product Strategy",
  "UX Research",
  "Design Systems",
  "Prototyping",
  "Frontend",
];

interface WorkEntry {
  id: string;
  title: string;
  categories: string[];
  link: string;
}

const ALL_WORKS: WorkEntry[] = [
  {
    id: "emplojd",
    title: "Emplojd",
    categories: ["UI Design", "Product Strategy"],
    link: "/case-studies/emplojd",
  },
  {
    id: "noted",
    title: "Noted",
    categories: ["UI Design", "Prototyping"],
    link: "/case-studies/noted",
  },
  {
    id: "zmartrest-ai",
    title: "Zmartrest AI",
    categories: ["Product Strategy", "Design Systems"],
    link: "/case-studies/zmartrest-ai",
  },
  {
    id: "archives",
    title: "Archives",
    categories: ["UX Research", "Frontend"],
    link: "/archives",
  },
];

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Works — Rasmus Mattsson | Product Designer Portfolio";
  }, []);

  const filteredWorks = useMemo(() => {
    if (!selectedCategory) return ALL_WORKS;
    return ALL_WORKS.filter((w) => w.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors duration-300 ${figtree.className}`}
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 pb-16 md:pb-24">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-10 md:mb-14">
          All works
        </h1>

        {/* Category filters - Jorge style pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 md:mb-16">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Work grid - Jorge style: project name + category tags */}
        <div className="grid gap-8 sm:gap-10 md:gap-12">
          {filteredWorks.map((work) => (
            <Link
              key={work.id}
              href={work.link}
              className="group block border-b border-neutral-200 dark:border-neutral-800 pb-8 sm:pb-10 md:pb-12 last:border-0 transition-colors"
              aria-label={`View ${work.title}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {work.title}
                </h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {work.categories.map((cat, i) => (
                    <span key={cat}>
                      {i > 0 && (
                        <span className="mr-2" aria-hidden>
                          ·
                        </span>
                      )}
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Get in touch - Jorge style */}
        <section
          id="contact"
          className="mt-20 md:mt-28 pt-16 border-t border-neutral-200 dark:border-neutral-800"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
            Get in touch
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a
              href="mailto:hello@rasmusmattsson.com"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Email
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/rasmus-mattsson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </section>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
