import { redirect } from "next/navigation";

export default function LegacyAllArticlesPage() {
  redirect("/articles");
}