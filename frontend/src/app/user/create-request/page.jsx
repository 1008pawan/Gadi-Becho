'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRequest() {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    vendorId: '',
    vehicleLocation: '',
    vehicleDescription: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/user-signin');
      return;
    }

    // Decode JWT to get user data
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const userData = JSON.parse(window.atob(base64));
      setUser(userData);
    } catch (err) {
      console.error('Error parsing token:', err);
      localStorage.removeItem('token');
      router.push('/user-signin');
    }

    // Fetch available vendors
    fetchVendors();
  }, [router]);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5000/vendor/getall');
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      } else {
        console.error('Failed to fetch vendors');
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateRequestNumber = () => {
    // Generate a unique request number using timestamp and random string
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REQ-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user || !user._id) {
      setError('User authentication error. Please login again.');
      setLoading(false);
      return;
    }

    if (!formData.vendorId) {
      setError('Please select a vendor.');
      setLoading(false);
      return;
    }

    try {
      const reqData = {
        ...formData,
        userId: user._id,
        reqNumber: generateRequestNumber(),
        status: 'pending',
      };

      const response = await fetch('http://localhost:5000/request/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });

      if (response.ok) {
        setSuccess('Request created successfully!');
        setFormData({
          fullName: '',
          contactNumber: '',
          vendorId: '',
          vehicleLocation: '',
          vehicleDescription: '',
        });
        
        // Redirect to manage requests page after short delay
        setTimeout(() => {
          router.push('/user/manage-request');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create request. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error creating request:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='bg-gradient-to-b from-blue-200 to-blue-100 min-h-screen w-full py-10 px-4 flex justify-center items-center'>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 w-full border border-blue-100">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Create Request</h1>
          <p className="text-gray-500">Fill in the details to submit your scrap vehicle request</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                id="contactNumber"
                name="contactNumber"
                type="tel"
                pattern="[0-9]{10}"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit contact number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="vehicleLocation">
              Vehicle Location
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              id="vehicleLocation"
              name="vehicleLocation"
              type="text"
              value={formData.vehicleLocation}
              onChange={handleChange}
              placeholder="Enter vehicle location"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="vendorId">
              Select Vendor
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              id="vendorId"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Vendor --</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name} - {vendor.location}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="vehicleDescription">
              Vehicle Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              id="vehicleDescription"
              name="vehicleDescription"
              rows="4"
              value={formData.vehicleDescription}
              onChange={handleChange}
              placeholder="Enter details about your vehicle (make, model, year, condition, etc.)"
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex justify-center items-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
