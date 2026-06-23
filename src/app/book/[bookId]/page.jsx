import Link from "next/link";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import Header from "@/components/Headers";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { bookDetails } from "@/data/books";
import { imageSrc } from "@/lib/image";

export async function generateMetadata({ params }) {
  const { bookId } = await params;
  const book = bookDetails[bookId];

  if (!book) {
    return { title: "Book Not Found" };
  }

  return {
    title: book.title,
    description: book.description?.[0] ?? book.title,
    openGraph: {
      title: book.title,
      description: book.description?.[0] ?? book.title,
      images: [imageSrc(book.image)],
    },
  };
}

export default async function BookPage({ params }) {
  const { bookId } = await params;
  const book = bookDetails[bookId];

  if (!book) {
    notFound();
  }

  return (
    <>
      <Header />
      <div
        className="relative w-full min-h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center py-16"
        style={{ backgroundImage: `url(${imageSrc(book.bg)})` }}
      >
        <div className="absolute inset-0 pr-4 bg-[#080808] opacity-90 z-0"></div>
        <section className="relative z-10 flex flex-col lg:flex-row items-start gap-8 px-4 py-10">
          <div className="text-white w-full lg:w-3/5 rounded-md mx-auto">
            <h2 className="text-3xl lg:text-3xl text-center font-semibold mb-6 bg-[#A72024] p-4">
              {book.title}
            </h2>

            <ul className="list-none pl-6 text-lg sm:text-xl">
              {book.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="hidden md:flex mt-6 justify-end">
              <details className="relative">
                <summary className="list-none cursor-pointer bg-[#048152] text-white px-6 py-3 hover:bg-transparent hover:border-2 hover:border-[#A72024] hover:text-[#A72024] transition">
                  ORDER NOW
                </summary>
                <div className="fixed inset-0 z-[1000] flex items-center justify-between px-4 overflow-hidden">
                  <div className="rounded-lg p-6 w-full text-center">
                    <div className="flex justify-end mb-10">
                      <X size={40} className="text-2xl text-white" />
                    </div>
                    <div className="grid gap-4 bg-[#262626] py-7 mb-4 lg:grid-cols-2">
                      <a
                        href="https://www.kobo.com/gb/en/search?query=linda+somiari+stewart&ac=1&acp=linda+somiari+stewart&ac.author=linda+somiari+stewart&sort=Temperature&fclanguages=en"
                        className="bg-[#eb2e34] text-white px-4 py-2 rounded w-[200px] lg:w-[150px] mx-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Kobo.com
                      </a>
                      <a
                        href="https://books.by/linda-somiari-stewart#she-who-loved-a-lie"
                        className="bg-[#eb2e34] text-white px-4 py-2 rounded w-[200px] lg:w-[150px] mx-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book.by
                      </a>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          <div className="w-full lg:w-[350px] flex-shrink-0 lg:mr-14">
            <img
              src={imageSrc(book.image)}
              alt={book.title}
              className="rounded-md w-full shadow-lg"
            />
          </div>
        </section>
      </div>

      <section className=" w-full flex flex-col bg-[#080808] lg:flex-row items-center gap-2 px-4 py-10">
        <div className="flex justify-center w-full lg:w-1/3">
          <div className="bg-[#262626] p-4 rounded-md shadow-lg border-2 border-[#f9f9f9]">
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              <img
                src={imageSrc(book.image)}
                alt={book.title}
                className="w-40 sm:w-48 md:w-56 lg:w-40 xl:w-40 rounded shadow-md object-contain"
              />
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-[#262626] text-white text-center p-10 rounded-md shadow-md text-sm sm:text-base">
            AUDIO EXTRACT COMING SOON.....
          </div>
          <div className="bg-[#262626] text-white text-left p-3 rounded-md shadow-md text-sm sm:text-base">
            Read the first chapter free (click the image)
          </div>
        </div>
      </section>

      <section
        className="relative w-full flex flex-col gap-8 py-10 items-center"
        style={{
          backgroundImage: `url(${imageSrc(book.bg)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#080808] opacity-90 z-0"></div>

        <div className="relative z-10 w-full flex flex-col items-center gap-6">
          <div className="bg-black text-white p-4 rounded-md w-full flex flex-col items-center shadow-lg">
            <img
              src={imageSrc(book.picture)}
              alt="Book"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain rounded"
            />
            <h1 className="mt-4 text-lg sm:text-xl md:text-3xl font-semibold text-[#A72024] text-center">
              {book.scribe}
            </h1>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="text-white text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-3xl p-1.5">
              <dl>
                {book.praise.map((item) => (
                  <div key={item.author}>
                    <dd>{item.quote}</dd>
                    <dt className="font-semibold">{item.author}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
