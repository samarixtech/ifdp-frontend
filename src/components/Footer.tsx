"use client";
import { Send, MapPin, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import ChatWidgetPortal from "./ai/ChatWidgetPortal";


const primaryyellow = "#0B5D4E"; // Dark yellow for main accent (Primary)
const secondaryyellow = "#2a6f97"; // Mid yellow for features/stats (Secondary)
const tertiaryyellow = "#61a5c2"; // Light yellow for lighter accents/hovers

const FooterLink = ({ href, children }: any) => (
  <a
    href={href}
    className="text-gray-400 hover:text-[#E8F4F1] transition-colors duration-200 block text-base mb-3"
  >
    {children}
  </a>
);

const FooterSection = ({ title, children }: any) => (
  <div>
    <h4 className="text-xl font-bold text-[#E8F4F1] mb-6 border-b border-[#E8F4F1]/10 pb-2">
      {title}
    </h4>
    <nav className="list-none mb-10">{children}</nav>
  </div>
);

const Footer = () => {
  const softPrimaryBg = `bg-[${primaryyellow}]`; // Use the primary dark yellow for the footer background

  return (
    <footer
      className={`${softPrimaryBg} text-[#E8F4F1] pt-16 pb-8 border-t border-[#0B5D4E]/20`}
    >  <ChatWidgetPortal />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-[#E8F4F1]/20 pb-12">
          <div className="col-span-2 md:col-span-2 pr-8">
            <h3 className="text-3xl font-extrabold mb-4 flex items-center">
              <span className={`text-[${tertiaryyellow}] mr-2`}>Deliver</span>
              <span className="text-[#E8F4F1]">Now</span>
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Empowering global food logistics with speed, security, and
              seamless technology. Your trusted partner in delivery.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Subscribe"
                className={`p-3 rounded-full bg-[#E8F4F1]/10 hover:bg-[${tertiaryyellow}] transition-colors duration-300`}
              >
                <Send className="w-5 h-5 text-[#E8F4F1]" />
              </a>
              <a
                href="#"
                aria-label="Location"
                className={`p-3 rounded-full bg-[#E8F4F1]/10 hover:bg-[${tertiaryyellow}] transition-colors duration-300`}
              >
                <MapPin className="w-5 h-5 text-[#E8F4F1]" />
              </a>
              <a
                href="#"
                aria-label="Contact"
                className={`p-3 rounded-full bg-[#E8F4F1]/10 hover:bg-[${tertiaryyellow}] transition-colors duration-300`}
              >
                <Phone className="w-5 h-5 text-[#E8F4F1]" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <FooterSection title="Quick Links">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/features">Our Features</FooterLink>
            <FooterLink href="/privacyPolicy">Privacy & Policy</FooterLink>
            <FooterLink href="/press">Press & Media</FooterLink>
          </FooterSection>

          {/* Solutions Section */}
          <FooterSection title="Solutions">
            <FooterLink href="/enterprise">Enterprise</FooterLink>
            <FooterLink href="/partner-network">Partner Network</FooterLink>
            <FooterLink href="/api">Developer API</FooterLink>
            <FooterLink href="/logistics">Smart Logistics</FooterLink>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Support">
            <div className="flex items-center mb-3">
              <Phone
                className={`w-5 h-5 text-[${tertiaryyellow}] mr-3 shrink-0`}
              />
              <span className="text-[#E8F4F1]">(800) 123-4567</span>
            </div>
            <div className="flex items-center mb-3">
              <Send
                className={`w-5 h-5 text-[${tertiaryyellow}] mr-3 shrink-0`}
              />
              <span className="text-[#E8F4F1]">support@deliverynow.com</span>
            </div>
            <div className="mt-5">
              <Link
                href="/contact"
                className={`inline-flex items-center px-5 py-2 text-sm font-semibold rounded-full bg-[${secondaryyellow}] hover:bg-[${tertiaryyellow}] transition-colors duration-300 shadow-md`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Live Chat
              </Link>
            </div>
          </FooterSection>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DeliverNow Inc. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacyPolicy"
              className="hover:text-[#E8F4F1] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#E8F4F1] transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#E8F4F1] transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
