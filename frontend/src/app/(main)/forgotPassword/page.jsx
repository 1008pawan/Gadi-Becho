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
        // Fix array check
        setCurrentUser(data[0]); // Take first matching user
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
      // First verify OTP with server
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
        // OTP verified, now reset password
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
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-white text-3xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">
              Reset Password
            </h2>
            <form action="">
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full font-[family-name:var(--font-geist-mono)] px-3 py-2 border text-gray-100 border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Your Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  onClick={verifyUser}
                  className="w-full font-[family-name:var(--font-geist-mono)] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Send OTP
                </button>
              </div>
            </form>

            {showReset && (
              <Formik
                initialValues={{ otp: "", password: "", confirm: "" }}
                onSubmit={verifyOTP}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleSubmit, errors }) => (
                  <form action="" className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter OTP"
                        id="otp"
                        value={values.otp}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New Password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm Password"
                        id="confirm"
                        value={values.confirm}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isVerifying}
                        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
                          isVerifying ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isVerifying ? "Verifying..." : "Submit"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
