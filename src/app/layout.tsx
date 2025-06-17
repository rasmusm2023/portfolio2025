import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import CustomCursor from "@/components/CustomCursor";
import { hankenGrotesk } from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio 2025",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable}`}>
      <body className={inter.className}>
        <CustomCursor />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
