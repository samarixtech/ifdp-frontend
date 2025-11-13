"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/user", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const primaryBlue = "#014f86";
const statGradient = "from-blue-400 to-cyan-500";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const ToggleIcon = isOpen ? ChevronLeft : ChevronRight;

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } flex flex-col bg-white border-r min-h-screen shadow-lg transition-all duration-300 overflow-hidden relative`}
    >
      {/* --- Header --- */}
      <div className="flex items-center justify-between p-4 border-b relative">
        <Link
          href={"/restaurants"}
          className={`font-mediul text-lg transition-all duration-300  py-1 px-7 rounded-md bg-[#014f86] text-white ${
            isOpen ? "opacity-100 max-w-full" : "hidden"
          } whitespace-nowrap`}
        >
          Back
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 z-20"
        >
          <ToggleIcon size={20} />
        </button>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 px-2 py-4 space-y-2 relative">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <div key={name} className="relative group">
              <Link
                href={href}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 overflow-hidden ${
                  active
                    ? `bg-gradient-to-r ${statGradient} text-white font-semibold shadow-md`
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon
                  size={20}
                  style={{ color: active ? "#fff" : primaryBlue }}
                />
                <span
                  className={`transition-all duration-300 whitespace-nowrap ${
                    isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                  }`}
                >
                  {name}
                </span>
              </Link>

              {/* --- Tooltip --- */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 rounded-md bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {name}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* --- Footer --- */}
      <div className="p-4 border-t relative">
        <div className="relative group">
          <button className="flex items-center gap-4 p-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full transition">
            <LogOut size={20} style={{ color: primaryBlue }} />
            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
              }`}
            >
              Logout
            </span>
          </button>
          {!isOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 rounded-md bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              Logout
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
