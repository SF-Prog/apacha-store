'use client'

import React from "react"
import { motion } from 'framer-motion'
import { Leaf, Truck, Recycle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import MakeYourOrder from "@/components/sections/make-your-order/make-your-order"
import ScrollAnimatedBackground from "@/components/landing/scroll-animation/scroll-animation"
import MenuExample from "@/components/sections/menu-example/menu-example";

export default function MenuPage() {
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

              <MakeYourOrder />

              <MenuExample />
            </motion.div>
          </div>
        </ScrollAnimatedBackground>
      </PageContent>
    </SecondaryPageLayout>
  )
};