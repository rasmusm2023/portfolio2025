"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    src: string;
    alt: string;
    title: string;
  }>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const CustomLightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) => {
  // Convert our image format to the library's format
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title,
  }));

  // Add custom CSS for border radius and styling
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .yarl__slide img {
        border-radius: 16px !important;
      }
      .yarl__slide {
        position: relative;
      }
      .lightbox-title {
        position: absolute;
        top: -60px;
        left: 0;
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        text-align: left;
        z-index: 10;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }
      .lightbox-close-btn {
        position: absolute;
        top: -60px;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 10;
      }
      .lightbox-close-btn:hover {
        background: rgba(0, 0, 0, 0.9);
        border-color: rgba(255, 255, 255, 0.5);
        transform: scale(1.1);
      }
      .lightbox-close-btn::after {
        content: "Close";
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      .lightbox-close-btn:hover::after {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={slides}
      carousel={{
        finite: true,
      }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
        buttonClose: () => null,
        slide: ({ slide, rect }) => (
          <div style={{ position: "relative" }}>
            <div className="lightbox-title">{images[currentIndex].title}</div>
            <button className="lightbox-close-btn" onClick={onClose}>
              <X size={24} color="white" />
            </button>
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "16px",
              }}
            />
          </div>
        ),
      }}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
        },
        slide: {
          borderRadius: "16px",
        },
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
    />
  );
};

export default CustomLightbox;
