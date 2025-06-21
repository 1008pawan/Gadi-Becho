"use client";

import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageFeedback = () => {

    const [loading, setLoading] = useState(false);
    const [FeedbackList, setFeedbackList] = useState([]);

    const fetchFeedbacks = async () => {
      setLoading(true);
      const responce = await axios.get("http://localhost:5000/feedback/getall");
      console.log(responce.data);
      setFeedbackList(responce.data);
      setLoading(false);
      
    };

    const deleteFeedback = async (FeedbackId) => {
      const responce = await axios.delete(
        `http://localhost:5000/feedback/delete/${FeedbackId}`
      );
      if (responce.status === 200) {
        fetchFeedbacks();
        toast.success('Feedback Delete Successfully');
      } else {
        toast.error('Error in Deleting Feedback');
      }
    };

    useEffect(() => {
      fetchFeedbacks();
    }, []);

    

  return (
    <div className=''>
      <div className='bg-zinc-100 h-screen px-6 py-20'>
          <h1 className='text-5xl font-bold pb-15 text-center'>Manage Feedback</h1>
          <div className='container mx-auto bg-zinc-50 lg:overflow-auto overflow-x-scroll'>
          {loading ? (
            <p>Loading...Please Wait...</p>
          ) : (
            <table className='w-full shadow-2xl bg-zinc-50'>
              <thead className='border-black bg-zinc-200 text-zinc-600 font-bold text-center'>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Message</td>
                  <td>Button</td>
                </tr>
              </thead>
              <tbody className='text-center text-zinc-700'>
                {FeedbackList.map((Feedback) => {
                  return (
                    <tr key = {Feedback._id}>
                      <td className='p-2'>{Feedback._id}</td>
                      <td className='p-2'>{Feedback.name}</td>
                      <td className='p-2'>{Feedback.email}</td>
                      <td className='p-2'>{Feedback.message}</td>
                      <td className='p-2'>
                        <button className='inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-lg border hover:bg-red-600 active:bg-red-800 ml-2' onClick={() => {deleteFeedback(Feedback._id)}}>
                          <IconTrash size={20} />
                          Remove
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

export default ManageFeedback;