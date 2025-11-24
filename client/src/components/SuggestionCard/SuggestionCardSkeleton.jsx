import React from "react";

const SkeletonLine = ({ width }) => (
  <div
    className={`h-4 bg-gray-700 rounded animate-pulse`}
    style={{ width }}
  />
);

const SkeletonTag = () => (
  <div className="h-6 w-16 bg-gray-700 rounded-full animate-pulse" />
);

const SuggestionCardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-10 rounded-xl bg-gray-800 border border-gray-600 shadow-md mt-6 space-y-6">
      {/* Summary */}
      <section>
        <SkeletonLine width="60%" />
        <SkeletonLine width="90%" />
      </section>

      {/* Hashtags */}
      <section className="flex flex-wrap gap-2 mt-2">
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
      </section>

      {/* Improved Post */}
      <section>
        <SkeletonLine width="80%" />
        <SkeletonLine width="95%" />
        <SkeletonLine width="70%" />
      </section>

      {/* CTAs */}
      <section>
        <SkeletonLine width="50%" />
        <SkeletonLine width="60%" />
      </section>

      {/* Readability Tips */}
      <section>
        <SkeletonLine width="40%" />
        <SkeletonLine width="80%" />
      </section>
    </div>
  );
};

export default SuggestionCardSkeleton;
