import { notFound } from "next/navigation";
import WritingEntry from "@/components/WritingEntry";
import { getPressItem } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: item } = await getPressItem(id);

  if (!item) {
    return { title: "Press Not Found" };
  }

  return {
    title: item.title,
    description: item.description || item.title,
    openGraph: {
      title: item.title,
      description: item.description || item.title,
      images: item.image_url ? [item.image_url] : [],
      type: "article",
    },
  };
}

export default async function PressItemPage({ params }) {
  const { id } = await params;
  const { data: item } = await getPressItem(id);

  if (!item) {
    notFound();
  }

  return (
    <WritingEntry entry={item} backHref="/press" backLabel="All press" />
  );
}
