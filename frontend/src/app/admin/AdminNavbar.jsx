"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconDashboard,
  IconUsers,
  IconTruck,
  IconFileDescription,
  IconUser,
  IconLogout
} from '@tabler/icons-react';
import { Contact } from 'lucide-react';

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: IconDashboard
    },
    {
      label: 'Manage Users',
      href: '/admin/manage-user',
      icon: IconUsers
    },
    {
      label: 'Manage Vendors',
      href: '/admin/manage-vendor',
      icon: IconTruck
    },
    {
      label: 'Manage Requests',
      href: '/admin/manage-request',
      icon: IconFileDescription
    },
    {
      label: 'Manage Feedback',
      href: '/admin/manage-feedback',
      icon: IconFileDescription
    },
    {
      label: 'Manage Contact',
      href: '/admin/manage-contact',
      icon: Contact
    },
    {
      label: 'Profile',
      href: '/admin/profile',
      icon: IconUser
    }
  ];

  const handleLogout = () => {
    // Remove admin token from localStorage
    localStorage.removeItem('admintoken');
    // Redirect to admin login page
    router.push('/admin-login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-1 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-1.5" />
                  {item.label}
                </Link>
              );
            })}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 ease-in-out"
            >
              <IconLogout className="w-5 h-5 mr-1.5" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-1.5" />
                {item.label}
              </Link>
            );
          })}
          
          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-100"
          >
            <IconLogout className="w-5 h-5 mr-1.5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;