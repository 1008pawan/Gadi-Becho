"use client";

import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);

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

      // Filter only approved requests
      const approvedRequests = response.data.filter(
        (req) => req.status === "approved"
      );
      setRequestList(approvedRequests);
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
    <div>
      <div className="bg-gray-100 min-h-screen py-20">
        <h1 className="text-4xl font-bold py-5 text-center text-gray-800">
          Approved Requests
        </h1>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : requestList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No approved requests found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-center">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Details
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle Details
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {request.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.vehicleLocation}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.contactNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                          <p className="text-xs">
                            {request.vehicleDescription}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteRequest(request._id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <IconTrash size={16} className="mr-1" />
                            Remove
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

export default ManageRequest;
