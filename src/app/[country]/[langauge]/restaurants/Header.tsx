// import { SignInForm, SignUpForm } from "@/components/AuthForms";  // delete the component if not used
import AuthModal from "@/components/AuthModal";
import CartDrawer from "@/components/CartDrawer";
import useLocale from "@/hooks/useLocals";
import { RootState } from "@/redux/store/store";
import { BarChart, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import Image from "next/image";
import image from "./../../../../../public/logo2.png";
// Inline SVG Icons
const MapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ShoppingBag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5Z" />
    <line x1="3" x2="21" y1="7" y2="7" />
    <path d="M12 22v-3" />
    <path d="M12 7V2" />
  </svg>
);
const Globe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <line x1="2" x2="22" y1="12" y2="12" />
  </svg>
);
const Bike: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="18" r="4" />
    <path d="M19 18a2 2 0 0 0 0-4H7a2 2 0 0 0 0 4" />
    <path d="M22 18h-2l-1-4h-2" />
    <path d="m14 14 1 4h5" />
    <path d="m5 18-1-4h-2" />
    <path d="m3 7 3 2 4-5 5 5 1-2" />
    <path d="M13 10V4" />
  </svg>
);
const Package: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7.5 4.27 9.5.5c.42 0 .78-.35.8-.76V2.5A.5.5 0 0 0 18 2h-9c-.48 0-.82.3-.87.72V4.2c0-.06-.02-.12-.02-.18" />
    <path d="m20 10-8-5-8 5V21l8-4 8 4Z" />
    <path d="m12 17 8 4M12 17 4 21M4 21V10M20 10v11" />
  </svg>
);

// PROFILE DROPDOWN INTERFACE
interface ProfileDropdownProps {
  profileContent: React.ReactNode;
}

// PROFILE DROPDOWN COMPONENT
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  profileContent,
}) => {
  const t = useTranslations("profile.button");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-[#FFF9EE] rounded-full hover:bg-[#FFF9EE] transition duration-150 relative z-10"
        aria-label={t("label")}
        aria-expanded={isOpen}
      >
        <User className="w-6 h-6 text-[#2C2C2C]" />
      </button>

      {/* Profile Menu Dropdown */}
      <div
        className={`absolute top-full mt-2 right-0 w-64 rounded-xl shadow-2xl bg-[#E8F4F1] p-3 transition-all duration-300 origin-top-right z-50 overflow-hidden border border-[#FFF9EE]
          ${
            isOpen
              ? "scale-100 opacity-100 max-h-[500px]"
              : "scale-95 opacity-0 max-h-0"
          }
        `}
      >
        {profileContent}
      </div>
    </div>
  );
};

