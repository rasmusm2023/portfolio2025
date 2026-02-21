"use client";

import CaseStudyExpandLayout from "@/components/work/CaseStudyExpandLayout";
import CaseStudyPlaceholder from "@/components/work/CaseStudyPlaceholder";
import { caseStudyPreviews } from "@/data/caseStudyPreviews";

export default function NotedCaseStudy() {
  const data = caseStudyPreviews.noted;
  return (
    <CaseStudyExpandLayout data={data} title="Noted">
      <CaseStudyPlaceholder />
    </CaseStudyExpandLayout>
  );
}
