"use client"
import React, { createContext, useContext, useReducer } from 'react';

// Define initial value for the context
const initialValue = {
    cart: [],
    totalItems: 0,
    totalAmount: 0,
    shippingFee: 50000
};

// Define your reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
                totalItems: state.totalItems + 1,
                totalAmount: state.totalAmount + action.payload.price
            };
        // Add other cases for different actions if needed
        default:
            return state;
    }
};

// Create context with initial value
const CartContext = createContext(initialValue);

const CartProvider = ({ children }) => {
    // Use useReducer hook to manage state with the defined reducer function
    const [state, dispatch] = useReducer(reducer, initialValue);

    // Define handleAddToCart function
    const handleAddToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    // Provide state and handleAddToCart function to the context
    return <CartContext.Provider value={{ ...state, handleAddToCart }}>{children}</CartContext.Provider>;
};

// Custom hook to use CartContext
const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
