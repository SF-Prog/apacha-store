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
    '/hero-4.jpg',
    '/catering-cake.jpg',
    '/soup-hero.jpg',
    '/desayunos-producto.png'
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
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Disfruta de una alimentación nutritiva
              </h2>
              <p className="text-xl mb-8 font-sans">
                Todo lo que elaboramos es plant based y gluten free
              </p>
            </div>
          </div>
        </section>
        <ScrollAnimatedBackground
          imageSrc="/background-mid-section.png"
          imageAlt="background-mid-section">
            <AboutUs />
            <AboutApacha />
            <OurServices />
        </ScrollAnimatedBackground>
        <ContactUs />
      </main>
    </Layout>
  )
}