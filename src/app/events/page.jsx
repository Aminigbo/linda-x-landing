import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Headers";

export const metadata = {
  title: "News & Events",
};

export default function EventsPage() {
  return (
    <div>
      <Header />
      <div className="p-10 bg-[#262626]">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6 bg-[#A72024] p-4 w-2xs text-white">
            Events
          </h1>
          <p className="text-white">Coming soon......</p>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl mb-6 bg-[#A72024] p-4 w-2xs text-white">
            News
          </h1>
          <p className="text-white">Coming soon.....</p>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
