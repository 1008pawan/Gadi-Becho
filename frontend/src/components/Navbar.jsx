'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Home
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              About
            </Link>
            <Link 
              href="/contact-us"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:border-b-2 hover:border-blue-500"
            >
              Contact Us
            </Link>
            
            {/* User Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/user-signin"
                className="text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-500 hover:text-white border-b-2"
              >
                User Login
              </Link>
            </div>

            {/* Vendor Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/vendor-login"
                className="text-orange-500 hover:text-white px-4 py-2 rounded-lg border border-orange-500 hover:bg-orange-500 border-b-2"
              >
                Vendor Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact Us
            </Link>

            {/* Mobile User Links */}
            <div className="pb-2">
              <Link
                href="/user-signin"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                User Login
              </Link>
            </div>

            {/* Mobile Vendor Links */}
            <div className=" pb-2">
              <Link
                href="/vendor-login"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Vendor Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;