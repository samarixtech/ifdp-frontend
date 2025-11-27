"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Order History", href: "/dashboard/orderHistory", icon: Users },
  {
    name: "Payment History",
    href: "/dashboard/paymentHistory",
    icon: BarChart,
  },
  {
    name: "Change Password",
    href: "/dashboard/changePassword",
    icon: Settings,
  },
];

const primaryBlue = "#014f86";
const accentColor = "#013a63";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
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

  // Desktop auto-open / Mobile auto-close
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setIsOpen(true);
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  // Function to handle the collapse button click
  const handleCollapseClick = () => {
    // Check if we are on a mobile screen (less than the 'lg' breakpoint, 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      // On mobile, the button should close/hide the sidebar entirely.
      setIsSidebarOpen(false);
    } else {
      // On desktop, the button should collapse/expand the sidebar width.
      setIsOpen(!isOpen);
    }
  };

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    avatar: null, // You can replace with actual avatar URL
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
        ></div>
      )}

      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col z-30 transition-all duration-300
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#014f86] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-gray-800">Dashboard</span>
            </div>
          )}

          <button
            onClick={handleCollapseClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-800"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`group flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-50/70 text-blue-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    active ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <Icon size={18} style={{ color: primaryBlue }} />
                </div>

                <span
                  className={`text-sm font-medium transition-all ${
                    isOpen ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {name}
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-50">
                    {name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer with Profile */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50/50">
          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all group hover:bg-gray-100 ${
                isProfileOpen ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-[#014f86] rounded-full flex items-center justify-center flex-shrink-0">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>

                {isOpen && (
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-sm font-medium text-gray-900 truncate w-full">
                      {userData.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate w-full">
                      {userData.role}
                    </span>
                  </div>
                )}
              </div>

              {isOpen && (
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              )}

              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-50">
                  Profile
                </span>
              )}
            </button>

            {/* Profile Popup */}
            {isProfileOpen && (
              <div
                className={`absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden ${
                  isOpen ? "w-full" : "w-64"
                }`}
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#014f86] rounded-full flex items-center justify-center flex-shrink-0">
                      {userData.avatar ? (
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <User size={24} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {userData.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {userData.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50">
                    <Mail size={16} />
                    <span className="truncate">{userData.email}</span>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="p-2 border-t border-gray-200">
                  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
