"use client";
import { ArrowUp, Users, Mail, UserPlus } from "lucide-react";

const primaryBlue = "#014f86";
const softSectionBg = "bg-white";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joined: "2025-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    joined: "2025-09-15",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    status: "Active",
    joined: "2025-10-10",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    status: "Active",
    joined: "2025-10-12",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      {/* --- Page Header --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90 transition">
          <UserPlus size={20} /> Add User
        </button>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Total Users
            </span>
            <Users size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {usersData.length}
          </h2>
          <p className="mt-1 text-green-500 flex items-center text-sm">
            <ArrowUp size={14} /> 10% since last month
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Active Users
            </span>
            <Users size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {usersData.filter((u) => u.status === "Active").length}
          </h2>
          <p className="mt-1 text-green-500 flex items-center text-sm">
            <ArrowUp size={14} /> 8% since last month
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Inactive Users
            </span>
            <Users size={24} className={`text-[${primaryBlue}]`} />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {usersData.filter((u) => u.status === "Inactive").length}
          </h2>
          <p className="mt-1 text-red-500 flex items-center text-sm">
            <ArrowUp size={14} /> 2% decrease
          </p>
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className={`p-6 rounded-xl shadow ${softSectionBg}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      user.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Recent Activity --- */}
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
            <p className="text-gray-600 text-sm">
              User Jane Smith became inactive
            </p>
            <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <p className="text-gray-600 text-sm">
              User Alex Johnson updated profile
            </p>
            <p className="text-gray-400 text-xs mt-1">8 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
