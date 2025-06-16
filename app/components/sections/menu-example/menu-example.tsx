'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { useStore } from '@/app/context/store-context';

export default function MenuExample() {
  const { getWeeklyMenuData, isLoading } = useStore();
  const [imageSrc, setImageSrc] = useState("/placeholder.svg");

  const loadWeeklyImage = async () => {
    const weeklyMenu = await getWeeklyMenuData();
    setImageSrc(weeklyMenu);
  };

  useEffect(() => {
    void loadWeeklyImage();
  }, []);

  return (
    <div className="bg-apacha-beige px-0 sm:px-0 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-center text-apacha-brown mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Te compartimos un ejemplo del menú
        </motion.h2>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <Image
              src={imageSrc}
              alt="Menú semanal de Apacha"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </Card>
        </motion.div>
      </div>
    </div>
  )
}