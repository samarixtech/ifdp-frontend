'use client';

import React from 'react';
import {
  FaTruck, FaStore, FaUser, FaHeadset, FaBolt, FaShieldAlt, FaCheckCircle,
  FaSmileBeam, FaQuoteRight, FaShoppingCart
} from 'react-icons/fa';
import { MdOutlineTrackChanges, MdOutlineLoyalty } from 'react-icons/md';
import { motion } from 'framer-motion';

// ============================================
// 🔹 Reusable Animated Card (Standard Service Card)
// ============================================
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="relative bg-white  backdrop-blur-lg border border-[#E8F4F1]/20 
               rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-200/40 
               hover:-translate-y-3 transition-all duration-500 group overflow-hidden"
  >
    <div className="absolute inset-0  to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" />
    <motion.div
      whileHover={{ rotate: 5, scale: 1.05 }}
      className="text-6xl text-[#0B5D4E] mb-5 group-hover:text-[#B6932F] transition-all"
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
    <motion.span
      layoutId="underline"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 w-0 
                group-hover:w-2/3 bg-linear-to-r from-yellow-600 to-[#0B5D4E] 
                transition-all duration-500 rounded-full"
    />
  </motion.div>
);

// ============================================
// 🔹 Motion Variants
// ============================================
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

// ============================================
// 🔹 Main Page
// ============================================
const ServicesPage: React.FC = () => {
  // ... (Data remains the same for coreServices, differentiators, testimonials, pricingPlans) ...

  const coreServices: ServiceCardProps[] = [
    { icon: <FaUser />, title: "Seamless Customer Journey", description: "Smooth user flow from login to delivery tracking.", delay: 0.1 },
    { icon: <MdOutlineTrackChanges />, title: "Live Tracking", description: "Real-time GPS updates and smart route optimization.", delay: 0.2 },
    { icon: <FaStore />, title: "Smart Restaurant Dashboard", description: "Manage menus, orders, and analytics in one place.", delay: 0.3 },
    { icon: <FaTruck />, title: "AI-Driven Dispatch", description: "Reduce delivery time with predictive driver assignments.", delay: 0.4 },
    { icon: <MdOutlineLoyalty />, title: "Loyalty & Rewards", description: "Engage users with automatic points and cashback.", delay: 0.5 },
    { icon: <FaHeadset />, title: "24/7 Support", description: "AI + human support for instant issue resolution.", delay: 0.6 },
  ];

  const differentiators: ServiceCardProps[] = [
    { icon: <FaBolt />, title: "Fast APIs", description: "200ms average response time globally.", delay: 0.1 },
    { icon: <FaCheckCircle />, title: "99.9% Uptime", description: "Redundant servers for seamless experience.", delay: 0.2 },
    { icon: <FaShieldAlt />, title: "Secure Infrastructure", description: "End-to-end encryption and fraud detection.", delay: 0.3 },
  ];

  const testimonials = [
    { quote: "The JAYAK HUB  platform streamlined our operations instantly. Super intuitive!", name: "Alex Johnson", title: "CEO, QuickBites Inc." },
    { quote: "Incredible speed and uptime. We've never missed a delivery window.", name: "Maria Gomez", title: "CFO, Foodie Hub" },
    { quote: "The analytics dashboard is a game-changer for our business decisions.", name: "Rahul Singh", title: "Owner, Spice Route" },
  ];

  const pricingPlans = [
    { name: "Starter", price: "Free", features: ["Basic analytics", "Live tracking", "Email support"], color: "from-[#0B5D4E] to-[#0B5D4E]" },
    { name: "Pro", price: "$49/mo", features: ["Loyalty system", "Priority support", "Advanced dashboard"], color: "from-yellow-200 to-yellow-600" },
    { name: "Enterprise", price: "Custom", features: ["Dedicated servers", "24/7 SLA", "Custom branding"], color: "from-[#0B5D4E] to-[#0B5D4E]" },
  ];



  return (
    // Main Container with Soft linear Background
    <div className=" text-gray-900 overflow-hidden">

      {/* 🚀 HERO SECTION */}
    <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="relative text-center py-18 md:py-16 overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1536329639134-ade172b2fea0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
  }}
