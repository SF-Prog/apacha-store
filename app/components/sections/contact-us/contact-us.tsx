import React from 'react'
import Link from 'next/link';

export default function ContactUs() {
  return (
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
  );
};
