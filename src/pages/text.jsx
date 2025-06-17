import React from "react";
import { Helmet } from "react-helmet";
import { getFacebookUrl, getTwitterUrl, getLinkedinUrl, getWhatsAppUrl, copyToClipboard } from "@phntms/react-share";

const BLOG_TITLE = "The Clockwork Girl: A Journey Through Time";
const BLOG_DESCRIPTION = "Explore the enchanting story of The Clockwork Girl, a tale of adventure, mystery, and the magic of time.";
const BLOG_IMAGE = "https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg"; // Publicly accessible image for sharing
const BLOG_URL = "https://yourdomain.com/text"; // Replace with your actual URL

function TextBlogPost() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Helmet>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={BLOG_TITLE} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
        <meta property="og:image" content={BLOG_IMAGE} />
        <meta property="og:url" content={BLOG_URL} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={BLOG_TITLE} />
        <meta name="twitter:description" content={BLOG_DESCRIPTION} />
        <meta name="twitter:image" content={BLOG_IMAGE} />
      </Helmet>
      <img src={BLOG_IMAGE} alt="The Clockwork Girl" className="w-full rounded mb-6" />
      <h1 className="text-3xl font-bold mb-4">{BLOG_TITLE}</h1>
      <p className="text-lg text-gray-700 mb-6">
        {BLOG_DESCRIPTION}
      </p>
      <article className="prose prose-lg">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Suspendisse potenti. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
        </p>
        <p>
          Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.
        </p>
      </article>
      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <a
          href={getFacebookUrl({ url: BLOG_URL })}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Share on Facebook
        </a>
        <a
          href={getTwitterUrl({ url: BLOG_URL, text: BLOG_TITLE })}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
        >
          Share on Twitter
        </a>
        <a
          href={getLinkedinUrl({ url: BLOG_URL, title: BLOG_TITLE, summary: BLOG_DESCRIPTION })}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
        >
          Share on LinkedIn
        </a>
        <a
          href={getWhatsAppUrl({ url: BLOG_URL, text: BLOG_TITLE })}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Share on WhatsApp
        </a>
        <button
          onClick={() => copyToClipboard(BLOG_URL)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default TextBlogPost;
