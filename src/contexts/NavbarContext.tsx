"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSectionClick: (sectionId: string) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("summary");

  const onSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <NavbarContext.Provider
      value={{ activeSection, setActiveSection, onSectionClick }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
