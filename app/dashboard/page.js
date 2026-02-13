"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState(new Set());

  const bookings = [
    {
      id: 1,
      service: "Glow & Glam Studio | Hair Cut",
      bookingNo: "R123",
      date: "Tue 30 Sep",
      time: "7:30 PM",
      price: 459,
      status: "Completed",
      statusColor: "text-green-600",
    },
    {
      id: 2,
      service: "Hair Cut",
      bookingNo: "R123",
      date: "Tue 30 Sep",
      time: "7:30 PM",
      price: 459,
      status: "Completed",
      statusColor: "text-yellow-600",
    },
    {
      id: 3,
      service: "Hair Cut",
      bookingNo: "R123",
      date: "Tue 30 Sep",
      time: "7:30 PM",
      price: 459,
      status: "Canceled",
      statusColor: "text-red-600",
    },
  ];

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div
        className="relative h-48 bg-cover bg-center bg-gray-900 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=1200")',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10 w-full">
          <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <a href="/" className="hover:text-gray-200">
              🏠
            </a>
            <span>›</span>
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
            <div className="p-6 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                JS
              </div>
              <h3 className="text-center font-bold text-lg">John Smith</h3>
              <p className="text-center text-xs text-muted-foreground">
                Member Since Sep 2021
              </p>
            </div>

            <nav className="p-4 space-y-2">
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 text-foreground font-medium"
              >
                📊 Dashboard
              </a>
              <a
                href="/my-bookings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground"
              >
                📅 Bookings
              </a>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground text-left">
                ❤️ Favorites
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground text-left">
                💳 Wallet
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground text-left">
                ⭐ Reviews
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground text-left">
                🤖 Help - AI
              </button>
            </nav>

            <div className="border-t border-border p-4 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition text-muted-foreground text-left">
                <span>⚙️</span>
                Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition text-red-600 text-left">
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-border p-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`pb-2 font-medium border-b-2 ${activeTab === "all" ? "text-accent border-accent" : "text-muted-foreground border-transparent"}`}
                >
                  All (7)
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`pb-2 font-medium border-b-2 ${activeTab === "pending" ? "text-accent border-accent" : "text-muted-foreground border-transparent"}`}
                >
                  Pending (4)
                </button>
                <button
                  onClick={() => setActiveTab("canceled")}
                  className={`pb-2 font-medium border-b-2 ${activeTab === "canceled" ? "text-accent border-accent" : "text-muted-foreground border-transparent"}`}
                >
                  Canceled (2)
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`pb-2 font-medium border-b-2 ${activeTab === "completed" ? "text-accent border-accent" : "text-muted-foreground border-transparent"}`}
                >
                  Completed (3)
                </button>
              </div>
              <div className="text-sm text-muted-foreground">Sort by ↕️</div>
            </div>

            <div className="divide-y divide-border">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(booking.id)}
                      onChange={() => toggleSelect(booking.id)}
                      className="w-5 h-5 rounded border-border mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-foreground">
                            {booking.service}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            # {booking.bookingNo}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-medium ${booking.statusColor}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-8 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Booking Date
                          </p>
                          <p className="text-sm font-medium text-accent">
                            {booking.date} · {booking.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Total paid
                          </p>
                          <p className="text-sm font-medium">
                            ₹{booking.price}
                          </p>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-accent font-medium text-sm hover:underline"
                      >
                        Booking Details ›
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
