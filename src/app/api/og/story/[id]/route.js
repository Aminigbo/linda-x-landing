import { getStory } from "@/lib/content";

export async function GET(_request, { params }) {
  const { id } = await params;
  const { data: story } = await getStory(id);

  if (!story?.image_url) {
    return new Response("Image not found", { status: 404 });
  }

  const imageResponse = await fetch(story.image_url, {
    next: { revalidate: 86400 },
  });

  if (!imageResponse.ok) {
    return new Response("Image not found", { status: 404 });
  }

  const contentType =
    imageResponse.headers.get("content-type") || "image/jpeg";

  return new Response(imageResponse.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
