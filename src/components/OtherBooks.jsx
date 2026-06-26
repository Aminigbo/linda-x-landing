"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ShareWithPreview from "@/components/ShareWithPreview";
import { getStoryShareUrl } from "@/lib/share";
import { getSharePreviewDescription } from "@/lib/sharePreview";

const MAX_DESCRIPTION_LENGTH = 100;

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function truncateDescription(text, maxLength = MAX_DESCRIPTION_LENGTH) {
  if (!text) return { preview: "", isTruncated: false };

  if (text.length <= maxLength) {
    return { preview: text, isTruncated: false };
  }

  const preview = text.slice(0, maxLength).replace(/\s+\S*$/, "").trimEnd();
  return { preview, isTruncated: true };
}

function OtherBooks({ stories = [], error = null }) {
  const router = useRouter();

  if (error) {
    return (
      <div className="max-w-screen p-10 bg-black relative min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="max-w-screen p-10 bg-black relative min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">
          No stories found yet. Time to write some!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen p-10 bg-black relative">
      <motion.h1
        className="text-center text-3xl md:text-5xl mb-10 text-[#E02B20]"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Short Stories By Linda
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        {stories.map((story) => {
          const storyShareUrl = getStoryShareUrl(story.id);
          const shareTitle = `Read "${story.title}" by Linda Somiari-Stewart`;
          const { preview: descriptionPreview, isTruncated } = truncateDescription(
            story.description
          );

          const storyPath = `/story/${story.id}`;

          return (
            <motion.div
              key={story.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              role="link"
              tabIndex={0}
              onClick={() => router.push(storyPath)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(storyPath);
                }
              }}
              className="flex flex-col bg-gray-100 rounded-lg shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="overflow-hidden">
                <motion.img
                  src={story.image_url}
                  alt={story.title}
                  className="w-full aspect-[5/4] object-cover object-top"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h2 className="m-0 mb-2 font-serif text-lg text-gray-900 leading-snug">
                  {story.title}
                </h2>
                {story.subtitle && (
                  <p className="italic text-gray-500 text-sm mb-2 line-clamp-2">
                    {story.subtitle}
                  </p>
                )}
                <p className="text-gray-700 text-sm mb-4 flex-1">
                  {descriptionPreview}
                  {isTruncated ? "..." : ""}{" "}
                  <span className="font-semibold text-[#E02B20]">Read More...</span>
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <ShareWithPreview
                    url={storyShareUrl}
                    title={story.title}
                    shareTitle={shareTitle}
                    description={getSharePreviewDescription(story)}
                    imageUrl={story.image_url || ""}
                    iconSize={28}
                    compact
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default OtherBooks;
