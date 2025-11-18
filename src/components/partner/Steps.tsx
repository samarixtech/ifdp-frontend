"use client";

import { FiShoppingCart, FiCoffee, FiTruck, FiTrendingUp } from "react-icons/fi";

const stepData = [
  { 
    title: "The Customer Orders", 
    description: "The customer places an order through the IFDP app.", 
    icon: <FiShoppingCart size={34} />,
  },
  { 
    title: "You Prepare", 
    description: "You will receive a notification to start preparing the order.", 
    icon: <FiCoffee size={34} />,
  },
  { 
    title: "We Deliver", 
    description: "An IFDP rider picks up and delivers the order quickly.", 
    icon: <FiTruck size={34} />,
  },
  { 
    title: "Watch Your Business Grow", 
    description: "Track your performance with powerful insights and analytics.", 
    icon: <FiTrendingUp size={34} />,
  },
];

const StepsAndTestimonials: React.FC = () => {
  return (
    <section className="w-full bg-white ">
      
      {/* ---------- Title ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold pt-12 pb-16">
          We make it <span className="text-blue-600">simple and easy</span>
        </h2>

        {/* ---------- Steps Grid ---------- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {stepData.map((step, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center px-5 py-8 rounded-2xl 
                         bg-white shadow-lg hover:shadow-2xl transition-all duration-300 
                         hover:-translate-y-1 border border-gray-100"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full 
                              bg-gradient-to-br from-blue-600 to-blue-400 text-white 
                              shadow-md mb-5">
                {step.icon}
              </div>

              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* ---------- Testimonials Section ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-0">

        {/* Left Column */}
        <div className="grid grid-rows-2 lg:h-[650px]">

          {/* Rider Image */}
          <div className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop')",
              }}
            />
          </div>

          {/* Quote */}
          <div className="bg-gray-200 text-black p-10 flex flex-col justify-center">
            <blockquote className="text-xl sm:text-2xl font-light leading-relaxed">
              “As a brand, we are highly satisfied with IFDP shops where they
              deliver orders within 30 minutes. This strategy is the future of
              delivery services!”
            </blockquote>
            <p className="mt-5 font-semibold text-sm">Fahad Dandia</p>
            <p className="text-xs text-gray-700">Ex-employee name/designation</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-2 lg:h-[650px]">

          {/* Quote */}
          <div className="bg-gray-200 text-black p-10 flex flex-col justify-center">
            <blockquote className="text-xl sm:text-2xl font-light leading-relaxed">
              “I am truly one of the happiest partners as IFDP has not only
              increased the sales of my restaurant but made us famous in our
              entire area.”
            </blockquote>
            <p className="mt-5 font-semibold text-sm">Raza Afsar</p>
            <p className="text-xs text-gray-700">Deal Addicts by Haroon, Islamabad</p>
          </div>

          {/* Eating Image */}
          <div className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60')",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default StepsAndTestimonials;
