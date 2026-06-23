export function imageSrc(source) {
  if (!source) return "";
  if (typeof source === "string") return source;
  return source.src ?? source;
}
