"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface IPApiData {
  status: "success" | "fail";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
  message?: string;
}

interface Locale {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  language: string;
  dir: "rtl" | "ltr";
  ip: string | null;
  loading: boolean;
  error?: string;
}

export default function useLocale(): Locale {
  const [language, setLanguage] = useState<string>("en");
  const [ip, setIP] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [dir, setDir] = useState<"rtl" | "ltr">("ltr");
  const [error, setError] = useState<string>("");

  // ---------- Country → Language Mapping ----------
  const countryToLanguage: Record<string, string> = {
    PK: "en",
    IN: "en",
    IQ: "ar",
    SA: "ar",
    AE: "ar",
    JO: "ar",
    TR: "tr",
  };

  useEffect(() => {
    async function fetchLocale() {
      console.log("🌍 Fetching locale from IP API...");

      try {
        const res = await axios.get<IPApiData>("http://ip-api.com/json", {
          timeout: 10000,
        });

        // // FOR IRAQ
        // const res = {
        //   data: {
        //     AS: "AS17557 Iraq Telecom Company Limited",
        //     city: "Baghdad",
        //     country: "Iraq",
        //     countryCode: "IQ",
        //     language: "ar",
        //     dir: "rtl",
        //     isp: "Iraq Telecom Company Limited",
        //     lat: 33.3152,
        //     lon: 44.3661,
        //     org: "Iraq National Telecom Project",
        //     query: "62.201.252.0/23",
        //     region: "BG",
        //     regionName: "Baghdad Governorate",
        //     status: "success",
        //     timezone: "Asia/Baghdad",
        //     zip: "10001",
        //     message: "hh",
        //   },
        // };

        // // FOR PAKISTAN
        // const res = {
        //   data: {
        //     AS: "AS45595 Pakistan Telecommunication Company Limited",
        //     city: "Hyderabad",
        //     country: "Pakistan",
        //     countryCode: "PK",
        //     language: "en", // English is a common official language
        //     dir: "ltr", // Left-to-right for English
        //     isp: "Pakistan Telecommunication Company Limited",
        //     lat: 25.3963, // Latitude for Hyderabad, Sindh
        //     lon: 68.3578, // Longitude for Hyderabad, Sindh
        //     org: "Pakistan Telecommunication Company Limited", // Example Organization
        //     query: "119.150.150.0/24", // Example IP range
        //     region: "SD", // Region code for Sindh
        //     regionName: "Sindh",
        //     status: "success",
        //     timezone: "Asia/Karachi", // Same timezone as Hyderabad, PK
        //     zip: "71000", // Example postal code for Hyderabad
        //     message: "hh",
        //   },
        // };

        console.log("📥 Raw API Response:", res.data);

        if (res.data?.status === "success") {
          setIP(res.data.query || null);
          setCountry(res.data.country || "");
          setCountryCode(res.data.countryCode || "");
          setRegion(res.data.regionName || res.data.region || "");
          setCity(res.data.city || "");
          setZip(res.data.zip || "");
          setLatitude(res.data.lat || 0);
          setLongitude(res.data.lon || 0);

          console.log("🗺 Location Details:", {
            country: res.data.country,
            countryCode: res.data.countryCode,
            region: res.data.regionName,
            city: res.data.city,
            zip: res.data.zip,
            lat: res.data.lat,
            lon: res.data.lon,
          });

          // ---------- Auto Language ----------
          const autoLang = countryToLanguage[res.data.countryCode];

          setLanguage(autoLang);
          console.log("🌐 Auto-selected language:", autoLang);

          // ---------- RTL / LTR ----------
          const direction = autoLang === "ar" ? "rtl" : "ltr";
          setDir(direction);
          console.log("↔ Text direction:", direction);
        } else {
          setError(res.data?.message || "Failed to get location");
          console.warn("⚠ IP API failed:", res.data?.message);
        }
      } catch (err: any) {
        console.error("❌ Failed to fetch locale:", err);
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
        console.log("✅ Locale detection finished");
      }
    }

    fetchLocale();
  }, []);

  console.log("📤 Final Locale State Returned:", {
    country,
    countryCode,
    region,
    city,
    zip,
    latitude,
    longitude,
    language,
    dir,
    ip,
    loading,
    error,
  });

  return {
    country,
    countryCode,
    region,
    city,
    zip,
    latitude,
    longitude,
    language,
    dir,
    ip,
    loading,
    error,
  };
}
