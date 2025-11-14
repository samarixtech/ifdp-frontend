import { BarChart, User } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

// --- Inline SVG Icons (Lucide-React equivalents) ---
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
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-150 relative z-10"
        aria-label="User Profile"
        aria-expanded={isOpen}
      >
        <User className="w-6 h-6 text-black" />
      </button>

      {/* Profile Menu Dropdown */}
      <div
        className={`absolute top-full mt-2 right-0 w-64 rounded-xl shadow-2xl bg-white p-3 transition-all duration-300 origin-top-right z-50 overflow-hidden border border-gray-100
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

// --- Dropdown Component ---
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
    "flex items-center p-2 rounded-lg border border-gray-200 hover:border-blue-400 transition bg-white relative z-10";
  const locationButtonClasses = isLocation ? "hidden lg:flex max-w-sm" : "flex";

  return (
    <div
      ref={ref}
      className={` text-black relative ${locationButtonClasses} ${
        isLocation ? "w-full" : "w-auto"
      }`}
    >
      <button
        onClick={toggleDropdown}
        className={`${buttonClasses} ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        } ${isLocation ? "w-full" : ""}`}
        aria-expanded={isOpen}
      >
        <Icon className="w-5 h-5 text-[#003566] mr-2 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-700 max-w-[200px] truncate">
          {label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={`absolute top-full mt-2 rounded-xl shadow-2xl bg-white p-4 transition-all duration-300 origin-top z-50 overflow-hidden 
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
          className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Select Delivery Location
            </h2>
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

// --- Main Header Component ---

interface IFDPHeaderProps {
  currentCountryCode?: string;
  currentLangCode?: string;
  currentAddress?: string;
}

const IFDPHeader: React.FC<IFDPHeaderProps> = ({
  currentCountryCode = "PK",
  currentLangCode = "en",
  currentAddress = "New address PTCL Telephone Exchange Service Road W Islamabad",
}) => {
  const [activeTab, setActiveTab] = useState<
    "delivery" | "pickup" | "IFDPmart" | "shops" | "caterers"
  >("delivery");

  // Content for the Language Dropdown
  const languageContent = (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-semibold text-gray-500 mb-1">
        Select Language
      </h3>
      {["English", "Iraq"].map((lang, index) => (
        <button
          key={index}
          className={`text-left text-base p-2 rounded-lg hover:bg-gray-100 transition ${
            lang.startsWith(currentLangCode.toUpperCase())
              ? "text-[#003566] font-bold bg-blue-50"
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

  // Content for the Location Dropdown
  const locationContent = (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Search Delivery Area</h3>
      <input
        type="text"
        placeholder="Enter your street name or landmark"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
      />
      <button className="w-full p-3 bg-[#003566] text-white font-bold rounded-lg hover:bg-[#003566] transition shadow-md">
        Find Food
      </button>
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
        <p className="text-base font-bold text-gray-900">John Doe</p>
        <p className="text-sm text-gray-500">johndoe@example.com</p>
      </div>
      <hr className="border-gray-100" />
      <Link
        href="/dashboard"
        className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        <BarChart className="w-5 h-5 mr-3" />
        Dashboard
      </Link>
      <Link
        href="/profile"
        className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        <User className="w-5 h-5 mr-3" />
        Account Settings
      </Link>
      <Link
        href="/orders"
        className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        <ShoppingBag className="w-5 h-5 mr-3" />
        My Orders
      </Link>
      <hr className="border-gray-100" />
      <button className="flex items-center p-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition w-full text-left">
        Log Out
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
    <header className="fixed top-0 left-0 w-full z-50 pb-20">
      {/* 1. Top Bar (Partner Links) - Blue Top Bar */}
      <div className="hidden sm:block bg-[#003566] text-white text-sm py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4">
          <span className="flex items-center space-x-1 font-semibold">
            <ShoppingBag className="w-4 h-4" />
            <span>IDFP</span>
          </span>
          <a
            href="#"
            className="py-1 px-3 border border-white hover:bg-[#003566] transition duration-150 rounded-lg"
          >
            SIGN UP TO BE A RESTAURANT PARTNER
          </a>
          <a
            href="#"
            className="py-1 px-3 border border-white hover:bg-[#003566] transition duration-150 rounded-lg"
          >
            SIGN UP FOR A BUSINESS ACCOUNT
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Bar (White/Blue) */}
      <nav className="bg-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center h-16">
            {/* Left Section: Logo and Location Dropdown */}
            <div className="flex items-center space-x-3 lg:space-x-12 w-full lg:w-auto">
              {/* Logo (Visible on all screens) */}
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#003566] tracking-tight">
                  IFDP<span className="text-black text-lg sm:text-xl"></span>
                </span>
              </div>

              {/* Location Dropdown (Visible on all screens) */}
              <Dropdown
                label={currentAddress}
                icon={MapPin}
                content={locationContent}
                isLocation={true}
              />
            </div>

            {/* Right Section: Auth, Language, Cart (Hidden on small screens when location dropdown is focused) */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Log In Button (Outline) */}
              <Link
                href={"/login"}
                className="hidden sm:block px-4 py-2 border border-black text-black font-semibold rounded-lg hover:bg-gray-100 transition duration-150 text-sm"
              >
                Log in
              </Link>

              {/* Sign Up Button (Solid Blue) */}
              <button className="hidden sm:block px-4 py-2 bg-[#003566] text-white font-semibold rounded-lg hover:bg-[#003566] transition duration-150 text-sm">
                Sign up for free delivery
              </button>

              {/* Language Dropdown */}
              <Dropdown
                label={currentLangCode.toUpperCase()}
                icon={Globe}
                content={languageContent}
              />

              {/* Cart Icon */}
              <button
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-150"
                aria-label="Cart"
              >
                <ShoppingBag className="w-6 h-6 text-black" />
              </button>
              <ProfileDropdown profileContent={profileContent} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default IFDPHeader;
