"use client";

import React from "react";
import Link from "next/link";
import AnimatedTitle from "./AnimatedTitle";
import { imageSrc } from "@/lib/image";

function HeroSection({ section }) {
  const { id, title, description, link, image, background, color, extraImg } =
    section;

  return (
    <div
      className="relative w-full min-h-[90vh] bg-cover bg-center bg-no-repeat flex flex-wrap items-center justify-center py-10 px-6 sm:px-12"
      id={id}
      style={{ backgroundImage: `url(${imageSrc(background)})` }}
    >
      <div className="absolute inset-0 bg-black opacity-90 z-0"></div>

      {/* Show AnimatedTitle only for the first HeroSection (id === 'hero' or your chosen id) */}
      {id === "woyingi-god-is-a-woman" && (
        <div className="relative z-10 max-w-7xl w-full text-center text-white">
          <AnimatedTitle />
        </div>
      )}

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-white py-20 px-10">
        {/* Text Content */}
        <div className="space-y-6 text-left lg:w-[700px] md:text-left">
          <h1
            className="text-3xl sm:text-4xl md:text-4xl leading-tight"
            style={{ color }}
          >
            {title}
          </h1>
          {description && <p className="text-lg md:text-xl">{description}</p>}
          <div className="hidden md:block mt-6 justify-center">
            <Link href={link}>
              <button
                className="mt-4 text-black px-6 py-3 hover:bg-transparent hover:border-2 transition"
                style={{
                  backgroundColor: color,
                  borderColor: color,
                  color: "black",
                }}
              >
                FIND OUT MORE
              </button>
            </Link>
          </div>
          {extraImg && (
            <div className="absolute lg:top-75 -bottom-8 left-55">
              <img src={imageSrc(extraImg)} alt="" className="lg:w-[150px] w-[100px]" />
            </div>
          )}
        </div>

        {/* Image Content */}
        <div className="flex justify-center md:justify-end">
          <Link href={link}>
            <img
              src={imageSrc(image)}
              alt="Cover"
              className="w-full max-w-xs sm:max-w-sm md:max-w-sm shadow-lg"
            />
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="block md:hidden mt-6 order-3 w-full text-center">
          <Link href={link}>
            <button
              className="w-[180px] hover:bg-transparent hover:border text-black px-5 py-3 text-sm transition-all duration-300"
              style={{
                backgroundColor: color,
                borderColor: color,
                color: "black",
              }}
            >
              FIND OUT MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
