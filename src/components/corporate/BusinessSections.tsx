"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiPanda } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";

const BusinessSections: React.FC = () => {
  return (
    <div className="bg-[#E8F4F1] pt-20 pb-28">

      {/* ================= PERKS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14">
          JAYAK HUB  for business <span className="text-[#0B5D4E]">perks</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border p-7 bg-gray-50 rounded-lg">

          {/* CARD 1 */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-[#0B5D4E] text-[#0B5D4E] shadow-sm">
              <GiPanda size={26} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Corporate allowance
              </h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Provide meal allowances to employees directly from our dashboard. 
                Save time, effort, and money.
              </p>

              <Link
                href="#"
                className="text-[#0B5D4E] text-sm font-semibold hover:underline transition"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                            bg-purple-100 text-purple-700 shadow-sm">
              <FaCrown size={26} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                pandapro subscription
              </h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Give your team exclusive pandapro advantages including up to 25% 
                off dine-in offers.
              </p>

              <Link
                href="#"
                className="text-purple-600 text-sm font-semibold hover:underline transition"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="max-w-7xl mx-auto border-[#FFF9EE]" />

      {/* ================= WHY I FDP SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT SIDE */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
              Why <span className="text-[#0B5D4E]">IFDP</span> for business?
            </h2>

            {/* VALUE BLOCKS */}
            <div className="space-y-10">

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pay only what employees use
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No more wasted money on unused food allowances. Pay only what’s actually used.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  In-depth tracking
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Track and manage employee food activity with a fully optimized JAYAK HUB  business dashboard.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Save time, money & increase productivity
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Create custom allowances for different departments and deliver meals
                  anywhere—from the office to your employees' homes.
                </p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button
              className="mt-10 px-8 py-3 bg-[#0B5D4E] text-[#E8F4F1] font-semibold 
                         rounded-lg shadow-md hover:bg-[#0B5D4E] hover:shadow-lg 
                         transition duration-300"
            >
              Take a sneak peek at the dashboard
            </button>
          </div>

          {/* RIGHT IMAGE SIDE */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg h-80 md:h-96">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                alt="JAYAK HUB  business dashboard on a laptop"
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BusinessSections;
