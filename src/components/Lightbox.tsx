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
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid rgba(255, 255, 255, 0.8);
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
        background: rgba(255, 255, 255, 1);
        border-color: rgba(255, 255, 255, 1);
        transform: scale(1.1);
      }
      .lightbox-close-btn::after {
        content: "Close";
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        color: #333333;
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
      .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
      }
      .lightbox-content {
        position: relative;
        z-index: 10000;
      }
      .lightbox-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9998;
        background-color: transparent;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className={isOpen ? "lightbox-overlay lightbox-backdrop" : ""}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
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
            <div style={{ position: "relative" }} className="lightbox-content">
              <div className="lightbox-image-container">
                <div className="lightbox-title">
                  {images[currentIndex].title}
                </div>
                <button className="lightbox-close-btn" onClick={onClose}>
                  <X size={24} color="#333333" />
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
    </div>
  );
};

export default CustomLightbox;
