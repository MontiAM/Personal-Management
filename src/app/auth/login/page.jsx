"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      toast(res?.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  const handleGoogleSignIn = async () => {
    const res = await signIn("google", { redirect: false });
    if (res?.error) {
      toast(res?.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={onSubmit} className="w-1/2 md:w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          placeholder="username@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "Email is require",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          placeholder="***********"
          {...register("password", {
            required: {
              value: true,
              message: "Password is require",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button className="w-full rounded-lg text-white bg-blue-500 p-3 mt-2">
          Sign In
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full rounded-lg text-white bg-red-500 p-3 mt-4"
        >
          Sign In with Google
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
