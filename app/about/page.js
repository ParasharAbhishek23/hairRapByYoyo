'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div className="relative h-64 bg-cover bg-center bg-gray-900 flex items-center justify-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521746727202-7d640e3b6314?q=80&w=1200")', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <div className="flex items-center justify-center gap-2">
            <a href="/" className="hover:text-gray-200">Home</a>
            <span>›</span>
            <span>About</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">About HAIR RAP BY YOYO</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Welcome to HAIR RAP BY YOYO, your premier destination for professional hair and salon services. With over a decade of experience in the beauty industry, we've built a reputation for excellence and customer satisfaction.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our mission is to provide world-class salon services with a personal touch, ensuring every client leaves our salon feeling confident and beautiful. We believe that great hair is a confidence booster, and we're here to help you achieve your best look.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of expert stylists is trained in the latest techniques and trends, using only premium products to ensure the best results for your hair.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/services/salon-1.jpg"
              alt="HAIR RAP BY YOYO"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">We never compromise on the quality of our services and products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Professionalism</h3>
              <p className="text-muted-foreground">Our team of experts brings professionalism to every service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Care</h3>
              <p className="text-muted-foreground">Your satisfaction and happiness is our top priority</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <div className="w-full h-48 bg-gradient-to-br from-accent to-pink-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Expert Stylist {item}</h3>
                  <p className="text-muted-foreground">Lead Hair Stylist</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
