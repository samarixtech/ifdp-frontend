"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdStore,
  MdPerson,
  MdList,
  MdCheckCircle,
  MdShoppingCart,
  MdHistory,
  MdCreditCard,
  MdSettings,
  MdChevronRight,
  MdClose,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const sections = [
    {
      title: "Dashboard",
      items: [{ name: "Dashboard", href: "/RestaurantDashboard", icon: MdDashboard }],
    },
    {
      title: "Restaurant",
      items: [
        { name: "Restaurant Detail", href: "/RestaurantDashboard/restaurant", icon: MdStore },
        { name: "Owner Detail", href: "/RestaurantDashboard/owner", icon: MdPerson },
      ],
    },
    {
      title: "Items",
      items: [
        { name: "All Items", href: "/RestaurantDashboard/items", icon: MdList },
        // { name: "Active Items", href: "/RestaurantDashboard/items/active", icon: MdCheckCircle },
        // { name: "Inactive Items", href: "/RestaurantDashboard/items/inactive", icon: MdCheckCircle },
      ],
    },
    {
      title: "Orders",
      items: [
        { name: "Active Orders", href: "/RestaurantDashboard/active-orders", icon: MdShoppingCart },
        { name: "Orders History", href: "/RestaurantDashboard/orders-history", icon: MdHistory },
      ],
    },
    {
      title: "Financials",
      items: [{ name: "Payment History", href: "/RestaurantDashboard/payments", icon: MdCreditCard }],
    },
    {
      title: "Settings",
      items: [{ name: "Settings", href: "/RestaurantDashboard/settings", icon: MdSettings }],
    },
  ];
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen bg-white shadow-xl
        flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b bg-linear-to-r from-blue-600 to-blue-500 text-white">
          {!collapsed && <h1 className="font-bold tracking-wide text-lg">Restaurant</h1>}
          <div className="flex items-center gap-2">
            {/* Mobile close button */}
            <button
              className="md:hidden"
              onClick={() => setOpen(false)}
            >
              <MdClose className="w-5 h-5" />
            </button>
            {/* Collapse/Expand toggle */}
            <button
              className="hidden md:block"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <MdArrowForward className="w-5 h-5" /> : <MdArrowBack className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400 transition-colors duration-200">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1 relative">
              {/* Section title (hide when collapsed) */}
              {!collapsed && (
                <p className="text-[11px] font-semibold text-gray-500 uppercase px-2 tracking-wider">
                  {section.title}
                </p>
              )}

              {/* Section items */}
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-3 p-2 rounded-md group transition-all duration-200
                      ${isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    {!collapsed && <span>{item.name}</span>}

                    {/* Active indicator */}
                    {isActive && !collapsed && (
                      <>
                        <MdChevronRight className="w-5 h-5 opacity-80 absolute right-2" />
                        <span className="absolute left-0 top-0 h-full w-1 bg-white"></span>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
