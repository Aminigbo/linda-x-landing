"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import SocialShareButtons from "@/components/SocialShareButtons";
import {
  canUseNativeShare,
  copyShareLink,
  shareViaNative,
} from "@/lib/share";

function SharePreviewCard({ imageUrl, title, description, url, compact }) {
  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    hostname = "linda-x.com";
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm ${
        compact ? "text-sm" : ""
      }`}
    >
      {imageUrl && (
        <div className={`w-full overflow-hidden bg-gray-100 ${compact ? "h-24" : "h-36"}`}>
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}
      <div className={`${compact ? "p-2.5" : "p-3"}`}>
        <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
          {hostname}
        </p>
        <p
          className={`font-serif font-semibold text-gray-900 leading-snug ${
            compact ? "text-sm line-clamp-2" : "text-base line-clamp-2"
          }`}
        >
          {title}
        </p>
        {description && (
          <p
            className={`mt-1 text-gray-600 leading-snug ${
              compact ? "text-xs line-clamp-2" : "text-sm line-clamp-3"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ShareWithPreview({
  url,
  title,
  shareTitle,
  description = "",
  imageUrl = "",
  iconSize = 32,
  showLabel = false,
  compact = false,
  className = "",
}) {
  const [expanded, setExpanded] = useState(!compact);
  const [copied, setCopied] = useState(false);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleCopy = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await copyShareLink(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canUseNativeShare()) return;

    try {
      await shareViaNative({
        title: title || shareTitle,
        text: description || shareTitle,
        url,
      });
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Native share failed:", error);
      }
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 ${className}`}
      onClick={stopPropagation}
      onKeyDown={stopPropagation}
    >
      {compact && (
        <button
          type="button"
          onClick={(e) => {
            stopPropagation(e);
            setExpanded((prev) => !prev);
          }}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#E02B20] hover:underline"
        >
          <Share2 size={14} />
          {expanded ? "Hide preview" : "Share with preview"}
        </button>
      )}

      {expanded && (
        <SharePreviewCard
          imageUrl={imageUrl}
          title={title}
          description={description}
          url={url}
          compact={compact}
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy link
            </>
          )}
        </button>

        {canUseNativeShare() && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#E02B20] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c0241c] transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
        )}
      </div>

      <SocialShareButtons
        url={url}
        title={shareTitle}
        description={description}
        iconSize={iconSize}
        showLabel={showLabel}
      />
    </div>
  );
}
