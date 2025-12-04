// hooks/useAutoLocation.ts
"use client";

import { useState, useEffect } from "react";
import useLocale from "./useLocals";

interface AutoLocationData {
  city: string;
  area: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  loading: boolean;
  error: string;
}

export function useAutoLocation() {
  const locale = useLocale();
  const [data, setData] = useState<AutoLocationData>({
    city: "",
    area: "",
    latitude: "",
    longitude: "",
    postalCode: "",
    loading: true,
    error: "",
  });

  useEffect(() => {
    if (!locale.loading) {
      if (locale.error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: locale.error || "Failed to detect location",
        }));
      } else if (locale.city && locale.latitude && locale.longitude) {
        setData({
          city: locale.city,
          area: locale.region || locale.city,
          latitude: locale.latitude.toString(),
          longitude: locale.longitude.toString(),
          postalCode: locale.zip || "",
          loading: false,
          error: "",
        });

        console.log("Auto-location data:", {
          city: locale.city,
          area: locale.region,
          lat: locale.latitude,
          lon: locale.longitude,
          zip: locale.zip,
        });
      } else {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: "Insufficient location data",
        }));
      }
    }
  }, [
    locale.loading,
    locale.city,
    locale.latitude,
    locale.longitude,
    locale.region,
    locale.zip,
    locale.error,
  ]);

  return data;
}
