'use client'

import { useState } from 'react'
import { Heart, MessageSquare, Wallet, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import Footer from './footer'

interface Booking {
  id: string
  bookingId: string
  service: string
  salon: string
  date: string
  time: string
  amount: number
  status: 'completed' | 'pending' | 'canceled'
}

const BOOKINGS: Booking[] = [
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
    bookingId: 'R123',
    service: 'Hair Cut',
    salon: 'The Velvet Touch',
    date: 'Tue 30 Sep',
    time: '7:30 PM',
    amount: 459,
    status: 'completed',
  },
  {
    id: '3',
    bookingId: 'R123',
    service: 'Hair Cut',
    salon: 'Aura Luxe Salon',
    date: 'Tue 30 Sep',
    time: '7:30 PM',
    amount: 459,
    status: 'canceled',
  },
  {
    id: '4',
    bookingId: 'R123',
    service: 'Hair Spa',
    salon: 'Crown & Curl',
    date: 'Tue 30 Sep',
    time: '7:30 PM',
    amount: 459,
    status: 'canceled',
  },
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'completed' | 'canceled'
  >('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBookings =
    activeTab === 'all'
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.status === activeTab)

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    canceled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground mb-8">
          Home &gt; Customer &gt; Dashboard
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* User Info */}
              <div className="mb-8 pb-6 border-b border-border">
                <h3 className="font-bold text-lg text-primary mb-1">
                  John Smith
                </h3>
                <p className="text-sm text-muted-foreground">
                  Member Since Sep 2021
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-3">
                <Link
                  href="#dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent text-white font-medium transition"
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="#bookings"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition"
                >
                  <span>Bookings</span>
                </Link>
                <Link
                  href="#favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition"
                >
                  <Heart className="w-5 h-5" />
                  <span>Favorites</span>
                </Link>
                <Link
                  href="#wallet"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Wallet</span>
                </Link>
                <Link
                  href="#reviews"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Reviews</span>
                </Link>
              </nav>

              {/* Help Section */}
              <div className="my-8 py-6 border-t border-b border-border">
                <Link
                  href="#help"
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent transition font-medium"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Help - AI Assistant</span>
                </Link>
              </div>

              {/* Settings and Logout */}
              <div className="space-y-2">
                <Link
                  href="#settings"
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent transition"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                View and manage your bookings
              </p>
            </div>

            {/* Bookings Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-border overflow-x-auto">
                {[
                  { label: 'All', value: 'all' as const, count: BOOKINGS.length },
                  {
                    label: 'Pending',
                    value: 'pending' as const,
                    count: BOOKINGS.filter((b) => b.status === 'pending').length,
                  },
                  {
                    label: 'Canceled',
                    value: 'canceled' as const,
                    count: BOOKINGS.filter((b) => b.status === 'canceled')
                      .length,
                  },
                  {
                    label: 'Completed',
                    value: 'completed' as const,
                    count: BOOKINGS.filter((b) => b.status === 'completed')
                      .length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value)
                      setCurrentPage(1)
                    }}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
                      activeTab === tab.value
                        ? 'border-b-2 border-accent text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Bookings List */}
              <div className="p-6">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No bookings found in this category
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                          {/* Service Info */}
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Service
                            </p>
                            <p className="font-semibold text-primary">
                              {booking.service}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.salon}
                            </p>
                          </div>

                          {/* Booking ID */}
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Booking ID
                            </p>
                            <p className="font-semibold text-primary">
                              #{booking.bookingId}
                            </p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full inline-block mt-2 font-medium ${
                                statusColors[booking.status]
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </div>

                          {/* Date */}
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Booking Date
                            </p>
                            <p className="font-semibold text-primary">
                              {booking.date}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.time}
                            </p>
                          </div>

                          {/* Amount */}
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Total paid
                            </p>
                            <p className="font-bold text-accent text-lg">
                              ₹{booking.amount}
                            </p>
                          </div>

                          {/* Action */}
                          <div className="text-right">
                            <button className="text-accent font-medium text-sm hover:underline">
                              Booking Details &gt;
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {filteredBookings.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-border">
                    <button className="px-3 py-1 rounded text-muted-foreground hover:text-foreground">
                      {'<'}
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          page === currentPage
                            ? 'bg-accent text-white'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="px-3 py-1 rounded text-muted-foreground hover:text-foreground">
                      {'>'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
