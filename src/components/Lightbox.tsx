"use client";

import { useState } from "react";
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
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
      }}
    />
  );
};

export default CustomLightbox;
