'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import Footer from "@/sections/footer/footer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useStore } from '@/app/context/store-context'
import { FullScreenLoader } from '../../ui/fullscreen-loader'

interface SecondaryPageLayoutProps {
  children: React.ReactNode
};

const navPages = [
  {label: 'Viandas', href: '/menu'},
  {label: 'Productos', href: '/products'},
  {label: 'Talleres', href: '/workshops'},
  {label: 'Caterings y eventos', href: '/events'},
];

const SecondaryPageLayout = ({ children }: SecondaryPageLayoutProps) => {
  const { isLoading } = useStore();

  const renderLoader = () => {
    if (!isLoading) return;
    return <FullScreenLoader />
  };

  return (
    <div className="flex flex-col min-h-screen">
      {renderLoader()}
      <header className="bg-bone-500 shadow-sm sticky top-0 z-49">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image alt="apacha-logo" src="/logo-black.png" width={140} height={50} />
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navPages.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-apacha-brown hover:text-apacha-green transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
                <SheetDescription>
                  Navega por nuestra página
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {['Productos', 'Sobre Nosotros', 'Eventos', 'Contacto'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-apacha-brown hover:text-apacha-green transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  )
};
export default SecondaryPageLayout;