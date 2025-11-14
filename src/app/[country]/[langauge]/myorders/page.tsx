"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  Phone,
} from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: string;
  img: string;
}

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Progress" | "Cancelled";
  total: string;
  items: OrderItem[];
  deliveryAddress?: string;
  paymentMethod?: string;
  deliveryTime?: string;
  rider?: {
    name: string;
    phone: string;
  };
}

const sampleOrders: Order[] = [
  {
    id: "ORD-12345",
    date: "2025-11-10",
    status: "Delivered",
    total: "₨.560",
    deliveryAddress: "House 123, Street 4, Hyderabad, Sindh",
    paymentMethod: "Cash on Delivery",
    deliveryTime: "45 mins",
    items: [
      {
        id: "Karahi-Tikka",
        title: "Karahi & Tikka",
        quantity: 2,
        price: "₨.129",
        img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?auto=format&fit=crop&q=60&w=600",
      },
      {
        id: "Fredarios-pizza",
        title: "Fredarios Pizza",
        quantity: 1,
        price: "₨.129",
        img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?auto=format&fit=crop&q=60&w=600",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "2025-11-12",
    status: "In Progress",
    total: "₨.320",
    deliveryAddress: "House 123, Street 4, Hyderabad, Sindh",
    paymentMethod: "Online Payment",
    deliveryTime: "25 mins",
    rider: {
      name: "Ahmed Khan",
      phone: "+92 300 1234567",
    },
    items: [
      {
        id: "Eggspectation",
        title: "Eggspectation Rest.",
        quantity: 1,
        price: "₨.129",
        img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?auto=format&fit=crop&q=60&w=600",
      },
    ],
  },
];

const MyOrders: React.FC = () => {
  const router = useRouter();
  const params = useParams<{ country: string; language: string }>();
  const country = params.country || "pk";
  const language = params.language || "en";

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    newExpanded.has(orderId)
      ? newExpanded.delete(orderId)
      : newExpanded.add(orderId);
    setExpandedOrders(newExpanded);
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "In Progress":
        return <Clock className="w-5 h-5" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5" />;
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? sampleOrders
      : sampleOrders.filter((order) => order.status === filterStatus);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen px-4 md:px-16 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Package className="w-9 h-9 text-[#003566]" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          Manage and track all your orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "In Progress", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap shadow-sm ${
              filterStatus === status
                ? "bg-[#003566] text-white shadow-md scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-8">
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrders.has(order.id);

          return (
            <div
              key={order.id}
              className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-white to-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {order.id}
                      </h3>

                      <span
                        className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-full shadow-inner ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {order.date} • Delivered in {order.deliveryTime}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-7 h-7 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-7 h-7 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Item Preview */}
                <div className="flex overflow-x-auto gap-5 pt-5 pb-1 scrollbar-hide">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        router.push(
                          `/${country}/${language}/restaurants/${item.id}`
                        )
                      }
                      className="min-w-[180px] cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden hover:scale-[1.05] transition-all"
                    >
                      <div className="relative">
                        <img
                          src={item.img}
                          className="w-full h-32 object-cover"
                          alt={item.title}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-gray-900 font-semibold truncate">
                          {item.title}
                        </h4>
                        <p className="text-[#003566] font-bold text-sm mt-1">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                      </h5>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Payment Method
                      </h5>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {order.rider && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Rider Details
                      </h5>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{order.rider.name}</p>
                          <p className="text-gray-600 text-sm flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {order.rider.phone}
                          </p>
                        </div>
                        <button className="px-5 py-2 bg-[#003566] text-white rounded-lg text-sm hover:bg-[#002a47] transition">
                          Call Rider
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-800 font-semibold text-lg">
                      Total
                    </span>
                    <span className="text-[#003566] font-extrabold text-2xl tracking-wide">
                      {order.total}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t flex gap-3 justify-end">
                {order.status === "In Progress" && (
                  <>
                    <button className="px-5 py-3 bg-[#003566] text-white rounded-xl font-semibold hover:bg-[#002a47] transition shadow-md">
                      Track Order
                    </button>
                    <button className="px-5 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition">
                      Help
                    </button>
                  </>
                )}

                {order.status === "Delivered" && (
                  <>
                    <button className="px-5 py-3 bg-[#003566] text-white rounded-xl font-semibold hover:bg-[#002a47] transition shadow-md">
                      Reorder
                    </button>
                    <button className="px-5 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rate
                    </button>
                  </>
                )}

                {order.status === "Cancelled" && (
                  <button className="px-5 py-3 bg-[#003566] text-white rounded-xl font-semibold hover:bg-[#002a47] transition shadow-md">
                    Order Again
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
