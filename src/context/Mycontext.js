"use client"
import React, { createContext, useState, useContext } from "react";

// Create the context
const ProductContext = createContext();

// Custom hook to use the context
export const useProduct = () => useContext(ProductContext);

// Context provider component
export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
