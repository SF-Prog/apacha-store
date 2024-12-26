'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react';
import InstagramIcon from '@/components/ui/instagram-icon'

const APACHA_COCINA_EMAIL = "apachacocina@gmail.com";

export default function ContactUs() {
  return (
    <section id="contactanos" className=" py-20 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-bone-800 opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-6 md:space-y-0">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            <Link href="mailto:apachacocina@gmail.com" >
              <span>{APACHA_COCINA_EMAIL}</span>
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5" />
            <Link target="_blank" href="https://wa.me/59898958230?text=Quiero%20saber%20mas%20sobre%20sus%20productos">
              <span>+598 098 958 230</span>
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-5 h-5" />
            <Link target="_blank" href="https://www.google.com/maps/place/Apacha/@-34.8876343,-56.1543239,17z/data=!4m16!1m9!3m8!1s0x959f81897c9e77e5:0xa3c2343cf687d69b!2sApacha!8m2!3d-34.8876387!4d-56.151749!9m1!1b1!16s%2Fg%2F11td4cfrs3!3m5!1s0x959f81897c9e77e5:0xa3c2343cf687d69b!8m2!3d-34.8876387!4d-56.151749!16s%2Fg%2F11td4cfrs3?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D">
              <span>Ramón Ortiz 2952 esq Escuder Núñez, 11600 Montevideo</span>
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <InstagramIcon />
            <Link target="_blank" href="https://www.instagram.com/apacha_cocina/">
              <span>@apacha_cocina</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}