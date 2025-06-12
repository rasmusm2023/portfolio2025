"use client";

import { colors } from "@/styles/colors";

const Work = () => {
  return (
    <section className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-neutral-0 mb-12">My Work</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* First Work Box */}
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-neutral-0 mb-2">
                Project One
              </h3>
              <p className="text-neutral-30">
                A brief description of the project and its impact.
              </p>
            </div>
          </div>

          {/* Second Work Box */}
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-90 aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-100/90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-neutral-0 mb-2">
                Project Two
              </h3>
              <p className="text-neutral-30">
                A brief description of the project and its impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
