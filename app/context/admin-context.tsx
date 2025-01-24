'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { useStore } from "./store-context";
const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductItem[]>([]);
  const { products, loadProducts } = useStore();

  useEffect(() => {
    if (!!products.length) return;
    loadProducts();
  }, []);

  useEffect(() => {
    const productItems = [...products].reduce((acc, cur) => {
      return [].concat(acc, cur.products);
    }, []);

    setProductsList(productItems);
  }, [products]);

  const addProduct = () => {

  };

  const removeProduct = () => {

  };

  const editProduct = () => {

  };

  const value = {
    productsList,
    addProduct,
    removeProduct,
    editProduct
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within a AdminProvider')
  };
  return context;
}
