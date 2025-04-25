import './globals.css'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Apacha Cocina</title>
        <meta name="google-site-verification" content="sNdXsuP_XwVXpWCe0piY6vvmyR05jCzkWPuHyMAvwCk" />
        <meta name="description" content="Tienda online de alimentos nutritivos, sin gluten y a base de plantas." />
        <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-EN7BQS5265" />
        <Script id="ga-init" strategy="afterInteractive">
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