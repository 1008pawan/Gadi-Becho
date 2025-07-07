'use client';
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from "yup";
import { IconMessage2Star, IconMessageCircleUser } from '@tabler/icons-react';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short").max(50, "Too Long").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required")
});

const Feedback = () => {

  const router = useRouter();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const toggleFeedback = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

    const FeedbackForm = useFormik({
      initialValues: {
        name: "",
        email: "",
        message:""
      },
      onSubmit: (values, { resetForm }) => {
        axios
          .post("http://localhost:5000/feedback/add", values)
          .then((result) => {
            toast.success("Feedback Sending Successfully");
            resetForm();
            router.push("/user-signin");
          })
          .catch((err) => {
            toast.error("Please fill in all fields");
            console.log(err);
          });
      },
      validationSchema: FeedbackSchema,
    });

  return (
    <div>

      {/* Feedback */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 overflow-auto py-13 bg-black/50 flex justify-end">
            <div className="w-full max-w-md rounded-2xl">
              <div className="bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
                <h1 className="text-3xl font-bold text-center mb-2">Feedback</h1>
                <form onSubmit={FeedbackForm.handleSubmit} className="space-y-2">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={FeedbackForm.values.name}
                      onChange={FeedbackForm.handleChange}
                      className={`w-full p-2 border rounded focus:outline-none ${FeedbackForm.errors.name && FeedbackForm.touched.name ? "border-red-400" : "border-zinc-300"}`}
                    />
                    {FeedbackForm.errors.name && FeedbackForm.touched.name && (
                      <p className="text-xs text-red-500 mt-1">{FeedbackForm.errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={FeedbackForm.values.email}
                      onChange={FeedbackForm.handleChange}
                      className={`w-full p-2 border rounded focus:outline-none ${FeedbackForm.errors.email && FeedbackForm.touched.email ? "border-red-400" : "border-zinc-300"}`}
                    />
                    {FeedbackForm.errors.email && FeedbackForm.touched.email && (
                      <p className="text-xs text-red-500 mt-1">{FeedbackForm.errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Type your message..."
                      value={FeedbackForm.values.message}
                      onChange={FeedbackForm.handleChange}
                      rows={4}
                      className={`w-full p-3 border rounded focus:outline-none ${FeedbackForm.errors.message && FeedbackForm.touched.message ? "border-red-400" : "border-zinc-300"}`}
                    />
                    {FeedbackForm.errors.message && FeedbackForm.touched.message && (
                      <p className="text-xs text-red-500 mt-1">{FeedbackForm.errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 inline-flex justify-center items-center text-white border border-blue-500 bg-blue-500 rounded-3xl hover:bg-blue-600 gap-3 font-bold transition mt-2">
                    Send
                  </button>
                </form>
              </div>
            </div>
            {/* Feedback Button */}
            <div className="z-50">
                <button
                onClick={toggleFeedback}
                className="inline-flex items-center justify-end p-2 rounded-md focus:outline-none"
                >
                    <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>

        </div>
      )}

      {/* Feedback Button */}
      <div className="bg-amber-300 rounded-full p-1 fixed bottom-4 right-4 z-40 flex justify-end items-end">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="inline-flex items-center justify-end p-1 rounded-md text-gray-700 cursor-pointer focus:outline-none"
        >
            <IconMessage2Star className='size-8' />
        </button>
      </div>  
    </div>
  );
};

export default Feedback;