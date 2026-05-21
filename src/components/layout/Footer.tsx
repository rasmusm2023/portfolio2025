"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Copy, Check, ArrowsOutCardinal, ArrowRight } from "@phosphor-icons/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";

const socialLinkClass =
  "text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4 inline-flex items-center gap-2 uppercase";

const getInTouchClass =
  "inline-flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white uppercase tracking-tighter hover:opacity-80 transition-opacity group";

/** Light: white lift + soft shadow (matches dark layered panels). Dark: translucent stack */
const chatCardShellClass =
  "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-[0_2px_14px_-4px_rgba(15,23,42,0.09)] dark:shadow-none";

const chatEmailBoxCopiedClass =
  "border border-emerald-300 bg-emerald-50 dark:bg-green-950/30 dark:border-green-800/50";

const chatEmailBoxIdleClass =
  "border border-neutral-20 bg-white hover:bg-neutral-10 hover:border-neutral-30 dark:bg-neutral-800/50 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:border-neutral-500";

/** Outline secondary actions (e.g. Cancel) */
const chatOutlineButtonClass =
  "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:border-neutral-500";

/** Opens form — hover matches filled primary (dark surface, light label) */
const chatOpenFormButtonClass =
  "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-10 hover:border-neutral-30 hover:text-neutral-900 dark:border-neutral-500 dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-neutral-900 dark:hover:border-white transition-[background-color,border-color,color] duration-300 ease-in-out";

