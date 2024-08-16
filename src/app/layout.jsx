"use client";

import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import { SessionProvider, useSession } from "next-auth/react";
import { Spin } from "antd";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function Content({ children }) {
  const { status } = useSession();
  console.log(status);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar />
          <Content>{children}</Content>
        </SessionProvider>
      </body>
    </html>
  );
}
