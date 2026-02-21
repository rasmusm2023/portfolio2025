"use client";

import Link from "next/link";
import HeaderMenuBar from "./HeaderMenuBar";
import { figtree } from "@/app/fonts";
import { useEffect, useState } from "react";
import { usePreviewModal } from "@/contexts/PreviewModalContext";

const Header = () => {
  const [showBackground, setShowBackground] = useState(false);
  const { isPreviewModalOpen } = usePreviewModal();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setShowBackground(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setShowBackground(false), 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] h-16 sm:h-20 xl:h-24">
      {/* Background Layer: blur when preview modal is open */}
      <div
        className={`absolute inset-0 transition-all duration-300 mobile-header-bg xl:bg-transparent ${
          showBackground ? "xl:bg-white/80 xl:dark:bg-[#0a0a0a]/80" : ""
        } ${isPreviewModalOpen ? "backdrop-blur-md bg-white/70 dark:bg-[#0a0a0a]/70" : ""}`}
      />

      {/* Content Layer */}
      <div className={`relative z-10 px-4 sm:px-6 xl:px-16 h-full ${figtree.className}`}>
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100"
          >
            <img
              src="/assets/logos/rm/rm-logo-portfolio-white.svg"
              alt="Logo"
              className="h-6 sm:h-7 xl:h-8 dark:block hidden"
            />
            <img
              src="/assets/logos/rm/rm-logo-portfolio-dark.svg"
              alt="Logo"
              className="h-6 sm:h-7 xl:h-8 block dark:hidden"
            />
          </Link>

          {/* Menu: centered nav + right-side actions */}
          <div className="flex-1 flex min-w-0 relative">
            <HeaderMenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
