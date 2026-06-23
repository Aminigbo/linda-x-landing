"use client";

import React, { useRef, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        "service_ksl2iz5",
        "template_jmuw2i8",
        form.current,
        "sMgIbMrARNZ48i5Hy"
      )
      .then(
        () => {
          setIsLoading(false);
          setIsSubmitted(true);
        },
        (error) => {
          setIsLoading(false);
          alert("Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center py-16 px-4 sm:px-8 md:px-16 bg-[#080808] gap-8">
      {/* Readers Club Section */}
      <div className="bg-[#202020] w-full lg:w-[550px] p-6 text-white">
        <h2
          id="title"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold p-3 mb-6 bg-[#A72024]"
        >
          Join my Readers' Club
        </h2>
        <p className="text-base md:text-lg leading-8 mb-6">
          Join my Readers Club to receive FREE short stories, plus news of
          giveaways, book recommendations, writing tips and more.
        </p>

        {isSubmitted ? (
          <div className="bg-[#A72024] p-6 rounded-md text-center shadow-md">
            <p className="text-lg text-white">
              Thanks for coming aboard! Keep an eye on your inbox for the
              confirmation mail.
            </p>
            <button
              className="mt-6 px-6 py-2 text-white font-semibold"
              onClick={() => window.location.reload(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#A72024]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582M20 20v-5h-.581M19.418 9A7.978 7.978 0 0012 4c-3.042 0-5.824 1.721-7.418 4M4.582 15A7.978 7.978 0 0012 20c3.042 0 5.824-1.721 7.418-4"
                />
              </svg>
            </button>
          </div>
        ) : (
          <form className="space-y-4" ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Name"
              name="first-name"
              className="w-full h-12 bg-[#323131] pl-5 rounded-sm"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full h-12 bg-[#323131] pl-5 rounded-sm"
            />
            <button
              type="submit"
              className="w-full text-center text-white bg-[#a72024] h-12 text-lg"
            >
              {isLoading ? (
                <span className="animate-pulse tracking-widest">...</span>
              ) : (
                "Join"
              )}
            </button>
          </form>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-[#202020] w-full lg:w-[550px] p-6 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold p-3 mb-6 bg-[#A72024]">
          Contact me
        </h2>
        <div className="text-base md:text-lg leading-8 space-y-4">
          <p>Do get in touch.</p>
          <p>
            Write to me at{" "}
            <a
              href="mailto:hello@linda-x.com"
              className="text-[#a72024] hover:underline"
            >
              hello@linda-x.com
            </a>{" "}
            or contact me on social media below.
          </p>
          <p>
            For events and publicity contact me directly:{" "}
            <a
              href="mailto:booklinda@linda-x.com"
              className="text-[#a72024] hover:underline"
            >
              booklinda@linda-x.com.
            </a>
          </p>
          <p className="text-center font-semibold">Say hello on social media</p>
          <div className="flex justify-center gap-4 text-2xl">
            <a
              href="https://www.facebook.com/share/16H5Kn7dHk/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a72024] p-2 rounded-full"
            >
              <FaFacebookF className="cursor-pointer" />
            </a>
            <a
              href="https://www.linkedin.com/in/linda-somiari-stewart-858556150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a72024] p-2 rounded-full"
            >
              <FaLinkedinIn className="cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/lindasomiari?igsh=MWw1YjRnanBteDMybw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a72024] p-2 rounded-full"
            >
              <FaInstagram className="cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
