"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleForgotPassword = async (data) => {
    try {
      const response = await fetch("/api/auth/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

    //   if (response.ok) {
    //     toast("Password reset email sent");
    //     router.push("/auth/login"); // Redirige a la página de login después de enviar el email
    //   } else {
    //     toast("Error sending email");
    //   }
    } catch (error) {
      toast("Error: " + error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(handleForgotPassword)} className="w-1/2 md:w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Forgot Password</h1>
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Enter your email:
        </label>
        <input
          type="email"
          placeholder="username@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <button className="w-full rounded-lg text-white bg-blue-500 p-3 mt-2">
          Send Reset Email
        </button>

        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="mt-4 text-blue-400 hover:underline"
        >
          Back to Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordPage;
