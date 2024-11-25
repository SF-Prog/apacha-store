import React from 'react'
import { motion } from 'framer-motion'
import { Utensils, Truck, Calendar, Leaf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';


const services = [
  {
    icon: Utensils,
    title: "Sistema de viandas Semanales",
    description: "Crea tu plan de comidas ideal con opciones que se adaptan a tus preferencias y necesidades dietéticas.",
    image: "/menu-page-background.jpg",
    url: '/menu'
  },
  {
    icon: Truck,
    title: "Productos para el día a día",
    description: "Recibe tus comidas frescas directamente en tu puerta, sin preocupaciones ni estrés.",
    image: "/products-page-background.jpg",
    url: '/products'
  },
  {
    icon: Calendar,
    title: "Talleres de cocina",
    description: "Organiza tu alimentación con anticipación y ahorra tiempo en la preparación de comidas.",
    image: "/events-page-background.jpg",
    url: '/events'
  },
  {
    icon: Leaf,
    title: "Caterings",
    description: "Disfruta de platos preparados con ingredientes orgánicos y de origen local siempre que sea posible.",
    image: "/catering-page-background.jpg",
    url: "/catering"
  }
];

const OurServices: React.FC = () => {
  return (
    <section className="py-24 bg-apacha-beige min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-apacha-green"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <Link href={service.url}>
              <motion.div
                key={service.title}
                className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-apacha-green rounded-full p-6 transition-all duration-300 ease-in-out transform hover:rotate-12">
                      <service.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-4 text-apacha-brown">{service.title}</h3>
                  <p className="text-apacha-black text-lg flex-grow">{service.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServices