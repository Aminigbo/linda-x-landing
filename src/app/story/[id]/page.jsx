import Link from "next/link";
import { notFound } from "next/navigation";
import SuggestedStories from "@/components/SuggestedStories";
import StoryShareButtons from "@/components/StoryShareButtons";
import { getStories, getStory } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: story } = await getStory(id);

  if (!story) {
    return { title: "Story Not Found" };
  }

  const siteUrl = getSiteUrl();
  const shareUrl = `${siteUrl}/story/${id}`;
  const imageUrl = story.image_url?.startsWith("http")
    ? story.image_url
    : story.image_url
      ? `${siteUrl}${story.image_url}`
      : null;
  const description = story.description || story.title;

  return {
    title: story.title,
    description,
    openGraph: {
      title: story.title,
      description,
      url: shareUrl,
      siteName: "LINDA SOMAIRI-STEWART",
      images: imageUrl ? [{ url: imageUrl, alt: story.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: shareUrl,
    },
  };
}

export default async function StoryPage({ params }) {
  const { id } = await params;
  const [{ data: story, error }, { data: allStories }] = await Promise.all([
    getStory(id),
    getStories(),
  ]);

  const suggestedStories = (allStories ?? [])
    .filter((s) => s.id !== id)
    .slice(0, 5);

  const siteUrl = getSiteUrl();
  const shareUrl = `${siteUrl}/story/${id}`;
  const imageUrl = story?.image_url?.startsWith("http")
    ? story.image_url
    : story?.image_url
      ? `${siteUrl}${story.image_url}`
      : "";

  if (!story && !error) {
    notFound();
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div>
          <p className="text-red-500 text-xl">Error: {error}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-black min-h-screen p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mt-8 mb-8">
        <article className="flex-1 min-w-0 bg-white rounded-lg shadow-2xl p-6 animate-fade-in relative">
          <Link href="/" className="absolute bottom-0 right-0 lg:-left-26">
            <span className="text-white w-[100px] hover:text-blue-700 font-semibold flex items-center gap-1 p-3 bg-[#E02B20] ">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </span>
          </Link>

          {story.image_url && (
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full max-h-80 object-cover rounded-md mb-6"
            />
          )}

          <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4">
            {story.title}
          </h1>

          <StoryShareButtons
            shareUrl={shareUrl}
            title={story.title}
            description={story.description ?? ""}
            imageUrl={imageUrl}
          />

          <div
            id="popup-story-content"
            className="story-content text-gray-800 leading-relaxed"
            style={{ fontSize: "1.1rem" }}
            dangerouslySetInnerHTML={{ __html: story.content ?? "" }}
          />
        </article>

        <SuggestedStories stories={suggestedStories} />
      </div>
    </div>
  );
}
