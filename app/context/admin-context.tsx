'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { loginAdmin } from "@/actions/loginAdmin";
import { useStore } from "./store-context";
const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductsByCategory[]>([]);
  const { products } = useStore();

  useEffect(() => {
    setProductsList(products);
  });

  const addProduct = () => {

  };

  const removeProduct = () => {

  };

  const editProduct = () => {

  };

  const value = {
    addProduct,
    removeProduct,
    editProduct
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAuth = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAuth must be used within a AdminProvider')
  };
  return context;
}
