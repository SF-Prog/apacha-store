import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function AboutUs() {
  return (
    <section id="sobre-nosotros" className="pt-16 pb-4 md:py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 md:mb-12 text-apacha-green">Sobre nosotrxs</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0 h-">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-80 md:h-auto">
                <Image
                  src="/sobre-nosotros.png"
                  alt="Emi y Manu"
                  fill
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className="md:w-2/3 p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-4 text-apacha-brown">Emi y Manu</h3>
                <p className="text-justify text-apacha-black mb-4">
                  Somos Emi y Manu, hermanos mellizos, que además de tener un vínculo muy especial desde siempre, hoy nos encontramos compartiendo y emprendiendo en Apacha.
                </p>
                <p className="text-justify text-apacha-black mb-4">
                  Tenemos 29 años. Manu es biólogo y Emi estudiante avanzada de Nutrición, pero independientemente de nuestras formaciones, la cocina siempre ha estado muy presente en nuestra vida. En nuestra familia, el alimento siempre ha generado momentos de encuentros, disfrute y alegrías. Lo vivimos en definitiva, como una gran forma de apapachar.
                </p>
                <p className="text-justify text-apacha-black">
                  A partir de ahí surgen estas ganas de emprender en conjunto. Con una gran complementariedad entre nosotrxs; Emi con una fuerte convicción en la alimentación consciente, intuitiva, basada en plantas y placentera. Manu con la pasión desde niño por el mundo de la gastronomía y su gran habilidad de cocinar tan rico.
                </p><br />
                <p className="text-justify text-apacha-black">
                  Nuestro gran objetivo es poder compartir el disfrute por nuevas alternativas gastronomicas y poder demostrar que comer rico y de forma consciente es posible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
