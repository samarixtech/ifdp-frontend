"use client";
import { ArrowUp, Users, ShoppingCart, DollarSign } from "lucide-react";

const primaryBlue = "#014f86";
const softAccent = "#61a5c2";
const softNeutralBg = "bg-gray-50";
const softSectionBg = "bg-white";
const statGradient = "from-blue-400 to-cyan-500";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* --- Page Header --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90 transition">
          New Report
        </button>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Users</span>
            <Users size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">1,245</h2>
          <p className="mt-1 text-green-500 flex items-center text-sm">
            <ArrowUp size={14} /> 12% since last month
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Revenue</span>
            <DollarSign size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">$34,200</h2>
          <p className="mt-1 text-green-500 flex items-center text-sm">
            <ArrowUp size={14} /> 8% since last month
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Orders</span>
            <ShoppingCart size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">742</h2>
          <p className="mt-1 text-red-500 flex items-center text-sm">
            <ArrowUp size={14} /> 2% decrease
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              New Signups
            </span>
            <Users size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">320</h2>
          <p className="mt-1 text-green-500 flex items-center text-sm">
            <ArrowUp size={14} /> 18% since last month
          </p>
        </div>
      </div>

      {/* --- Activity Section --- */}
      <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <p className="text-gray-600 text-sm">User John Doe signed up</p>
            <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <p className="text-gray-600 text-sm">Order #1024 completed</p>
            <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <p className="text-gray-600 text-sm">Revenue $2,400 received</p>
            <p className="text-gray-400 text-xs mt-1">8 hours ago</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <p className="text-gray-600 text-sm">New comment on report</p>
            <p className="text-gray-400 text-xs mt-1">12 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
