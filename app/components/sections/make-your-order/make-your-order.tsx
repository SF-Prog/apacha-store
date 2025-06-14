import React from 'react'
import Image from 'next/image';

import { MessageCircle as WhatsappIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { MealPacksGrid } from '@/components/sections/meal-packs/meal-packs';
import { useStore } from '@/context/store-context';

const MakeYourOrder: React.FC = () => {
  const { selectedMeals, toggleMeal, meals } = useStore()
  const [selectedPlans, setSelectedPlans] = React.useState<Record<string, string>>({})

  const getPriceByPlan = (meal: Meal, planType: string) => {
    switch (planType) {
      case "daily":
        return meal.prices[0]
      case "weekly":
        return meal.prices[1]
      case "monthly":
        return meal.prices[2]
      default:
        return meal.prices[0]
    };
  }

  const calculateTotalPrice = () => {
    return selectedMeals.reduce((total, mealId) => {
      const meal = meals.find((m) => m.id === mealId)
      if (!meal) return total

      const planType = selectedPlans[mealId] || "daily"
      return total + getPriceByPlan(meal, planType)
    }, 0)
  }

  const handlePlanChange = (mealId: string, planType: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [mealId]: planType,
    }))
  }

  const generateWhatsAppMessage = () => {
    const selectedMealDetails = selectedMeals
      .map((mealId) => {
        const meal = meals.find((m) => m.id === mealId)
        const planType = selectedPlans[mealId] || "daily"
        return `${meal?.title} (Plan ${planType === "daily" ? "Diario" : planType === "weekly" ? "Semanal" : "Mensual"})`
      })
      .join(", ");

    return `Hola, me interesa encargar el pack de viandas que incluye: ${selectedMealDetails}.`
  }

  return (
    <section className="py-0 md:py-16 bg-gradient-to-b from-apacha-beige to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">¿Qué estás necesitando?</h2>
          <p className=" text-l md:text-l text-apacha-brown text-center max-w-2xl mx-auto">
            Puedes escribirnos para que te asesoremos y así saber cuál es el pack ideal para ti. Selecciona tus comidas
            y el plan que prefieras.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full flex flex-col overflow-hidden transition-all duration-300 ${selectedMeals.includes(meal.id) ? "ring-2 ring-apacha_purple-100" : ""}`}
              >
                <div className="relative h-48">
                  <Image src={meal.image || "/placeholder.svg"} alt={meal.title} fill style={{ objectFit: "cover" }} />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-apacha-brown">{meal.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <div className='flex flex-col flex-start'>
                    <p className="text-apacha-black text-start">{meal.description}</p><br/>
                    <p className="text-apacha_purple-100 text-start mb-4">{meal.benefits}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Precio individual:</span>
                      <span className="font-bold text-apacha_purple-100">${(meal.prices[0]).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precio semanal:</span>
                      <span className="font-bold text-apacha_purple-100">${(meal.prices[1]).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precio mensual:</span>
                      <span className="font-bold text-apacha_purple-100">${(meal.prices[2]).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Tabs
                    defaultValue="daily"
                    className="w-full"
                    value={selectedPlans[meal.id] || "daily"}
                    onValueChange={(value) => handlePlanChange(meal.id, value)}
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="daily">Diario</TabsTrigger>
                      <TabsTrigger value="weekly">Semanal</TabsTrigger>
                      <TabsTrigger value="monthly">Mensual</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center space-x-2 w-full">
                    <Checkbox
                      id={`select-${meal.id}`}
                      checked={selectedMeals.includes(meal.id)}
                      onCheckedChange={() => toggleMeal(meal.id)}
                    />
                    <label htmlFor={`select-${meal.id}`} className="text-sm font-medium leading-none cursor-pointer">
                      Seleccionar este plan
                    </label>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-apacha-brown mb-4">Total: ${calculateTotalPrice().toFixed(2)}</p>
          <Button
            className="px-8 py-3 bg-apacha_purple-100 hover:bg-apacha_purple-100/90 text-white transition-all duration-300 transform hover:scale-105 w-full max-w-[350px]"
            onClick={() =>
              window.open(`https://wa.me/59898958230?text=${encodeURIComponent(generateWhatsAppMessage())}`, "_blank")
            }
            disabled={selectedMeals.length === 0}
          >
            <WhatsappIcon className="mr-2 h-5 w-5" /> Hacer pedido
          </Button>
        </div>
      </div>
      <MealPacksGrid />
    </section>
  )
}

export default MakeYourOrder
