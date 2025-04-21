'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Heart, Utensils, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

type TabKey = 'origin' | 'family' | 'philosophy'

interface TabContent {
  title: string
  content: string
  icon: React.ElementType
}

const ApachaStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('origin')

  const tabContent: Record<TabKey, TabContent> = {
    origin: {
      title: "Nuestro Origen",
      content: "La palabra Apacha viene de 'apapachar', la cual tiene un origen náhuatl que significa acariciar o abrazar con el alma. En definitiva, el alimento para nosotrxs es eso.",
      icon: Heart
    },
    family: {
      title: "Nuestra Familia",
      content: "Venimos de una familia en donde el alimento ocupa un espacio importante a la hora de transmitir cariño, agasajar o disfrutar momentos en conjunto. Tenemos muchos recuerdos amorosos y de disfrute con la comida como centro o parte fundamental de esos momentos, cocinando y compartiendo con nuestra abuela, tías, padres y hermanxs.",
      icon: Users
    },
    philosophy: {
      title: "Nuestra Filosofía",
      content: "Partimos de la premisa de que un plato de comida está hecho por alguien y para alguien, con manos y afectos impregnados de tradición y creación; entonces tiene que ver con que todo lo que sale de nuestra cocina acaricie un poco el alma de quienes lo prueben.",
      icon: Utensils
    }
  }

  return (
    <section id="sobre-apacha" className="py-4 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 md:mb-12 text-apacha-purple-100">Sobre Apacha</h2>
        <Card className="overflow-hidden h-min-[600px]">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row min-h-[450px]">
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex flex-wrap justify-start mb-8">
                  {(Object.keys(tabContent) as TabKey[]).map((tab) => {
                    const IconComponent = tabContent[tab].icon
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 flex items-center ${
                          activeTab === tab
                            ? 'bg-apacha_orange-100'
                            : 'bg-beige text-apacha-apacha_green-bg-apacha_green-100 hover:text-bone-500'
                        }`}
                      >
                        <IconComponent className="inline-block mr-2" size={18} />
                        {tabContent[tab].title}
                      </button>
                    )
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-apacha-brown">{tabContent[activeTab].title}</h3>
                    <p className="text-justify text-apacha-black leading-relaxed">{tabContent[activeTab].content}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="md:w-1/2 relative h-80 md:h-auto">
                <Image
                  src="/about-apacha.jpg"
                  alt="Apacha Story"
                  fill
                  priority
                  style={{
                    objectFit: 'cover',
                    objectPosition: '0 -250px',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ApachaStory