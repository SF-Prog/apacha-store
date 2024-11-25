import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TruckIcon, Utensils } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: "Elige tu plan",
    description: "Selecciona entre 3, 5 o 7 comidas por semana."
  },
  {
    icon: Utensils,
    title: "Personaliza tu menú",
    description: "Escoge tus platos favoritos de nuestro menú semanal."
  },
  {
    icon: TruckIcon,
    title: "Recibe tus comidas",
    description: "Entregamos tus comidas frescas dos veces por semana."
  },
  {
    icon: Clock,
    title: "Disfruta",
    description: "Calienta y disfruta en menos de 3 minutos."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-apacha-beige">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-apacha-green"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cómo Funciona
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-apacha-green rounded-full p-4 mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-apacha-brown">{step.title}</h3>
              <p className="text-apacha-black">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-apacha-green">Detalles del Servicio</h3>
          <ul className="space-y-4 text-apacha-black">
            <li className="flex items-center">
              <Clock className="w-6 h-6 mr-2 text-apacha-green" />
              <span><strong>Horarios de entrega:</strong> Lunes y Jueves, entre 8:00 AM y 12:00 PM</span>
            </li>
            <li className="flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-apacha-green" />
              <span><strong>Opciones de plan:</strong> 3, 5 o 7 comidas por semana</span>
            </li>
            <li className="flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-apacha-green" />
              <span><strong>Variedad de menú:</strong> Más de 15 platos diferentes cada semana</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
};

export default HowItWorks;