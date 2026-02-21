"use client";

import CaseStudyExpandLayout from "@/components/work/CaseStudyExpandLayout";
import CaseStudyPlaceholder from "@/components/work/CaseStudyPlaceholder";
import { caseStudyPreviews } from "@/data/caseStudyPreviews";

export default function EmplojdCaseStudy() {
  const data = caseStudyPreviews.emplojd;
  return (
    <CaseStudyExpandLayout data={data} title="Emplojd">
      <CaseStudyPlaceholder />
    </CaseStudyExpandLayout>
  );
}
