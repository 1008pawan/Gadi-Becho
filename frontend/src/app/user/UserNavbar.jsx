'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserNavbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Remove user token from localStorage
    localStorage.removeItem('token');
    // Redirect to user login page
    router.push('/user-signin');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/images/logo1.png"
                alt="Gadi Becho Logo"
                className="h-30 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/user/create-request"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Create Request
            </Link>
            <Link
              href="/user/manage-request"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Manage Requests
            </Link>
            <Link
              href="/user/valuation-calculator"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Valuation Calculator
            </Link>
            <Link
              href="/user/profile"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 border px-4 py-2 rounded-lg transition-colors hover:bg-white hover:text-red-500 border-b-2 cursor-pointer"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/user/create-request"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Create Request
              </Link>
              <Link
                href="/user/manage-request"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Manage Requests
              </Link>
              <Link
                href="/user/valuation-calculator"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Valuation Calculator
              </Link>
              <Link
                href="/user/profile"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default UserNavbar;