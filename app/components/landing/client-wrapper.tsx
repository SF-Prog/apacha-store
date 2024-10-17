'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail, Phone, MapPin, Menu, Calendar, Clock, MapPin as Location } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/app/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel"

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-beige-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold text-brown-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Emilia & Manuel
            </motion.h1>
            <nav className="hidden md:flex space-x-4">
              {['Sobre Nosotros', 'Menú', 'Eventos', 'Contacto'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-brown-700 hover:text-brown-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                  <SheetDescription>
                    Navega por nuestra página
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                  {['Sobre Nosotros', 'Menú', 'Eventos', 'Contacto'].map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-brown-700 hover:text-brown-500"
                      onClick={() => setMenuAbierto(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {children}

        <footer className="bg-brown-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 Emilia & Manuel Comida Saludable. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </motion.div>
  )
}