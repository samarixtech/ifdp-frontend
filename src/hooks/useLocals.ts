// hooks/useLocale.ts - Updated version
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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchLocale() {
      try {
        // Get browser language
        const browserLang = navigator.language?.split("-")[0] || "en";
        setLanguage(browserLang);

        // Fetch IP location data
        const res = await axios.get<IPApiData>("http://ip-api.com/json", {
          timeout: 10000,
        });

        if (res.data?.status === "success") {
          setIP(res.data.query || null);
          setCountry(res.data.country || "");
          setCountryCode(res.data.countryCode || "");
          setRegion(res.data.regionName || res.data.region || "");
          setCity(res.data.city || "");
          setZip(res.data.zip || "");
          setLatitude(res.data.lat || 0);
          setLongitude(res.data.lon || 0);

          console.log("Location data:", {
            city: res.data.city,
            region: res.data.regionName,
            lat: res.data.lat,
            lon: res.data.lon,
          });
        } else {
          setError(res.data?.message || "Failed to get location");
          console.warn("IP API failed:", res.data?.message);
        }
      } catch (err: any) {
        console.error("Failed to fetch locale:", err);
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchLocale();
  }, []);

  return {
    country,
    countryCode,
    region,
    city,
    zip,
    latitude,
    longitude,
    language,
    ip,
    loading,
    error,
  };
}
