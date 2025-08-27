"use client";

import { useEffect, useState } from "react";

interface VerticalFloatingNavbarSkeletonProps {
  loadingProgress?: number;
}

const VerticalFloatingNavbarSkeleton = ({
  loadingProgress = 0,
}: VerticalFloatingNavbarSkeletonProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide skeleton after a minimum display time to prevent flashing
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-1/2 z-[1000] flex items-center w-18 transition-opacity duration-500 animate-pulse"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      {/* Progress Bar Skeleton - Vertical */}
      <div className="relative">
        <div
          className="w-2 overflow-hidden"
          style={{
            height: "calc(100vh - 192px)", // Full viewport height minus header
            background:
              "linear-gradient(to bottom, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0))",
          }}
        >
          {/* Loading Progress Bar */}
          <div
            className="w-full transition-all duration-300 ease-out absolute top-0"
            style={{
              height: `${loadingProgress}%`,
              background:
                "linear-gradient(to bottom, #3B82F6, #8B5CF6, #A855F7)",
            }}
          />
        </div>
      </div>

             {/* Navigation Items Skeleton - Vertical Stack */}
       <div className="flex flex-col gap-8 ml-8">
         {/* Overview Skeleton */}
         <div className="w-24 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
         
         {/* Context Skeleton */}
         <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
         
         {/* Design Skeleton */}
         <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
         
         {/* Approach Skeleton */}
         <div className="w-24 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
         
         {/* Insights Skeleton */}
         <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
         
         {/* Outcomes Skeleton */}
         <div className="w-24 h-8 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse"></div>
       </div>
    </div>
  );
};

export default VerticalFloatingNavbarSkeleton;
