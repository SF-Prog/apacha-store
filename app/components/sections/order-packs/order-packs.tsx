'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon as WhatsappIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PricingPack {
  id: string
  title: string
  color: string
  weeklyPrice: number
  monthlyPrice: number
}

const pricingPacks: PricingPack[] = [
  {
    id: 'desayuno-almuerzo',
    title: 'PACK DESAYUNO Y ALMUERZO',
    color: 'bg-[#6B9080]',
    weeklyPrice: 2550,
    monthlyPrice: 9400,
  },
  {
    id: 'almuerzo-cena',
    title: 'PACK ALMUERZO Y CENA',
    color: 'bg-[#6B9080]',
    weeklyPrice: 3100,
    monthlyPrice: 11500,
  },
  {
    id: 'completo',
    title: 'PACK DESAYUNO, ALMUERZO Y CENA',
    color: 'bg-[#6B9080]',
    weeklyPrice: 4000,
    monthlyPrice: 14900,
  }
]

export default function PackPricing() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<'weekly' | 'monthly'>('weekly')

  const handleWhatsAppClick = () => {
    if (!selectedPack) return

    const pack = pricingPacks.find(p => p.id === selectedPack)
    if (!pack) return

    const price = selectedDuration === 'weekly' ? pack.weeklyPrice : pack.monthlyPrice
    const duration = selectedDuration === 'weekly' ? 'semanal' : 'mensual'
    const message = `Hola, me interesa el ${pack.title} con duración ${duration} por $${price}. ¿Podrían darme más información?`
    window.open(`https://wa.me/59898958230?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-16 bg-apacha-beige">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-apacha-brown mb-4">Nuestros Packs</h2>
          <p className="text-xl text-apacha-black max-w-2xl mx-auto">
            Elegí el pack que mejor se adapte a tus necesidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {pricingPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 ${selectedPack === pack.id ? 'ring-2 ring-apacha_purple-100' : ''}`}
                onClick={() => setSelectedPack(pack.id)}
              >
                <CardHeader className={`${pack.color} text-white`}>
                  <CardTitle className="text-2xl font-bold text-center">
                    {pack.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                      <span className="text-xl">Semanal</span>
                      <span className="text-2xl font-bold text-apacha-green">
                        ${pack.weeklyPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl">Mensual</span>
                      <span className="text-2xl font-bold text-apacha-green">
                        ${pack.monthlyPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-apacha-brown mb-4">Selecciona la duración:</h3>
                <RadioGroup 
                  defaultValue="weekly" 
                  className="flex space-x-4 mb-6"
                  onValueChange={(value) => setSelectedDuration(value as 'weekly' | 'monthly')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Semanal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Mensual</Label>
                  </div>
                </RadioGroup>
                <Button
                  className="w-full bg-apacha_purple-100 hover:bg-apacha_purple-100/90 text-white"
                  onClick={handleWhatsAppClick}
                >
                  <WhatsappIcon className="mr-2 h-5 w-5" />
                  Consultar por WhatsApp
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}