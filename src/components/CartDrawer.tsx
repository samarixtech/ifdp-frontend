"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, clearCart } from "@/redux/slices/cartSlice";

import { X, Trash2, Plus, Minus, Currency } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useCLC } from "@/app/context/CLCContext.tsx";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { currency } = useCLC(); 
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const currentRestaurant = {
    id: "F8",
    name: "Subway - F8",
    deliveryTime: "10–25 mins",
  };

  const hasItems = cart.length > 0;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert("Going to checkout for: " + currentRestaurant.name);
    router.push("/checkout");
    onClose();
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-[9998] bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* DRAWER PANEL */}
      <div
        className={`fixed top-0 right-[-17px] w-full max-w-[360px] h-full bg-white z-[9999] shadow-2xl
        transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col`}
      >
        {/* HEADER */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {hasItems ? (
            <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-md">
              {/* RESTAURANT INFO */}
              <div className="flex justify-between items-start mb-3">
                
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <img
                      src="/images/restaurant-icon-1.png"
                      alt="Icon"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{currentRestaurant.name}</p>
                    <p className="text-xs text-gray-500">{currentRestaurant.deliveryTime}</p>
                  </div>
                </div>

                {/* CLEAR CART BUTTON */}
                <button
                  onClick={handleClearCart}
                  className="text-gray-400 hover:text-red-500 transition p-1"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* CART ITEMS FULL LIST */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.imageUrl || "/images/placeholder-thumb.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />

                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500 text-sm">{currency} {item.price}</p>
                      </div>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-md font-semibold w-6 text-center">{item.quantity}</span>

                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* MINI THUMBNAIL DISPLAY (FIRST 3 ITEMS) */}
              <div className="flex space-x-2 mb-4 justify-center mt-5">
                {cart.slice(0, 3).map((item, index) => (
                  <div key={item.id} className="relative">
                    <img
                      src={item.imageUrl || "/images/placeholder-thumb.jpg"}
                      alt={item.name}
                      className={`w-16 h-16 object-cover rounded-lg border-2 ${
                        index === 0 ? "border-green-500" : "border-gray-200"
                      }`}
                    />
                    {item.quantity > 1 && (
                      <span className="absolute bottom-0 right-0 bg-white text-xs text-gray-800 font-bold px-1 rounded-full border border-gray-300">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                ))}

                {/* ADD MORE BUTTON */}
                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-16 h-16 border-2 border-dashed border-gray-300 text-gray-500 
                    rounded-lg flex items-center justify-center text-xl font-light"
                >
                  +
                </button>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-extrabold text-sm hover:bg-blue-700 transition"
              >
                Go to checkout
              </button>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>Your cart is empty.</p>
              <p className="text-sm mt-1">Start adding items to see your cart!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
