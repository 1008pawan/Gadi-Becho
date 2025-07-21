"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VendorLogin = () => {
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
        // Replace with your actual login API endpoint
        const response = await fetch("http://localhost:5000/vendor/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.vendortoken) {
            localStorage.setItem("vendortoken", data.vendortoken);
          }
          toast.success("Login successful");
          router.push("/vendor/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Illustration */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400 p-10">
          <div className="w-full flex flex-col items-center">
            {/* SVG Illustration */}
            <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="130" cy="110" r="100" fill="#fff7ed"/>
              <ellipse cx="130" cy="180" rx="70" ry="12" fill="#fdba74"/>
              <path d="M110 170c-10-30-10-60 0-90 10-30 40-30 50 0 10 30 10 60 0 90" fill="#fdba74"/>
              <ellipse cx="130" cy="110" rx="50" ry="60" fill="#fff"/>
              {/* Person jumping */}
              <ellipse cx="130" cy="120" rx="30" ry="40" fill="#fbbf24"/>
              <rect x="120" y="140" width="20" height="40" rx="10" fill="#ea580c"/>
              <rect x="110" y="160" width="10" height="30" rx="5" fill="#ea580c"/>
              <rect x="150" y="160" width="10" height="30" rx="5" fill="#ea580c"/>
              <ellipse cx="130" cy="110" rx="18" ry="20" fill="#fff"/>
              <ellipse cx="130" cy="110" rx="10" ry="12" fill="#ea580c"/>
              <rect x="120" y="90" width="20" height="20" rx="10" fill="#fff"/>
              <ellipse cx="130" cy="90" rx="8" ry="6" fill="#ea580c"/>
            </svg>
            <h2 className="text-2xl font-bold text-orange-700 mt-8 mb-2 text-center">Welcome to the Vendor Portal!</h2>
            <p className="text-orange-900 text-center text-sm max-w-xs mb-4">Manage your business, track sales, and access exclusive vendor features with Gadi Becho.</p>
          </div>
        </div>
        {/* Right Panel - Login Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md mx-auto rounded-2xl p-8 relative">
            {/* Welcome badge */}
            <div className="absolute -top-6 left-8 bg-orange-400 text-white px-6 py-2 rounded-full font-semibold shadow-md text-sm">Welcome back</div>
            <h3 className="text-xl font-semibold text-orange-700 mb-6 mt-6 text-center md:text-left">Login your account</h3>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-orange-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email || ""}
                  className="w-full px-2 py-2 border-0 border-b-2 border-orange-300 focus:border-orange-500 focus:ring-0 text-orange-900 bg-transparent placeholder-orange-300 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-orange-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password || ""}
                    className="w-full px-2 py-2 border-0 border-b-2 border-orange-300 focus:border-orange-500 focus:ring-0 text-orange-900 bg-transparent placeholder-orange-300 transition-all pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="flex flex-col items-center mt-6 gap-2">
              <a href="/vendor-signup" className="text-orange-700 hover:underline font-medium">Create Account</a>
              <a href="/forgotPassword" className="text-orange-400 hover:text-orange-600 font-medium">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;