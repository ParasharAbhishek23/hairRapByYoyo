import './globals.css'

export const metadata = {
  title: 'HAIR RAP - Advanced Booking Application',
  description: 'Modern salon booking platform with AI assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
