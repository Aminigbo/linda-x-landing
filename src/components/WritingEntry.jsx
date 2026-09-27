import Link from "next/link";
import Header from "@/components/Headers";
import Footer from "@/components/Footer";

export default function WritingEntry({ entry, backHref, backLabel }) {
  return (
    <div>
      <Header />
      <div className="px-4 bg-[#504e4e] py-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href={backHref}
            className="inline-block text-white mb-6 hover:text-[#D7FF00]"
          >
            {backLabel}
          </Link>
          <div className="bg-[#A72024] p-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
              {entry.title}
            </h1>
          </div>
          {entry.subtitle && (
            <p className="text-white/80 text-center mb-6">{entry.subtitle}</p>
          )}
          <div className="flex flex-col md:flex-row gap-8">
            <div
              className="story-content flex-1 min-w-0 bg-white rounded-lg p-6 text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: entry.content ?? "" }}
            />
            {entry.image_url && (
              <div className="md:w-1/3 w-full flex-shrink-0">
                <img
                  src={entry.image_url}
                  alt={entry.title}
                  className="rounded shadow w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
