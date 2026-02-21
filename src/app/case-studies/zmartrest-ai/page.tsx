"use client";

import CaseStudyExpandLayout from "@/components/work/CaseStudyExpandLayout";
import CaseStudyPlaceholder from "@/components/work/CaseStudyPlaceholder";
import { caseStudyPreviews } from "@/data/caseStudyPreviews";

export default function ZmartrestAICaseStudy() {
  const data = caseStudyPreviews["zmartrest-ai"];
  return (
    <CaseStudyExpandLayout data={data} title="Zmartrest AI">
      <CaseStudyPlaceholder />
    </CaseStudyExpandLayout>
  );
}
