'use client'

import React , { useState} from "react"
import { motion } from 'framer-motion'
import { Leaf, Truck, Recycle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import MakeYourOrder from "../components/sections/make-your-order/make-your-order"
import ScrollAnimatedBackground from "../components/landing/scroll-animation/scroll-animation"

export default function MenuPage() {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([])

  const weeklyMenu = [
    { day: 'Lunes', dish: 'Curry de garbanzos y espinacas', description: 'Un plato reconfortante y nutritivo con garbanzos, espinacas frescas y una mezcla de especias aromáticas.' },
    { day: 'Martes', dish: 'Lasaña de verduras', description: 'Capas de vegetales de temporada, salsa de tomate casera y una cremosa bechamel vegana.' },
    { day: 'Miércoles', dish: 'Bowl de quinoa y vegetales asados', description: 'Quinoa con una variedad de vegetales asados, semillas tostadas y aderezo de tahini.' },
    { day: 'Jueves', dish: 'Tacos de jackfruit', description: 'Tacos rellenos de jackfruit guisada al estilo "pulled pork", con una fresca ensalada de col y salsa de aguacate.' },
    { day: 'Viernes', dish: 'Risotto de hongos', description: 'Cremoso risotto de arroz integral con una mezcla de hongos silvestres y queso parmesano vegano.' },
  ];

  const mealPacks: MealPack[] = [
    {
      id: 'breakfast-prod',
      title: "Desayunos",
      description: "Jugos y licuados a base de frutas y verduras. Es una gran manera de comenzar el día hidratado e incorporando nutrientes, vitaminas y antioxidantes.",
      price: 1000,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno",
      image: "/breakfast-serving.png",
    },
    {
      id: 'lunch-prod',
      title: "Almuerzo",
      description: "El plato principal es una celebración de sabores y nutrición. Desde ensaladas vibrantes hasta guisos reconfortantes, cada opción ofrece un mundo de sabores y nutrientes. Ideales para solucionar tus almuerzos de una manera diferente y así no caer en el aburrimiento y monotonía.",
      price: 400,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%20y%20Almuerzo",
      image: "/lunch-preview.jpg"
    },
    {
      id: 'dinner-prod',
      title: "Cena",
      description: "sopa liviana y nutritiva. Al terminar el día y la rutina, muchas veces buscamos opciones prácticas para solucionar la cena. Las distintas variedades de sopas son ideales para incorporar a la rutina nocturna, ya que favorecerá a que te vayas a dormir liviano y de esta manera descansar mejor.",
      price: 800,
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%2C%20Almuerzo%20y%20Cena",
      image: "/dinner-soup-1.jpg"
    }
  ];

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  };

  const totalPrice = selectedMeals.reduce((sum, mealId) => {
    const meal = mealPacks.find(m => m.id === mealId)
    return sum + (meal?.price || 0)
  }, 0);

  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Te ayudamos a organizarte en tus comidas diarias"
        description="Proponemos un menú diferente cada semana para no caer en el aburrimiento y monotonía"
        imageSrc="/menu-hero.jpg"
      />
      <PageContent>
        <ScrollAnimatedBackground
          imageSrc="/lunch-table.jpg"
          imageAlt="lunch-table">
          <div className="bg-apacha-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-apacha-brown text-center mb-8">¿Cómo es el sistema?</h1>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                    <Truck className="mr-2" />
                    Entregas
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-apacha-black">
                  <p className="mb-4">Ofrecemos un menú semanal con solo dos entregas por semana:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li><strong>Domingo:</strong> Entregamos 3 almuerzos (para Lunes, Martes y Miércoles)</li>
                    <li><strong>Miércoles:</strong> Entregamos 2 almuerzos (para Jueves y Viernes)</li>
                  </ul>
                  <p className="mb-4">Las entregas se realizan dichos días entre las 17:00 y las 20:00 horas, utilizando nuestro propio método de entrega para garantizar que la comida llegue segura a tu puerta. También puedes retirar el pedido en nuestro local.</p>
                  <p className="mb-4 text-apacha_purple-100">Te recordamos que debes hacer tu pedido de forma anticipada.</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                    <Leaf className="mr-2" />
                    Nuestra cocina
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-apacha-black">
                  <p>Todo lo que elaboramos es con ingredientes naturales a base de plantas (excluimos ingredientes de origen animal) y sin gluten. Es un gran desafío y motivación introducirnos en este tipo de gastronomía, para lograr alimentos inclusivos que la mayoría pueda disfrutar.</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                    <Recycle className="mr-2" />
                    Compromiso Ambiental
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-apacha-black">
                  <p>
                  Nuestro proyecto se basa en elaborar y ofrecer productos de alta calidad nutricional y que a la vez estén en armonía con el medio ambiente. Para ello la incorporación de viandas retornables fue clave. Deseamos minimizar los residuos y generar el menor impacto posible en el ambiente.
                  </p>
                </CardContent>
              </Card>

              <MakeYourOrder
                selectedMeals={selectedMeals}
                totalPrice={totalPrice}
                mealPacks={mealPacks}
                toggleMeal={toggleMeal} />
              
              <h2 className="text-3xl font-semibold text-apacha-brown text-center mb-6">Ejemplo de Menú Semanal</h2>
              {weeklyMenu.map((item, index) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-apacha_purple-100">{item.day}: {item.dish}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-apacha-black">
                      <p>{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollAnimatedBackground>
      </PageContent>
    </SecondaryPageLayout>
  )
};