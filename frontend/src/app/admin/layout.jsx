"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from './AdminNavbar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {
  const router = useRouter();

  // Check for admin authentication
useEffect(() => {
  const admin = localStorage.getItem('admintoken');
  // if (!admin) {
  //   router.push('/admin-login');
  // }
}, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}