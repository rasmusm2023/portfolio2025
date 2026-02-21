"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { figtree } from "@/app/fonts";

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
  const [activeHref, setActiveHref] = useState<string>("/");
  const isInitialized = useRef(false);

  const menuItems = useMemo<MenuItem[]>(
    () => [
      { label: "Work", href: "/" },
      { label: "About", href: "/about" },
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

  useEffect(() => {
    // Set active section and href based on pathname
    const currentPath = pathname === "/" ? "home" : pathname.substring(1);
    setActiveSection(currentPath);
    const href = pathname === "/" ? "/" : pathname;
    setActiveHref(href);

    // Move pill to active item
    const activeItem = menuItems.find((item) => item.href === href);

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
  }, [pathname, movePill, menuItems]);

  return (
    <nav className={`flex items-center justify-center ${figtree.className}`}>
      <ul ref={menuRef} className="flex space-x-0 py-1.5 px-0 relative">
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+2px)] bg-neutral-90 dark:bg-neutral-0 rounded-full -z-10"
          style={{
            top: "-1px",
            left: "0px",
            width: "0px",
            boxShadow: `0 0 12px ${getShadowColor()}`,
          }}
        />
        {menuItems.map((item) => {
          const isActive = item.href === activeHref;
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
                  font-semibold
                  text-sm
                  xl:text-base
                  tracking-wide
                  px-3
                  sm:px-4
                  xl:px-6
                  py-2
                  xl:py-2.5
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
