"use client";

import SocialShareButtons from "@/components/SocialShareButtons";

export default function StoryShareButtons({ shareUrl, title }) {
  const shareTitle = `Read "${title}" by Linda Somiari-Stewart`;

  return (
    <SocialShareButtons
      url={shareUrl}
      title={shareTitle}
      iconSize={32}
      showLabel
      className="mb-6"
    />
  );
}
