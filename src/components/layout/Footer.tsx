"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, ArrowsOutCardinal, FileText } from "@phosphor-icons/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";

// Custom Floating Label Input Component
function FloatingLabelInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
  isTextarea = false,
  value,
  onChange,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value.length > 0);
  const [isResizing, setIsResizing] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(rows * 24);

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
    onChange(e);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTextarea) return;
    e.preventDefault();
    setIsResizing(true);

    const startY = e.clientY;
    const startHeight = textareaHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const newHeight = Math.max(rows * 24, startHeight + deltaY);
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
          value={value}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{ height: `${textareaHeight}px` }}
          className="w-full px-4 py-4 pr-12 bg-neutral-20/50 dark:bg-neutral-80/50 border border-neutral-30/20 dark:border-neutral-100/20 rounded-xl text-neutral-100 dark:text-neutral-0 text-base font-bold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all duration-200 resize-none overflow-y-auto"
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
        value={value}
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for entrance animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);
  const chatCardLgRef = useRef<HTMLDivElement>(null);
  const chatCardMobileRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactInfoLgRef = useRef<HTMLDivElement>(null);
  const contactInfoMobileRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !chatCardRef.current ||
      !chatCardLgRef.current ||
      !chatCardMobileRef.current ||
      !contactInfoRef.current ||
      !contactInfoLgRef.current ||
      !contactInfoMobileRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    gsap.set(
      [
        titleRef.current,
        descriptionRef.current,
        chatCardRef.current,
        chatCardLgRef.current,
        chatCardMobileRef.current,
        contactInfoRef.current,
        contactInfoLgRef.current,
        contactInfoMobileRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    tl.to(
      [
        titleRef.current,
        descriptionRef.current,
        chatCardRef.current,
        chatCardLgRef.current,
        chatCardMobileRef.current,
        contactInfoRef.current,
        contactInfoLgRef.current,
        contactInfoMobileRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        setSubmitStatus("error");
        setErrorMessage(errorData.error || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@rasmusmattsson.com");
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 pb-32 sm:pb-36 md:pb-40 lg:pb-48 xl:pb-56 relative">
      {/* Large Desktop Layout (xl and above) */}
      <div className="hidden xl:block min-h-[80vh] relative">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-full min-h-[80vh]">
            <div className="text-left w-full flex flex-col justify-between h-full">
              <div className="flex-1 flex items-start">
                <div className="w-full">
                  <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[7.5rem] font-extrabold tracking-tight leading-[0.9] sm:leading-[0.8] lg:leading-[0.6] mb-4 sm:mb-6 lg:mb-8"
                  >
                    <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                      Contact
                    </span>
                  </h1>
                  <div ref={descriptionRef} className="mt-16 max-w-[48rem]">
                    <div className="flex flex-col gap-6">
                      <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                        I'm always excited to discuss new opportunities and
                        possibilities.
                      </p>
                      <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                        Whether you have a specific role in mind or just want to
                        discuss how I can contribute, let's start a
                        conversation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form centered */}
          <div
            className="absolute right-0 w-[32rem]"
            style={{ top: "65%", transform: "translateY(-50%)" }}
          >
            <div
              ref={chatCardRef}
              className="bg-neutral-10/50 dark:bg-[#060608] backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-80/30 rounded-3xl p-8 shadow-xl shadow-black/10 dark:shadow-black/20 relative overflow-hidden"
            >
              {/* Noise background overlay */}
              <div
                className="absolute inset-0 opacity-[0.35] dark:opacity-[0.16] pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: "256px 256px",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-neutral-100 dark:text-neutral-0 mb-6 font-hanken">
                  Let's have a chat 💬
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingLabelInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="message"
                    name="message"
                    placeholder="Message"
                    required
                    rows={8}
                    isTextarea
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl">
                      <p className="text-green-800 dark:text-green-200 font-bold text-base text-center">
                        ✅ Message sent successfully! I'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl">
                      <p className="text-red-800 dark:text-red-200 font-bold text-base text-center">
                        ❌ {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* OR Divider */}
                  <div className="flex items-center justify-center space-x-4 my-6">
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                    <span className="text-neutral-60 dark:text-neutral-60 text-sm font-medium px-4">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                  </div>

                  {/* Email Alternative */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                    <p className="text-neutral-70 dark:text-neutral-30 text-base font-medium">
                      Prefer to email directly?
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span
                        className={`font-bold text-lg transition-colors duration-200 cursor-pointer hover:opacity-90 ${
                          emailCopied
                            ? "text-green-500"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
                        }`}
                        onClick={handleCopyEmail}
                      >
                        hello@rasmusmattsson.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          emailCopied
                            ? "bg-green-500 text-neutral-3 shadow-lg"
                            : "bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40"
                        }`}
                      >
                        <Copy size={16} weight="regular" />
                        {emailCopied ? "Copied!" : "Copy email"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information positioned to align with email alternative */}
          <div className="absolute left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 bottom-0">
            <div ref={contactInfoRef} className="flex flex-col space-y-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Location
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-lg">
                      Stockholm, Sweden
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Response Time
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-lg">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 xl:gap-8 2xl:gap-12">
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
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
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

      {/* Medium Desktop Layout (lg to xl) - Stacked */}
      <div className="hidden lg:block xl:hidden min-h-screen px-8 pt-24 pb-8">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col justify-center mb-12">
            <h1 className="text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8">
              <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                Contact
              </span>
            </h1>

            <div className="flex flex-col gap-6 mb-12">
              <p className="text-neutral-70 dark:text-neutral-30 text-xl font-semibold leading-relaxed tracking-wide">
                I'm always excited to discuss new opportunities and
                possibilities.
              </p>
              <p className="text-neutral-70 dark:text-neutral-30 text-xl font-semibold leading-relaxed tracking-wide">
                Whether you have a specific role in mind or just want to discuss
                how I can contribute, let's start a conversation.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <div ref={contactInfoLgRef} className="flex flex-col space-y-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Location
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-lg">
                      Stockholm, Sweden
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Response Time
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-lg">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 xl:gap-8 2xl:gap-12">
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
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
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

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <div
              ref={chatCardLgRef}
              className="bg-neutral-10/50 dark:bg-[#060608] backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-80/30 rounded-3xl p-8 shadow-xl shadow-black/10 dark:shadow-black/20 relative overflow-hidden"
            >
              {/* Noise background overlay */}
              <div
                className="absolute inset-0 opacity-[0.35] dark:opacity-[0.16] pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: "256px 256px",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-neutral-100 dark:text-neutral-0 mb-6 font-hanken">
                  Let's have a chat 💬
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingLabelInput
                    id="name-lg"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="email-lg"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="subject-lg"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="message-lg"
                    name="message"
                    placeholder="Message"
                    required
                    rows={8}
                    isTextarea
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl">
                      <p className="text-green-800 dark:text-green-200 font-bold text-base text-center">
                        ✅ Message sent successfully! I'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl">
                      <p className="text-red-800 dark:text-red-200 font-bold text-base text-center">
                        ❌ {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* OR Divider */}
                  <div className="flex items-center justify-center space-x-4 my-6">
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                    <span className="text-neutral-60 dark:text-neutral-60 text-sm font-medium px-4">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                  </div>

                  {/* Email Alternative */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                    <p className="text-neutral-70 dark:text-neutral-30 text-base font-medium">
                      Prefer to email directly?
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span
                        className={`font-bold text-lg transition-colors duration-200 cursor-pointer hover:opacity-90 ${
                          emailCopied
                            ? "text-green-500"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
                        }`}
                        onClick={handleCopyEmail}
                      >
                        hello@rasmusmattsson.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          emailCopied
                            ? "bg-green-500 text-neutral-3 shadow-lg"
                            : "bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40"
                        }`}
                      >
                        <Copy size={16} weight="regular" />
                        {emailCopied ? "Copied!" : "Copy email"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col min-h-screen px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8 sm:mb-12">
              <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                Contact
              </span>
            </h1>

            <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
              <p className="text-neutral-70 dark:text-neutral-30 text-base sm:text-lg font-semibold leading-relaxed tracking-wide">
                I'm always excited to discuss new opportunities and
                possibilities.
              </p>
              <p className="text-neutral-70 dark:text-neutral-30 text-base sm:text-lg font-semibold leading-relaxed tracking-wide">
                Whether you have a specific role in mind or just want to discuss
                how I can contribute, let's start a conversation.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8 sm:mb-12">
            <div
              ref={contactInfoMobileRef}
              className="flex flex-col space-y-16"
            >
              <div className="flex flex-row items-center space-x-4 sm:space-x-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Location
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-sm sm:text-lg">
                      Stockholm, Sweden
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                      Response Time
                    </h3>
                    <p className="text-neutral-60 dark:text-neutral-60 text-sm sm:text-lg">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 xl:gap-8 2xl:gap-12">
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
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
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

          {/* Contact Form */}
          <div className="mb-8 sm:mb-12">
            <div
              ref={chatCardMobileRef}
              className="bg-neutral-10/50 dark:bg-[#060608] backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-80/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/10 dark:shadow-black/20 relative overflow-hidden"
            >
              {/* Noise background overlay */}
              <div
                className="absolute inset-0 opacity-[0.35] dark:opacity-[0.16] pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: "256px 256px",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 dark:text-neutral-0 mb-4 sm:mb-6 font-hanken">
                  Let's have a chat 💬
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <FloatingLabelInput
                    id="name-mobile"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="email-mobile"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="subject-mobile"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <FloatingLabelInput
                    id="message-mobile"
                    name="message"
                    placeholder="Message"
                    required
                    rows={8}
                    isTextarea
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-white font-semibold text-base sm:text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl">
                      <p className="text-green-800 dark:text-green-200 font-bold text-base text-center">
                        ✅ Message sent successfully! I'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl">
                      <p className="text-red-800 dark:text-red-200 font-bold text-base text-center">
                        ❌ {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* OR Divider */}
                  <div className="flex items-center justify-center space-x-4 my-4 sm:my-6">
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                    <span className="text-neutral-60 dark:text-neutral-60 text-sm font-medium px-4">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                  </div>

                  {/* Email Alternative */}
                  <div className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                    <p className="text-neutral-70 dark:text-neutral-30 text-sm sm:text-base font-medium">
                      Prefer to email directly?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                      <span
                        className={`font-bold text-base sm:text-lg transition-colors duration-200 cursor-pointer hover:opacity-90 ${
                          emailCopied
                            ? "text-green-500"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
                        }`}
                        onClick={handleCopyEmail}
                      >
                        hello@rasmusmattsson.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          emailCopied
                            ? "bg-green-500 text-neutral-3 shadow-lg"
                            : "bg-neutral-20/30 dark:bg-white/10 backdrop-blur-sm border border-neutral-30/40 dark:border-white/20 text-neutral-70 dark:text-neutral-30 hover:text-neutral-100 dark:hover:text-white hover:border-neutral-30/60 dark:hover:border-white/40"
                        }`}
                      >
                        <Copy
                          size={14}
                          weight="regular"
                          className="sm:w-4 sm:h-4"
                        />
                        {emailCopied ? "Copied!" : "Copy email"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
