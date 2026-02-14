"use client";

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const [bookings, setBookings] = React.useState([]);
  
  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  // Sample bookings for demonstration (will be replaced by localStorage data)
  const sampleBookings = [
    {
      id: 1,
      serviceId: 1,
      serviceName: "Hair Color",
      salon: "Glow & Glam Studio",
      location: "Maryland City, MD, USA",
      price: 499,
      date: "2024-03-15",
      time: "10:00",
      duration: 45,
      status: "confirmed",
      bookingDate: "2024-03-10",
    },
    {
      id: 2,
      serviceId: 2,
      serviceName: "Hair Spa",
      salon: "The Velvet Touch",
      location: "New Jersey, USA",
      price: 569,
      date: "2024-03-20",
      time: "14:30",
      duration: 60,
      status: "pending",
      bookingDate: "2024-03-11",
    },
    {
      id: 3,
      serviceId: 3,
      serviceName: "Hair Cut",
      salon: "Aura Luxe Salon",
      location: "California, USA",
      price: 399,
      date: "2024-02-20",
      time: "15:00",
      duration: 30,
      status: "completed",
      bookingDate: "2024-02-15",
    },
  ];

  // Use sample bookings if no saved bookings exist
  const displayBookings = bookings.length > 0 ? bookings : sampleBookings;

  const upcomingBookings = displayBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  );
  const completedBookings = displayBookings.filter((b) => b.status === "completed");

  const handleCancel = (id) => {
    const updatedBookings = displayBookings.map((b) => 
      b.id === id ? { ...b, status: "cancelled" } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>My Bookings</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your salon appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 px-4 font-bold transition ${
              activeTab === "upcoming"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-4 px-4 font-bold transition ${
              activeTab === "completed"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {(activeTab === "upcoming"
            ? upcomingBookings
            : completedBookings
          ).map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Left - Service Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-primary">
                            {booking.serviceName}
                          </h3>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {booking.salon}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span className="text-foreground">
                              {formatDate(booking.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="text-foreground">
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-foreground text-xs">
                              {booking.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="text-foreground">
                              {booking.duration} mins
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Price and Actions */}
                  <div className="w-full md:w-auto flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Amount Paid
                      </p>
                      <p className="text-2xl font-bold text-accent">
                        ₹{booking.price}
                      </p>
                    </div>

                    {activeTab === "upcoming" && (
                      <div className="flex gap-2">
                        <Link href={`/services/${booking.serviceId}`}>
                          <button className="flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition">
                            <Edit className="w-4 h-4" />
                            Reschedule
                          </button>
                        </Link>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}

                    {activeTab === "completed" && (
                      <Link href={`/services/${booking.serviceId}`}>
                        <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition font-medium">
                          Book Again
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {(activeTab === "upcoming" ? upcomingBookings : completedBookings)
            .length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-primary mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming appointments yet."
                  : "You don't have any completed appointments yet."}
              </p>
              <Link href="/services">
                <button className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  Browse Services
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
