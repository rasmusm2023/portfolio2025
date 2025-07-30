import BentoBox from "@/components/BentoBox";
import BentoBoxWhite from "@/components/BentoBoxWhite";
import Footer from "@/components/Footer";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 text-neutral-10">
          BentoBox Comparison
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Dark Version */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-neutral-10 text-center">
              Dark Theme
            </h2>
            <BentoBox />
          </div>

          {/* White Version */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-neutral-10 text-center">
              White Theme
            </h2>
            <BentoBoxWhite />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="pt-16 pb-16">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
