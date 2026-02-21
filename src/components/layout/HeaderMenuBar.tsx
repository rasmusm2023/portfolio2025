"use client";

import Link from "next/link";
import Menu from "./Menu";
import { LegoIcon, FileText, X, Equals } from "@phosphor-icons/react";
import { figtree } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { gsap } from "gsap";

export default function HeaderMenuBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState<string | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const xIconRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      gsap.killTweensOf("*");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    try {
      const menuToggle = menuToggleRef.current;
      const menuText = menuTextRef.current;
      const hamburger = hamburgerRef.current;
      const xIcon = xIconRef.current;

      if (!menuToggle || !menuText || !hamburger || !xIcon) return;

      gsap.killTweensOf([hamburger, xIcon, menuText]);

      const tl = gsap.timeline({ paused: true });

      tl.to(menuText, {
        duration: 0.2,
        opacity: 0,
        y: -10,
        ease: "power2.inOut",
        onComplete: () => {
          if (menuText && menuText.parentNode) {
            menuText.innerHTML = isMobileMenuOpen ? "CLOSE" : "MENU";
          }
        },
      }).to(
        menuText,
        {
          duration: 0.2,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        "-=0.1"
      );

      if (isMobileMenuOpen) {
        if (hamburger?.parentNode) {
          gsap.to(hamburger, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            rotation: 90,
            ease: "power2.inOut",
          });
        }
        if (xIcon?.parentNode) {
          gsap.to(xIcon, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: "power2.out",
            delay: 0.15,
          });
        }
      } else {
        if (xIcon?.parentNode) {
          gsap.to(xIcon, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            rotation: -90,
            ease: "power2.inOut",
          });
        }
        if (hamburger?.parentNode) {
          gsap.to(hamburger, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: "power2.out",
            delay: 0.15,
          });
        }
      }

      tl.play();

      return () => {
        try {
          if (tl) tl.kill();
          if (hamburger) gsap.killTweensOf(hamburger);
          if (xIcon) gsap.killTweensOf(xIcon);
          if (menuText) gsap.killTweensOf(menuText);
        } catch {
          // noop
        }
      };
    } catch {
      // noop
    }
  }, [isMobileMenuOpen]);

  const handleMenuItemClick = (menuItem: string) => {
    setClickedMenuItem(menuItem);
    setIsMobileMenuOpen(false);
    setTimeout(() => setClickedMenuItem(null), 300);
  };

  const handleMenuToggle = () => {
    try {
      gsap.killTweensOf([
        hamburgerRef.current,
        xIconRef.current,
        menuTextRef.current,
      ]);
    } catch {
      // noop
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className={`flex justify-between items-center h-full w-full ${figtree.className}`}
      >
        {/* Spacer for balance (desktop: menu is centered) */}
        <div className="hidden 2xl:block w-[1px] flex-1" aria-hidden />

        {/* Desktop Menu - centered */}
        <div className="hidden 2xl:block absolute left-1/2 transform -translate-x-1/2">
          <Menu />
        </div>

        {/* Spacer: pushes mobile actions to the right when below 2xl */}
        <div className="flex-1 2xl:hidden" aria-hidden />

        {/* Desktop Actions */}
        <div className="hidden 2xl:flex items-center gap-4 flex-1 justify-end">
          <ThemeToggle />
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
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neutral-100/5 to-neutral-0/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
          <Link
            href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-200"
          >
            <FileText size={16} weight="regular" />
            My resume
          </Link>
          <Link href="/playground" className="shimmer-button">
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

        {/* Mobile Actions */}
        <div className="flex 2xl:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleMenuToggle}
            ref={menuToggleRef}
            className="mobile-menu-toggle text-sm inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-200"
          >
            <div className="relative w-4 h-4">
              <div
                ref={hamburgerRef}
                className="absolute inset-0 transition-all duration-300 ease-in-out"
              >
                <Equals
                  size={16}
                  weight="regular"
                  className="absolute inset-0 transition-all duration-300 ease-in-out"
                />
              </div>
              <div
                ref={xIconRef}
                className="absolute inset-0 transition-all duration-300 ease-in-out"
              >
                <X
                  size={16}
                  weight="regular"
                  className="absolute inset-0 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
            <span
              ref={menuTextRef}
              className="transition-all duration-300 ease-in-out"
            >
              {isMobileMenuOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Full Screen */}
      <div
        className={`mobile-menu 2xl:hidden fixed top-16 sm:top-20 xl:top-24 left-0 right-0 bottom-0 bg-neutral-0 dark:bg-[#060608] z-50 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4"
        }`}
      >
        <div className="flex flex-col h-full pt-4 pb-8 px-6">
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-8">
              <li>
                <Link
                  href="/"
                  className={`block text-4xl sm:text-5xl font-bold transition-all duration-200 ${
                    clickedMenuItem === "Work"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/"
                        ? "text-neutral-100 dark:text-neutral-0"
                        : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleMenuItemClick("Work")}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block text-4xl sm:text-5xl font-bold transition-all duration-200 ${
                    clickedMenuItem === "About"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/about"
                        ? "text-neutral-100 dark:text-neutral-0"
                        : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleMenuItemClick("About")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/archives"
                  className={`block text-4xl sm:text-5xl font-bold transition-all duration-200 ${
                    clickedMenuItem === "Archives"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/archives"
                        ? "text-neutral-100 dark:text-neutral-0"
                        : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleMenuItemClick("Archives")}
                >
                  Archives
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col space-y-4 pt-8 border-t border-neutral-20/20 dark:border-neutral-80/20">
            <Link
              href="https://www.linkedin.com/in/rasmus-mattsson/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-10/50 dark:bg-[#060608]/50 backdrop-blur-sm border border-neutral-20/20 dark:border-neutral-80/20 text-neutral-100 dark:text-neutral-0 hover:bg-neutral-20/50 dark:hover:bg-neutral-80/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="w-6 h-6 text-neutral-60 dark:text-neutral-40" />
              <span className="text-lg font-semibold">LinkedIn</span>
            </Link>
            <Link
              href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-10/50 dark:bg-[#060608]/50 backdrop-blur-sm border border-neutral-20/20 dark:border-neutral-80/20 text-neutral-100 dark:text-neutral-0 hover:bg-neutral-20/50 dark:hover:bg-neutral-80/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText size={24} weight="regular" className="text-neutral-60 dark:text-neutral-40" />
              <span className="text-lg font-semibold">My Resume</span>
            </Link>
            <Link
              href="/playground"
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LegoIcon weight="fill" className="w-6 h-6" />
              <span className="text-lg font-semibold">Playground</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
