"use client";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

export default function StoryShareButtons({ shareUrl, title }) {
  const shareTitle = `Read "${title}" by Linda Somiari-Stewart`;

  const shareLinks = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: <FacebookIcon size={32} round />,
    },
    {
      label: "Share on Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      icon: <TwitterIcon size={32} round />,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: <LinkedinIcon size={32} round />,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`,
      icon: <WhatsappIcon size={32} round />,
    },
  ];

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
