"use client";
import {
  ShoppingBag,
  MapPin,
  Clock,
  Star,
  RefreshCw,
  ChevronRight,
  Utensils,
  Bike,
  CheckCircle2,
  Receipt,
  Search,
  Filter,
  Sparkles,
  Truck,
  Calendar,
} from "lucide-react";
import { useState, useMemo } from "react";

const primaryBlue = "#0066cc";
const accentPurple = "#8b5cf6";
const successGreen = "#10b981";
const warningAmber = "#f59e0b";

// Mock Data
const activeOrder = {
  id: "ORD-9921",
  restaurant: "Sushi Master",
  image:
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300&auto=format&fit=crop",
  items: "2x Spicy Tuna Roll, 1x Miso Soup, 1x Edamame",
  total: "$42.50",
  status: "On the way",
  eta: "15-20 min",
  driver: "Michael D.",
  progress: 75,
};

const pastOrders = [
  {
    id: "ORD-8820",
    restaurant: "Burger & Co.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
    date: "Oct 24, 2025 • 8:30 PM",
    items: "1x Double Cheeseburger, 1x Large Fries, 1x Vanilla Shake",
    total: "$28.00",
    status: "Delivered",
    rating: 5,
  },
  {
    id: "ORD-8819",
    restaurant: "Pizza Paradiso",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=300&auto=format&fit=crop",
    date: "Oct 20, 2025 • 1:15 PM",
    items: "1x Pepperoni Feast (Large), 1x Garlic Knots",
    total: "$35.50",
    status: "Delivered",
    rating: 4,
  },
  {
    id: "ORD-8818",
    restaurant: "Green Bowl Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
    date: "Oct 18, 2025 • 12:45 PM",
    items: "1x Caesar Salad, 1x Chicken Protein Bowl",
    total: "$22.00",
    status: "Cancelled",
    rating: 0,
  },
  {
    id: "ORD-8815",
    restaurant: "Taco Fiesta",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=300&auto=format&fit=crop",
    date: "Oct 15, 2025 • 7:20 PM",
    items: "3x Beef Tacos, 1x Nachos Supreme, 2x Horchata",
    total: "$31.20",
    status: "Delivered",
    rating: 5,
  },
];

export default function FoodOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return pastOrders.filter((order) => {
      const matchesSearch =
        order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8"
      aria-labelledby="page-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* --- Page Header --- */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm border border-white/60">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Utensils className="text-white" size={24} aria-hidden="true" />
            </div>
            <div className="text-left">
              <h1
                id="page-title"
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                Order History
              </h1>
              <p className="text-gray-600 text-sm">
                Track deliveries and explore your culinary journey
              </p>
            </div>
          </div>

          {/* --- Search and Filter Bar --- */}
          <div className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search restaurants, dishes, or orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-300"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative group">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-4 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Orders</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* --- Active Order Card --- */}
        <section aria-labelledby="active-order-heading" className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900/90 to-purple-900/80 text-white p-8 shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col xl:flex-row gap-8 items-center">
              <div className="relative">
                <img
                  src={activeOrder.image}
                  alt={`Order from ${activeOrder.restaurant}`}
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-white/20 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
                  <Truck size={16} className="text-white" />
                </div>
              </div>

              <div className="flex-1 w-full text-center xl:text-left space-y-4">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div>
                    <h2
                      id="active-order-heading"
                      className="text-2xl font-bold flex items-center gap-3 justify-center xl:justify-start"
                    >
                      {activeOrder.restaurant}
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                        Live Tracking
                      </span>
                    </h2>
                    <p className="text-blue-100 mt-2">{activeOrder.items}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                    <Clock size={20} className="text-cyan-300" />
                    <div>
                      <div className="text-cyan-300 font-semibold">
                        ETA: {activeOrder.eta}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {activeOrder.driver}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium text-blue-200">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Preparing
                    </span>
                    <span className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      On the way
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Delivered
                    </span>
                  </div>
                  <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                      style={{ width: `${activeOrder.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[140px]">
                <div className="text-blue-200 text-sm uppercase tracking-wider mb-2">
                  Total
                </div>
                <div className="text-3xl font-bold text-white">
                  {activeOrder.total}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Quick Stats --- */}
        <section aria-label="Order statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                label: "Total Orders",
                value: "24",
                icon: ShoppingBag,
                color: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50",
              },
              {
                label: "Total Spent",
                value: "$480",
                icon: Receipt,
                color: "from-green-500 to-emerald-500",
                bg: "bg-green-50",
              },
              {
                label: "Favorite Spot",
                value: "Burger & Co.",
                icon: MapPin,
                color: "from-red-500 to-orange-500",
                bg: "bg-red-50",
              },
              {
                label: "Avg Rating",
                value: "4.8",
                icon: Star,
                color: "from-amber-500 to-yellow-500",
                bg: "bg-amber-50",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-white/60 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
                <div
                  className={`absolute -bottom-8 -right-8 w-16 h-16 ${stat.bg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Past Orders --- */}
        <section aria-labelledby="past-orders-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/60">
                <Calendar className="text-gray-700" size={20} />
              </div>
              <div>
                <h2
                  id="past-orders-heading"
                  className="text-xl font-bold text-gray-900"
                >
                  Past Orders
                </h2>
                <p className="text-gray-600 text-sm">
                  {filteredOrders.length} order
                  {filteredOrders.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-blue-600 hover:text-blue-700 hover:bg-white transition-all duration-300 border border-white/60 shadow-sm hover:shadow-md font-medium"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <div className="text-gray-900 font-semibold mb-2">
                No orders found
              </div>
              <div className="text-gray-600 max-w-sm mx-auto">
                {searchQuery
                  ? "We couldn't find any orders matching your search. Try different keywords or clear the search."
                  : "Your order history will appear here once you start ordering."}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-cyan-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-cyan-50/30 transition-all duration-500"></div>

                  <div className="relative z-10 flex gap-6">
                    <div className="relative shrink-0">
                      <img
                        src={order.image}
                        alt={`Meal from ${order.restaurant}`}
                        className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      />
                      {order.status === "Delivered" ? (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                          <CheckCircle2 size={16} />
                        </div>
                      ) : (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg">
                          <div className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                            !
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {order.restaurant}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            <time>{order.date}</time>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span
                              className={`font-medium px-2 py-1 rounded-full text-xs ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-900 bg-gray-50/50 px-3 py-2 rounded-xl border border-gray-200/50">
                          {order.total}
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {order.items}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          {order.rating > 0 ? (
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/50">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  fill={
                                    i < order.rating ? "currentColor" : "none"
                                  }
                                  className={
                                    i < order.rating
                                      ? "text-amber-500"
                                      : "text-amber-200"
                                  }
                                />
                              ))}
                              <span className="text-amber-700 text-sm font-medium ml-1">
                                {order.rating}.0
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200/50">
                              No rating
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 font-medium text-sm">
                            <RefreshCw size={16} />
                            Reorder
                          </button>
                          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200/60 shadow-sm hover:shadow-md flex items-center gap-2 font-medium text-sm">
                            Help
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {filteredOrders.length > 0 && (
          <div className="text-center pt-8">
            <button className="px-8 py-3 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-semibold rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:border-blue-200/60">
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
