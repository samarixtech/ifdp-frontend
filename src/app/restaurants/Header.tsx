import CartDrawer from "@/components/CartDrawer";
import { RootState } from "@/redux/store/store";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

// ✅ Import React Icons
import {
  FiMapPin,
  FiChevronDown,
  FiShoppingBag,
  FiGlobe,
  FiTruck,
  FiPackage,
} from "react-icons/fi";

// --- Dropdown Component ---
interface DropdownProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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

  // Close when clicking outside
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

  const locationButtonClasses = isLocation
    ? "hidden lg:flex max-w-sm"
    : "flex";

  return (
    <div
      ref={ref}
      className={`text-black relative ${locationButtonClasses} ${
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
        <FiChevronDown
          className={`w-4 h-4 text-gray-400 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={`absolute top-full mt-2 rounded-xl shadow-2xl bg-white p-4 transition-all duration-300 origin-top z-50 overflow-hidden 
          ${isLocation ? "w-[350px] right-0 lg:left-0" : "w-40 right-0"}
          ${
            isOpen
              ? "scale-y-100 opacity-100 max-h-[300px]"
              : "scale-y-0 opacity-0 max-h-0"
          }`}
      >
        {content}
      </div>

      {/* Mobile Location Modal */}
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
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Language Dropdown
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
        >
          {lang}
        </button>
      ))}
    </div>
  );

  // Location Dropdown
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 pb-20">
      {/* Top Bar */}
      <div className="hidden sm:block bg-[#003566] text-white text-sm py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4">
          <span className="flex items-center space-x-1 font-semibold">
            <FiShoppingBag className="w-4 h-4" />
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

      {/* Main Nav */}
      <nav className="bg-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo + Location */}
            <div className="flex items-center space-x-3 lg:space-x-12 w-full lg:w-auto">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#003566] tracking-tight">
                  IFDP
                </span>
              </div>

              <Dropdown
                label={currentAddress}
                icon={FiMapPin}
                content={locationContent}
                isLocation={true}
              />
            </div>

            {/* Right: Auth + Language + Cart */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              <Link
                href={"/login"}
                className="hidden sm:block px-4 py-2 border border-black text-black font-semibold rounded-lg hover:bg-gray-100 transition duration-150 text-sm"
              >
                Log in
              </Link>

              <button className="hidden sm:block px-4 py-2 bg-[#003566] text-white font-semibold rounded-lg hover:bg-[#003566] transition duration-150 text-sm">
                Sign up for free delivery
              </button>

              <Dropdown
                label={currentLangCode.toUpperCase()}
                icon={FiGlobe}
                content={languageContent}
              />

              {/* Cart Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-150"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-6 h-6 text-black" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            </div>

        
          </div>
        </div>
      </nav>    <CartDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            />

    </header>
    
  );
};

export default IFDPHeader;
