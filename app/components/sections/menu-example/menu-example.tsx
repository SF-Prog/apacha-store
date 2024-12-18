'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Send } from 'lucide-react'
import { useStore } from '@/context/store-context'

export default function MenuExample() {
  const { sendWeeklyMenuToEmail, weeklyMenuExample } = useStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSendEmail = async () => {
    setIsLoading(true);
    await sendWeeklyMenuToEmail(email);
    setIsLoading(false)
    setEmail('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Requesting menu for:', email)
    // Reset the form
    setEmail('')
  }

  return (
    <div className="bg-apacha-beige py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-apacha-brown mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ejemplo de Menú Semanal
        </motion.h2>
        <motion.div 
          className="grid gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {weeklyMenuExample.map((item, index) => (
            <motion.div
            key={item.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold text-apacha_purple-100">
                    {item.day}
                  </CardTitle>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-semibold text-apacha-brown">Desayuno</h3>
                      <p className="text-lg">{item.meals.breakfast}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-apacha-brown">Almuerzo</h3>
                      <p className="text-lg">{item.meals.lunch}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-apacha-brown">Cena</h3>
                      <p className="text-lg">{item.meals.dinner}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-apacha_purple-100">
                ¿Quieres el menú de la próxima semana?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Tu correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button onClick={handleSendEmail} type="submit" className="w-full bg-apacha_purple-100 hover:bg-apacha_purple-100-dark">
                {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Solicitar Menú
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}