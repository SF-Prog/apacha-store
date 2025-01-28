'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { useStore } from "./store-context";
import { createProduct } from "@/actions/addProduct";
import { displayToaster } from "@/lib/utils";
const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductItem[]>([]);
  const { products, loadProducts, isLoading, setIsLoading } = useStore();

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

  const addProduct = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await createProduct(data)
      if (result.success) {
        displayToaster('success', 'The product has been successfully created.',)
        // form.reset()
        // setPreviewImage(null)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      displayToaster('Error', 'Failed to create product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  };

  const removeProduct = (id: string) => {
    
  };

  const editProduct = (newProduct: FormData) => {

  };

  const value = {
    productsList,
    addProduct,
    removeProduct,
    editProduct,
    isLoading
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
