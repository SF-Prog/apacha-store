import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@/context/store-context';
import { AuthProvider } from './context/auth-context';
import Script from 'next/script';

const roboto = Roboto({
  weight: ["300", "500", "700"],
  style: "normal",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'Apacha Cocina Consciente',
  description: 'Tienda online de alimentos nutritivos, sin gluten y a base de plantas.',
  keywords: ['plant based', 'gluten free', 'comida saludable', 'alimentación consciente', 'catering vegano', 'apacha'],
  openGraph: {
    title: 'Apacha Cocina Consciente',
    description: 'Tienda online de alimentos nutritivos, sin gluten y a base de plantas.',
    url: 'https://apachacocina.com.uy',
    siteName: 'Apacha Cocina',
    images: [
      {
        url: 'https://apachacocina.com.uy/lunch-fridge-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Comida saludable, plant based y sin gluten',
      },
    ],
    locale: 'es_UY',
    type: 'website',
  },
  icons: {
    icon: '/public/icons/favicon.ico',
    shortcut: '/public/icons/favicon.ico',
    apple: '/public/icons/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-EN7BQS5265" />
        <Script  id="ga-init" strategy="afterInteractive">
         {` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EN7BQS5265');`}
        </Script>
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
};