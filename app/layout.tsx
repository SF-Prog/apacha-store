import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ["300", "500", "700"],
  style: "normal",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'Apacha - Cocina consciente',
  description: 'Descubre el sabor del bienestar con nuestras comidas nutritivas y deliciosas',
} 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}