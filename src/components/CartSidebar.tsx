"use client";
import React, { useState } from "react";
import { CartItem } from "@/types/menu";
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface CartSidebarProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, onUpdateQuantity, onCheckout }) => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const baseDeliveryFee = 129;
  const taxRate = 0.05;
  const deliveryFee = isDelivery ? baseDeliveryFee : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg sticky top-20">
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsDelivery(true)}
            className={`flex-1 text-sm font-bold py-2 rounded-lg transition ${
              isDelivery ? "bg-white shadow-md text-blue-600" : "text-gray-500"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setIsDelivery(false)}
            className={`flex-1 text-sm font-bold py-2 rounded-lg transition ${
              !isDelivery ? "bg-white shadow-md text-blue-600" : "text-gray-500"
            }`}
          >
            Pick-up
          </button>
        </div>
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <img src="/images/cart-empty.png" alt="Empty Cart" className="mx-auto w-20 h-20 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Hungry?</h3>
          <p className="text-sm text-gray-500">You haven't added anything to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl sticky top-20 flex flex-col h-[80vh] md:h-[90vh] w-full max-w-md mx-auto md:mx-0">
      {/* Header: Delivery/Pickup */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex bg-blue-50 rounded-xl p-1">
          <button
            onClick={() => setIsDelivery(true)}
            className={`flex-1 text-sm font-bold py-2 rounded-xl transition flex flex-col items-center ${
              isDelivery ? "bg-white shadow-md text-blue-600" : "text-gray-500"
            }`}
          >
            Delivery
            <span className="text-xs font-medium mt-0.5 text-gray-500">Standard (10 - 25 mins)</span>
          </button>
          <button
            onClick={() => setIsDelivery(false)}
            className={`flex-1 text-sm font-bold py-2 rounded-xl transition flex flex-col items-center ${
              !isDelivery ? "bg-white shadow-md text-blue-600" : "text-gray-500"
            }`}
          >
            Pick-up
            <span className="text-xs font-medium mt-0.5 text-gray-500">Ready in 15 mins</span>
          </button>
        </div>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Your Items</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex space-x-3 w-full">
              <img
                src={item.imageUrl || "/images/placeholder-thumb.jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  {item.description.split(". ")[0].replace("Add-ons: ", "").replace("Instr: ", "") || "Standard"}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quantity & Remove */}
            <div className="flex flex-col items-end flex-shrink-0 ml-3">
              <div className="flex items-center space-x-1 border border-gray-300 rounded-full p-0.5">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-gray-900 w-4 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 bg-green-50 text-green-600 hover:bg-green-100 rounded-full transition"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => onUpdateQuantity(item.id, 0)}
                className="mt-2 text-red-500 hover:text-red-700 p-0.5 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Summary & Checkout */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 shadow-inner">
        <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 mb-3">
          <span className="text-base font-semibold">
            Total <span className="text-sm font-normal text-gray-500">(incl. fees & tax)</span>
          </span>
          <span>Rs. {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <button
          onClick={() => setShowSummary(!showSummary)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center mb-3"
        >
          {showSummary ? "Hide summary" : "See summary"}
          {showSummary ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>

        {showSummary && (
          <div className="space-y-2 text-sm text-gray-600 mb-3 border-t pt-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee {isDelivery ? "" : "(N/A)"}</span>
              <span>{isDelivery ? `Rs. ${deliveryFee.toLocaleString()}` : "Rs. 0"}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Charges (5%)</span>
              <span>Rs. {tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}

        <button
          onClick={onCheckout}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-extrabold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-400/50"
        >
          Review payment and address
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
