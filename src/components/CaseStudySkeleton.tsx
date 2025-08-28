"use client";

import { useEffect, useState } from "react";

interface CaseStudySkeletonProps {
  loadingProgress?: number;
}

const CaseStudySkeleton = ({ loadingProgress = 0 }: CaseStudySkeletonProps) => {
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
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 relative animate-pulse">
      {/* Loading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-600 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>

      {/* Loading Percentage */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black px-4 py-2 rounded-lg font-bold text-sm">
          Loading... {loadingProgress}%
        </div>
      </div>

      {/* Header Section Skeleton */}
      <section className="pt-40 pb-16 relative">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Back Button Skeleton */}
          <div className="flex items-start gap-0">
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-10 dark:bg-neutral-90 rounded-l-lg h-12 w-32">
              <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-full"></div>
              <div className="w-20 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="px-4 py-3 bg-neutral-90 dark:bg-neutral-0 border-l-0 rounded-r-lg flex items-center h-12 w-32">
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="mt-16 mb-8 max-w-[640px]">
            <div className="w-full h-20 bg-neutral-200 dark:bg-neutral-600 rounded-lg"></div>
          </div>

          {/* Bento Boxes Skeleton */}
          <div className="mt-12 max-w-[640px]">
            {/* Role Box */}
            <div className="w-full p-4 bg-neutral-3 dark:bg-neutral-90 rounded-lg mb-6 min-h-[80px]">
              <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-600 rounded mb-2"></div>
              <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-3 dark:bg-neutral-90 rounded-lg min-h-[80px]">
                <div className="w-20 h-4 bg-neutral-200 dark:bg-neutral-600 rounded mb-2"></div>
                <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
              <div className="p-4 bg-neutral-3 dark:bg-neutral-90 rounded-lg min-h-[80px]">
                <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-600 rounded mb-2"></div>
                <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
              <div className="col-span-2 p-4 bg-neutral-3 dark:bg-neutral-90 rounded-lg min-h-[80px]">
                <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-600 rounded mb-2"></div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                  <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="w-full mt-4 h-14 bg-neutral-200 dark:bg-neutral-600 rounded-xl"></div>
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="absolute top-24 left-[calc(50%+200px)] right-0 z-10">
          <div className="w-3/4 h-12 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-8"></div>
          <div className="w-full h-[860px] bg-neutral-200 dark:bg-neutral-600 rounded-2xl">
            {/* Technology Pills Skeleton */}
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-8 bg-neutral-300 dark:bg-neutral-600 rounded-full"
                  ></div>
                ))}
              </div>
              {/* Video Container Skeleton */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[900px] h-[600px] bg-neutral-300 dark:bg-neutral-600 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section Skeleton */}
      <section className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12">
            <div className="w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded mb-8"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-16 bg-neutral-10/80 dark:bg-neutral-90/80">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12">
            <div className="w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
              {/* Logo Box Skeleton */}
              <div className="w-full h-32 mt-6 bg-neutral-3 dark:bg-neutral-100 rounded-lg flex items-center px-6">
                <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-600 rounded-lg"></div>
                <div className="flex-1 flex justify-center">
                  <div className="w-32 h-10 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section Skeleton */}
      <section className="py-16 bg-neutral-10/80 dark:bg-neutral-90/80">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12">
            <div className="w-[600px]">
              <div className="w-40 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-6 mb-16">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
              {/* Context Box Skeleton */}
              <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-600 rounded-2xl mb-8"></div>
              {/* Goals Box Skeleton */}
              <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section Skeleton */}
      <section className="py-16 bg-neutral-10/80 dark:bg-neutral-90/80">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12">
            <div className="w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-6 mb-16">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
              {/* Features Box Skeleton */}
              <div className="w-full h-64 bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Section Skeleton */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12 mb-16">
            <div className="w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
          </div>

          {/* Craft Boxes Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-8 bg-neutral-10/50 dark:bg-neutral-90/50 rounded-2xl"
              >
                <div className="flex items-center gap-6">
                  <div className="w-40 h-40 bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
                  <div className="flex-1">
                    <div className="w-64 h-8 bg-neutral-200 dark:bg-neutral-600 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                      <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                      <div className="w-3/4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design System Section Skeleton */}
      <section className="py-16 bg-neutral-10 dark:bg-neutral-90">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="w-[600px] mb-8">
            <div className="w-80 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
            <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
          </div>
          <div className="w-full h-[800px] bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
        </div>
      </section>

      {/* Process Section Skeleton */}
      <section className="py-16 bg-neutral-3 dark:bg-neutral-90">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12">
            <div className="w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              {/* Morphing SVG Skeleton */}
              <div className="mt-8 w-96 h-96 bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-purple-400 rounded-full mt-1"></div>
                    <div className="w-48 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section Skeleton */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12 mb-16">
            <div className="w-[600px]">
              <div className="w-48 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              </div>
            </div>
          </div>

          {/* Workshop Cards Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full mb-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-6 bg-neutral-200 dark:bg-neutral-600 rounded-2xl"
              >
                <div className="w-32 h-6 bg-neutral-300 dark:bg-neutral-600 rounded mb-3"></div>
                <div className="w-full h-4 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
              </div>
            ))}
          </div>

          {/* Workshop Image Skeleton */}
          <div className="w-full h-[800px] bg-neutral-200 dark:bg-neutral-600 rounded-2xl"></div>
        </div>
      </section>

      {/* Insights Section Skeleton */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-center gap-12 mb-20">
            <div className="w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
            <div className="w-[600px]">
              <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
          </div>

          {/* Insights Grid Skeleton */}
          <div className="grid grid-cols-1 gap-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-neutral-3 dark:bg-neutral-90 rounded-2xl p-10"
              >
                <div className="w-32 h-8 bg-neutral-200 dark:bg-neutral-600 rounded mb-8"></div>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-full mt-1"></div>
                      <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockup Section Skeleton */}
      <section className="w-full">
        <div className="w-full grid grid-cols-2" style={{ aspectRatio: "2/1" }}>
          <div className="bg-neutral-0 dark:bg-neutral-100"></div>
          <div className="bg-neutral-0 dark:bg-neutral-100"></div>
        </div>
      </section>

      {/* Results Section Skeleton */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-start mb-8">
            <div className="w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
            </div>
          </div>
          {/* Prototype Showcase Skeleton */}
          <div className="w-full h-[987px] bg-neutral-200 dark:bg-neutral-600 rounded-2xl mb-16"></div>
        </div>
      </section>

      {/* Other Case Studies Section Skeleton */}
      <section className="py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-95 dark:to-neutral-90">
        <div className="flex">
          <div className="w-[10%]"></div>
          <div className="w-[80%] px-8">
            <div className="text-center mb-12">
              <div className="w-64 h-8 bg-neutral-200 dark:bg-neutral-600 rounded mb-4 mx-auto"></div>
              <div className="w-96 h-6 bg-neutral-200 dark:bg-neutral-600 rounded mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/2] bg-neutral-200 dark:bg-neutral-600 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
          <div className="w-[10%]"></div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="pt-16 pb-16">
        <div className="container mx-auto">
          <div className="w-full h-32 bg-neutral-200 dark:bg-neutral-600 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySkeleton;
