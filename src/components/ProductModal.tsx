
"use client";
import React, { useState, useMemo } from 'react'; 
import { MenuItem, Variation, AddOn } from '@/types/menu';
import { X, Minus, Plus, ChevronLeft, ChevronRight, Info } from 'lucide-react';
const mockVariations: Variation[] = [
    { id: 'v1', name: 'Single Cookie', price: 80, required: true }, 
    { id: 'v2', name: '6 Cookie Deal', price: 420, required: true },
    { id: 'v3', name: '12 Cookie Deal', price: 800, required: true },
];

const mockAddOnGroups = [
    {
        id: 'g1',
        title: 'Choose a Drink',
        maxSelection: 1, // Radio button behavior (choose only one)
        items: [
            { id: 'a1', name: 'Slice Juice 200 ml', price: 100 },
            { id: 'a2', name: 'Pepsi 500 ml', price: 120 },
            { id: 'a3', name: 'Water Bottle', price: 80 },
        ] as (AddOn & { groupId: string })[], // Added groupId for tracking
    },
    {
        id: 'g2',
        title: 'Extra Sweetness',
        maxSelection: 2, 
        items: [
            { id: 'a4', name: 'Extra Brownie', price: 150 },
            { id: 'a5', name: 'Chocolate Chip Dip', price: 90 },
            { id: 'a6', name: 'Whipped Cream', price: 50 },
        ] as (AddOn & { groupId: string })[],
    }
];

const mockItemGallery = [
    'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D', // Main image (assuming this is loaded via item.imageUrl)
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
];

