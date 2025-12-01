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
import ScrollCards from "@/components/ScrollCards";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

const SectionHeading = ({ title, subtitle, color = "text-gray-700" }: any) => (
  <div className="text-center mb-16">
    <h2 className={`text-4xl md:text-5xl font-extrabold ${color} mb-4`}>
      {title}
    </h2>
    <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const TrustCardSoft = ({ icon: Icon, iconColor, title, subtitle }: any) => (
  <div className="bg-[#E8F4F1] p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 border border-[#FFF9EE] transform hover:-translate-y-1 relative">
    <Icon className={`w-16 h-16 ${iconColor} mx-auto mb-4 opacity-80`} />
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{subtitle}</p>
  </div>
);

const Page = () => {
  const t = useTranslations("Home");

  // Oceanic yellow Color Palette Definition (No change)
  const primaryyellow = "#0B5D4E"; // Dark yellow for main accent (Primary)
  const secondaryyellow = "#B6932F "; // Mid yellow for features/stats (Secondary)
  const tertiaryyellow = "#B6932F "; // Light yellow for lighter accents/hovers
  const neutralBg = "bg-gray-50"; // Light Gray/Off-[#E8F4F1] for background
  const sectionBg = "bg-[#E8F4F1]"; // Pure [#E8F4F1] for clean separation

  // Tailwind Class mapping for dynamic use
  const softAccent = `bg-[${tertiaryyellow}]`; // Accent button background
  const softAccentText = `text-[${primaryyellow}]`; // Accent button text
  const softNeutralBg = neutralBg;
  const softSectionBg = sectionBg;
  const statGradient = "from-yellow-400 to-yellow-500";
  const benefitBgGradient = "from-[#B6932F] to-[#0B5D4E]";
  const benefitCheckColor = "text-yellow-300";

  const features = [
    {
      icon: <Globe className={`w-12 h-12 text-[${secondaryyellow}]`} />,
      titleKey: "feature_global_title",
      descriptionKey: "feature_global_desc",
    },
    {
      icon: <Zap className={`w-12 h-12 text-[${secondaryyellow}]`} />,
      titleKey: "feature_fast_title",
      descriptionKey: "feature_fast_desc",
    },
    {
      icon: <Shield className={`w-12 h-12 text-[${secondaryyellow}]`} />,
      titleKey: "feature_secure_title",
      descriptionKey: "feature_secure_desc",
    },
    {
      icon: <Users className={`w-12 h-12 text-[${secondaryyellow}]`} />,
      titleKey: "feature_network_title",
      descriptionKey: "feature_network_desc",
    },
  ];

  const stats = [
    { number: "50M+", labelKey: "stat_users" },
    { number: "100K+", labelKey: "stat_partners" },
    { number: "150+", labelKey: "stat_cities" },
    { number: "500M+", labelKey: "stat_deliveries" },
  ];

  const benefitKeys = [
    "benefit_1",
    "benefit_2",
    "benefit_3",
    "benefit_4",
    "benefit_5",
    "benefit_6",
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${softNeutralBg}`}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Image and Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
            }}
          ></div>

          <div className="absolute inset-0 bg-[#2C2C2C]/20 z-10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-40 z-20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-30 text-center text-[#E8F4F1]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              {t("hero_title_p1")}
              <span
                className={`block bg-linear-to-r ${statGradient} bg-clip-text text-transparent`}
              >
                {t("hero_title_p2")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-[#E8F4F1]/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              {/* Primary Button */}
              <button
                className={`group px-8 py-4 font-semibold rounded-xl bg-[#B6932F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2`}
              >
                <span>{t("hero_cta_explore")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Secondary Button */}
              <button className="px-8 py-4 bg-transparent border-2 border-[#E8F4F1] text-[#E8F4F1] font-semibold rounded-xl hover:bg-[#E8F4F1]/10 transition-all duration-300 backdrop-blur-sm">
                {t("hero_cta_demo")}
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

        <ScrollCards />

        {/* Stats Section */}
        {/* <section className={`py-16 ${softNeutralBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl shadow-sm border border-[#FFF9EE] bg-[#E8F4F1] transform hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`text-4xl md:text-5xl font-bold bg-linear-to-r ${statGradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

        {/* Features Section */}
        <section className={`py-20 ${softSectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t("features_heading")}
              subtitle={t("features_subheading")}
              color="text-gray-800"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-[#E8F4F1] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFF9EE] hover:border-yellow-300 hover:-translate-y-2"
                >
                  <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 text-yellow-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section: Dark yellow Gradient */}
        <section
          className={`py-10 bg-linear-to-br bg-[#E8F4F1]  text-black relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t("benefits_heading")} {/* Translated */}
                </h2>
                <p className="text-xl text-yellow-500 mb-8">
                  {t("benefits_subheading")} {/* Translated */}
                </p>
                {/* Primary Button: [#E8F4F1]/Primary yellow */}
                <button
                  className={`group px-8 py-4 text-white  font-semibold rounded-xl bg-[#0B5D4E] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2`}
                >
                  <span>{t("benefits_cta_learn")}</span> {/* Translated */}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="space-y-4">
                {benefitKeys.map((key, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-[#E8F4F1]/10 backdrop-blur-sm p-4 rounded-xl hover:bg-[#E8F4F1]/20 transition-all duration-300 animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Benefit Checkmark: yellow (No change) */}
                    <CheckCircle
                      className={`w-6 h-6 ${benefitCheckColor} shrink-0 mt-0.5`}
                    />
                    <span className="text-lg font-medium">{t(key)}</span>{" "}
                    {/* Translated */}
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
              title={t("trust_heading")} // Translated
              subtitle={t("trust_subheading")} // Translated
              color="text-gray-800"
            />

            <div className="grid md:grid-cols-3 gap-8">
              <TrustCardSoft
                icon={Award}
                iconColor="text-yellow-400"
                title={t("trust_card_1_title")} // Translated
                subtitle={t("trust_card_1_subtitle")} // Translated
              />

              <TrustCardSoft
                icon={TrendingUp}
                iconColor="text-[#0B5D4E]"
                title={t("trust_card_2_title")} // Translated
                subtitle={t("trust_card_2_subtitle")} // Translated
              />

              <TrustCardSoft
                icon={Shield}
                iconColor="text-yellow-400"
                title={t("trust_card_3_title")} // Translated
                subtitle={t("trust_card_3_subtitle")} // Translated
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
                  {t("corporate_heading")} {/* Translated */}
                </h2>
                <p className="text-xl text-gray-600 max-w-lg">
                  {t("corporate_subtitle")} {/* Translated */}
                </p>
                {/* CTA Button */}
                <button
                  className={`group px-8 py-4 text-[#E8F4F1] font-bold rounded-xl bg-[${primaryyellow}] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 text-lg w-max`}
                >
                  <span>{t("corporate_cta")}</span> {/* Translated */}
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
                  <div className="p-4 bg-[#2C2C2C]/10 h-full flex items-center justify-center">
                    <p className="text-4xl font-bold text-[#E8F4F1]/90 drop-shadow-lg backdrop-blur-sm p-2 rounded">
                      {t("corporate_image_label")} {/* Translated */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style block (No change) */}
        <style jsx>{`
          /* ... CSS Animations (No Change) ... */
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
    </>
  );
};

export default Page;
