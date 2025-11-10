"use client";
import React from "react";
// import { useRouter } from "next/navigation";
// import useLocale from "@/hooks/useLocals";
import Banner from "@/app/banner/page";
import {
  Globe,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import ScrollCards from "@/components/ScrollCards";

const HomePage: React.FC = () => {
  // const router = useRouter();
  // const { country, language, loading } = useLocale();

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
