"use client";

import React, { useRef, useEffect, useState, JSX } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Globe, Shield, Zap, Users } from "lucide-react";
import { useTranslations } from "next-intl";

// TYPE INTERFACE FOR CARD COMPOPNENT
interface CardData {
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
}

const ScrollCards: React.FC = () => {
  const t = useTranslations("Home.scroll_cards");

  // DATA FOR ROW 1 CARDS
  const horizontalCardsRow1 = [
    {
      icon: <Globe className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.reach.title"),
      description: t("cards.reach.description"),
      image: "/delivery1.webp",
    },
    {
      icon: <Zap className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.fast.title"),
      description: t("cards.fast.description"),
      image: "/delivery2.webp",
    },
    {
      icon: <Shield className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.secure.title"),
      description: t("cards.secure.description"),
      image: "/delivery3.webp",
    },
    {
      icon: <Users className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.network.title"),
      description: t("cards.network.description"),
      image: "/delivery4.webp",
    },
  ];

  // DATA FOR ROW 2 CARDS
  const horizontalCardsRow2 = [
    {
      icon: <Globe className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.eco_friendly.title"),
      description: t("cards.eco_friendly.description"),
      image: "/delivery4.webp",
    },
    {
      icon: <Zap className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.support.title"),
      description: t("cards.support.description"),
      image: "/delivery3.webp",
    },
    {
      icon: <Shield className="w-9 h-9 text-[#0B5D4E]" />,
      title: t("cards.custom.title"),
      description: t("cards.custom.description"),
      image: "/delivery2.webp",
    },
    {
      icon: <Users className="w-9 h-9 text-[#0B5D4E]" />,
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

  // Card Component
  const renderCard = (card: CardData) => (
    <motion.div
      key={card.title}
      className="w-full sm:w-[360px] h-[380px] bg-[#e8f4f187] rounded-2xl transition-all duration-500 border-2 border-[#0B5D4E] shrink-0 overflow-hidden group hover:border-[#0B5D4E]"
    >
      {/* Image Section */}
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

      {/* Content Section */}
      <div className="p-6 h-[180px] flex flex-col justify-start">
        <div className="mb-3">
          <div className="p-3  text-white rounded-full inline-block transition-colors duration-300 group-hover:bg-yellow-100">
            {card.icon}
          </div>
        </div>
        {/* Heading*/}
        <h3 className="text-2xl font-[#2C2C2C] mb-1 text-[#0B5D4E] transition-colors duration-300 group-hover:text-[#B6932F]">
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
        <h2 className="text-5xl font-extrabold text-center mb-20 text-[#0B5D4E]">
          <span className="text-[#0B5D4E]">{t("header.title_accent")}</span>{" "}
          {t("header.title_static")}
        </h2>
      </div>

      {/* Row 1: Scrolls Left */}
      <div className="relative overflow-hidden mb-12">
        <motion.div
          ref={containerRef1}
          style={{ x: x1 }}
          className="flex gap-12 px-12"
        >
          {horizontalCardsRow1.map(renderCard)}
        </motion.div>
      </div>

      {/* Row 2: Scrolls Right */}
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

export default ScrollCards;
