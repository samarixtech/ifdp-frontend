"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getNames, getCode } from "country-list";
import emojiFlags from "emoji-flags";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, useParams } from "next/navigation";
import { setCookie } from "cookies-next";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
];

const Navbar: React.FC = () => {
  const params = useParams();
  const t = useTranslations("Navbar");
  const localeFromNext = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  console.log(localeFromNext, "localeFromNext");
  const [currentLocaleState, setCurrentLocaleState] = useState(
    localeFromNext || "en"
  );
  const [activeLangState, setActiveLangState] = useState(
    languages.find((l) => l.code === currentLocaleState) || languages[0]
  );

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] =
    useState(false);

  const desktopLangRef = useRef<HTMLDivElement | null>(null);
  const desktopCountryRef = useRef<HTMLDivElement | null>(null);

  // HANDLER FOR MOBILE SIDEBAR OPEN/CLOSE
  const handleCloseMobileMenu = () => {
    setIsClosing(true);
    // Duration matches the CSS animation time (0.3s)
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false); // Reset closing state for the next open
      setIsMobileLangDropdownOpen(false);
    }, 300);
  };

  // Populate countries on mount
  useEffect(() => {
    const names = getNames();
    const allCountries = names.map((name) => {
      const code = getCode(name);
      const flag = emojiFlags.countryCode(code || "")?.emoji || "🏳️";
      return { code: code || "", name, flag };
    });
    setCountries(allCountries);

    const initialCountryCode = params?.country || "US";
    const initialCountry =
      allCountries.find(
        (c) => c.code.toLowerCase() === initialCountryCode.toLowerCase()
      ) || allCountries[0];

    setSelectedCountry(initialCountry);
  }, [params?.country]);

  // Update active language and document attributes
  useEffect(() => {
    const lang = languages.find((l) => l.code === currentLocaleState);
    if (lang) setActiveLangState(lang);

    document.documentElement.lang = lang?.code || "en";
    document.documentElement.dir = lang?.dir || "ltr";
  }, [currentLocaleState]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopLangRef.current && !desktopLangRef.current.contains(target))
        setIsDesktopLangOpen(false);
      if (
        desktopCountryRef.current &&
        !desktopCountryRef.current.contains(target)
      )
        setIsCountryDropdownOpen(false);
      if (
        isMobileLangDropdownOpen &&
        !(event.target as HTMLElement).closest("#mobile-lang")
      )
        setIsMobileLangDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktopLangOpen, isCountryDropdownOpen, isMobileLangDropdownOpen]);
  const handleNavigationChange = (
    newCountryCode: string,
    newLangCode: string,
    newTime?: string
  ) => {
    let newPath = `/${newCountryCode.toLowerCase()}/${newLangCode.toLowerCase()}/restaurants`;

    if (newTime) {
      newPath += `/${newTime.toLowerCase()}`;
    }

    console.log("🔹 Navigation updated to:", newPath);
    setCookie("NEXT_LOCALE", newLangCode, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    router.replace(newPath);
  };

  // const handleNavigationChange = (
  //   newCountryCode: string,
  //   newLangCode: string
  // ) => {
  //   const segments = pathname.split("/").filter(Boolean);

  //   // Replace first two segments with new values
  //   const newSegments = [
  //     newCountryCode.toLowerCase(),
  //     newLangCode.toLowerCase(),
  //     ...segments.slice(2) // keep everything after country/lang
  //   ];

  //   const newPath = "/" + newSegments.join("/");

  //   console.log("🔹 Navigation updated to:", newPath);

  //   setCookie("NEXT_LOCALE", newLangCode, {
  //     maxAge: 60 * 60 * 24 * 30,
  //     path: "/",
  //   });

  //   router.replace(newPath);
  // };

  const changeLanguage = (newLocale: string) => {
    console.log("🔹 changeLanguage called");
    const currentCountryCode = selectedCountry?.code || "US";
    console.log("Current Country Code:", currentCountryCode);
    console.log("New Locale:", newLocale);

    handleNavigationChange(currentCountryCode.toUpperCase(), newLocale);

    const newLang = languages.find((l) => l.code === newLocale);
    if (newLang) {
      setActiveLangState(newLang);
      setCurrentLocaleState(newLocale);
      console.log("Active language updated:", newLang);
    }

    setIsDesktopLangOpen(false);
    setIsMobileLangDropdownOpen(false);
    console.log("Dropdowns closed");
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    handleNavigationChange(country.code, currentLocaleState);
  };

  const navItems = [
    { label: t("home"), to: "/" },
    { label: t("about"), to: "/about" },
    { label: t("services"), to: "/services" },
    { label: t("contact"), to: "/contact" },
    { label: t("newsroom"), to: "/newsroom" },
    { label: t("partners"), to: "/partners" },
  ];

  return (
    <nav className="bg-[#003566] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          <Image src="/logo.jpg" alt="Logo" width={110} height={110} />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="text-white hover:text-blue-100 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* Language & Country Selectors */}
            <div className="flex items-center gap-3">
              {/* Desktop Language */}
              <div ref={desktopLangRef} className="relative">
                <button
                  onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-500 bg-white text-black hover:bg-blue-50 transition-all shadow-sm"
                >
                  <Globe size={18} className="text-blue-600" />
                  <span className="flex items-center gap-1 font-semibold">
                    {activeLangState.flag} {activeLangState.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-blue-600 transition-transform duration-200 ${
                      isDesktopLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDesktopLangOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                          activeLangState.code === lng.code
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-blue-50 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{lng.flag}</span>
                          <span className="text-sm font-medium text-gray-800">
                            {lng.name}
                          </span>
                        </div>
                        {activeLangState.code === lng.code && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Country */}
              <div ref={desktopCountryRef} className="relative">
                <button
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-500 bg-white text-black hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span className="text-xl">
                    {selectedCountry?.flag || "🌐"}
                  </span>
                  <span className="font-semibold">{selectedCountry?.code}</span>
                  <ChevronDown
                    size={16}
                    className={`text-blue-600 transition-transform duration-200 ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCountryDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-100 rounded-lg shadow-xl py-2 max-h-64 overflow-y-auto z-50 animate-fade-in">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50 transition ${
                          selectedCountry?.code === country.code
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm">{country.name}</span>
                        </div>
                        {selectedCountry?.code === country.code && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 ${
              isClosing ? "animate-fade-out-fast" : "animate-fade-in-fast"
            }`}
            onClick={handleCloseMobileMenu}
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-[30%] min-w-[250px] bg-linear-to-b from-[#014f86] to-blue-900 text-white z-50 shadow-2xl overflow-y-auto ${
              isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={handleCloseMobileMenu}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={handleCloseMobileMenu}
                  className="hover:bg-white/10 px-3 py-3 rounded-lg transition-colors text-base font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-white/20 my-3"></div>

              {/* Mobile Language Selector */}
              <div className="relative" id="mobile-lang">
                <button
                  onClick={() =>
                    setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)
                  }
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-white" />
                    <span className="text-lg">{activeLangState.flag}</span>
                    <span className="text-sm font-medium text-white">
                      {activeLangState.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isMobileLangDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileLangDropdownOpen && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-48 overflow-y-auto">
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50 transition-colors ${
                          currentLocaleState === lng.code ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{lng.flag}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {lng.name}
                          </span>
                        </div>
                        {currentLocaleState === lng.code && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Country Selector */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {selectedCountry?.flag || "🌐"}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {selectedCountry?.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCountryDropdownOpen && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-48 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50 transition-colors ${
                          selectedCountry?.code === country.code
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-xs">{country.name}</span>
                        </div>
                        {selectedCountry?.code === country.code && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
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
        .animate-fade-out-fast {
          animation: fade-in-fast 0.3s reverse forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out;
        }
        @keyframes dropdown-fade {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown-fade {
          animation: dropdown-fade 0.2s ease-out;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        @keyframes slide-out-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        .animate-slide-out-right {
          animation: slide-out-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
