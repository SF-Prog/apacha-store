"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WhatsAppFloatProps {
  position?: "bottom-right" | "bottom-left"
  showTooltip?: boolean
}

export function WhatsAppFloat({
  position = "bottom-right",
  showTooltip = true,
}: WhatsAppFloatProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showInitialTooltip, setShowInitialTooltip] = useState(false)

  // Show tooltip after 3 seconds on first load
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowInitialTooltip(true)
      }, 3000)

      const hideTimer = setTimeout(() => {
        setShowInitialTooltip(false)
      }, 8000)

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    }
  }, [showTooltip])

  const handleWhatsAppClick = () => {
    const message = "Hola";
;    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <AnimatePresence>
        {/* Expanded Card */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 shadow-lg border-0 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-apacha_green-100 rounded-full flex items-center justify-center mr-3">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Apacha</h3>
                      <p className="text-xs text-green-500 flex items-center">
                        <div className="w-2 h-2 bg-apacha_green-100 rounded-full mr-1"></div>
                        En línea
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">
                    ¡Hola! 👋 ¿Tienes alguna pregunta sobre nuestros productos o servicios? Estamos aquí para ayudarte.
                  </p>
                </div>

                <Button onClick={handleWhatsAppClick} className="w-full bg-apacha_green-100 hover:bg-apacha_green-100 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Iniciar conversación
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Initial Tooltip */}
        {showInitialTooltip && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: position === "bottom-right" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === "bottom-right" ? 20 : -20 }}
            className={`absolute ${position === "bottom-right" ? "right-16" : "left-16"} bottom-2`}
          >
            <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap relative">
              ¿Necesitas ayuda? ¡Escríbenos!
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 ${
                  position === "bottom-right" ? "-right-1" : "-left-1"
                }`}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: showInitialTooltip ? [1, 1.2, 1] : 1,
        }}
        transition={{
          scale: { repeat: showInitialTooltip ? 3 : 0, duration: 0.6 },
        }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-apacha_green-100 hover:bg-apacha_green-100 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{
              scale: showInitialTooltip ? [0, 2, 0] : 0,
              opacity: showInitialTooltip ? [0.3, 0, 0] : 0,
            }}
            transition={{
              repeat: showInitialTooltip ? Number.POSITIVE_INFINITY : 0,
              duration: 2,
              ease: "easeOut",
            }}
          />
        </Button>
      </motion.div>
    </div>
  )
}
