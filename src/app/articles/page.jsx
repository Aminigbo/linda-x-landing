import Link from "next/link";
import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { getArticles } from "@/lib/content";

export const metadata = {
  title: "Articles",
};

export default async function ArticlesPage() {
  const { data: articles, error } = await getArticles();

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 bg-[#A72024] p-4 w-2xs text-white">
          Articles
        </h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.length === 0 && <p>No articles found.</p>}
            {articles.map((article) => (
              <div key={article.id} className="shadow-lg rounded-lg">
                <Link href={`/article/${article.id}`}>
                  <img
                    src={article.image_url || ""}
                    alt={article.title}
                    className="w-full h-auto block mb-4 rounded-t-lg object-cover "
                  />
                  <p className="font-semibold p-4">{article.title}</p>
                </Link>
                <p className="p-4">{article.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
