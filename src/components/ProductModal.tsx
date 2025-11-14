// src/components/ProductModal.tsx
"use client";
import React, { useState, useMemo } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { addToCart } from '@/redux/slices/cartSlice'; 
import { MenuItem, Variation, AddOn, CartItem } from '@/types/menu'; 
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
        maxSelection: 1, 
        items: [
            { id: 'a1', name: 'Slice Juice 200 ml', price: 100 },
            { id: 'a2', name: 'Pepsi 500 ml', price: 120 },
            { id: 'a3', name: 'Water Bottle', price: 80 },
        ] as (AddOn & { groupId: string })[],
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
    'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D', 
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
];

interface ProductModalProps {
    item: MenuItem;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;

}

const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose,onAddToCart }) => {
    if (!isOpen) return null;

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState<Variation | null>(mockVariations[0]); 
    const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { groupId: string })[]>([]); 
    const [instructions, setInstructions] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { currentPrice, finalTotal, isSelectionValid } = useMemo(() => {
        const basePrice = selectedVariation ? selectedVariation.price : 0;
        const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
        const currentPrice = basePrice + addOnsTotal;
        const finalTotal = currentPrice * quantity;

        const isVariationSelected = !!selectedVariation;
        
        const allGroupsValid = mockAddOnGroups.every(group => {
            const selectedInGroup = selectedAddOns.filter(a => a.groupId === group.id).length;
            return selectedInGroup <= group.maxSelection;
        });

        return { 
            currentPrice, 
            finalTotal,
            isSelectionValid: isVariationSelected && allGroupsValid 
        };
    }, [quantity, selectedVariation, selectedAddOns]);


    const handleAddOnToggle = (addOn: AddOn & { groupId: string }, group: typeof mockAddOnGroups[0]) => {
        const isSelected = selectedAddOns.some(a => a.id === addOn.id);
        const selectedInGroup = selectedAddOns.filter(a => a.groupId === group.id);

        setSelectedAddOns(prev => {
            if (isSelected) {
                return prev.filter(a => a.id !== addOn.id);
            } else {
                if (group.maxSelection === 1) {
                    const otherAddOns = prev.filter(a => a.groupId !== group.id);
                    return [...otherAddOns, addOn];
                } else if (selectedInGroup.length < group.maxSelection) {
                    return [...prev, addOn];
                } else {
                    return prev;
                }
            }
        });
    };

    const handleSubmit = () => {
        if (!isSelectionValid || !selectedVariation) return; 

        const addOnIds = selectedAddOns.map(a => a.id).sort().join(',');
        const uniqueId = `${item.id}-${selectedVariation.id}-${addOnIds}-${instructions.trim()}`;

        const descriptionSummary = `${selectedVariation.name}`
            + (selectedAddOns.length > 0 ? `, Add-ons: ${selectedAddOns.map(a => a.name).join(', ')}` : '')
            + (instructions.trim() ? `, Instr: "${instructions.trim()}"` : '');
        
        // 3. Create the CartItem object
        const cartItem: CartItem = {
            id: uniqueId,
            productId: item.id,
            name: item.name,
            quantity: quantity,
            price: currentPrice, 
            imageUrl: item.imageUrl || mockItemGallery[0], 
            description: descriptionSummary,
        };

        console.log("🛒 Item being added to Cart (Redux Payload):", cartItem);
        
        // 4. Dispatch the action
        dispatch(addToCart(cartItem));

        setQuantity(1);
        setSelectedVariation(mockVariations[0]);
        setSelectedAddOns([]);
        setInstructions('');
        onClose();
    };
    

    const nextImage = () => setCurrentImageIndex(i => (i + 1) % mockItemGallery.length);
    const prevImage = () => setCurrentImageIndex(i => (i - 1 + mockItemGallery.length) % mockItemGallery.length);


    return (

        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-black transition-opacity" onClick={onClose}>
            <div 
                className="bg-white rounded-xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col max-h-[95vh] text-sm" 
                onClick={(e) => e.stopPropagation()} 
            >
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300 transition z-20 p-1 bg-black/40 rounded-full">
                    <X size={18} />
                </button>

                <div className="h-36 overflow-hidden relative">
                    <img 
                        src={mockItemGallery[currentImageIndex]} 
                        alt={`${item.name} image ${currentImageIndex + 1}`} 
                        className="w-full h-full object-cover transition duration-300" 
                    />
                    
                    {mockItemGallery.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/40 text-white rounded-full hover:bg-black/60 z-10"><ChevronLeft size={16} /></button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-black/40 text-white rounded-full hover:bg-black/60 z-10"><ChevronRight size={16} /></button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {mockItemGallery.map((_, index) => (<span key={index} className={`block h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400/70'}`}></span>))}
                            </div>
                        </>
                    )}
                </div>
                
                {/* Content Area (JSX remains the same) */}
                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                    <h2 className="text-xl font-extrabold text-gray-900">{item.name}</h2>
                    <p className="text-sm font-bold text-green-600 mt-0.5">Rs. {currentPrice.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    <hr className="my-3 border-gray-100" />

                    {/* --- 1. Variation Section --- */}
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-center">Size/Variation<span className="text-xs font-normal text-pink-600 ml-1.5 flex items-center">(Required) <Info size={12} className="ml-1 text-pink-400" /></span></h3>
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

                    {/* --- 2. Add-on Groups --- */}
                    {mockAddOnGroups.map(group => (
                        <div key={group.id} className="mb-4">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center">{group.title}<span className="text-xs font-normal text-gray-400 ml-1.5 flex items-center">(Max {group.maxSelection}) <Info size={12} className="ml-1 text-gray-300" /></span></h3>
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
                                                <span className="font-semibold mr-2">{addOn.price > 0 ? `+ Rs. ${addOn.price.toLocaleString()}` : 'FREE'}</span>
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
                
                {/* Footer (Quantity & Add to Cart) */}
                <div className="bg-white border-t border-gray-100 p-3 flex justify-between items-center shadow-2xl flex-shrink-0">
                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-0.5">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition"><Minus size={18} /></button>
                        <span className="text-base font-bold w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-full transition"><Plus size={18} /></button>
                    </div>

                    {/* Add to Cart Button uses Redux handleSubmit */}
                    <button
                        onClick={handleSubmit} // <-- Now calls the Redux-enabled handler
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