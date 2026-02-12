'use client'

import { useState } from 'react'
import { Heart, MessageSquare, Wallet, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import Footer from './footer'

const BOOKINGS = [
  {
    id: '1',
    bookingId: 'R123',
    service: 'Hair Cut',
    salon: 'Glow & Glam Studio',
    date: 'Tue 30 Sep',
    time: '7:30 PM',
    amount: 459,
    status: 'completed',
  },
  {
    id: '2',
    bookingId: 'R124',
    service: 'Hair Color',
    salon: 'Glow & Glam Studio',
    date: 'Fri 05 Oct',
    time: '2:00 PM',
    amount: 499,
    status: 'pending',
  },
  {
    id: '3',
    bookingId: 'R125',
    service: 'Hair Spa',
    salon: 'The Velvet Touch',
    date: 'Mon 15 Oct',
    time: '10:00 AM',
    amount: 569,
    status: 'canceled',
  }
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (bookingId) => {
    setFavorites(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary">Total Bookings</h3>
              <span className="text-2xl font-bold text-accent">12</span>
            </div>
            <p className="text-sm text-muted-foreground">All time bookings</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary">Completed</h3>
              <span className="text-2xl font-bold text-green-600">8</span>
            </div>
            <p className="text-sm text-muted-foreground">Successfully completed services</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary">Total Spent</h3>
              <span className="text-2xl font-bold text-primary">₹2,527</span>
            </div>
            <p className="text-sm text-muted-foreground">Total amount spent on services</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'bookings'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'favorites'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'settings'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-4">Recent Bookings</h2>
            {BOOKINGS.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-primary">{booking.service}</h3>
                    <p className="text-sm text-muted-foreground">{booking.salon}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.date} at {booking.time} • {booking.bookingId}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-accent">₹{booking.amount}</span>
                  <button
                    onClick={() => toggleFavorite(booking.id)}
                    className="p-2"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(booking.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-primary mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground">Start adding services to your favorites for quick access!</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Account Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Email Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent">
                    <span className="sr-only">Email Notifications</span>
                    <span className="inline-block h-4 w-4 rounded-full bg-accent translate-x-1"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">SMS Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent">
                    <span className="sr-only">SMS Notifications</span>
                    <span className="inline-block h-4 w-4 rounded-full bg-gray-200 translate-x-1"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                  <MessageSquare className="w-5 h-5" />
                  <span>Support Chat</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                  <Wallet className="w-5 h-5" />
                  <span>Payment Methods</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}
