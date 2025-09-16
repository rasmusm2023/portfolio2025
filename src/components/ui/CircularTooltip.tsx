"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface CircularTooltipProps {
  children: React.ReactNode;
  tooltipText?: string;
}

export default function CircularTooltip({
  children,
  tooltipText = "See Project",
}: CircularTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth mouse move handler for responsive following
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Add/remove mouse move listener based on visibility
  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible, handleMouseMove]);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  }, []);

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Tooltip portal */}
      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed px-3 py-1.5 bg-white/95 backdrop-blur-md border border-white/40 rounded-xl text-neutral-90 text-xs font-medium pointer-events-none shadow-lg flex items-center justify-center text-center select-none"
            style={{
              left: `${position.x + 16}px`,
              top: `${position.y - 8}px`,
              transform: "translate(0%, -50%)",
              zIndex: 999999,
              position: "fixed",
              transition: "opacity 200ms ease-out",
              opacity: 1,
            }}
          >
            <span className="text-xs font-medium leading-tight">
              {tooltipText}
            </span>
          </div>,
          document.body
        )}
    </>
  );
}
