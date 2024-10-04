"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignOutPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleCancel = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmed) {
      handleSignOut();
    } else {
      handleCancel();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-1/2 md:w-1/4 p-4 rounded">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Sign Out</h1>
        <p className="text-slate-500 mb-2 text-sm">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-2">
          <button
            type="submit"
            onClick={() => {setConfirmed(false)}}
            className="w-full rounded-lg text-white bg-blue-500 p-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {setConfirmed(true)}}
            className="w-full rounded-lg text-white bg-blue-500 p-3"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignOutPage;
