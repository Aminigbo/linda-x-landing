"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import "./Header.css";
import { RiArrowDownSLine } from "react-icons/ri";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBookRoute = pathname.startsWith("/book");

  const navClass = (href) =>
    pathname === href
      ? "text-[#CCFF00] font-bold"
      : "hover:text-[#A72024] transition duration-300";

  return (
    <header className="bg-black text-white px-4 py-4 z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif tracking-wide">LINDA-X</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm uppercase font-medium">
          <Link href="/" className={navClass("/")}>
            Home
          </Link>

          <div className="relative group dropdown-container">
            <span
              className={`flex items-center cursor-pointer transition duration-300 ${
                isBookRoute
                  ? "text-[#CCFF00] font-bold"
                  : "hover:text-[#A72024]"
              }`}
            >
              Books <RiArrowDownSLine className="ml-2" />
            </span>

            <div className="dropdown-menu">
              <ul className="space-y-2 text-white text-sm tracking-wide">
                <li>
                  <Link
                    href="/book/woyingi-god-is-a-woman"
                    className={navClass("/book/woyingi-god-is-a-woman")}
                  >
                    Tamara: The Gender of God
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book/tari-ere-the-picky-virgin"
                    className={navClass("/book/tari-ere-the-picky-virgin")}
                  >
                    She Who Loved A Lie
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book/the-square-of-lost-sons"
                    className={navClass("/book/the-square-of-lost-sons")}
                  >
                    The Square Of Lost Sons
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link href="/about" className={navClass("/about")}>
            About
          </Link>
          <Link href="/articles" className={navClass("/articles")}>
            Articles
          </Link>
          <Link href="/events" className={navClass("/events")}>
            News & Events
          </Link>
          <Link href="/contact" className={navClass("/contact")}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-12.5 z-50">
          <div className="w-[300px] bg-black border-t-4 border-[#CCFF00] px-6 py-6 text-sm uppercase font-medium animate-slide-down">
            <div className="flex flex-col space-y-4 text-left text-white">
              <Link
                href="/"
                className={navClass("/")}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <div>
                <span
                  className={`flex items-center transition duration-300 ${
                    isBookRoute
                      ? "text-[#CCFF00] font-bold"
                      : "hover:text-[#A72024]"
                  }`}
                >
                  Books <RiArrowDownSLine className="ml-2" />
                </span>
                <ul className="ml-4 mt-2 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/book/woyingi-god-is-a-woman"
                      className={navClass("/book/woyingi-god-is-a-woman")}
                      onClick={() => setMenuOpen(false)}
                    >
                      Woyingi: God is a Woman
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/book/tari-ere-the-picky-virgin"
                      className={navClass("/book/tari-ere-the-picky-virgin")}
                      onClick={() => setMenuOpen(false)}
                    >
                      Tari-Ere: The Picky Virgin
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                href="/about"
                className={navClass("/about")}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/articles"
                className={navClass("/articles")}
                onClick={() => setMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/events"
                className={navClass("/events")}
                onClick={() => setMenuOpen(false)}
              >
                News & Events
              </Link>
              <Link
                href="/contact"
                className={navClass("/contact")}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
