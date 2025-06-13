import React, { useRef, useState } from "react";
import Img from "../assets/FB_IMG_1743869048255.jpg";
import BackgroundImg from "../assets/background3.jpg";
import emailjs from "@emailjs/browser";

function Newsletter() {
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
    <div
      className="relative w-full min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 sm:px-12"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className="absolute inset-0 bg-[#080808] opacity-90 z-0"></div>
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-white py-20 px-10">
        <div className="flex justify-center md:justify-end lg:mr-15 ">
          <img
            src={Img}
            alt=""
            className="w-full max-w-xs sm:max-w-sm md:max-w-sm shadow-lg"
          />
        </div>
        <div className="py-5">
          <h3
            id="title"
            className="text-3xl sm:text-4xl text-[#D7FF00] md:text-5xl leading-tight mb-10"
          >
            Join my Readers' Club
          </h3>
          <p className="text-lg mb-10">
            Join my Readers' Club to receive FREE short stories, plus news of
            giveaways, book recommendations, writing tips and more.
          </p>
          {isSubmitted ? (
            <div className="bg-[#A72024] p-6 rounded-md text-center shadow-md flex flex-col items-center">
              <p className="text-lg text-white mb-6">
                Thanks for coming aboard! Keep an eye on your inbox for the
                confirmation mail.
              </p>
              <button
                className="mt-2 p-3 rounded-full bg-[#D7FF00] hover:bg-[#b6cc00] transition-colors"
                onClick={() => window.location.reload(true)}
                aria-label="Refresh"
              >
                {/* Refresh Icon (SVG) */}
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
      </div>
    </div>
  );
}

export default Newsletter;
