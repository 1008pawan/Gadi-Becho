'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short").max(50, "Too Long").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required")
});

const ContactUs = () => {
  const router = useRouter();

  const ContactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      message:""
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:5000/contactUs/add", values)
        .then((result) => {
          toast.success("Message sent! We will get back to you soon.");
          resetForm();
          router.push("/user-signin");
        })
        .catch((err) => {
          toast.error("Please fill in all fields");
          console.log(err);
        });
    },
    validationSchema: ContactSchema,
  });

  return (
    <div className="flex py-20 min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="w-full max-w-2xl bg-white border border-zinc-200 shadow-2xl p-10 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Contact Us</h1>
        <p className="mb-6 text-center text-gray-600">We'd love to hear from you! Fill out the form below and we'll respond as soon as possible.</p>
        <form onSubmit={ContactForm.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={ContactForm.values.name}
              onChange={ContactForm.handleChange}
              className={`w-full p-3 border rounded focus:outline-none ${ContactForm.errors.name && ContactForm.touched.name ? "border-red-400" : "border-zinc-300"}`}
            />
            {ContactForm.errors.name && ContactForm.touched.name && (
              <p className="text-xs text-red-500 mt-1">{ContactForm.errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={ContactForm.values.email}
              onChange={ContactForm.handleChange}
              className={`w-full p-3 border rounded focus:outline-none ${ContactForm.errors.email && ContactForm.touched.email ? "border-red-400" : "border-zinc-300"}`}
            />
            {ContactForm.errors.email && ContactForm.touched.email && (
              <p className="text-xs text-red-500 mt-1">{ContactForm.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message..."
              value={ContactForm.values.message}
              onChange={ContactForm.handleChange}
              rows={5}
              className={`w-full p-3 border rounded focus:outline-none ${ContactForm.errors.message && ContactForm.touched.message ? "border-red-400" : "border-zinc-300"}`}
            />
            {ContactForm.errors.message && ContactForm.touched.message && (
              <p className="text-xs text-red-500 mt-1">{ContactForm.errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 inline-flex justify-center items-center text-white border border-blue-500 bg-blue-500 rounded-3xl hover:bg-blue-600 gap-3 font-bold transition mt-2">
            Send
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <div>Email: <a href="mailto:support@gadibecho.com" className="text-blue-600 hover:underline">support@gadibecho.com</a></div>
          <div>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a></div>
          <div className="mt-2">Address: 123 Business Park, Mumbai, Maharashtra 400001, India</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
