"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CaseStudyContextType {
  isCaseStudyPage: boolean;
  setIsCaseStudyPage: (value: boolean) => void;
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(
  undefined
);

export const useCaseStudy = () => {
  const context = useContext(CaseStudyContext);
  if (context === undefined) {
    throw new Error("useCaseStudy must be used within a CaseStudyProvider");
  }
  return context;
};

interface CaseStudyProviderProps {
  children: ReactNode;
}

export const CaseStudyProvider: React.FC<CaseStudyProviderProps> = ({
  children,
}) => {
  const [isCaseStudyPage, setIsCaseStudyPage] = useState(false);

  return (
    <CaseStudyContext.Provider value={{ isCaseStudyPage, setIsCaseStudyPage }}>
      {children}
    </CaseStudyContext.Provider>
  );
};
