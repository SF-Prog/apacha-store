'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Footer from "@/sections/footer/footer";
import { FullScreenLoader } from '@/components/ui/fullscreen-loader'
import CartWidget from '@/components/ui/cart-widget';
import { useStore } from '@/app/context/store-context'

interface SecondaryPageLayoutProps {
  children: React.ReactNode
};

const navPages = [
  { label: 'Viandas', href: '/viandas' },
  { label: 'Almacén', href: '/almacen' },
  { label: 'Talleres', href: '/talleres' },
  { label: 'Caterings y Eventos', href: '/eventos' },
];

const mobileNavPages = [
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
  { label: 'Viandas', href: '/viandas' },
  { label: 'Almacén', href: '/almacen' },
  { label: 'Talleres', href: '/talleres' },
  { label: 'Caterings y Eventos', href: '/eventos' },
  { label: 'Contacto', href: '/#contactanos' },
];


const SecondaryPageLayout = ({ children }: SecondaryPageLayoutProps) => {
  const { isLoading } = useStore();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const renderLoader = () => {
    if (!isLoading) return;
    return <FullScreenLoader />
  };

  const renderNavBar = () => (
    <header className="bg-bone-500 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image alt="apacha-logo" src="/logo-black.png" width={140} height={50} />
        </Link>
        <nav className="hidden md:flex space-x-4 mr-28">
          {navPages.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href} 
              className="text-apacha-brown hover:text-apacha-green transition-colors self-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <Sheet open={menuAbierto} onOpenChange={(open) => setMenuAbierto(open)}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent className='z-50'>
            <SheetHeader className='flex flex-column items-center'>
              <SheetTitle>
                <Image alt="apacha-logo" src="/logo-black.png" width={140} height={50} />
              </SheetTitle>
              <SheetDescription>
                Lo que tenemos para ofrecer
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {mobileNavPages.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-black hover:text-apacha_purple-100 transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <CartWidget />
    </header>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {renderLoader()}
      {renderNavBar()}

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  )
};
export default SecondaryPageLayout;