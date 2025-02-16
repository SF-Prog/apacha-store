'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, ArrowRight, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from '@/context/store-context';


export default function CartWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, total, addCartItem, removeCartItem, onCartCheckout } = useStore();

  const totalItems = cartItems.reduce((acc, item) => {
    return acc += item.quantity;
  }, 0);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-4 bg-apacha_green-100 text-white shadow-lg hover:bg-apacha_green-100-dark transition-colors duration-300"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="ml-2 font-bold">{totalItems}</span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-none">
                <CardHeader className="flex flex-row items-center justify-between bg-apacha_green-100 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">Tu Carrito</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close cart"
                    className="text-white hover:bg-apacha_green-100/40 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
                  ) : (
                    <ul className="space-y-4 py-4">
                      {cartItems.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="font-medium">{item.title}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeCartItem(item.id)}
                              className="p-1"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addCartItem(item)}
                              className="p-1"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <span className="text-apacha-green font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-4 bg-gray-100 rounded-b-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-apacha-brown">Total:</span>
                    <span className="text-xl font-bold text-apacha-green">${total.toFixed(2)}</span>
                  </div>
                  <Button onClick={onCartCheckout} className="w-full bg-apacha_green-100 hover:bg-apacha_green-100/40 text-white transition-colors duration-300">
                    Proceder al Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}