export function sanitizeMetaText(text = "", maxLength = 200) {
  return text.replace(/\s+/g, " ").trim().slice(0, maxLength);
}
