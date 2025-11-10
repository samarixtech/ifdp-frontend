"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Locale {
  country: string;
  language: string;
  ip: string | null;
  loading: boolean;
}

export default function useLocale(): Locale {
  const [language, setLanguage] = useState<string>("en"); 
  const [ip, setIP] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocale() {
      try {
        const browserLang = navigator.language?.split("-")[0] || "en";
        console.log(browserLang,"browserLang")
        setLanguage(browserLang);
        const res = await axios.get("http://ip-api.com/json");
        if (res.data?.status === "success") {
          setIP(res.data.query || null);
          setCountry(res.data.countryCode || "");
          console.log("IP:", res.data.query);
          console.log("Country:", res.data.country);
        } else {
          console.warn("IP API failed:", res.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch locale:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLocale();
  }, []);

  return { country, language, ip, loading };
}
