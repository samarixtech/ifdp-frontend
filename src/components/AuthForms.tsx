
"use client";


export const SignInForm = () => (
  <form className="flex flex-col space-y-4">
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <button className="w-full p-3 bg-[#0B5D4E] text-[#E8F4F1] font-bold rounded-lg hover:bg-[#0B5D4E] transition shadow-md">
      Sign In
    </button>
    <p className="text-sm text-gray-500 text-center">
      Dont have an account?{" "}
      <span className="text-[#0B5D4E] font-semibold cursor-pointer">
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
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <input
      type="text"
      placeholder="Enter Your Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
    />
    <button className="w-full p-3 bg-[#0B5D4E] text-[#E8F4F1] font-bold rounded-lg hover:bg-[#0B5D4E] transition shadow-md">
      Sign Up
    </button>
    <p className="text-sm text-gray-500 text-center">
      Already have an account?{" "}
      <span className="text-[#0B5D4E] font-semibold cursor-pointer">
        Sign In
      </span>
    </p>
  </form>
);
