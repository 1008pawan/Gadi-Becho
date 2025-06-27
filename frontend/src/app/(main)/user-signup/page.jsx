"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short").max(50, "Too Long").required("Name is required"),
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

  const updateForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:5000/user/add", values)
        .then((result) => {
          toast.success("User Created Successfully");
          resetForm();
          router.push("/user-signin");
        })
        .catch((err) => {
          toast.error("User Creation Failed");
          console.log(err);
        });
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 py-20">
      <div className="w-full max-w-lg bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Sign up</h1>
        <p className="mb-6 text-center text-gray-600">
          Already have an account?
          <a href="/user-signin" className="text-blue-600 hover:underline font-bold">
            Sign in here
          </a>
        </p>
        <form onSubmit={updateForm.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name..."
              onChange={updateForm.handleChange}
              value={updateForm.values.name}
              className={`w-full p-3 border rounded focus:outline-none ${updateForm.errors.name && updateForm.touched.name ? "border-red-400" : "border-zinc-300"}`}
            />
            {updateForm.errors.name && updateForm.touched.name && (
              <p className="text-xs text-red-500 mt-1">{updateForm.errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              onChange={updateForm.handleChange}
              value={updateForm.values.email}
              className={`w-full p-3 border rounded focus:outline-none ${updateForm.errors.email && updateForm.touched.email ? "border-red-400" : "border-zinc-300"}`}
            />
            {updateForm.errors.email && updateForm.touched.email && (
              <p className="text-xs text-red-500 mt-1">{updateForm.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="block font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your City..."
              onChange={updateForm.handleChange}
              value={updateForm.values.city}
              className={`w-full p-3 border rounded focus:outline-none ${updateForm.errors.city && updateForm.touched.city ? "border-red-400" : "border-zinc-300"}`}
            />
            {updateForm.errors.city && updateForm.touched.city && (
              <p className="text-xs text-red-500 mt-1">{updateForm.errors.city}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password..."
                onChange={updateForm.handleChange}
                value={updateForm.values.password}
                className={`w-full p-3 border rounded focus:outline-none ${updateForm.errors.password && updateForm.touched.password ? "border-red-400" : "border-zinc-300"}`}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {updateForm.errors.password && updateForm.touched.password && (
              <p className="text-xs text-red-500 mt-1">{updateForm.errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password..."
                onChange={updateForm.handleChange}
                value={updateForm.values.confirmPassword}
                className={`w-full p-3 border rounded focus:outline-none ${updateForm.errors.confirmPassword && updateForm.touched.confirmPassword ? "border-red-400" : "border-zinc-300"}`}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowCPassword((v) => !v)}
              >
                {showCPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {updateForm.errors.confirmPassword && updateForm.touched.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{updateForm.errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="checkbox" name="checkbox" className="accent-blue-500" />
            <label htmlFor="checkbox" className="text-sm">
              I accept the
              <a href="#" className="text-blue-500 hover:underline font-bold">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 inline-flex justify-center items-center text-white border border-blue-500 bg-blue-500 rounded-3xl hover:bg-blue-600 gap-3 font-bold transition"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;