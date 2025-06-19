import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
// import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rasmus Portfolio",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${hanken.className} antialiased bg-neutral-100`}>
        <Header />
        {/* <CustomCursor /> */}
        <div id="smooth-wrapper" className="fixed inset-0 overflow-hidden">
          <div id="smooth-content" className="relative">
            <ClientLayout>{children}</ClientLayout>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
