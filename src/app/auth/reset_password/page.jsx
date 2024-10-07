"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/verify_reset_token?token=${token}`);
        const data = await res.json();

        if (data.valid) {
          setTokenValid(true);
        } else {
          toast("Invalid or expired token");
          router.push("/auth/login");
        }
      } catch (error) {
        toast("Error verifying token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, router]);

  const onSubmit = handleSubmit(async (data) => {
    if (!token) return toast("Invalid request");    
    
    try {
      const res = await fetch("/api/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: data.password }),
      });

      const result = await res.json();
      
      if (result.valid) {
        toast("Password successfully reset!");
        router.push("/auth/login");
      } else {
        toast(result.message || "Error resetting password");
      }
    } catch (error) {
      toast("An error occurred");
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!tokenValid) {
    return null;
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/2 md:w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Reset Password
        </h1>
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          New Password:
        </label>
        <input
          type="password"
          placeholder="***********"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
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
          Reset Password
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default ResetPasswordPage;
