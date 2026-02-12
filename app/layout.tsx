import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'HAIR RAP BY YOYO - Premium Salon Booking',
  description:
    'Book professional hair care and beauty services online. Find top salons, expert stylists, and exclusive deals. AI-powered booking assistant available 24/7.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'salon booking',
    'hair care',
    'beauty services',
    'haircut',
    'styling',
    'AI chatbot',
  ],
  openGraph: {
    title: 'HAIR RAP BY YOYO - Premium Salon Booking',
    description: 'Book professional salon services online with AI assistance',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a2332',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#1a2332" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
