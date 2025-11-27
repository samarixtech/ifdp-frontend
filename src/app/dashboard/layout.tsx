// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - visible only on mobile */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
