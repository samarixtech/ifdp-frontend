"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLocale from "@/hooks/useLocals";
import Banner from "@/app/banner/page";
import router from "next/router";
const HomePage: React.FC = () => {
  const router = useRouter();
  const { country, language, loading } = useLocale();

  // useEffect(() => {
  //   if (!loading && country && language) {
  //     router.replace(`/${country.toLowerCase()}/${language.toLowerCase()}`);
  //   }
  // }, [loading, country, language, router]);

  return (
    <div className="">
      <Banner />
    </div>
  );
};

export default HomePage;
