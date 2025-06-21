"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VendorLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const vendorLoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/vendor/authenticate", values)
        .then((result) => {
          if (result.data.vendortoken) {
            localStorage.setItem("vendortoken", result.data.vendortoken);
            toast.success("Login successful");
            router.push("/vendor/profile");
          } else {
            toast.error("Login Failed");
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Login failed");
        });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Vendor Sign in</h1>
        <p className="mb-6 text-center text-gray-600">
          Don't have an account yet?{" "}
          <a href="/vendor-signup" className="text-blue-600 hover:underline font-bold">
            Vendor Sign up here
          </a>
        </p>
        <form onSubmit={vendorLoginForm.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              onChange={vendorLoginForm.handleChange}
              value={vendorLoginForm.values.email}
              className="w-full p-3 border rounded focus:outline-none border-zinc-300"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <a href="#" className="text-blue-500 hover:underline font-bold text-sm">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password..."
                onChange={vendorLoginForm.handleChange}
                value={vendorLoginForm.values.password}
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

export default VendorLogin;