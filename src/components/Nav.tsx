"use client";
import Link from "next/link";
import { useState } from "react";
import RoundLink from "./RoundLink";

type Props = {};

const Nav = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const isLoggedIn = false;
  return (
    <header className="bg-opacity-30">
      <nav className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title="Home" className="flex">
              <img
                className="w-auto h-8"
                src="https://placehold.co/160x32"
                alt=""
              />
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
            <svg
              className={`${showMenu ? "hidden" : "block"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
            <svg
              className={`${showMenu ? "block" : "hidden"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link
              href="/pricing"
              title=""
              className="text-base text-black transition-all duration-200 hover:text-opacity-80"
            >
              Pricing
            </Link>
            {isLoggedIn ? (
              <RoundLink name="Account" link="/account" />
            ) : (
              // <RoundLink name="Join now" link="/login" />
              <RoundLink name="Account" link="/account" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
