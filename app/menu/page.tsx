'use client'
import React from "react"
import { motion } from 'framer-motion'
import { Leaf, Truck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"


export default function MenuPage() {
  const weeklyMenu = [
    { day: 'Lunes', dish: 'Curry de garbanzos y espinacas', description: 'Un plato reconfortante y nutritivo con garbanzos, espinacas frescas y una mezcla de especias aromáticas.' },
    { day: 'Martes', dish: 'Lasaña de verduras', description: 'Capas de vegetales de temporada, salsa de tomate casera y una cremosa bechamel vegana.' },
    { day: 'Miércoles', dish: 'Bowl de quinoa y vegetales asados', description: 'Quinoa con una variedad de vegetales asados, semillas tostadas y aderezo de tahini.' },
    { day: 'Jueves', dish: 'Tacos de jackfruit', description: 'Tacos rellenos de jackfruit guisada al estilo "pulled pork", con una fresca ensalada de col y salsa de aguacate.' },
    { day: 'Viernes', dish: 'Risotto de hongos', description: 'Cremoso risotto de arroz integral con una mezcla de hongos silvestres y queso parmesano vegano.' },
  ];

  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Menu Semanal"
        description="Descubre nuestra selección de comidas saludables y deliciosas"
        imageSrc="/products-dips-2.jpg"
      />
      <PageContent>
        <div className="bg-apacha-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-apacha-brown text-center mb-8">Nuestro Menú Semanal</h1>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-apacha-green">
                  <Truck className="mr-2" />
                  Cómo Funciona Nuestro Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="text-apacha-black">
                <p className="mb-4">Ofrecemos un menú semanal con entregas dos veces por semana para asegurar la frescura de nuestros platos:</p>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>Domingo:</strong> Entregamos 3 almuerzos (para Lunes, Martes y Miércoles)</li>
                  <li><strong>Miércoles:</strong> Entregamos 2 almuerzos (para Jueves y Viernes)</li>
                </ul>
                <p className="mb-4">Las entregas se realizan entre las 17:00 y las 20:00 horas, utilizando nuestro propio método de entrega para garantizar que la comida llegue segura a tu puerta.</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-apacha-green">
                  <Leaf className="mr-2" />
                  Nuestro Compromiso
                </CardTitle>
              </CardHeader>
              <CardContent className="text-apacha-black">
                <p>Todas nuestras comidas son libres de gluten y basadas en alimentos de la tierra. Este desafío es la razón por la que nuestros platos contienen tantos nutrientes y sabores innovadores. Nos esforzamos por crear opciones saludables y deliciosas que satisfagan todas las necesidades dietéticas.</p>
              </CardContent>
            </Card>

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
                    <CardTitle className="text-xl text-apacha-green">{item.day}: {item.dish}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-apacha-black">
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageContent>
    </SecondaryPageLayout>
  )
};