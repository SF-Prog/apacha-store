"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [api, setApi] = useState<any>(null)
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (api) {
      api.plugins().autoplay.play()

      // Update current slide index
      const onSelect = () => {
        setCurrent(api.selectedScrollSnap())
      }

      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }
  }, [api])

  const desktopImages = ["/hero-4.jpg", "/catering-cake.jpg", "/soup-hero.jpg", "/desayunos-producto.png"]
  const mobileImages = ["/mobile-banner-1.jpg", "/catering-cake.jpg", "/soup-hero.jpg", "/desayunos-producto.png"]

  const carouselImages = isMobile ? mobileImages : desktopImages;

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-[85vh] md:h-screen">
      <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: isMobile ? 2500 : 4000 })]} setApi={setApi} className="h-full">
        <CarouselContent className="h-full">
            {carouselImages.map((image, index) => {
              return (
                <CarouselItem key={index} className="h-full w-full">
                  <div
                    className="h-full w-full bg-cover bg-center transition-all duration-700 transform scale-105"
                    style={{
                      backgroundImage: `url(${image})`,
                      transform: current === index ? "scale(1)" : "scale(1.05)",
                    }}
                  />
                </CarouselItem>
              )
            })}
        </CarouselContent>

        {/* Custom navigation dots for mobile */}
        <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 flex items-center justify-center">
        <div className="text-center px-6 md:px-8 text-white z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-sm">
              Disfruta de una alimentación nutritiva
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-xl mb-6 md:mb-8 font-sans text-shadow-sm">
              Todo lo que elaboramos es plant based y gluten free
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
            onClick={() => router.push('/almacen')}
              size="lg"
              className="bg-bone-700 hover:bg-bone-700/90 text-white font-medium px-8 py-6 rounded-full shadow-lg"
            >
              Ver Almacén
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          onClick={scrollToContent}
          className="text-white flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Descubre más</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </button>
      </motion.div>

      {/* Add text shadow utility class */}
      <style jsx global>{`
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  )
}
