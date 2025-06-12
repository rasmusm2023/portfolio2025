"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
    pJSDom: Array<{
      pJS: {
        fn: {
          vendors: {
            destroypJS: () => void;
          };
        };
      };
    }>;
  }
}

const ParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load the script directly
  useEffect(() => {
    const loadScript = () => {
      if (document.getElementById("particles-js-script")) {
        console.log("Script already exists");
        return;
      }

      const script = document.createElement("script");
      script.id = "particles-js-script";
      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.async = true;

      script.onload = () => {
        console.log("Script loaded via direct injection");
        setScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error("Error loading script:", error);
      };

      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      const script = document.getElementById("particles-js-script");
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current || !scriptLoaded) {
      console.log("Waiting for container and script...", {
        container: !!containerRef.current,
        scriptLoaded,
      });
      return;
    }

    console.log("Initializing particles...");

    try {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#00FF9D",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.7,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00FF9D",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
      console.log("Particles initialized successfully");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }

    return () => {
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, [scriptLoaded]);

  return (
    <div
      id="particles-js"
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#232323",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    />
  );
};

export default ParticlesBackground;
