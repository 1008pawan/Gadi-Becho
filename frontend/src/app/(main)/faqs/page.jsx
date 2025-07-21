"use client"
import React from "react";
import Navebar from "@/components/Navbar";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

const FAQs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Gadi Becho?",
      answer: "Gadi Becho is India's #1 car scrapping platform that helps you turn your old car into instant cash. We provide a hassle-free, transparent process where you can upload your car details, get an instant quote, and receive payment within 24 hours."
    },
    {
      id: 2,
      question: "How does the car scrapping process work?",
      answer: "Our process is simple and consists of 4 steps: 1) Upload your car details and photos through our easy form, 2) Get an instant competitive quote within minutes, 3) Our team picks up your car from your location for free, 4) Receive instant payment after final inspection and paperwork."
    },
    {
      id: 3,
      question: "What documents do I need to scrap my car?",
      answer: "You'll need your car's RC (Registration Certificate), insurance documents, and any other relevant vehicle papers. Our team will guide you through the complete documentation process during pickup."
    },
    {
      id: 4,
      question: "How quickly will I receive payment?",
      answer: "We process payments within 24 hours after the final inspection of your vehicle. The payment is made instantly once all paperwork is completed and verified."
    },
    {
      id: 5,
      question: "Is the pickup service really free?",
      answer: "Yes, our pickup service is completely free. We come to your location at your convenience to collect the vehicle without any additional charges."
    },
    {
      id: 6,
      question: "What types of vehicles do you accept?",
      answer: "We accept all types of cars, SUVs, and commercial vehicles that are old, damaged, or no longer roadworthy. This includes vehicles that are beyond repair or have expired registration."
    },
    {
      id: 7,
      question: "How do you determine the price for my car?",
      answer: "Our pricing is based on current market rates, the condition of your vehicle, its make and model, and the current scrap metal prices. We provide competitive quotes that reflect the true market value."
    },
    {
      id: 8,
      question: "Is the process completely legal?",
      answer: "Absolutely! We follow all legal procedures and ensure proper documentation. We handle all the necessary paperwork including RC transfer and provide you with all required certificates for scrapping."
    },
    {
      id: 9,
      question: "Can I scrap a car that's not in my name?",
      answer: "You can only scrap a car that's registered in your name or with proper authorization. If the car is in someone else's name, you'll need to provide proper authorization documents."
    },
    {
      id: 10,
      question: "What happens to my car after pickup?",
      answer: "Your car is transported to authorized recycling centers where it's dismantled in an environmentally friendly manner. All recyclable materials are properly processed and disposed of according to government regulations."
    },
    {
      id: 11,
      question: "Do you provide any certificates after scrapping?",
      answer: "Yes, we provide a scrapping certificate and all necessary documentation to prove that your vehicle has been legally scrapped. This helps you avoid any future legal complications."
    },
    {
      id: 12,
      question: "What if I'm not satisfied with the quote?",
      answer: "You're under no obligation to accept our quote. You can always get quotes from other sources and choose the best offer. We believe in transparent pricing and fair deals."
    },
    {
      id: 13,
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team at +91 98765 43210 or through our contact form. Our team is available to help you with any questions or concerns."
    },
    {
      id: 14,
      question: "Is there any hidden cost involved?",
      answer: "No, there are no hidden costs. Our pricing is transparent and includes all services - pickup, documentation, and processing. The quote you receive is the final amount you'll be paid."
    },
    {
      id: 15,
      question: "Can I track the status of my request?",
      answer: "Yes, you can track the status of your scrapping request through your user dashboard. We keep you updated at every step of the process."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-zinc-600">
            Find answers to common questions about our car scrapping service
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-semibold text-lg text-gray-800">
                    {faq.question}
                  </span>
                  {openFaq === faq.id ? (
                    <IconChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <IconChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8">
            Our customer support team is here to help you with any additional questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call Us: +91 98765 43210
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;