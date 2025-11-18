"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { updateQuantity } from "@/redux/slices/cartSlice";
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { CartItem } from "@/types/menu";
import { useCLC } from "@/app/context/CLCContext.tsx";

interface CartSidebarProps {
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ onCheckout}) => {
    const { currency } = useCLC(); 
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [isDelivery, setIsDelivery] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // --- Calculations ---
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = isDelivery ? 129 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg sticky top-20 h-fit">
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => setIsDelivery(true)}
            className={`flex-1 text-xs font-bold py-1 rounded-lg transition ${
              isDelivery ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setIsDelivery(false)}
            className={`flex-1 text-xs font-bold py-1 rounded-lg transition ${
              !isDelivery ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Pick-up
          </button>
        </div>

        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <img
            src="/images/cart-empty.png"
            alt="Empty Cart"
            className="mx-auto w-14 h-14 mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-800">Hungry?</h3>
          <p className="text-xs text-gray-500">
            You haven’t added anything yet.
          </p>
        </div>
      </div>
    );
  }

  // Cart With Items
  return (
    <div
      className="
        bg-white border border-gray-200 rounded-lg shadow-2xl
        sticky top-20
        flex flex-col
        h-fit
        w-full max-w-sm
        mx-auto md:mx-0
      "
    >
      {/* Tabs */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex bg-blue-50 rounded-lg p-0.5">
          <button
            onClick={() => setIsDelivery(true)}
            className={`flex-1 text-xs font-bold py-1 rounded-lg transition ${
              isDelivery ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setIsDelivery(false)}
            className={`flex-1 text-xs font-bold py-1 rounded-lg transition ${
              !isDelivery ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Pick-up
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="px-3 py-2 space-y-3">
        <h2 className="text-sm font-bold text-gray-800 mb-1">Your Items</h2>

        {cart.map((item: CartItem) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex space-x-2 w-full">
              <img
                src={item.imageUrl || "/images/placeholder-thumb.jpg"}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-[11px] text-gray-500 italic">
                  {item.description?.split(". ")[0] || "Standard"}
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {currency}. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="flex flex-col items-end ml-2">
              <div className="flex items-center border border-gray-300 rounded-full px-1">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-0.5 text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50"
                >
                  <Minus size={12} />
                </button>
                <span className="px-1 text-xs font-semibold text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-0.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-full"
                >
                  <Plus size={12} />
                </button>
              </div>
              <button
                onClick={() => handleUpdateQuantity(item.id, 0)}
                className="mt-1 text-red-500 hover:text-red-700 p-0.5 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-3">
        <div className="flex justify-between items-center text-base font-extrabold text-gray-900 mb-2">
          <span className="text-sm font-semibold">
            Total{" "}
            <span className="text-xs text-gray-500">(incl. fees & tax)</span>
          </span>
          <span>
            {currency}.{" "}
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <button
          onClick={() => setShowSummary(!showSummary)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center mb-2"
        >
          {showSummary ? "Hide summary" : "See summary"}
          {showSummary ? (
            <ChevronUp size={12} className="ml-1" />
          ) : (
            <ChevronDown size={12} className="ml-1" />
          )}
        </button>

        {showSummary && (
          <div className="space-y-1 text-xs text-gray-600 mb-2 border-t pt-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency}. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee {isDelivery ? "" : "(N/A)"}</span>
              <span>{isDelivery ? `${currency}. ${deliveryFee}` : `${currency}. 0`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>{currency}. {tax.toFixed(2)}</span>
            </div>
          </div>
        )}

        <button
          onClick={onCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-extrabold text-xs hover:bg-blue-700 transition"
        >
          Review payment & address
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
