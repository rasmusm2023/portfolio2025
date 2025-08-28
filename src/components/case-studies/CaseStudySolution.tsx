import React from "react";

interface CaseStudySolutionProps {
  solution: string;
}

const CaseStudySolution: React.FC<CaseStudySolutionProps> = ({ solution }) => {
  return (
    <section className="py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex justify-center gap-12"
          style={{
            paddingTop: "calc(40vmax / 10)",
            paddingBottom: "calc(40vmax / 10)",
          }}
        >
          <div className="w-[600px]">
            <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
              The Solution
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            <div className="mb-16">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-8">
                Built with a{" "}
                <span
                  className="relative inline-block group"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  user-first mindset
                </span>
                , the platform shifts focus away from the recruiter and towards
                the needs of the applicant.{" "}
                <span
                  className="relative inline-block group"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Three core tools work together
                </span>{" "}
                seamlessly: saving a personalised profile, searching for
                relevant job postings, and tailoring cover letters. All in one
                place, the process becomes faster, simpler, and more personal.
              </p>
              <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>Smart job discovery</strong> — integrates with job
                    listing APIs and offers search functionality to quickly find
                    relevant opportunities.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>On-the-go convenience</strong> — allows logged-in
                    users to save jobs with a single click to revisit and
                    generate cover letters later.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>Respectful balance</strong> — ensures cover letters
                    remain personal while avoiding generic overload for
                    recruiters.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>User-focused UI</strong> — designed a clean,
                    intuitive interface that encourages productivity and removes
                    overwhelm.
                  </span>
                </li>
              </ul>
            </div>

            {/* Solution Features */}
            <div className="bg-gradient-to-r from-green-500/10 to-green-700/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-10">
              <h3 className="text-neutral-100 dark:text-neutral-0 font-bold text-2xl mb-6">
                Key Features
              </h3>
              <ul className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>AI-powered personalization</strong> — uses each job
                    seeker's "job profile" and specific job postings to create
                    tailored cover letters that preserve their unique voice.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>Streamlined workflow</strong> — enables users to
                    apply to more jobs with less friction.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">•</span>
                  <span>
                    <strong>Flexible profile data</strong> — store your
                    information to avoid re-entering details for every cover
                    letter when needed.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySolution;
