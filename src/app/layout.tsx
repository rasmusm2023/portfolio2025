import type { Metadata } from "next";
import { hankenGrotesk, orbitron, audiowide, montserrat } from "./fonts";
import "./globals.css";
import ClientLayout from "./ClientLayout";
// import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { CaseStudyProvider } from "@/contexts/CaseStudyContext";
import FloatingNavbar from "@/components/FloatingNavbar";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Rasmus Portfolio",
  description: "My portfolio website",
  // Add performance optimizations
  other: {
    "X-DNS-Prefetch-Control": "on",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/rm-logo-portfolio-white.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/rm-logo-portfolio-dark.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${hankenGrotesk.className} ${orbitron.variable} ${audiowide.variable} ${montserrat.variable} antialiased bg-neutral-0 dark:bg-neutral-100 transition-colors duration-300`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <NavbarProvider>
              <CaseStudyProvider>
                <PerformanceOptimizer />
                <PerformanceMonitor />
                <Header />
                {/* <CustomCursor /> */}
                <div
                  id="smooth-wrapper"
                  className="fixed inset-0 overflow-hidden"
                >
                  <div id="smooth-content" className="relative">
                    <ClientLayout>{children}</ClientLayout>
                  </div>
                </div>
                <FloatingNavbar />
              </CaseStudyProvider>
            </NavbarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