// Dropdown Component
interface DropdownProps {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content: React.ReactNode;
  isLocation?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  icon: Icon,
  content,
  isLocation = false,
}) => {
  const t = useTranslations("location.modal");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const buttonClasses =
    "flex items-center p-2 rounded-lg border border-[#FFF9EE] hover:border-yellow-400 transition bg-[#E8F4F1] relative z-10";
  const locationButtonClasses = isLocation ? "hidden lg:flex max-w-sm" : "flex";

  return (
    <div
      ref={ref}
      className={` text-[#2C2C2C] relative ${locationButtonClasses} ${
        isLocation ? "w-full" : "w-auto"
      }`}
    >
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className={`
    flex items-center w-full p-3 rounded-lg 
    border transition-all duration-200 
    bg-[#E8F4F1] shadow-sm hover:shadow-md
  
    ${
      isOpen
        ? "border-[#0B5D4E] ring-2 ring-yellow-300"
        : "border-[#FFF9EE] hover:border-yellow-300"
    }
    ${isLocation ? "w-full" : ""}
  `}
      >
        <Icon className="w-5 h-5 text-[#0B5D4E] mr-2 shrink-0" />
        <span className="text-sm font-semibold text-gray-700 max-w-[200px] truncate">
          {label}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 ml-auto transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={`absolute top-full mt-2 rounded-xl shadow-2xl bg-[#E8F4F1] p-4 transition-all duration-300 origin-top z-50 overflow-hidden 
          ${
            isLocation
              ? "w-[350px] right-0 lg:left-0" // Location: wider, fixed size
              : "w-40 right-0" // Language: smaller, aligned right
          }
          ${
            isOpen
              ? "scale-y-100 opacity-100 max-h-[300px]"
              : "scale-y-0 opacity-0 max-h-0"
          }
        `}
      >
        {content}
      </div>

      {/* Mobile/Small Screen Location Modal (Full width) */}
      {isLocation && (
        <div
          className={`lg:hidden fixed inset-0 bg-[#E8F4F1] z-40 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{t("title")}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-900 font-bold text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{content}</div>
        </div>
      )}
    </div>
  );
};

// Main Header Component

interface IFDPHeaderProps {
  currentCountryCode?: string;
  currentLangCode?: string;
  currentAddress?: string;
}

const IFDPHeader: React.FC<IFDPHeaderProps> = ({
  currentCountryCode = "PK",
  currentLangCode = "en",
  // currentAddress = "New address PTCL Telephone Exchange Service Road W Islamabad",
}) => {
  // Separate hooks for Translation
  const tHeader = useTranslations("idfpHeader");
  const tLocation = useTranslations("location.dropdown");
  const tLanguage = useTranslations("language.dropdown");
  const tProfile = useTranslations("profile");
  const tProfileLink = useTranslations("profile.link");
  const [currentAddress, setCurrentAddress] = useState("Detecting location...");

  const [activeTab, setActiveTab] = useState<
    "delivery" | "pickup" | "IFDPmart" | "shops" | "caterers"
  >("delivery");

  const { country, language, loading } = useLocale();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Content for the Language Dropdown
  const languageContent = (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-semibold text-gray-500 mb-1">
        {tLanguage("title")}
      </h3>
      {["English", "Iraq"].map((lang, index) => (
        <button
          key={index}
          className={`text-left text-base p-2 rounded-lg hover:bg-[#FFF9EE] transition ${
            lang.startsWith(currentLangCode.toUpperCase())
              ? "text-[#0B5D4E] font-bold bg-[#0B5D4E]"
              : "text-gray-800"
          }`}
          onClick={() => {
            /* Handle language change logic here */
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const apiKey = "AIzaSyDVjBcvY8diVAT0qU4H3il9n0HUylntByI";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();
        console.log(data, "data");
        if (data.results && data.results[0]) {
          setCurrentAddress(data.results[0].formatted_address);
        } else {
          setCurrentAddress("Address not found");
        }
      },
      () => {
        alert("Location permission denied!");
      }
    );
  };

  // Content for the Location Dropdown
  const locationContent = (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-bold text-gray-800">{tLocation("title")}</h3>

      <button
        onClick={getCurrentLocation}
        className="w-full p-3 bg-green-600 text-[#E8F4F1] font-bold rounded-lg hover:bg-green-700 transition"
      >
        Use Current Location
      </button>

      <input
        type="text"
        placeholder={tLocation("placeholder")}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition"
      />

      <div className="text-sm text-gray-500 mt-2">
        Current:{" "}
        <span className="font-semibold text-gray-700">{currentAddress}</span>
      </div>
    </div>
  );

  // Content for Profile Dropdown
  const profileContent = (
    <div className="flex flex-col space-y-1">
      <div className="py-2 px-3">
        <p className="text-base font-bold text-gray-900">
          {tProfile("placeholder.name")}
        </p>
        <p className="text-sm text-gray-500">{tProfile("placeholder.email")}</p>
      </div>
      <hr className="border-[#FFF9EE]" />
      <Link
        href="/dashboard"
        className="flex items-center p-3 text-gray-700 hover:bg-[#FFF9EE] rounded-lg transition"
      >
        <BarChart className="w-5 h-5 mr-3" />
        {tProfile("link.dashboard")}
      </Link>
      <Link
        href={`/${country.toLowerCase()}/${language.toLowerCase()}/account-settings`}
        className="flex items-center p-3 text-gray-700 hover:bg-[#FFF9EE] rounded-lg transition"
      >
        <User className="w-5 h-5 mr-3" />
        {tProfile("link.accountSettings")}
      </Link>
      <Link
        href={`/${country.toLowerCase()}/${language.toLowerCase()}/myorders`}
        className="flex items-center p-3 text-gray-700 hover:bg-[#FFF9EE] rounded-lg transition"
      >
        <ShoppingBag className="w-5 h-5 mr-3" />
        {tProfile("link.myOrders")}
      </Link>
      <hr className="border-[#FFF9EE]" />
      <button className="flex items-center p-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition w-full text-left">
        {tProfile("link.logout")}
      </button>
    </div>
  );

  const navTabs = [
    { key: "delivery", label: "Delivery", icon: Bike },
    { key: "pickup", label: "Pick-up", icon: MapPin },
    { key: "IFDPmart", label: "IFDPmart", icon: ShoppingBag },
    { key: "shops", label: "Shops", icon: Package },
    { key: "caterers", label: "Caterers", icon: Globe },
  ] as const;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pb-20">
        {/* Top Bar */}
        <div className="hidden sm:block bg-[#0B5D4E] text-[#E8F4F1] text-sm py-1 px-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between space-x-4">
            {/* Logo + Shopping Bag */}
            <div className="flex items-center space-x-3 font-semibold">
              <ShoppingBag className="text-[#FFF9EE] w-6 h-6" />

              <Link href="/">
                <Image
                  src={image}
                  alt="Logo"
                  width={140}
                  height={130}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              {/* Partner / Business Links */}
              <a
                href="/partner"
                className="py-2 px-3 border border-[#E8F4F1] hover:bg-[#0B5D4E] transition duration-150 rounded-lg"
              >
                {tHeader("topBar.partnerSignup")}
              </a>
              <a
                href="#"
                className="py-2 px-3 border border-[#E8F4F1] hover:bg-[#0B5D4E] transition duration-150 rounded-lg"
              >
                {tHeader("topBar.businessSignup")}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-[#E8F4F1] shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center h-16">
              {/* Left: Logo + Location */}
              <div className="flex items-center space-x-3 lg:space-x-12 w-full lg:w-auto">
                {/* Logo Text */}
                <div className="shrink-0">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0B5D4E] tracking-tight">
                    IFDP
                    <span className="text-[#2C2C2C] text-lg sm:text-xl"></span>
                  </span>
                </div>

                {/* Location Dropdown */}
                <Dropdown
                  label={currentAddress}
                  icon={MapPin}
                  content={locationContent}
                  isLocation={true}
                />
              </div>

              {/* Right: Auth, Language, Cart */}
              <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
                {/* Login */}
                <button
                  onClick={openLogin}
                  className="hidden sm:block px-4 py-2 border border-[#2C2C2C] text-[#2C2C2C] font-semibold rounded-lg hover:bg-[#FFF9EE] transition duration-150 text-sm"
                >
                  {tHeader("auth.login")}
                </button>

                {/* Signup */}
                <button
                  onClick={openSignup}
                  className="hidden sm:block px-4 py-2 bg-[#0B5D4E] text-[#E8F4F1] font-semibold rounded-lg hover:bg-[#084838] transition duration-150 text-sm"
                >
                  {tHeader("auth.signup")}
                </button>

                {/* Language Dropdown */}
                <Dropdown
                  label={currentLangCode.toUpperCase()}
                  icon={Globe}
                  content={languageContent}
                />

                {/* Cart Button */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-3 bg-[#FFF9EE] rounded-full hover:bg-[#FFF9EE] transition duration-150"
                  aria-label="Cart"
                >
                  <FiShoppingBag className="w-6 h-6 text-[#2C2C2C]" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-[#E8F4F1] transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </button>

                {/* Drawers / Profile */}
                <CartDrawer
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                />
                <ProfileDropdown profileContent={profileContent} />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        switchMode={(mode) => setAuthMode(mode)}
      />
    </>
  );
};

export default IFDPHeader;
