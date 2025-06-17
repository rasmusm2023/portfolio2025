"use client";

import Header from "@/components/Header";
import VantaBackground from "@/components/VantaBackground";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <VantaBackground />

      {/* Content Container */}
      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-8">
          {/* Introduction Section */}
          <section className="h-[calc(100vh-8rem)] flex items-end pb-4">
            <div className="relative text-left w-full max-w-[1600px] mt-4">
              <div className="inline-flex items-center gap-4 mb-8 px-4 py-2 rounded-lg bg-neutral-0/20 backdrop-blur-sm border border-neutral-100/10">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/50 blur-sm rounded-full animate-[pulse_1.5s_ease-in-out_infinite] scale-150"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                </div>
                <span className="text-neutral-30 text-base font-medium tracking-wider">
                  Currently available for hire
                </span>
              </div>
              <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6]">
                <span className="bg-gradient-to-l from-neutral-0 via-[#00FF9D]/80 to-neutral-0 bg-clip-text text-transparent font-hanken">
                  UX/UI Designer{" "}
                </span>
                <span className="text-[#00FF9D] font-hanken">&</span>
                <br />
                <span className="bg-gradient-to-l from-neutral-0 via-[#00FF9D]/80 to-neutral-0 bg-clip-text text-transparent text-5xl font-medium font-hanken">
                  LOW-CODE DEVELOPER
                </span>
              </h1>
              <p className="text-lg text-neutral-30 max-w-[800px]">
                Hi! I'm Rasmus Mattsson, a UX/UI designer based in Stockholm,
                Sweden I create purposeful, goal-driven digital solutions that
                serves both users and the business.
              </p>
            </div>
          </section>

          {/* Work Section */}
          <section className="py-32">
            <div className="text-left w-full max-w-[1600px] p-8 rounded-3xl bg-neutral-0/5 backdrop-blur-md border border-neutral-100/10">
              <h2 className="text-4xl text-center font-bold text-neutral-0 mb-16">
                Some of my previous projects
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {/* First Work Box */}
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/9] backdrop-blur-sm">
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
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/9] backdrop-blur-sm">
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
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/9] backdrop-blur-sm">
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
                <div className="group relative rounded-3xl overflow-hidden bg-neutral-90/50 aspect-[16/9] backdrop-blur-sm">
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
