"use client"
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";

function NavBarItems({session}) {
  return (
    <>
      <div className="sm:w-auto w-full flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg sm:text-xl font-bold">NextAuth</h1>
        </Link>
        <div>
          <CaretDownOutlined />
        </div>
      </div>
      <div>
        <ul className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-4 mt-2 sm:mt-0">
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
      </div>
    </>
  );
}

export default NavBarItems;
