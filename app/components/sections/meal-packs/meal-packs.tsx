'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import { useStore } from '@/context/store-context'

export function MealPacksGrid() {
  const { mealPacks } = useStore();

  const handleWhatsAppClick = (link: string) => {
    window.open(link, '_blank')
  };

  return (
    <div className="bg-apacha-beige mt-4 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center text-apacha-brown mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nuestros Packs de Comida
      </motion.h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mealPacks.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden flex flex-col justify-between border-t-4" style={{ borderTopColor: pack.color }}>
              <CardHeader>
                <CardTitle className={`text-xl md:text-2xl font-bold text-${pack.color} text-center`}>
                  {pack.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Semanal</span>
                  <span className="text-xl font-bold">${pack.weeklyPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Mensual</span>
                  <span className="text-xl font-bold">${pack.monthlyPrice.toLocaleString()}</span>
                </div>
                <Button 
                  className="w-full group hover:shadow-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: pack.color,
                    color: 'white'
                  }}
                  onClick={() => handleWhatsAppClick(pack.whatsappLink)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Me interesa
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}