"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";

export default function Home() {
  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0">
      {/* Background */}
      <div className="absolute inset-0">
        <ParticlesBackground />
      </div>

      {/* Content Container */}
      <div className="relative h-full z-10">
        <Header />

        {/* Scrollable Sections Container */}
        <div className="h-[calc(100vh-8rem)] mt-32 overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Introduction Section */}
          <section
            id="home"
            className="h-[calc(100vh-8rem)] snap-start flex items-center justify-center px-8"
          >
            <div className="relative text-left w-full max-w-[1600px] p-16 rounded-3xl bg-neutral-0/5 backdrop-blur-md border border-neutral-100/10 transform -translate-y-16">
              <div className="inline-flex items-center gap-4 mb-12 px-4 py-2 rounded-lg bg-neutral-0/5 backdrop-blur-sm border border-neutral-100/10">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/40 blur-sm rounded-full animate-[pulse_3s_ease-in-out_infinite] scale-110"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                </div>
                <span className="text-neutral-30 text-base font-medium tracking-wider">
                  Currently available
                </span>
              </div>
              <h1 className="text-8xl font-bold mb-8 tracking-tight leading-[0.75]">
                <span className="text-neutral-0">UX/UI DESIGNER </span>
                <span className="text-accent-100">&</span>
                <br />
                <span className="text-neutral-20 text-5xl font-medium">
                  LOW-CODE DEVELOPER
                </span>
              </h1>
              <p className="text-lg text-neutral-30 max-w-[800px]">
                Hi! I'm Rasmus Mattsson, a UX/UI designer based in Stockholm,
                Sweden I create purposeful, goal-driven digital solutions that
                serves both users and the business.
              </p>

              {/* Scroll Arrow */}
              <button
                onClick={scrollToWork}
                className="absolute right-8 bottom-8 animate-bounce hover:scale-110 transition-all cursor-pointer group"
                aria-label="Scroll to work section"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-100/40 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-accent-100 group-hover:text-neutral-100 transition-colors duration-300 relative"
                  >
                    <path
                      d="M12 5V19M12 19L5 12M12 19L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </section>

          {/* Work Section */}
          <section
            id="work"
            className="h-[calc(100vh-8rem)] snap-start flex items-center justify-center px-8"
          >
            <div className="text-left w-full max-w-[1600px] p-8 rounded-3xl bg-neutral-0/5 backdrop-blur-md border border-neutral-100/10">
              <h2 className="text-4xl text-center font-bold text-neutral-0 mb-16">
                My Work
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
        </div>
      </div>
    </div>
  );
}
