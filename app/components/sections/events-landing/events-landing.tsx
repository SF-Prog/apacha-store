'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Sunrise, Cake, Building2, Coffee, Leaf, Clock, Users } from 'lucide-react'
import { EventInfoRequestModal } from "@/components/forms/event-request/event-request"

const testimonials = [
  {
    id: 1,
    quote: "Apacha transformó mi rutina alimenticia con sus platos personalizados. ¡Nunca había comido tan bien!",
    author: "María G.",
    role: "Cliente Mensual"
  },
  {
    id: 2,
    quote: "La variedad y calidad de los ingredientes es impresionante. Cada comida es una experiencia única.",
    author: "Carlos R.",
    role: "Cliente Semanal"
  },
  {
    id: 3,
    quote: "Me encanta que puedo personalizar mi plan según mis necesidades dietéticas. Servicio excepcional.",
    author: "Laura M.",
    role: "Cliente Mensual"
  }
]

const features = [
  {
    icon: <Sunrise className="h-6 w-6" />,
    title: "Retiros y Eventos Wellness",
    description: "Alimentación consciente para retiros de yoga, meditación y experiencias de bienestar integral"
  },
  {
    icon: <Cake className="h-6 w-6" />,
    title: "Celebraciones y Cumpleaños",
    description: "Menús festivos plant-based para tus momentos especiales con familia y amigos"
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Eventos Empresariales",
    description: "Catering corporativo, workshops culinarios y afteroffice saludables para tu equipo"
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Desayunos y Brunch",
    description: "Opciones nutritivas y deliciosas para comenzar el día con energía y bienestar"
  }
]

// Sample gallery images - replace with your actual images
const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Desayuno gourmet con frutas frescas y granola casera",
    category: "Desayuno"
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Almuerzo balanceado con proteínas y vegetales de temporada",
    category: "Almuerzo"
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Cena ligera y nutritiva con opciones vegetarianas",
    category: "Cena"
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Opciones veganas llenas de sabor y nutrientes",
    category: "Vegano"
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Platos internacionales adaptados a gustos locales",
    category: "Internacional"
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Postres saludables para complementar tu alimentación",
    category: "Postres"
  }
]

export function EventsLanding() {
  return (
    <div className="bg-bone-500">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-apacha-beige w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-apacha_purple-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-apacha_purple-100/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                className="relative h-96 rounded-lg shadow-xl"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/events_table.jpg?width=500&height=400"
                  alt="Personalización de menús"
                  fill
                  className="object-cover object-bottom"
                />
              </motion.div>
            </div>
            <motion.div
              className="md:w-1/2"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-apacha-brown mb-4">Proponemos un menú inclusivo para que todos puedan disfrutar</h3>
              <p className="text-lg text-gray-700 mb-6">
                En Apacha entendemos que cada persona es única, por eso ofrecemos una experiencia completamente personalizada:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-apacha_purple-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Experiencia personalizada</h3>
                    <p className="text-gray-600">Consideramos tus preferencias, alergias y objetivos nutricionales.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-apacha_purple-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Menú a base de plantas y sin gluten</h3>
                    <p className="text-gray-600">Menús vegetarianos, veganos, sin gluten, altos en proteína y más.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-6 w-6 text-apacha_purple-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Flexibilidad total</h3>
                    <p className="text-gray-600">Cambia tu plan o ajusta tus preferencias cuando lo necesites.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-apacha_purple-100 to-apacha_purple-100/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para una experiencia gastronómica única?</h2>
            <p className="text-xl mb-8">
              Nuestro equipo está esperando para crear un plan alimenticio que se adapte perfectamente a tus necesidades y preferencias.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <EventInfoRequestModal />
            </motion.div>
            <p className="mt-4 text-white/80 text-sm">
              Respuesta garantizada en menos de 24 horas
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}