import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import Social from "@/components/Social";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <Header />
      <AboutUs />
      <Social />
      <Contact />
      <Footer />
    </div>
  );
}
