"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/admin/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.admintoken) {
            localStorage.setItem("admintoken", data.admintoken);
          }
          toast.success("Login successful");
          router.push("/admin/dashboard");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (err) {
        toast.error("Login failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Illustration */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 p-10">
          <div className="w-full flex flex-col items-center">
            {/* SVG Illustration */}
            <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="130" cy="110" r="100" fill="#e0e7ff"/>
              <ellipse cx="130" cy="180" rx="70" ry="12" fill="#93c5fd"/>
              <rect x="80" y="80" width="100" height="60" rx="12" fill="#fff"/>
              <rect x="100" y="100" width="60" height="10" rx="4" fill="#2563eb"/>
              <rect x="100" y="115" width="40" height="8" rx="4" fill="#2563eb"/>
              <rect x="100" y="130" width="30" height="8" rx="4" fill="#2563eb"/>
              {/* Admin icon */}
              <circle cx="160" cy="100" r="14" fill="#2563eb"/>
              <path d="M154 100l6 6 10-10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Person */}
              <ellipse cx="120" cy="160" rx="12" ry="16" fill="#60a5fa"/>
              <rect x="114" y="170" width="12" height="24" rx="6" fill="#2563eb"/>
              <ellipse cx="120" cy="155" rx="6" ry="7" fill="#fff"/>
            </svg>
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-2 text-center">Welcome to the Admin Portal!</h2>
            <p className="text-blue-900 text-center text-sm max-w-xs mb-4">Manage your platform, view analytics, and access exclusive admin features with Gadi Becho.</p>
          </div>
        </div>
        {/* Right Panel - Login Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md mx-auto rounded-2xl p-8 relative">
            {/* Welcome badge */}
            <div className="absolute -top-6 left-8 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md text-sm">Welcome back</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-6 mt-6 text-center md:text-left">Login to your admin account</h3>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email || ""}
                  className="w-full px-2 py-2 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password || ""}
                    className="w-full px-2 py-2 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-500 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="flex flex-col items-center mt-6 gap-2">
              <a href="/forgotPassword" className="text-blue-400 hover:text-blue-600 font-medium">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;