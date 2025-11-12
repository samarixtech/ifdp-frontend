"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Globe, Shield, Zap, Users } from "lucide-react";

const horizontalCardsRow1 = [
  {
    icon: <Globe className="w-9 h-9 text-blue-600" />,
    title: "Global Reach",
    description:
      "Operating in 50+ countries across 6 continents. This description is intentionally a bit longer to test the ellipsis functionality and ensure it properly clips after three lines of text.",
    image: "/delivery1.webp",
  },
  {
    icon: <Zap className="w-9 h-9 text-blue-600" />,
    title: "Lightning Fast",
    description:
      "Rapid delivery times and real-time tracking, powered by our next-generation proprietary routing algorithms. We guarantee speed.",
    image: "/delivery2.webp",
  },
  {
    icon: <Shield className="w-9 h-9 text-blue-600" />,
    title: "Secure & Reliable",
    description:
      "99.9% uptime guaranteed and enterprise-grade security. Our infrastructure is fortified against any disruptions to ensure continuous service.",
    image: "/delivery3.webp",
  },
  {
    icon: <Users className="w-9 h-9 text-blue-600" />,
    title: "Partner Network",
    description:
      "100,000+ restaurant partners worldwide, offering an unparalleled selection of cuisines from Michelin-starred chefs to local favorites.",
    image: "/delivery4.webp",
  },
];

const horizontalCardsRow2 = [
  {
    icon: <Globe className="w-9 h-9 text-blue-600" />,
    title: "Eco-Friendly",
    description:
      "Sustainable delivery solutions for a greener planet. We are committed to reducing our carbon footprint with electric vehicles and optimized routes.",
    image: "/delivery4.webp",
  },
  {
    icon: <Zap className="w-9 h-9 text-blue-600" />,
    title: "24/7 Support",
    description:
      "Dedicated support for all your business needs, available around the clock. Our team is ready to assist you anytime, anywhere.",
    image: "/delivery3.webp",
  },
  {
    icon: <Shield className="w-9 h-9 text-blue-600" />,
    title: "Custom Solutions",
    description:
      "Tailored solutions for your unique business model. From corporate catering to complex logistics, we adapt to your requirements.",
    image: "/delivery2.webp",
  },
  {
    icon: <Users className="w-9 h-9 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Real-time insights for smarter decisions. Leverage our data dashboards to optimize your delivery performance and customer satisfaction.",
    image: "/delivery1.webp",
  },
];

const ScrollCardsEnhanced: React.FC = () => {
  const scrollY = useMotionValue(0);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [maxScroll1, setMaxScroll1] = useState(0);
  const [maxScroll2, setMaxScroll2] = useState(0);

  const SCROLL_START = 300;
  const SCROLL_END = 1500;

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const calculateMaxScroll = () => {
      const OFFSET_ADJUSTMENT = 144;

      if (containerRef1.current) {
        const offset =
          containerRef1.current.scrollWidth -
          containerRef1.current.offsetWidth +
          OFFSET_ADJUSTMENT;
        setMaxScroll1(offset);
      }
      if (containerRef2.current) {
        const offset =
          containerRef2.current.scrollWidth -
          containerRef2.current.offsetWidth +
          OFFSET_ADJUSTMENT;
        setMaxScroll2(offset);
      }
    };

    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);
    return () => window.removeEventListener("resize", calculateMaxScroll);
  }, []);

  const rawX1 = useTransform(
    scrollY,
    [SCROLL_START, SCROLL_END],
    [0, -maxScroll1]
  );
  const rawX2 = useTransform(
    scrollY,
    [SCROLL_START, SCROLL_END],
    [-maxScroll2, 0]
  );

  const SPRING_CONFIG = { damping: 15, stiffness: 100 };

  const x1 = useSpring(rawX1, SPRING_CONFIG);
  const x2 = useSpring(rawX2, SPRING_CONFIG);

  // --- Card Component ---
  const renderCard = (card: any) => (
    <motion.div
      key={card.title}
      className="w-full sm:w-[360px] h-[380px] bg-white rounded-2xl transition-all duration-500 border-2 border-blue-100 flex-shrink-0 overflow-hidden group hover:border-blue-600"
    >
      {/* Image Section - Constrained height (Next/Image implementation) */}
      <div className="h-40 overflow-hidden relative">
        <Image
          src={card.image}
          alt={card.title}
          fill={true}
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 360px"
          priority={true}
        />
      </div>

      {/* Content Section - FIX: Increased padding on Icon wrapper for better visual balance */}
      <div className="p-6 h-[180px] flex flex-col justify-start">
        <div className="mb-3">
          {/* FIX: Increased icon container padding from p-1 back to p-3 for better visual hierarchy */}
          <div className="p-3 bg-blue-50 rounded-full inline-block transition-colors duration-300 group-hover:bg-blue-200">
            {card.icon}
          </div>
        </div>
        {/* Heading remains bold and large */}
        <h3 className="text-2xl font-black mb-1 text-blue-900 transition-colors duration-300 group-hover:text-blue-700">
          {card.title}
        </h3>

        {/* Description with Multi-line Ellipsis */}
        <p
          className="text-base text-gray-600 leading-snug"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {card.description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-32 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-20 text-blue-900">
          <span className="text-blue-600">Global</span> Excellence, Delivered 🌐
        </h2>
      </div>

      {/* Row 1: Scrolls Left (Normal) */}
      <div className="relative overflow-hidden mb-12">
        <motion.div
          ref={containerRef1}
          style={{ x: x1 }}
          className="flex gap-12 px-12"
        >
          {horizontalCardsRow1.map(renderCard)}
        </motion.div>
      </div>

      {/* Row 2: Scrolls Right (Reverse) */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef2}
          style={{ x: x2 }}
          className="flex gap-12 px-12"
        >
          {horizontalCardsRow2.map(renderCard)}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollCardsEnhanced;
