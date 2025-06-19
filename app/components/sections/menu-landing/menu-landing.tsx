import Image from 'next/image';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ArrowRight, Leaf, Recycle, Truck } from 'lucide-react'
import ScrollAnimatedBackground from '../../landing/scroll-animation/scroll-animation'
import MakeYourOrder from '../make-your-order/make-your-order'
import MenuExample from '../menu-example/menu-example'
import { useStore } from '@/app/context/store-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cards = [
  {
    id: "nuestra-cocina",
    icon: <Leaf className="h-5 w-5" />,
    title: "Cocina consciente",
    image: '/banner-cocina-consciente.jpeg',
    content: "Todos los platos tienen ingredientes naturales a base de plantas y sin gluten.",
  },
  {
    id: "compromiso-ambiental",
    icon: <Recycle className="h-5 w-5" />,
    title: "Compromiso Ambiental",
    image: '/banner-compromiso-ambiental.jpeg',
    content: "Usamos envases retornables, para minimizar el impacto ambiental",
  },
  {
    id: "entregas",
    icon: <Truck className="h-5 w-5" />,
    title: "Dos entregas semanales",
    image: '/banner-delivery.jpeg',
    content: (
      <>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <u>Domingo:</u> Entregamos lo que corresponda al menú de lunes, martes y miércoles
          </li>
          <li className="mb-2">
            <u>Miércoles:</u> Entregamos lo que corresponda al menú de jueves y viernes
          </li>
        </ul>
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

  // const renderRequestWeeklyMenu = () => {
  //   return (
  //     <div className='w-full flex flex-col items-center justify-center gap-2 md:gap-4 mb-8'>
  //       <Button onClick={() => setIsRequestWeeklyModalOpen(true)} disabled={isRequestWeeklyModalOpen} className="mb-4 w-full max-w-[350px] bg-apacha_purple-100 hover:bg-apacha_purple-100 ">
  //         <Plus className="mr-2 h-4 w-4" /> Solicitar menu de la semana
  //       </Button>
  //       {renderPhoneField()}
  //     </div>
  //   );
  // };

  const renderMobileAccordions = () => (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-apacha-brown text-center mb-8">¿Cómo es el sistema?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:h-[450px]">
        {cards.map((card, index) => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <motion.div
              key={card.id}
              className='h-full'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`bg-apacha_purple-100/10 h-[450px] flex flex-col overflow-hidden transition-all duration-300 ring-apacha_purple-100`}
              >
                <div className="relative h-72">
                  <Image src={card.image || "/placeholder.svg"} alt={card.title} fill style={{ objectFit: "cover" }} />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center text-apacha_purple-100 text-[18px] md:text-l">
                    <span className="mr-2">{card.icon}</span>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between h-full">
                  <div className='flex flex-col flex-start'>
                    <p className="text-apacha-black font-normal text-start">{card.content}</p><br />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </>
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


          <MakeYourOrder />


          <MenuExample />

          {renderMobileAccordions()}
        </motion.div>
      </div>
    </ScrollAnimatedBackground>
  )
}
