import type { Metadata } from "next";
import {
  hankenGrotesk,
  orbitron,
  audiowide,
  montserrat,
  instrumentSerif,
} from "./fonts";
import "./globals.css";
import ClientLayout from "./ClientLayout";
// import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/layout/Header";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { CaseStudyProvider } from "@/contexts/CaseStudyContext";
import FloatingNavbar from "@/components/layout/FloatingNavbar";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export const metadata: Metadata = {
  title: "Rasmus Mattsson | Product Designer Portfolio",
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
          href="/assets/logos/rm/rm-logo-portfolio-white.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/assets/logos/rm/rm-logo-portfolio-dark.svg"
          as="image"
          type="image/svg+xml"
        />

        {/* Favicons - SVG primary, PNG fallbacks */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicons/rm-favicon-16x16.svg"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicons/rm-favicon-32x32.svg"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicons/rm-favicon-48x48.svg"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicons/rm-favicon-256x256.svg"
          sizes="256x256"
        />

        {/* PNG fallbacks */}
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicons/rm-favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicons/rm-favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicons/rm-favicon-48x48.png"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicons/rm-favicon-256x256.png"
          sizes="256x256"
        />

        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          href="/assets/favicons/rm-favicon-256x256.png"
          sizes="256x256"
        />
      </head>
      <body
        className={`${hankenGrotesk.className} ${orbitron.variable} ${audiowide.variable} ${montserrat.variable} ${instrumentSerif.variable} antialiased bg-neutral-0 dark:bg-[#060608] transition-colors duration-300`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <NavbarProvider>
              <CaseStudyProvider>
                <PerformanceOptimizer />
                <PerformanceMonitor />
                <Header />
                {/* <CustomCursor /> */}
                <ClientLayout>{children}</ClientLayout>
                <FloatingNavbar />
              </CaseStudyProvider>
            </NavbarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
