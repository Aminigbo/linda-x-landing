import { createServerClient } from "@/lib/supabase/server";

export async function getStories() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("stories")
    .select("id, title, subtitle, description, image_url")
    .order("id", { ascending: false });

  return { data: data ?? [], error: error?.message ?? null };
}

export async function getArticles() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, subtitle, description, image_url")
    .order("id", { ascending: false });

  return { data: data ?? [], error: error?.message ?? null };
}

export async function getStory(id) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("stories")
    .select("title, image_url, content, description")
    .eq("id", id)
    .single();

  return { data: data ?? null, error: error?.message ?? null };
}

export async function getArticle(id) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("title, image_url, content, description")
    .eq("id", id)
    .single();

  return { data: data ?? null, error: error?.message ?? null };
}
