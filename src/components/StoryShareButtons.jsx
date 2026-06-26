"use client";

import ShareWithPreview from "@/components/ShareWithPreview";

export default function StoryShareButtons({
  shareUrl,
  title,
  description = "",
  imageUrl = "",
}) {
  const shareTitle = `Read "${title}" by Linda Somiari-Stewart`;

  return (
    <ShareWithPreview
      url={shareUrl}
      title={title}
      shareTitle={shareTitle}
      description={description}
      imageUrl={imageUrl}
      iconSize={32}
      showLabel
      className="mb-6"
    />
  );
}
