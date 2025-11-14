

import { CartItem } from '@/types/menu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [], 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        // Reducer 1: Add or Increment Item
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            
            // Find if an identical item (same ID) already exists
            const existingItem = state.items.find(item => item.id === newItem.id);

            // Mutating logic is safe with Redux Toolkit (RTK)
            if (existingItem) {
                // If found, increment quantity
                existingItem.quantity += newItem.quantity;
            } else {
                // If not found, add the new unique item
                state.items.push(newItem); 
            }
        },

        // Reducer 2: Update Quantity or Remove Item
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);

            if (itemIndex >= 0) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less (Trash functionality)
                    state.items.splice(itemIndex, 1);
                } else {
                    // Update quantity
                    state.items[itemIndex].quantity = quantity;
                }
            }
        },
        

        clearCart: (state) => {
            state.items = [];
        },
    },
});


export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;