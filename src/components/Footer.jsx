"use client";

import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="px-6 md:px-12 py-8 flex flex-col items-center text-center text-gray-300 bg-[#171717]">
        <div className="mb-6 text-sm leading-relaxed">
          <p className="font-semibold mb-3">To purchase any of the books, contact:</p>
          <p className="font-semibold">Dati Harry</p>
          <p>
            <a href="tel:+2349076493507">09076493507</a>
          </p>
          <p className="mb-3">
            <a href="mailto:datiharry@gmail.com">datiharry@gmail.com</a>
          </p>
          <p className="font-semibold">To purchase (UK)</p>
          <p className="mb-3">
            <a href="mailto:fortheappleidsaint@gmail.com">
              fortheappleidsaint@gmail.com
            </a>
          </p>
          <p className="font-semibold">Stewart Ezekiel</p>
          <p>
            <a href="tel:+2349030643105">09030643105</a>
          </p>
          <p>
            <a href="mailto:info.stewartofficial@gmail.com">
              info.stewartofficial@gmail.com
            </a>
          </p>
        </div>
        <div className="flex space-x-6 text-xl text-gray-500">
          <a
            href="https://www.facebook.com/share/16H5Kn7dHk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="hover:text-black cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/in/linda-somiari-stewart-858556150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="hover:text-black cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/lindasomiari?igsh=MWw1YjRnanBteDMybw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-black cursor-pointer" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
