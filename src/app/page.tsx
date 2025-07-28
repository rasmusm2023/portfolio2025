"use client";

import VantaBackground from "@/components/VantaBackground";
import AnimatedBlob from "@/components/AnimatedBlob";
import BentoBox from "@/components/BentoBox";
import ProjectShowcase from "@/components/ProjectShowcase";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { gradients, colors } from "@/styles/colors";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="container mx-auto px-8">
          {/* Introduction Section */}
          <section id="home" className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(255, 181, 113, 0.6)", // Orange from about page
                secondary: "rgba(255, 140, 244, 0.4)", // Pink/magenta variant
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-home-orange)] bg-clip-text text-transparent font-hanken">
                    UX/UI Designer{" "}
                  </span>
                  <span className="text-[#ffb571] font-hanken">&</span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Low-code Developer
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-loose tracking-wide max-w-[40rem]">
                    — with an{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">eye</span>{" "}
                    for{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      detail
                    </span>
                    , a{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">heart</span>{" "}
                    for the{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      user
                    </span>
                    , and a{" "}
                    <span className="bg-[#ffb571]/20 px-0.5 py-0.5">drive</span>
                    for the{" "}
                    <span className="border-2 border-dashed border-[#ffb571]/30 px-0.5 py-0.5">
                      business
                    </span>
                    .
                  </p>
                  <div className="flex justify-center mt-8">
                    <a href="/work" className="shimmer-button-green">
                      <span className="text">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        <span>View Case Studies</span>
                      </span>
                      <span className="shimmer"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Project Showcase Section - Full Width */}
        <ProjectShowcase />

        {/* Main Content Continued */}
        <main className="container mx-auto px-8">
          {/* Bento Box Layout */}
          <BentoBox />

          {/* Work Section */}
          <Projects />

          {/* Footer Section */}
          <div className="pt-8 pb-16">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
