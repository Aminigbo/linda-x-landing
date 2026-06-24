import { redirect } from "next/navigation";

export default function LegacyArticlesUploadPage() {
  redirect("/admin/new-post");
}
