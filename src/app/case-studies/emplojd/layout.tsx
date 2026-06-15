import type { Metadata } from "next";
import { bricolageGrotesque } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Emplojd | Case Study | Rasmus Mattsson",
  description:
    "Editorial case study: an AI-assisted job application platform built during Chas Challenge 2024.",
};

export default function EmplojdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={bricolageGrotesque.variable}>{children}</div>;
}
