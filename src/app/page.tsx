"use client";

import VantaBackground from "@/components/VantaBackground";
import { gradients } from "@/styles/colors";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="container mx-auto px-8">
          {/* Introduction Section */}
          <section className="h-[calc(100vh-4rem)] relative">
            <div className="absolute bottom-[5vh] text-left w-full max-w-[1600px]">
              <div className="inline-flex items-center gap-4 mb-8 px-4 py-2 rounded-full bg-neutral-0/20 backdrop-blur-sm border border-neutral-100/10">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/50 blur-sm rounded-full animate-[pulse_1.5s_ease-in-out_infinite] scale-150"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                </div>
                <span className="text-neutral-30 text-base font-medium tracking-wider">
                  Currently available for hire
                </span>
              </div>
              <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-12">
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
              <div className="flex flex-col gap-6">
                <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                  I'm a curious digital designer with an eye for detail, a heart
                  for the user, and a drive for the business.
                </p>
                <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                  I see great products as I do great games – easy to get into,
                  but the more you explore, the better it gets. And that's where
                  I thrive – in team play, navigating different complex levels
                  together.
                </p>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section className="py-48">
            <div className="text-left w-full max-w-[1600px] p-8">
              <div className="relative w-fit mx-auto mb-16">
                <h2 className="text-5xl text-center font-regular [background-image:var(--gradient-heading-projects)] bg-clip-text text-transparent font-hanken pb-2">
                  Some of my previous projects
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#ED7DFF] to-transparent opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-12">
                {/* First Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/12] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-4">
                      Noted
                    </h3>
                    <p className="text-xl text-neutral-30">
                      A brief description of the project and its impact.
                    </p>
                  </div>
                </div>

                {/* Second Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/12] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-4">
                      Zmartrest AI
                    </h3>
                    <p className="text-xl text-neutral-30">
                      A brief description of the project and its impact.
                    </p>
                  </div>
                </div>

                {/* Third Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/12] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-4">
                      Fokus
                    </h3>
                    <p className="text-xl text-neutral-30">
                      A brief description of the project and its impact.
                    </p>
                  </div>
                </div>

                {/* Fourth Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/12] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-neutral-0 mb-4">
                      Emplojd
                    </h3>
                    <p className="text-xl text-neutral-30">
                      A brief description of the project and its impact.
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
