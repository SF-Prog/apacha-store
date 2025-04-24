import { Metadata } from 'next';
import Landing from './components/landing/landing';

export const metadata: Metadata = {
  title: 'Apacha - Cocina Consciente en Montevideo',
  description:
    'Viandas saludables, talleres de cocina y nutrición, eventos gastronómicos y almacén natural en Montevideo. Disfrutá de una alimentación rica y consciente con Apacha.',
  keywords: [
    'viandas saludables Montevideo',
    'talleres de cocina Uruguay',
    'alimentación consciente',
    'productos naturales Montevideo',
    'cocina saludable',
    'Apacha',
    'comida casera',
    'almacén natural Montevideo',
  ],
  authors: [{ name: 'Apacha', url: 'https://www.apachacocina.com.uy' }],
  creator: 'Apacha',
  metadataBase: new URL('https://www.apachacocina.com.uy'),
  openGraph: {
    title: 'Apacha - Cocina Consciente en Montevideo',
    description:
      'Descubrí Apacha: viandas saludables, talleres de cocina, productos naturales y eventos gastronómicos en Montevideo.',
    url: 'https://www.apachacocina.com.uy',
    siteName: 'Apacha Cocina Consciente',
    images: [
      {
        url: 'https://www.apachacocina.com.uy/og-image.jpg', // Asegurate de tener una imagen ideal 1200x630px
        width: 1200,
        height: 630,
        alt: 'Apacha Cocina Consciente - Montevideo',
      },
    ],
    locale: 'es_UY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apacha - Cocina Consciente en Montevideo',
    description:
      'Viandas, talleres y productos naturales en Montevideo. Apacha promueve una vida rica y consciente.',
    images: ['https://www.apachacocina.com.uy/og-image.jpg'],
    creator: '@apachacocina',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function Page() {
  return <Landing />;
};