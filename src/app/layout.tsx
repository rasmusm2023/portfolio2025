import type { Metadata } from "next";
import {
  hankenGrotesk,
  orbitron,
  audiowide,
  montserrat,
  instrumentSerif,
  instrumentSans,
  bricolageGrotesque,
} from "./fonts";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import SmoothScroll from "./SmoothScroll";
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
  icons: {
    icon: "/assets/favicons/rm-favicon.svg",
    apple: "/assets/favicons/rm-favicon-256x256.png",
  },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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

        {/* Favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicons/rm-favicon.svg"
        />

        {/* PNG fallbacks for browsers that do not use SVG favicons */}
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

        {/* Prevent flash of unstyled content by setting theme immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    // Default to light mode for new visitors or if theme is not 'dark'
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Default to light mode if localStorage is not available
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${hankenGrotesk.className} ${orbitron.variable} ${audiowide.variable} ${montserrat.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${bricolageGrotesque.variable} antialiased bg-neutral-0 dark:bg-[#060608] transition-colors duration-300`}
      >
        <SmoothScroll>
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
        </SmoothScroll>
      </body>
    </html>
  );
}
