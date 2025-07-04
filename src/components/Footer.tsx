"use client";

import { colors } from "@/styles/colors";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-neutral-100/10 bg-neutral-100/5 backdrop-blur-sm">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1ab182] to-[#ED7DFF] flex items-center justify-center">
                <span className="text-sm font-bold text-white">RM</span>
              </div>
              <span className="text-xl font-bold text-neutral-0">
                Rasmus Mattsson
              </span>
            </div>
            <p className="text-neutral-60 text-sm leading-relaxed max-w-xs">
              UX/UI Designer & Low-code Developer crafting digital experiences
              that bridge creativity with technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-neutral-0 font-semibold text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/work"
                  className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-neutral-0 font-semibold text-lg">
              Get in Touch
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:hello@rasmusmattsson.com"
                className="block text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
              >
                hello@rasmusmattsson.com
              </a>
              <a
                href="https://linkedin.com/in/rasmus-mattsson"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/rasmusmattsson"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
