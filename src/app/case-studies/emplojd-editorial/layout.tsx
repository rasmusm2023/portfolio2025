import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emplojd — Case Study | Rasmus Mattsson",
  description:
    "Editorial case study: AI-assisted job search and cover letters — research, workshops, design system, and validation during the Chas Challenge.",
};

export default function EmplojdEditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
