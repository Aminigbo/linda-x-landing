import Link from "next/link";
import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { getPress } from "@/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Press",
};

export default async function PressPage() {
  const { data: items, error } = await getPress();

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 bg-[#A72024] p-4 text-white inline-block">
          Press
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Coverage of Linda Somiari-Stewart and her work.
        </p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.length === 0 && <p>No press coverage yet.</p>}
            {items.map((item) => (
              <div key={item.id} className="shadow-lg rounded-lg">
                <Link href={`/press/${item.id}`}>
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-auto block mb-4 rounded-t-lg object-cover"
                    />
                  )}
                  <p className="font-semibold p-4">{item.title}</p>
                </Link>
                <p className="p-4">{item.description}</p>
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
