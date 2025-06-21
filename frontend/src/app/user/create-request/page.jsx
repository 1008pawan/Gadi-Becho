"use client";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const requestSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Full Name is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  reqNumber: Yup.string().required("Registration Number is required"),
  vehicleLocation: Yup.string().required("Vehicle Location is required"),
  vehicleDescription: Yup.string()
    .min(10, "Description too short")
    .required("Vehicle Description is required"),
});

const CreateRequest = () => {
  const createRequestForm = useFormik({
    initialValues: {
      fullName: "",
      contactNumber: "",
      reqNumber: "",
      vehicleLocation: "",
      vehicleDescription: "", // fixed typo here
    },
    validationSchema: requestSchema,
    onSubmit: async (values, { resetForm }) => {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      // Decode the token to get user ID
      let userId = "";
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        userId = decodedToken._id;
      } catch (err) {
        toast.error("Invalid token. Please login again.");
        return;
      }

      // Add userId to the request data
      const requestData = {
        ...values,
        userId: userId,
      };

      try {
        await axios.post("http://localhost:5000/request/add", requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Request Created Successfully");
        resetForm();
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Request Creation Failed"
        );
        console.log(err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="xl:w-[40%] lg:w-[46%] md:w-[60%] sm:w-[80%] w-[90%] my-10 border border-zinc-300 shadow-2xl p-8 rounded-2xl bg-white">
        <h1 className="text-5xl font-bold text-center py-2 text-blue-500">
          Great!!
        </h1>
        <h2 className="font-bold md:text-2xl text-xl text-center text-blue-500">
          We found buyers for you, we just need some information.
        </h2>
        <p className="text-sm text-center py-2">
          We handle everything from towing and dismantling to providing a
          certificate of recycling for you. Simply fill out the form and we'll
          be in touch with you shortly.
        </p>
        <div className="my-3">
          <form
            className="flex flex-col gap-4"
            onSubmit={createRequestForm.handleSubmit}
          >
            {/* full Name */}
            <div className="flex items-center justify-center">
              <label htmlFor="fullName" className="relative w-full">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your Full Name..."
                  onChange={createRequestForm.handleChange}
                  onBlur={createRequestForm.handleBlur}
                  value={createRequestForm.values.fullName}
                  className="text-zinc-600 outline-none border border-zinc-400 rounded-sm w-full p-3"
                />
              </label>
            </div>
            {createRequestForm.errors.fullName &&
              createRequestForm.touched.fullName && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {createRequestForm.errors.fullName}
                </p>
              )}

            {/* contact Number */}
            <div className="flex items-center justify-center">
              <label htmlFor="contactNumber" className="relative w-full">
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter your Contact Number..."
                  onChange={createRequestForm.handleChange}
                  onBlur={createRequestForm.handleBlur}
                  value={createRequestForm.values.contactNumber}
                  className="text-zinc-600 outline-none border border-zinc-400 rounded-sm w-full p-3"
                />
              </label>
            </div>
            {createRequestForm.errors.contactNumber &&
              createRequestForm.touched.contactNumber && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {createRequestForm.errors.contactNumber}
                </p>
              )}

            {/* reqNumber */}
            <div className="flex items-center justify-center">
              <label htmlFor="reqNumber" className="relative w-full">
                <input
                  type="text"
                  id="reqNumber"
                  name="reqNumber"
                  placeholder="Enter your Vehicle Registration Number..."
                  onChange={createRequestForm.handleChange}
                  onBlur={createRequestForm.handleBlur}
                  value={createRequestForm.values.reqNumber}
                  className="text-zinc-600 outline-none border border-zinc-400 rounded-sm w-full p-3"
                />
              </label>
            </div>
            {createRequestForm.errors.reqNumber &&
              createRequestForm.touched.reqNumber && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {createRequestForm.errors.reqNumber}
                </p>
              )}

            {/* vehicle Location */}
            <div className="flex items-center justify-center">
              <label htmlFor="vehicleLocation" className="relative w-full">
                <input
                  type="text"
                  id="vehicleLocation"
                  name="vehicleLocation"
                  placeholder="Enter your Vehicle Location..."
                  onChange={createRequestForm.handleChange}
                  onBlur={createRequestForm.handleBlur}
                  value={createRequestForm.values.vehicleLocation}
                  className="text-zinc-600 outline-none border border-zinc-400 rounded-sm w-full p-3"
                />
              </label>
            </div>
            {createRequestForm.errors.vehicleLocation &&
              createRequestForm.touched.vehicleLocation && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {createRequestForm.errors.vehicleLocation}
                </p>
              )}

            {/* vehicle Description */}
            <div className="flex items-center justify-center">
              <label htmlFor="vehicleDescription" className="relative w-full">
                <textarea
                  id="vehicleDescription"
                  name="vehicleDescription"
                  placeholder="Enter your Vehicle Description..."
                  onChange={createRequestForm.handleChange}
                  onBlur={createRequestForm.handleBlur}
                  value={createRequestForm.values.vehicleDescription}
                  className="text-zinc-600 outline-none border border-zinc-400 rounded-sm w-full p-3"
                  rows={4}
                />
              </label>
            </div>
            {createRequestForm.errors.vehicleDescription &&
              createRequestForm.touched.vehicleDescription && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {createRequestForm.errors.vehicleDescription}
                </p>
              )}

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-8 py-2 rounded-lg"
                disabled={createRequestForm.isSubmitting}
              >
                {createRequestForm.isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;