"use client";

import { useState } from "react";
import CustomLightbox from "@/components/Lightbox";
import AnimatedBlob from "@/components/AnimatedBlob";

// Sample gallery data - replace with your actual images
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    alt: "UI Design Mockup",
    title: "E-commerce Dashboard Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    alt: "Mobile App Interface",
    title: "Mobile Banking App Interface",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    alt: "Data Visualization",
    title: "Analytics Dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: "Web Design",
    title: "Corporate Website Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=800&fit=crop",
    alt: "App Screens",
    title: "Fitness App Screens",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    alt: "Dashboard Design",
    title: "Admin Panel Design",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
    alt: "Brand Identity",
    title: "Brand Identity Design",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: "Landing Page",
    title: "SaaS Landing Page",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    alt: "Mobile Design",
    title: "Travel App Design",
  },
];

export default function DesignGalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(255, 181, 113, 0.6)", // Orange
                secondary: "rgba(255, 217, 61, 0.4)", // Yellow
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-design-gallery)] bg-clip-text text-transparent font-hanken">
                    Design Gallery
                  </span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      Miscellaneous
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                    A collection of design work that doesn't fit into
                    traditional case studies - from branding and logos to
                    typography, print design, and experimental projects.
                  </p>
                  <p className="text-neutral-60 text-lg font-normal leading-relaxed tracking-wide max-w-[40rem]">
                    These pieces showcase my versatility across different design
                    disciplines, demonstrating creative thinking and technical
                    skills beyond just UX/UI work.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Gallery Grid */}
          <section className="py-16">
            <div className="text-left w-full max-w-[1600px]">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[250px]">
                {/* Large hero image - spans 4 columns */}
                <div className="md:col-span-4 lg:col-span-5 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(0)}
                  />
                </div>

                {/* Tall vertical image - spans 2 rows */}
                <div className="md:col-span-2 lg:col-span-3 md:row-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(1)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(2)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(3)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(4)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[5].src}
                    alt={galleryImages[5].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(5)}
                  />
                </div>

                {/* Wide horizontal image - spans 3 columns */}
                <div className="md:col-span-3 lg:col-span-4 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[6].src}
                    alt={galleryImages[6].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(6)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[7].src}
                    alt={galleryImages[7].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(7)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[8].src}
                    alt={galleryImages[8].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(8)}
                  />
                </div>

                {/* Tall vertical image - spans 2 rows */}
                <div className="md:col-span-2 lg:col-span-3 md:row-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(0)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(1)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(2)}
                  />
                </div>

                {/* Medium square image */}
                <div className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(3)}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Lightbox */}
      <CustomLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
