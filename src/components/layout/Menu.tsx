"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { figtree } from "@/app/fonts";
import { useLenis } from "lenis/react";
import { scrollToContactAndOpenForm } from "@/lib/contactForm";

interface MenuItem {
  label: string;
  href: string;
}

function isWorksRoute(pathname: string) {
  return pathname === "/works" || pathname.startsWith("/case-studies");
}

const Menu = () => {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const pillRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeHash, setActiveHash] = useState<string>("");
  const isInitialized = useRef(false);

  const menuItems = useMemo<MenuItem[]>(
    () => [
      { label: "Home", href: "/" },
      { label: "Works", href: "/works" },
      { label: "About Me", href: "/#about-me" },
      { label: "Contact", href: "/#contact" },
      { label: "Archives", href: "/archives" },
    ],
    []
  );

  const movePill = useCallback((href: string) => {
    const activeItem = menuRef.current?.querySelector(`[href="${href}"]`);
    const menu = menuRef.current;

    if (activeItem && pillRef.current && menu) {
      const { width, left } = activeItem.getBoundingClientRect();
      const menuLeft = menu.getBoundingClientRect().left;

      // Use a faster animation for better performance
      gsap.to(pillRef.current, {
        width: width,
        x: left - menuLeft,
        duration: 0.15, // Reduced from 0.2
        ease: "power1.out", // Lighter easing
      });
    }
  }, []);

  // Get the appropriate shadow color based on theme
  const getShadowColor = () => {
    return isDark
      ? withOpacity(colors.neutral[0], 0.4)
      : withOpacity(colors.neutral[100], 0.4);
  };

  // Scroll position from Lenis or window (for section detection)
  const [scrollY, setScrollY] = useState(0);
  const lenis = useLenis((instance) => setScrollY(instance.scroll));
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
    if (!aboutSection || !contactSection || typeof window === "undefined") return;
    const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;
    const contactTop = contactSection.getBoundingClientRect().top + scrollY;
    const contactRect = contactSection.getBoundingClientRect();
    const isContactInView = contactRect.top < window.innerHeight && contactRect.bottom > 0;
    const isAtBottom = scrollY >= document.documentElement.scrollHeight - window.innerHeight - 50;
    // Earlier detection for About Me (0.6 viewport) so it activates before you reach the section
    const aboutTrigger = scrollY + window.innerHeight * 0.6;
    const contactTrigger = scrollY + window.innerHeight * 0.3;
    if (contactTrigger >= contactTop || isContactInView || isAtBottom) setActiveHash("contact");
    else if (aboutTrigger >= aboutTop) setActiveHash("about-me");
    else setActiveHash("");
  }, [pathname, scrollY]);

  useEffect(() => {
    // Set active section based on current pathname
    const currentPath = pathname === "/" ? "home" : pathname.substring(1);
    setActiveSection(currentPath);

    // Determine which menu item should be active
    let activeHref = "";
    
    if (pathname === "/") {
      if (activeHash === "about-me") {
        activeHref = "/#about-me";
      } else if (activeHash === "contact") {
        activeHref = "/#contact";
      } else {
        activeHref = "/"; // Default to Home when on home but not in a specific section
      }
    } else if (isWorksRoute(pathname)) {
      activeHref = "/works";
    } else {
      activeHref = pathname;
    }

    // Move pill to active item
    const activeItem = menuItems.find((item) => item.href === activeHref || (pathname === "/" && activeHash === "" && item.href === "/"));

    if (activeItem) {
      // Skip animation on first load for better performance
      if (!isInitialized.current) {
        isInitialized.current = true;
        // Set initial position without animation
        const activeItemElement = menuRef.current?.querySelector(
          `[href="${activeItem.href}"]`
        );
        const menu = menuRef.current;
        if (activeItemElement && pillRef.current && menu) {
          const { width, left } = activeItemElement.getBoundingClientRect();
          const menuLeft = menu.getBoundingClientRect().left;
          gsap.set(pillRef.current, {
            width: width,
            x: left - menuLeft,
          });
        }
      } else {
        movePill(activeItem.href);
      }
    } else {
      // Hide pill when no active item
      if (pillRef.current) {
        gsap.set(pillRef.current, {
          width: 0,
          x: 0,
        });
      }
    }
  }, [pathname, movePill, menuItems, activeHash]);

  return (
    <nav className={`flex items-center justify-center ${figtree.className}`}>
      <ul ref={menuRef} className="flex space-x-0 py-2 px-0 relative">
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+4px)] bg-neutral-90 dark:bg-neutral-0 rounded-lg -z-10"
          style={{
            top: "-2px",
            left: "0px",
            width: "0px",
            boxShadow: `0 0 12px ${getShadowColor()}`,
          }}
        />
        {menuItems.map((item) => {
          // Determine if item is active based on pathname and active hash
          let isActive = false;
          if (pathname === "/") {
            if (activeHash === "about-me" && item.href === "/#about-me") {
              isActive = true;
            } else if (activeHash === "contact" && item.href === "/#contact") {
              isActive = true;
            } else if (activeHash === "" && item.href === "/") {
              isActive = true; // Home is active when on home but not in a specific section
            }
          } else if (item.href === "/works") {
            isActive = isWorksRoute(pathname);
          } else {
            isActive = item.href === pathname;
          }
          const isHashLink = item.href.includes("#");

          const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isHashLink) {
              e.preventDefault();
              const hash = item.href.split("#")[1];

              if (hash === "contact") {
                scrollToContactAndOpenForm(
                  lenis as Parameters<typeof scrollToContactAndOpenForm>[0]
                );
                return;
              }

              // about-me exists on the home page only
              if (pathname === "/") {
                const element = document.getElementById(hash);
                if (element) {
                  if (lenis) lenis.scrollTo(element, { offset: 0 });
                  else
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }
              } else {
                window.location.href = item.href;
              }
            }
          };

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={handleClick}
                className={`
                  relative
                  z-10
                  transition-all
                  duration-200
                  font-semibold
                  text-xs
                  xl:text-sm
                  tracking-wide
                  uppercase
                  px-3
                  sm:px-4
                  xl:px-5
                  py-3
                  xl:py-4
                  rounded-full
                  ${
                    isActive
                      ? "text-neutral-0 dark:text-neutral-100"
                      : "text-neutral-60 dark:text-neutral-40 hover:text-neutral-100 dark:hover:text-neutral-0"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
