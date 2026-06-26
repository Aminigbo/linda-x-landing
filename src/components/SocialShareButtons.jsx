"use client";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import {
  buildFacebookShareUrl,
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
  buildWhatsAppShareUrl,
  canUseNativeShare,
  shareOnFacebook,
} from "@/lib/share";

export default function SocialShareButtons({
  url,
  title,
  iconSize = 32,
  showLabel = false,
  className = "",
}) {
  const shareTitle = title;

  const handleFacebookClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await shareOnFacebook({ url, title: shareTitle });
    } catch (error) {
      console.error("Facebook share failed:", error);
      window.open(buildFacebookShareUrl(url), "_blank", "noopener,noreferrer");
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const linkClass = "inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02B20] focus-visible:ring-offset-2";

  return (
    <div
      className={`flex items-center gap-2 flex-wrap ${className}`}
      onClick={stopPropagation}
      onKeyDown={stopPropagation}
    >
      {showLabel && (
        <span className="text-sm text-gray-500 mr-1">Share:</span>
      )}

      {canUseNativeShare() ? (
        <button
          type="button"
          onClick={handleFacebookClick}
          aria-label="Share on Facebook"
          className={`${linkClass} border-0 bg-transparent p-0 cursor-pointer`}
        >
          <FacebookIcon size={iconSize} round />
        </button>
      ) : (
        <a
          href={buildFacebookShareUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className={linkClass}
          onClick={stopPropagation}
        >
          <FacebookIcon size={iconSize} round />
        </a>
      )}

      <a
        href={buildTwitterShareUrl(url, shareTitle)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={linkClass}
        onClick={stopPropagation}
      >
        <TwitterIcon size={iconSize} round />
      </a>

      <a
        href={buildLinkedInShareUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={linkClass}
        onClick={stopPropagation}
      >
        <LinkedinIcon size={iconSize} round />
      </a>

      <a
        href={buildWhatsAppShareUrl(url, shareTitle)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={linkClass}
        onClick={stopPropagation}
      >
        <WhatsappIcon size={iconSize} round />
      </a>
    </div>
  );
}
