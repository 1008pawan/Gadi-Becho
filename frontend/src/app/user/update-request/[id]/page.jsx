"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateRequest = () => {
  const params = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Extract and clean up the ID from params
  const getCleanId = () => {
    // Next.js can sometimes return an array or add encoding
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    // Remove any non-hexadecimal characters that might be part of URL encoding
    return rawId.replace(/[^0-9a-fA-F]/g, '');
  };

  // Fetch request data
  const fetchRequestData = async () => {
    setLoading(true);
    try {
      const cleanId = getCleanId();
      console.log(`Fetching request with cleaned id: ${cleanId}`);
      
      const res = await axios.get(`http://localhost:5000/request/getbyid/${cleanId}`);
      console.log("Request data:", res.data);
      
      if (res.data) {
        setRequestData(res.data);
        if (res.data.imageUrl) {
          setImageUrl(res.data.imageUrl);
        }
      } else {
        setErrorMsg("No data found for this request");
      }
    } catch (error) {
      console.error("Error fetching request data:", error);
      setErrorMsg(
        error.response?.data?.message || 
        `Error: ${error.response?.status} - ${error.message}`
      );
      toast.error("Failed to fetch request data");
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchRequestData();
    }
  }, [params.id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value
    });
  };

  // Handle image upload
  const upload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "MERN_2:00");
    fd.append("cloud_name", "db6fbsnho");

    setLoading(true);
    axios
      .post("https://api.cloudinary.com/v1_1/db6fbsnho/image/upload", fd)
      .then((result) => {
        toast.success("Image uploaded successfully");
        console.log(result.data);
        setImageUrl(result.data.url);
        setRequestData({
          ...requestData,
          imageUrl: result.data.url
        });
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        toast.error("Failed to upload image");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanId = getCleanId();
      const res = await axios.put(
        `http://localhost:5000/request/update/${cleanId}`,
        requestData
      );
      
      if (res.status === 200) {
        toast.success("Request Updated Successfully");
        router.push("/user/manage-request");
      } else {
        toast.error("Error in Updating Request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error(error.response?.data?.message || "Error in Updating Request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-100 min-h-screen w-full py-10 px-4 flex justify-center items-center">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 w-full border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Update Request</h1>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">Error</p>
            <p>{errorMsg}</p>
            <button 
              onClick={() => router.push("/user/manage-request")} 
              className="mt-2 text-blue-600 hover:underline"
            >
              Return to request list
            </button>
          </div>
        )}
        
        <div>
          {loading && !requestData ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-lg text-gray-600">Loading... Please Wait...</p>
            </div>
          ) : requestData ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={requestData.fullName || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="contactNumber"
                  >
                    Contact Number
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    value={requestData.contactNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter 10-digit contact number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="vehicleLocation"
                >
                  Vehicle Location
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  id="vehicleLocation"
                  name="vehicleLocation"
                  type="text"
                  value={requestData.vehicleLocation || ""}
                  onChange={handleChange}
                  placeholder="Enter vehicle location"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="vehicleDescription"
                >
                  Vehicle Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  id="vehicleDescription"
                  name="vehicleDescription"
                  rows="4"
                  value={requestData.vehicleDescription || ""}
                  onChange={handleChange}
                  placeholder="Enter details about your vehicle (make, model, year, condition, etc.)"
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Upload Image of Vehicle
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={upload}
                  className="p-4 bg-blue-100 rounded-full shadow-md hover:bg-blue-200 transition-colors"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={imageUrl}
                      alt="Vehicle"
                      className="w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Request Status
                </label>
                <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-700">
                  {requestData.status === "pending" ? (
                    <span className="inline-block px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  ) : requestData.status === "approved" ? (
                    <span className="inline-block px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                      Approved
                    </span>
                  ) : requestData.status === "rejected" ? (
                    <span className="inline-block px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-semibold">
                      Rejected
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  )}
                  <p className="mt-2 text-sm text-gray-500">Request Number: {requestData.reqNumber}</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex justify-center items-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Update Request"
                  )}
                </button>
              </div>
            </form>
          ) : errorMsg ? null : (
            <p className="text-center py-10 text-gray-600">No request data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateRequest;
