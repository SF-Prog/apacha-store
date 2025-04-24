'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sunrise, Cake, Building2, Coffee, Leaf, Clock, Users } from 'lucide-react'
import { EventInfoRequestModal } from "@/components/forms/event-request/event-request"

const features = [
  {
    icon: <Sunrise className="h-6 w-6" />,
    title: "Retiros",
    description: "Alimentación consciente que acompañe tu propuesta para alcanzar un bienestar integral y sumarle calidez a la experiencia"
  },
  {
    icon: <Cake className="h-6 w-6" />,
    title: "Celebraciones y Cumpleaños",
    description: "Alimentos ricos e inclusivos para tus momentos especiales con familia y amigos"
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Eventos Empresariales",
    description: "Disfrutar de una alimentación de calidad puede optimizar el desempeño laboral y fortalecer el bienestar"
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Desayunos y Brunch",
    description: "Opciones coloridas y nutritivas para comenzar el día con energía y vitalidad"
  }
]

export function EventsLanding() {
  return (
    <div className="bg-bone-500">
      <section className="py-4 md:py-16 bg-white">
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
                <div className="bg-apacha-beige w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-beige-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-beige-100/10">
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
                  src="/events_hummus.jpg?width=500&height=400"
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
              <h3 className="text-xl md:text-4xl font-bold text-apacha-brown mb-4">Proponemos un menú inclusivo para que todos puedan disfrutar</h3>
              <p className="text-m md:text-lg text-gray-700 mb-6">
                En Apacha entendemos que cada evento y celebración es única, por eso ofrecemos una experiencia completamente personalizada:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-beige-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Experiencia personalizada</h3>
                    <p className="text-gray-600 text-m">Consideramos tus preferencias y te ayudamos a que tu evento sea único e inolvidable.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-beige-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Menú a base de plantas y sin gluten</h3>
                    <p className="text-gray-600 text-m">Ofrecemos un menú inclusivo para que todos y todas puedan disfrutar.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-12 w-12 text-beige-100 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Servicio completo</h3>
                    <p className="text-gray-600 text-m">Nos aseguramos de que la mesa quede armada acompañando la estética del evento y que los invitados puedan disfrutar de la experiencia con todos sus sentidos.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-beige-100 to-beige-100/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-xl text-3xl md:text-4xl font-bold mb-6">¿Listo para una experiencia gastronómica única?</h2>
            <p className="text-s md:text-xl mb-8">
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