interface ProductModalProps {
    item: MenuItem;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (item: MenuItem, quantity: number, options: { variation: Variation, addOns: AddOn[], instructions: string }) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
    if (!isOpen) return null;

    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState<Variation | null>(mockVariations[0]); 
    const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { groupId: string })[]>([]); 
    const [instructions, setInstructions] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addOnsTotal, currentPrice, finalTotal, isSelectionValid } = useMemo(() => {
        const basePrice = selectedVariation ? selectedVariation.price : 0;
        const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
        const currentPrice = basePrice + addOnsTotal;
        const finalTotal = currentPrice * quantity;

        const isVariationSelected = !!selectedVariation;
        
        // Validation Logic: Check if all required groups meet selection criteria (min 1, max N)
        const allGroupsValid = mockAddOnGroups.every(group => {
            const selectedInGroup = selectedAddOns.filter(a => a.groupId === group.id).length;
            // Assuming required groups must have at least 1 selection, if maxSelection > 0 
            // and we set the group to be required (for simplicity, we skip complex min logic here, 
            // only enforcing max for now, but a professional system would need min too)
            return selectedInGroup <= group.maxSelection;
        });

        return { 
            addOnsTotal, 
            currentPrice, 
            finalTotal,
            isSelectionValid: isVariationSelected && allGroupsValid 
        };
    }, [quantity, selectedVariation, selectedAddOns]);

    // --- Handlers ---

    const handleAddOnToggle = (addOn: AddOn & { groupId: string }, group: typeof mockAddOnGroups[0]) => {
        const isSelected = selectedAddOns.some(a => a.id === addOn.id);
        const selectedInGroup = selectedAddOns.filter(a => a.groupId === group.id);

        setSelectedAddOns(prev => {
            if (isSelected) {
                // Remove the item
                return prev.filter(a => a.id !== addOn.id);
            } else {
                // Add the item, checking max selection
                if (group.maxSelection === 1) {
                    // Radio behavior: Remove others in the group first, then add new one
                    const otherAddOns = prev.filter(a => a.groupId !== group.id);
                    return [...otherAddOns, addOn];
                } else if (selectedInGroup.length < group.maxSelection) {
                    // Checkbox behavior: Add if max limit is not reached
                    return [...prev, addOn];
                } else {
                    // Max limit reached (do nothing or show toast)
                    return prev;
                }
            }
        });
    };

    const handleSubmit = () => {
        if (!isSelectionValid || !selectedVariation) return; 
        onAddToCart(item, quantity, { 
            variation: selectedVariation, 
            addOns: selectedAddOns.map(a => ({ id: a.id, name: a.name, price: a.price })), 
            instructions 
        });
        
        // Reset state and close
        setQuantity(1);
        setSelectedVariation(mockVariations[0]);
        setSelectedAddOns([]);
        setInstructions('');
        onClose();
    };
    
    // Image Gallery Handlers
    const nextImage = () => setCurrentImageIndex(i => (i + 1) % mockItemGallery.length);
    const prevImage = () => setCurrentImageIndex(i => (i - 1 + mockItemGallery.length) % mockItemGallery.length);


    return (
        // Modal Container
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-black transition-opacity" onClick={onClose}>
            <div 
                // Modal Content: Compact size
                className="bg-white rounded-xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col max-h-[95vh] text-sm" 
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300 transition z-20 p-1 bg-black/40 rounded-full">
                    <X size={18} />
                </button>

                {/* Item Image Gallery (Header) */}
                <div className="h-36 overflow-hidden relative">
                    <img 
                        src={mockItemGallery[currentImageIndex]} 
                        alt={`${item.name} image ${currentImageIndex + 1}`} 
                        className="w-full h-full object-cover transition duration-300" 
                    />
                    
                    {/* Navigation Arrows */}
                    {mockItemGallery.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/40 text-white rounded-full hover:bg-black/60 z-10">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/40 text-white rounded-full hover:bg-black/60 z-10">
                                <ChevronRight size={16} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {mockItemGallery.map((_, index) => (
                                    <span key={index} className={`block h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400/70'}`}></span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                
                {/* Content Area */}
                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar class for appearance */}
                    <h2 className="text-xl font-extrabold text-gray-900">{item.name}</h2>
                    <p className="text-sm font-bold text-green-600 mt-0.5">Rs. {currentPrice.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    <hr className="my-3 border-gray-100" />

                    {/* --- 1. Variation Section (Required) --- */}
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                            Size/Variation
                            <span className="text-xs font-normal text-pink-600 ml-1.5 flex items-center">
                                (Required) <Info size={12} className="ml-1 text-pink-400" />
                            </span>
                        </h3>
                        <div className="space-y-2">
                            {mockVariations.map(variation => (
                                <div key={variation.id} className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer transition ${selectedVariation?.id === variation.id ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
                                    onClick={() => setSelectedVariation(variation)}
                                >
                                    <span className="font-medium text-gray-700">{variation.name}</span>
                                    <div className="flex items-center">
                                        <span className="font-semibold mr-2">Rs. {variation.price.toLocaleString()}</span>
                                        <input type="radio" name="variation" checked={selectedVariation?.id === variation.id} readOnly className="h-4 w-4 text-green-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- 2. Add-on Groups (Dynamic Selection) --- */}
                    {mockAddOnGroups.map(group => (
                        <div key={group.id} className="mb-4">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                                {group.title}
                                <span className="text-xs font-normal text-gray-400 ml-1.5 flex items-center">
                                    (Max {group.maxSelection}) <Info size={12} className="ml-1 text-gray-300" />
                                </span>
                            </h3>
                            <div className="space-y-2">
                                {group.items.map(addOn => {
                                    const isSelected = selectedAddOns.some(a => a.id === addOn.id);
                                    const isMaxReached = group.maxSelection > 1 && selectedAddOns.filter(a => a.groupId === group.id).length >= group.maxSelection && !isSelected;
                                    
                                    return (
                                        <div 
                                            key={addOn.id} 
                                            className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer transition ${isSelected ? 'border-blue-500 bg-blue-50' : isMaxReached ? 'bg-gray-100 text-gray-400 opacity-60' : 'border-gray-200 hover:bg-gray-50'}`}
                                            onClick={() => !isMaxReached && handleAddOnToggle({ ...addOn, groupId: group.id }, group)}
                                        >
                                            <span className="font-medium">{addOn.name}</span>
                                            <div className="flex items-center">
                                                <span className="font-semibold mr-2">
                                                    {addOn.price > 0 ? `+ Rs. ${addOn.price.toLocaleString()}` : 'FREE'}
                                                </span>
                                                <input 
                                                    type={group.maxSelection === 1 ? "radio" : "checkbox"}
                                                    checked={isSelected}
                                                    readOnly
                                                    disabled={isMaxReached}
                                                    className={`h-4 w-4 ${group.maxSelection === 1 ? 'text-blue-600' : 'text-blue-600 rounded'}`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}


                    {/* --- 3. Special Instructions --- */}
                    <div className="mb-2">
                        <h3 className="font-bold text-gray-800 mb-2">Special Instructions</h3>
                        <textarea 
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. No mayo, extra sauce..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition h-10 text-sm resize-none"
                        ></textarea>
                    </div>

                </div>
                
                {/* Footer (Quantity & Add to Cart) - Professional Sticky Bar */}
                <div className="bg-white border-t border-gray-100 p-3 flex justify-between items-center shadow-2xl flex-shrink-0">
                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-0.5">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition">
                            <Minus size={18} />
                        </button>
                        <span className="text-base font-bold w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-full transition">
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!isSelectionValid}
                        className={`text-white py-2 px-4 rounded-full font-extrabold text-sm transition transform active:scale-95 shadow-md ${
                            isSelectionValid ? 'bg-green-600 hover:bg-green-700 shadow-green-400/50' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Add {quantity} to Cart (Rs. {finalTotal.toLocaleString()})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;