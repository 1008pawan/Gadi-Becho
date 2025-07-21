"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  IconPhone,
  IconHeart,
  IconCloud,
  IconGlobe,
  IconMusic,
  IconVideo,
  IconPhoto,
  IconFolder,
  IconMessage,
} from "@tabler/icons-react";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short").max(50, "Too Long").required("First name is required"),
  lastName: Yup.string().min(2, "Too Short").max(50, "Too Long").required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("Location is required"),
  password: Yup.string()
    .min(8, "Password is too short")
    .required("Password is required")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[A-Z]/, "password must contain a uppercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .matches(/\W/, "password must contain a special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const updateForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        // Combine first and last name
        const userData = {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          city: values.city,
          password: values.password,
        };
        
        await axios.post("http://localhost:5000/user/add", userData);
        toast.success("Account created successfully! Welcome to Gadi Becho!");
        resetForm();
        router.push("/user-signin");
      } catch (err) {
        toast.error("Account creation failed. Please try again.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: SignupSchema,
  });

  const serviceIcons = [
    { icon: IconMessage, color: "text-blue-500" },
    { icon: IconMusic, color: "text-green-500" },
    { icon: IconGlobe, color: "text-purple-500" },
    { icon: IconVideo, color: "text-red-500" },
    { icon: IconPhoto, color: "text-yellow-500" },
    { icon: IconFolder, color: "text-indigo-500" },
    { icon: IconPhone, color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <div className="flex min-h-screen">
        {/* Left Section - Informational */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
          <div className={`text-center max-w-md ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Main Illustration */}
            <div className="relative mb-8">
              <div className="w-45 h-45 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
                <IconCloud className="w-25 h-25 text-blue-500" />
              </div>
              
              {/* Floating Service Icons */}
              {serviceIcons.map((service, index) => (
                <div
                  key={index}
                  className={`absolute w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center animate-float`}
                  style={{
                    top: `${40 + Math.sin(index * 0.9) * 90}%`,
                    left: `${50 + Math.cos(index * 0.9) * 40}%`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
              ))}
            </div>
            
            {/* Text Content */}
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-25">
              Gadi Becho is trusted around India
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-10">
              With great care, our car scrapping service is loved by thousands of customers across the country
            </p>
            
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className={`w-full max-w-md ${isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <IconHeart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">gadibecho.com</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Getting Started</h1>
            <p className="text-gray-600 mb-8">
              Already have an account?{" "}
              <a href="/user-signin" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign in
              </a>
            </p>

            {/* Form */}
            <form onSubmit={updateForm.handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="FirstName"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.firstName}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                      updateForm.errors.firstName && updateForm.touched.firstName 
                        ? "border-red-400 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {updateForm.errors.firstName && updateForm.touched.firstName && (
                    <p className="text-xs text-red-500 mt-1">{updateForm.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="LastName"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.lastName}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                      updateForm.errors.lastName && updateForm.touched.lastName 
                        ? "border-red-400 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {updateForm.errors.lastName && updateForm.touched.lastName && (
                    <p className="text-xs text-red-500 mt-1">{updateForm.errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="mail@example.com"
                  onChange={updateForm.handleChange}
                  value={updateForm.values.email}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                    updateForm.errors.email && updateForm.touched.email 
                      ? "border-red-400 focus:ring-red-500" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {updateForm.errors.email && updateForm.touched.email && (
                  <p className="text-xs text-red-500 mt-1">{updateForm.errors.email}</p>
                )}
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  onChange={updateForm.handleChange}
                  value={updateForm.values.city}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                    updateForm.errors.city && updateForm.touched.city 
                      ? "border-red-400 focus:ring-red-500" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {updateForm.errors.city && updateForm.touched.city && (
                  <p className="text-xs text-red-500 mt-1">{updateForm.errors.city}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.password}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                      updateForm.errors.password && updateForm.touched.password 
                        ? "border-red-400 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {updateForm.errors.password && updateForm.touched.password && (
                  <p className="text-xs text-red-500 mt-1">{updateForm.errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showCPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    onChange={updateForm.handleChange}
                    value={updateForm.values.confirmPassword}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                      updateForm.errors.confirmPassword && updateForm.touched.confirmPassword 
                        ? "border-red-400 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowCPassword(!showCPassword)}
                  >
                    {showCPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {updateForm.errors.confirmPassword && updateForm.touched.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{updateForm.errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms" 
                  className="mt-1 accent-pink-500 w-4 h-4" 
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  You agree to our{" "}
                  <a href="/Terms-of-Services" className="text-pink-500 hover:text-pink-600 font-medium">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;