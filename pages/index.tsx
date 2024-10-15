'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Menu, Calendar, Clock, MapPin as Location } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function PaginaAterrizaje() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
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
            {['Sobre Nosotros', 'Menú', 'Testimonios', 'Contacto'].map((item, index) => (
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
                {['Sobre Nosotros', 'Menú', 'Testimonios', 'Contacto'].map((item) => (
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

      <main>
        <section className="bg-brown-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Comida Saludable, Vida Feliz
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Descubre el sabor del bienestar con nuestras comidas nutritivas y deliciosas
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg">
                Pedir Ahora
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="sobre-nosotros" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Conoce a los Chefs</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12">
              {[
                { name: 'Manuel', role: 'El genio culinario detrás de nuestras deliciosas comidas' },
                { name: 'Emilia', role: 'La maga de la organización que mantiene todo funcionando sin problemas' }
              ].map((chef, index) => (
                <motion.div 
                  key={chef.name}
                  className="mb-8 md:mb-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{chef.name}</CardTitle>
                      <CardDescription>{chef.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img src={`/placeholder.svg?height=200&width=200&text=${chef.name}`} alt={chef.name} className="rounded-full mb-4 mx-auto" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="menú" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Platos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Ensalada de Quinoa', 'Bowl de Pollo a la Parrilla', 'Salteado de Verduras'].map((plato, index) => (
                <motion.div 
                  key={plato}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{plato}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src={`/placeholder.svg?height=200&width=300&text=${plato}`} alt={plato} className="w-full h-48 object-cover rounded-md mb-4" />
                      <CardDescription>Una comida deliciosa y nutritiva llena de sabores y bondad.</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="eventos" className="py-20 bg-beige-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Eventos</h2>
            
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 text-brown-600">Próximos Eventos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    titulo: 'Taller de Cocina Saludable', 
                    fecha: '15 de Noviembre, 2023', 
                    hora: '18:00 - 20:00',
                    lugar: 'Nuestra Cocina Central'
                  },
                  { 
                    titulo: 'Cena Degustación', 
                    fecha: '3 de Diciembre, 2023', 
                    hora: '20:30 - 23:00',
                    lugar: 'Restaurante El Jardín'
                  },
                  { 
                    titulo: 'Mercado de Productos Orgánicos', 
                    fecha: '10 de Diciembre, 2023', 
                    hora: '10:00 - 14:00',
                    lugar: 'Plaza Mayor'
                  }
                ].map((evento, index) => (
                  <motion.div 
                    key={evento.titulo}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{evento.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 mr-2 text-brown-500" />
                          <span>{evento.fecha}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 mr-2 text-brown-500" />
                          <span>{evento.hora}</span>
                        </div>
                        <div className="flex items-center">
                          <Location className="w-5 h-5 mr-2 text-brown-500" />
                          <span>{evento.lugar}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-brown-600">Eventos Anteriores</h3>
              <Carousel>
                <CarouselContent>
                  {[
                    { 
                      titulo: 'Festival de Comida Saludable', 
                      fecha: '5 de Octubre, 2023',
                      imagen: '/placeholder.svg?height=200&width=300&text=Festival'
                    },
                    { 
                      titulo: 'Clase Magistral de Cocina', 
                      fecha: '20 de Septiembre, 2023',
                      imagen: '/placeholder.svg?height=200&width=300&text=Clase+Magistral'
                    },
                    { 
                      titulo: 'Cena Benéfica', 
                      fecha: '1 de Septiembre, 2023',
                      imagen: '/placeholder.svg?height=200&width=300&text=Cena+Benéfica'
                    }
                  ].map((evento, index) => (
                    <CarouselItem key={evento.titulo} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div>
                              <img src={evento.imagen} alt={evento.titulo} className="w-full h-48 object-cover rounded-md mb-4" />
                              <h4 className="font-semibold text-lg mb-2">{evento.titulo}</h4>
                              <p className="text-sm text-gray-600">{evento.fecha}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-brown-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12">
              {[
                { icon: Mail, text: 'info@emiliaymanuel.com' },
                { icon: Phone, text: '+34 555 123 456' },
                { icon: MapPin, text: 'Calle Saludable 123, Ciudadela, 28001 Madrid' }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="mb-8 md:mb-0 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <item.icon className="mr-2" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brown-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Emilia & Manuel Comida Saludable. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}