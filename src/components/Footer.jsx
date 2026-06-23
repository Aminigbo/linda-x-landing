"use client";

import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-center text-gray-500 bg-[#171717]">
        <div className="flex space-x-6 text-xl mb-4 md:mb-0">
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
