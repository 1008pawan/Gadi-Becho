"use client";

import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageContact = () => {

    const [loading, setLoading] = useState(false);
    const [ContactList, setContactList] = useState([]);

    const fetchContacts = async () => {
      setLoading(true);
      try {
        const responce = await axios.get("http://localhost:5000/contactUs/getall");
        console.log(responce.data);
        setContactList(responce.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    const deleteContact = async (ContactId) => {
      try {
        const responce = await axios.delete(
          `http://localhost:5000/contactUs/delete/${ContactId}`
        );
        if (responce.status === 200) {
          fetchContacts();
          toast.success('Contact Delete Successfully');
        } else {
          toast.error('Error in Deleting Contact');
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      }
    };

    useEffect(() => {
      fetchContacts();
    }, []);

    

  return (
    <div className=''>
      <div className='bg-zinc-100 h-screen px-6 py-20'>
          <h1 className='text-5xl font-bold pb-15 text-center'>Manage Contact</h1>
          <div className='container mx-auto bg-zinc-50 lg:overflow-auto overflow-x-scroll rounded-lg shadow-2xl'>
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
                {ContactList.map((Contact) => {
                  return (
                    <tr key = {Contact._id}>
                      <td className='p-2'>{Contact._id}</td>
                      <td className='p-2'>{Contact.name}</td>
                      <td className='p-2'>{Contact.email}</td>
                      <td className='p-2'>{Contact.message}</td>
                      <td className='p-2'>
                        <button className='inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-lg border hover:bg-red-600 active:bg-red-800 ml-2' onClick={() => {deleteContact(Contact._id)}}>
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

export default ManageContact;