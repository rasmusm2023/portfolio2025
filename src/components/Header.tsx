"use client";

import Link from "next/link";
import Menu from "./Menu";
import { LegoIcon } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 bg-transparent backdrop-blur-lg">
      <div className={`px-12 h-full ${hanken.className}`}>
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="text-2xl font-bold text-neutral-100">
            <img
              src="/rm-logo-portfolio-white.svg"
              alt="Logo"
              className="h-8"
            />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Menu />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/rasmus-mattsson/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-neutral-40 hover:text-neutral-0 transition-all duration-200 text-sm font-semibold inline-flex items-center gap-2 tracking-wider px-4 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" />
            </Link>
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
