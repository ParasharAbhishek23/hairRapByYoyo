'use client'

import { useState, useEffect, useMemo } from 'react'
import { Heart, Star, MapPin, Search, Filter, Clock } from 'lucide-react'
import Link from 'next/link'
import Footer from './footer'
import { useServices } from '@/hooks/use-services'

export default function ServicesListing() {
  const { services, loading, error } = useServices()
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
  const [selectedRating, setSelectedRating] = useState(0)

  const categories = useMemo(() => {
    if (!services.length) return ['All Categories']
    const uniqueCategories = Array.from(new Set(services.map(s => s.category)))
    return ['All Categories', ...uniqueCategories]
  }, [services])

  const filteredServices = useMemo(() => {
    let filtered = services

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((service) =>
        service.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.salon.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter((service) =>
      service.price >= priceRange.min && service.price <= priceRange.max
    )

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((service) => service.rating >= selectedRating)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [services, selectedCategory, searchQuery, priceRange, selectedRating, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
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
            onClick={() => window.location.reload()}
            className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
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
          <h1 className="text-4xl font-bold text-primary mb-2">Services</h1>
          <p className="text-muted-foreground">
            Explore our wide range of beauty and salon services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-primary mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={
                          (selectedCategory === 'all' &&
                            category === 'All Categories') ||
                          selectedCategory === category
                        }
                        onChange={() =>
                          setSelectedCategory(
                            category === 'All Categories' ? 'all' : category
                          )
                        }
                        className="w-4 h-4 text-accent rounded"
                      />
                      <span className="text-sm text-foreground">{category}</span>
                    </label>
                  ))}
                </div>
                <button className="text-accent text-sm font-medium mt-3">
                  View More
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-primary mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="₹0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-1/2 px-2 py-2 border border-border rounded text-sm"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="₹2000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-1/2 px-2 py-2 border border-border rounded text-sm"
                  />
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold text-primary mb-3">Ratings</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <label
                      key={stars}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRating === stars}
                        onChange={(e) => setSelectedRating(e.target.checked ? stars : 0)}
                        className="w-4 h-4 text-accent rounded"
                      />
                      <span className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < stars
                                  ? 'fill-secondary text-secondary'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        & up
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Found {filteredServices.length} Services
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setPriceRange({ min: 0, max: 2000 })
                    setSelectedRating(0)
                    setSortBy('featured')
                  }}
                  className="text-accent text-sm font-medium"
                >
                  Reset Filter
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price Low to High</option>
                    <option value="price-high">Price High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/booking/${service.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative">
                    {/* Image */}
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* Duration Badge */}
                    <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration} min
                    </div>
                    {/* Discount Badge */}
                    {service.price < service.originalPrice && (
                      <div className="absolute top-12 left-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round(
                          ((service.originalPrice - service.price) /
                            service.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Rating and Type */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-primary">{service.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="text-sm font-medium text-primary">
                          {service.rating}
                        </span>
                      </div>
                    </div>

                    {/* Salon Name */}
                    <p className="text-sm text-muted-foreground mb-2">
                      {service.salon}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />
                      {service.location}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-accent">
                        ₹{service.price}
                      </span>
                      {service.price !== service.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">
                          ₹{service.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Book Now Button */}
                    <button className="w-full bg-accent text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                      Book Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="px-3 py-1 rounded text-muted-foreground hover:text-foreground">
                ← Prev
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded ${
                    page === 1
                      ? 'bg-accent text-white'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 rounded text-muted-foreground hover:text-foreground">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
