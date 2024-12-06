"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MenuOutlined, CloseOutlined} from "@ant-design/icons";
import { useState, useEffect } from "react";

function NavBar() {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const navItems = [
    { id: 1, title: "Login", link: "/auth/login", protected: false },
    { id: 2, title: "Register", link: "/auth/register", protected: false },
    { id: 3, title: "Dashboard", link: "/dashboard", protected: true },
    { id: 4, title: "Sign Out", link: "/api/auth/signout", protected: true },
  ];

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDropdown(true);
      } else {
        setDropdown(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex flex-col md:flex-row justify-between bg-gray-950 text-white px-6 sm:pl-12 sm:pr-8 py-3 items-center">
      <div className="w-full md:w-2/4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg sm:text-xl font-bold">Expenses Tracker</h1>
        </Link>
        <button
          className="relative md:hidden text-secondary focus:outline-none transition-all duration-300 w-6 h-6"
          onClick={toggleDropdown}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              dropdown
                ? "rotate-90 opacity-0 scale-75"
                : "rotate-0 opacity-100 scale-100"
            }`}
          >
            <MenuOutlined />
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              dropdown
                ? "rotate-0 opacity-100 scale-100"
                : "-rotate-90 opacity-0 scale-75"
            }`}
          >
           <CloseOutlined />
          </span>
        </button>
      </div>

      <ul
        className={`${
          dropdown ? "max-h-60" : "max-h-0"
        } md:flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-4 mt-2 md:mt-0 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
      >
        {navItems
          .filter((item) => (session?.user ? item.protected : !item.protected))
          .map((text) => (
            <Link
              href={text.link}
              key={text.id}
              className="block md:inline-block text-white hover:text-gray-400 py-2 sm:py-0 sm:mx-4"
            >
              {text.title}
            </Link>
          ))}
      </ul>
    </nav>
  );
}

export default NavBar;
