'use client';
import React, { useState } from "react";
import toast from "react-hot-toast";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("If this email exists, a reset link has been sent.");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Forgot password?</h1>
        <p className="mb-6 text-center text-gray-600">
          Remember your password?{" "}
          <a href="/user-signin" className="text-blue-600 hover:underline font-bold">
            Sign in here
          </a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none border-zinc-300"
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 inline-flex justify-center items-center text-white border border-blue-500 bg-blue-500 rounded-3xl hover:bg-blue-600 gap-3 font-bold transition mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;