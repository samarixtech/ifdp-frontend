
"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-r from-[#0B5D4E] via-[#0B5D4E] to-[#0B5D4E] text-[#E8F4F1]">

      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')]"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center px-6">

        {/* LEFT TEXT */}
        <div
          className="space-y-6 animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Partner with <span className="text-yellow-300">IFDP</span> today
          </h2>

          <p className="text-white text-lg leading-relaxed">
            Expand your business, reach thousands of customers, and maximize your sales with our fast-growing digital platform.
          </p>

          <button className="group px-8 py-3 bg-[#E8F4F1] text-[#0B5D4E] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
            Become a Partner
            <span className="group-hover:translate-x-1 transition-transform text-[#0B5D4E]">
              →
            </span>
          </button>
        </div>

        {/* RIGHT IMAGE WITH OVERLAY */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          {/* <Image
            src="https://media.istockphoto.com/id/2195526262/photo/diverse-young-women-enjoying-self-service-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=iluxqVd3EOf2_NO6xG3QQ76QG3ZSUZk-7itKze-d_fU="
            alt="Partner with IFDP"
            width={800}
            height={600}
            className="object-cover w-full h-[360px] md:h-[420px]"
          /> */}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/50 via-[#2C2C2C]/20 to-transparent"></div>
        </div>

      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>

    </section>
  );
}
