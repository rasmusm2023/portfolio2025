"use client";

import VantaBackground from "@/components/VantaBackground";
import AnimatedBlob from "@/components/AnimatedBlob";
import BentoBoxFirstTwo from "@/components/BentoBoxFirstTwo";
import BentoBoxRest from "@/components/BentoBoxRest";
import ProjectShowcase from "@/components/ProjectShowcase";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { gradients, colors } from "@/styles/colors";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main>
          {/* Introduction Section */}
          <section id="home" className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)", // Purple primary
                secondary: "rgba(168, 85, 247, 0.4)", // Purple secondary
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-between w-full max-w-[1600px] mx-auto px-8"
              style={{ height: "100vh", width: "100%" }}
            >
              {/* CTA Button - positioned to align with bento box right edge */}
              <div
                className="absolute bottom-1/4"
                style={{ right: "calc(50% - 800px + 2rem)" }}
              >
                <button
                  onClick={() => {
                    const element = document.getElementById("case-studies");
                    if (element) {
                      const offset = 300; // Increased offset to show part of the hero section
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="shimmer-button-green w-fit"
                >
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span>View previous work</span>
                  </span>
                  <span className="shimmer"></span>
                </button>
              </div>

              <div className="text-left w-full flex flex-col justify-center h-full">
                {/* Hero content centered */}
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                      <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                        Product Designer{" "}
                      </span>
                      <span
                        className="inline-block text-[10rem] font-extrabold tracking-tight leading-[1] font-hanken"
                        style={{
                          background:
                            "linear-gradient(to bottom, #000000 0%, #5A5A5A 50%, #8B5CF6 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        &
                      </span>
                    </h1>
                    <div className="flex justify-between items-start mt-16 w-full max-w-full mx-auto">
                      <div className="flex-1 max-w-[48rem]">
                        <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-loose tracking-wide">
                          — with an{" "}
                          <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">
                            eye
                          </span>{" "}
                          for{" "}
                          <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                            detail
                          </span>
                          , a{" "}
                          <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">
                            heart
                          </span>{" "}
                          for the{" "}
                          <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                            user
                          </span>
                          , and a{" "}
                          <span className="bg-[#8B5CF6]/20 px-0.5 py-0.5">
                            drive
                          </span>
                          for the{" "}
                          <span className="border-2 border-dashed border-[#8B5CF6]/30 px-0.5 py-0.5">
                            business
                          </span>
                          .
                        </p>
                      </div>
                      <div className="ml-8">
                        <span className="text-neutral-60 dark:text-neutral-40 text-5xl font-medium font-hanken tracking-wide">
                          Low-code Developer
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* First Two Bento Boxes */}
        <BentoBoxFirstTwo />

        {/* Project Showcase Section - Full Width */}
        <ProjectShowcase />

        {/* Rest of Bento Boxes */}
        <BentoBoxRest />

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
