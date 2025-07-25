'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { toasterStatus, services, weeklyMenuExample, mealPacks, meals, subscriptionTypes } from "@/app/lib/constants";
import { displayToaster, parseProductsList, sortProductsByPriority, sortWorkshopsByPriority } from "@/app/lib/utils";
import { sendMenuEmail } from "@/actions/send-weekly-menu";
import { getProducts } from "@/actions/get-products";
import { createEventRequest } from "@/actions/create-event-request";
import { createSubscription } from "../actions/create-subscription";
import { getWorkshops } from "@/actions/get-workshops";
import { getWeeklyMenu } from "@/app/actions/get-weekly-menu";
import { getProductCategories } from "@/actions/get-product-categories";

const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductsByCategory[]>([]);
  const [ productCategories, setProductCategories ] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setIsLoading(false);
      setProducts(sortProductsByPriority(data));
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.details);
    };
  };

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const updateCartFromStorage = () => {
    const storedCart = sessionStorage.getItem('apachaCart')
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)
      setTotal(calculateTotal(parsedCart))
    }
  }

  const addCartItem = (newItem: ProductItem) => {
    const productsList = parseProductsList(products);

    const availableQuantity = productsList.find((p) => p.id === newItem.id)?.qty;

    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (!existingItem) return setCartItems([...cartItems, { ...newItem, quantity: 1 }]);

    const modifiedItem = cartItems.find(i => i.id === newItem.id);
    const hasStockAvailable = modifiedItem.quantity + 1 <= availableQuantity;

    if (!hasStockAvailable) {
      displayToaster(toasterStatus.ERROR, "No nos quedan mas articulos disponibles.");
    };

    const updatedCart = cartItems.map(item => {
      const isModifiedItem = item.id === newItem.id;
      if (!isModifiedItem) return item;

      return { ...item, quantity: item.quantity + 1 }
    });
    setCartItems(updatedCart);
  };

  const removeCartItem = (itemId: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
      return updatedItems
    })
  }

  const emptyCart = () => {
    setCartItems([])
    setTotal(0)
  };

  const onCartCheckout = () => {
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=${encodeURIComponent(
      `Hola, me gustaría hacer un pedido:\n\n${cartItems
        .map((item) => `${item.title} x${item.quantity}`)
        .join('\n')}\n\nTotal: $${total.toFixed(2)}`
    )}`;
    window.open(whatsappLink);
  };

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const sendWeeklyMenuToEmail = async (email: string) => {
    try {
      const result = await sendMenuEmail(email);
      if (result.success) {
        displayToaster(toasterStatus.SUCCESS, '¡Menú enviado! Revisa tu correo.');
      } else {
        displayToaster(toasterStatus.ERROR, 'Error al enviar el menú. Por favor, intenta de nuevo.');
      };
    } catch (error) {
      displayToaster(toasterStatus.ERROR, 'Ocurrió un error. Por favor, intenta de nuevo más tarde.');
    };
  };

  const loadWorkshops = async () => {
    try {
      setIsLoading(true);
      const data = await getWorkshops();
      setIsLoading(false);
      setWorkshops(sortWorkshopsByPriority(data));
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.details);
    };
  };

  const sendMenuSubscription = async (phone: string) => {
    try {
      setIsLoading(true);
      await createSubscription({ phone, type: subscriptionTypes.MENU });
      displayToaster(toasterStatus.SUCCESS, "Enviamos su solicitud, nos comunicaremos pronto!")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.details);
    };
  };

  const sendWorkshopSubscription = async ({ phone, topic }: WorkshopSubscription) => {
    try {
      setIsLoading(true);
      await createSubscription({ phone, topic, type: subscriptionTypes.WORKSHOP });
      displayToaster(toasterStatus.SUCCESS, "Enviamos su solicitud, nos comunicaremos pronto!")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.details);
    };
  };

  const onRegisterToWorkshop = (workshop: Workshop) => {
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=${encodeURIComponent(
      `Hola, estoy interesado/a en recibir más información sobre el Taller: ${workshop.title}.`
    )}`;
    window.open(whatsappLink);
  };

  const sendEventRequest = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await createEventRequest(data);
      if (!response.success) throw new Error(response.message);
      displayToaster(toasterStatus.SUCCESS, response.message);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.message);
      return false;
    };
  };

  const getWeeklyMenuData = async () => {
    try {
      setIsLoading(true);
      const response = await getWeeklyMenu();
      if (!response?.success) throw new Error("Fallo carga de menu semanal");

      setIsLoading(false);
      return response.image;
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.message);
      return false;
    };
  };

  const loadProductCategories = async () => {
    try {
      const categories = await getProductCategories();
      if (!categories) return;

      setProductCategories(categories);
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message);
    };
  }

  useEffect(() => {
    updateCartFromStorage();
    void loadProductCategories();
  }, [])

  useEffect(() => {
    setTotal(calculateTotal(cartItems))
    sessionStorage.setItem('apachaCart', JSON.stringify(cartItems))
  }, [cartItems])

  const value: StoreContextType = {
    products,
    cartItems,
    total,
    addCartItem,
    removeCartItem,
    emptyCart,
    updateCartFromStorage,
    onCartCheckout,
    selectedMeals,
    meals,
    mealPacks,
    toggleMeal,
    sendWeeklyMenuToEmail,
    weeklyMenuExample,
    services,
    loadProducts,
    isLoading,
    setIsLoading,
    workshops,
    loadWorkshops,
    onRegisterToWorkshop,
    sendEventRequest,
    sendMenuSubscription,
    sendWorkshopSubscription,
    getWeeklyMenuData,
    productCategories,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  };
  return context;
}