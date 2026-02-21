import type { CaseStudyPreviewData } from "@/components/work/CaseStudyPreviewModal";

export const caseStudyPreviews: Record<string, CaseStudyPreviewData> = {
  emplojd: {
    title: "Emplojd",
    description:
      "Enhancing job applications without compromising authenticity.",
    timeline: "2024",
    team: "2 UX/UI Designers\n6 Developers\n1 Project Manager",
    role: "UX/UI Designer",
    industry: "Career Technology",
    logoUrl: "/assets/logos/CaseStudies/Emplojd/Emplojd-App-Icon.svg",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center",
    heroImageAlt: "Emplojd - HR Platform Dashboard",
    fullLink: "/case-studies/emplojd",
  },
  noted: {
    title: "Noted",
    description: "Revolutionary note-taking and task management experience.",
    timeline: "2025",
    team: "Me, myself and I.",
    role: "Product Design",
    industry: "Productivity Software",
    websiteUrl: "https://noted-beta.netlify.app/",
    logoUrl: "/assets/logos/Experience/noted-logo-light-mode.svg",
    heroImage: "/assets/case-study-assets/noted/noted-preview.png",
    heroImageAlt: "Noted app interface",
    fullLink: "/case-studies/noted",
  },
  "zmartrest-ai": {
    title: "Zmartrest AI",
    description:
      "Intelligent restaurant management and health-tech for sustainable worklife.",
    timeline: "2025",
    team: "1 Product Designer\n1 AI/Data Engineer\n1 Product Manager\n1 Fullstack Developer",
    role: "Product Design",
    industry: "AI Health-tech (Startup)",
    logoUrl: "/assets/logos/Experience/zmartrest-logo-light-mode.svg",
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&crop=center",
    heroImageAlt: "Zmartrest AI - Dashboard Interface",
    fullLink: "/case-studies/zmartrest-ai",
  },
};
