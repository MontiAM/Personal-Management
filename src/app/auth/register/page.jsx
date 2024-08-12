"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()

  const onSubmit = handleSubmit( async (data) => {

    if (data.password !== data.confirmPassword) {
      return alert('Password do not match')
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify( {
        username: data.username,
        email: data.email,
        password: data.password
      } ),
      headers: {
        'Content-Type': 'aplication/json'
      }
    })

    if (res.ok) {
      router.push('/auth/login')
    }

    console.log(res);
    
    
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={onSubmit} className="w-1/3">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          type="text"
          placeholder="YourUser123"
          {...register("username", {
            required: {
              value: true,
              message: "Username is require",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          placeholder="youremail@email.com"
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
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          placeholder="***********"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password is require",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
         {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}
        <button className="w-full rounded-lg text-white bg-blue-500 p-3 mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
