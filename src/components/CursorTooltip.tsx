"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CursorTooltipProps {
  children: React.ReactNode;
}

interface TooltipData {
  text: string;
  icon?: React.ReactNode;
}

export default function CursorTooltip({ children }: CursorTooltipProps) {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const childRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isVisible) {
        setPosition({
          x: e.clientX, // 0px offset - directly on cursor
          y: e.clientY, // 0px offset - directly on cursor
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  // Create context for tooltip data
  const tooltipContext = {
    showTooltip: (data: TooltipData) => {
      console.log("Showing tooltip:", data);
      setTooltipData(data);
      // Small delay for smoother appearance
      setTimeout(() => setIsVisible(true), 50);
    },
    hideTooltip: () => {
      console.log("Hiding tooltip");
      setIsVisible(false);
      // Delay clearing data to allow fade out
      setTimeout(() => setTooltipData(null), 300);
    },
  };

  // Debug tooltip rendering
  useEffect(() => {
    if (isVisible && tooltipData) {
      console.log(
        "Tooltip should be visible at position:",
        position,
        "with data:",
        tooltipData
      );
    }
  }, [isVisible, tooltipData, position]);

  return (
    <>
      {/* Render children with tooltip context */}
      <div
        onMouseEnter={(e) => {
          console.log("Mouse enter on tooltip wrapper");
          // Find the child element that has the data attributes
          const childElement = e.currentTarget.firstElementChild as HTMLElement;
          if (childElement) {
            const tooltipText = childElement.getAttribute("data-tooltip");
            const tooltipIcon = childElement.getAttribute("data-tooltip-icon");

            console.log("Tooltip text:", tooltipText);
            console.log("Tooltip icon:", tooltipIcon);

            if (tooltipText) {
              tooltipContext.showTooltip({
                text: tooltipText,
                icon: tooltipIcon ? <span>{tooltipIcon}</span> : undefined,
              });
            }
          }
        }}
        onMouseLeave={() => {
          console.log("Mouse leave on tooltip wrapper");
          tooltipContext.hideTooltip();
        }}
      >
        {children}
      </div>

      {/* Cursor-following tooltip - rendered via portal to ensure it's above everything */}
      {isVisible &&
        tooltipData &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed px-4 py-3 bg-red-500 border-2 border-white rounded-lg text-white text-base font-bold pointer-events-none whitespace-nowrap transition-all duration-300 ease-out"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              opacity: isVisible ? 1 : 0,
              zIndex: 999999,
              position: "fixed",
              transform: isVisible ? "scale(1)" : "scale(0.95)",
            }}
          >
            <div className="flex items-center gap-2">
              {tooltipData.icon && <span>{tooltipData.icon}</span>}
              <span>{tooltipData.text}</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
