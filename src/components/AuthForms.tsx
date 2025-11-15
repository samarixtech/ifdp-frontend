// components/AuthForms.tsx
"use client";

import React from "react";

export const SignInForm = () => (
  <form className="flex flex-col space-y-4">
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <button className="w-full p-3 bg-[#003566] text-white font-bold rounded-lg hover:bg-[#003566] transition shadow-md">
      Sign In
    </button>
    <p className="text-sm text-gray-500 text-center">
      Dont have an account?{" "}
      <span className="text-[#003566] font-semibold cursor-pointer">
        Sign Up
      </span>
    </p>
  </form>
);

export const SignUpForm = () => (
  <form className="flex flex-col space-y-4">
    <input
      type="text"
      placeholder="Full Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <input
      type="text"
      placeholder="Enter Your Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
    />
    <button className="w-full p-3 bg-[#003566] text-white font-bold rounded-lg hover:bg-[#003566] transition shadow-md">
      Sign Up
    </button>
    <p className="text-sm text-gray-500 text-center">
      Already have an account?{" "}
      <span className="text-[#003566] font-semibold cursor-pointer">
        Sign In
      </span>
    </p>
  </form>
);
