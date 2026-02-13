"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  Clock,
  CreditCard,
  User,
  Scissors,
  Heart,
  ShoppingBag,
} from "lucide-react";

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const quickActions = [
    {
      id: 1,
      icon: <Scissors className="w-8 h-8" />,
      title: "Book an Appointment",
      description: "Haircut, styling, spa & more",
      href: "/services",
      bgColor: "from-red-100 to-red-50",
    },
    {
      id: 2,
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Explore Services",
      description: "Prices, duration & service details",
      href: "/services",
      bgColor: "from-amber-100 to-amber-50",
    },
    {
      id: 3,
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Salon Products",
      description: "Hair care, beard care & styling products",
      href: "/products",
      bgColor: "from-pink-100 to-pink-50",
    },
    {
      id: 4,
      icon: <Calendar className="w-8 h-8" />,
      title: "My Bookings",
      description: "View, reschedule or cancel bookings",
      href: "/my-bookings",
      bgColor: "from-blue-100 to-blue-50",
    },
    {
      id: 5,
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Talk to Expert",
      description: "Hair & skin consultation",
      href: "/chat",
      bgColor: "from-green-100 to-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Hey! How can I assist you today?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our services, book appointments, get personalized
            recommendations, or chat with our AI assistant
          </p>
        </div>

        {/* Browse Help Topics Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <p className="text-gray-500 text-center">Browse help topics</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link href={action.href} key={action.id}>
              <div
                onMouseEnter={() => setHoveredCard(action.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-gradient-to-br ${action.bgColor} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 h-full`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-primary">{action.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* AI Chat CTA */}
        <div className="mt-12 bg-accent text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Start AI Chat</h2>
          <p className="text-lg mb-6 text-white/90">
            Get instant answers to your questions about our services
          </p>
          <Link href="/chat">
            <button className="bg-white text-accent font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Open Chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

