'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Star, MapPin, Clock, ArrowLeft, Calendar, Check } from 'lucide-react'
import Link from 'next/link'
import { useServices } from '@/hooks/use-services'
import { api, TimeSlot } from '@/lib/api'

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getServiceById } = useServices()
  
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getServiceById(params.id as string)
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

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots()
    }
  }, [selectedDate])

  const fetchTimeSlots = async () => {
    try {
      setLoadingSlots(true)
      const slots = await api.getTimeSlots(selectedDate)
      setTimeSlots(slots)
    } catch (error) {
      console.error('Error fetching time slots:', error)
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      router.push(`/booking/${params.id}/confirm?date=${selectedDate}&time=${selectedTime}`)
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Service not found</p>
          <Link href="/" className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Image and Basic Info */}
          <div>
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {service.duration} minutes
              </div>
              {service.price < service.originalPrice && (
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium">
                  {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-3xl font-bold text-primary mb-4">{service.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{service.salon}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{service.location}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-accent">₹{service.price}</span>
                  {service.price !== service.originalPrice && (
                    <span className="text-lg line-through text-muted-foreground">₹{service.originalPrice}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Book Appointment</h2>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setSelectedTime('')
                    }}
                    min={getTodayDate()}
                    max={getMaxDate()}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Available Time Slots
                  </label>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-2 rounded-lg text-sm font-medium transition ${
                            selectedTime === slot.time
                              ? 'bg-accent text-white'
                              : slot.available
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Booking Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  selectedDate && selectedTime
                    ? 'bg-accent text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Booking
              </button>

              {selectedDate && selectedTime && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Booking Summary:</p>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at {selectedTime}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration: {service.duration} minutes</p>
                  <p className="text-lg font-bold text-accent mt-2">₹{service.price}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
