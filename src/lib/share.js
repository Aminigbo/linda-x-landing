const DEFAULT_SITE_URL = "https://www.linda-x.com";

export function getSiteUrl() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export function getStoryShareUrl(storyId) {
  return `${getSiteUrl().replace(/\/$/, "")}/story/${storyId}`;
}

export function buildFacebookShareUrl(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function buildTwitterShareUrl(url, text) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

export function buildLinkedInShareUrl(url) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function buildWhatsAppShareUrl(url, text) {
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
}

export function canUseNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareViaNative({ title, url, text }) {
  const payload = { title, url };
  if (text) payload.text = text;
  await navigator.share(payload);
}

export async function shareOnFacebook({ url, title, text }) {
  if (canUseNativeShare()) {
    try {
      await shareViaNative({ title, url, text });
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  window.open(buildFacebookShareUrl(url), "_blank", "noopener,noreferrer");
}

export async function copyShareLink(url) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}
