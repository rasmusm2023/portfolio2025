"use client";

import { usePreviewModal } from "@/contexts/PreviewModalContext";
import CaseStudyPreviewModal from "./CaseStudyPreviewModal";

/**
 * Renders the case study preview modal from layout so it stays mounted during
 * navigation. This allows the expand animation to run fully before the page changes.
 */
export default function PreviewModalGate() {
  const { isPreviewModalOpen, closePreview, previewData } = usePreviewModal();
  return (
    <CaseStudyPreviewModal
      isOpen={isPreviewModalOpen}
      onClose={closePreview}
      data={previewData}
    />
  );
}
