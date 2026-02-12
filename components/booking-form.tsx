'use client'

import React from "react"

import { useState } from 'react'
import { Star, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react'
import Footer from './footer'

interface BookingSaloon {
  id: string
  name: string
  rating: number
  reviews: number
  image: string
  location: string
  phone: string
  email: string
  website: string
  memberSince: string
  languages: string[]
  description: string
}

const SALON: BookingSaloon = {
  id: '1',
  name: 'Glow & Glam Studio',
  rating: 4.9,
  reviews: 255,
  image:
    'https://images.unsplash.com/photo-1552852081-ff940cf9b914?w=600&h=400&fit=crop',
  location: 'Texas, USA',
  phone: '+1 888 8XX XXXX',
  email: 'Glamxxxxxx@example.com',
  website: 'www.glowandglam.com',
  memberSince: '19 Aug 2023',
  languages: ['English', 'Arabic', 'French', 'Spanish'],
  description:
    'We connect top talents with top companies in the salon industry. Professional stylists with years of experience.',
}

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    stylist: '',
    serviceType: '',
    serviceCategory: '',
    date: '',
    time: '',
    message: '',
    agreeTerms: false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    // Handle form submission
  }

  const totalPrice = { min: 1499, max: 2499 }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground mb-8">
          Home &gt; Services &gt; Booking
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Salon Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Salon Image */}
              <img
                src={SALON.image || "/placeholder.svg"}
                alt={SALON.name}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-secondary text-secondary"
                      />
                    ))}
                </div>
                <span className="font-bold text-primary">{SALON.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({SALON.reviews} reviews)
                </span>
              </div>

              {/* Salon Name */}
              <h2 className="text-2xl font-bold text-primary mb-4">
                {SALON.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-foreground mb-6">{SALON.description}</p>

              {/* Category Badge */}
              <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium text-primary mb-6">
                Salon Industry
              </div>

              {/* Contact Info */}
              <div className="space-y-4 border-t border-border pt-6">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm text-foreground">{SALON.email}</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Language Known
                    </p>
                    <p className="text-sm text-foreground">
                      {SALON.languages.join(', ')} + 4 More
                    </p>
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="text-sm text-foreground">{SALON.memberSince}</p>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Phone Number
                    </p>
                    <p className="text-sm text-foreground">{SALON.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-sm text-foreground">{SALON.location}</p>
                  </div>
                </div>
              </div>

              {/* View Salon Button */}
              <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                View Salon
              </button>

              {/* Social Links */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                <a href="#" className="text-muted-foreground hover:text-accent">
                  f
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent">
                  𝕏
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent">
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Right - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Header */}
              <h1 className="text-3xl font-bold text-primary mb-2">
                Book an Appointment
              </h1>
              <p className="text-muted-foreground mb-8">
                Ready to take the first step toward your dream beauty look? Fill
                out the form below, and our stylists will work their magic to
                find your perfect match. Don't wait; let's embark on this
                exciting journey together.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Dropdowns Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Choose Stylist
                    </label>
                    <select
                      name="stylist"
                      value={formData.stylist}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                    >
                      <option value="">Select Stylist</option>
                      <option value="sarah">Sarah Johnson</option>
                      <option value="jessica">Jessica Smith</option>
                      <option value="mike">Mike Brown</option>
                    </select>
                  </div>
                </div>

                {/* Dropdowns Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Services Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                    >
                      <option value="">Select Services</option>
                      <option value="hair">Hair Services</option>
                      <option value="makeup">Makeup</option>
                      <option value="nails">Nails</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Service Category
                    </label>
                    <select
                      name="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                    >
                      <option value="">Select Category</option>
                      <option value="cut">Hair Cut</option>
                      <option value="color">Hair Color</option>
                      <option value="spa">Hair Spa</option>
                    </select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Select Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your Message here.."
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Total and Discount */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="text-xl font-bold text-accent">
                      ₹{totalPrice.min}-₹{totalPrice.max}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      40% OFF
                    </span>
                    <span className="text-sm font-medium text-accent">
                      Limited Time Offer
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-accent rounded"
                  />
                  <span className="text-sm text-foreground">
                    I agree with Terms of Use and Privacy Policy
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition text-lg"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
