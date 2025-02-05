'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { useStore } from "./store-context";
import { createProduct } from "@/actions/create-product";
import { getProductCategories } from '@/actions/get-product-categories';
import { createProductCategory } from "@/actions/create-product-category";
import { setProductCategory } from '@/actions/set-product-category';
import { deleteProductCategory } from '@/actions/delete-product-category';
import { displayToaster, parseProductsList } from "@/lib/utils";
import { toasterStatus } from "@/lib/constants";

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductItem[]>([]);
  const [ productCategories, setProductCategories ] = useState<ProductCategory[]>([]);
  const [ showCreateProductModal, setShowCreateProductModal ] = useState<boolean>(false);
  const [ showEditProductModal, setShowEditProductModal ] = useState<boolean>(false);

  const { products, loadProducts, isLoading, setIsLoading } = useStore();

  useEffect(() => {
    void loadProducts();
    void loadProductCategories();
  }, []);

  useEffect(() => {
    const productItems = parseProductsList(products);

    setProductsList(productItems);
  }, [products]);

  const loadProductCategories = async () => {
    try {
      const categories = await getProductCategories();
      if (!categories) return;

      setProductCategories(categories);
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    };
  }

  const addProduct = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await createProduct(data);
      if (!result.success)  throw new Error(result.error);

      displayToaster('success', 'The product has been successfully created.',)

      await loadProducts();
      setShowCreateProductModal(false);
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

  const addProductCategory = async (name: string) => {
    try {
      setIsLoading(true);
      await createProductCategory({ name });
      await loadProductCategories();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const updateProductCategory = async (cat: ProductCategory) => {
    try {
      setIsLoading(true);
      await setProductCategory(cat);
      await loadProductCategories();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const removeProductCategory = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteProductCategory(id);
      await loadProductCategories();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const value = {
    productsList,
    addProduct,
    removeProduct,
    editProduct,
    isLoading,
    showCreateProductModal,
    setShowCreateProductModal,
    showEditProductModal,
    setShowEditProductModal,
    addProductCategory,
    updateProductCategory,
    removeProductCategory,
    productCategories
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
