"use client";
import { useState, useRef } from "react";
import {
  Handshake,
  TrendingUp,
  Shield,
  Globe,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
} from "lucide-react";

const Partners = () => {
  // Color theme from original component
  const primaryBlue = "#014f86";
  const softPrimaryText = "text-[#014f86]";
  const softAccent = "bg-[#61a5c2]";
  const softAccentText = "text-[#014f86]";
  const softNeutralBg = "bg-gray-50";
  const softSectionBg = "bg-white";

  // Filter state for carousel
  const [activeFilter, setActiveFilter] = useState("All");
  const carouselRef = useRef(null);

  // Partner categories
  const filters = ["All", "Restaurants", "Delivery", "Technology", "Retail"];

  // Partners data
  const partners = [
    {
      id: 1,
      name: "Gourmet Kitchen Co.",
      category: "Restaurants",
      logo: "🍽️",
      description: "Premium dining experiences delivered to your door",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop",
      stats: { orders: "50K+", rating: "4.8" },
    },
    {
      id: 2,
      name: "Swift Logistics",
      category: "Delivery",
      logo: "🚚",
      description: "Fast and reliable delivery fleet services",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop",
      stats: { orders: "100K+", rating: "4.9" },
    },
    {
      id: 3,
      name: "TechServe Solutions",
      category: "Technology",
      logo: "💻",
      description: "Innovative payment and tracking systems",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop",
      stats: { orders: "200K+", rating: "4.7" },
    },
    {
      id: 4,
      name: "Urban Eats",
      category: "Restaurants",
      logo: "🍕",
      description: "Street food and local favorites network",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
      stats: { orders: "75K+", rating: "4.6" },
    },
    {
      id: 5,
      name: "Market Fresh",
      category: "Retail",
      logo: "🛒",
      description: "Grocery and fresh produce partnerships",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop",
      stats: { orders: "120K+", rating: "4.8" },
    },
    {
      id: 6,
      name: "CloudFleet",
      category: "Delivery",
      logo: "✈️",
      description: "Drone and express delivery services",
      image:
        "https://images.unsplash.com/photo-1527977966376-6c5d09690574?w=600&auto=format&fit=crop",
      stats: { orders: "90K+", rating: "4.9" },
    },
    {
      id: 7,
      name: "AppConnect",
      category: "Technology",
      logo: "📱",
      description: "Mobile integration and API solutions",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop",
      stats: { orders: "150K+", rating: "4.7" },
    },
    {
      id: 8,
      name: "Fusion Bistro Network",
      category: "Restaurants",
      logo: "🥘",
      description: "International cuisine partnership program",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop",
      stats: { orders: "60K+", rating: "4.8" },
    },
  ];

  // Filter partners based on active filter
  const filteredPartners =
    activeFilter === "All"
      ? partners
      : partners.filter((p) => p.category === activeFilter);

  // Carousel scroll functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  // Partnership benefits data
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description:
        "Access millions of customers and scale your operations with our proven platform",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security and 99.9% uptime guarantee for your peace of mind",
      color: "text-cyan-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Expand your presence across multiple markets with our international network",
      color: softPrimaryText,
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "24/7 partner success team to help you maximize your potential",
      color: "text-indigo-400",
    },
  ];

  return (
    <div className={`min-h-screen ${softNeutralBg}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 z-20 text-center text-white">
          <p className="text-lg font-semibold text-cyan-300 mb-3 uppercase tracking-wider animate-fade-in-up">
            Partnership Program
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Power Your Growth
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Join thousands of businesses thriving on our platform. From
            restaurants to tech innovators, we are building the future of
            delivery.
          </p>
          {/* CTA Button */}
          <button
            className={`group px-8 py-4 ${softAccent} ${softAccentText} font-semibold rounded-xl hover:bg-[#89c2d9] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 mx-auto w-max animate-fade-in-up animation-delay-400`}
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Why Partner With Us Section - Screenshot Style */}
      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1 - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-25">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop"
                alt="Account management"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-5 ml-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Access your partner dashboard anytime
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Monitor performance, track orders, manage your menu, and access
                real-time analytics. Our intuitive dashboard gives you completem
                control over your partnership.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3 bg-[#014f86] text-white font-semibold rounded-lg hover:bg-[#003256] transition-all duration-300 cursor-pointer">
                  Log in to your account
                </button>
                <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  Create an account
                </button>
              </div>
            </div>
          </div>

          {/* Section 2 - Content Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-25">
            {/* Content */}
            <div className="space-y-5 lg:order-1 ml-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Deliver on your schedule, maximize your earnings
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Set your own hours and choose your delivery zones. Whether you
                want to deliver full-time or part-time, our flexible platform
                adapts to your lifestyle and helps you earn more.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3 bg-[#014f86] text-white font-semibold rounded-lg hover:bg-[#003256] transition-all duration-300 cursor-pointer">
                  Get started
                </button>
                <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  Already have an account? Sign in
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop"
                alt="Flexible delivery"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Section 3 - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop"
                alt="Business growth"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-5 ml-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                The platform you know, reimagined for business
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Business Platform provides enterprise-grade tools for
                managing delivery operations at scale. Built for companies of
                any size, with dedicated support and seamless integrations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3 bg-[#014f86] text-white font-semibold rounded-lg hover:bg-[#003256] transition-all duration-300 cursor-pointer">
                  Get started
                </button>
                <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-all duration-300  cursor-pointer">
                  Check out our solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Partnership Benefits
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Everything you need to succeed in the delivery ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:scale-[1.02]"
              >
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                  <benefit.icon className={`w-12 h-12 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter-Based Carousel Section */}
      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Partner Network
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Explore businesses thriving on our platform across different
              industries
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#014f86] text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hidden md:block"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hidden md:block"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            >
              <div className="flex gap-6 px-2">
                {filteredPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-300 hover:scale-[1.02]"
                  >
                    {/* Partner Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                        {partner.category}
                      </div>
                    </div>

                    {/* Partner Info */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-4xl">{partner.logo}</div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {partner.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {partner.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">
                            {partner.stats.orders}
                          </span>
                          <span className="text-sm text-gray-500">orders</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">
                            {partner.stats.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${softNeutralBg}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our partner network today and unlock unlimited growth potential
            for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-[#014f86] text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-[#013f70] flex items-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Partners;
