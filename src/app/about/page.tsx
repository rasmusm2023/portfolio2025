"use client";

import AnimatedBlob from "@/components/AnimatedBlob";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(79, 70, 229, 0.6)", // Indigo blue
                secondary: "rgba(6, 182, 212, 0.4)", // Cyan/teal
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-about)] bg-clip-text text-transparent font-hanken">
                    About Me
                  </span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      My Story
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                    A passionate designer and developer with a love for creating
                    beautiful, functional experiences that make a difference.
                  </p>
                  <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                    From concept to execution, I bring ideas to life through
                    thoughtful design and clean code.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16">
            <div className="text-left w-full max-w-[1600px]">
              <p className="text-lg text-neutral-30">Coming soon...</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
