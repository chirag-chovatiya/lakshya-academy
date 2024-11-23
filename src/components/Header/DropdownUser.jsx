"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = (event) => {
      if (
        !dropdown.current ||
        dropdown.current.contains(event.target) ||
        trigger.current.contains(event.target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("t");
      document.cookie = "t=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      window.location.href = "/login";

    }
  };

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-base font-medium text-black dark:text-white">
            userName
          </span>
        </span>
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="https://ui-avatars.com/api/?name=ME&bold=true&format=png"
            alt="User"
            width={112}
            height={112}
            style={{ width: "auto", height: "auto" }}
          />
        </span>
        <i className="fa-solid fa-chevron-down"></i>
      </button>

      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <i className="fa-regular fa-user"></i>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <i className="fa-regular fa-address-book"></i>
                My Contacts
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <i className="fa-solid fa-gear"></i>
                Account Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
