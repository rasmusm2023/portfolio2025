import React from "react";

const CaseStudyWorkshop: React.FC = () => {
  return (
    <section className="py-16 fade-in-section">
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex justify-center gap-12"
          style={{
            paddingTop: "calc(40vmax / 10)",
            paddingBottom: "calc(40vmax / 10)",
          }}
        >
          <div className="w-[600px]">
            <h2 className="text-6xl font-bold text-neutral-80 dark:text-neutral-20 mb-4">
              Kickoff Workshop
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-neutral-80 dark:from-neutral-20 to-transparent"></div>
          </div>
          <div className="w-[600px]">
            <div className="mb-16">
              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed mb-8">
                At the start of the project, I facilitated a kickoff workshop to
                align the entire team around our vision and expectations for
                Emplojd. The session was designed to get to know each other,
                define what we wanted to achieve, and explore possible
                directions for the product.
              </p>

              <p className="text-neutral-80 dark:text-neutral-20 text-xl leading-relaxed">
                We began with a Mentimeter quiz to spark discussion, then moved
                into a Crazy 8 exercise to quickly capture individual ideas.
                After sharing and consolidating our thoughts, we identified a
                set of themes that would guide our design approach. These
                insights became the foundation for how we defined the product's
                goals and features:
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Workshop Insights Cards - Full Width */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
            {/* User Experience Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                User Experience
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                The platform should feel simple, modern, and stress-free, with
                no learning curve.
              </p>
            </div>

            {/* Personalisation Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Personalisation
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                AI should assist the user while preserving their individuality,
                avoiding anything that feels "generic" or "robotic."
              </p>
            </div>

            {/* Value for Both Sides Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Value for Both Sides
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                The service must be useful to job seekers and recruiters,
                ensuring quality applications that stand out.
              </p>
            </div>

            {/* Accessibility & Inclusivity Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Accessibility & Inclusivity
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                The product should be easy to use for everyone, including those
                with less experience or language challenges.
              </p>
            </div>

            {/* Efficiency Card */}
            <div className="bg-gradient-to-br from-neutral-800/10 to-neutral-700/10 dark:from-neutral-200/10 dark:to-neutral-100/10 backdrop-blur-sm border border-neutral-700/20 dark:border-neutral-200/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Efficiency
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                The process should save time, reduce anxiety, and encourage
                applicants to apply to more jobs with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Crazy 8 Workshop Image */}
        <div className="mt-16">
          <div className="w-full h-[800px] bg-white relative rounded-2xl overflow-hidden">
            <img
              src="/case-study-assets/emplojd/Emplojd-The-Craft-Ideation Workshop-Crazy-8.svg"
              alt="Emplojd Crazy 8 kickoff workshop showing the teams' ideas, thoughts and goals for the product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Caption - Similar to The Craft section */}
          <div className="mt-4 text-center">
            <p className="text-neutral-60 dark:text-neutral-40 text-sm font-medium">
              Slide from the Kickoff Workshop, specifically the Crazy 8
              exercise, showing the teams' ideas, thoughts and goals for the
              product
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyWorkshop;
