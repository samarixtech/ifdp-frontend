"use client";

import PartnerForm from "./Form";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-100">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920"
        alt="Food background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl px-6 gap-5 py-5">

        {/* LEFT TEXT + FORM */}
        <div className="flex flex-col items-center lg:items-start text-white gap-4 w-full">
      

          {/* FORM */}
          <div className="animate-fadeInUp w-full" style={{ animationDelay: "0.3s" }}>
            <PartnerForm />
          </div>
        </div>

        {/* RIGHT IMAGE */}
      <div className="flex flex-col items-center lg:items-start text-white gap-4 w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left drop-shadow-xl animate-fadeInUp">
            Register your restaurant <br /> with us!
          </h1>

          <p
            className="text-gray-200 text-sm sm:text-base text-center lg:text-left animate-fadeInUp"
            style={{ animationDelay: "0.15s" }}
          >
            Sign up easily, showcase your menu, and reach thousands of customers every day.
          </p>
          {/* <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Restaurant Owner"
            className="rounded-2xl shadow-2xl object-cover w-[250px] sm:w-[350px] lg:w-[550px] h-[250px] sm:h-[350px] lg:h-[400px]"
          /> */}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out both;
        }
      `}</style>
    </section>
  );
}
