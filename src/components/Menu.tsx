"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { colors, withOpacity } from "@/styles/colors";

const Menu = () => {
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "WORK", href: "/work" },
    { label: "DESIGN GALLERY", href: "/design-gallery" },
    { label: "ABOUT ME", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const movePill = (href: string) => {
    const activeItem = menuRef.current?.querySelector(`[href="${href}"]`);
    const menu = menuRef.current;

    if (activeItem && pillRef.current && menu) {
      const { width, left } = activeItem.getBoundingClientRect();
      const menuLeft = menu.getBoundingClientRect().left;

      gsap.to(pillRef.current, {
        width: width,
        x: left - menuLeft,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    // Set active section based on current pathname
    const currentPath = pathname === "/" ? "home" : pathname.substring(1);
    setActiveSection(currentPath);

    // Move pill to active item
    const activeItem = menuItems.find((item) => item.href === pathname);
    if (activeItem) {
      movePill(activeItem.href);
    }
  }, [pathname]);

  return (
    <nav className="flex items-center justify-center">
      <ul
        ref={menuRef}
        className="flex space-x-0 py-2 px-0 border border-white/10 rounded-lg bg-neutral-0/20 backdrop-blur-sm relative"
      >
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+4px)] bg-[#00FF9D] rounded-lg -z-10"
          style={{
            top: "-2px",
            left: "0",
            width: "0",
            boxShadow: `0 0 12px ${withOpacity(colors.accent[100], 0.4)}`,
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
                  font-semibold
                  text-sm
                  tracking-wide
                  px-8
                  py-0
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
