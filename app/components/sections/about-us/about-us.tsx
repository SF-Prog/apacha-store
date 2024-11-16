import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from "@/app/components/ui/card"

export default function AboutUs() {
  return (
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
  );
};
