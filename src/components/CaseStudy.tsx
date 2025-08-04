"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Calendar,
  Users,
  Target,
  CheckCircle,
  Lightbulb,
  Palette,
  Code,
  ChartLine,
  ArrowUpRight,
  Play,
  Pause,
  ArrowLeft,
  ArrowDown,
  Star,
  Clock,
  TrendUp,
  Trophy,
  Eye,
  Heart,
  Share,
  Download,
  ArrowSquareOut,
  GithubLogo,
  BehanceLogo,
  DribbbleLogo,
} from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  teamSize: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  heroImage: string;
  heroImageAlt: string;
  processImages?: string[];
  processImageAlts?: string[];
  link?: string;
  linkText?: string;
  category?: string;
  client?: string;
  year?: string;
  metrics?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  processSteps?: {
    title: string;
    description: string;
    image?: string;
    duration: string;
  }[];
  testimonials?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
}

const CaseStudy = ({
  title,
  subtitle,
  description,
  duration,
  teamSize,
  role,
  challenge,
  solution,
  results,
  technologies,
  heroImage,
  heroImageAlt,
  processImages = [],
  processImageAlts = [],
  link,
  linkText,
  category = "Product Design",
  client = "Client",
  year = "2024",
  metrics = [],
  processSteps = [],
  testimonials = [],
}: CaseStudyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax effect
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Content animations
    const elements = contentRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % processImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? processImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-neutral-100">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/60 to-neutral-900/80"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <div className="mb-12">
            {/* Category Badge */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-full border border-purple-500/30">
                <Star size={16} weight="fill" />
                {category}
              </span>
              <span className="text-neutral-40 text-sm">•</span>
              <span className="text-neutral-40 text-sm">{year}</span>
            </div>

            {/* Title */}
            <h1
              className={`text-7xl md:text-9xl font-extrabold text-neutral-0 mb-8 leading-tight ${hanken.className}`}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-neutral-30 font-medium leading-relaxed max-w-4xl mx-auto mb-12">
              {subtitle}
            </p>

            {/* Project Meta */}
            <div className="flex items-center justify-center gap-8 text-neutral-40 text-sm">
              <span className="flex items-center gap-2">
                <Users size={16} />
                {teamSize}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {duration}
              </span>
              <span className="flex items-center gap-2">
                <Target size={16} />
                {role}
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-neutral-40" />
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      {metrics.length > 0 && (
        <section className="bg-neutral-90/50 backdrop-blur-sm border-b border-neutral-100/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-neutral-0"
                >
                  {metric.icon}
                  <div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-neutral-40">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section ref={contentRef} className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32 animate-on-scroll">
            <div className="lg:col-span-2">
              <h2
                className={`text-5xl font-bold text-neutral-0 mb-8 ${hanken.className}`}
              >
                Project Overview
              </h2>
              <p className="text-xl text-neutral-60 leading-relaxed mb-8">
                {description}
              </p>

              {/* Challenge & Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <Lightbulb size={24} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-0">
                      The Challenge
                    </h3>
                  </div>
                  <p className="text-neutral-60 leading-relaxed">{challenge}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Palette size={24} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-0">
                      The Solution
                    </h3>
                  </div>
                  <p className="text-neutral-60 leading-relaxed">{solution}</p>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className="space-y-8">
              <div className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-neutral-0 mb-6">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-40">Client</span>
                    <span className="text-neutral-0 font-medium">{client}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-40">Duration</span>
                    <span className="text-neutral-0 font-medium">
                      {duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-40">Team Size</span>
                    <span className="text-neutral-0 font-medium">
                      {teamSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-40">My Role</span>
                    <span className="text-neutral-0 font-medium">{role}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                {link && (
                  <Link
                    href={link}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <ArrowSquareOut size={20} />
                    <span>{linkText || "View Live Project"}</span>
                  </Link>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-90/50 border border-neutral-100/10 text-neutral-0 rounded-xl hover:bg-neutral-80/50 transition-colors">
                    <Heart size={16} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-90/50 border border-neutral-100/10 text-neutral-0 rounded-xl hover:bg-neutral-80/50 transition-colors">
                    <Share size={16} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          {processSteps.length > 0 && (
            <div className="mb-32 animate-on-scroll">
              <h2
                className={`text-5xl font-bold text-neutral-0 mb-16 text-center ${hanken.className}`}
              >
                Design Process
              </h2>
              <div className="space-y-16">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-16 ${
                      index % 2 === 1 ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-purple-500">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-0">
                            {step.title}
                          </h3>
                          <p className="text-neutral-40">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-lg text-neutral-60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    {step.image && (
                      <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={500}
                            height={300}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Images Gallery */}
          {processImages.length > 0 && (
            <div className="mb-32 animate-on-scroll">
              <h2
                className={`text-5xl font-bold text-neutral-0 mb-16 text-center ${hanken.className}`}
              >
                Design Gallery
              </h2>

              {/* Image Carousel */}
              <div className="relative max-w-4xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10">
                  <Image
                    src={processImages[currentImageIndex]}
                    alt={
                      processImageAlts[currentImageIndex] ||
                      `Process step ${currentImageIndex + 1}`
                    }
                    width={800}
                    height={600}
                    className="w-full h-96 md:h-[500px] object-cover"
                  />

                  {/* Navigation Controls */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={prevImage}
                      className="w-12 h-12 bg-neutral-900/50 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-0 hover:bg-neutral-900/70 transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="w-12 h-12 bg-neutral-900/50 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-0 hover:bg-neutral-900/70 transition-colors"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-neutral-900/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-neutral-0">
                      {currentImageIndex + 1} / {processImages.length}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                  {processImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? "bg-purple-500"
                          : "bg-neutral-40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technologies Section */}
          <div className="mb-32 animate-on-scroll">
            <h2
              className={`text-5xl font-bold text-neutral-0 mb-16 text-center ${hanken.className}`}
            >
              Technologies & Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-8 text-center hover:scale-105 hover:bg-neutral-80/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <Code size={32} className="text-purple-500" />
                  </div>
                  <p className="text-neutral-0 font-medium text-sm">{tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-32 animate-on-scroll">
            <h2
              className={`text-5xl font-bold text-neutral-0 mb-16 text-center ${hanken.className}`}
            >
              Results & Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <p className="text-neutral-0 font-medium leading-relaxed text-lg">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <div className="mb-32 animate-on-scroll">
              <h2
                className={`text-5xl font-bold text-neutral-0 mb-16 text-center ${hanken.className}`}
              >
                Client Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Star
                          size={24}
                          className="text-purple-500"
                          weight="fill"
                        />
                      </div>
                      <div>
                        <p className="text-neutral-0 text-lg leading-relaxed italic mb-4">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p className="text-neutral-0 font-semibold">
                            {testimonial.author}
                          </p>
                          <p className="text-neutral-40 text-sm">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center animate-on-scroll">
            <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-3xl p-12">
              <h2
                className={`text-4xl font-bold text-neutral-0 mb-6 ${hanken.className}`}
              >
                Ready to start your project?
              </h2>
              <p className="text-xl text-neutral-60 mb-8 max-w-2xl mx-auto">
                Let's work together to bring your ideas to life with
                cutting-edge design and development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={20} />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-90/50 border border-neutral-100/10 text-neutral-0 font-semibold text-lg rounded-xl hover:bg-neutral-80/50 transition-all duration-200"
                >
                  <span>View More Work</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="pt-16 pb-16">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
