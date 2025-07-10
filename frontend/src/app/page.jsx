import Firstcard from "@/components/FirstCard";
import Navebar from "@/components/Navbar";
import {
  IconCalculator,
  IconCar,
  IconCashBanknote,
  IconPhone,
  IconTruck,
  IconUpload,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import Link from "next/link";
import DivMarque from "@/components/DivMarque";
const page = () => {
  return (
    <div>
      <Navebar />

      {/* hero section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-20 xl:px-10 flex">
        <div className="xl:w-[45%]  px-2">
          <div className="flex xl:justify-start justify-center items-center gap-2 mt-20">
            <IconCar className="size-4" />
            <p>India's #1 Car Scrapping Platform</p>
          </div>
          <h1 className="text-6xl font-bold text-blue-600 py-8 xl:text-left text-center">
            Turn Your Old Car Into{" "}
            <span className="text-orange-400">Instant Cash</span>
          </h1>
          <p className="text-xl text-zinc-500 xl:text-left text-center">
            Get the best price for your scrap car with our hassle-free,
            transparent process. Upload details, get instant quote, and receive
            payment within 24 hours.
          </p>
          <div className="flex justify-center items-center gap-5 py-5">
            <Link href={"user-signup"}>
              <button className="bg-blue-500 border border-blue-500  flex justify-center items-center px-3 py-2 rounded-lg shadow-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
                <IconUser className="w-5 h-5 mr-2" />
                User Signup
              </button>
            </Link>
            <button className="bg-white flex justify-center items-center px-3 py-2 rounded-lg shadow-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              <IconPhone className="w-5 h-5 mr-2" />
              <a href="tel:+919876543210">Call: +91 98765 43210</a>
            </button>
          </div>
        </div>
        <div className="xl:w-[60%]">
          <img src="/images/img2.png" alt="Car image" className="h-150 w-250" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Cars Scrapped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹50L+</div>
              <div className="text-green-100">Paid to Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24hrs</div>
              <div className="text-green-100">Average Processing</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-green-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="bg-gray-50 py-20">
        <h1 className="text-3xl font-bold text-center">How Gadi Becho Works</h1>
        <p className="text-zinc-500 text-center py-5">
          Get cash for your car in 4 simple steps
        </p>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5 md:px-20 px-5 md:py-10">
          <Firstcard
            num={
              <IconUpload className="size-15 p-2 rounded-full flex justify-center items-center bg-green-200 text-green-500" />
            }
            heading={"1. Upload Details"}
            para={
              "Share your car details, photos, and documents through our easy form"
            }
            className="columns-1"
          />
          <Firstcard
            num={
              <IconCalculator className="size-15 p-2 rounded-full flex justify-center items-center bg-blue-200 text-blue-500" />
            }
            heading={"2. Get Instant Quote"}
            para={`Receive competitive quote within minutes based on current market rates`}
            className="columns-1"
          />
          <Firstcard
            num={
              <IconTruck className="size-15 p-2 rounded-full flex justify-center items-center bg-orange-200 text-orange-500" />
            }
            heading={"3. Free Pickup"}
            para={
              "Our team picks up your car from your location at your convenience"
            }
            className="columns-1"
          />
          <Firstcard
            num={
              <IconCashBanknote className="size-15 p-2 rounded-full flex justify-center items-center bg-purple-200 text-purple-500" />
            }
            heading={"4. Get Paid"}
            para={
              "Receive instant payment after final inspection and paperwork"
            }
            className="columns-1"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <h1 className="text-3xl font-bold text-center py-7">
          Why Choose Gadi Becho?
        </h1>
        <p className="text-center">
          India's most trusted car scrapping platform
        </p>
        <DivMarque />
      </section>

      {/* scrap car */}
      <section className="py-10 text-center bg-gradient-to-br from-blue-600 to-orange-600 text-white">
        <h1 className="text-5xl font-bold">Ready to Scrap Your Car?</h1>
        <p className="py-10 text-xl">
          Get instant quote now and turn your old car into cash today!
        </p>
        <div className="flex justify-center items-center gap-5">
          <Link href={"user-signup"}>
            <button className="bg-blue-500 border border-blue-500  flex justify-center items-center px-3 py-2 rounded-lg shadow-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
              <IconUser className="w-5 h-5 mr-2" />
              User Signup
            </button>
          </Link>
          <button className="bg-white flex text-zinc-500 justify-center items-center px-3 py-2 rounded-lg shadow-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
            <IconPhone />
            <a href="tel:+919876543210">Call: +91 98765 43210</a>
          </button>
        </div>
        <p className="py-10 text-xl">
          Free pickup. Instant payment 100% legal process
        </p>
      </section>
      
    </div>
  );
};

export default page;
