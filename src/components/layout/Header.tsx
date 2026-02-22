"use client";

import Link from "next/link";
import Menu from "./Menu";
import { LegoIcon, FileText, List, X, Equals } from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import { figtree } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

/** Stockholm time; Europe/Stockholm follows Swedish DST (CET/CEST) automatically */
function useStockholmTime(): { time: string; zone: string } {
  const [display, setDisplay] = useState({ time: "", zone: "" });
  useEffect(() => {
    const format = () => {
      const date = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Stockholm",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      });
      const parts = formatter.formatToParts(date);
      let hour = "";
      let minute = "";
      let second = "";
      let zone = "";
      for (const p of parts) {
        if (p.type === "hour") hour = p.value;
        else if (p.type === "minute") minute = p.value;
        else if (p.type === "second") second = p.value;
        else if (p.type === "timeZoneName") zone = p.value; // "CET" or "CEST"
      }
      setDisplay({
        time: `${hour}:${minute}:${second}`,
        zone,
      });
    };
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);
  return display;
}

const Header = () => {
  const pathname = usePathname();
  const stockholmTime = useStockholmTime();
  const [showBackground, setShowBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState<string>("");
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const xIconRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrollY, setScrollY] = useState(0);
  const lenis = useLenis((instance) => {
    setScrollY(instance.scroll);
    setShowBackground(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setShowBackground(false), 1500);
  });

  useEffect(() => {
    if (lenis) return;
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
  }, [lenis]);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // When Lenis is inactive, sync scrollY from window
  useEffect(() => {
    if (lenis) return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }
    const aboutSection = document.getElementById("about-me");
    const contactSection = document.getElementById("contact");
    if (!aboutSection || !contactSection) return;
    const scrollPosition = scrollY + (typeof window !== "undefined" ? window.innerHeight * 0.3 : 0);
    const aboutTop = aboutSection.offsetTop;
    const contactTop = contactSection.offsetTop;
    if (scrollPosition >= contactTop) setActiveHash("contact");
    else if (scrollPosition >= aboutTop) setActiveHash("about-me");
    else setActiveHash("");
  }, [pathname, scrollY]);

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      // Ensure all GSAP animations are killed on unmount
      gsap.killTweensOf("*");
      // Reset body styles
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, []);

  // Disable scroll when mobile menu is open
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

  // GSAP animations for menu toggle
  useEffect(() => {
    try {
      // Store refs in variables to avoid null checks during cleanup
      const menuToggle = menuToggleRef.current;
      const menuText = menuTextRef.current;
      const hamburger = hamburgerRef.current;
      const xIcon = xIconRef.current;

      if (!menuToggle || !menuText || !hamburger || !xIcon) return;

      // Kill any existing animations first
      gsap.killTweensOf([hamburger, xIcon, menuText]);

      const tl = gsap.timeline({ paused: true });

      // Text animation with safer DOM manipulation
      tl.to(menuText, {
        duration: 0.2,
        opacity: 0,
        y: -10,
        ease: "power2.inOut",
        onComplete: () => {
          // Only update innerHTML if element still exists
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

      // Icon morphing animation with null checks
      if (isMobileMenuOpen) {
        // Morph to X
        if (hamburger && hamburger.parentNode) {
          gsap.to(hamburger, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            rotation: 90,
            ease: "power2.inOut",
          });
        }
        if (xIcon && xIcon.parentNode) {
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
        // Morph back to hamburger
        if (xIcon && xIcon.parentNode) {
          gsap.to(xIcon, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            rotation: -90,
            ease: "power2.inOut",
          });
        }
        if (hamburger && hamburger.parentNode) {
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

      // Play text animation
      tl.play();

      // Cleanup function
      return () => {
        try {
          if (tl) tl.kill();
          if (hamburger) gsap.killTweensOf(hamburger);
          if (xIcon) gsap.killTweensOf(xIcon);
          if (menuText) gsap.killTweensOf(menuText);
        } catch (error) {
          console.warn("Error during GSAP cleanup:", error);
        }
      };
    } catch (error) {
      console.warn("Error during GSAP animation setup:", error);
    }
  }, [isMobileMenuOpen]);

  const handleMenuItemClick = (menuItem: string) => {
    setClickedMenuItem(menuItem);
    setIsMobileMenuOpen(false);

    // Reset click state after animation
    setTimeout(() => {
      setClickedMenuItem(null);
    }, 300);
  };

  const handleMenuToggle = () => {
    // Kill any existing animations before toggling
    try {
      gsap.killTweensOf([
        hamburgerRef.current,
        xIconRef.current,
        menuTextRef.current,
      ]);
    } catch (error) {
      console.warn("Error killing GSAP animations:", error);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] h-16 sm:h-20 xl:h-24">
      {/* Background Layer */}
      <div
        className={`absolute inset-0 transition-all duration-1000 mobile-header-bg xl:bg-transparent ${
          showBackground ? "xl:bg-white/80 xl:dark:bg-[#0a0a0a]/80" : ""
        }`}
      />

      {/* Content Layer */}
      <div
        className={`relative z-10 px-4 sm:px-6 xl:px-12 h-full ${hanken.className}`}
      >
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

          {/* Desktop Menu */}
          <div className="hidden 2xl:block absolute left-1/2 transform -translate-x-1/2">
            <Menu />
          </div>

          {/* Desktop Actions */}
          <div className="hidden 2xl:flex items-center gap-4">
            {/* Stockholm time (CET/CEST updates automatically with Swedish summer time) */}
            {stockholmTime.time && (
              <span
                className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400 whitespace-nowrap"
                aria-label={`Stockholm time ${stockholmTime.zone} ${stockholmTime.time}`}
              >
                <span className="font-medium text-neutral-600 dark:text-neutral-500">
                  {stockholmTime.zone}
                </span>
                <span className="ml-1">{stockholmTime.time}</span>
              </span>
            )}
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
              href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-200"
            >
              <FileText size={16} weight="regular" />
              My resume
            </Link>

            {/* Playground Button */}
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
            {stockholmTime.time && (
              <span
                className="text-xs sm:text-sm tabular-nums text-neutral-500 dark:text-neutral-400 whitespace-nowrap"
                aria-label={`Stockholm time ${stockholmTime.zone} ${stockholmTime.time}`}
              >
                <span className="font-medium text-neutral-600 dark:text-neutral-500">
                  {stockholmTime.zone}
                </span>
                <span className="ml-0.5 sm:ml-1">{stockholmTime.time}</span>
              </span>
            )}
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
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
          {/* Mobile Menu Items */}
          <nav className={`flex-1 flex flex-col justify-center ${figtree.className}`}>
            <ul className="space-y-8">
              <li>
                <Link
                  href="/"
                  className={`block text-3xl sm:text-4xl font-semibold uppercase transition-all duration-200 ${
                    clickedMenuItem === "Home"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/" && activeHash === ""
                      ? "text-neutral-100 dark:text-neutral-0"
                      : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleMenuItemClick("Home")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/works"
                  className={`block text-3xl sm:text-4xl font-semibold uppercase transition-all duration-200 ${
                    clickedMenuItem === "Works"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/works"
                      ? "text-neutral-100 dark:text-neutral-0"
                      : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleMenuItemClick("Works")}
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#about-me"
                  className={`block text-3xl sm:text-4xl font-semibold uppercase transition-all duration-200 ${
                    clickedMenuItem === "About"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/" && activeHash === "about-me"
                      ? "text-neutral-100 dark:text-neutral-0"
                      : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick("About");
                    setIsMobileMenuOpen(false);
                    
                    // If we're on the home page, scroll to the section
                    if (pathname === "/") {
                      setTimeout(() => {
                        const element = document.getElementById("about-me");
                        if (element) {
                          if (lenis) lenis.scrollTo(element, { offset: 0 });
                          else element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 100);
                    } else {
                      // If we're on a different page, navigate to home first
                      window.location.href = "/#about-me";
                    }
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className={`block text-3xl sm:text-4xl font-semibold uppercase transition-all duration-200 ${
                    clickedMenuItem === "Contact"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/" && activeHash === "contact"
                      ? "text-neutral-100 dark:text-neutral-0"
                      : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick("Contact");
                    setIsMobileMenuOpen(false);
                    
                    // If we're on the home page, scroll to the section
                    if (pathname === "/") {
                      setTimeout(() => {
                        const element = document.getElementById("contact");
                        if (element) {
                          if (lenis) lenis.scrollTo(element, { offset: 0 });
                          else element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 100);
                    } else {
                      // If we're on a different page, navigate to home first
                      window.location.href = "/#contact";
                    }
                  }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/archives"
                  className={`block text-3xl sm:text-4xl font-semibold uppercase transition-all duration-200 ${
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

          {/* Mobile Action Buttons */}
          <div className="flex flex-col space-y-4 pt-8 border-t border-neutral-20/20 dark:border-neutral-80/20">
            {/* LinkedIn Button */}
            <Link
              href="https://www.linkedin.com/in/rasmus-mattsson/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-10/50 dark:bg-[#060608]/50 backdrop-blur-sm border border-neutral-20/20 dark:border-neutral-80/20 text-neutral-100 dark:text-neutral-0 hover:bg-neutral-20/50 dark:hover:bg-neutral-80/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="w-6 h-6 text-neutral-60 dark:text-neutral-40"
              />
              <span className="text-lg font-semibold">LinkedIn</span>
            </Link>

            {/* My Resume Button */}
            <Link
              href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-10/50 dark:bg-[#060608]/50 backdrop-blur-sm border border-neutral-20/20 dark:border-neutral-80/20 text-neutral-100 dark:text-neutral-0 hover:bg-neutral-20/50 dark:hover:bg-neutral-80/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText
                size={24}
                weight="regular"
                className="text-neutral-60 dark:text-neutral-40"
              />
              <span className="text-lg font-semibold">My Resume</span>
            </Link>

            {/* Playground Button */}
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
    </header>
  );
};

export default Header;
