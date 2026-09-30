"use client";

import React from "react";
import Link from "next/link";
import Img from "../assets/woyingi-god-is-a-woman.jpg";
import Img2 from "../assets/tari-ere.jpg";
import { imageSrc } from "@/lib/image";

const books = [
  {
    image: Img,
    href: "/book/woyingi-god-is-a-woman",
    alt: "Woyingi: God Is a Woman",
  },
  {
    image: Img2,
    href: "/book/tari-ere-the-picky-virgin",
    alt: "The Legend of Tari-Ere: The Picky Virgin",
  },
];

function OtherSection() {
  return (
    <div className="py-16 px-4 sm:px-8 md:px-16 bg-[#080808] text-center">
      <h1 className="text-3xl md:text-5xl mb-10 text-[#d7ff00]">
        Also by Linda
      </h1>
      <div className="flex gap-6 lg:gap-6 place-items-center justify-center">
        {books.map((book) => (
          <Link
            key={book.href}
            href={book.href}
            className="w-full max-w-[180px] hover:scale-105 transition-transform duration-300"
          >
            <img
              src={imageSrc(book.image)}
              alt={book.alt}
              className="w-full h-auto shadow-lg rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OtherSection;
