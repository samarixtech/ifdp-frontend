"use client";

import React, { useRef, useEffect, useState, JSX } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Globe, Shield, Zap, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface CardData {
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
}

const ScrollCards: React.FC = () => {
  const t = useTranslations("Home.scroll_cards");

  const horizontalCardsRow1: CardData[] = [
    {
      icon: <Globe className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.reach.title"),
      description: t("cards.reach.description"),
      image: "/delivery1.webp",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.fast.title"),
      description: t("cards.fast.description"),
      image: "/delivery2.webp",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.secure.title"),
      description: t("cards.secure.description"),
      image: "/delivery3.webp",
    },
    {
      icon: <Users className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.network.title"),
      description: t("cards.network.description"),
      image: "/delivery4.webp",
    },
  ];

  const horizontalCardsRow2: CardData[] = [
    {
      icon: <Globe className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.eco_friendly.title"),
      description: t("cards.eco_friendly.description"),
      image: "/delivery4.webp",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.support.title"),
      description: t("cards.support.description"),
      image: "/delivery3.webp",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.custom.title"),
      description: t("cards.custom.description"),
      image: "/delivery2.webp",
    },
    {
      icon: <Users className="w-8 h-8 text-[#0B5D4E]" />,
      title: t("cards.analytics.title"),
      description: t("cards.analytics.description"),
      image: "/delivery1.webp",
    },
  ];

  const scrollY = useMotionValue(0);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [maxScroll1, setMaxScroll1] = useState(0);
  const [maxScroll2, setMaxScroll2] = useState(0);

  const SCROLL_START = 200;
  const SCROLL_END = 1200;

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const calculateMaxScroll = () => {
      const OFFSET_ADJUSTMENT = 100;
      if (containerRef1.current) {
        const offset =
          containerRef1.current.scrollWidth - containerRef1.current.offsetWidth + OFFSET_ADJUSTMENT;
        setMaxScroll1(offset);
      }
      if (containerRef2.current) {
        const offset =
          containerRef2.current.scrollWidth - containerRef2.current.offsetWidth + OFFSET_ADJUSTMENT;
        setMaxScroll2(offset);
      }
    };
    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);
    return () => window.removeEventListener("resize", calculateMaxScroll);
  }, []);

  const rawX1 = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, -maxScroll1]);
  const rawX2 = useTransform(scrollY, [SCROLL_START, SCROLL_END], [-maxScroll2, 0]);
  const SPRING_CONFIG = { damping: 20, stiffness: 120 };
  const x1 = useSpring(rawX1, SPRING_CONFIG);
  const x2 = useSpring(rawX2, SPRING_CONFIG);

  const renderCard = (card: CardData) => (
    <motion.div
      key={card.title}
      className="flex-shrink-0 w-[280px] my-5 sm:w-[320px] md:w-[340px] lg:w-[360px] h-[380px] bg-white/50 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden group cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <div className="h-40 relative overflow-hidden rounded-t-3xl">
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col justify-between h-[180px]">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-white/30 rounded-full text-[#0B5D4E] shadow-inner group-hover:bg-yellow-100 transition-colors duration-300">
            {card.icon}
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
            {card.title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-16 text-[#0B5D4E]">
          <span>{t("header.title_accent")}</span> {t("header.title_static")}
        </h2>
      </div>

      {/* Row 1: Scroll Left */}
      <div className="relative overflow-hidden">
        <motion.div ref={containerRef1} style={{ x: x1 }} className="flex gap-6 px-6 sm:px-10">
          {horizontalCardsRow1.map(renderCard)}
        </motion.div>
      </div>

      {/* Row 2: Scroll Right */}
      <div className="relative overflow-hidden mt-10">
        <motion.div ref={containerRef2} style={{ x: x2 }} className="flex gap-6 px-6 sm:px-10">
          {horizontalCardsRow2.map(renderCard)}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollCards;
