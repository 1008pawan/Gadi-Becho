"use client";

import { IconPencilCheck, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageVendor = () => {
  const [loading, setLoading] = useState(false);
  const [vendorList, setvendorList] = useState([]);

  const fetchvendors = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/vendor/getall");
    console.log(res.data);
    setvendorList(res.data);
    setLoading(false);
  };

  const deletevendor = async (vendorId) => {
    const res = await axios.delete(
      `http://localhost:5000/vendor/delete/${vendorId}`
    );
    if (res.status === 200) {
      fetchvendors();
      toast.success("vendor Delete Successfully");
    } else {
      toast.error("Error in Deleting vendor");
    }
  };

  useEffect(() => {
    fetchvendors();
  }, []);

  return (
    <div className="h-screen px-6 py-20 bg-gray-100">
      <h1 className="text-center font-bold text-4xl py-5 text-zinc-800">Manage vendors</h1>
      <div className="container mx-auto bg-zinc-50 lg:overflow-auto overflow-x-scroll rounded-lg shadow-2xl">
        {loading ? (
          <p>Loading...Please Wait....!!</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200  text-zinc-500">
              <tr>
                <th className="py-1">ID</th>
                <th className="py-1">Name</th>
                <th className="py-1">Email</th>
                <th className="py-1">Registered At</th> 
                <th className="py-1">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {vendorList.map((vendor) => {
                return (
                  <tr key={vendor._id} className="hover:bg-zinc-100 border-b border-zinc-300">
                    <td className="p-2">{vendor._id}</td>
                    <td className="p-2">{vendor.name}</td>
                    <td className="p-2">{vendor.email}</td>
                    <td className="p-2">{vendor.createdAt}</td>
                    <td className="p-2">
                      <button
                        className="inline-flex items-center cursor-pointer bg-red-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-red-600 active:bg-red-800"
                        onClick={() => {deletevendor(vendor._id)}}
                      >
                        <IconTrash size={20}/>
                        Delete
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
  );
};

export default ManageVendor;