/** Light: no ring (avoids browser blue focus); neutral border only when focused */
const chatFieldSurfaceClass =
  "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-base font-medium placeholder-transparent shadow-[inset_0_1px_3px_rgba(15,23,42,0.06)] dark:shadow-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus:border-neutral-900 dark:focus:border-neutral-400 transition-[color,background-color,border-color,box-shadow] duration-200";

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
          className={`w-full px-4 py-4 pr-12 ${chatFieldSurfaceClass} resize-none overflow-y-auto`}
          placeholder={placeholder}
        />
        <div
          className="absolute bottom-2 right-2 cursor-nw-resize opacity-50 hover:opacity-100 transition-opacity duration-200"
          onMouseDown={handleMouseDown}
        >
          <ArrowsOutCardinal
            size={16}
            className="text-neutral-500 dark:text-neutral-400"
          />
        </div>
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-neutral-900 dark:text-white font-medium bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none"
              : "top-3 text-base text-neutral-500 dark:text-neutral-400 font-medium"
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
        className={`w-full px-4 py-4 ${chatFieldSurfaceClass}`}
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none px-2 ${
            isActive
              ? "-top-2 text-sm text-neutral-900 dark:text-white font-medium bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none"
              : "top-1/2 -translate-y-1/2 text-base text-neutral-500 dark:text-neutral-400 font-medium"
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
  const [showForm, setShowForm] = useState(false);

  // Refs for entrance animations
  const titleRef = useRef<HTMLAnchorElement>(null);
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
        // Close form after successful submission
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus("idle");
        }, 3000);
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
    }, 4000); // Brief green flash - 4 seconds
  };

  const openFormAndScrollToIt = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const visible = [chatCardRef.current, chatCardLgRef.current, chatCardMobileRef.current].find(
          (el) => el && el.offsetParent !== null
        );
        if (visible) {
          visible.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  };

  return (
    <section className="py-0 relative">
      {/* Large Desktop Layout (xl and above) */}
      <div className="hidden xl:block relative">
        <div className="w-full">
          <div className="flex items-start justify-between gap-12 lg:gap-16">
            <div className="text-left flex-1 min-w-0">
              <Link
                ref={titleRef}
                href="/#contact"
                className={`${getInTouchClass} mb-4`}
                aria-label="Go to contact section"
              >
                Get in touch
                <ArrowRight size={32} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <div ref={descriptionRef} className="max-w-[36rem]">
                <div className="flex flex-col gap-4">
                  <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    I'm always excited to discuss new opportunities and
                    possibilities.
                  </p>
                  <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
                    Whether you have a specific role in mind or just want to
                    discuss how I can contribute, let's start a
                    conversation.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div ref={contactInfoRef} className="flex flex-col gap-6 mt-6">
                <div className="flex gap-6">
                  <a
                    href="https://dribbble.com/rasmusmattsson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                  >
                    <FontAwesomeIcon icon={faDribbble} className="w-4 h-4 shrink-0" aria-hidden />
                    Dribbble
                  </a>
                  <a
                    href="https://linkedin.com/in/rasmus-mattsson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4 shrink-0" aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/rasmusm2023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                  >
                    <FontAwesomeIcon icon={faGithub} className="w-4 h-4 shrink-0" aria-hidden />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-[32rem] shrink-0">
              <div
                ref={chatCardRef}
                className={`${chatCardShellClass} rounded-2xl p-8 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-6">
                    Let's have a chat
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Alternative - Prioritized at top */}
                    <div
                      className={`text-center space-y-4 p-5 rounded-xl cursor-pointer transition-[background-color,border-color] duration-300 ease-in-out ${
                        emailCopied
                          ? chatEmailBoxCopiedClass
                          : chatEmailBoxIdleClass
                      }`}
                      onClick={handleCopyEmail}
                    >
                      <span
                        className={`block font-medium text-base transition-colors ${
                          emailCopied
                            ? "text-emerald-800 dark:text-green-400"
                            : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        hello@rasmusmattsson.com
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        {emailCopied ? (
                          <Check
                            size={18}
                            weight="regular"
                            className="text-emerald-700 dark:text-green-400"
                          />
                        ) : (
                          <Copy
                            size={18}
                            weight="regular"
                            className="text-neutral-500 dark:text-neutral-400"
                          />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            emailCopied ? "text-emerald-800 dark:text-green-400" : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          {emailCopied ? "Copied!" : "Copy email"}
                        </span>
                      </div>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                        OR
                      </span>
                      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                    </div>

                    {/* Toggle Form Button */}
                    {!showForm && (
                      <button
                        type="button"
                        onClick={openFormAndScrollToIt}
                        className={`w-full px-6 py-3 ${chatOpenFormButtonClass} font-medium text-base rounded-xl`}
                      >
                        Fill out contact form
                      </button>
                    )}

                  {/* Contact Form - Secondary */}
                  {showForm && (
                    <>
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

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-base rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setFormData({
                              name: "",
                              email: "",
                              subject: "",
                              message: "",
                            });
                            setSubmitStatus("idle");
                            setErrorMessage("");
                          }}
                          className={`px-6 py-3 ${chatOutlineButtonClass} font-medium text-base rounded-xl transition-colors`}
                        >
                          Cancel
                        </button>
                      </div>

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
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Medium Desktop Layout (lg to xl) - Stacked */}
      <div className="hidden lg:block xl:hidden">
        <div className="w-full">
          <Link
            href="/#contact"
            className={`${getInTouchClass} mb-4`}
            aria-label="Go to contact section"
          >
            Get in touch
            <ArrowRight size={32} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>

          <div className="flex flex-col gap-4 mb-6">
            <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
              I'm always excited to discuss new opportunities and possibilities.
            </p>
            <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
              Whether you have a specific role in mind or just want to discuss
              how I can contribute, let's start a conversation.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <div ref={contactInfoLgRef} className="flex flex-col gap-6">
              <div className="flex gap-6">
                <a href="https://dribbble.com/rasmusmattsson" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faDribbble} className="w-4 h-4 shrink-0" aria-hidden />
                  Dribbble
                </a>
                <a href="https://linkedin.com/in/rasmus-mattsson" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4 shrink-0" aria-hidden />
                  LinkedIn
                </a>
                <a href="https://github.com/rasmusm2023" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4 shrink-0" aria-hidden />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div
              ref={chatCardLgRef}
              className={`${chatCardShellClass} rounded-2xl p-8 relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-6">
                  Let's have a chat
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    className={`text-center space-y-4 p-5 rounded-xl cursor-pointer transition-[background-color,border-color] duration-300 ease-in-out ${
                      emailCopied
                        ? chatEmailBoxCopiedClass
                        : chatEmailBoxIdleClass
                    }`}
                    onClick={handleCopyEmail}
                  >
                    <span
                      className={`block font-medium text-base transition-colors ${
                        emailCopied ? "text-emerald-800 dark:text-green-400" : "text-neutral-900 dark:text-white"
                      }`}
                    >
                      hello@rasmusmattsson.com
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      {emailCopied ? (
                        <Check size={18} weight="regular" className="text-emerald-700 dark:text-green-400" />
                      ) : (
                        <Copy size={18} weight="regular" className="text-neutral-500 dark:text-neutral-400" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          emailCopied ? "text-emerald-800 dark:text-green-400" : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {emailCopied ? "Copied!" : "Copy email"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">OR</span>
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                  </div>

                  {!showForm && (
                    <button
                      type="button"
                      onClick={openFormAndScrollToIt}
                      className={`w-full px-6 py-3 ${chatOpenFormButtonClass} font-medium text-base rounded-xl`}
                    >
                      Fill out contact form
                    </button>
                  )}

                  {showForm && (
                    <>
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

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-base rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setFormData({
                              name: "",
                              email: "",
                              subject: "",
                              message: "",
                            });
                            setSubmitStatus("idle");
                            setErrorMessage("");
                          }}
                          className={`px-6 py-3 ${chatOutlineButtonClass} font-medium text-base rounded-xl transition-colors`}
                        >
                          Cancel
                        </button>
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl">
                          <p className="text-green-800 dark:text-green-200 font-bold text-base text-center">
                            ✅ Message sent successfully! I'll get back to you within 24 hours.
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
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col">
        <div className="w-full">
          <Link
            href="/#contact"
            className={`${getInTouchClass} mb-4`}
            aria-label="Go to contact section"
          >
            Get in touch
            <ArrowRight size={32} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>

          <div className="flex flex-col gap-4 mb-5">
            <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
              I'm always excited to discuss new opportunities and possibilities.
            </p>
            <p className="text-neutral-900 dark:text-white text-base md:text-lg leading-relaxed">
              Whether you have a specific role in mind or just want to discuss
              how I can contribute, let's start a conversation.
            </p>
          </div>

          <div className="mb-5">
            <div ref={contactInfoMobileRef} className="flex flex-col gap-6">
              <div className="flex gap-6">
                <a href="https://dribbble.com/rasmusmattsson" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faDribbble} className="w-4 h-4 shrink-0" aria-hidden />
                  Dribbble
                </a>
                <a href="https://linkedin.com/in/rasmus-mattsson" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4 shrink-0" aria-hidden />
                  LinkedIn
                </a>
                <a href="https://github.com/rasmusm2023" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4 shrink-0" aria-hidden />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div>
            <div
              ref={chatCardMobileRef}
              className={`${chatCardShellClass} rounded-2xl p-6 sm:p-8 relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 sm:mb-6">
                  Let's have a chat
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div
                    className={`text-center space-y-4 p-4 sm:p-5 rounded-xl cursor-pointer transition-[background-color,border-color] duration-300 ease-in-out ${
                      emailCopied
                        ? chatEmailBoxCopiedClass
                        : chatEmailBoxIdleClass
                    }`}
                    onClick={handleCopyEmail}
                  >
                    <span
                      className={`block font-medium text-base transition-colors ${
                        emailCopied ? "text-emerald-800 dark:text-green-400" : "text-neutral-900 dark:text-white"
                      }`}
                    >
                      hello@rasmusmattsson.com
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      {emailCopied ? (
                        <Check size={18} weight="regular" className="text-emerald-700 dark:text-green-400" />
                      ) : (
                        <Copy size={18} weight="regular" className="text-neutral-500 dark:text-neutral-400" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          emailCopied ? "text-emerald-800 dark:text-green-400" : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {emailCopied ? "Copied!" : "Copy email"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">OR</span>
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                  </div>

                  {!showForm && (
                    <button
                      type="button"
                      onClick={openFormAndScrollToIt}
                      className={`w-full px-6 py-3 ${chatOpenFormButtonClass} font-medium text-base rounded-xl`}
                    >
                      Fill out contact form
                    </button>
                  )}

                  {showForm && (
                    <>
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

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-base rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setFormData({ name: "", email: "", subject: "", message: "" });
                            setSubmitStatus("idle");
                            setErrorMessage("");
                          }}
                          className={`px-6 py-3 ${chatOutlineButtonClass} font-medium text-base rounded-xl transition-colors`}
                        >
                          Cancel
                        </button>
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-xl">
                          <p className="text-green-800 dark:text-green-200 font-bold text-base text-center">
                            ✅ Message sent successfully! I'll get back to you within 24 hours.
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
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Footer;
