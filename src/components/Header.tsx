"use client";

import Link from "next/link";
import Menu from "./Menu";
import { LegoIcon, FileText } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

const Header = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Show background when user scrolls
      setShowBackground(true);

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Hide background after 1.5 seconds (1 second longer than before)
      timeoutId = setTimeout(() => {
        setShowBackground(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-24 backdrop-blur-lg transition-all duration-1000 ${
        showBackground
          ? "bg-neutral-0/80 dark:bg-neutral-900/80"
          : "bg-transparent"
      }`}
    >
      <div className={`px-12 h-full ${hanken.className}`}>
        <div className="flex justify-between items-center h-full">
          <Link
            href="/"
            className="text-2xl font-bold text-neutral-100 dark:text-neutral-100"
          >
            <img
              src="/rm-logo-portfolio-white.svg"
              alt="Logo"
              className="h-8 dark:block hidden"
            />
            <img
              src="/rm-logo-portfolio-dark.svg"
              alt="Logo"
              className="h-8 block dark:hidden"
            />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Menu />
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* LinkedIn Button */}
            <Link
              href="https://www.linkedin.com/in/rasmus-mattsson/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 rounded-lg transition-all duration-200 hover:bg-neutral-100/10 dark:hover:bg-neutral-0/10 group"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="w-5 h-5 text-neutral-40 group-hover:text-neutral-0 transition-all duration-200"
              />

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neutral-100/5 to-neutral-0/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>

            {/* My Resume Button */}
            <Link
              href="https://drive.google.com/file/d/1FIODpbn55vPLMo3S6V_QNMaX6SojM7kr/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-200"
            >
              <FileText size={16} weight="regular" />
              My resume
            </Link>

            {/* Playground Button */}
            <Link href="/fun" className="shimmer-button">
              <span className="text">
                <LegoIcon
                  weight="fill"
                  className="w-5 h-5 fill-current shrink-0"
                />
                <span className="label">Playground</span>
              </span>
              <span className="shimmer"></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
