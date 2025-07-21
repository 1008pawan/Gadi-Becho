"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const vendorSignupSchema = Yup.object().shape({
  businessName: Yup.string().min(2, "Too Short").max(50, "Too Long").required("Business name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password is too short")
    .required("Password is required")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[A-Z]/, "password must contain a uppercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .matches(/\W/, "password must contain a special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password must match")
});

const VendorSignup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const vendorupdateForm = useFormik({
    initialValues: {
      businessName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        await axios.post("http://localhost:5000/vendor/add", {
          name: values.businessName,
          email: values.email,
          password: values.password
        });
        toast.success("Vendor Created Successfully");
        resetForm();
        router.push("/vendor-login");
      } catch (err) {
        toast.error("Vendor Creation Failed");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: vendorSignupSchema,
  });

  return (
    <div className="min-h-screen bg-[#f7b267] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#ea580c"/></svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">Gadi Becho</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Get Started</h1>
          <p className="text-gray-500 mb-8">Welcome to Gadi Becho Vendor – Let’s create your account</p>
          <form onSubmit={vendorupdateForm.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Your Business Name"
                onChange={vendorupdateForm.handleChange}
                value={vendorupdateForm.values.businessName}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${vendorupdateForm.errors.businessName && vendorupdateForm.touched.businessName ? "border-red-400 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"}`}
              />
              {vendorupdateForm.errors.businessName && vendorupdateForm.touched.businessName && (
                <p className="text-xs text-red-500 mt-1">{vendorupdateForm.errors.businessName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="vendor@email.com"
                onChange={vendorupdateForm.handleChange}
                value={vendorupdateForm.values.email}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${vendorupdateForm.errors.email && vendorupdateForm.touched.email ? "border-red-400 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"}`}
              />
              {vendorupdateForm.errors.email && vendorupdateForm.touched.email && (
                <p className="text-xs text-red-500 mt-1">{vendorupdateForm.errors.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={vendorupdateForm.handleChange}
                  value={vendorupdateForm.values.password}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${vendorupdateForm.errors.password && vendorupdateForm.touched.password ? "border-red-400 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {vendorupdateForm.errors.password && vendorupdateForm.touched.password && (
                <p className="text-xs text-red-500 mt-1">{vendorupdateForm.errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showCPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={vendorupdateForm.handleChange}
                  value={vendorupdateForm.values.confirmPassword}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${vendorupdateForm.errors.confirmPassword && vendorupdateForm.touched.confirmPassword ? "border-red-400 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {vendorupdateForm.errors.confirmPassword && vendorupdateForm.touched.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{vendorupdateForm.errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing Up...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/vendor-login" className="text-orange-600 hover:text-orange-700 font-medium">
                Log in
              </a>
            </p>
          </div>
        </div>
        {/* Right Panel - Illustration & Marketing */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-orange-700 to-orange-500 p-8">
          <div className="w-full max-w-md text-white text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{fontFamily:'serif'}}>
              Grow your business<br />
              with Gadi Becho
            </h2>
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#ea580c"/></svg>
                </div>
                <div>
                  <div className="text-lg font-bold">Vendor Dashboard</div>
                  <div className="text-sm text-white/80">Track sales, manage inventory, and more</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#ea580c"/></svg>
                </div>
                <div>
                  <div className="text-lg font-bold">Instant Payments</div>
                  <div className="text-sm text-white/80">Get paid quickly and securely</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;