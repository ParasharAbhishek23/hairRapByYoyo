'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Clock, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { useServices } from '@/hooks/use-services'
import { useBookings } from '@/hooks/use-bookings'

const statusConfig = {
  confirmed: {
    label: 'Confirmed',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: XCircle
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  },
  completed: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle
  }
}

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getServiceById } = useServices()
  const { createBooking } = useBookings()
  
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const date = searchParams.get('date')
  const time = searchParams.get('time')

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getServiceById(params.id)
        if (serviceData) {
          setService(serviceData)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching service:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [params.id, getServiceById, router])

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!service || !date || !time) return

    try {
      setBooking(true)
      setBookingError('')
      
      const newBooking = await createBooking({
        serviceId: service.id,
        serviceName: service.name,
        salon: service.salon,
        date,
        time,
        price: service.price,
        status: 'confirmed'
      })

      setBookingSuccess(true)
    } catch (error) {
      setBookingError('Failed to create booking. Please try again.')
      console.error('Booking error:', error)
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!service || !date || !time) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Invalid booking information</p>
          <Link href="/" className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>
            
            <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Booking Details:</h3>
              <p className="text-sm"><strong>Service:</strong> {service.name}</p>
              <p className="text-sm"><strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p className="text-sm"><strong>Time:</strong> {time}</p>
              <p className="text-sm"><strong>Duration:</strong> {service.duration} minutes</p>
              <p className="text-sm"><strong>Price:</strong> ₹{service.price}</p>
            </div>

            <div className="space-y-3">
              <Link 
                href="/my-bookings"
                className="block w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                View My Bookings
              </Link>
              <Link 
                href="/"
                className="block w-full border border-border py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back to Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href={`/booking/${params.id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Service Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-primary mb-6">Confirm Your Booking</h1>
              
              {bookingError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700">{bookingError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Any special requests or notes for your appointment"
                  />
                </div>

                <button
                  type="submit"
                  disabled={booking}
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    booking
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-accent text-white hover:bg-opacity-90'
                  }`}
                >
                  {booking ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Booking Summary</h2>

              <div className="space-y-4">
                {/* Service Info */}
                <div className="flex gap-4">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.salon}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="text-sm">{service.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{time} ({service.duration} minutes)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{service.location}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-accent">₹{service.price}</span>
                  </div>
                  {service.price < service.originalPrice && (
                    <p className="text-sm text-green-600 mt-1">
                      You saved ₹{service.originalPrice - service.price}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before your appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
