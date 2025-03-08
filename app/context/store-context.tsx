'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { toasterStatus, services, weeklyMenuExample } from "@/app/lib/constants";
import { displayToaster, parseProductsList } from "@/app/lib/utils";
import { sendMenuEmail } from "@/actions/send-weekly-menu";
import { getProducts } from "@/actions/get-products";
import { getWorkshops } from "@/actions/get-workshops";

const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductsByCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setIsLoading(false);
      setProducts(data);
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

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (!existingItem) return [...prevItems, { ...newItem, quantity: 1 }];

      return prevItems.map(item => {
        const isModifiedItem = item.id === newItem.id;
        if (!isModifiedItem) return item;

        const hasStockAvailable = availableQuantity >= item.quantity + 1;
        if (!hasStockAvailable) return item;

        return { ...item, quantity: item.quantity + 1 }
      });
    });
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
    const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(
      `Hola, me gustaría hacer un pedido:\n\n${cartItems
        .map((item) => `${item.title} x${item.quantity}`)
        .join('\n')}\n\nTotal: $${total.toFixed(2)}`
    )}`;
    window.open(whatsappLink);
  };

  const mealPacks: MealPack[] = [
    {
      id: 'breakfast-prod',
      title: "Desayunos",
      description: "Jugos y licuados a base de frutas y verduras. Es una gran manera de comenzar el día hidratado e incorporando nutrientes, vitaminas y antioxidantes.",
      price: 1000,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno",
      image: "/breakfast-preview.jpg",
    },
    {
      id: 'lunch-prod',
      title: "Almuerzo",
      description: "El plato principal es una celebración de sabores y nutrición. Desde ensaladas vibrantes hasta guisos reconfortantes, cada opción ofrece un mundo de sabores y nutrientes. Ideales para solucionar tus almuerzos de una manera diferente y así no caer en el aburrimiento y monotonía.",
      price: 400,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%20y%20Almuerzo",
      image: "/lunch-preview.jpg"
    },
    {
      id: 'dinner-prod',
      title: "Cena",
      description: "sopa liviana y nutritiva. Al terminar el día y la rutina, muchas veces buscamos opciones prácticas para solucionar la cena. Las distintas variedades de sopas son ideales para incorporar a la rutina nocturna, ya que favorecerá a que te vayas a dormir liviano y de esta manera descansar mejor.",
      price: 800,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%2C%20Almuerzo%20y%20Cena",
      image: "/dinner-preview.jpg"
    }
  ];

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const totalMealsPrice = selectedMeals.reduce((sum, mealId) => {
    const meal = mealPacks.find(m => m.id === mealId)
    return sum + (meal?.price || 0)
  }, 0);

  const sendWeeklyMenuToEmail = async (email: string) => {
    try {
      const result = await sendMenuEmail(email);
      if (result.success) {
        displayToaster('SUCCESS', '¡Menú enviado! Revisa tu correo.');
      } else {
        displayToaster('ERROR', 'Error al enviar el menú. Por favor, intenta de nuevo.');
      };
    } catch (error) {
      displayToaster('ERROR', 'Ocurrió un error. Por favor, intenta de nuevo más tarde.');
    };
  };

  const loadWorkshops = async () => {
    try {
      setIsLoading(true);
      const data = await getWorkshops();
      setIsLoading(false);
      console.log('SET WS', workshops);
      setWorkshops(data);
    } catch (error) {
      setIsLoading(false);
      displayToaster(toasterStatus.ERROR, error.details);
    };
  };

  const onRegisterToWorkshop = (workshop: Workshop) => {
    const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(
      `Hola, estoy interesado/a en: ${workshop.title}, el cual se desarrolla el dia ${workshop.date} a las ${workshop.initial_time} en ${workshop.location}`
    )}`;
    window.open(whatsappLink);
  };

  useEffect(() => {
    updateCartFromStorage();
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
    totalMealsPrice,
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
    onRegisterToWorkshop
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