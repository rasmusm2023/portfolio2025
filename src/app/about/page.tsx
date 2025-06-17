"use client";

import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-8 pt-32">
          <h1 className="text-4xl font-medium text-neutral-0 mb-8 font-hanken">
            About Me
          </h1>
          <p className="text-lg text-neutral-30">Coming soon...</p>
        </main>
      </div>
    </div>
  );
}
