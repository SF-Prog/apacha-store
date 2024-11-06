'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Layout } from './layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/app/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import ScrollAnimatedBackground from "@/app/components/landing/scroll-animation/scroll-animation";
import { PhoneCallIcon as WhatsappIcon, Utensils, Coffee, Sun } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function Landing() {
  const [api, setApi] = useState<any>(null)

  useEffect(() => {
    if (api) {
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

  const mealPacks = [
    {
      title: "Desayuno",
      description: "Comienza tu día con energía y sabor",
      price: "$10.99",
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno",
      icon: Coffee,
      image: "/breakfast.jpg"
    },
    {
      title: "Desayuno y Almuerzo",
      description: "Mantén tu energía hasta la tarde",
      price: "$18.99",
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%20y%20Almuerzo",
      icon: Sun,
      image: "/lunch.jpg"
    },
    {
      title: "Desayuno, Almuerzo y Cena",
      description: "Alimentación completa y balanceada todo el día",
      price: "$24.99",
      whatsappLink: "https://wa.me/1234567890?text=Me%20interesa%20el%20pack%20de%20Desayuno%2C%20Almuerzo%20y%20Cena",
      icon: Utensils,
      image: "/dinner.jpg"
    }
  ];

  const renderProducts = () => {
    const products = [{
        image: '/desayunos-producto.png',
        name: 'Desayunos Energizantes',
        description: 'Empieza tu día con un estallido de frescura y sabor. Nuestros desayunos son jugos 100% naturales, llenos de frutas y vegetales frescos, cargados de vitaminas y antioxidantes para revitalizarte. Cada sorbo es un impulso energético y una manera deliciosa de cuidar tu cuerpo desde el amanecer. ¡Prueba uno y siente la diferencia!'
      },
      {
        image: '/almuerzo-producto.png',
        name: 'Almuerzos que Satisfacen',
        description: 'Nuestros almuerzos son una celebración de sabores y nutrición. Platos veganos y libres de gluten que no solo llenan, sino que nutren con ingredientes cuidadosamente seleccionados. Desde ensaladas vibrantes hasta guisos reconfortantes, cada opción te deja saciado sin sentirte pesado, para que disfrutes tu día con energía renovada. ¡Ideal para probar la variedad y deleitar tu paladar!'
      },
      {
        image: '/cena-producto.png',
        name: 'Cenas Nutritivas y Livianas',
        description: 'Termina tu jornada con nuestras sopas nutritivas, diseñadas para reconfortarte y nutrirte. Cada cena es ligera, pero cargada de ingredientes que tu cuerpo agradecerá al final del día. El equilibrio perfecto entre sabor y bienestar, para que te sientas satisfecho sin preocupaciones. Una opción que seguro querrás incorporar en tu rutina nocturna.'
      }
    ];
    return (
      <>
        {products.map((product) => (
          <Card key={product.name}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <CardDescription>{product.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </>
    )
  };

  return (
    <Layout>
      <main>
      <section className="relative h-screen">
          <Carousel
            opts={{ loop: true }}
            plugins={[ Autoplay({ delay: 3000 }) ]}
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
      <ScrollAnimatedBackground
        imageSrc="/background-mid-section.png"
        imageAlt="background-mid-section">
        <section id="sobre-nosotros" className="py-20 bg-gradient-to-b">
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

        <section id="menú" className="bg-gradient-to-b py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Platos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderProducts()}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-apacha-beige to-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-apacha-green mb-4">Nuestros Packs de Comida</h2>
              <p className="text-xl text-apacha-brown max-w-2xl mx-auto">Descubre nuestras opciones de alimentación saludable y deliciosa para todo el día</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mealPacks.map((pack, index) => (
                <motion.div
                  key={pack.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={pack.image}
                        alt={pack.title}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <pack.icon className="text-white w-16 h-16" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-apacha-brown">{pack.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-apacha-black mb-4">{pack.description}</p>
                      <p className="text-3xl font-bold text-apacha-green">{pack.price}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.open(pack.whatsappLink, '_blank')}
                      >
                        <WhatsappIcon className="mr-2 h-5 w-5" /> Pedir por WhatsApp
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        </ScrollAnimatedBackground>
        {/* <section id="eventos" className="py-20 bg-beige-100">
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
         */}

        <section id="contacto" className="bg-brown-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12">
              <div className="mb-8 md:mb-0 flex items-center">
                <span>contacto@apacha.com.uy</span>
              </div>
              <div className="mb-8 md:mb-0 flex items-center">
                <Link target="_blank" href="https://wa.me/59898958230?text=Quiero%20saber%20mas%20sobre%20sus%20productos">
                  <span>+598 098 958 230</span>
                </Link>
              </div>
              <div className="flex items-center">
                <Link target="_blank" href="https://www.google.com/maps/place/Apacha/@-34.8876343,-56.1543239,17z/data=!4m16!1m9!3m8!1s0x959f81897c9e77e5:0xa3c2343cf687d69b!2sApacha!8m2!3d-34.8876387!4d-56.151749!9m1!1b1!16s%2Fg%2F11td4cfrs3!3m5!1s0x959f81897c9e77e5:0xa3c2343cf687d69b!8m2!3d-34.8876387!4d-56.151749!16s%2Fg%2F11td4cfrs3?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D">
                  <span>Dr. Pedro Escuder Núñez 2245-2199, 11600 Montevideo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}