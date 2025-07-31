"use client";

import { useState } from "react";
import CustomLightbox from "@/components/Lightbox";
import AnimatedBlob from "@/components/AnimatedBlob";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300">
      <div className="relative z-10">
        <main className="container mx-auto">
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
                  <span className="[background-image:var(--gradient-hero-design-gallery)] dark:[background-image:var(--gradient-hero-design-gallery-dark)] bg-clip-text text-transparent font-hanken">
                    Design Gallery
                  </span>
                </h1>
                <div className="flex justify-between items-start mt-16">
                  <div className="flex-1 max-w-[48rem]">
                    <p className="text-neutral-70 dark:text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide">
                      A collection of design work that doesn't fit into
                      traditional case studies — from branding and logos to
                      typography, print design, and experimental projects. These
                      go beyond just UX/UI work.
                    </p>
                  </div>
                  <div className="ml-8">
                    <span className="text-neutral-60 dark:text-neutral-40 text-5xl font-medium font-hanken tracking-wide">
                      Miscellaneous
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Gallery Grid */}
          <section className="py-16">
            <div className="text-left w-full max-w-[1600px]">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 auto-rows-[250px]">
                {/* Large hero image - spans 4 columns */}
                <div
                  className="md:col-span-4 lg:col-span-5 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(0)}
                  />
                </div>

                {/* Tall vertical image - spans 2 rows */}
                <div
                  className="md:col-span-2 lg:col-span-3 md:row-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(1)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(2)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(3)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(4)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[5].src}
                    alt={galleryImages[5].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(5)}
                  />
                </div>

                {/* Wide horizontal image - spans 3 columns */}
                <div
                  className="md:col-span-3 lg:col-span-4 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[6].src}
                    alt={galleryImages[6].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(6)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[7].src}
                    alt={galleryImages[7].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(7)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[8].src}
                    alt={galleryImages[8].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(8)}
                  />
                </div>

                {/* Tall vertical image - spans 2 rows */}
                <div
                  className="md:col-span-2 lg:col-span-3 md:row-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(0)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(1)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(2)}
                  />
                </div>

                {/* Medium square image */}
                <div
                  className="md:col-span-2 lg:col-span-2 group cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-80/40 hover:scale-[1.02] transition-transform duration-300 [background-size:20px_20px] [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
                  style={{
                    backgroundColor:
                      document.documentElement.classList.contains("dark")
                        ? "rgba(35, 35, 35, 0.5)"
                        : "#ffffff",
                  }}
                >
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

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
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
