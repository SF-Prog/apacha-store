'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Footer from '@/sections/footer/footer';

interface LayoutProps {
  children: React.ReactNode
};

const options = [
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros'},
  { label: 'Servicios', href: '/#nuestros-servicios'},
  { label: 'Contacto', href: '/#contactanos'}
];

const mobileOptions = [
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros'},
  { label: 'Viandas', href: '/viandas'},
  { label: 'Almacén', href: '/almacen'},
  { label: 'Talleres', href: '/talleres'},
  { label: 'Caterings y Eventos', href: '/eventos'},
  { label: 'Contacto', href: '/#contactanos'}
];

export function Layout({ children }: LayoutProps) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-beige-50">
        <header className="bg-bone-500 shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center z-50">
            <motion.h1
              className="text-2xl font-bold text-brown-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image alt="apacha-logo" src="/logo-black.png" width={140} height={50} />
            </motion.h1>
            <nav className="hidden md:flex space-x-4">
              {options.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-brown-700 hover:text-brown-500"
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
                  <Menu className="h-6 w-6" onClick={() => setMenuAbierto(true)} />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent className='z-50'>
                <SheetHeader className='flex flex-column items-center'>
                  <Image alt="apacha-logo" src="/logo-black.png" width={140} height={50} />
                  <SheetDescription>
                    Lo que tenemos para ofrecer
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4 z-50">
                  {mobileOptions.map((item) => (
                    <Link
                      key={item.label}
                      href={`${item.href}`}
                      className="text-brown-700 hover:text-brown-500 py-2"
                      onClick={() => setMenuAbierto(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {children}

        <Footer />
      </div>
    </motion.div>
  )
}