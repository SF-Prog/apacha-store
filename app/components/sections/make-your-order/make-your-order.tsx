import React from 'react'
import Image from 'next/image';

import { MessageCircle as WhatsappIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { MealPacksGrid } from '@/components/sections/meal-packs/meal-packs';
import { useStore } from '@/context/store-context';

const MakeYourOrder: React.FC = () => {
  const { selectedMeals, toggleMeal, totalMealsPrice, meals } = useStore();


  const generateWhatsAppMessage = () => {
    const selectedMealTitles = selectedMeals.map(mealId =>
      meals.find(m => m.id === mealId)?.title
    ).join(', ')
    return `Hola, me interesa ordenar el pack de comida que incluye: ${selectedMealTitles}. El total es $${totalMealsPrice.toFixed(2)}.`
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
          <h2 className="text-4xl font-bold  mb-4">¿Qué estás necesitando?</h2>
          <p className="text-xl text-apacha-brown max-w-2xl mx-auto">Puedes escribirnos para que te asesoremos y así saber cuál es el pack ideal para ti</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleMeal(meal.id)}
            >
              <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 ${selectedMeals.includes(meal.id) ? 'ring-2 ring-apacha_purple-100' : ''}`}>
                <div className="relative h-48">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    fill
                    style={{ objectFit: 'cover' }} 
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
                  <p className="text-3xl font-bold text-apacha_purple-100">${meal.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-apacha-brown mb-4">${totalMealsPrice.toFixed(2)} / Semana</p>
          <Button
            className="px-8 py-3 bg-apacha_purple-100 hover:bg-apacha_purple-100/90 text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open(`https://wa.me/1234567890?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank')}
            disabled={selectedMeals.length === 0}
          >
            <WhatsappIcon className="mr-2 h-5 w-5" /> Pedir por WhatsApp
          </Button>
        </div>
      </div>
      <MealPacksGrid />
    </section>
  );
};

export default MakeYourOrder;
