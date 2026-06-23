"use client";

import React from "react";
import Img from "../assets/WOYINGI.jpeg.jpg";
import Img2 from "../assets/TARI.jpeg.jpg";
import { imageSrc } from "@/lib/image";

function OtherSection() {
  const [showPopup, setShowPopup] = React.useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="py-16 px-4 sm:px-8 md:px-16 bg-[#080808] text-center">
      <h1 className="text-3xl md:text-5xl mb-10 text-[#d7ff00]">
        Also by Linda
      </h1>
      <div className="flex gap-6 lg:gap-6 place-items-center justify-center">
        {[Img, Img2].map((image, index) => (
          <div
            key={index}
            className="w-full max-w-[180px] hover:scale-105 transition-transform duration-300"
          >
            <img
              src={imageSrc(image)}
              alt={`Anna's book ${index + 1}`}
              className="w-full h-auto shadow-lg rounded-md cursor-pointer"
              onClick={handleClick}
            />
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={handleClose}
            >
              &times;
            </button>
            <p>
              Contact the author{" "}
              <a href="mailto:hello@linda-x.com" className=" text-[#A72024]">
                hello@linda-x.com.
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherSection;
