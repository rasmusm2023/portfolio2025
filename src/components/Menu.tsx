"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";

const Menu = () => {
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "WORK", href: "/work" },
    { label: "DESIGN GALLERY", href: "/design-gallery" },
    { label: "ABOUT ME", href: "/about" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  const updatePillPosition = () => {
    const activeItem = menuRef.current?.querySelector('[data-active="true"]');
    const menu = menuRef.current;
    if (activeItem && pillRef.current && menu) {
      const { width, left } = activeItem.getBoundingClientRect();
      const menuLeft = menu.getBoundingClientRect().left;

      // Set initial position if not already set
      if (!pillRef.current.style.width) {
        gsap.set(pillRef.current, {
          width: width,
          x: left - menuLeft,
        });
      } else {
        // Animate to new position
        gsap.to(pillRef.current, {
          width: width,
          x: left - menuLeft,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  // Update position on mount and pathname change
  useEffect(() => {
    updatePillPosition();
  }, [pathname]);

  return (
    <nav className="flex items-center justify-center">
      <ul
        ref={menuRef}
        className="flex space-x-0 py-4 px-0 border border-neutral-80 rounded-full bg-neutral-100 relative"
      >
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+8px)] bg-accent-100 rounded-full"
          style={{
            top: "-4px",
            boxShadow: `0 0 15px ${withOpacity(colors.accent[100], 0.5)}`,
          }}
        />
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-active={isActive}
                className={`
                  relative
                  z-10
                  transition-all
                  duration-200
                  font-bold
                  text-md
                  tracking-wide
                  px-8
                  py-0
                  rounded-full
                  ${
                    isActive
                      ? "text-neutral-100"
                      : "text-neutral-40 hover:text-neutral-10"
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
