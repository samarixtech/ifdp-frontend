"use client";

import { Menu, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header({ setIsSidebarOpen }: any) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    avatar: null, // You can replace with actual avatar URL
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("Signing out...");
    setIsProfileOpen(false);
  };

  return (
    <header className="w-full h-16 bg-[#E8F4F1] border-b border-[#FFF9EE] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Section - Title & Hamburger (mobile) */}
      <div className="flex items-center gap-4">
        {/* Hamburger Button - Only on mobile */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-[#FFF9EE] transition-all duration-200 border border-transparent hover:border-[#FFF9EE] lg:hidden"
        >
          <Menu size={20} className="text-gray-700" />
        </button>

        {/* Page Title - Show on all screens */}
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Section - User Profile */}
      <div className="flex items-center gap-4">
        {/* Welcome Text - Show on desktop only */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {userData.name}
          </span>
          <span className="text-xs text-gray-500">{userData.role}</span>
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-[#FFF9EE]"
          >
            <div className="w-10 h-10 bg-linear-to-r from-[#0B5D4E] to-[#013a63] rounded-full flex items-center justify-center shrink-0">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User size={20} className="text-[#E8F4F1]" />
              )}
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Popup */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#E8F4F1] rounded-xl shadow-lg border border-[#FFF9EE] overflow-hidden z-30">
              {/* User Info Section */}
              <div className="p-4 border-b border-[#FFF9EE] bg-linear-to-r from-[#0B5D4E] to-[#013a63] text-[#E8F4F1]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#E8F4F1]/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
                    {userData.avatar ? (
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-[#E8F4F1]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#E8F4F1] truncate text-sm">
                      {userData.name}
                    </h3>
                    <p className="text-[#E8F4F1]/80 text-xs truncate">
                      {userData.role}
                    </p>
                  </div>
                </div>
                <p className="text-[#E8F4F1]/90 text-sm truncate bg-[#E8F4F1]/10 px-2 py-1 rounded-lg">
                  {userData.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={() => {
                    // Navigate to profile page
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="text-gray-600" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    // Navigate to settings page
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="text-gray-600" />
                  <span>Account Settings</span>
                </button>
              </div>

              {/* Sign Out Section */}
              <div className="p-2 border-t border-[#FFF9EE]">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
