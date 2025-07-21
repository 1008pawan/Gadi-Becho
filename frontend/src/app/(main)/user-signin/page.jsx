"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  IconBuilding,
  IconLock,
  IconFingerprint,
  IconCheck,
  IconUser,
  IconShield,
  IconCloud,
} from "@tabler/icons-react";

const Signin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await axios.post("http://localhost:5000/user/authenticate", values);
        toast.success("Welcome back! Sign in successful");
        localStorage.setItem("token", result.data.token);
        router.push("/user/profile");
      } catch (err) {
        toast.error("Sign in failed. Please check your credentials.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex min-h-[600px]">
          
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center">
            <div className={`w-full max-w-md mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Branding */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <IconBuilding className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">Gadi Becho</span>
              </div>

              {/* Welcome Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, Welcome Back</h1>
              <p className="text-gray-600 mb-8">Hey, welcome back to your special place.</p>

              {/* Form */}
              <form onSubmit={signinForm.handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="info@gadibecho.com"
                    onChange={signinForm.handleChange}
                    value={signinForm.values.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <a href="/forgotPassword" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••••"
                      onChange={signinForm.handleChange}
                      value={signinForm.values.password}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="remember-me" 
                      name="remember-me" 
                      className="accent-purple-500 w-4 h-4" 
                    />
                    <label htmlFor="remember-me" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <a href="/user-signup" className="text-purple-500 hover:text-purple-600 font-medium">
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Panel - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-purple-500 to-blue-500 relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-12">
              <img 
                src="/images/login.jpg" 
                alt="Sign In Illustration" 
                className="w-96 max-w-full h-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;