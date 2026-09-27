const PRESS_ID = "e1eb5e9e-051e-4058-b292-3f252fa371a1";

const PRESS_CONTENT = `<p>The Guardian Nigeria profiles Linda Somiari-Stewart’s African folklore books.</p>
<p>In this feature, Ifeanyi Ibeh explores how Linda Somiari-Stewart draws on Ijaw storytelling traditions. The article looks at themes of feminine divinity, identity, autonomy, and cultural heritage.</p>
<p><a href="https://guardian.ng/art/literature/linda-somiari-stewart-revives-african-folklore-with-bold-new-books/" target="_blank" rel="noopener noreferrer">Read the article in The Guardian Nigeria</a></p>`;

function fixName(text) {
  return text
    .replace(/Somairi/g, "Somiari")
    .replace(/Somiari\s*[-–—]\s*Stewart/g, "Somiari-Stewart")
    .replace(/Somiari Stewart/g, "Somiari-Stewart");
}

export function correctCopy(text) {
  if (!text) return text;

  return fixName(text)
    .replace(/\binthe\b/g, "in the")
    .replace(/elucidiates/gi, (match) =>
      match[0] === "E" ? "Elucidates" : "elucidates"
    )
    .replace(/Grandma Lnda/g, "Grandma Linda")
    .replace(/The Weaver Birds's Nest/g, "The Weaver Birds' Nest")
    .replace(/The Weaver Birds’s Nest/g, "The Weaver Birds’ Nest");
}

export function correctTitle(title) {
  if (!title) return title;

  return correctCopy(title)
    .replace(/[ \t]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+by Linda Somiari-Stewart\.?$/i, " by Linda Somiari-Stewart")
    .trim();
}

export function presentPost(post) {
  if (!post) return post;

  const presented = {
    ...post,
    title: correctTitle(post.title),
    subtitle: correctCopy(post.subtitle),
    description: correctCopy(post.description),
    content: correctCopy(post.content),
  };

  if (
    post.id === PRESS_ID &&
    (post.content?.includes("google_ads_iframe") ||
      post.content?.includes("dochase-adunit") ||
      post.title?.includes("guardian.ng"))
  ) {
    presented.title =
      "Linda Somiari-Stewart revives African folklore with bold new books";
    presented.content = PRESS_CONTENT;
  }

  return presented;
}
