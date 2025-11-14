"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import SidebarFilters from "./SidebarFilters";
import Home from "./Home";
import { useRouter, useParams } from "next/navigation";
import { getCookie } from "cookies-next";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [countryData, setCountryData] = useState<{ name: string; currency: string } | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      // Normalize country
      let country = params?.country;
      if (Array.isArray(country)) country = country[0];
      if (!country) country = getCookie("NEXT_COUNTRY") as string || "US";

      // Normalize language
      let lang = params?.language;
      if (Array.isArray(lang)) lang = lang[0];
      if (!lang) lang = getCookie("NEXT_LOCALE") as string || "en";

      // ✅ GET CURRENCY FROM COOKIE
      const currency = (getCookie("NEXT_CURRENCY") as string) || "$";

      // Save info
      const data = { 
        name: country.toString().toUpperCase(),
        currency: currency 
      };

      setCountryData(data);
      setLanguage(lang);
    };

    fetchData();
  }, [params?.country, params?.language]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 sticky top-24 self-start">
            <SidebarFilters />
          </div>

          <div className="w-full lg:max-w-5xl">
            <Home />
          </div>
        </div>
      </div>

      {/* SHOW COUNTRY + LANGUAGE + CURRENCY */}
      <footer className="bg-gray-200 py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>
            Country: {countryData?.name} | Language: {language} | Currency: {countryData?.currency}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
