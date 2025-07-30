"use client";

import Image from "next/image";
import Link from "next/link";
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
} from "@phosphor-icons/react";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";

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
}: CaseStudyProps) => {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-neutral-900/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-full mb-6">
              Case Study
            </span>
            <h1
              className={`text-6xl md:text-8xl font-extrabold text-neutral-0 mb-6 ${hanken.className}`}
            >
              {title}
            </h1>
            <p className="text-2xl text-neutral-30 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-0 mb-2">
                Duration
              </h3>
              <p className="text-neutral-60">{duration}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-0 mb-2">
                Team Size
              </h3>
              <p className="text-neutral-60">{teamSize}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-0 mb-2">
                My Role
              </h3>
              <p className="text-neutral-60">{role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2
                className={`text-4xl font-bold text-neutral-0 mb-8 ${hanken.className}`}
              >
                Overview
              </h2>
              <p className="text-lg text-neutral-60 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-0 mb-4 flex items-center gap-2">
                  <Lightbulb size={24} className="text-purple-500" />
                  The Challenge
                </h3>
                <p className="text-neutral-60 leading-relaxed">{challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-0 mb-4 flex items-center gap-2">
                  <Palette size={24} className="text-purple-500" />
                  The Solution
                </h3>
                <p className="text-neutral-60 leading-relaxed">{solution}</p>
              </div>
            </div>
          </div>

          {/* Process Images */}
          {processImages.length > 0 && (
            <div className="mb-24">
              <h2
                className={`text-4xl font-bold text-neutral-0 mb-12 text-center ${hanken.className}`}
              >
                Process & Design
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10"
                  >
                    <Image
                      src={image}
                      alt={
                        processImageAlts[index] || `Process step ${index + 1}`
                      }
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-24">
            <h2
              className={`text-4xl font-bold text-neutral-0 mb-12 text-center ${hanken.className}`}
            >
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-200"
                >
                  <Code size={32} className="text-purple-500 mx-auto mb-3" />
                  <p className="text-neutral-0 font-medium text-sm">{tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-24">
            <h2
              className={`text-4xl font-bold text-neutral-0 mb-12 text-center ${hanken.className}`}
            >
              Results & Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <p className="text-neutral-0 font-medium leading-relaxed">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {link && (
            <div className="text-center">
              <Link
                href={link}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200"
              >
                <span>{linkText || "View Live Project"}</span>
                <ArrowUpRight size={20} />
              </Link>
            </div>
          )}
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
