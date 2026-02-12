'use client'

import React from "react"
import { useState } from 'react'
import { Star, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react'
import Footer from './footer'

const SALON = {
  id: '1',
  name: 'Glow & Glam Studio',
  rating: 4.9,
  reviews: 255,
  image: '/hair-color.jfif',
  location: 'Maryland City, MD, USA',
  phone: '+1 (555) 123-4567',
  email: 'info@glowglam.com',
  website: 'www.glowglam.com',
  memberSince: '2019',
  languages: ['English', 'Spanish'],
  description: 'Premier beauty salon offering cutting-edge hair styling, coloring, and beauty treatments.'
}

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', { selectedService, selectedDate, selectedTime, formData })
    // Handle booking logic here
  }

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salon Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={SALON.image}
                alt={SALON.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-primary">{SALON.name}</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{SALON.rating}</span>
                  <span className="text-muted-foreground">({SALON.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{SALON.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{SALON.phone}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{SALON.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>{SALON.website}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Member since: {SALON.memberSince}</span>
              </div>
            </div>

            <p className="text-muted-foreground">{SALON.description}</p>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {SALON.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-6">Book Appointment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Choose a service...</option>
                  <option value="haircut">Hair Cut</option>
                  <option value="haircolor">Hair Color</option>
                  <option value="hairspa">Hair Spa</option>
                  <option value="makeup">Makeup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Choose a time...</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Special Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Any special requests or notes for your appointment"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
