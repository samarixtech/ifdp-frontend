"use client";

import { FiUsers, FiDollarSign, FiCoffee } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      title: "Connect With New Customers",
      description: "Reach thousands of potential customers and grow your business effortlessly.",
      icon: <FiUsers size={32} />,
      bgColor: "bg-[#fff]",
      iconColor: "text-[#0B5D4E]",
    },
    {
      title: "Unlock Revenue",
      description: "Maximize your sales with our easy-to-use platform designed for your business.",
      icon: <FiDollarSign size={32} />,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Focus on Your Business",
      description: "Spend more time doing what you love while we handle the rest.",
      icon: <FiCoffee size={32} />,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 w-full text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-14">
        JAYAK HUB  brings <span className="text-[#0B5D4E]">new opportunities</span>
      </h2>

      <div className="max-w-6xl mx-auto grid gap-10 px-6 sm:grid-cols-1 md:grid-cols-3">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-[#E8F4F1] rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${i * 0.2}s`, opacity: 0 }}
          >
            <div className={`rounded-full p-5 mb-5 flex items-center justify-center ${item.bgColor} ${item.iconColor}`}>
              {item.icon}
            </div>
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
          </div>
        ))}
      </div>

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
      `}</style>
    </section>
  );
}
