"use client";

import CaseStudy from "@/components/CaseStudy";
import { Users, TrendUp, Clock, Star } from "@phosphor-icons/react";

export default function EmplojdCaseStudy() {
  return (
    <CaseStudy
      title="Emplojd"
      subtitle="Comprehensive HR platform for modern workplace management and employee engagement"
      description="Designed and developed a comprehensive HR management platform that streamlines employee onboarding, performance tracking, and workplace communication. The platform features an intuitive dashboard for both HR professionals and employees, with advanced analytics and automation capabilities."
      duration="8 months"
      teamSize="6 people"
      role="UX/UI Designer & Frontend Developer"
      challenge="Create an HR platform that serves both HR professionals and employees while maintaining simplicity and efficiency. The platform needed to handle complex workflows while providing a seamless user experience for all user types, with particular focus on reducing administrative burden and improving employee engagement."
      solution="Developed a role-based design system with personalized dashboards for different user types. Implemented comprehensive onboarding flows, performance tracking tools, and communication features. Used React with TypeScript and modern state management, with a focus on accessibility and mobile-first design principles."
      results={[
        "50% reduction in HR administrative tasks",
        "85% employee satisfaction score",
        "30% faster onboarding process",
        "500+ companies using the platform",
      ]}
      technologies={[
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Figma",
        "Redux",
        "AWS",
      ]}
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center"
      heroImageAlt="Emplojd - HR Platform Dashboard"
      category="Enterprise SaaS"
      client="Emplojd Inc."
      year="2024"
      metrics={[
        {
          label: "Active Users",
          value: "50K+",
          icon: <Users size={24} className="text-purple-500" />,
        },
        {
          label: "Growth Rate",
          value: "200%",
          icon: <TrendUp size={24} className="text-green-500" />,
        },
        {
          label: "Uptime",
          value: "99.9%",
          icon: <Clock size={24} className="text-blue-500" />,
        },
        {
          label: "Rating",
          value: "4.8/5",
          icon: <Star size={24} className="text-yellow-500" weight="fill" />,
        },
      ]}
      processSteps={[
        {
          title: "Research & Discovery",
          description:
            "Conducted extensive user research with HR professionals and employees across different industries. Analyzed existing HR tools and identified pain points in current workflows. Created detailed user personas and journey maps.",
          duration: "3 weeks",
          image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
        },
        {
          title: "Design & Prototyping",
          description:
            "Developed a comprehensive design system with role-based components. Created wireframes and high-fidelity prototypes for all major user flows. Conducted usability testing with target users and iterated based on feedback.",
          duration: "6 weeks",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
        },
        {
          title: "Development & Testing",
          description:
            "Built the platform using React and TypeScript with a focus on performance and scalability. Implemented comprehensive testing strategies and conducted extensive QA. Deployed to production with gradual rollout.",
          duration: "5 months",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
        },
      ]}
      processImages={[
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      ]}
      processImageAlts={[
        "HR workflow research and user interviews",
        "Platform UX/UI design and prototyping",
        "Development and enterprise integration",
        "Final platform dashboard and features",
      ]}
      testimonials={[
        {
          quote:
            "Emplojd has completely transformed how we manage our HR processes. The intuitive interface and powerful automation features have saved us countless hours every week.",
          author: "Sarah Johnson",
          role: "HR Director",
          company: "TechCorp",
        },
        {
          quote:
            "As an employee, I love how easy it is to access my information and communicate with HR. The platform makes everything transparent and accessible.",
          author: "Michael Chen",
          role: "Software Engineer",
          company: "InnovateLabs",
        },
      ]}
      link="https://emplojd.com"
      linkText="View Live Platform"
    />
  );
}
