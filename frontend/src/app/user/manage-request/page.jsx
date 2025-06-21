"use client";

import { IconPencilCheck, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const [loading, setLoading] = useState(false);
  const [RequestList, setRequestList] = useState([]);

  const fetchRequests = async () => {
    setLoading(true);
    const responce = await axios.get("http://localhost:5000/request/getall");
    console.log(responce.data);
    setRequestList(responce.data);
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

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="w-[95%] mx-auto ">
      <div className="bg-zinc-100 h-screen py-20">
        <h1 className="text-5xl font-bold pb-15 text-center">Manage Request</h1>
        <div className="container mx-auto bg-zinc-50 lg:overflow-auto overflow-x-scroll">
          {loading ? (
            <p>Loading...Please Wait...</p>
          ) : (
            <table className="w-full shadow-2xl bg-zinc-50">
              <thead className="border-black bg-zinc-100 text-zinc-600 font-bold text-center">
                <tr>
                  <td>ID</td>
                  <td>Status</td>
                  <td>Full Name</td>
                  <td>Contact</td>
                  <td>Registration Number </td>
                  <td>
                    <p>Location & Description</p>
                  </td>
                  <td>Button</td>
                </tr>
              </thead>
              <tbody className="text-center text-zinc-700">
                {RequestList.map((request) => {
                  return (
                    <tr key={request._id}>
                      <td className="p-2">{request._id}</td>
                      <td className="p-2 whitespace-nowrap">
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
                      <td className="p-2">{request.fullName}</td>
                      <td className="p-2">{request.contactNumber}</td>
                      <td className="p-2">{request.reqNumber}</td>
                      <td className="p-2">
                        <p>
                          <span className="font-medium">Location:</span>
                          {request.vehicleLocation}
                        </p>
                        <p>{request.vehicleDescription}</p>
                      </td>
                      <td className="p-2">
                        <button className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border hover:bg-green-600 active:bg-green-800">
                          <Link href={`/update-request/${request._id}`}>
                            <IconPencilCheck size={20} />
                          </Link>
                          Update
                        </button>
                        <button
                          className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-lg border hover:bg-red-600 active:bg-red-800 ml-2"
                          onClick={() => {
                            deleteRequest(request._id);
                          }}
                        >
                          <IconTrash size={20} />
                          Remove
                        </button>
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
