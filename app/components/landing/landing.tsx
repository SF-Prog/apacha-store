'use client'

import { useEffect, useState } from 'react';
import { Layout } from './layout'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ScrollAnimatedBackground from "./scroll-animation/scroll-animation";
import AboutUs from "@/sections/about-us/about-us";
import AboutApacha from "@/sections/about-apacha/about-apacha";
import ContactUs from "@/sections/contact-us/contact-us";
import OurServices from "@/sections/our-services/our-services";

import Autoplay from "embla-carousel-autoplay";

export default function Landing() {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (api) {
      api.plugins().autoplay.play()
    }
  }, [api]);

  const carouselImages = [
    '/hero-3.jpg',
    '/hero-4.jpg',
    '/hero-5.jpg',
  ];

  const ourProducts = [{
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
        <AboutUs />
        <AboutApacha />

        {/* <section id="menú" className="bg-gradient-to-b py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-brown-700">Nuestros Platos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderProducts()}
            </div>
          </div>
        </section> */}

          <OurServices />
          {/* <MakeYourOrder
            mealPacks={mealPacks}
            selectedMeals={selectedMeals}
            toggleMeal={toggleMeal}
            totalPrice={totalPrice} /> */}
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
        <ContactUs />
      </main>
    </Layout>
  )
}