'use client';
import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo1.png"
                alt="Gadi Becho Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              India's #1 Car Scrapping Platform. Get the best price for your scrap car with our hassle-free, transparent process.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="text-gray-300 hover:text-blue-500 transition-colors">
                <IconBrandFacebook className="size-6" />
              </a>
              <a href="https://x.com/twitter?lang=en" className="text-gray-300 hover:text-blue-500 transition-colors">
                <IconBrandTwitter className="size-6" />
              </a>
              <a href="https://www.instagram.com/" className="text-gray-300 hover:text-blue-500 transition-colors">
                <IconBrandInstagram className="size-6" />
              </a>
              <a href="https://www.youtube.com/" className="text-gray-300 hover:text-blue-500 transition-colors">
                <IconBrandYoutube className="size-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/Terms-of-Services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-300 hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/Privacy-Policy" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/user/create-request" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Car Scrapping
                </Link>
              </li>
              <li>
                <Link href="/user/valuation-calculator" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Vehicle Valuation
                </Link>
              </li>
              <li>
                <Link href="/Privacy-Policy" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <IconMapPin className="size-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Scrapping Hub, Automotive District<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center">
                <IconPhone className="size-5 mr-3 text-green-400" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-green-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <IconMail className="size-5 mr-3 text-green-400" />
                <a href="mailto:info@gadibecho.com" className="text-gray-300 hover:text-green-400 transition-colors">
                  info@gadibecho.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between text-center md:text-left">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Gadi Becho. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
