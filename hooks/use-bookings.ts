'use client'

import { useState, useEffect } from 'react'
import { Booking, api } from '@/lib/api'

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getBookings()
      setBookings(data)
    } catch (err) {
      setError('Failed to fetch bookings')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const newBooking = await api.createBooking(bookingData)
      setBookings(prev => [...prev, newBooking])
      return newBooking
    } catch (err) {
      setError('Failed to create booking')
      console.error('Error creating booking:', err)
      throw err
    }
  }

  const cancelBooking = async (id: string) => {
    try {
      await api.cancelBooking(id)
      setBookings(prev => 
        prev.map(booking => 
          booking.id === id 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      )
    } catch (err) {
      setError('Failed to cancel booking')
      console.error('Error cancelling booking:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
    refetch: fetchBookings,
  }
}
