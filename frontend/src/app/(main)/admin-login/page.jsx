'use client'

import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const adminLogin = () => {

  const router = useRouter();

  const adminForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      // console.log(values);

      axios
      .post("http://localhost:5000/admin/authenticate", values)
      .then((result) => {
        toast.success("Login Successful");
        localStorage.setItem("admintoken", result.data.token);
        router.push("/admin/profile");
      }).catch((err) => {
        toast.error("admin failed");
        console.log(err);
      });
      
    },
  });

  return (
        <div>
      <div className="w-[35%] mx-auto my-10 border border-zinc-300 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-5xl font-bold text-center py-8">Admin Login</h1>
        <form onSubmit={adminForm.handleSubmit}>
          <div>
            <label htmlFor="email" className="">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              onChange={adminForm.handleChange}
              value={adminForm.values.email}
              className="text-zinc-600 outline-none border border-zinc-300 rounded-sm w-full p-3 "
            />
          </div>
          <div className="mt-3">
            <div className="flex justify-between">
              <label htmlFor="password" className="">
                Password
              </label>
              <a
                href="./forgot"
                className="text-blue-500 hover:underline font-bold"
              >
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              onChange={adminForm.handleChange}
              value={adminForm.values.password}
              className="text-zinc-600 outline-none border border-zinc-300 rounded-sm w-full p-3 "
            />
          </div>
          <button className="w-full py-3 inline-flex justify-center items-center border border-blue-500 bg-blue-300 rounded-3xl hover:bg-blue-500 gap-3 hover:text-white font-bold mt-4 cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default adminLogin