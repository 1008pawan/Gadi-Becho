'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const VendorNavbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Remove vendor token from localStorage
        localStorage.removeItem('vendortoken');
        // Redirect to vendor login page
        router.push('/vendor-login');
    };

  return (
    <div className="bg-white shadow-md">
      <nav className="flex justify-between items-center px-10 h-16 text-zinc-700">
        <div>
          <Link href="/">
            <img
              src="/images/logo1.png"
              alt="Company Logo"
              className="h-14"
            />
          </Link>
        </div>
        
        <ul className="flex items-center gap-8">
          <li>
            <Link 
              href="/vendor/dashboard"
              className="hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/vendor/scrap-request" 
              className="hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              New Requests
            </Link>
          </li>
          <li>
            <Link 
              href="/vendor/manageScrap-request"
              className="hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Manage Requests
            </Link>
          </li>
          <li>
            <Link 
              href="/vendor/payment"
              className="hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Payments
            </Link>
          </li>
          <li>
            <Link 
              href="/vendor/profile"
              className="hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Profile
            </Link>
          </li>
        </ul>

        <div>
          <button
            className="text-white bg-blue-500 border px-5 py-2 rounded-lg transition-colors hover:bg-white hover:text-blue-500 border-b-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default VendorNavbar
