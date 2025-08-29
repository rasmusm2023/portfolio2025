"use client";

import { useState } from "react";
import {
  Copy,
  FileText,
  Envelope,
  User,
  ArrowsOutCardinal,
} from "@phosphor-icons/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
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
  const [isResizing, setIsResizing] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(rows * 24); // Approximate height based on rows

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTextarea) return;
    e.preventDefault();
    setIsResizing(true);

    const startY = e.clientY;
    const startHeight = textareaHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const newHeight = Math.max(rows * 24, startHeight + deltaY); // Minimum height
      setTextareaHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
          style={{ height: `${textareaHeight}px` }}
          className="w-full px-4 py-4 pr-12 bg-neutral-20/50 dark:bg-neutral-80/50 border border-neutral-30/20 dark:border-neutral-100/20 rounded-xl text-neutral-100 dark:text-neutral-0 text-base font-bold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200 resize-none"
          placeholder={placeholder}
        />
        <div
          className="absolute bottom-2 right-2 cursor-nw-resize opacity-50 hover:opacity-100 transition-opacity duration-200"
          onMouseDown={handleMouseDown}
        >
          <ArrowsOutCardinal
            size={16}
            className="text-neutral-60 dark:text-neutral-40"
          />
        </div>
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-neutral-0 font-bold bg-purple-600 rounded-lg"
              : "top-3 text-base text-neutral-60 dark:text-neutral-40 font-bold"
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
        className="w-full px-4 py-4 bg-neutral-20/50 dark:bg-neutral-80/50 border border-neutral-30/20 dark:border-neutral-100/20 rounded-xl text-neutral-100 dark:text-neutral-0 text-base font-bold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
          isActive
            ? "-top-2 text-sm text-neutral-0 font-bold bg-purple-600 rounded-lg"
            : "top-1/2 -translate-y-1/2 text-base text-neutral-60 dark:text-neutral-40 font-bold"
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
      <section className="py-12 sm:py-14 md:py-16 relative">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-[2.5rem] p-[1px] overflow-hidden">
          <div
            className="absolute inset-0 rounded-[2.5rem]"
            style={{
              background:
                "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.2), rgba(192, 132, 252, 0.3), rgba(139, 92, 246, 0.3))",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 4s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-[1px] rounded-[2.5rem] bg-neutral-0 dark:bg-neutral-100"></div>
        </div>

        {/* Noise background overlay */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none rounded-[2.5rem] overflow-hidden px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />
        <div className="text-left w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Contact Form - Redesigned */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100 dark:text-neutral-0 mb-4 font-hanken">
                  Let's have a chat 💬
                </h3>
                <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                  I'm always excited to discuss new opportunities and
                  possibilities.
                </p>
              </div>

              <div className="bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-100/10 rounded-3xl p-4 sm:p-6">
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
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-70 dark:text-neutral-50 mb-4 font-hanken">
                  Get in touch
                </h3>
                <p className="text-neutral-60 text-base font-normal leading-relaxed tracking-wide">
                  Here are the best ways to get in touch with me.
                </p>
              </div>

              <div className="bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-100/10 rounded-3xl p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 xl:gap-4 p-4 xl:p-6 rounded-xl hover:border-purple-500/20 transition-all duration-200">
                    <div className="flex items-center gap-3 xl:gap-4">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                        <Envelope
                          size={20}
                          weight="regular"
                          className="text-white xl:w-6 xl:h-6"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-100 dark:text-neutral-10 font-semibold mb-1 text-lg">
                          Email
                        </h4>
                        <a
                          href="mailto:hello@rasmusmattsson.com"
                          className={`transition-colors duration-200 text-base cursor-pointer hover:opacity-90 ${
                            emailCopied
                              ? "text-green-500"
                              : "text-neutral-60 hover:text-neutral-100 dark:hover:text-neutral-0"
                          }`}
                        >
                          hello@rasmusmattsson.com
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-start xl:justify-end w-full xl:w-auto">
                      <button
                        onClick={handleCopyEmail}
                        className={`w-full xl:w-auto px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center xl:justify-start gap-2 ${
                          emailCopied
                            ? "bg-green-500 text-neutral-0 shadow-lg"
                            : "bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40"
                        }`}
                      >
                        <Copy size={16} weight="regular" />
                        {emailCopied ? "Copied!" : "Copy email"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 xl:gap-4 p-4 xl:p-6 rounded-xl hover:border-purple-500/20 transition-all duration-200">
                    <div className="flex items-center gap-3 xl:gap-4">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="w-5 h-5 xl:w-6 xl:h-6 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-100 dark:text-neutral-10 font-semibold mb-1 text-lg">
                          LinkedIn
                        </h4>
                        <a
                          href="https://linkedin.com/in/rasmus-mattsson"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-60 hover:text-neutral-100 dark:hover:text-neutral-0 transition-colors duration-200 text-base"
                        >
                          linkedin.com/in/rasmus-mattsson
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-start xl:justify-end w-full xl:w-auto">
                      <a
                        href="https://linkedin.com/in/rasmus-mattsson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full xl:w-auto px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center xl:justify-start gap-2 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40"
                      >
                        <User size={16} weight="regular" />
                        See profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content - Inside Noise Background */}
          <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-20/10 dark:border-neutral-100/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.6)] animate-pulse">
                    <span className="text-sm font-bold text-white"></span>
                  </div>
                  <span className="text-xl font-bold text-neutral-70 dark:text-neutral-30">
                    Rasmus Mattsson
                  </span>
                </div>
                <p className="text-neutral-60 text-base leading-relaxed max-w-md font-medium">
                  UX/UI Designer & Low-code Developer crafting digital
                  experiences that bridge creativity with technology.
                </p>
              </div>

              {/* Links & Resume */}
              <div className="flex flex-col justify-end h-full">
                <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-0 xl:justify-between">
                  {/* Resume Button - Above social links on mobile/tablet */}
                  <div className="flex justify-start xl:justify-end order-1 xl:order-2 w-full xl:w-auto">
                    <a
                      href="https://drive.google.com/file/d/1FIODpbn55vPLMo3S6V_QNMaX6SojM7kr/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full xl:w-auto text-sm inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40 font-semibold rounded-xl transition-all duration-200"
                    >
                      <FileText size={16} weight="regular" />
                      My resume
                    </a>
                  </div>

                  {/* Social Links - Below resume button on mobile/tablet */}
                  <div className="flex gap-6 xl:gap-8 2xl:gap-12 order-2 xl:order-1">
                    <a
                      href="https://dribbble.com/rasmusmattsson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-60 dark:text-neutral-50 hover:text-neutral-100 dark:hover:text-neutral-0 transition-colors duration-200 text-base font-medium flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDribbble} className="w-4 h-4" />
                      Dribbble
                    </a>
                    <a
                      href="https://linkedin.com/in/rasmus-mattsson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-60 dark:text-neutral-50 hover:text-neutral-100 dark:hover:text-neutral-0 transition-colors duration-200 text-base font-medium flex items-center gap-2"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        className="w-4 h-4"
                      />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/rasmusm2023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-60 dark:text-neutral-50 hover:text-neutral-100 dark:hover:text-neutral-0 transition-colors duration-200 text-base font-medium flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
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
