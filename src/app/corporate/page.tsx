"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BusinessSections from "@/components/corporate/BusinessSections";
import PartnerLandingPage from "@/components/corporate/PartnerLandingPage";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#E8F4F1]/80 backdrop-blur-md shadow-sm border-b border-[#FFF9EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0B5D4E] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-[#E8F4F1] font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            JAYAK HUB  for business
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            href="#"
            className="hidden sm:block text-gray-700 hover:text-[#B6932F] transition font-medium text-sm"
          >
            Resources
          </Link>

          <Link
            href="#"
            className="hidden sm:block text-gray-700 hover:text-[#B6932F] transition font-medium text-sm"
          >
            Log in
          </Link>

          <button
            className="px-5 py-2 bg-[#0B5D4E] text-[#E8F4F1] font-semibold rounded-lg shadow-md hover:bg-[#0B5D4E] hover:shadow-lg transition-all duration-300 text-sm"
          >
            Get Started
          </button>
        </nav>

      </div>
    </header>
  );
};

export default function BusinessPage() {
  return (
    <div className="bg-[#E8F4F1] min-h-screen">

      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="pt-32 pb-24 relative">
        {/* Soft Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D4E] to-[#E8F4F1] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Food worth <span className="text-[#0B5D4E]">working</span> for
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Treat your co-workers and clients to great food from the best
              restaurants. Power up work-from-home sessions, late nights at the
              office, corporate meetings, and special events.
            </p>

            <button
              className="px-7 py-3 bg-[#0B5D4E] text-[#E8F4F1] font-semibold rounded-lg 
                         shadow-md hover:bg-[#0B5D4E] hover:shadow-xl transition-all duration-300"
            >
              Get started
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60"
                alt="Food illustration"
                fill
                className="object-cover rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= BUSINESS SECTIONS ================= */}
      <BusinessSections />
      <PartnerLandingPage/>
    </div>
  );
}
