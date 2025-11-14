
import React from 'react';
import { ShoppingBag, AlertTriangle, ArrowRight } from 'lucide-react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface OrderSummaryProps {
    cartItems: CartItem[];
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
    cartItems, 
    subtotal, 
    deliveryFee, 
    tax, 
    total 
}) => {
    
    const formatPrice = (price: number) => `Rs. ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const handlePlaceOrder = () => {
        alert("Placing Order for " + formatPrice(total));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <ShoppingBag size={24} className="text-blue-600" />
                <span>Order Summary ({cartItems.length} Items)</span>
            </h2>

            {/* Item List (Simplified) */}
            <div className="space-y-3 max-h-48 overflow-y-auto mb-4 border-b pb-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <p className="text-gray-700">
                            <span className="font-bold mr-2">{item.quantity}x</span> {item.name}
                        </p>
                        <p className="font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-6 border-b pb-6 text-sm">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">{formatPrice(subtotal)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Delivery Fee</p>
                    <p className="font-medium">{formatPrice(deliveryFee)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Taxes & Fees (5%)</p>
                    <p className="font-medium">{formatPrice(tax)}</p>
                </div>
                
                {/* Discount/Voucher Input (Optional) */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Apply Voucher Code"
                        className="w-full p-2 border border-dashed border-gray-300 rounded-lg text-sm"
                    />
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold mb-6">
                <p className="text-gray-900">Total Amount</p>
                <p className="text-blue-600">{formatPrice(total)}</p>
            </div>
            
            {/* Special Instructions */}
            <div className="mb-6">
                <textarea
                    placeholder="Special instructions for the restaurant or rider (optional)"
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500"
                />
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-extrabold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-300/50 flex items-center justify-center space-x-2"
            >
                <span>Place Order</span>
                <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center text-xs text-gray-500 mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle size={16} className="text-yellow-600 mr-2 flex-shrink-0" />
                <p>By placing this order, you agree to our Terms and Conditions.</p>
            </div>
        </div>
    );
};

export default OrderSummary;