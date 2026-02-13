"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Star,
  MapPin,
  Search,
  Filter,
  Grid3x3,
  List,
  Clock,
  ChevronDown,
} from "lucide-react";

export default function ServicesPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    rating: true,
    duration: true,
  });

  const itemsPerPage = 6;

  // Sample services data with more items for pagination
  const allServices = [
    {
      id: 1,
      name: "Hair Color",
      category: "Hair Color",
      price: 499,
      originalPrice: 699,
      location: "Maryland City, MD, USA",
      rating: 4.9,
      duration: 45,
      salon: "Glow & Glam Studio",
      image: "/services/salon-1.jpg",
    },
    {
      id: 2,
      name: "Hair Spa",
      category: "Hair Spa",
      price: 569,
      originalPrice: 699,
      location: "New Jersey, USA",
      rating: 4.7,
      duration: 60,
      salon: "The Velvet Touch",
      image: "/services/salon-2.jpg",
    },
    {
      id: 3,
      name: "Hair Cut",
      category: "Hair Cut",
      price: 399,
      originalPrice: 699,
      location: "California, USA",
      rating: 4.5,
      duration: 30,
      salon: "Aura Luxe Salon",
      image: "/services/salon-3.jpg",
    },
    {
      id: 4,
      name: "Makeup",
      category: "Makeup",
      price: 749,
      originalPrice: 699,
      location: "Maryland City, MD, USA",
      rating: 4.8,
      duration: 50,
      salon: "Opal Beauty Lounge",
      image: "/services/salon-4.jpg",
    },
    {
      id: 5,
      name: "Nails",
      category: "Nails",
      price: 459,
      originalPrice: 699,
      location: "Texas, USA",
      rating: 4.2,
      duration: 40,
      salon: "The Glam Society",
      image: "/services/salon-5.jpg",
    },
    {
      id: 6,
      name: "Premium Hair Cut",
      category: "Hair Cut",
      price: 699,
      originalPrice: 699,
      location: "Texas, USA",
      rating: 4.9,
      duration: 35,
      salon: "Crown & Curl",
      image: "/services/salon-6.jpg",
    },
    {
      id: 7,
      name: "Hair Treatment",
      category: "Hair Spa",
      price: 899,
      originalPrice: 1299,
      location: "New York, USA",
      rating: 4.6,
      duration: 90,
      salon: "Luxury Hair Studio",
      image: "/services/salon-7.jpg",
    },
    {
      id: 8,
      name: "Bridal Makeup",
      category: "Makeup",
      price: 1299,
      originalPrice: 1599,
      location: "Los Angeles, USA",
      rating: 4.9,
      duration: 120,
      salon: "Bridal Beauty",
      image: "/services/salon-8.jpg",
    },
    {
      id: 9,
      name: "Gel Nails",
      category: "Nails",
      price: 399,
      originalPrice: 599,
      location: "Miami, USA",
      rating: 4.4,
      duration: 60,
      salon: "Nail Art Studio",
      image: "/services/salon-9.jpg",
    },
    {
      id: 10,
      name: "Highlights",
      category: "Hair Color",
      price: 799,
      originalPrice: 999,
      location: "Chicago, USA",
      rating: 4.7,
      duration: 120,
      salon: "Color Me Perfect",
      image: "/services/salon-10.jpg",
    },
  ];

  const categories = ["Hair Color", "Hair Spa", "Hair Cut", "Makeup", "Nails"];
  const durations = [
    { value: "all", label: "All Durations" },
    { value: "0-30", label: "0-30 min" },
    { value: "31-60", label: "31-60 min" },
    { value: "61-90", label: "61-90 min" },
    { value: "90+", label: "90+ min" },
  ];

  const filteredServices = useMemo(() => {
    let filtered = allServices;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.salon.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (service) =>
        service.price >= priceRange.min && service.price <= priceRange.max
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((service) => service.rating >= selectedRating);
    }

    // Filter by duration
    if (selectedDuration !== "all") {
      filtered = filtered.filter((service) => {
        const duration = service.duration;
        switch (selectedDuration) {
          case "0-30":
            return duration <= 30;
          case "31-60":
            return duration >= 31 && duration <= 60;
          case "61-90":
            return duration >= 61 && duration <= 90;
          case "90+":
            return duration > 90;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [
    allServices,
    selectedCategory,
    searchQuery,
    priceRange,
    selectedRating,
    selectedDuration,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 2000 });
    setSelectedRating(0);
    setSelectedDuration("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allServices.forEach((service) => {
      const rating = Math.floor(service.rating);
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
      }
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center bg-gray-900 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1521746727202-7d640e3b6314?q=80&w=1200&auto=format&fit=crop")',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Services</h1>
          <div className="flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <span>›</span>
            <span>Services</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Filter className="w-5 h-5" />
              <h3 className="font-bold text-lg">Filters</h3>
              <span className="ml-auto text-sm text-accent cursor-pointer">
                Reset
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-bold text-primary mb-2 block">
                  Search by Keyword
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <button
                  onClick={() =>
                    setExpandedFilters({
                      ...expandedFilters,
                      categories: !expandedFilters.categories,
                    })
                  }
                  className="flex justify-between items-center w-full font-bold text-primary mb-3"
                >
                  Categories
                  <ChevronDown
                    className={`w-4 h-4 transition ${expandedFilters.categories ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.categories && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm text-foreground">
                        All Categories
                      </span>
                    </label>
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm text-foreground">{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <button
                  onClick={() =>
                    setExpandedFilters({
                      ...expandedFilters,
                      price: !expandedFilters.price,
                    })
                  }
                  className="flex justify-between items-center w-full font-bold text-primary mb-3"
                >
                  Price Range
                  <ChevronDown
                    className={`w-4 h-4 transition ${expandedFilters.price ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.price && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => {
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value),
                          });
                          setCurrentPage(1);
                        }}
                        className="w-1/2 px-2 py-2 border border-border rounded text-sm"
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => {
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value),
                          });
                          setCurrentPage(1);
                        }}
                        className="w-1/2 px-2 py-2 border border-border rounded text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Duration */}
              <div>
                <button
                  onClick={() =>
                    setExpandedFilters({
                      ...expandedFilters,
                      duration: !expandedFilters.duration,
                    })
                  }
                  className="flex justify-between items-center w-full font-bold text-primary mb-3"
                >
                  Duration
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      expandedFilters.duration ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilters.duration && (
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <label
                        key={duration.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="duration"
                          checked={selectedDuration === duration.value}
                          onChange={() => {
                            setSelectedDuration(duration.value);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm text-foreground">
                          {duration.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Ratings */}
              <div>
                <button
                  onClick={() =>
                    setExpandedFilters({
                      ...expandedFilters,
                      rating: !expandedFilters.rating,
                    })
                  }
                  className="flex justify-between items-center w-full font-bold text-primary mb-3"
                >
                  Ratings
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      expandedFilters.rating ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilters.rating && (
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label
                        key={stars}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRating === stars}
                          onChange={(e) => {
                            setSelectedRating(e.target.checked ? stars : 0);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="flex items-center gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < stars
                                    ? "fill-secondary text-secondary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({ratingCounts[stars]})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Found{" "}
                  <span className="text-accent font-bold text-lg">
                    {filteredServices.length}
                  </span>{" "}
                  Services
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={resetFilters}
                  className="text-accent text-sm font-medium hover:underline"
                >
                  Reset Filter
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm border border-border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price Low to High</option>
                    <option value="price-high">Price High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 border border-border rounded p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-accent text-white" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-accent text-white" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {paginatedServices.map((service) => (
                <Link href={`/services/${service.id}`} key={service.id}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer h-full">
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-primary px-3 py-1 rounded text-xs font-bold">
                        {service.category}
                      </div>
                      <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-md">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-accent" />
                      </button>
                      <div className="absolute bottom-3 right-3 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-pink-500 border-2 border-white flex items-center justify-center text-white font-bold shadow-md">
                          {service.salon?.charAt(0) || "S"}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-primary text-lg">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="text-sm font-bold text-primary">
                            {service.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {service.location}
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">
                        {service.salon}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-primary">
                          ₹{service.price}
                        </span>
                        {service.price !== service.originalPrice && (
                          <span className="text-sm line-through text-muted-foreground">
                            ₹{service.originalPrice}
                          </span>
                        )}
                      </div>

                      <Link href={`/booking/${service.id}`}>
                        <button className="w-full bg-accent text-white py-2 rounded font-bold hover:bg-opacity-90 transition">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-primary hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded ${
                        currentPage === page
                          ? "bg-accent text-white"
                          : "text-primary hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-primary hover:bg-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}