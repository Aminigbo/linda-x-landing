import { notFound } from "next/navigation";
import WritingEntry from "@/components/WritingEntry";
import { getArticle } from "@/lib/content";

export const revalidate = 60;

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
  const { data: article } = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <WritingEntry
      entry={article}
      backHref="/articles"
      backLabel="All articles"
    />
  );
}
