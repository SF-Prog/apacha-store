import React from 'react'
import Image from 'next/image';

import { PhoneCallIcon as WhatsappIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

interface MakeYourOrderProps {
  selectedMeals: string[],
  totalPrice: number,
  mealPacks: MealPack[],
  toggleMeal: (id: string) => void,
};

const MakeYourOrder: React.FC<MakeYourOrderProps> = (props) => {
  const { selectedMeals, toggleMeal, totalPrice, mealPacks } = props;


  const generateWhatsAppMessage = () => {
    const selectedMealTitles = selectedMeals.map(mealId =>
      mealPacks.find(m => m.id === mealId)?.title
    ).join(', ')
    return `Hola, me interesa ordenar el pack de comida que incluye: ${selectedMealTitles}. El total es $${totalPrice.toFixed(2)}.`
  };

  return (
    <section className="py-16 bg-gradient-to-b from-apacha-beige to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-apacha-green mb-4">Personaliza tu Pack de Comida</h2>
          <p className="text-xl text-apacha-brown max-w-2xl mx-auto">Elige las comidas que deseas para tu pack semanal y disfruta de una alimentación saludable y deliciosa. Animate a probarnos!</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {mealPacks.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleMeal(meal.id)}
            >
              <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 ${selectedMeals.includes(meal.id) ? 'ring-2 ring-apacha-green' : ''}`}>
                <div className="relative h-48">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-apacha-brown flex items-center justify-between">
                    {meal.title}
                    <Checkbox
                      checked={selectedMeals.includes(meal.id)}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-apacha-black mb-4">{meal.description}</p>
                  <p className="text-3xl font-bold text-apacha-green">${meal.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-apacha-brown mb-4">${totalPrice.toFixed(2)} / Semana</p>
          <Button
            className="px-8 py-3 bg-apacha_green-100 hover:bg-apacha_green-100/90 text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open(`https://wa.me/1234567890?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank')}
            disabled={selectedMeals.length === 0}
          >
            <WhatsappIcon className="mr-2 h-5 w-5" /> Pedir por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MakeYourOrder;
