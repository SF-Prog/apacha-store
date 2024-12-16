'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react"
import { products } from "@/lib/constants";

const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

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
  }


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