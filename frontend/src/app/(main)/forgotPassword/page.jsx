"use client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const sendOTP = async () => {
    try {
      const response = await fetch("http://localhost:5000/pass/request-otp", {
        method: "POST",
        body: JSON.stringify({
          to: email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("OTP sent successfully");
        setShowReset(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP");
    }
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/user/getbyemail/${email}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setCurrentUser(data[0]);
        await sendOTP();
      } else {
        toast.error("Email not registered");
      }
    } catch (error) {
      toast.error("Error verifying user");
    }
  };

  const verifyOTP = async (formData) => {
    setIsVerifying(true);
    try {
      const verifyResponse = await fetch(
        "http://localhost:5000/pass/verify-otp",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            otp: formData.otp,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (verifyResponse.status === 200) {
        const resetResponse = await fetch(
          "http://localhost:5000/pass/reset-password",
          {
            method: "PUT",
            body: JSON.stringify({
              email: email,
              newPassword: formData.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (resetResponse.status === 200) {
          toast.success("Password reset successfully");
          router.push("/user-signin");
        } else {
          toast.error("Failed to reset password");
        }
      } else {
        const errorData = await verifyResponse.json();
        toast.error(errorData.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#ea580c"/></svg>
          </div>
          <span className="text-xl font-bold text-gray-900">Gadi Becho</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Forgot Password?</h1>
        <p className="text-gray-500 mb-8 text-center">Enter your email address and we'll send you an OTP to reset your password.</p>
        <form className="w-full" onSubmit={verifyUser}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all border-gray-300 hover:border-gray-400 text-gray-700"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-300 mb-2"
          >
            Send OTP
          </button>
        </form>
        {showReset && (
          <Formik
            initialValues={{ otp: "", password: "", confirm: "" }}
            onSubmit={verifyOTP}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <form className="w-full mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all border-gray-300 hover:border-gray-400 text-gray-700"
                    placeholder="Enter OTP"
                    id="otp"
                    value={values.otp}
                    onChange={handleChange}
                    required
                  />
                  {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all border-gray-300 hover:border-gray-400 text-gray-700"
                    placeholder="New Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all border-gray-300 hover:border-gray-400 text-gray-700"
                    placeholder="Confirm Password"
                    id="confirm"
                    value={values.confirm}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className={`w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-300 mb-2 ${isVerifying ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isVerifying ? "Verifying..." : "Submit"}
                </button>
              </form>
            )}
          </Formik>
        )}
        <div className="text-center mt-6">
          <a href="/user-signin" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
