"use client";

import { useEffect, useState } from "react";
import { colors } from "@/styles/colors";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateCursor);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`transition-all duration-200 ${
            isPointer ? "rotate-45" : "rounded-full"
          }`}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: colors.accent[100],
            boxShadow: `0 0 20px ${colors.accent[100]}`,
          }}
        />
      </div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        .cursor-dot {
          pointer-events: none;
        }

        #vanta-canvas,
        #vanta-canvas * {
          cursor: none !important;
        }

        #smooth-wrapper,
        #smooth-content {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
