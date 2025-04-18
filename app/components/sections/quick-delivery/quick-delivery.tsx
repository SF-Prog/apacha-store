'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Truck, X } from 'lucide-react'

interface QuickDeliveryNotificationProps {
  onAddToCart?: () => void
  scrollThreshold?: number
}

export function QuickDeliveryNotification({ 
  onAddToCart, 
  scrollThreshold = 300 
}: QuickDeliveryNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Show notification when user scrolls past threshold
  useEffect(() => {
    const handleScroll = () => {
      if (!isDismissed && window.scrollY > scrollThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-48 max-w-sm"
        >
          <div className="bg-white rounded-lg shadow-lg border border-apacha_purple-100/20 p-4">
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Cerrar notificación"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center mb-3">
              <div className="bg-apacha_purple-100/10 p-2 rounded-full mr-3">
                <Truck className="h-5 w-5 text-apacha_purple-100" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">¡Entrega Express!</h3>
                <p className="text-sm text-gray-600">En menos de 72 horas</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">
              ¿Te gustaría recibir tus productos rápidamente? Añádelos al carrito ahora.
            </p>
            
            <Button 
              onClick={onAddToCart} 
              size="sm" 
              className="w-full bg-apacha_purple-100 hover:bg-apacha_purple-100/90"
            >
              Añadir al Carrito
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}