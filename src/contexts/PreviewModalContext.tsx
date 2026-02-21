"use client";

import React, { createContext, useContext, useState } from "react";
import type { CaseStudyPreviewData } from "@/components/work/CaseStudyPreviewModal";

interface PreviewModalContextType {
  isPreviewModalOpen: boolean;
  setPreviewModalOpen: (open: boolean) => void;
  /** Open the preview modal with case study data (used from home work grid) */
  openPreview: (data: CaseStudyPreviewData | null) => void;
  /** Close the preview modal */
  closePreview: () => void;
  /** Current preview data when modal is open */
  previewData: CaseStudyPreviewData | null;
}

const PreviewModalContext = createContext<PreviewModalContextType | undefined>(
  undefined
);

export function usePreviewModal() {
  const context = useContext(PreviewModalContext);
  if (context === undefined) {
    throw new Error("usePreviewModal must be used within a PreviewModalProvider");
  }
  return context;
}

export function PreviewModalProvider({ children }: { children: React.ReactNode }) {
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<CaseStudyPreviewData | null>(null);

  const openPreview = (data: CaseStudyPreviewData | null) => {
    setPreviewData(data ?? null);
    setPreviewModalOpen(true);
  };

  const closePreview = () => {
    setPreviewModalOpen(false);
    setPreviewData(null);
  };

  return (
    <PreviewModalContext.Provider
      value={{
        isPreviewModalOpen,
        setPreviewModalOpen,
        openPreview,
        closePreview,
        previewData,
      }}
    >
      {children}
    </PreviewModalContext.Provider>
  );
}
