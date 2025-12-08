"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; 
import { GiWallet, GiPresent } from 'react-icons/gi'; 
import { FaQuoteLeft } from 'react-icons/fa';
const yellow_COLOR = "text-[#0B5D4E]";
const yellow_BG = "bg-[#0B5D4E]";
const faqData = [
    { id: 1, question: "Why should I partner with JAHAK HUB?", answer: "Partnering with JAYAK HUB  expands your reach, increases order volume, and utilizes our delivery network." },
    { id: 2, question: "Is my restaurant a good fit for JAHAK HUB?", answer: "JAYAK HUB  welcomes a variety of cuisines and restaurant types." },
    { id: 3, question: "What are the requirements to become a partner?", answer: "Key requirements usually include valid business registration, necessary licenses, and an attractive menu." },
    { id: 4, question: "Can I join without a physical storefront?", answer: "Yes, JAYAK HUB  supports cloud kitchens (delivery-only) models." },
    { id: 5, question: "How do I get started?", answer: "You can start by filling out the online application form on our partner portal." },
    { id: 6, question: "How long does the approval process take?", answer: "The approval time varies, but usually takes a few days after submitting all required documents." },
    { id: 7, question: "How do I know if my business is verified?", answer: "You will receive an official email confirmation once your business verification is complete." },
    { id: 8, question: "What is the commission fee for partners?", answer: "The commission structure is based on the service model and will be discussed during the partnership agreement." },
    { id: 9, question: "Can I pause orders if it gets too busy?", answer: "Yes, you have control through the partner app to temporarily pause orders during peak rushes." },
    { id: 10, question: "How can I contact partner support?", answer: "Partner support is available via phone, email, or through the dedicated help section in the partner app." },
];

const BenefitsSection: React.FC = () => {
    const benefits = [
        { icon: <GiWallet size={24} />, text: "Save time and money with JAYAK HUB  for business allowances" },
        { icon: <GiPresent size={24} />, text: "Recognize hard work or special occasions with employee gift cards" },
        { icon: <GiPresent size={24} />, text: "JAYAK HUB  for business members get at least 30% off JAYAK HUB  orders" },
    ];
    // Placeholder logos for restaurants
    const logos = [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", 
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", 
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", 
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
    ];

    return (
        <section className="bg-[#E8F4F1] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-20">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className={`p-3 rounded-full ${yellow_COLOR} mb-3`}>
                                {benefit.icon}
                            </div>
                            <p className="text-sm text-gray-700 max-w-xs">{benefit.text}</p>
                        </div>
                    ))}
                </div>

                {/* Treat Your Team Sub-Section */}
                <div className="text-center mb-12">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
                        Treat your team to thousands of top-rated restaurants
                    </h2>
                    <p className="text-md text-gray-600 max-w-2xl mx-auto">
                        With JAYAK HUB  for business, give your team access to the best restaurants, exclusive deals and regular food allowances.
                    </p>
                </div>

                {/* Logo Strip (Placeholder) */}
                <div className="flex justify-center space-x-6 md:space-x-12 flex-wrap">
                    {logos.map((src, index) => (
                        <div key={index} className="relative w-16 h-16 md:w-20 md:h-20 grayscale hover:grayscale-0 transition duration-300 my-4">
                            <Image src={src} alt={`Restaurant logo ${index + 1}`} fill style={{ objectFit: 'contain' }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    What others are saying
                </h2>
                <p className="text-sm text-gray-600 mb-12">
                    Companies of all types and sizes are using JAYAK HUB  for business - so whether you've got 50 employees or 10,000, you'll be in good company
                </p>

                {/* Quote Box */}
                <div className="bg-[#E8F4F1] p-6 md:p-10 rounded-lg shadow-xl border-t-4 border-[#0B5D4E] relative">
                    <FaQuoteLeft size={40} className="absolute top-[-20px] left-5 text-yellow-300 opacity-50" />
                    <blockquote className="text-base text-gray-800 italic leading-relaxed pt-4">
                        "I'm so grateful for JAYAK HUB  for business in helping me achieve the RepWomen Well-being Initiative. It's so convenient and takes much stress off my RepWomen. They don't have to worry about running out of products or making a special trip to the store. It's one less thing they have to think about, and that's a huge relief."
                    </blockquote>
                    <p className="mt-4 text-sm font-semibold text-gray-900">Ayusha Guffam, People Experience & Culture Specialist, RepPack</p>
                </div>
            </div>
        </section>
    );
};


// --- 4. FAQ Section (Image 2) ---
const FAQSection: React.FC = () => {
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const toggleItem = (id: number) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    return (
        <section className="bg-[#E8F4F1] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-normal text-center text-gray-900 mb-10">
                    Any questions?
                </h2>
                
                <div className="border-t border-[#FFF9EE]">
                    {faqData.map((item) => (
                        <div key={item.id} className="border-b border-[#FFF9EE]">
                            <button
                                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                                onClick={() => toggleItem(item.id)}
                                aria-expanded={openItemId === item.id}
                            >
                                <span className="text-base font-normal text-gray-800">
                                    {item.question}
                                </span>
                                {openItemId === item.id ? (
                                    <IoIosArrowUp size={20} className={`${yellow_COLOR} transition-transform duration-300`} />
                                ) : (
                                    <IoIosArrowDown size={20} className="text-gray-400 transition-transform duration-300" />
                                )}
                            </button>
                            {openItemId === item.id && (
                                <div className="pb-4 pr-6 text-gray-600 text-sm transition-all duration-300 ease-in-out">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 5. Contact Us Section (Image 3 Bottom) ---
const ContactSection: React.FC = () => {
    return (
        <section className="bg-[#E8F4F1] pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto border-t pt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                    Contact us
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    If you have any further questions, please feel free to reach out. We are here to help your business grow.
                </p>
                <Link href="#contact" className={`mt-4 inline-block px-6 py-2 ${yellow_BG} text-[#E8F4F1] font-semibold rounded-lg hover:bg-[#0B5D4E] transition duration-300`}>
                    Get in Touch
                </Link>
            </div>
        </section>
    );
};

// --- Main Page Component ---
export default function PartnerLandingPage() {
    return (
        <div className="bg-[#E8F4F1] min-h-screen">
            <section className="bg-[#FFF9EE] py-24 text-center">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">Become a JAYAK HUB  Partner</h1>
                 <p className="text-xl text-gray-600">Join the platform that drives growth and customer satisfaction.</p>
            </section>

            <BenefitsSection />
            <TestimonialSection />
            <FAQSection />
            <ContactSection />
        </div>
    );
}