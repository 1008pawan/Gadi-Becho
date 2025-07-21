"use client";
import Navebar from "@/components/Navbar";
import {
  IconCalculator,
  IconCar,
  IconCashBanknote,
  IconPhone,
  IconTruck,
  IconUpload,
  IconUser,
  IconShield,
  IconClock,
  IconAward,
  IconCheck,
  IconStar,
  IconArrowRight,
  IconPlay,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DivMarque from "@/components/DivMarque";
import FAQs from "./(main)/faqs/page";

const page = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navebar />

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <IconCar className="w-4 h-4" />
                <span>India's #1 Car Scrapping Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Turn Your Old Car</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Into Instant Cash
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Get the best price for your scrap car with our hassle-free, 
                transparent process. Upload details, get instant quote, and 
                receive payment within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/user-signup">
                  <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                    <IconUser className="w-5 h-5" />
                    Get Started Now
                    <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="tel:+919876543210">
                  <button className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 border-2 border-gray-200 hover:border-blue-300">
                    <IconPhone className="w-5 h-5" />
                    Call Now
                  </button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <IconShield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">100% Legal</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconClock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">24hr Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconAward className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-600">Best Price</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
              <div className="relative">
                <img 
                  src="/images/img2.png" 
                  alt="Car scrapping illustration" 
                  className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <IconCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Instant Quote</p>
                      <p className="text-sm text-gray-500">Within minutes</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconCashBanknote className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">₹50L+ Paid</p>
                      <p className="text-sm text-gray-500">To customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Cars Scrapped", icon: IconCar },
              { number: "₹50L+", label: "Paid to Customers", icon: IconCashBanknote },
              { number: "24hrs", label: "Average Processing", icon: IconClock },
              { number: "4.8★", label: "Customer Rating", icon: IconStar }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Gadi Becho Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get cash for your car in 4 simple steps. Our streamlined process 
              makes car scrapping hassle-free and profitable.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              {
                icon: IconUpload,
                title: "Upload Details",
                description: "Share your car details, photos, and documents through our easy form",
                color: "green",
                step: "01"
              },
              {
                icon: IconCalculator,
                title: "Get Instant Quote",
                description: "Receive competitive quote within minutes based on current market rates",
                color: "blue",
                step: "02"
              },
              {
                icon: IconTruck,
                title: "Free Pickup",
                description: "Our team picks up your car from your location at your convenience",
                color: "orange",
                step: "03"
              },
              {
                icon: IconCashBanknote,
                title: "Get Paid",
                description: "Receive instant payment after final inspection and paperwork",
                color: "purple",
                step: "04"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center group-hover:bg-${step.color}-200 transition-colors`}>
                      <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Gadi Becho?
            </h2>
            <p className="text-xl text-gray-600">
              India's most trusted car scrapping platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: IconShield,
                title: "100% Legal Process",
                description: "All procedures follow government regulations with proper documentation"
              },
              {
                icon: IconClock,
                title: "24-Hour Payment",
                description: "Receive your payment within 24 hours after vehicle pickup"
              },
              {
                icon: IconAward,
                title: "Best Market Price",
                description: "Get competitive quotes based on current market rates"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <DivMarque />
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Scrap Your Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant quote now and turn your old car into cash today! 
            Free pickup, instant payment, 100% legal process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/user-signup">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <IconUser className="w-5 h-5" />
                Get Started Now
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="tel:+919876543210">
              <button className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                <IconPhone className="w-5 h-5" />
                Call: +91 98765 43210
              </button>
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <IconCheck className="w-5 h-5" />
              <span>Free Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCheck className="w-5 h-5" />
              <span>Instant Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCheck className="w-5 h-5" />
              <span>100% Legal</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQs />
    </div>
  );
};

export default page;
