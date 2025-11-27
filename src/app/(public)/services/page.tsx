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
    className="relative bg-white/30 backdrop-blur-lg border border-white/20 
               rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-200/40 
               hover:-translate-y-3 transition-all duration-500 group overflow-hidden"
  >
    <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" />
    <motion.div
      whileHover={{ rotate: 5, scale: 1.05 }}
      className="text-6xl text-blue-500 mb-5 group-hover:text-blue-600 transition-all"
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
    <motion.span
      layoutId="underline"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 w-0 
                group-hover:w-2/3 bg-linear-to-r from-blue-400 to-blue-600 
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
    { quote: "The IFDP platform streamlined our operations instantly. Super intuitive!", name: "Alex Johnson", title: "CEO, QuickBites Inc." },
    { quote: "Incredible speed and uptime. We've never missed a delivery window.", name: "Maria Gomez", title: "CFO, Foodie Hub" },
    { quote: "The analytics dashboard is a game-changer for our business decisions.", name: "Rahul Singh", title: "Owner, Spice Route" },
  ];

  const pricingPlans = [
    { name: "Starter", price: "Free", features: ["Basic analytics", "Live tracking", "Email support"], color: "from-blue-50 to-blue-100" },
    { name: "Pro", price: "$49/mo", features: ["Loyalty system", "Priority support", "Advanced dashboard"], color: "from-blue-200 to-blue-400" },
    { name: "Enterprise", price: "Custom", features: ["Dedicated servers", "24/7 SLA", "Custom branding"], color: "from-blue-500 to-blue-700" },
  ];

  // // **NEW FOOD DATA WITH DYNAMIC UNSPLASH LINKS**
  // const foodSpecials = [
  //   {
  //     title: "Spicy Chicken Tacos",
  //     description: "Authentic street tacos with grilled chicken and fresh salsa.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🌮",
  //   },
  //   {
  //     title: "Artisan Margherita Pizza",
  //     description: "Hand-tossed crust, fresh basil, mozzarella, and San Marzano tomatoes.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🍕",
  //   },
  //   {
  //     title: "Gourmet Lamb Biryani",
  //     description: "Aromatic basmati rice cooked with tender lamb and rich spices.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🥘",
  //   },
  //   {
  //     title: "Fresh Salmon Sushi Set",
  //     description: "Premium cuts of salmon, tuna, and fresh avocado rolls.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🍣",
  //   },
  //   {
  //     title: "Loaded Veggie Burger",
  //     description: "Plant-based patty, all the fixings, on a toasted brioche bun.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🍔",
  //   },
  //   {
  //     title: "Decadent Chocolate Cake",
  //     description: "Rich layered chocolate cake with dark ganache frosting.",
  //     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  //     icon: "🍰",
  //   },
  // ];

  return (
    // Main Container with Soft linear Background
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-100 text-gray-900 overflow-hidden">

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
  <div className="absolute inset-0 bg-black/30 " />
  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
      Delivering <span className="text-blue-200">Innovation</span> at Every Step
    </h1>
    <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
      IFDP combines technology, AI, and design to make <strong>delivery smarter, faster, and effortless</strong>.
    </p>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-blue-400/40 transition-all duration-300 text-lg"
    >
      Get Started Today
    </motion.button>
  </div>
</motion.section>


      {/* 📊 METRICS SECTION */}
      <section className="py-20 bg-white/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 px-6 text-center">
          {[{ icon: <FaUser />, value: "200K+", label: "Active Users" },
            { icon: <FaTruck />, value: "120K+", label: "Deliveries/month" },
            { icon: <FaStore />, value: "9K+", label: "Partner Restaurants" },
            { icon: <FaSmileBeam />, value: "4.9★", label: "User Rating" }]
            .map((m, i) => (
              <motion.div key={i} variants={itemVariants} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl bg-linear-to-br from-blue-50 to-white p-6 md:p-8 shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.02]">
                <div className="text-blue-500 text-4xl md:text-5xl mb-2">{m.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900">{m.value}</h3>
                <p className="text-gray-600 text-sm md:text-base">{m.label}</p>
              </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ CORE SERVICES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase text-sm font-semibold text-blue-600 mb-2 tracking-widest">Our Platform</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Smarter Solutions for Modern Delivery</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">Empowering logistics with automation and clarity across all touchpoints.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coreServices.map((s, i) => <ServiceCard key={i} {...s} delay={i * 0.1} />)}
        </div>
      </section>
      
      {/* 🍔 FOOD SPECIALS - NEW SECTION */}
      <section className="py-24 bg-linear-to-br from-white via-blue-50 to-white border-t border-red-100">
        <div className="text-center mb-16">
          <p className="uppercase text-sm font-semibold text-blue-500 mb-2 tracking-widest">
            Taste the Best
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Freshly Prepared, Always Delicious
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
            Handpicked dishes from our top restaurants, delivered hot and fresh to your doorstep.
          </p>
        </div>
{/* 
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {foodSpecials.map((food, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)" }}
              className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100 transition-all duration-500 cursor-pointer"
            >
              
              <div className="overflow-hidden">
                <img
                  src={food.image}
                  alt={food.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

       
              <div className="p-6 text-center">
                <div className="text-5xl mb-3">{food.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{food.title}</h3>
                <p className="text-gray-600 mb-6">{food.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center mx-auto gap-2 bg-linear-to-r from-blue-100 via-blue-50 text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-red-400/40 transition-all duration-300"
                >
                  <FaShoppingCart className="text-lg" />
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div> */}
      </section>

      {/* 🛡️ DIFFERENTIATORS SECTION */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-white border-t border-blue-100">
        <div className="text-center mb-14">
          <p className="uppercase text-sm font-semibold text-green-600 mb-2 tracking-widest">Why Choose Us</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Built for Performance and Trust</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {differentiators.map((d, i) => <ServiceCard key={i} {...d} delay={i * 0.15} />)}
        </div>
      </section>

      {/* 💰 PRICING SECTION */}
      <section className="relative py-28 bg-linear-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_bottom_left,rgba(59,130,246,0.1),transparent)]
" />
        
        <div className="text-center mb-16 relative z-10">
          <p className="uppercase text-sm font-semibold text-blue-600 mb-2 tracking-wider">Pricing</p>
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
              className={`relative rounded-3xl text-center shadow-xl backdrop-blur-lg border border-blue-100/50 
                         p-10 transition-all duration-500 overflow-hidden 
                         ${p.name === "Pro" ? " text-black scale-105 shadow-blue-400/50" 
                                             : "bg-white/80 hover:shadow-2xl hover:-translate-y-2"}`}
            >
              {p.name === "Pro" && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                  Most Popular
                </span>
              )}

              <h3 className={`text-2xl font-bold mb-4 ${p.name === "Pro" ? "text-black" : "text-gray-900"}`}>
                {p.name}
              </h3>
              <p className={`text-5xl font-extrabold mb-6 ${p.name === "Pro" ? "text-black" : "text-blue-800"}`}>
                {p.price}
              </p>
              <ul className={`space-y-3 mb-8 ${p.name === "Pro" ? "text-blue-500" : "text-gray-700"}`}>
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center justify-center gap-2">
                    <FaCheckCircle className={`${p.name === "Pro" ? "text-yellow-300" : "text-blue-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg 
                          ${p.name === "Pro"
                              ? "bg-white text-blue-400 hover:bg-blue-50"
                              : "bg-blue-400 to-blue-80 text-white hover:shadow-blue-300/40 hover:-translate-y-1"}`}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 TESTIMONIALS SECTION */}
      <section className="relative py-28 bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
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
              className="relative bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-10 shadow-xl 
                        hover:shadow-blue-200/60 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-full p-3 shadow-xl">
                <FaQuoteRight className="text-blue-500 text-xl" />
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">“{t.quote}”</p>
              <div className="flex flex-col items-center border-t pt-4 border-blue-50">
                <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                <p className="text-blue-600 text-sm">{t.title}</p>
                <div className="mt-3 flex text-yellow-400">
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
      <section className="bg-[#003566] py-10 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_bottom_left,rgba(59,130,246,0.1),transparent)]
" />
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Ready to Transform Your Delivery Business?</h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
          Join the growing community of businesses optimizing their delivery operations with IFDP.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-700 font-semibold py-3 px-10 rounded-full shadow-xl hover:bg-blue-50 transition-all duration-300 text-lg"
        >
          Contact Sales
        </motion.button>
      </section>
    </div>
  );
};

export default ServicesPage;