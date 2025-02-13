'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { useStore } from "./store-context";
import { createProduct } from "@/actions/create-product";
import { deleteProduct } from "@/actions/delete-product";
import { setProduct } from "@/actions/set-product";
import { getProductCategories } from '@/actions/get-product-categories';
import { createProductCategory } from "@/actions/create-product-category";
import { setProductCategory } from '@/actions/set-product-category';
import { deleteProductCategory } from '@/actions/delete-product-category';
import { createWorkshop } from "@/actions/create-workshop";
import { deleteWorkshop } from "@/actions/delete-workshop";
import { setWorkshop } from "@/actions/set-workshop";
import { displayToaster, parseProductsList } from "@/lib/utils";
import { toasterStatus } from "@/lib/constants";

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductItem[]>([]);
  const [ productCategories, setProductCategories ] = useState<ProductCategory[]>([]);
  const [ showCreateProductModal, setShowCreateProductModal ] = useState<boolean>(false);
  const [ showEditProductModal, setShowEditProductModal ] = useState<boolean>(false);

  const { products, loadProducts, isLoading, setIsLoading, workshops, loadWorkshops } = useStore();

  useEffect(() => {
    void loadProducts();
    void loadProductCategories();
    void loadWorkshops();
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

  const removeProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      await loadProducts();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (data: FormData) => {
    try {
      setIsLoading(true);

      await setProduct(data);
      await loadProducts();
      displayToaster(toasterStatus.SUCCESS, 'Product edited.')
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    };
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

  const addWorkshop = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await createWorkshop(data);
      if (!result.success)  throw new Error(result.error);

      displayToaster('success', 'The Workshops has been successfully created.',)

      await loadWorkshops();
    } catch (error) {
      displayToaster('Error', 'Failed to create Workshops. Please try again.')
    } finally {
      setIsLoading(false)
    }
  };

  const removeWorkshop = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteWorkshop(id);
      await loadWorkshops();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const editWorkshop = async (data: FormData) => {
    try {
      setIsLoading(true);

      await setWorkshop(data);
      await loadWorkshops();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    };
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
    productCategories,
    addWorkshop,
    editWorkshop,
    removeWorkshop,
    workshops
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
