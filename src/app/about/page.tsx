"use client";
import { useEffect, useRef } from "react";
import {
  Briefcase,
  Compass,
  Users,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

// Assuming these components are available in the scope:
const SectionHeading = ({ title, subtitle, color = "text-gray-700" }: any) => (
  <div className="text-center mb-16">
    <h2 className={`text-4xl md:text-5xl font-extrabold ${color} mb-4`}>
      {title}
    </h2>
    <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

// --- 🌟 ENHANCED AND STYLIZED SPLIT CARD COMPONENT 🌟 ---
const SplitCultureCard = ({
  icon: Icon,
  title,
  description,
  color,
  image,
  buttonText = "Learn More",
}: any) => (
  <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 md:p-10 h-full w-full md:w-280 shrink-0">
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
      {/* Left Side: Content */}
      <div className="space-y-4 max-h-112 overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-start space-x-3 mb-4">
            <Icon className={`w-10 h-10 ${color} shrink-0 mt-1`} />
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h3>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed line-clamp-5">
            {description}
          </p>
        </div>
        <button
          className={`mt-6 px-7 py-3 text-base font-bold rounded-xl text-white transition-all duration-300 ${color.replace(
            "text-",
            "bg-"
          )} hover:bg-opacity-80 shadow-lg`}
        >
          {buttonText}
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
        />
      </div>
    </div>
  </div>
);

// DYNAMIC CARD SLIDER CONTAINER
const CardSliderContainer = ({ children }: any) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollInterval: any;

    const getScrollAmount = () => {
      const card = container.querySelector(".flex-shrink-0");
      if (!card) return 0;

      return card.offsetWidth + 32;
    };

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        const cardWidth = getScrollAmount();
        if (cardWidth === 0) return;

        const nextScrollLeft = container.scrollLeft + cardWidth;

        // Check for loop condition (near the end of content)
        if (
          nextScrollLeft >
          container.scrollWidth - container.clientWidth + 1
        ) {
          // Smoothly reset to the beginning
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll one card width
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, 5000); // Scroll every 5 seconds
    };

    const stopScroll = () => clearInterval(scrollInterval);

    startScroll();
    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div className="max-w-full overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-x-scroll scrollbar-hide scroll-smooth py-4 -my-4"
      >
        <div className="inline-flex gap-8 px-4 sm:px-6 lg:px-8 xl:justify-center xl:w-full">
          {children}
        </div>
        <style jsx>{`
          /* Custom scrollbar hide */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </div>
    </div>
  );
};

const AboutPage = () => {
  // Oceanic Blue Color Palette Definition
  const primaryBlue = "#014f86";
  const softPrimaryText = `text-[${primaryBlue}]`;
  const softAccent = `bg-[${"#61a5c2"}]`; // tertiaryBlue
  const softAccentText = `text-[${"#014f86"}]`; // primaryBlue
  const softNeutralBg = "bg-gray-50";
  const softSectionBg = "bg-white";
  const statGradient = "from-blue-400 to-cyan-500";

  // Data for About Page Sections
  const coreValues = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push the boundaries of logistics technology to deliver smarter solutions.",
      color: "text-blue-500",
    },
    {
      icon: HeartHandshake,
      title: "Partnership",
      description:
        "Success is mutual. We build strong, transparent relationships with our restaurants and users.",
      color: "text-cyan-500",
    },
    {
      icon: Briefcase,
      title: "Excellence",
      description:
        "Striving for the highest quality in service delivery, security, and platform reliability.",
      color: softPrimaryText,
    },
    {
      icon: Compass,
      title: "Global Vision",
      description:
        "Connecting cultures and cuisines across continents with responsible and scalable growth.",
      color: "text-indigo-400",
    },
  ];

  // Data for Slider Cards
  const splitCultureCards = [
    {
      icon: Users,
      title: "Collaborative Spirit",
      description:
        "Work alongside brilliant minds in a supportive and fun environment where every voice matters. We foster a flat hierarchy where open discussion drives the best ideas, ensuring true product ownership.",
      color: "text-blue-600",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      buttonText: "Meet the Teams",
    },
    {
      icon: TrendingUp,
      title: "Unstoppable Growth",
      description:
        "Dedicated budget for professional development, training, and internal promotion paths. Your ambition is our roadmap—we invest heavily in our people's future with clear advancement tracks.",
      color: "text-cyan-600",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      buttonText: "Our Career Paths",
    },
    {
      icon: Lightbulb,
      title: "Empowered Innovation",
      description:
        "We encourage daring ideas and provide the resources for you to bring your most ambitious projects to life, backed by a culture that embraces smart risk-taking and learning from failures.",
      color: softPrimaryText,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      buttonText: "Submit Your Idea",
    },
    {
      icon: HeartHandshake,
      title: "True Flexibility",
      description:
        "Enjoy hybrid and remote options that respect your life outside of work, ensuring true work-life balance and prioritizing output over clock-watching. We trust our team.",
      color: softPrimaryText,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      buttonText: "See Benefits",
    },
    // Duplicating the first card to ensure seamless loop visual continuity
    {
      icon: Users,
      title: "Collaborative Spirit",
      description:
        "Work alongside brilliant minds in a supportive and fun environment where every voice matters. We foster a flat hierarchy where open discussion drives the best ideas, ensuring true product ownership.",
      color: softPrimaryText,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      buttonText: "Meet the Teams",
    },
  ];

  return (
    <div className={`min-h-screen ${softNeutralBg}`}>
      {/* 🚀 Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1762652847337-d0bb9764308b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600')",
          }}
        ></div>

        {/* Overlay - Darker for readability */}
        <div className="absolute inset-0 bg-black/25 z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 z-20 text-center text-white">
          <p className="text-lg font-semibold text-cyan-300 mb-3 uppercase tracking-wider animate-fade-in-up">
            Our Mission
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            The Engine Behind
            <span
              className={`block bg-linear-to-r ${statGradient} bg-clip-text text-transparent`}
            >
              Global Cuisine
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Connecting every craving to every kitchen, seamlessly, securely, and
            at lightning speed.
          </p>
          {/* CTA Button */}
          <button
            className={`group px-8 py-4 ${softAccent} ${softAccentText} font-semibold rounded-xl hover:bg-[#89c2d9] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 mx-auto w-max animate-fade-in-up animation-delay-400`}
          >
            <span>See Our Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* --- */}
      {/* 📖 About Story Section */}
      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="w-full h-96 bg-cover bg-center transition-transform duration-500 hover:scale-[1.03]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1762652847337-d0bb9764308b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600 ')",
                }}
              ></div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Our Origin Story
              </h2>
              <p className="text-lg text-gray-600">
                Founded in 2018 by a team of logistics experts and food-tech
                enthusiasts, our company was born out of a simple idea: **food
                delivery should be seamless, reliable, and truly global.** We
                noticed the fragmentation in the market and built a platform to
                bridge that gap.
              </p>
              <p className="text-lg font-medium text-gray-700 border-l-4 border-cyan-400 pl-4">
                We dont just move meals; we connect communities, empower local
                businesses, and define the future of food logistics.
              </p>
              <p className="text-lg text-gray-600">
                Today, were a leading enterprise solution, trusted by thousands
                of restaurants to handle millions of transactions, continuously
                innovating to make delivery faster, greener, and more efficient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}
      {/* ✨ Core Values/Features Section */}
      <section className={`py-20 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Defining Our Culture: Core Values"
            subtitle="The principles that guide our innovation and our commitment to our partners and users."
            color="text-gray-800"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:scale-[1.02]"
              >
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                  <value.icon className={`w-12 h-12 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- */}
      {/* 🤝 Why Join Our Team Section (Split Card Slider - CENTERED and ENHANCED) */}
      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Build the Future with Us"
            subtitle="Explore the culture and benefits that make our company a great place to grow your career."
            color="text-gray-800"
          />
        </div>

        <div className="relative">
          <CardSliderContainer>
            {splitCultureCards.map((card, index) => (
              // The w-full md:w-[70rem] class on this div dictates the size
              <div key={index} className="w-full md:w-[70rem] flex-shrink-0">
                <SplitCultureCard {...card} />
              </div>
            ))}
          </CardSliderContainer>
          {/* Fading overlay for scroll effect hint (optional) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/90 to-transparent z-10 hidden sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/90 to-transparent z-10 hidden sm:block" />
        </div>
      </section>

      {/* --- */}
      {/* 💼 Join The Team CTA (Image on Right, Description on Left) */}
      <section className={`py-20 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content (Left) */}
            <div className="space-y-6">
              <p
                className={`text-lg font-semibold ${softPrimaryText} uppercase tracking-wider`}
              >
                Career Opportunities
              </p>
              <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                Ready to make an impact?
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">
                Join a dynamic team that values **innovation, excellence, and
                bold thinking**. We are looking for passionate individuals ready
                to tackle complex challenges and redefine global delivery. Check
                out our open positions.
              </p>
              {/* CTA Button */}
              <button
                className={`group px-8 py-4 text-white font-bold rounded-xl bg-[${primaryBlue}] transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-[#013f70] flex items-center justify-center space-x-2 text-lg w-max`}
              >
                <span>View Open Roles</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Content (Right) */}
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:shadow-inner transition-shadow duration-500">
              <div
                className="w-full h-96 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop')",
                }}
              >
                {/* Subtle dark overlay */}
                <div className="p-4 bg-black/15 h-full flex items-end justify-start">
                  <p className="text-4xl font-bold text-white/95 drop-shadow-lg backdrop-blur-sm p-3 rounded-lg border-2 border-white/30">
                    Your Next Chapter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusing existing animations from the provided code for the Hero section */}
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
      `}</style>
    </div>
  );
};

export default AboutPage;
