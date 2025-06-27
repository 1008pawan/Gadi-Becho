import FirstCard from '@/components/FirstCard'
import SecondCard from '@/components/SecondCard'
import ThirdCard from '@/components/ThirdCard'
import { IconCar, IconRecycle } from '@tabler/icons-react'
import { Car, CheckCircle, Clock, DollarSign, Mail, MapPin, Phone, Recycle, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const aboutUs = () => {
  return (
    <div>
        {/* hero section */}
        <section className='bg-gradient-to-br from-blue-100 to-blue-200 py-20'>
                <span className='flex justify-center text-xs font-semibold px-5 w-[100%] md:w-[70%] mx-auto'><IconCar className='size-4' />Trusted Car Scrapping Service</span>
                <h1 className='px-5 w-[100%] md:w-[70%] mx-auto text-4xl md:text-6xl font-bold py-5 text-center text-blue-600'>About <span className='text-orange-400'>Gadi Becho</span></h1>
                <p className='px-5 w-[100%] md:w-[60%] mx-auto text-zinc-500 text-xl text-center'>India's most trusted platform for scrapping old vehicles. We make car disposal easy, profitable, and environmentally responsible.</p>
                <div className='px-5 w-[100%] md:w-[70%] mx-auto flex justify-center py-10 gap-4'>
                    <span className='text-xs sm:text-sm flex text-zinc-500 gap-2'><CheckCircle className='size-4 sm:size-5 text-green-500' /> 10,000+ Cars Scrapped</span>
                    <span className='text-xs sm:text-sm flex text-zinc-500 gap-2'><CheckCircle className='size-4 sm:size-5 text-green-500' /> Government Certified</span>
                    <span className='text-xs sm:text-sm flex text-zinc-500 gap-2'><CheckCircle className='size-4 sm:size-5 text-green-500' /> Instant Payment</span>
                </div>
        </section>

        {/* mission section */}
        <section className='md:flex justify-center items-center container mx-auto px-15 py-15'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold'>Our Mission</h1>
                <p className='text-lg text-zinc-500 py-5'>At Gadi Becho, we're revolutionizing the way people dispose of their old vehicles. Our mission is to provide a hassle-free, transparent, and profitable solution for car owners while promoting environmental sustainability.</p>
                <p className='text-lg text-zinc-500'>We believe that every old car has value, and we're here to help you unlock that value while ensuring responsible recycling and disposal practices.</p>
                <div className='flex gap-3 py-5'>
                    <div className='text-xs flex justify-center items-center border border-green-500 rounded-md text-green-500 px-3 py-1 gap-2'><IconRecycle className='size-3' />Eco-Friendly</div>
                    <div className='text-xs flex justify-center items-center border border-blue-500 rounded-md text-blue-500 px-3 py-1 gap-2'><Shield className='size-3' />Secure Process</div>
                    <div className='text-xs flex justify-center items-center border border-orange-500 rounded-md text-orange-500 px-3 py-1 gap-2'><DollarSign className='size-3' />Best Prices</div>
                </div>
            </div>
            <div className='container mx-auto px-10'>
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8">
                    <Car className="w-32 h-32 text-green-600 mx-auto"/>
                </div>
            </div>
        </section>

        {/* how it works */}
        <section className='bg-gray-50 py-20'>
            <h1 className='text-3xl font-bold text-center'>How Gadi Becho Works</h1>
            <p className='text-zinc-500 text-center py-5'>Simple, fast, and transparent process</p>
            <div className='grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5 md:px-20 px-5'>
                <FirstCard num={'1'} heading={'Upload Details'} para={'Upload your car details, photos, and documents on our platform'} className='columns-1'/>
                <FirstCard num={'2'} heading={'Get Quote'} para={`Receive instant quote based on your car's condition and market value`} className='columns-1'/>
                <FirstCard num={'3'} heading={'Schedule Pickup'} para={'Schedule convenient pickup time and location for vehicle inspection'} className='columns-1'/>
                <FirstCard num={'4'} heading={'Get Paid'} para={'Receive instant payment after final inspection and paperwork completion'} className='columns-1'/>
            </div>
        </section>

        {/* Why Choose Us */}
        <section className='py-20'>
            <h1 className='text-3xl font-bold text-center'>Why Choose Gadi Becho?</h1>
            <p className='text-center'>We make car scrapping simple and profitable</p>
            <div className='py-15 lg:px-25 px-5 gap-7 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                <SecondCard svg={<DollarSign className='w-12 h-12 text-green-500' />} heading={'Best Market Price'} para={"We offer competitive prices based on current scrap metal rates and your car's condition. No hidden charges, transparent pricing."} />
                <SecondCard svg={<Clock className="w-12 h-12 text-blue-500" />} heading={'Quick Process'} para={"Complete the entire process in 24-48 hours. From quote to payment, we ensure minimal waiting time."} />
                <SecondCard svg={<Shield className="w-12 h-12 text-purple-500" />} heading={'Legal Compliance'} para={"All paperwork handled professionally. We ensure complete legal compliance and proper documentation."} />
                <SecondCard svg={<Recycle className="w-12 h-12 text-green-500" />} heading={'Eco-Friendly'} para={"Responsible recycling practices. We ensure your car is disposed of in an environmentally friendly manner."} />
                <SecondCard svg={<Users className="w-12 h-12 text-orange-500" />} heading={'Expert Team'} para={"Our experienced team handles everything from valuation to pickup, ensuring smooth experience throughout."} />
                <SecondCard svg={<Phone className="w-12 h-12 text-red-500" />} heading={'24/7 Support'} para={"Round-the-clock customer support to answer your queries and assist you throughout the process."} />
            </div>

        </section>


        {/* Contact Section */}
        <section className='text-center py-20'>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600">Ready to scrap your car? Contact us today!</p>
            <div className='py-15 xl:px-25 px-5 gap-5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                <ThirdCard svg={<Phone className="w-12 h-12 text-green-500 mx-auto"/>} heading={'Call Us'} heading2={'+91 98765 43210'} para={'Mon-Sat, 9 AM - 7 PM'} />
                <ThirdCard svg={<Mail className="w-12 h-12 text-blue-600 mx-auto" />} heading={'Email Us'} heading2={'support@gadibecho.com'} para={"We'll respond within 2 hours"} />
                <ThirdCard svg={<MapPin className="w-12 h-12 text-purple-600 mx-auto" />} heading={'Visit Us'} heading2={'123 Business Park'} para={'Mumbai, Maharashtra 400001'} />
            </div>
            <div className='flex justify-center items-center'>
            <Link href={'/user-signin'}>
                <button className="bg-blue-500 flex justify-center items-center px-3 py-2 rounded-lg shadow-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
                    <Car className="w-5 h-5 mr-2" />
                    Start Scrapping Your Car
                </button>
            </Link>
            </div>
        </section>
    </div>
  )
}

export default aboutUs