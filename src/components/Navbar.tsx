"use client";

import React, { useState } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
];

const Navbar: React.FC = () => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isMobileCountryDropdownOpen, setIsMobileCountryDropdownOpen] =
    useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setIsMobileCountryDropdownOpen(false);
  };

  return (
    <nav className="bg-[#003566] shadow-lg sticky top-0 z-50">
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
        <div className="flex justify-between items-center h-17">
          {/* Logo */}
          {/* <div className="flex items-center"> */}
          <Image src={"/logo.jpg"} alt="logo" height={110} width={110} />
          {/* </div> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Newsroom", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white hover:text-blue-100 font-medium transition-colors"
              >
                {item}
              </Link>
            ))}

            {/* Country Selector (Desktop) */}
            <div className="relative">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-white" />
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-white">
                  {selectedCountry.code}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    isCountryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 max-h-56 overflow-y-auto animate-dropdown-fade">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors ${
                        selectedCountry.code === country.code
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {country.name}
                      </span>
                      {selectedCountry.code === country.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-blue-100 p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-linear-to-b from-blue-700 to-blue-900 backdrop-blur-md text-white animate-fade-in-fast">
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-7 h-7 text-white" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full space-y-5 text-lg font-medium px-6">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-200 transition-colors text-2xl font-semibold tracking-wide"
              >
                {item}
              </a>
            ))}

            {/* Divider */}
            <div className="w-1/2 border-t border-blue-300/40 pt-2"></div>

            {/* Country Selector (Mobile) */}
            <div className="relative mt-2">
              <button
                onClick={() =>
                  setIsMobileCountryDropdownOpen(!isMobileCountryDropdownOpen)
                }
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 text-sm"
              >
                <Globe className="w-4 h-4 text-white" />
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-white">
                  {selectedCountry.code}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    isMobileCountryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileCountryDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-2 max-h-48 overflow-y-auto animate-dropdown-fade">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 transition-colors ${
                        selectedCountry.code === country.code
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {country.name}
                      </span>
                      {selectedCountry.code === country.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-fast {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
