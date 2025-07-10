"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/user/authenticate", values)
        .then((result) => {
          toast.success("Signin successful");
          localStorage.setItem("token", result.data.token);
          router.push("/user/profile");
        })
        .catch((err) => {
          toast.error("Signin failed");
          console.log(err);
        });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Sign in</h1>
        <p className="mb-6 text-center text-gray-600">
          Don't have an account yet?
          <a href="/user-signup" className="text-blue-600 hover:underline font-bold">
            Sign up here
          </a>
        </p>
        <form onSubmit={signinForm.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              onChange={signinForm.handleChange}
              value={signinForm.values.email}
              className="w-full p-3 border rounded focus:outline-none border-zinc-300"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <a href="/forgotPassword" className="text-blue-500 hover:underline font-bold text-sm">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password..."
                onChange={signinForm.handleChange}
                value={signinForm.values.password}
                className="w-full p-3 border rounded focus:outline-none border-zinc-300"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="Remember-me" name="Remember-me" className="accent-blue-500" />
            <label htmlFor="Remember-me" className="text-sm">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 inline-flex justify-center items-center text-white border border-blue-500 bg-blue-500 rounded-3xl hover:bg-blue-600 gap-3 font-bold transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;