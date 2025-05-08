import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ArrowRight, Leaf, Plus, Recycle, Truck } from 'lucide-react'
import ScrollAnimatedBackground from '../../landing/scroll-animation/scroll-animation'
import MakeYourOrder from '../make-your-order/make-your-order'
import MenuExample from '../menu-example/menu-example'
import { useStore } from '@/app/context/store-context';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const cards = [
  {
    id: "nuestra-cocina",
    icon: <Leaf className="h-5 w-5" />,
    title: "Nuestra cocina",
    content:
      "Todo lo que elaboramos es con ingredientes naturales a base de plantas (excluimos ingredientes de origen animal) y sin gluten. Es un gran desafío y motivación introducirnos en este tipo de gastronomía, para lograr alimentos inclusivos que la mayoría pueda disfrutar.",
  },
  {
    id: "compromiso-ambiental",
    icon: <Recycle className="h-5 w-5" />,
    title: "Compromiso Ambiental",
    content:
      "Nuestro proyecto se basa en elaborar y ofrecer productos de alta calidad nutricional y que a la vez estén en armonía con el medio ambiente. Para ello la incorporación de viandas retornables fue clave. Deseamos minimizar los residuos y generar el menor impacto posible en el ambiente.",
  },
  {
    id: "entregas",
    icon: <Truck className="h-5 w-5" />,
    title: "Entregas",
    content: (
      <>
        <p className="mb-4">Ofrecemos un menú semanal con solo dos entregas por semana:</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Domingo:</strong> Entregamos lo que corresponda al menú de Lunes, Martes y Miércoles
          </li>
          <li className="mb-2">
            <strong>Miércoles:</strong> Entregamos lo que corresponda al menú de Jueves y Viernes
          </li>
        </ul>
        <p className="mb-4">
          Las entregas se realizan dichos días entre las 17:00 y las 20:00 horas, utilizando nuestro propio método de
          entrega para garantizar que la comida llegue segura a tu puerta. También puedes retirar el pedido en nuestro
          local.
        </p>
        <p className="font-medium text-apacha_purple-100">
          Te recordamos que debes hacer tu pedido de forma anticipada.
        </p>
      </>
    ),
  },
]

export default function MenuLanding() {
  const { sendMenuSubscription } = useStore();
  const [isRequestWeeklyModalOpen, setIsRequestWeeklyModalOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState('');

  const handleMenuSubscription = () => {
    setIsRequestWeeklyModalOpen(false);
    sendMenuSubscription(phone);
    setPhone('');
  };

  const renderPhoneField = () => {
    if (!isRequestWeeklyModalOpen) return;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex w-full max-w-sm items-end space-x-0 gap-2">
          <div className='grid gap-2'>
            <Label htmlFor="name">Ingresa tu número de telefono para continuar</Label>
            <Input
              name="phone"
              placeholder="098 555 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button className="bg-apacha_purple-100" onClick={handleMenuSubscription}>
            <ArrowRight />
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderRequestWeeklyMenu = () => {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-2 md:gap-4 mb-8'>
        <Button onClick={() => setIsRequestWeeklyModalOpen(true)} disabled={isRequestWeeklyModalOpen} className="mb-4 w-full max-w-[350px] bg-apacha_purple-100 hover:bg-apacha_purple-100 ">
          <Plus className="mr-2 h-4 w-4" /> Solicitar menu de la semana
        </Button>
        {renderPhoneField()}
      </div>
    );
  };

  const renderMobileAccordions = () => (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 space-y-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={card.id} className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                <div className="flex items-center text-apacha_purple-100 text-md md:text-2xl">
                  <span className="mr-2">{card.icon}</span>
                  {card.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-apacha-black">
                {typeof card.content === "string" ? <p className="text-justify">{card.content}</p> : card.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );

  return (
    <ScrollAnimatedBackground
      imageSrc="/lunch-table.jpg"
      imageAlt="lunch-table">
      <div className="bg-apacha-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-apacha-brown text-center mb-8">¿Cómo es el sistema?</h1>

          {renderMobileAccordions()}

          <MakeYourOrder />

          {renderRequestWeeklyMenu()}

          <MenuExample />
        </motion.div>
      </div>
    </ScrollAnimatedBackground>
  )
}
