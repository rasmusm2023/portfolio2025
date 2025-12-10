"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/layout/Footer";
import AnimatedBlob from "@/components/ui/AnimatedBlob";
import { Hanken_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export default function WorkPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
        {/* Hero Section */}
        <section className="h-[80vh] relative">
          <AnimatedBlob
            gradientColors={{
              primary: "rgba(139, 92, 246, 0.6)",
              secondary: "rgba(168, 85, 247, 0.4)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center w-full">
            <div className="w-full max-w-[1600px] mx-auto px-8">
              <div className="text-center w-full">
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8">
                  <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                    My Work
                  </span>
                </h1>
                <p className="text-neutral-70 dark:text-neutral-30 text-xl md:text-2xl font-semibold leading-relaxed tracking-wide mb-12">
                  Explore my portfolio and case studies
                </p>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-neutral-10 dark:bg-[#060608] rounded-2xl p-8 border border-neutral-20 dark:border-neutral-80">
                    <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
                      Portfolio Overview
                    </h2>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed mb-6">
                      This page showcases my work and projects. You can explore
                      my case studies, design gallery, and other creative work.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push("/")}
                        className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        Back to Home
                      </button>
                      <button
                        onClick={() => router.push("/case-studies")}
                        className="px-6 py-3 bg-neutral-20 dark:bg-neutral-80 hover:bg-neutral-30 dark:hover:bg-neutral-70 text-neutral-100 dark:text-neutral-0 font-semibold rounded-lg transition-colors duration-300"
                      >
                        Case Studies
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
