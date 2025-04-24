import React, { SyntheticEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ArrowRight, Leaf, Plus, Recycle, Truck } from 'lucide-react'
import ScrollAnimatedBackground from '../../landing/scroll-animation/scroll-animation'
import MakeYourOrder from '../make-your-order/make-your-order'
import MenuExample from '../menu-example/menu-example'
import { useStore } from '@/app/context/store-context'

export default function MenuLanding() {
  const { sendWorkshopSubscription } = useStore();
  const [isRequestWeeklyModalOpen, setIsRequestWeeklyModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');

  const handleWorkshopSubscription = () => {
    setIsRequestWeeklyModalOpen(false);
    sendWorkshopSubscription(email);
    setEmail('');
  };

  const renderEmailField = () => {
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
            <Label htmlFor="name">Ingresa tu email para recibir noticias</Label>
            <Input
              name="name"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="bg-apacha_purple-100" onClick={handleWorkshopSubscription}>
            <ArrowRight />
          </Button>
        </div>
      </motion.div>

    )
  }

  const renderRequestWeeklyMenu = () => {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-2 md:gap-4 mb-8'>
        <Button disabled={isRequestWeeklyModalOpen} className="mb-4 bg-apacha_purple-100 hover:bg-apacha_purple-100 " onClick={() => setIsRequestWeeklyModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Solicitar próximo plan semanal
        </Button>
        {renderEmailField()}
      </div>
    );
  };

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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                <Truck className="mr-2" />
                Entregas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-apacha-black">
              <p className="mb-4 text-justify">Ofrecemos un menú semanal con solo dos entregas por semana:</p>
              <ul className="list-disc list-inside mb-4">
                <li className="text-justify"><strong>Domingo:</strong> Entregamos lo que corresponda al menú de Lunes, Martes y Miércoles</li>
                <li className="text-justify"><strong>Miércoles:</strong> Entregamos lo que corresponda al menú de Jueves y Viernes</li>
              </ul>
              <p className="text-justify mb-4">Las entregas se realizan dichos días entre las 17:00 y las 20:00 horas, utilizando nuestro propio método de entrega para garantizar que la comida llegue segura a tu puerta. También puedes retirar el pedido en nuestro local.</p>
              <p className="text-justify mb-4 text-apacha_purple-100">Te recordamos que debes hacer tu pedido de forma anticipada.</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                <Leaf className="mr-2" />
                Nuestra cocina
              </CardTitle>
            </CardHeader>
            <CardContent className="text-apacha-black">
              <p className="text-justify">Todo lo que elaboramos es con ingredientes naturales a base de plantas (excluimos ingredientes de origen animal) y sin gluten. Es un gran desafío y motivación introducirnos en este tipo de gastronomía, para lograr alimentos inclusivos que la mayoría pueda disfrutar.</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-apacha_purple-100">
                <Recycle className="mr-2" />
                Compromiso Ambiental
              </CardTitle>
            </CardHeader>
            <CardContent className="text-apacha-black">
              <p className="text-justify">
                Nuestro proyecto se basa en elaborar y ofrecer productos de alta calidad nutricional y que a la vez estén en armonía con el medio ambiente. Para ello la incorporación de viandas retornables fue clave. Deseamos minimizar los residuos y generar el menor impacto posible en el ambiente.
              </p>
            </CardContent>
          </Card>

          <MakeYourOrder />
          {renderRequestWeeklyMenu()}
          <MenuExample />
        </motion.div>
      </div>
    </ScrollAnimatedBackground>
  )
}
