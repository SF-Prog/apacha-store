'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Utensils, Heart, Leaf, Clock, Users } from 'lucide-react'
import { EventInfoRequestModal } from "@/components/forms/event-request/event-request"

// Sample data - replace with your actual content
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
    icon: <ChefHat className="h-6 w-6" />,
    title: "Chef Profesional",
    description: "Platos preparados por chefs con experiencia en gastronomía internacional"
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Menú Personalizado",
    description: "Adaptamos cada plan a tus preferencias y necesidades alimenticias"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Ingredientes Frescos",
    description: "Seleccionamos los mejores ingredientes locales y de temporada"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Puntualidad",
    description: "Entrega en el horario que mejor se adapte a tu rutina diaria"
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-bone-500">
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg h-64"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredImage(index)}
              onHoverEnd={() => setHoveredImage(null)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500"
                style={{
                  transform: hoveredImage === index ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                <Badge className="self-start mb-2 bg-apacha_purple-100">{image.category}</Badge>
                <p className="font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-apacha-brown mb-4">La Experiencia Apacha</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Nos distinguimos por ofrecer un servicio completamente adaptado a tus preferencias y estilo de vida.
            </p>
          </div>

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

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apacha-brown mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Experiencias reales de personas que han transformado su alimentación con Apacha.
          </p>
        </div>

        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col justify-center shadow-lg border-apacha_purple-100/20 border-2">
                <CardContent className="text-center p-8">
                  <div className="mb-4 text-apacha_purple-100">
                    <Heart className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-xl italic mb-6">"{testimonials[currentTestimonial].quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentTestimonial ? 'bg-apacha_purple-100' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </section>

      {/* Customization Highlight */}
      <section className="py-16 bg-apacha_purple-100/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                className="relative h-96 rounded-lg overflow-hidden shadow-xl"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Personalización de menús"
                  fill
                  className="object-cover"
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
              <h2 className="text-3xl md:text-4xl font-bold text-apacha-brown mb-4">Tu Menú, Tus Reglas</h2>
              <p className="text-lg text-gray-700 mb-6">
                En Apacha entendemos que cada persona es única, por eso ofrecemos una experiencia completamente personalizada:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-apacha_purple-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Adaptado a tus necesidades</h3>
                    <p className="text-gray-600">Consideramos tus preferencias, alergias y objetivos nutricionales.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-apacha_purple-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Opciones para todos</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para una Experiencia Culinaria Personalizada?</h2>
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