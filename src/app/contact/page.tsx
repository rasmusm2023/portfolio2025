"use client";

import { useState } from "react";
import { Copy, ArrowsOutCardinal } from "@phosphor-icons/react";
import AnimatedBlob from "@/components/AnimatedBlob";
import CustomCursor from "@/components/CustomCursor";

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
          value={value}
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      <div className="relative z-10">
        <main className="container mx-auto">
          {/* Hero Section */}
          <section className="min-h-screen relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)", // Purple
                secondary: "rgba(168, 85, 247, 0.4)", // Violet
              }}
            />

            {/* Desktop Layout */}
            <div className="hidden lg:block h-[80vh] relative">
              <div
                className="absolute inset-0 flex items-center justify-between w-full max-w-[1600px]"
                style={{ height: "100vh" }}
              >
                <div className="text-left w-full flex flex-col justify-between h-full">
                  {/* Hero content centered */}
                  <div className="flex-1 flex items-center">
                    <div>
                      <h1 className="text-9xl xl:text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                        <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                          Contact
                        </span>
                      </h1>
                      <div className="flex flex-row justify-between items-start mt-16">
                        <div className="flex-1 max-w-[48rem]">
                          <div className="flex flex-col gap-6">
                            <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                              I'm always excited to discuss new opportunities
                              and possibilities.
                            </p>
                            <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                              Whether you have a specific role in mind or just
                              want to discuss how I can contribute, let's start
                              a conversation.
                            </p>
                          </div>
                        </div>
                        <div className="ml-8">
                          {/* Empty space for balance since no subtitle */}
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
                <div className="bg-neutral-10/50 dark:bg-neutral-100 backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-80/30 rounded-3xl p-8 shadow-2xl shadow-white/5">
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
                      rows={4}
                      isTextarea
                      value={formData.message}
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                    >
                      Send message
                    </button>

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

              {/* Contact Information positioned to align with email alternative */}
              <div className="absolute left-0 bottom-0">
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
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden flex flex-col min-h-screen px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-12">
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
                    Whether you have a specific role in mind or just want to
                    discuss how I can contribute, let's start a conversation.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
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
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                        Location
                      </h3>
                      <p className="text-neutral-60 dark:text-neutral-60 text-base sm:text-lg">
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
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-100 dark:text-neutral-0">
                        Response Time
                      </h3>
                      <p className="text-neutral-60 dark:text-neutral-60 text-base sm:text-lg">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="mb-8 sm:mb-12">
                <div className="bg-neutral-10/50 dark:bg-neutral-100 backdrop-blur-sm border border-neutral-20/10 dark:border-neutral-80/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-white/5">
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
                      rows={4}
                      isTextarea
                      value={formData.message}
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-white font-semibold text-base sm:text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                    >
                      Send message
                    </button>

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
          </section>
        </main>
      </div>
    </div>
  );
}
