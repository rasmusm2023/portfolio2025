"use client";

import Link from "next/link";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="relative z-50 h-32">
      <div className="px-12 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="text-2xl font-bold text-neutral-100">
            <img
              src="/rm-logo-portfolio-white.svg"
              alt="Logo"
              className="h-8"
            />
          </Link>
          <Menu />
          <Link
            href="/fun"
            className="text-accent-100 hover:text-accent-60 transition-all duration-200 text-lg font-bold inline-block transform -rotate-90 origin-center tracking-widest"
          >
            FUN
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
