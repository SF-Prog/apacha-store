'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'Vegan Cooking Workshop',
    description: 'Learn to create delicious plant-based meals with our expert chefs.',
    date: '2023-07-15',
    time: '14:00 - 17:00',
    location: 'Apacha Kitchen Studio',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    id: '2',
    title: 'Farm-to-Table Dinner',
    description: 'Experience the freshness of local produce in a gourmet setting.',
    date: '2023-07-22',
    time: '19:00 - 22:00',
    location: 'Apacha Garden Restaurant',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    id: '3',
    title: 'Sustainable Eating Seminar',
    description: 'Discover how your food choices can impact the environment and your health.',
    date: '2023-07-29',
    time: '10:00 - 12:00',
    location: 'Apacha Conference Center',
    image: '/placeholder.svg?height=400&width=600'
  }
]

export function EventsGrid() {
  return (
    <div className="bg-apacha-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 
        className="text-4xl font-bold text-center text-apacha-brown mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upcoming Events
      </motion.h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-apacha_purple-100">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-apacha_purple-100 hover:bg-apacha_purple-100/90">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}