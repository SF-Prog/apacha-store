'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { toasterStatus, services, weeklyMenuExample } from "@/lib/constants";
import { displayToaster } from "@/lib/utils";
import { sendMenuEmail } from "@/actions/sendWeeklyMenu";
import { getProducts } from "@/actions/getProducts";

const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductsByCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Products page logic

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      console.log('FATRA', data);
      setIsLoading(false);
      setProducts(data);
    } catch (error) {
      console.log('FERROR', error);
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

  const addCartItem = (mealPack: ProductItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === mealPack.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === mealPack.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...mealPack, quantity: 1 }]
      }
    })
  }

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

  // Menu page logic

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

  // Mantain cart on local storage to improve user retention

  useEffect(() => {
    updateCartFromStorage()
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