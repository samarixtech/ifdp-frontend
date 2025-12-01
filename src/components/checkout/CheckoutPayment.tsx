
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
        <div className="bg-[#E8F4F1] p-6 rounded-xl shadow-md border border-[#FFF9EE]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. Payment Method</h2>
            
            <div className="space-y-3">
                {paymentOptions.map(option => (
                    <button 
                        key={option.key}
                        onClick={() => setSelectedPayment(option.key)}
                        className={`w-full text-left flex items-center justify-between p-4 rounded-lg border-2 transition 
                            ${selectedPayment === option.key ? 'border-[#0B5D4E] bg-[#0B5D4E] text-white' : 'border-[#FFF9EE] hover:border-gray-300'}`}
                    >
                        <div className="flex items-center space-x-3">
                            <option.icon className={`w-5 h-5 ${selectedPayment === option.key ? 'text-[#fff]' : 'text-gray-500'}`} />
                            <span className={` ${selectedPayment === option.key ? 'text-[#fff]' : 'text-gray-500'}`} >{option.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${selectedPayment === option.key ? 'bg-[#fff] border-[#0B5D4E] text-white' : 'border-gray-400'}`} />
                    </button>
                ))}
            </div>
            
            {/* Card details input (only for selected card option) */}
            {selectedPayment === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-[#FFF9EE]">
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#0B5D4E] focus:border-[#0B5D4E] transition mb-2"
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