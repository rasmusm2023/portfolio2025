"use client";

import { useState } from "react";
import { colors } from "@/styles/colors";

// Custom Floating Label Input Component
function FloatingLabelInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
  isTextarea = false,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(e.target.value.length > 0);
  };

  const isActive = isFocused || hasValue;

  if (isTextarea) {
    return (
      <div className="relative">
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200 resize-none"
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
              : "top-3 text-base text-neutral-40"
          }`}
        >
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-4 py-4 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
          isActive
            ? "-top-2 text-sm text-white font-medium bg-purple-600 rounded-lg"
            : "top-1/2 -translate-y-1/2 text-base text-neutral-40"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@rasmusmattsson.com");
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  return (
    <>
      {/* Contact Section with Noise Background */}
      <section className="py-16 relative">
        {/* Noise background overlay */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none rounded-[2.5rem] overflow-hidden px-12 sm:px-16 md:px-24 lg:px-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />
        <div className="text-left w-full max-w-[1200px] mx-auto p-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form - Redesigned */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-5xl font-bold text-neutral-0 mb-4 font-hanken">
                  Let's have a chat 💬
                </h3>
                <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                  I'm always excited to discuss new opportunities and
                  possibilities.
                </p>
              </div>

              <div className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-3xl p-6">
                <form
                  action="mailto:hello@rasmusmattsson.com?subject=Project Inquiry from Portfolio"
                  method="post"
                  encType="text/plain"
                  className="space-y-6"
                >
                  <FloatingLabelInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                  />

                  <FloatingLabelInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />

                  <FloatingLabelInput
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                  />

                  <FloatingLabelInput
                    id="message"
                    name="message"
                    placeholder="Message"
                    required
                    rows={4}
                    isTextarea
                  />

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information - Redesigned */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-5xl font-bold text-neutral-50 mb-4 font-hanken">
                  Get in touch
                </h3>
                <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                  Here are the best ways to get in touch with me.
                </p>
              </div>

              <div className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-3xl p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 rounded-xl hover:border-purple-500/20 transition-all duration-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-0 font-semibold mb-1 text-lg">
                        Email
                      </h4>
                      <a
                        href="mailto:hello@rasmusmattsson.com"
                        className={`transition-colors duration-200 text-base cursor-pointer hover:opacity-90 ${
                          emailCopied
                            ? "text-green-500"
                            : "text-neutral-60 hover:text-neutral-0"
                        }`}
                      >
                        hello@rasmusmattsson.com
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyEmail}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          emailCopied
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 hover:shadow-lg"
                        }`}
                      >
                        {emailCopied ? "Copied!" : "Copy email"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 rounded-xl hover:border-purple-500/20 transition-all duration-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-0 font-semibold mb-1 text-lg">
                        LinkedIn
                      </h4>
                      <a
                        href="https://linkedin.com/in/rasmus-mattsson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200 text-base"
                      >
                        linkedin.com/in/rasmus-mattsson
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content - Inside Noise Background */}
          <div className="mt-24 pt-16 border-t border-neutral-100/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D] to-[#ED7DFF] flex items-center justify-center">
                    <span className="text-sm font-bold text-white">RM</span>
                  </div>
                  <span className="text-xl font-bold text-neutral-0">
                    Rasmus Mattsson
                  </span>
                </div>
                <p className="text-neutral-60 text-sm leading-relaxed max-w-xs">
                  UX/UI Designer & Low-code Developer crafting digital
                  experiences that bridge creativity with technology.
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
        </div>
      </section>
    </>
  );
};

export default Footer;
