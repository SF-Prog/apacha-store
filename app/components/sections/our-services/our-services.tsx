import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/context/store-context';
import Image from 'next/image'
import Link from 'next/link';


const OurServices: React.FC = () => {
  const { services } = useStore();

  const defaultImageStyle = { objectFit: 'cover' };

  return (
    <section id="nuestros-servicios" className="py-24 bg-apacha-beige min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-apacha-green"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <Link href={service.url} key={service.title}>
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
                    fill
                    style={service.customStyle ?? defaultImageStyle} 
                    className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
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