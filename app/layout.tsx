import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@/context/store-context';
import { AuthProvider } from './context/auth-context';

const roboto = Roboto({
  weight: ["300", "500", "700"],
  style: "normal",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'Apacha Cocina Consciente',
  description: 'Tienda online de alimentos nutritivos, sin gluten y a base de plantas.',
  keywords: ['viandas nutritivas', 'productos sin gluten', 'productos veganos', 'montevideo']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <AuthProvider>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}