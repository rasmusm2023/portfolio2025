import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DesignSystem: React.FC = () => {
  const designSystemRef = useRef<HTMLElement>(null);

  // Design System Infinite Scroll Effect
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".infinite-scroll-container"
    );

    if (!scrollContainer) {
      console.log("Scroll container not found");
      return;
    }

    const images = scrollContainer.querySelectorAll(".design-system-svg");

    if (images.length === 0) {
      console.log("No images found");
      return;
    }

    console.log("Found images:", images.length);

    let scrollTimeline: gsap.core.Timeline | null = null;
    let animationStarted = false;

    const startAnimation = () => {
      if (animationStarted) return;

      console.log("Starting infinite scroll animation");

      // Get the actual height of the first image
      const firstImage = images[0] as HTMLImageElement;
      const imageHeight = firstImage.offsetHeight || firstImage.clientHeight;

      if (imageHeight === 0) {
        // If height is still 0, try again after a short delay
        setTimeout(startAnimation, 100);
        return;
      }

      console.log("Image height:", imageHeight);

      // Position the second image below the first for seamless looping
      if (images[1]) {
        (images[1] as HTMLImageElement).style.top = `${imageHeight}px`;
      }

      // Create infinite scroll animation
      scrollTimeline = gsap.timeline({ repeat: -1 });

      // Animate both images up by the full height of the image
      scrollTimeline.to(images, {
        y: -imageHeight,
        duration: 25,
        ease: "none",
        onRepeat: () => {
          // Reset positions when animation repeats
          gsap.set(images[0], { y: 0 });
          gsap.set(images[1], { y: imageHeight });
        },
      });

      animationStarted = true;
    };

    // Force start animation after a delay
    const forceStartTimer = setTimeout(() => {
      if (!animationStarted) {
        console.log("Force starting animation");
        startAnimation();
      }
    }, 1000);

    // Hover effects to slow down animation (only on desktop)
    const handleMouseEnter = () => {
      if (scrollTimeline && window.innerWidth >= 1024) {
        scrollTimeline.timeScale(0.3);
      }
    };

    const handleMouseLeave = () => {
      if (scrollTimeline && window.innerWidth >= 1024) {
        scrollTimeline.timeScale(1);
      }
    };

    // Add hover event listeners only on desktop
    if (window.innerWidth >= 1024) {
      scrollContainer.addEventListener("mouseenter", handleMouseEnter);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    // Intersection Observer to start animation when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            console.log("Section is intersecting, starting animation");
            startAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the design system section
    if (designSystemRef.current) {
      observer.observe(designSystemRef.current);
    }

    // Add resize listener to restart animation
    const handleResize = () => {
      if (animationStarted && scrollTimeline) {
        scrollTimeline.kill();
        animationStarted = false;
        setTimeout(startAnimation, 100);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(forceStartTimer);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeline) {
        scrollTimeline.kill();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={designSystemRef}
      data-section="design-system"
      className="py-12 sm:py-12 md:py-16 fade-in-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <div className="w-full lg:w-[600px] mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
            Design Guide & Components
          </h2>
          <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
        </div>

        {/* Infinite Scroll Design System Showcase */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-white/10 dark:bg-neutral-90/10 backdrop-blur-sm border border-white/20 dark:border-neutral-90/20 rounded-2xl overflow-hidden relative">
          <div className="infinite-scroll-container h-full relative">
            <img
              src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
              alt="Emplojd Design System Components"
              className="design-system-svg w-full h-auto absolute top-0 left-0"
              onLoad={() => console.log("First image loaded")}
              onError={(e) => {
                console.error("SVG failed to load:", e);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <img
              src="/case-study-assets/emplojd/Emplojd-Design-Guide-Components.svg"
              alt="Emplojd Design System Components"
              className="design-system-svg w-full h-auto absolute top-0 left-0"
              onLoad={() => console.log("Second image loaded")}
              onError={(e) => {
                console.error("Second SVG failed to load:", e);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSystem;
