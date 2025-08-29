import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface ProcessProps {
  processSteps?: string[];
}

const Process: React.FC<ProcessProps> = ({ processSteps }) => {
  const processMorphRef = useRef<HTMLDivElement>(null);

  // Process Section Morphing Effect
  useEffect(() => {
    if (!processMorphRef.current) return;

    const morphContainer = processMorphRef.current;
    const shapes = morphContainer.querySelectorAll("path");
    let currentShapeIndex = 0;

    const morphToNextShape = () => {
      if (shapes.length === 0) return;

      const currentShape = shapes[currentShapeIndex];
      const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
      const nextShape = shapes[nextShapeIndex];

      gsap.to(currentShape, {
        morphSVG: nextShape,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          currentShapeIndex = nextShapeIndex;
          setTimeout(morphToNextShape, 300);
        },
      });
    };

    if (shapes.length > 0) {
      morphToNextShape();
    }

    return () => {
      gsap.killTweensOf(shapes);
    };
  }, []);

  return (
    <section className="py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full lg:w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4 text-left">
              The Process
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>

            {/* Morphing SVG Container */}
            <div
              ref={processMorphRef}
              className="mt-8 flex items-center justify-center"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="morphing-shape sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
              >
                <path
                  d="M100 20 C 140 20, 180 60, 180 100 C 180 140, 140 180, 100 180 C 60 180, 20 140, 20 100 C 20 60, 60 20, 100 20 Z"
                  fill="url(#gradient1)"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{
                        stopColor: "#8B5CF6",
                        stopOpacity: 0.3,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "#EC4899",
                        stopOpacity: 0.3,
                      }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{
                        stopColor: "#8B5CF6",
                        stopOpacity: 0.8,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "#EC4899",
                        stopOpacity: 0.8,
                      }}
                    />
                  </linearGradient>
                </defs>
              </svg>

              {/* Hidden shapes for morphing */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                style={{ display: "none" }}
                className="sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
              >
                <path
                  d="M100 20 L 180 100 L 100 180 L 20 100 Z"
                  fill="url(#gradient1)"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                />
              </svg>

              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                style={{ display: "none" }}
                className="sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
              >
                <path
                  d="M100 20 L 160 40 L 180 100 L 160 160 L 100 180 L 40 160 L 20 100 L 40 40 Z"
                  fill="url(#gradient1)"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                />
              </svg>

              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                style={{ display: "none" }}
                className="sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
              >
                <path
                  d="M100 20 C 120 20, 140 30, 150 50 C 160 70, 160 90, 150 110 C 140 130, 120 140, 100 140 C 80 140, 60 130, 50 110 C 40 90, 40 70, 50 50 C 60 30, 80 20, 100 20 Z"
                  fill="url(#gradient1)"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="w-full lg:w-[600px]">
            <ul className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] space-y-4 text-left">
              {processSteps ? (
                processSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">•</span>
                    <span>{step}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">•</span>
                    <span>Research & Discovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">•</span>
                    <span>Design & Prototyping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">•</span>
                    <span>Testing & Iteration</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
