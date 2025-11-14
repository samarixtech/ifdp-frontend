
import React, { useState } from 'react';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

const CheckoutPayment: React.FC = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');

    const paymentOptions = [
        { key: 'card', label: 'Credit/Debit Card', icon: CreditCard },
        { key: 'wallet', label: 'FoodApp Wallet', icon: Wallet },
        { key: 'cash', label: 'Cash on Delivery (COD)', icon: DollarSign },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. Payment Method</h2>
            
            <div className="space-y-3">
                {paymentOptions.map(option => (
                    <button 
                        key={option.key}
                        onClick={() => setSelectedPayment(option.key)}
                        className={`w-full text-left flex items-center justify-between p-4 rounded-lg border-2 transition 
                            ${selectedPayment === option.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <div className="flex items-center space-x-3">
                            <option.icon className={`w-5 h-5 ${selectedPayment === option.key ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-semibold text-gray-800">{option.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${selectedPayment === option.key ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`} />
                    </button>
                ))}
            </div>
            
            {/* Card details input (only for selected card option) */}
            {selectedPayment === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition mb-2"
                    />
                    <div className="flex space-x-2">
                        <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border border-gray-300 rounded-md" />
                        <input type="text" placeholder="CVV" className="w-1/2 p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPayment;