import Header from "@/components/Headers";
import HeroPage from "@/components/Hero";
import OtherSection from "@/components/OtherSection";
import OtherBooks from "@/components/OtherBooks";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getStories } from "@/lib/content";

export default async function HomePage() {
  const { data: stories, error } = await getStories();

  return (
    <div>
      <Header />
      <HeroPage />
      <OtherSection />
      <OtherBooks stories={stories} error={error} />
      <Newsletter />
      <Footer />
    </div>
  );
}
