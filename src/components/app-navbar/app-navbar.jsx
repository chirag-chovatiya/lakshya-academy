"use client";

import { useState, useEffect} from "react";
import HoverButton from "./hover-btn";
import NavMenu from "./app-menu";
import Link from "next/link";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full left-0 right-0 z-50 bg-custom-blue`}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-3 gap-4">
        <img
          src="/assets/logo/logo-11.png"
          className="h-10"
          alt="Hospital Logo"
        />
        <div className="flex md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden md:flex space-x-5">
            <HoverButton />
            <Link href="/appointment"
              type="button"
              className="px-4 py-2 md:ms-3 rounded-full text-custom-blue cursor-pointer font-semibold text-sm w-full bg-custom-bg"
            >
              <span className="flex-1 text-left">Appointment</span>
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden text-white"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 16 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 2h14M1 8h14M1 14h14"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
