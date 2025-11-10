"use client";

import {
  Globe,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import ScrollCardsEnhanced from "@/components/ScrollCards";

const SectionHeading = ({ title, subtitle, color = "text-gray-700" }: any) => (
  <div className="text-center mb-16">
    <h2 className={`text-4xl md:text-5xl font-extrabold ${color} mb-4`}>
      {title}
    </h2>
    <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const TrustCardSoft = ({ icon: Icon, iconColor, title, subtitle }: any) => (
  <div className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 relative">
    <Icon className={`w-16 h-16 ${iconColor} mx-auto mb-4 opacity-80`} />
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{subtitle}</p>
  </div>
);

const Page = () => {
  // --- Oceanic Blue Color Palette Definition ---
  const primaryBlue = "#014f86"; // Dark Blue for main accent (Primary)
  const secondaryBlue = "#2a6f97"; // Mid Blue for features/stats (Secondary)
  const tertiaryBlue = "#61a5c2"; // Light Blue for lighter accents/hovers
  const neutralBg = "bg-gray-50"; // Light Gray/Off-White for background
  const sectionBg = "bg-white"; // Pure White for clean separation

  // Tailwind Class mapping for dynamic use
  // const softPrimary = `text-[${primaryBlue}]`; // Primary text color
  // const softPrimaryBg = `bg-[${primaryBlue}]`; // Primary background color
  const softAccent = `bg-[${tertiaryBlue}]`; // Accent button background
  const softAccentText = `text-[${primaryBlue}]`; // Accent button text
  const softNeutralBg = neutralBg;
  const softSectionBg = sectionBg;
  const statGradient = "from-blue-400 to-cyan-500";
  const benefitBgGradient = "from-[#012a4a] to-[#01497c]";
  const benefitCheckColor = "text-cyan-300";

  const features = [
    {
      icon: <Globe className={`w-12 h-12 text-[${secondaryBlue}]`} />,
      title: "Global Reach",
      description:
        "Operating in 50+ countries across 6 continents, connecting millions of users worldwide.",
    },
    {
      icon: <Zap className={`w-12 h-12 text-[${secondaryBlue}]`} />,
      title: "Lightning Fast",
      description:
        "Advanced logistics technology ensuring rapid delivery times and real-time tracking.",
    },
    {
      icon: <Shield className={`w-12 h-12 text-[${secondaryBlue}]`} />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guaranteed for seamless operations.",
    },
    {
      icon: <Users className={`w-12 h-12 text-[${secondaryBlue}]`} />,
      title: "Partner Network",
      description:
        "Connected with 100,000+ restaurant partners delivering quality food experiences.",
    },
  ];

  const stats = [
    { number: "50M+", label: "Active Users" },
    { number: "100K+", label: "Restaurant Partners" },
    { number: "150+", label: "Cities Covered" },
    { number: "500M+", label: "Deliveries Completed" },
  ];

  const benefits = [
    "Multi-platform integration capabilities",
    "Real-time analytics and reporting",
    "Scalable infrastructure for growth",
    "24/7 dedicated support team",
    "Customizable delivery solutions",
    "Advanced route optimization",
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
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Light Particles */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjYwMCIgd2lkdGg9IjYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIyMDAiIHI9IjYiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEyIi8+PC9zdmc+')] opacity-40 z-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-30 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Seamless Global
            <span
              className={`block bg-linear-to-r ${statGradient} bg-clip-text text-transparent`}
            >
              Food Delivery Platform
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Empowering businesses worldwide with cutting-edge delivery
            technology and unmatched reliability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            {/* Primary Button: Tertiary Blue Accent Color */}
            <button
              className={`group px-8 py-4 ${softAccent} ${softAccentText} font-semibold rounded-xl hover:bg-[#89c2d9] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2`}
            >
              <span>Explore Our Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* Secondary Button: White/Transparent */}
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </section>

      <ScrollCardsEnhanced />

      {/* Stats Section */}
      <section className={`py-16 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl shadow-sm border border-gray-100 bg-white transform hover:scale-105 transition-transform duration-300"
              >
                {/* Stats Gradient: Blue/Cyan */}
                <div
                  className={`text-4xl md:text-5xl font-bold bg-linear-to-r ${statGradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Leading Businesses Choose Us"
            subtitle="Cutting-edge technology meets unparalleled service excellence"
            color="text-gray-800"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:-translate-y-2"
              >
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 text-cyan-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section: Dark Blue Gradient */}
      <section
        className={`py-20 bg-linear-to-br ${benefitBgGradient} text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGg3djFoLTd6bTAtNWg3djFoLTd6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Enterprise-Grade Solutions
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Built for scale, designed for excellence. Our platform delivers
                everything your business needs to thrive in the competitive food
                delivery landscape.
              </p>
              {/* Primary Button: White/Primary Blue */}
              <button
                className={`group px-8 py-4 bg-white text-[${primaryBlue}] font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2`}
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Benefit Checkmark: Cyan */}
                  <CheckCircle
                    className={`w-6 h-6 ${benefitCheckColor} shrink-0 mt-0.5`}
                  />
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={`py-20 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Trusted by Industry Leaders"
            subtitle="Powering growth for businesses worldwide"
            color="text-gray-800"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <TrustCardSoft
              icon={Award}
              iconColor="text-blue-400"
              title="Industry Recognition"
              subtitle="Awarded Best Delivery Platform 2024"
            />

            <TrustCardSoft
              icon={TrendingUp}
              iconColor="text-[#2c7da0]"
              title="Proven Growth"
              subtitle="300% average partner revenue increase"
            />

            <TrustCardSoft
              icon={Shield}
              iconColor="text-blue-400"
              title="Secure Platform"
              subtitle="ISO 27001 certified infrastructure"
            />
          </div>
        </div>
      </section>

      <section className={`py-20 ${softSectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                Feed your team.
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">
                Treat your talented team to their favourite meals. Let them
                pick! Explore **flexible corporate food delivery options** and
                tasty employee perks.
              </p>
              {/* CTA Button */}
              <button
                className={`group px-8 py-4 text-white font-bold rounded-xl bg-[${primaryBlue}] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 text-lg w-max`}
              >
                <span>Explore</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Content */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="w-full h-80 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1744871980466-8689987b2865?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600')",
                }}
              >
                {/* overlay a soft brand logo/text here */}
                <div className="p-4 bg-black/10 h-full flex items-center justify-center">
                  <p className="text-4xl font-bold text-white/90 drop-shadow-lg backdrop-blur-sm p-2 rounded">
                    Meals for Business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Note: Tailwind CSS arbitrary values [color_value] require a slight adjustment to the default format if they are complex. 
           For simplicity and to avoid common issues, I've used direct hex values in the template literal for background/text. */

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
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
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

export default Page;
