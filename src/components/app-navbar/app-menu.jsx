import React from "react";
import HoverButton from "./hover-btn";
import Link from "next/link";

export default function NavMenu() {
  const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Services', url: '/' },
    { title: 'Doctors', url: '/doctor' },
    { title: 'News', url: '/blog' },
    { title: 'Contact', url: '/appointment' }
  ];
  return (
    <ul className="flex flex-col md:gap-12 p-4 md:p-0 mt-4 items-center md:text-white font-medium border rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:border-gray-700">
      {navLinks.map((item, index) => (
        <li key={index}>
          <Link href={item.url} className="block py-2 px-3 md:p-0 hover:text-primary-500">
            {item.title}
          </Link>
        </li>
      ))}
      <li className="block md:hidden">
        <div className="flex space-x-5">
          <HoverButton />
          <button
            type="button"
            className="px-4 py-2 md:ms-3 rounded-full text-custom-blue cursor-pointer font-semibold text-sm w-full bg-custom-bg"
          >
            <span className="flex-1 text-left">Appointment</span>
          </button>
        </div>
      </li>
    </ul>
  );
}