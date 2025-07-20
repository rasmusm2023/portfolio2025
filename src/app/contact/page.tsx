"use client";

import { useState } from "react";
import AnimatedBlob from "@/components/AnimatedBlob";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@rasmus.com");
    setEmailCopied(true);
    setTimeout(() => {
      setEmailCopied(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)", // Purple
                secondary: "rgba(168, 85, 247, 0.4)", // Violet
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-between w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full flex flex-col justify-between h-full">
                {/* Hero content centered */}
                <div className="flex-1 flex items-center">
                  <div>
                    <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                      <span className="[background-image:var(--gradient-hero-contact)] bg-clip-text text-transparent font-hanken">
                        Contact
                      </span>
                      <br />
                    </h1>
                    <div className="flex flex-col gap-6 mt-16">
                      <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[48rem]">
                        I'm always excited to discuss new opportunities and
                        possibilities.
                      </p>
                      <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[48rem]">
                        Whether you have a specific role in mind or just want to
                        discuss how I can contribute, let's start a
                        conversation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information positioned absolutely */}
                <div className="absolute bottom-24 left-0 flex items-end space-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-0">
                        Location
                      </h3>
                      <p className="text-neutral-60 text-lg">
                        Stockholm, Sweden
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-0">
                        Response Time
                      </h3>
                      <p className="text-neutral-60 text-lg">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form centered */}
            <div
              className="absolute right-0 w-[32rem]"
              style={{ top: "65%", transform: "translateY(-50%)" }}
            >
              <div className="bg-neutral-90/50 backdrop-blur-sm border border-neutral-100/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-neutral-0 mb-6 font-hanken">
                  Let's have a chat 💬
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-neutral-30 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-neutral-40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-neutral-30 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-neutral-40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-base font-medium text-neutral-30 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-neutral-40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-base font-medium text-neutral-30 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-neutral-80/50 border border-neutral-100/20 rounded-xl text-neutral-0 text-base placeholder-neutral-40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 resize-none"
                      placeholder="Type your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-neutral-10 font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    Send Message
                  </button>

                  {/* OR Divider */}
                  <div className="flex items-center justify-center space-x-4 my-6">
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                    <span className="text-neutral-60 text-sm font-medium px-4">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-neutral-60/30"></div>
                  </div>

                  {/* Email Alternative */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                    <p className="text-neutral-30 text-base font-medium">
                      Prefer to email directly?
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span
                        className={`font-bold text-xl transition-colors duration-200 cursor-pointer hover:opacity-90 ${
                          emailCopied
                            ? "text-green-500"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
                        }`}
                        onClick={handleCopyEmail}
                      >
                        hello@rasmusmattsson.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          emailCopied
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 hover:shadow-lg"
                        }`}
                      >
                        {emailCopied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
