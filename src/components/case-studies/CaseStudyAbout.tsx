import React from "react";

interface CaseStudyAboutProps {
  aboutText?: React.ReactNode;
  appIconPath?: string;
  logotypeBlackPath?: string;
  logotypeWhitePath?: string;
}

const CaseStudyAbout: React.FC<CaseStudyAboutProps> = ({
  aboutText,
  appIconPath,
  logotypeBlackPath,
  logotypeWhitePath,
}) => {
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
              About
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            {aboutText ? (
              aboutText
            ) : (
              <div className="relative">
                <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-6">
                  Emplojd was born out of the frustration many feel with
                  repetitive and time-consuming job applications. Created during
                  the{" "}
                  <a
                    href="https://chasacademy.se/article/chas-challenge-2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer group"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(144, 126, 255, 0.3) 0%, rgba(144, 126, 255, 0.3) 100%)",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Chas Challenge
                  </a>
                  , this AI-powered platform was our teams way of exploring how
                  design and tech could simplify the process.
                </p>
                {/* Custom cursor tooltip - moved outside p element */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-96">
                  <div className="bg-neutral-100 dark:bg-neutral-0 text-neutral-0 dark:text-neutral-100 px-6 py-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 text-sm leading-relaxed">
                    <div className="mb-3">
                      Chas Academy's annual, cross-program student project where
                      first-year students team up across disciplines over an
                      8‑week period (2024's theme: AI) to ideate and prototype
                      real solutions, then pitch them to industry professionals.
                    </div>
                    <div className="text-xs text-neutral-60 dark:text-neutral-40 font-medium border-t border-neutral-200 dark:border-neutral-700 pt-3">
                      Click to read more
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-100 dark:border-t-neutral-0"></div>
                  </div>
                </div>
              </div>
            )}
            <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
              I led the UX/UI work to make sure the experience felt personal,
              efficient, and genuinely helpful for job seekers.
            </p>

            {/* Logo Box */}
            <div className="w-full h-32 mt-6 bg-neutral-3 dark:bg-neutral-100 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg flex items-center px-6">
              {appIconPath && (
                <img
                  src={appIconPath}
                  alt="App Icon"
                  className="h-20 w-20 object-contain"
                />
              )}
              <div className="flex-1 flex justify-center">
                {logotypeBlackPath && logotypeWhitePath && (
                  <img
                    src={logotypeBlackPath}
                    alt="Logotype"
                    className="h-10 object-contain dark:hidden"
                  />
                )}
                {logotypeBlackPath && logotypeWhitePath && (
                  <img
                    src={logotypeWhitePath}
                    alt="Logotype"
                    className="h-10 object-contain hidden dark:block"
                  />
                )}
              </div>
              {!appIconPath && !logotypeBlackPath && (
                <span className="text-neutral-60 dark:text-neutral-40 text-sm">
                  Logo placeholder
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyAbout;
