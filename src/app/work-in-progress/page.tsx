"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/layout/Footer";
import AnimatedBlob from "@/components/ui/AnimatedBlob";
import { Hanken_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export default function WorkInProgressPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if already authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("workInProgressAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Encrypted password check (in real app, this would be server-side)
    const correctPassword = "1234554321";

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("workInProgressAuth", "true");
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("workInProgressAuth");
  };

  if (!isAuthenticated) {
    return (
      <>
        <CustomCursor />
        <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(139, 92, 246, 0.6)",
                secondary: "rgba(168, 85, 247, 0.4)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center w-full">
              <div className="w-full max-w-[1600px] mx-auto px-8">
                <div className="text-center w-full">
                  <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8">
                    <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                      Work in Progress
                    </span>
                  </h1>
                  <p className="text-neutral-70 dark:text-neutral-30 text-xl md:text-2xl font-semibold leading-relaxed tracking-wide mb-12">
                    This case study is currently under development
                  </p>

                  {/* Password Form */}
                  <div className="max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-neutral-100 dark:text-neutral-0 mb-2"
                        >
                          Enter password to preview
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-20 dark:border-neutral-80 bg-neutral-10 dark:bg-[#060608] text-neutral-100 dark:text-neutral-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter password"
                          required
                        />
                      </div>

                      {error && (
                        <div className="text-red-500 text-sm text-center">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Verifying..." : "Access Preview"}
                      </button>
                    </form>
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
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] transition-colors duration-300">
        {/* Hero Section */}
        <section className="h-[80vh] relative">
          <AnimatedBlob
            gradientColors={{
              primary: "rgba(139, 92, 246, 0.6)",
              secondary: "rgba(168, 85, 247, 0.4)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center w-full">
            <div className="w-full max-w-[1600px] mx-auto px-8">
              <div className="text-center w-full">
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8">
                  <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                    Work in Progress
                  </span>
                </h1>
                <p className="text-neutral-70 dark:text-neutral-30 text-xl md:text-2xl font-semibold leading-relaxed tracking-wide mb-12">
                  This case study is currently under development
                </p>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-neutral-10 dark:bg-[#060608] rounded-2xl p-8 border border-neutral-20 dark:border-neutral-80">
                    <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
                      Coming Soon
                    </h2>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed mb-6">
                      This case study is currently being developed and will be
                      available soon. Check back later for updates on this
                      exciting project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push("/")}
                        className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        Back to Home
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-neutral-20 dark:bg-neutral-80 hover:bg-neutral-30 dark:hover:bg-neutral-70 text-neutral-100 dark:text-neutral-0 font-semibold rounded-lg transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
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
    </>
  );
}
