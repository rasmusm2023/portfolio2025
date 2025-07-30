"use client";

import AnimatedBlob from "@/components/AnimatedBlob";
import HjarnstarkCover from "@/books/hjarnstark-anders-hansen.jpg";
import MikaelPersbrandtCover from "@/books/mikael-persbrandt-book.jpg";
import Image from "next/image";
import Footer from "@/components/Footer";

// Book Card Component (same as in main page)
function BookCard({
  title,
  author,
  coverImage,
  amazonUrl,
  currentPage,
  totalPages,
  isFinished = false,
}: {
  title: string;
  author: string;
  coverImage?: any;
  amazonUrl?: string;
  currentPage?: number;
  totalPages?: number;
  isFinished?: boolean;
}) {
  const progressPercentage =
    currentPage && totalPages ? (currentPage / totalPages) * 100 : 0;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00FF9D] transition-colors duration-200 cursor-pointer group bg-neutral-80/50 backdrop-blur-sm"
    >
      <div className="flex w-full h-full">
        {/* Book Cover */}
        <div className="w-32 h-48 rounded-l-2xl overflow-hidden">
          {coverImage ? (
            <>
              <Image
                src={coverImage.src}
                alt={`${title} by ${author}`}
                className="w-full h-full object-cover"
                width={128}
                height={192}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </>
          ) : (
            <div className="w-full h-full bg-neutral-80/50 backdrop-blur-sm border border-neutral-100/10 rounded-l-2xl p-4">
              <div className="space-y-2">
                <h3 className="text-neutral-0 font-semibold text-sm">
                  {title}
                </h3>
                <div className="space-y-1">
                  <p className="text-neutral-60 text-xs">by {author}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-neutral-0 font-semibold text-sm leading-tight">
              {title}
            </h3>
            <p className="text-neutral-60 text-xs">by {author}</p>
          </div>

          {/* Status */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isFinished ? "bg-green-500" : "bg-blue-500 animate-pulse"
                }`}
              ></div>
              <span className="text-neutral-60 text-xs font-medium">
                {isFinished
                  ? "Finished"
                  : `Page ${currentPage} of ${totalPages}`}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-100/20 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isFinished
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : "bg-gradient-to-r from-blue-500 to-blue-400"
                }`}
                style={{ width: `${isFinished ? 100 : progressPercentage}%` }}
              ></div>
            </div>

            {/* Status Text */}
            <div className="text-right">
              <span className="text-neutral-60 text-xs font-medium">
                {isFinished
                  ? "100% complete"
                  : `${Math.round(progressPercentage)}% complete`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ReadingListPage() {
  const finishedBooks = [
    {
      title: "Hjärnstark : hur motion och träning stärker din hjärna",
      author: "Anders Hansen",
      coverImage: HjarnstarkCover,
      amazonUrl:
        "https://www.amazon.com/Hjärnstark-hur-motion-träning-stärker/dp/9175031234",
      isFinished: true,
    },
    {
      title: "Mikael Persbrandt : så som jag minns det",
      author: "Mikael Persbrandt",
      coverImage: MikaelPersbrandtCover,
      amazonUrl:
        "https://www.amazon.com/Mikael-Persbrandt-så-minns-det/dp/9175031234",
      isFinished: true,
    },
  ];

  const currentlyReading = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      amazonUrl:
        "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
      currentPage: 45,
      totalPages: 320,
      isFinished: false,
    },
    {
      title: "The Design of Everyday Things",
      author: "Don Norman",
      amazonUrl:
        "https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654",
      currentPage: 120,
      totalPages: 368,
      isFinished: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <section className="h-[80vh] relative">
            <AnimatedBlob
              gradientColors={{
                primary: "rgba(79, 70, 229, 0.6)", // Indigo blue
                secondary: "rgba(6, 182, 212, 0.4)", // Cyan/teal
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-start w-full max-w-[1600px]"
              style={{ height: "100vh" }}
            >
              <div className="text-left w-full">
                <h1 className="text-[10rem] font-extrabold tracking-tight leading-[0.6] mb-0">
                  <span className="[background-image:var(--gradient-hero-about)] bg-clip-text text-transparent font-hanken">
                    Reading List
                  </span>
                  <br />
                  <div className="flex justify-end">
                    <span className="text-neutral-40 text-5xl font-medium font-hanken mr-32 mt-8 tracking-wide">
                      My Books
                    </span>
                  </div>
                </h1>
                <div className="flex flex-col gap-6 -mt-4">
                  <p className="text-neutral-30 text-2xl font-semibold leading-relaxed tracking-wide max-w-[40rem]">
                    A collection of books I've read and am currently reading.
                    Each book has shaped my thinking and approach to design and
                    development.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reading List Section */}
          <section className="py-16 px-24">
            <div className="text-left w-full max-w-[1600px]">
              {/* Currently Reading */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-bold text-neutral-0 font-hanken">
                    Currently Reading
                  </h2>
                  <span className="text-2xl animate-pulse">📖</span>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {currentlyReading.map((book, index) => (
                    <BookCard
                      key={index}
                      title={book.title}
                      author={book.author}
                      amazonUrl={book.amazonUrl}
                      currentPage={book.currentPage}
                      totalPages={book.totalPages}
                      isFinished={book.isFinished}
                    />
                  ))}
                </div>
              </div>

              {/* Finished Books */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-bold text-neutral-0 font-hanken">
                    Finished Books
                  </h2>
                  <span className="text-2xl">✅</span>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {finishedBooks.map((book, index) => (
                    <BookCard
                      key={index}
                      title={book.title}
                      author={book.author}
                      coverImage={book.coverImage}
                      amazonUrl={book.amazonUrl}
                      isFinished={book.isFinished}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <div className="pt-16 pb-16">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
