import React from "react";

export default function ExperienceLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center px-6">
          {/* Badge Skeleton */}
          <div className="mx-auto mb-6 w-48 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

          {/* Title Skeleton */}
          <div className="mx-auto mb-6 w-96 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

          {/* Description Skeleton */}
          <div className="mx-auto mb-8 space-y-2 max-w-3xl">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="mx-auto mb-2 w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="mx-auto w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Layout Toggle Skeleton */}
          <div className="flex justify-center mb-12">
            <div className="w-64 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Section Title Skeleton */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-4 w-80 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="mx-auto w-96 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Experience Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-[480px]"
              >
                {/* Image Skeleton */}
                <div className="h-[200px] bg-gray-200 dark:bg-gray-700 animate-pulse" />

                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Tags Skeleton */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  </div>

                  {/* Title Skeleton */}
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />

                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>

                  {/* Footer Skeleton */}
                  <div className="flex justify-between items-center mt-auto">
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gray-50 dark:bg-secondary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="mx-auto mb-4 w-64 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="mx-auto mb-8 space-y-2 max-w-2xl">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-40 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
