"use client";

import { IconPencilCheck, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ScrapRequest = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem("vendortoken");
      if (!token) {
        router.push("/vendor-login");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/request/update/${requestId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchRequests();
        toast.success(`Request ${newStatus} successfully`);
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Error updating request status");
    }
  };
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("vendortoken");
      if (!token) {
        router.push("/vendor-login");
        return;
      }

      const response = await axios.get("http://localhost:5000/request/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequestList(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };
  const deleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("vendortoken");
      if (!token) {
        router.push("/vendor-login");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/request/delete/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchRequests();
        toast.success("Request deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Error in deleting request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [router]);

  return (
    <div className="">
      <div className="bg-gray-100 min-h-screen py-20">
        <h1 className="text-4xl font-bold py-5 text-center text-gray-800">
          Scrap Requests
        </h1>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : requestList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No scrap requests found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location & Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {requestList.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.reqNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {request.status || "pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.contactNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                          <p>
                            <span className="font-medium">Location:</span>  
                            {request.vehicleLocation}
                          </p>
                          <p className="text-xs mt-1">
                            {request.vehicleDescription}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                request._id,
                                request.status === "pending"
                                  ? "approved"
                                  : "pending"
                              )
                            }
                            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white 
                                ${
                                  request.status === "pending"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-yellow-600 hover:bg-yellow-700"
                                }
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          >
                            <IconPencilCheck size={16} className="mr-1" />
                            {request.status === "pending"
                              ? "Approve"
                              : "Mark Pending"}
                          </button>
                          <button
                            onClick={() => deleteRequest(request._id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <IconTrash size={16} className="mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapRequest;
