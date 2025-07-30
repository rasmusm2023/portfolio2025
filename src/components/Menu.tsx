"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";

const Menu = () => {
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const isInitialized = useRef(false);

  const menuItems = [
    { label: "Home", href: "/" },

    { label: "Design Gallery", href: "/design-gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

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

  useEffect(() => {
    // Set active section based on current pathname
    const currentPath = pathname === "/" ? "home" : pathname.substring(1);
    setActiveSection(currentPath);

    // Move pill to active item
    const activeItem = menuItems.find((item) => item.href === pathname);
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
    }
  }, [pathname, movePill]);

  return (
    <nav className="flex items-center justify-center">
      <ul ref={menuRef} className="flex space-x-0 py-2 px-0 relative">
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+4px)] bg-neutral-0 rounded-lg -z-10"
          style={{
            top: "-2px",
            left: "0",
            width: "0",
            boxShadow: `0 0 12px ${withOpacity(colors.neutral[0], 0.4)}`,
          }}
        />
        {menuItems.map((item) => {
          const isActive =
            activeSection ===
            (item.href === "/" ? "home" : item.href.substring(1));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  relative
                  z-10
                  transition-all
                  duration-200
                  font-bold
                  text-base
                  tracking-wide
                  px-8
                  py-4
                  rounded-full
                  ${
                    isActive
                      ? "text-neutral-100"
                      : "text-neutral-40 hover:text-neutral-0"
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
