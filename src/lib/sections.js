export const SECTION_TAGS = {
  article: "__section:article",
  press: "__section:press",
};

// Posted before the publish destination existed, so it has no section tag yet.
const LEGACY_PRESS_IDS = new Set([
  "e1eb5e9e-051e-4058-b292-3f252fa371a1",
]);

export const SECTION_LABELS = {
  story: "Short story",
  article: "Article",
  press: "Press",
};

export function sectionFromTags(tags, id) {
  const list = Array.isArray(tags) ? tags : [];
  if (list.includes(SECTION_TAGS.article)) return "article";
  if (list.includes(SECTION_TAGS.press)) return "press";
  if (id && LEGACY_PRESS_IDS.has(id)) return "press";
  return "story";
}

export function visibleTags(tags) {
  return (Array.isArray(tags) ? tags : []).filter(
    (tag) => !String(tag).startsWith("__section:")
  );
}

export function tagsForSection(tags, section) {
  const cleaned = visibleTags(tags)
    .map((tag) => String(tag).trim())
    .filter(Boolean);

  if (section === "article" || section === "press") {
    cleaned.push(SECTION_TAGS[section]);
  }

  return cleaned;
}

export function publicPath(section, id) {
  if (section === "article") return `/article/${id}`;
  if (section === "press") return `/press/${id}`;
  return `/story/${id}`;
}
