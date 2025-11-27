"use client";

import { useState, useRef } from "react";
import { MdNotifications, MdKeyboardArrowDown } from "react-icons/md";

export default function TopHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-2 bg-white shadow-md sticky top-0 z-30">
      {/* Left: Page title or search */}
      <h1 className="text-2xl font-semibold text-gray-800"></h1>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <MdNotifications className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-1 transition"
          >
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-300"
            />
            <MdKeyboardArrowDown className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100 z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                Profile
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                Settings
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-500">
                Logout
              </div>
            </div>
          )}

          {/* Hidden file input for profile change */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
}
