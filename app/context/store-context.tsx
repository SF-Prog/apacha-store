'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react"

const StoreContext = createContext<StoreContextType | null>(null)

const products: ProductItem[] = [
  { id: '1', title: "Ensalada Mediterránea", price: 12.99, image: "/product1.jpg" },
  { id: '2', title: "Bowl de Quinoa y Vegetales", price: 14.99, image: "/product2.jpg" },
  { id: '3', title: "Wrap de Pollo y Aguacate", price: 11.99, image: "/product3.jpg" },
  { id: '4', title: "Salmón al Horno con Espárragos", price: 16.99, image: "/product4.jpg" },
  { id: '5', title: "Pasta Integral con Pesto", price: 13.99, image: "/product5.jpg" },
  { id: '6', title: "Tofu Salteado con Verduras", price: 12.99, image: "/product6.jpg" },
];

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

  const addCartItem = (mealPack: MealPack) => {
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