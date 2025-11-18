"use client";
import { useState } from "react";

export default function PartnerForm() {
  const [form, setForm] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    businessType: "",
    email: "",
    phone: "",
    samePhone: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg text-black w-full max-w-sm space-y-3 animate-fadeIn"
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 text-center">
        Boost Your Sales
      </h2>

      {/* Inputs */}
      <div className="space-y-2">
        <input
          type="text"
          name="businessName"
          placeholder="Business Name *"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          onChange={handleChange}
        />

        <input
          type="text"
          name="firstName"
          placeholder="First & Middle Name *"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          onChange={handleChange}
        />

        <select
          name="businessType"
          required
          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          onChange={handleChange}
        >
          <option value="">Business type *</option>
          <option value="restaurant">Restaurant</option>
          <option value="grocery">Grocery</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="bakery">Bakery</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Business Email *"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          onChange={handleChange}
        />

        <div className="relative">
          <span className="absolute left-2 top-2 text-gray-500 text-sm">+92</span>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number *"
            required
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            onChange={handleChange}
          />
        </div>

        <label className="flex items-start gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="samePhone"
            checked={form.samePhone}
            onChange={handleChange}
            className="mt-1 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">
            My Business Phone is the same as Mobile Number
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition-all"
      >
        Get Started
      </button>

      {/* Footer Links */}
      <div className="text-xs text-center text-gray-500 space-y-1">
        <p>
          Already have an account?{" "}
          <a className="text-blue-600 font-medium hover:underline" href="#">
            Login
          </a>
        </p>
        <p>
          Want to be an IFDP rider?{" "}
          <a className="text-blue-600 font-medium hover:underline" href="#">
            Click here
          </a>
        </p>
        <p className="leading-tight">
          Protected by reCAPTCHA. Google Privacy Policy and Terms apply.
        </p>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </form>
  );
}
