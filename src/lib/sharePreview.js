export function truncateShareDescription(text = "", maxLength = 160) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned || cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).replace(/\s+\S*$/, "").trimEnd() + "...";
}

export function getSharePreviewDescription(story) {
  if (story?.description) {
    return truncateShareDescription(story.description);
  }
  if (story?.subtitle) {
    return truncateShareDescription(story.subtitle);
  }
  return "";
}
