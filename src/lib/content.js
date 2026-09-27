import { presentPost } from "@/lib/copy";
import { createServerClient } from "@/lib/supabase/server";
import { sectionFromTags } from "@/lib/sections";

const LIST_COLUMNS =
  "id, title, subtitle, description, image_url, tags, published";
const POST_COLUMNS = `${LIST_COLUMNS}, content`;

async function getPosts() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("stories")
    .select(LIST_COLUMNS)
    .order("created_at", { ascending: false });

  const posts = (data ?? [])
    .filter((post) => post.published !== false)
    .map(presentPost);
  return { data: posts, error: error?.message ?? null };
}

function bySection(posts, section) {
  return posts.filter((post) => sectionFromTags(post.tags, post.id) === section);
}

export async function getStories() {
  const { data, error } = await getPosts();
  return { data: bySection(data, "story"), error };
}

export async function getArticles() {
  const { data, error } = await getPosts();
  return { data: bySection(data, "article"), error };
}

export async function getPress() {
  const { data, error } = await getPosts();
  return { data: bySection(data, "press"), error };
}

export async function getPost(id) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("stories")
    .select(POST_COLUMNS)
    .eq("id", id)
    .single();

  if (!data || data.published === false) {
    return { data: null, error: error?.message ?? null };
  }

  return { data: presentPost(data), error: error?.message ?? null };
}

export async function getStory(id) {
  return getPost(id);
}

export async function getArticle(id) {
  const { data, error } = await getPost(id);
  if (!data || sectionFromTags(data.tags, data.id) !== "article") {
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getPressItem(id) {
  const { data, error } = await getPost(id);
  if (!data || sectionFromTags(data.tags, data.id) !== "press") {
    return { data: null, error };
  }
  return { data, error: null };
}
