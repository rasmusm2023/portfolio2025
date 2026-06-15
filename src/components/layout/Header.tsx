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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState<string>("");
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const xIconRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const lenis = useLenis((instance) => setScrollY(instance.scroll));

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
    if (!aboutSection || !contactSection || typeof window === "undefined")
      return;
    const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;
    const contactTop = contactSection.getBoundingClientRect().top + scrollY;
    const contactRect = contactSection.getBoundingClientRect();
    const isContactInView =
      contactRect.top < window.innerHeight && contactRect.bottom > 0;
    const isAtBottom =
      scrollY >=
      document.documentElement.scrollHeight - window.innerHeight - 50;
    // Earlier detection for About Me (0.6 viewport) so it activates before you reach the section
    const aboutTrigger = scrollY + window.innerHeight * 0.6;
    const contactTrigger = scrollY + window.innerHeight * 0.3;
    if (contactTrigger >= contactTop || isContactInView || isAtBottom)
      setActiveHash("contact");
    else if (aboutTrigger >= aboutTop) setActiveHash("about-me");
    else setActiveHash("");
  }, [pathname, scrollY]);

  // Scroll to section when landing on / with a hash (e.g. /#about-me or /#contact)
  const hasScrolledToHash = useRef(false);
  useEffect(() => {
    if (pathname !== "/") {
      hasScrolledToHash.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    const hash = window.location.hash?.slice(1);
    if (!hash || (hash !== "about-me" && hash !== "contact")) return;
    if (hasScrolledToHash.current) return;
    hasScrolledToHash.current = true;
    const timeout = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        if (lenis) lenis.scrollTo(element, { offset: 0 });
        else element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, [pathname, lenis]);

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
        "-=0.1",
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
    <header className="fixed top-0 left-0 right-0 z-[60] h-12 sm:h-14 xl:h-16">
      {/* Background Layer - always solid, never see-through */}
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a]" />

      {/* Content Layer */}
      <div
        className={`relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] h-full ${hanken.className}`}
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
              className="h-4 sm:h-5 xl:h-6 dark:block hidden"
            />
            <img
              src="/assets/logos/rm/rm-logo-portfolio-dark.svg"
              alt="Logo"
              className="h-4 sm:h-5 xl:h-6 block dark:hidden"
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
                className="text-sm tabular-nums text-neutral-500 dark:text-neutral-40 whitespace-nowrap"
                aria-label={`Stockholm time ${stockholmTime.zone} ${stockholmTime.time}`}
              >
                <span className="font-medium text-neutral-600 dark:text-neutral-50">
                  {stockholmTime.zone}
                </span>
                <span className="ml-1">{stockholmTime.time}</span>
              </span>
            )}
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* CV Button */}
            <Link
              href="https://drive.google.com/file/d/1M6ZNOPVbQJS9gK_46T3-ceFOe_YIpMVg/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-200"
            >
              <FileText size={16} weight="regular" />
              CV
            </Link>

            {/* Playground Button - same style as CV, icon only centered by default, expands on hover with icon left */}
            <Link
              href="/playground"
              className="group text-sm inline-flex items-center justify-center group-hover:justify-start gap-2 py-2 px-2 group-hover:px-4 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-lg transition-all duration-500 ease-in-out"
            >
              <LegoIcon
                weight="fill"
                className="w-5 h-5 fill-current shrink-0"
              />
              <span className="max-w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100">
                Playground
              </span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex 2xl:hidden items-center gap-2">
            {stockholmTime.time && (
              <span
                className="text-xs sm:text-sm tabular-nums text-neutral-500 dark:text-neutral-40 whitespace-nowrap"
                aria-label={`Stockholm time ${stockholmTime.zone} ${stockholmTime.time}`}
              >
                <span className="font-medium text-neutral-600 dark:text-neutral-50">
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
        className={`mobile-menu 2xl:hidden fixed top-12 sm:top-14 xl:top-16 left-0 right-0 bottom-0 bg-neutral-0 dark:bg-[#060608] z-50 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4"
        }`}
      >
        <div className="flex flex-col h-full pt-4 pb-8 px-6">
          {/* Mobile Menu Items */}
          <nav
            className={`flex-1 flex flex-col justify-center ${figtree.className}`}
          >
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
                      : pathname === "/works" ||
                          pathname.startsWith("/case-studies")
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
                    clickedMenuItem === "About Me"
                      ? "text-purple-500 dark:text-purple-400 scale-95"
                      : pathname === "/" && activeHash === "about-me"
                        ? "text-neutral-100 dark:text-neutral-0"
                        : "text-neutral-40 dark:text-neutral-60 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick("About Me");
                    setIsMobileMenuOpen(false);

                    // If we're on the home page, scroll to the section
                    if (pathname === "/") {
                      setTimeout(() => {
                        const element = document.getElementById("about-me");
                        if (element) {
                          if (lenis) lenis.scrollTo(element, { offset: 0 });
                          else
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }
                      }, 100);
                    } else {
                      // If we're on a different page, navigate to home first
                      window.location.href = "/#about-me";
                    }
                  }}
                >
                  About me
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
                          else
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
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

            {/* CV Button */}
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
              <span className="text-lg font-semibold">CV</span>
            </Link>

            {/* Playground Button - same style as CV */}
            <Link
              href="/playground"
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-10/50 dark:bg-[#060608]/50 backdrop-blur-sm border border-neutral-20/20 dark:border-neutral-80/20 text-neutral-100 dark:text-neutral-0 hover:bg-neutral-20/50 dark:hover:bg-neutral-80/50 transition-all duration-200"
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
