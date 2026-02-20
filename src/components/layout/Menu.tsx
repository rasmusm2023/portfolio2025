"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";
import { useTheme } from "@/contexts/ThemeContext";

interface MenuItem {
  label: string;
  href: string;
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
      { label: "About", href: "/#about-me" },
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

  // Scroll detection for sections on home-v2 page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const aboutSection = document.getElementById("about-me");
    const contactSection = document.getElementById("contact");

    if (!aboutSection || !contactSection) return;

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3; // 30% from top of viewport
      const aboutTop = aboutSection.offsetTop;
      const contactTop = contactSection.offsetTop;

      // Determine which section is currently in view
      if (scrollPosition >= contactTop) {
        setActiveHash("contact");
      } else if (scrollPosition >= aboutTop) {
        setActiveHash("about-me");
      } else {
        setActiveHash(""); // Home section
      }
    };

    // Check initial position
    setTimeout(checkActiveSection, 100);

    // Listen to scroll events
    window.addEventListener("scroll", checkActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkActiveSection);
    };
  }, [pathname]);

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
    <nav className="flex items-center justify-center">
      <ul ref={menuRef} className="flex space-x-0 py-2 px-0 relative">
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+4px)] bg-neutral-90 dark:bg-neutral-0 rounded-full -z-10"
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
          } else {
            isActive = item.href === pathname;
          }
          const isHashLink = item.href.includes("#");

          const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isHashLink) {
              e.preventDefault();
              const hash = item.href.split("#")[1];
              
              // If we're on the home page, scroll to the section
              if (pathname === "/") {
                const element = document.getElementById(hash);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              } else {
                // If we're on a different page, navigate to home first, then scroll
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
                  font-bold
                  text-sm
                  xl:text-base
                  tracking-wide
                  px-4
                  sm:px-6
                  xl:px-8
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
