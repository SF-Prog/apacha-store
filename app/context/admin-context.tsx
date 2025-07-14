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
import { getSubscriptions } from "@/actions/get-subscriptions";
import { getEventRequests } from "@/actions/get-event-requests";
import { displayToaster, parseProductsList } from "@/lib/utils";
import { toasterStatus } from "@/lib/constants";
import { setEventRequestStatus } from "@/actions/set-event-request-status";
import { getWeeklyMenu } from "@/actions/get-weekly-menu";
import { setWeeklyMenu } from "@/actions/set-weekly-menu";

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ productsList, setProductsList ] = useState<ProductItem[]>([]);
  const [ productCategories, setProductCategories ] = useState<ProductCategory[]>([]);
  const [ showCreateProductModal, setShowCreateProductModal ] = useState<boolean>(false);
  const [ showEditProductModal, setShowEditProductModal ] = useState<boolean>(false);
  const [ showCreateWorkshopModal, setShowCreateWorkshopModal ] = useState<boolean>(false);
  const [ showEditWorkshopModal, setShowEditWorkshopModal ] = useState<boolean>(false);
  const [ eventRequests, setEventRequests ] = useState<EventRequest[]>([]);
  const [ subscriptions, setSubscriptions ] = useState<Subscription[]>([]);
  const [ weeklyMenuImage, setWeeklyMenuImage ] = useState<string>('/placeholder.svg');
  const { products, loadProducts, isLoading, setIsLoading, workshops, loadWorkshops } = useStore();

  useEffect(() => {
    void loadProducts();
    void loadProductCategories();
    void loadWorkshops();
    void loadEventRequests();
    void loadWeeklyMenuData();
  }, []);

  useEffect(() => {
    const productItems = parseProductsList(products);

    setProductsList(productItems);
  }, [products]);

  const loadEventRequests = async () => {
    try {
      setIsLoading(true);
      const requests = await getEventRequests();
      if (!requests) return;

      setEventRequests(requests);
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    } finally {
      setIsLoading(false);
    };
  };

  const updateEventRequestStatus = async (id: string, newStatus: string) => {
    try {
      await setEventRequestStatus(id, newStatus);
      await loadEventRequests();
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    };
  }

  const loadProductCategories = async () => {
    try {
      const categories = await getProductCategories();
      if (!categories) return;

      setProductCategories(categories);
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    };
  }

  const loadSubscriptions = async () => {
    try {
      const subscriptions = await getSubscriptions();
      if (!subscriptions) return;
      setIsLoading(false);
      setSubscriptions(subscriptions);
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
    const product = productsList.find(p => p.id === id);
    try {
      setIsLoading(true);
      await deleteProduct(product);
      await loadProducts();
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (data: FormData) => {
    try {
      setIsLoading(true);

      const response = await setProduct(data);
      if (!response.success) throw new Error(response.message);

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

  const addProductCategory = async (cat: ProductCategory) => {
    try {
      setIsLoading(true);
      const { name, priority } = cat;
      await createProductCategory({ name, priority });
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

      displayToaster(toasterStatus.SUCCESS, 'The Workshops has been successfully created.',)

      setShowCreateWorkshopModal(false);
      await loadWorkshops();
    } catch (error) {
      displayToaster(toasterStatus.ERROR, 'Failed to create Workshops. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };

  const removeWorkshop = async (id: string) => {
    try {
      const workshop: Workshop = workshops.find((w) => w.id === id);
      setIsLoading(true);
      await deleteWorkshop(workshop);
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

      setShowEditWorkshopModal(false);
    }
    catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    }
    finally {
      setIsLoading(false);
    };
  };

  const loadWeeklyMenuData = async () => {
    try {
      setIsLoading(true);
      const response = await getWeeklyMenu();
      if (!response?.success) throw new Error("Fallo carga de menu semanal");
      setIsLoading(false);
      setWeeklyMenuImage(response.image);
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.message);
      return false;
    };
  };
  
  const setWeeklyMenuData = async (image: string) => {
    try {
      setIsLoading(true);
      const response = await setWeeklyMenu({ image });
      if (!response.success) throw new Error("Something went wrong");

      setIsLoading(false);
      return response.path;
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.message);
      return false;
    };
  };

  const value = {
    productsList,
    addProduct,
    removeProduct,
    updateProduct,
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
    workshops,
    showCreateWorkshopModal,
    setShowCreateWorkshopModal,
    showEditWorkshopModal,
    setShowEditWorkshopModal,
    eventRequests,
    updateEventRequestStatus,
    subscriptions,
    setSubscriptions,
    loadSubscriptions,
    loadWeeklyMenuData,
    setWeeklyMenuData,
    weeklyMenuImage
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
