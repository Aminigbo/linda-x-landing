import Link from "next/link";

export default function SuggestedStories({ stories = [] }) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
      <h2 className="text-[#E02B20] text-xl font-serif font-bold mb-4">
        Suggested Stories
      </h2>
      <div className="flex flex-col gap-4">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/story/${story.id}`}
            className="flex gap-3 bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow group"
          >
            {story.image_url && (
              <img
                src={story.image_url}
                alt={story.title}
                className="w-16 h-20 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-sm text-gray-900 group-hover:text-[#E02B20] transition-colors line-clamp-3">
                {story.title}
              </h3>
              {story.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {story.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
