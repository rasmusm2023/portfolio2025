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
    <section data-section="process" className="py-16 fade-in-section">
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
                        stopOpacity: 1,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "#EC4899",
                        stopOpacity: 1,
                      }}
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="w-full lg:w-[600px]">
            <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              <p className="text-neutral-80 dark:text-neutral-20 text-base sm:text-lg md:text-xl leading-[150%] text-left">
                Our design process was iterative and collaborative, focusing on
                rapid prototyping and user feedback. We started with broad
                exploration and gradually refined our approach based on testing
                and team feedback.
              </p>
            </div>

            {/* Process Steps */}
            {processSteps && processSteps.length > 0 && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
                  Key Process Steps
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-neutral-10/50 dark:bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/20 dark:border-neutral-90/20 rounded-lg"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-neutral-80 dark:text-neutral-20 text-sm sm:text-base leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
