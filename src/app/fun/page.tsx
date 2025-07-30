import Footer from "@/components/Footer";

export default function Fun() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="pt-32 px-12">
        <h1 className="text-4xl font-bold text-accent-100">Fun</h1>
        <p className="mt-4 text-neutral-0">Coming soon...</p>
      </main>

      {/* Footer Section */}
      <div className="pt-16 pb-16">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
