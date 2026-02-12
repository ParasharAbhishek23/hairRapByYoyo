'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, X, Check, AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useBookings } from '@/hooks/use-bookings'

const statusConfig = {
  confirmed: {
    label: 'Confirmed',
    color: 'bg-green-100 text-green-800',
    icon: Check
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: AlertCircle
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: X
  },
  completed: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800',
    icon: Check
  }
}

export default function MyBookingsPage() {
  const { bookings, loading, error, cancelBooking, refetch } = useBookings()
  const [cancellingId, setCancellingId] = useState(null)

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId)
      await cancelBooking(bookingId)
    } catch (error) {
      console.error('Error cancelling booking:', error)
    } finally {
      setCancellingId(null)
    }
  }

  const upcomingBookings = bookings.filter(booking => 
    booking.status !== 'cancelled' && booking.status !== 'completed'
  )

  const pastBookings = bookings.filter(booking => 
    booking.status === 'cancelled' || booking.status === 'completed'
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past appointments
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't made any appointments yet. Book your first service to get started!
            </p>
            <Link 
              href="/"
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition font-medium"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Upcoming Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => handleCancelBooking(booking.id)}
                      cancellingId={cancellingId}
                      showCancel={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Past Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => {}}
                      cancellingId={null}
                      showCancel={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function BookingCard({ booking, onCancel, cancellingId, showCancel }) {
  const statusInfo = statusConfig[booking.status]
  const StatusIcon = statusInfo.icon

  const isPast = new Date(booking.date) < new Date()

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-primary text-lg">{booking.serviceName}</h3>
            <p className="text-muted-foreground">{booking.salon}</p>
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-4 h-4" />
            {statusInfo.label}
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(booking.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Salon Location</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <p className="text-lg font-bold text-accent">₹{booking.price}</p>
          </div>
          
          {showCancel && booking.status === 'confirmed' && !isPast && (
            <button
              onClick={onCancel}
              disabled={cancellingId === booking.id}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                cancellingId === booking.id
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          )}
        </div>

        {/* Booking ID */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Booking ID: #{booking.id}
          </p>
          <p className="text-xs text-muted-foreground">
            Booked on: {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
