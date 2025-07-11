"use client";

import VantaBackground from "@/components/VantaBackground";
import AnimatedBlob from "@/components/AnimatedBlob";
import { gradients } from "@/styles/colors";
import { useState } from "react";

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@rasmusmattsson.com");
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="container mx-auto px-8">
          {/* Introduction Section */}
          <section id="home" className="h-[calc(100vh-0rem)] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(0, 255, 157, 0.6)", // Neon green from gradient-hero-home-accent
                secondary: "rgba(153, 255, 217, 0.4)", // Lighter green variant
              }}
            />
            <div className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]">
              <div className="text-left w-full">
                <div className="inline-flex items-center gap-4 mb-8 px-4 py-2 rounded-full bg-neutral-80 backdrop-blur-sm border border-neutral-100/10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/50 blur-sm rounded-full animate-[pulse_1.5s_ease-in-out_infinite] scale-150"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                  </div>
                  <span className="text-neutral-30 text-base font-medium tracking-wider">
                    Currently available for hire
                  </span>
                </div>
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-home-accent)] bg-clip-text text-transparent font-hanken">
                    UX/UI Designer{" "}
                  </span>
                  <span className="text-[#00FF9D] font-hanken">&</span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Low-code Developer
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[48rem]">
                    Hi, I'm Rasmus Mattsson - a curious digital designer with an
                    eye for detail, a heart for the user, and a drive for the
                    business.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section id="projects-section" className="py-48">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="relative w-fit mx-auto mb-16">
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects)] bg-clip-text text-transparent font-hanken pb-2">
                  Some of my previous projects
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ED7DFF] to-transparent opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-12">
                {/* First Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Project background image */}
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center"
                    alt="Noted App Interface"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-accent-100/20 text-accent-100 text-base font-medium rounded-full font-hanken">
                        UX/UI Design
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-accent-100 transition-colors font-hanken">
                      Noted
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      A comprehensive note-taking app with intuitive design and
                      seamless user experience.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-accent-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Second Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Project background image */}
                  <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
                    alt="Zmartrest AI Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-accent-100/20 text-accent-100 text-base font-medium rounded-full font-hanken">
                        AI/ML
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-accent-100 transition-colors font-hanken">
                      Zmartrest AI
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      AI-powered platform for intelligent decision making and
                      data analysis.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-accent-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Third Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Project background image */}
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
                    alt="Fokus Mobile App"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-accent-100/20 text-accent-100 text-base font-medium rounded-full font-hanken">
                        Mobile App
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-accent-100 transition-colors font-hanken">
                      Fokus
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      Productivity app designed to help users stay focused and
                      achieve their goals.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-accent-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Fourth Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Project background image */}
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
                    alt="Emplojd HR Platform"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/95" />

                  {/* Project content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-accent-100/20 text-accent-100 text-base font-medium rounded-full font-hanken">
                        SaaS Platform
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-0 mb-4 group-hover:text-accent-100 transition-colors font-hanken">
                      Emplojd
                    </h3>
                    <p className="text-neutral-30 text-lg leading-relaxed font-hanken">
                      Comprehensive HR platform for modern workplace management
                      and employee engagement.
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-accent-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-48">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="relative w-fit mx-auto mb-16">
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-hero-accent)] bg-clip-text text-transparent font-hanken pb-2">
                  Sounds interesting?
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ED7DFF] to-transparent opacity-50" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Contact Form */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-6">
                      Let's work together
                    </h3>
                    <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide">
                      Have a project in mind? I'd love to hear about it. Send me
                      a message and let's discuss how we can bring your ideas to
                      life.
                    </p>
                  </div>

                  <form
                    action="mailto:hello@rasmusmattsson.com?subject=Project Inquiry from Portfolio"
                    method="post"
                    encType="text/plain"
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#1ab182] transition-colors duration-200"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#1ab182] transition-colors duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-neutral-0 font-medium mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 text-neutral-0 placeholder-neutral-60 focus:outline-none focus:border-[#1ab182] transition-colors duration-200 resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#1ab182] to-[#ED7DFF] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-6">
                      Contact Information
                    </h3>
                    <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide">
                      Prefer to reach out directly? Here are the best ways to
                      get in touch with me.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1ab182] to-[#ED7DFF] flex items-center justify-center">
                        <span className="text-white font-bold">✉️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-neutral-0 font-semibold mb-1">
                          Email
                        </h4>
                        <a
                          href="mailto:hello@rasmusmattsson.com"
                          className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200"
                        >
                          hello@rasmusmattsson.com
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            window.open(
                              "mailto:hello@rasmusmattsson.com",
                              "_self"
                            )
                          }
                          className="px-3 py-1.5 bg-[#1ab182] text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity duration-200"
                        >
                          Open
                        </button>
                        <button
                          onClick={handleCopyEmail}
                          className={`px-3 py-1.5 ${
                            emailCopied ? "bg-green-500" : "bg-neutral-80"
                          } text-neutral-0 text-xs font-medium rounded-md hover:bg-neutral-70 transition-colors duration-200`}
                        >
                          {emailCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 rounded-lg bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1ab182] to-[#ED7DFF] flex items-center justify-center">
                        <span className="text-white font-bold">💼</span>
                      </div>
                      <div>
                        <h4 className="text-neutral-0 font-semibold mb-1">
                          LinkedIn
                        </h4>
                        <a
                          href="https://linkedin.com/in/rasmus-mattsson"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-60 hover:text-neutral-0 transition-colors duration-200"
                        >
                          linkedin.com/in/rasmus-mattsson
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-[#1ab182]/10 to-[#ED7DFF]/10 border border-neutral-100/10">
                    <h4 className="text-neutral-0 font-semibold mb-3">
                      Response Time
                    </h4>
                    <p className="text-neutral-60 text-sm">
                      I typically respond within 24 hours during business days.
                      For urgent matters, feel free to reach out on LinkedIn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
