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
    { label: "HOME", href: "#home" },
    { label: "WORK", href: "#work" },
    { label: "DESIGN GALLERY", href: "#design-gallery" },
    { label: "ABOUT ME", href: "#about" },
    { label: "CONTACT", href: "#contact" },
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");

    if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState({}, "", href);
        setActiveSection(href.substring(1));
        movePill(href);
      }
    }
  };

  useEffect(() => {
    // Initialize pill position for the first item
    if (menuItems.length > 0) {
      movePill(menuItems[0].href);
    }
  }, []);

  useEffect(() => {
    const updateActiveItem = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const viewportMiddle = viewportHeight / 2;

      // Find which section is currently in view
      for (const item of menuItems) {
        const element = document.querySelector(item.href);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionMiddle = (sectionTop + sectionBottom) / 2;

        // Check if the section's middle point is in the viewport
        if (sectionMiddle >= 0 && sectionMiddle <= viewportHeight) {
          const sectionName = item.href.substring(1);
          if (sectionName !== activeSection) {
            setActiveSection(sectionName);
            movePill(item.href);
            window.history.replaceState(null, "", item.href);
          }
          break;
        }
      }
    };

    // Add scroll event listener with a more aggressive update rate
    let scrollTimeout: NodeJS.Timeout;
    const scrollHandler = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveItem, 50); // Update every 50ms
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    // Initial update
    updateActiveItem();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection]);

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
          const isActive = activeSection === item.href.substring(1);
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
