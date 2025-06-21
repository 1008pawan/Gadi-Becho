"use client";

import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const [loading, setLoading] = useState(false);
  const [RequestList, setRequestList] = useState([]);

  const fetchRequests = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/request/getall");
    // console.log(response.data);
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

  useEffect(() => {
    fetchRequests();
  }, []);


  return (
    <div className="">
      <div className="bg-zinc-100 h-screen px-5 py-20">
        <h1 className="text-4xl font-bold py-5 text-center">Manage Request</h1>
        <div className="container mx-auto rounded-2xl bg-blue-100">
          {loading ? (
            <p>Loading...Please Wait...</p>
          ) : (
            <table className="w-full shadow-2xl rounded-2xl bg-zinc-50">
              <thead className=" border-black bg-zinc-100 text-zinc-500 font-bold text-center">
                <tr>
                  <td>ID</td>
                  <td>Status</td>
                  <td>Full Name</td>
                  <td>Contact Number</td>
                  <td>Registration Number </td>
                  <td>Location & Description</td>
                  <td>Button</td>
                </tr>
              </thead>
              <tbody className="text-center text-zinc-700">
                {RequestList.map((request) => {
                  return (
                    <tr key={request._id}>
                      <td className="p-2">{request._id}</td>
                      <td className="p-2">{request._Status}</td>
                      <td className="p-2">{request.fullName}</td>
                      <td className="p-2">{request.contactNumber}</td>
                      <td className="p-2">{request.reqNumber}</td>
                      <td className='p-2'>
                      <p>
                        <span className='font-medium'>Location:</span>
                        {request.vehicleLocation}
                      </p>
                      <p>{request.vehicleDescription}</p>
                      </td>
                      <td className="p-2">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg border hover:bg-red-600 active:bg-red-800 ml-2"
                          onClick={() => {
                            deleteRequest(request._id);
                          }}
                        >
                          <IconTrash size={25} />
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
