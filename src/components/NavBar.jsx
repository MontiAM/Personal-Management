import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between bg-gray-950 text-white px-24 py-3 items-center">
      <h1 className="text-xl font-bold">NextAuth</h1>
      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Sign Out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
