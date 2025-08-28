import React, { useEffect } from "react";
import { gsap } from "gsap";

const CaseStudyDesignSystem: React.FC = () => {
  // Design System Infinite Scroll Effect
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".infinite-scroll-container"
    );
    if (!scrollContainer) return;

    const images = scrollContainer.querySelectorAll(".design-system-svg");
    if (images.length === 0) return;

    // Wait for images to load before calculating height
    const firstImage = images[0] as HTMLImageElement;
    let scrollTimeline: gsap.core.Timeline | null = null;
    let animationStarted = false;

    const startAnimation = () => {
      if (animationStarted) return; // Prevent multiple animations

      const imageHeight = firstImage.offsetHeight;

      if (imageHeight === 0) {
        // If height is still 0, try again after a short delay
        setTimeout(startAnimation, 100);
        return;
      }

      // Position the second image below the first for seamless looping
      if (images[1]) {
        (images[1] as HTMLImageElement).style.top = `${imageHeight}px`;
      }

      // Create infinite scroll animation
      scrollTimeline = gsap.timeline({ repeat: -1 });

      scrollTimeline.to(images, {
        y: -imageHeight,
        duration: 30, // Adjust speed: lower = faster, higher = slower
        ease: "none", // Linear movement for smooth scrolling
      });

      animationStarted = true;
      console.log("Design system animation started");
    };

    // Hover effects to slow down animation
    const handleMouseEnter = () => {
      if (scrollTimeline) {
        scrollTimeline.timeScale(0.3); // Slow down to 30% speed on hover
      }
    };

    const handleMouseLeave = () => {
      if (scrollTimeline) {
        scrollTimeline.timeScale(1); // Return to normal speed
      }
    };

    // Add hover event listeners
    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Intersection Observer to start animation only when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            // Section is now visible, start animation if images are loaded
            if (firstImage.complete) {
              startAnimation();
            } else {
              firstImage.addEventListener("load", startAnimation);
            }
          }
        });
      },
      { threshold: 0.3 } // Start when 30% of section is visible
    );

    // Observe the design system section
    const designSystemSection = document.querySelector(
      '[data-section="design-system"]'
    );
    if (designSystemSection) {
      observer.observe(designSystemSection);
    }

    return () => {
      firstImage.removeEventListener("load", startAnimation);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollTimeline) {
        scrollTimeline.kill();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-16 bg-neutral-10 dark:bg-neutral-90 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section Title */}
        <div className="w-[600px] mb-8">
          <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
            Design Guide & Components
          </h2>
          <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
        </div>

        {/* Infinite Scroll Design System Showcase */}
        <div className="w-full h-[800px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden relative">
          <div className="infinite-scroll-container h-full relative">
            <img
              src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
              alt="Emplojd Design System Components"
              className="design-system-svg w-full h-auto absolute top-0 left-0"
              onError={(e) => {
                console.error("SVG failed to load:", e);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
              onLoad={(e) => {
                console.log("SVG loaded successfully:", e);
                const target = e.target as HTMLImageElement;
                console.log(
                  "Image dimensions:",
                  target.offsetWidth,
                  "x",
                  target.offsetHeight
                );
              }}
            />
            <img
              src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
              alt="Emplojd Design System Components"
              className="design-system-svg w-full h-auto absolute top-0 left-0"
              onError={(e) => {
                console.error("SVG failed to load:", e);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
              onLoad={(e) => {
                console.log("SVG loaded successfully:", e);
                const target = e.target as HTMLImageElement;
                console.log(
                  "Image dimensions:",
                  target.offsetWidth,
                  "x",
                  target.offsetHeight
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDesignSystem;
