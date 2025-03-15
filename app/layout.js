import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from 'next';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL('https://cloudhub.cl'),
  title: {
    default: 'CloudHub - Tu Solución en la Nube',
    template: '%s | CloudHub'
  },
  description: 'Servicios cloud profesionales y soluciones empresariales',
  openGraph: {
    title: 'CloudHub - Tu Solución en la Nube',
    description: 'Servicios cloud profesionales y soluciones empresariales',
    url: 'https://cloudhub.cl',
    siteName: 'CloudHub',
    locale: 'es_CL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'xTm8X8Wl0peczmk1oY0LBoMyw7eWc2Yu8C2Hwxp4Zcs',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
