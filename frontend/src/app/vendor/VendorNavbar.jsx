"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VendorNavbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Remove vendor token from localStorage
    localStorage.removeItem("token");
    // Redirect to vendor login page
    router.push("/vendor-login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link href="/">
              <img
                src="/images/logo1.png"
                alt="Company Logo"
                className="h-30 md:h-14"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8">
            <li>
              <Link
                href="/vendor/dashboard"
                className="text-gray-700 hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/vendor/scrap-request"
                className="text-gray-700 hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
              >
                New Requests
              </Link>
            </li>
            <li>
              <Link
                href="/vendor/manageScrap-request"
                className="text-gray-700 hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
              >
                Manage Requests
              </Link>
            </li>
            <li>
              <Link
                href="/vendor/payment"
                className="text-gray-700 hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
              >
                Payments
              </Link>
            </li>
            <li>
              <Link
                href="/vendor/profile"
                className="text-gray-700 hover:text-blue-500 transition-colors hover:border-b-2 hover:border-blue-500"
              >
                Profile
              </Link>
            </li>
          </ul>

          {/* Desktop Logout Button */}
          <div className="hidden md:block">
            <button
              className="text-white border bg-red-500 border-b-2 px-4 py-2 rounded-lg transition-colors hover:bg-white hover:text-red-500 border-red-500 cursor-pointer"
              onClick={handleLogout}
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
                href="/vendor/dashboard"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/vendor/scrap-request"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                New Requests
              </Link>
              <Link
                href="/vendor/manageScrap-request"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Manage Requests
              </Link>
              <Link
                href="/vendor/payment"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Payments
              </Link>
              <Link
                href="/vendor/profile"
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

export default VendorNavbar