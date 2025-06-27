"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Payments = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [amount, setAmount] = useState(0);

  // Replace this with your actual Razorpay key
  const razorpayKey = "rzp_test_4tPn03R4cSHdgh";

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vendortoken');
      
      if (!token) {
        router.push('/vendor-login');
        return;
      }

      const response = await axios.get('http://localhost:5000/request/getall', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Filter only approved requests
      const pendingPayments = response.data.filter(req => 
        req.status === 'approved' && !req.paymentCompleted
      );
      
      setRequests(pendingPayments);
    } catch (error) {
      console.error('Error fetching payment requests:', error);
      toast.error('Failed to load payment requests');
    } finally {
      setLoading(false);
    }
  };

  const selectRequest = (request) => {
    setSelectedRequest(request);
    setAmount(request.amount || 0);
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handlePayment = async () => {
    if (!selectedRequest) {
      toast.error('Please select a request first');
      return;
    }

    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const token = localStorage.getItem('vendortoken');
      
      // Create order on the backend
      const orderResponse = await axios.post('http://localhost:5000/vendor/payment/create-order', {
        requestId: selectedRequest._id,
        amount: amount,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { orderId } = orderResponse.data;
      
      // Get vendor details from token
      let vendorName = '';
      let vendorEmail = '';
      
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(window.atob(base64));
        vendorName = decodedToken.name || '';
        vendorEmail = decodedToken.email || '';
      } catch (err) {
        console.error('Error parsing token', err);
      }

      const options = {
        key: razorpayKey,
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: "Gadi Becho",
        description: `Payment for scrap vehicle #${selectedRequest.reqNumber}`,
        order_id: orderId,
        handler: function(response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: vendorName,
          email: vendorEmail
        },
        notes: {
          requestId: selectedRequest._id
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const token = localStorage.getItem('vendortoken');
      
      // Verify payment on backend
      await axios.post('http://localhost:5000/vendor/payment/verify', {
        requestId: selectedRequest._id,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount: amount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Payment successful!');
      setSelectedRequest(null);
      setAmount(0);
      fetchPendingPayments();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment processing failed');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Vendor Payments</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
                <h2 className="text-xl font-semibold">Payment Requests</h2>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No pending payment requests found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requests.map((request) => (
                        <tr 
                          key={request._id} 
                          className={`hover:bg-gray-50 ${selectedRequest?._id === request._id ? 'bg-blue-50' : ''}`}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.reqNumber}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.fullName}</div>
                            <div className="text-sm text-gray-500">{request.contactNumber}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            <div>{request.vehicleDescription}</div>
                            <div className="text-xs mt-1">Location: {request.vehicleLocation}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button
                              onClick={() => selectRequest(request)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Payment Processing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow h-full">
              <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg">
                <h2 className="text-xl font-semibold">Process Payment</h2>
              </div>
              
              <div className="p-4">
                {!selectedRequest ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Select a request to process payment</p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h3 className="font-medium text-blue-800 mb-2">Selected Request</h3>
                      <p className="text-sm mb-1"><span className="font-medium">ID:</span> {selectedRequest.reqNumber}</p>
                      <p className="text-sm mb-1"><span className="font-medium">Customer:</span> {selectedRequest.fullName}</p>
                      <p className="text-sm"><span className="font-medium">Vehicle:</span> {selectedRequest.vehicleDescription}</p>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Amount (₹)
                      </label>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                    
                    <button
                      onClick={handlePayment}
                      disabled={amount <= 0}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Pay ₹{amount}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments; 