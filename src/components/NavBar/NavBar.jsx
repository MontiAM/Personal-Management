"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

function NavBar() {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { 
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
    <nav className="w-full flex flex-col sm:flex-row justify-between bg-gray-950 text-white px-6 sm:px-24 py-3 items-center">
      <div className="w-full sm:w-1/4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg sm:text-xl font-bold">Expenses Tracker</h1>
        </Link>
        <button
          className="block sm:hidden focus:outline-none"
          onClick={toggleDropdown}
        >
          <MenuOutlined />
        </button>
      </div>

      <ul
        className={`${
          dropdown ? "max-h-60" : "max-h-0"
        } sm:flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-4 mt-2 sm:mt-0 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
      >
        {!session?.user ? (
          <>
            <li>
              <Link href="/auth/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="hover:text-gray-400">
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
