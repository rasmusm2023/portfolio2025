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
    { label: "HOME", href: "#home" },
    { label: "WORK", href: "#work" },
    { label: "DESIGN GALLERY", href: "#design-gallery" },
    { label: "ABOUT ME", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");

    if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL without page reload
        window.history.pushState({}, "", href);
      }
    }
  };

  useEffect(() => {
    const updateActiveItem = () => {
      const sections = menuItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let activeIndex = 0;
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            activeIndex = index;
          }
        }
      });

      const activeItem = menuRef.current?.querySelector(
        `[href="${menuItems[activeIndex].href}"]`
      );
      const menu = menuRef.current;

      if (activeItem && pillRef.current && menu) {
        const { width, left } = activeItem.getBoundingClientRect();
        const menuLeft = menu.getBoundingClientRect().left;

        gsap.to(pillRef.current, {
          width: width,
          x: left - menuLeft,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", updateActiveItem);
    updateActiveItem(); // Initial update

    return () => window.removeEventListener("scroll", updateActiveItem);
  }, []);

  return (
    <nav className="flex items-center justify-center">
      <ul
        ref={menuRef}
        className="flex space-x-0 py-2 px-0 border border-white/10 rounded-lg bg-neutral-0/10 backdrop-blur-sm relative"
      >
        <div
          ref={pillRef}
          className="absolute h-[calc(100%+4px)] bg-accent-100 rounded-lg"
          style={{
            top: "-2px",
            boxShadow: `0 0 12px ${withOpacity(colors.accent[100], 0.4)}`,
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
                onClick={handleClick}
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
