"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateRequest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    vehicleLocation: "",
    vehicleDescription: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  const upload = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "MERN_2:00");
    fd.append("cloud_name", "db6fbsnho");

    axios
      .post("https://api.cloudinary.com/v1_1/db6fbsnho/image/upload", fd)
      .then((result) => {
        toast.success("File upload successfully");
        setimageUrl(result.data.url);
      })
      .catch((err) => {
        toast.error("failed to upload file");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user-signin");
      return;
    }
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const userData = JSON.parse(window.atob(base64));
      setUser(userData);
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/user-signin");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateRequestNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REQ-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!user || !user._id) {
      setError("User authentication error. Please login again.");
      setLoading(false);
      return;
    }
    try {
      const reqData = {
        ...formData,
        userId: user._id,
        reqNumber: generateRequestNumber(),
        status: "pending",
        imageUrl: imageUrl,
      };
      const response = await fetch("http://localhost:5000/request/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });
      if (response.ok) {
        setSuccess("Request created successfully!");
        setFormData({
          fullName: "",
          contactNumber: "",
          vehicleLocation: "",
          vehicleDescription: "",
        });
        setTimeout(() => {
          router.push("/user/manage-request");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create request. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Illustration & Message */}
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
              {/* Car icon */}
              <rect x="140" y="120" width="30" height="14" rx="6" fill="#93c5fd"/>
              <circle cx="150" cy="134" r="5" fill="#2563eb"/>
              <circle cx="165" cy="134" r="5" fill="#2563eb"/>
            </svg>
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-2 text-center">Create a New Request</h2>
            <p className="text-blue-900 text-center text-sm max-w-xs mb-4">Submit your vehicle details and get the best offer from Gadi Becho. Fast, easy, and transparent!</p>
          </div>
        </div>
        {/* Right Panel - Form Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md mx-auto rounded-2xl shadow-lg p-8 relative">
            <h3 className="text-xl font-semibold text-blue-700 mb-6 mt-2 text-center md:text-left">Request Details</h3>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{success}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                  <input
                    className="w-full px-4 py-3 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all rounded-none"
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">Contact Number</label>
                  <input
                    className="w-full px-4 py-3 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all rounded-none"
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    value={formData.contactNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter 10-digit contact number"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="vehicleLocation">Vehicle Location</label>
                <input
                  className="w-full px-4 py-3 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all rounded-none"
                  id="vehicleLocation"
                  name="vehicleLocation"
                  type="text"
                  value={formData.vehicleLocation || ""}
                  onChange={handleChange}
                  placeholder="Enter vehicle location"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="vehicleDescription">Vehicle Description</label>
                <textarea
                  className="w-full px-4 py-3 border-0 border-b-2 border-blue-300 focus:border-blue-500 focus:ring-0 text-blue-900 bg-transparent placeholder-blue-300 transition-all rounded-none"
                  id="vehicleDescription"
                  name="vehicleDescription"
                  value={formData.vehicleDescription || ""}
                  onChange={handleChange}
                  placeholder="Describe your vehicle (make, model, year, condition, etc.)"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="imageUpload">Vehicle Image (optional)</label>
                <input
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors bg-white"
                  id="imageUpload"
                  name="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={upload}
                />
                {imageUrl && (
                  <img src={imageUrl} alt="Vehicle" className="mt-2 w-32 h-20 object-cover rounded-lg border border-blue-200" />
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-500 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
