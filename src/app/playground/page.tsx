"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import AnimatedBlob from "@/components/AnimatedBlob";
import { Hanken_Grotesk } from "next/font/google";
import { Wrench, Lock, ArrowLeft } from "@phosphor-icons/react";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

// Password protection component
const PasswordProtection = ({
  onPasswordCorrect,
}: {
  onPasswordCorrect: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate password check (replace with actual password)
    if (password === "playground2025") {
      onPasswordCorrect();
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-0 dark:bg-[#060608] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="mb-6">
            <Wrench size={80} className="mx-auto text-purple-500 mb-4" />
            <Lock
              size={40}
              className="mx-auto text-neutral-60 dark:text-neutral-40"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 dark:text-neutral-0 mb-4">
            Playground
          </h1>
          <p className="text-xl md:text-2xl text-neutral-60 dark:text-neutral-40">
            This experimental space is currently under construction
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-neutral-80 dark:text-neutral-20 mb-4"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 text-lg border-2 border-neutral-20 dark:border-neutral-80 rounded-xl bg-neutral-0 dark:bg-[#060608] text-neutral-100 dark:text-neutral-0 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-lg text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold text-lg py-5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isLoading ? "Checking..." : "Access Playground"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-lg text-neutral-60 dark:text-neutral-40 hover:text-neutral-80 dark:hover:text-neutral-20 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PlaygroundPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePasswordCorrect = () => {
    setIsAuthenticated(true);
  };

  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return <PasswordProtection onPasswordCorrect={handlePasswordCorrect} />;
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
                <div className="mb-8">
                  <Wrench size={120} className="mx-auto text-purple-500 mb-6" />
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.6] mb-8">
                  <span className="[background-image:var(--gradient-hero-contact)] dark:[background-image:var(--gradient-hero-contact-dark)] bg-clip-text text-transparent font-hanken">
                    Playground
                  </span>
                </h1>
                <p className="text-neutral-70 dark:text-neutral-30 text-xl md:text-2xl font-semibold leading-relaxed tracking-wide mb-12">
                  Experimental space for creative projects and prototypes
                </p>

                <div className="max-w-3xl mx-auto">
                  <div className="bg-neutral-10 dark:bg-[#060608] rounded-2xl p-8 border border-neutral-20 dark:border-neutral-80">
                    <div className="flex items-center justify-center mb-6">
                      <Wrench size={48} className="text-purple-500 mr-4" />
                      <h2 className="text-3xl font-bold text-neutral-100 dark:text-neutral-0">
                        Under Construction
                      </h2>
                    </div>
                    <p className="text-neutral-80 dark:text-neutral-20 leading-relaxed mb-6 text-lg">
                      This experimental playground is currently under
                      development. It will feature interactive prototypes,
                      creative experiments, and innovative design concepts that
                      push the boundaries of user experience and visual design.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                        🚧 This space is actively being built and will be
                        available soon. Check back for updates on exciting new
                        projects and experiments!
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => router.push("/projects")}
                        className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        View Other Projects
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
