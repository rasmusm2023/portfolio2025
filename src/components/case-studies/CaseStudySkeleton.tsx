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
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] relative animate-pulse">
      {/* Loading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-60 z-50">
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
      <section className="pt-20 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Back Button Skeleton */}
          <div className="flex items-start gap-0 mb-8 sm:mb-0">
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-10 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-l-lg h-full w-40 sm:w-auto justify-start"></div>
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-neutral-90 dark:bg-neutral-0 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 sm:border-l-0 rounded-r-lg lg:rounded-lg sm:rounded-l-none lg:rounded-r-lg flex items-center h-full relative w-auto justify-start"></div>
          </div>

          {/* Title Skeleton */}
          <div className="mt-8 sm:mt-16 mb-4 sm:mb-6 max-w-full lg:max-w-[640px]">
            <div className="w-full h-16 sm:h-20 bg-neutral-200 dark:bg-neutral-60 rounded-lg"></div>
          </div>

          {/* Subtitle Skeleton */}
          <div className="mb-8 sm:mb-12 max-w-full lg:max-w-[640px]">
            <div className="w-3/4 h-8 sm:h-10 bg-neutral-200 dark:bg-neutral-60 rounded-lg"></div>
          </div>

          {/* Bento Boxes Skeleton */}
          <div className="mt-8 sm:mt-12 max-w-full lg:max-w-[640px]">
            {/* Role Box */}
            <div className="w-full p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg mb-4 sm:mb-6 min-h-[70px] sm:min-h-[80px]"></div>

            {/* Simple Grid Layout */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Company Box */}
              <div className="p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px]"></div>
              {/* Year Box */}
              <div className="p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px]"></div>
              {/* Team Box - bottom, spans full width */}
              <div className="col-span-2 p-3 sm:p-4 bg-neutral-3 dark:bg-neutral-90 backdrop-blur-sm border border-neutral-100/10 dark:border-neutral-90/10 rounded-lg min-h-[70px] sm:min-h-[80px]"></div>
            </div>

            {/* Button Skeleton */}
            <div className="w-full mt-4 h-12 sm:h-14 bg-neutral-200 dark:bg-neutral-60 rounded-xl"></div>
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="mt-8 sm:mt-12 lg:absolute lg:top-24 lg:left-[calc(50%+150px)] lg:right-0 lg:z-10">
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[860px] bg-neutral-200 dark:bg-neutral-60 rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-2xl lg:rounded-bl-2xl"></div>
        </div>

        {/* Spacer - Responsive height */}
        <div className="h-[100px] sm:h-[150px] lg:h-[200px]"></div>
      </section>

      {/* Summary Section Skeleton */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded mb-6 sm:mb-8"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              </div>
              {/* Logo Box Skeleton */}
              <div className="w-full h-24 sm:h-32 mt-4 sm:mt-6 bg-neutral-3 dark:bg-[#060608] rounded-lg flex items-center px-4 sm:px-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-[600px]">
              <div className="w-40 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              </div>
              {/* Context Box Skeleton */}
              <div className="w-full h-32 sm:h-48 bg-neutral-200 dark:bg-neutral-60 rounded-2xl mb-6 sm:mb-8"></div>
              {/* Goals Box Skeleton */}
              <div className="w-full h-32 sm:h-48 bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              </div>
              {/* Features Box Skeleton */}
              <div className="w-full h-48 sm:h-64 bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
            <div className="w-full lg:w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
          </div>

          {/* Craft Boxes Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-6 sm:p-8 bg-neutral-10/50 dark:bg-neutral-90/50 rounded-2xl"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
                  <div className="flex-1 w-full sm:w-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design System Section Skeleton */}
      <section className="py-12 sm:py-16 bg-neutral-10 dark:bg-neutral-90">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="w-full lg:w-[600px] mb-6 sm:mb-8">
            <div className="w-64 sm:w-80 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
            <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
          </div>
          <div className="w-full h-[400px] sm:h-[600px] lg:h-[800px] bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
        </div>
      </section>

      {/* Process Section Skeleton */}
      <section className="py-12 sm:py-16 bg-neutral-3 dark:bg-neutral-90">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-[600px]">
              <div className="w-32 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              {/* Morphing SVG Skeleton */}
              <div className="mt-6 sm:mt-8 w-full sm:w-96 h-64 sm:h-96 bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-3 sm:space-y-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
            <div className="w-full lg:w-[600px]">
              <div className="w-48 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
                <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
              </div>
            </div>
          </div>

          {/* Workshop Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 w-full mb-12 sm:mb-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 sm:p-6 bg-neutral-200 dark:bg-neutral-60 rounded-2xl"
              ></div>
            ))}
          </div>

          {/* Workshop Image Skeleton */}
          <div className="w-full h-[400px] sm:h-[600px] lg:h-[800px] bg-neutral-200 dark:bg-neutral-60 rounded-2xl"></div>
        </div>
      </section>

      {/* Insights Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-20">
            <div className="w-full lg:w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
            <div className="w-full lg:w-[600px]">
              <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
          </div>

          {/* Insights Grid Skeleton */}
          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-neutral-3 dark:bg-neutral-90 rounded-2xl p-6 sm:p-8 md:p-10"
              >
                <div className="w-32 h-8 bg-neutral-200 dark:bg-neutral-60 rounded mb-6 sm:mb-8"></div>
                <div className="space-y-4 sm:space-y-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockup Section Skeleton */}
      <section className="w-full">
        <div className="w-full grid grid-cols-2" style={{ aspectRatio: "2/1" }}>
          <div className="bg-neutral-0 dark:bg-[#060608]"></div>
          <div className="bg-neutral-0 dark:bg-[#060608]"></div>
        </div>
      </section>

      {/* Results Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-start mb-6 sm:mb-8">
            <div className="w-full lg:w-[600px]">
              <div className="w-24 h-16 bg-neutral-200 dark:bg-neutral-60 rounded-lg mb-4"></div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-60 rounded"></div>
            </div>
          </div>
          {/* Prototype Showcase Skeleton */}
          <div className="w-full h-[400px] sm:h-[600px] lg:h-[987px] bg-neutral-200 dark:bg-neutral-60 rounded-2xl mb-12 sm:mb-16"></div>
        </div>
      </section>

      {/* Other Case Studies Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-5 to-neutral-10 dark:from-neutral-100 dark:to-neutral-90">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[10%]"></div>
          <div className="w-full lg:w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-48 sm:w-64 h-6 sm:h-8 bg-neutral-200 dark:bg-neutral-60 rounded mb-3 sm:mb-4 mx-auto"></div>
              <div className="w-80 sm:w-96 h-5 sm:h-6 bg-neutral-200 dark:bg-neutral-60 rounded mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/2] bg-neutral-200 dark:bg-neutral-60 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[10%]"></div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="container mx-auto">
          <div className="w-full h-24 sm:h-32 bg-neutral-200 dark:bg-neutral-60 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySkeleton;
