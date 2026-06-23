import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import { getArticle } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: article } = await getArticle(id);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.description || article.title,
    openGraph: {
      title: article.title,
      description: article.description || article.title,
      images: article.image_url ? [article.image_url] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const { data: article, error } = await getArticle(id);

  if (!article && !error) {
    notFound();
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div>
          <p className="text-red-500 text-xl">Error: {error}</p>
          <Link
            href="/articles"
            className="inline-block bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="gap-8 px-4 bg-[#504e4e] py-6 w-screen">
        <div className="bg-[#A72024] p-4 lg:mx-25 mb-6">
          <h2 className="text-2xl font-bold text-center">{article.title}</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 min-w-0 lg:ml-25 md:ml-0">
            <div className="prose max-w-none">
              <p>{article.content}</p>
            </div>
          </div>
          {article.image_url && (
            <div className="md:w-1/3 w-full flex-shrink-0 flex justify-center items-start lg:mr-25 md:mr-0">
              <img
                src={article.image_url}
                alt={article.title}
                className="rounded shadow max-w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
