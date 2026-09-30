"use client";

import React from "react";
import Link from "next/link";
import firelight from "../assets/firelight-fables.jpg";
import woyingi from "../assets/woyingi-god-is-a-woman.jpg";
import tariEre from "../assets/tari-ere.jpg";
import whispers from "../assets/whispers-from-the-story-circle.jpg";
import { imageSrc } from "@/lib/image";

const books = [
  {
    image: firelight,
    href: "/book/firelight-fables",
    alt: "Firelight Fables",
  },
  {
    image: woyingi,
    href: "/book/woyingi-god-is-a-woman",
    alt: "Woyingi: God Is a Woman",
  },
  {
    image: tariEre,
    href: "/book/tari-ere-the-picky-virgin",
    alt: "The Legend of Tari-Ere: The Picky Virgin",
  },
  {
    image: whispers,
    href: "/book/whispers-from-the-story-circle",
    alt: "Whispers from the Story Circle",
  },
];

const loop = [...books, ...books];

function BookCover({ book }) {
  return (
    <Link
      href={book.href}
      className="w-[150px] sm:w-[180px] shrink-0 hover:scale-105 transition-transform duration-300"
    >
      <img
        src={imageSrc(book.image)}
        alt={book.alt}
        className="w-full h-auto shadow-lg rounded-md"
      />
    </Link>
  );
}

function OtherSection() {
  return (
    <div className="py-16 bg-[#080808] text-center overflow-hidden">
      <h1 className="text-3xl md:text-5xl mb-10 text-[#d7ff00] px-4">
        Book by Linda
      </h1>
      <div className="book-marquee flex w-max gap-6">
        {loop.map((book, index) => (
          <BookCover key={`${book.href}-${index}`} book={book} />
        ))}
        {loop.map((book, index) => (
          <BookCover key={`${book.href}-copy-${index}`} book={book} />
        ))}
      </div>
      <style>{`
        .book-marquee {
          animation: book-marquee 45s linear infinite;
        }
        .book-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes book-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .book-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default OtherSection;
