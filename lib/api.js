// API integration structure for the booking application

export const generateTimeSlots = (date) => {
  const slots = []
  const startHour = 9
  const endHour = 18
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push({
        id: `${date}-${time}`,
        time,
        available: Math.random() > 0.3 // 70% availability
      })
    }
  }
  
  return slots
}

export const MOCK_BOOKINGS = [
  {
    id: '1',
    serviceId: '1',
    serviceName: 'Hair Spa',
    salon: 'The Velvet Touch',
    date: '2024-12-15',
    time: '10:00',
    price: 569,
    status: 'confirmed',
    createdAt: '2024-12-10T10:00:00Z',
  },
  {
    id: '2',
    serviceId: '2',
    serviceName: 'Hair Cut',
    salon: 'Aura Luxe Salon',
    date: '2024-12-20',
    time: '14:30',
    price: 399,
    status: 'pending',
    createdAt: '2024-12-11T14:30:00Z',
  },
]

// Mock data
export const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Hair Spa',
    category: 'Hair Care',
    salon: 'The Velvet Touch',
    location: 'New Jersey, USA',
    price: 569,
    originalPrice: 699,
    rating: 4.9,
    reviews: 255,
    image: '/hair-spa.jfif',
    duration: 60,
    description: 'Rejuvenating hair spa treatment with deep conditioning and scalp massage.',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Hair Cut',
    category: 'Hair Cut',
    salon: 'Aura Luxe Salon',
    location: 'California, USA',
    price: 399,
    originalPrice: 699,
    rating: 4.7,
    reviews: 183,
    image: '/hair-cut.jfif',
    duration: 45,
    description: 'Professional hair cut and styling with consultation.',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Makeup',
    category: 'Makeup',
    salon: 'Opal Beauty Lounge',
    location: 'Maryland, USA',
    price: 749,
    originalPrice: 699,
    rating: 4.8,
    reviews: 321,
    image: '/makeup.jfif',
    duration: 90,
    description: 'Professional makeup application for any occasion.',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Nails',
    category: 'Nails',
    salon: 'The Glam Society',
    location: 'Texas, USA',
    price: 459,
    originalPrice: 699,
    rating: 4.5,
    reviews: 147,
    image: '/nails.jfif',
    duration: 60,
    description: 'Manicure and pedicure with nail art options.',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Hair Color',
    category: 'Hair Color',
    salon: 'Glow & Glam Studio',
    location: 'Maryland City, MD, USA',
    price: 499,
    originalPrice: 699,
    rating: 4.6,
    reviews: 209,
    image: '/hair-color.jfif',
    duration: 120,
    description: 'Professional hair coloring and highlights.',
    isFavorite: false,
  },
]

// API functions
export const api = {
  // Services
  getServices: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return MOCK_SERVICES
  },

  getServiceById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_SERVICES.find(service => service.id === id) || null
  },

  // Time slots
  getTimeSlots: async (date) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return generateTimeSlots(date)
  },

  // Bookings
  getBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_BOOKINGS
  },

  createBooking: async (booking) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    MOCK_BOOKINGS.push(newBooking)
    return newBooking
  },

  cancelBooking: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const booking = MOCK_BOOKINGS.find(b => b.id === id)
    if (booking) {
      booking.status = 'cancelled'
    }
  },

  // AI Chat
  sendChatMessage: async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple mock AI responses
    const responses = [
      "I'd be happy to help you with your booking! What service are you interested in?",
      "Based on your preferences, I recommend trying our Hair Spa treatment. It's very popular!",
      "You can check available time slots on the service details page. Would you like me to guide you there?",
      "To cancel a booking, go to the 'My Bookings' page and click the cancel button next to your booking.",
      "We have various services available including Hair Care, Makeup, Nails, and Hair Coloring. What interests you most?",
    ]
    
    // Simple keyword-based responses
    if (message.toLowerCase().includes('service')) {
      return "We offer Hair Spa, Hair Cut, Makeup, Nails, and Hair Color services. Which one would you like to know more about?"
    } else if (message.toLowerCase().includes('cancel')) {
      return "You can cancel your booking from the My Bookings page. Just click the cancel button next to your booking."
    } else if (message.toLowerCase().includes('available') || message.toLowerCase().includes('slots')) {
      return "Available time slots are shown on each service's booking page. You can select your preferred date and see all available slots."
    } else if (message.toLowerCase().includes('recommend')) {
      return "Based on popularity, I recommend our Hair Spa treatment. It has a 4.9 rating and includes deep conditioning and scalp massage."
    } else {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  },
}
