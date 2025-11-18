
"use client";
import Banner from "@/components/partner/Banner";
import FAQSection from "@/components/partner/FAQSection";
import Features from "@/components/partner/Features";
import Hero from "@/components/partner/Hero";
import Steps from "@/components/partner/Steps";
import Testimonials from "@/components/partner/Testimonials";
import Header from "@/components/partner/TopHeader";


export default function PartnerPage() {
  return (
    <main >
      <Header/>
      <Hero />
      <Features />
      <Banner />
      <Steps />
      <Testimonials />
      <FAQSection/>
    </main>
  );
}
