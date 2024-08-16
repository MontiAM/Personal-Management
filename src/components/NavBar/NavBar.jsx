import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full flex flex-col sm:flex-row justify-between bg-gray-950 text-white px-6 sm:px-24 py-3 items-center">
        <Link href="/">
          <h1 className="text-lg sm:text-xl font-bold">Expenses Tracker</h1>
        </Link>
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
    </nav>
  );
}

export default NavBar;