>
  <div className="absolute inset-0 bg-[#2C2C2C]/30 " />
  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-[#E8F4F1] drop-shadow-lg">
      Delivering <span className="text-yellow-200">Innovation</span> at Every Step
    </h1>
    <p className="text-lg sm:text-xl text-[#E8F4F1]/90 mb-10 max-w-3xl mx-auto">
      JAYAK HUB  combines technology, AI, and design to make <strong>delivery smarter, faster, and effortless</strong>.
    </p>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-linear-to-r from-[#0B5D4E] to-[#0B5D4E] text-[#E8F4F1] font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-yellow-600/40 transition-all duration-300 text-lg"
    >
      Get Started Today
    </motion.button>
  </div>
</motion.section>


      {/* 📊 METRICS SECTION */}
      <section className="py-20 bg-[#E8F4F1]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 px-6 text-center">
          {[{ icon: <FaUser />, value: "200K+", label: "Active Users" },
            { icon: <FaTruck />, value: "120K+", label: "Deliveries/month" },
            { icon: <FaStore />, value: "9K+", label: "Partner Restaurants" },
            { icon: <FaSmileBeam />, value: "4.9★", label: "User Rating" }]
            .map((m, i) => (
              <motion.div key={i} variants={itemVariants} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.02]">
                <div className="text-[#B6932F] text-4xl md:text-5xl mb-2">{m.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900">{m.value}</h3>
                <p className="text-gray-500 text-sm md:text-base">{m.label}</p>
              </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ CORE SERVICES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase text-sm font-semibold text-[#0B5D4E] mb-2 tracking-widest">Our Platform</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Smarter Solutions for Modern Delivery</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">Empowering logistics with automation and clarity across all touchpoints.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coreServices.map((s, i) => <ServiceCard key={i} {...s} delay={i * 0.1} />)}
        </div>
      </section>


      {/* 🛡️ DIFFERENTIATORS SECTION */}
      <section className="py-20 bg-linear-to-br from-[#0B5D4E] to-[#0B5D4E] border-t border-[#0B5D4E] text-white">
        <div className="text-center mb-14">
          <p className="uppercase text-sm font-semibold text-green-600 mb-2 tracking-widest">Why Choose Us</p>
          <h2 className="text-4xl font-extrabold ">Built for Performance and Trust</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {differentiators.map((d, i) => <ServiceCard key={i} {...d} delay={i * 0.15} />)}
        </div>
      </section>

      {/* 💰 PRICING SECTION */}
      <section className="relative py-28 bg-[#E8F4F1]  overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_bottom_left,rgba(59,130,246,0.1),transparent)]
" />
        
        <div className="text-center mb-16 relative z-10">
          <p className="uppercase text-sm font-semibold text-[#0B5D4E] mb-2 tracking-wider">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Flexible Plans for Every Team</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your needs and scale your delivery operations effortlessly.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 relative z-10">
          {pricingPlans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
              className={`relative rounded-3xl text-center shadow-xl backdrop-blur-lg border border-[#0B5D4E]/50 
                         p-10 transition-all duration-500 overflow-hidden 
                         ${p.name === "Pro" ? " text-[#2C2C2C] scale-105 shadow-yellow-600/50" 
                                             : "bg-[#E8F4F1]/80 hover:shadow-2xl hover:-translate-y-2"}`}
            >
              {p.name === "Pro" && (
                <span className="absolute top-4 right-4 bg-yellow-600 text-[#0B5D4E] text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                  Most Popular
                </span>
              )}

              <h3 className={`text-2xl font-bold mb-4 ${p.name === "Pro" ? "text-[#2C2C2C]" : "text-gray-900"}`}>
                {p.name}
              </h3>
              <p className={`text-5xl font-extrabold mb-6 ${p.name === "Pro" ? "text-[#2C2C2C]" : "text-yellow-800"}`}>
                {p.price}
              </p>
              <ul className={`space-y-3 mb-8 ${p.name === "Pro" ? "text-[#0B5D4E]" : "text-gray-700"}`}>
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center justify-center gap-2">
                    <FaCheckCircle className={`${p.name === "Pro" ? "text-yellow-300" : "text-[#0B5D4E]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg 
                          ${p.name === "Pro"
                              ? "bg-[#E8F4F1] text-yellow-600 hover:bg-[#0B5D4E]"
                              : "bg-yellow-600 to-yellow-80 text-[#E8F4F1] hover:shadow-yellow-300/40 hover:-translate-y-1"}`}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 TESTIMONIALS SECTION */}
      <section className="relative py-28  overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_bottom_left,rgba(59,130,246,0.1),transparent)]
" />
        
        <div className="text-center mb-16 relative z-10">
          <p className="uppercase text-sm font-semibold text-yellow-500 mb-2 tracking-widest">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">What Our Clients Say</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
            Trusted by thousands of restaurants and logistics partners worldwide.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-[#E8F4F1]/80 backdrop-blur-lg border border-[#0B5D4E] rounded-3xl p-10 shadow-xl 
                        hover:shadow-yellow-200/60 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B5D4E] rounded-full p-3 shadow-xl">
                <FaQuoteRight className="text-[#fff] text-xl" />
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">“{t.quote}”</p>
              <div className="flex flex-col items-center border-t pt-4 border-[#0B5D4E]">
                <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                <p className="text-[#0B5D4E] text-sm">{t.title}</p>
                <div className="mt-3 flex text-yellow-600">
                  {[...Array(5)].map((_, i) => (
                    <FaSmileBeam key={i} className="text-xl" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 📞 CTA (Call to Action) */}
      <section className="bg-[#E8F4F1] py-10 text-center text-[#E8F4F1] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_bottom_left,rgba(59,130,246,0.1),transparent)]
" />
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Ready to Transform Your Delivery Business?</h2>
        <p className="text-[#0B5D4E] mb-10 max-w-2xl mx-auto text-lg">
          Join the growing community of businesses optimizing their delivery operations with IFDP.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hover:bg-[#E8F4F1] hover:text-[#0B5D4E]  text-white font-semibold py-3 px-10 rounded-full shadow-xl bg-[#0B5D4E] transition-all duration-300 text-lg"
        >
          Contact Sales
        </motion.button>
      </section>
    </div>
  );
};

export default ServicesPage;