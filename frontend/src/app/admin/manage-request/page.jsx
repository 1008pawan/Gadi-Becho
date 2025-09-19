"use client";

import { IconTrash, IconCash, IconCalendar } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const [loading, setLoading] = useState(false);
  const [RequestList, setRequestList] = useState([]);

  const fetchRequests = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/request/getall");
    console.log("Fetched requests:", response.data);
    setRequestList(response.data);
    setLoading(false);
  };

  const deleteRequest = async (requestId) => {
    const responce = await axios.delete(
      `http://localhost:5000/request/delete/${requestId}`
    );
    if (responce.status === 200) {
      fetchRequests();
      toast.success("Request Delete Successfully");
    } else {
      toast.error("Error in Deleting Request");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.pending}`}>
        {status}
      </span>
    );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="">
      <div className="bg-zinc-100 min-h-screen px-5 py-20">
        <h1 className="text-4xl font-bold py-5 text-center">Manage Request</h1>
        <div className="container mx-auto bg-zinc-50 lg:overflow-auto overflow-x-scroll rounded-lg shadow-2xl">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="w-full bg-zinc-50">
              <thead className="border-black bg-zinc-200 text-zinc-500 font-bold text-center">
                <tr>
                  <td className="py-3 px-2">ID</td>
                  <td className="py-3 px-2">Status</td>
                  <td className="py-3 px-2">Full Name</td>
                  <td className="py-3 px-2">Contact Number</td>
                  <td className="py-3 px-2">Registration Number</td>
                  <td className="py-3 px-2">Location & Description</td>
                  <td className="py-3 px-2">Payment Details</td>
                  <td className="py-3 px-2">Actions</td>
                </tr>
              </thead>
              <tbody className="text-center text-zinc-700">
                {RequestList.map((request) => {
                  return (
                    <tr key={request._id} className="hover:bg-gray-100 border-b border-zinc-300">
                      <td className="p-3 text-xs">{request._id}</td>
                      <td className="p-3">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="p-3">{request.fullName}</td>
                      <td className="p-3">{request.contactNumber}</td>
                      <td className="p-3">{request.reqNumber}</td>
                      <td className='p-3 text-left'>
                        <p className="mb-1">
                          <span className='font-medium'>Location:</span>
                          {request.vehicleLocation}
                        </p>
                        <p className="text-sm text-gray-600">{request.vehicleDescription}</p>
                      </td>
                      <td className="p-3">
                        {request.paymentCompleted ? (
                          <div className="text-left">
                            <div className="flex items-center gap-1 text-green-600 font-medium mb-1">
                              <IconCash size={16} />
                              ₹{request.amount?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <IconCalendar size={14} />
                              {formatDate(request.paymentDate)}
                            </div>
                            {request.paymentId && (
                              <div className="text-xs text-gray-500 mt-1">
                                ID: {request.paymentId.slice(-8)}
                              </div>
                            )}
                          </div>
                        ) : request.status === 'completed' ? (
                          <div className="text-left">
                            <div className="flex items-center gap-1 text-blue-600 font-medium">
                              <IconCash size={16} />
                              ₹{request.amount?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">Payment pending</div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">No payment</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {/* Delete button */}
                          <button
                            className="bg-red-600 cursor-pointer text-white px-3 flex items-center gap-2 py-2 rounded-lg border hover:bg-red-700 active:bg-red-800"
                            onClick={() => {
                              deleteRequest(request._id);
                            }}
                          >
                            <IconTrash size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
