'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Heart, Utensils, Users } from 'lucide-react'

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
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-apacha-green font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sobre Apacha
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap justify-center mb-8">
              {(Object.keys(tabContent) as TabKey[]).map((tab) => {
                const IconComponent = tabContent[tab].icon
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 flex items-center ${
                      activeTab === tab 
                        ? 'bg-apacha-green text-white' 
                        : 'bg-apacha-beige text-apacha-green hover:bg-apacha-green hover:text-white'
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
                className="bg-apacha-beige rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-apacha-brown">{tabContent[activeTab].title}</h3>
                <p className="text-lg text-apacha-black leading-relaxed">{tabContent[activeTab].content}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/apacha-story.jpg"
                alt="Apacha Story"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-apacha-green rounded-full opacity-10"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 bg-apacha-brown rounded-full opacity-10"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ApachaStory