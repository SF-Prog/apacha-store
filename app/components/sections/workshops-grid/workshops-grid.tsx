'use client'

import React, { SyntheticEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Users, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { capitalize } from '@/app/lib/utils'
import { useStore } from '@/app/context/store-context'

export function WorkshopsGrid() {
  const { workshops, loadWorkshops, onRegisterToWorkshop } = useStore();

  const hasAlreadyHappened = (w: Workshop) => {
    const now = new Date();
    const eventDate = new Date(`${w.date}, ${w.initial_time}`);
    return eventDate < now;
  };


  useEffect(() => {
    void loadWorkshops();
  }, []);

  const renderActionButton = (workshop: Workshop) => {
    const isOld = hasAlreadyHappened(workshop);

    const label = !isOld ? 'Registrate' : 'Ver Más';
    const action = !isOld ? onRegisterToWorkshop : () => window.open(workshop.social_media_link, '_blank')

    const handleClick = (e: SyntheticEvent) => {
      e.preventDefault;
      action(workshop);
    };

    return (
      <Button onClick={handleClick} className="w-full bg-apacha_purple-100 hover:bg-apacha_purple-100/90">
        {label}
      </Button>
    );
  };

  return (
    <div className="bg-apacha-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-4xl font-bold text-center text-apacha-brown mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Siguientes Talleres
      </motion.h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop, index) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <Image
                src={workshop.image || "/placeholder.svg"}
                alt={workshop.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-apacha_purple-100">{workshop.title}</CardTitle>
                <CardDescription>{capitalize(workshop.description)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{workshop.initial_time}</span> /
                  <span>{workshop.finalization_time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Capacidad: {workshop.capacity} personas</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  <span>Instructor: {workshop.author}</span>
                </div>
              </CardContent>
              <CardFooter>
                {renderActionButton(workshop)}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}