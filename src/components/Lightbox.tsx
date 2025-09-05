"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  // Convert our image format to the library's format
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title,
  }));

  // Update active index when currentIndex changes
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      onNavigate(newIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      onNavigate(newIndex);
    }
  };

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
      .lightbox-nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 20;
        backdrop-filter: blur(8px);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }
      .lightbox-nav-arrow:hover {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 0.8);
        transform: translateY(-50%) scale(1.1);
      }
      .lightbox-nav-arrow svg {
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
      }
      .lightbox-nav-arrow.disabled {
        opacity: 0.3;
        cursor: not-allowed;
        pointer-events: none;
      }
      .lightbox-nav-arrow.left {
        left: -80px;
      }
      .lightbox-nav-arrow.right {
        right: -80px;
      }
      .lightbox-image-container {
        position: relative;
        margin: 0 100px;
        overflow: visible;
        background: rgba(0, 0, 0, 0.9);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        index={activeIndex}
        slides={slides}
        carousel={{
          finite: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          buttonClose: () => null,
          slide: ({ slide, rect }) => {
            // Find the current image by matching the src
            const currentImage =
              images.find((img) => img.src === slide.src) ||
              images[activeIndex];
            return (
              <div
                style={{ position: "relative" }}
                className="lightbox-content"
              >
                <div className="lightbox-image-container">
                  <div className="lightbox-title">{currentImage.title}</div>
                  <button className="lightbox-close-btn" onClick={onClose}>
                    <X size={24} color="#333333" />
                  </button>
                  {/* Navigation Arrows */}
                  <button
                    className={`lightbox-nav-arrow left ${
                      activeIndex === 0 ? "disabled" : ""
                    }`}
                    onClick={handlePrevious}
                    disabled={activeIndex === 0}
                  >
                    <ChevronLeft size={24} color="#000000" />
                  </button>

                  <button
                    className={`lightbox-nav-arrow right ${
                      activeIndex === images.length - 1 ? "disabled" : ""
                    }`}
                    onClick={handleNext}
                    disabled={activeIndex === images.length - 1}
                  >
                    <ChevronRight size={24} color="#000000" />
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
            );
          },
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
