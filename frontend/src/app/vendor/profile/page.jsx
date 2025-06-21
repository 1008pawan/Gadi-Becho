"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  location: Yup.string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),
});

const Profile = () => {
  const router = useRouter();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchvendorProfile = async () => {
      try {
        const token = localStorage.getItem("vendortoken");
        if (!token) {
          router.push("/vendor-login");
          return;
        }
        const decoded = jwtDecode(token);
        const vendorId = decoded._id;
        const response = await axios.get(
          `http://localhost:5000/vendor/getbyid/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVendor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchvendorProfile();
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const vendorId = decoded._id;

      await axios.put(
        `http://localhost:5000/vendor/update/${vendorId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendor({ ...vendor, ...values });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            vendor Profile
          </h1>
          {isEditing ? (
            <Formik
              initialValues={{
                name: vendor?.name || "",
                email: vendor?.email || "",
                city: vendor?.location || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <Field
                      type="text"
                      name="city"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.location && touched.location && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 px-6 py-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1 text-lg text-gray-900">{vendor?.name}</p>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-lg text-gray-900">{vendor?.email}</p>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="mt-1 text-lg text-gray-900">
                  {vendor?.location || "Unknown"}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
