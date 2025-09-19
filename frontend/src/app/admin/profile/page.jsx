"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/\w/, "Password must contain a special character"),
});

const Profile = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchadminProfile = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        console.log(token);

        if (!token) {
          router.push("/admin-login");
          return;
        }

        const decoded = jwtDecode(token);
        if (!decoded._id) {
          localStorage.removeItem("admintoken");
          router.push("/admin-login");
          return;
        }
        const adminId = decoded._id;
        try {
          const response = await axios.get(
            `http://localhost:5000/admin/getbyid/${adminId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              validateStatus: function (status) {
                return status >= 200 && status < 300;
              },
            }
          );

          if (response.data && typeof response.data === "object") {
            setAdmin(response.data);
          } else {
            console.error("Invalid response format");
            localStorage.removeItem("admintoken");
            router.push("/admin-login");
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
          if (apiError.response?.status === 401) {
            localStorage.removeItem("admintoken");
            router.push("/admin-login");
          }
        } finally {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchadminProfile();
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("admintoken");
      const decoded = jwtDecode(token);
      const adminId = decoded._id;

      await axios.put(`http://localhost:5000/admin/update/${adminId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmin({ ...admin, ...values });
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
            Admin Profile
          </h1>
          {isEditing ? (
            <Formik
              initialValues={{
                email: admin?.email || "",
                password: admin?.password || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm px-2 font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm px-2 font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      type="text"
                      name="password"
                      autoComplete="new-password"
                      className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
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
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-lg text-gray-900">{admin?.email}</p>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Password</p>
                <p className="mt-1 text-lg text-gray-900">{admin?.password}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
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
