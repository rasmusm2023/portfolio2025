"use client";

import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Asterisk, LinkedinLogo, Sun, Moon } from "@phosphor-icons/react";

const Header = () => {
  const funButtonRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!funButtonRef.current || !glowRef.current) return;

    const button = funButtonRef.current;
    const glow = glowRef.current;

    // Create pulsing glow effect
    gsap.to(glow, {
      opacity: 0.5,
      scale: 1.2,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Add hover effect
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      gsap.to(glow, {
        opacity: 0.8,
        scale: 1.4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glow, {
        opacity: 0.5,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
          <div className="relative">
            <div
              ref={glowRef}
              className="absolute inset-0 bg-accent-100/30 blur-xl rounded-lg"
            />
            <div className="flex items-center gap-4">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-neutral-40 hover:text-neutral-0 transition-all duration-200 text-sm font-semibold inline-flex items-center gap-2 tracking-wider px-4 py-2 border-2 border-neutral-100/30 rounded-lg bg-neutral-0/5 backdrop-blur-sm"
              >
                <LinkedinLogo size={20} weight="fill" className="w-5 h-5" />
              </Link>
              <button className="relative text-neutral-40 hover:text-neutral-0 transition-all duration-200 text-sm font-semibold inline-flex items-center gap-2 tracking-wider px-4 py-2 border-2 border-neutral-100/30 rounded-lg bg-neutral-0/5 backdrop-blur-sm">
                <Sun size={20} weight="fill" className="w-5 h-5" />
              </button>
              <Link
                ref={funButtonRef}
                href="/fun"
                className="relative text-accent-40 hover:text-accent-60 transition-all duration-200 text-sm font-semibold inline-flex items-center gap-2 tracking-wider px-4 py-2 border-2 border-accent-100/30 rounded-lg bg-neutral-0/5 backdrop-blur-sm"
              >
                FUN
                <Asterisk size={20} weight="fill" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
