"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import SidebarFilters from "./SidebarFilters";
import Home from "./Home";
import { useRouter, useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { CLCProvider, useCLC } from "@/app/context/CLCContext.tsx";

const IndexPageContent: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { setCLC } = useCLC();

  useEffect(() => {
    const fetchData = () => {
      let c = params?.country;
      if (Array.isArray(c)) c = c[0];
      if (!c) c = (getCookie("NEXT_COUNTRY") as string) || "US";

      let l = params?.language;
      if (Array.isArray(l)) l = l[0];
      if (!l) l = (getCookie("NEXT_LOCALE") as string) || "en";

      const cur = (getCookie("NEXT_CURRENCY") as string) || "$";

      setCLC({ country: c.toUpperCase(), currency: cur, language: l });
    };

    fetchData();
  }, [params?.country, params?.language]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-20">
        <div className="flex flex-col lg:flex-row gap-8  pt-20 ">
          <div className="w-full lg:w-1/4 sticky top-24 self-start">
            <SidebarFilters />
          </div>

          <div className="w-full lg:max-w-5xl ">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  return (
    <CLCProvider>
      <IndexPageContent />
    </CLCProvider>
  );
};

export default IndexPage;
