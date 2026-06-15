import type { Metadata } from "next";
import { bricolageGrotesque } from "@/app/fonts";

export const metadata: Metadata = {
  title: "El Portero — Case Study | Rasmus Mattsson",
  description:
    "Editorial case study: a modern restaurant website with seamless booking and a tailor-made admin portal for staff.",
};

export default function ElPorteroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={bricolageGrotesque.variable}>{children}</div>;
}
