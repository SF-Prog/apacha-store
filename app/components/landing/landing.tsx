'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Layout } from './layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/app/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { Button } from '@/app/components/ui/button';
import Autoplay from "embla-carousel-autoplay";

export default function Landing() {
  const [api, setApi] = useState<any>(null)

  useEffect(() => {
    if (api) {
      console.log('api', api);
      api.plugins().autoplay.play()
    }
  }, [api]);

  const carouselImages = [
    '/carousel-1.png',
    '/carousel-2.png',
    '/carousel-3.png',
    '/carousel-4.png',
    '/carousel-5.png',
  ];
  return (
    <Layout>
      <main>
      <section className="relative h-screen">
          <Carousel
            opts={{ loop: true }}
            plugins={[ Autoplay({ delay: 5000 }) ]}
            setApi={setApi}
            className="h-full"
          >
            <CarouselContent className="h-full">
              {carouselImages.map((image, index) => {
                return (
                  <CarouselItem key={index} className="h-full w-full">
                    <div
                        className="h-full w-full bg-cover bg-center transition-opacity duration-500"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                  </CarouselItem>
              )})}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-bone-700 z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
                Cocina Consciente Plant Based
              </h2>
              <p className="text-xl mb-8 font-sans">
                Descubre el sabor y el bienestar con nuestros platos nutritivos y deliciosos, 100% vegetales
              </p>
            </div>
          </div>
        </section>

        <section id="sobre-nosotros" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-apacha-green">Conócenos</h2>
              <Card className="overflow-hidden">
                <CardContent className="p-0 h-">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-80 md:h-auto">
                      <Image
                        src="/sobre-nosotros.png"
                        alt="Emi y Manu"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <h3 className="text-2xl font-semibold mb-4 text-apacha-brown">Emi y Manu</h3>
                      <p className="text-apacha-black mb-4">
                        Juntos, Emi y Manu forman el corazón y el alma de Apacha. Con su pasión compartida por la cocina consciente y plant-based, han creado un espacio donde la innovación culinaria se encuentra con la sostenibilidad.
                      </p>
                      <p className="text-apacha-black mb-4">
                        Emi, con su experiencia en nutrición, asegura que cada plato sea tan nutritivo como delicioso. Manu, por su parte, aporta su creatividad culinaria, transformando ingredientes simples en experiencias gastronómicas únicas.
                      </p>
                      <p className="text-apacha-black">
                        Juntos, están redefiniendo lo que significa comer de manera consciente y deliciosa, invitándote a unirte a su viaje hacia un estilo de vida más saludable y sostenible.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

        <section id="menú" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Platos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Ensalada de Quinoa', 'Bowl de Pollo a la Parrilla', 'Salteado de Verduras'].map((plato, index) => (
                <Card key={plato}>
                  <CardHeader>
                    <CardTitle>{plato}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={`/placeholder.svg?height=200&width=300&text=${plato}`} alt={plato} className="w-full h-48 object-cover rounded-md mb-4" />
                    <CardDescription>Una comida deliciosa y nutritiva llena de sabores y bondad.</CardDescription>
                  </CardContent>
                </Card>
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
                ].map((evento) => (
                  <Card key={evento.titulo}>
                    <CardHeader>
                      <CardTitle>{evento.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">{evento.fecha}</p>
                      <p className="mb-2">{evento.hora}</p>
                      <p>{evento.lugar}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-brown-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12">
              <div className="mb-8 md:mb-0 flex items-center">
                <span>info@emiliaymanuel.com</span>
              </div>
              <div className="mb-8 md:mb-0 flex items-center">
                <span>+34 555 123 456</span>
              </div>
              <div className="flex items-center">
                <span>Calle Saludable 123, Ciudadela, 28001 Madrid</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}