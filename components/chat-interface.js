"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Plus,
  Mic,
  Volume2,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    {
      icon: "✂️",
      title: "Book an Appointment",
      desc: "Haircut, styling, spa & grooming services",
    },
    {
      icon: "🔍",
      title: "Explore Services",
      desc: "Prices, duration & service details",
    },
    {
      icon: "💇",
      title: "Salon Products",
      desc: "Hair care, beard care & styling products",
    },
    {
      icon: "📅",
      title: "My Bookings",
      desc: "View, reschedule or cancel bookings",
    },
    {
      icon: "💬",
      title: "Talk to Expert",
      desc: "Hair & skin consultation",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const message = userMessage.toLowerCase()
    
    // Booking-related responses
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return {
        text: `I'd be happy to help you book an appointment! 💈\n\nWhat service are you looking for?\n\n• Haircut & Styling\n• Hair Color & Highlights\n• Hair Spa & Treatment\n• Beard Grooming\n• Makeup Services\n\nOr would you like to see all available services first?`,
        quickActions: ['Show All Services', 'Book Haircut', 'Book Hair Color', 'Book Spa Treatment']
      }
    }
    
    // Service-related responses
    if (message.includes('service') || message.includes('price') || message.includes('cost')) {
      return {
        text: `Here are our popular services and prices: 💰\n\n• Basic Haircut - ₹399\n• Premium Haircut - ₹699\n• Hair Color - ₹499\n• Hair Spa - ₹569\n• Makeup - ₹749\n• Nails - ₹459\n\nAll services include expert consultation. Would you like to book any of these?`,
        quickActions: ['Book Haircut', 'Book Hair Color', 'See All Services']
      }
    }
    
    // Time-related responses
    if (message.includes('time') || message.includes('available') || message.includes('when')) {
      return {
        text: `We have flexible timing to suit your schedule! ⏰\n\nAvailable slots:\n• Monday - Saturday: 9 AM to 8 PM\n• Sunday: 10 AM to 6 PM\n\nPopular time slots:\n• Morning: 9 AM - 12 PM\n• Afternoon: 12 PM - 4 PM\n• Evening: 4 PM - 8 PM\n\nWhat time works best for you?`,
        quickActions: ['Book Morning Slot', 'Book Evening Slot', 'Show Available Today']
      }
    }
    
    // Location-related responses
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return {
        text: `We have multiple locations for your convenience! 📍\n\n• Maryland City, MD, USA\n• New Jersey, USA\n• California, USA\n• Texas, USA\n\nWhich location would you prefer? I can show you available slots at each location.`,
        quickActions: ['Maryland Location', 'New Jersey Location', 'All Locations']
      }
    }
    
    // My bookings
    if (message.includes('my booking') || message.includes('my appointment') || message.includes('reschedule')) {
      return {
        text: `You can manage all your bookings in one place! 📅\n\n• View upcoming appointments\n• Reschedule if needed\n• Cancel bookings\n• Booking history\n\nWould you like me to take you to your bookings page?`,
        quickActions: ['View My Bookings', 'Reschedule Booking', 'Cancel Booking']
      }
    }
    
    // Help and support
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return {
        text: `I'm here to help you with anything! 🤝\n\nI can assist with:\n• Booking appointments\n• Service information\n• Pricing and packages\n• Location details\n• Managing bookings\n• General questions\n\nWhat would you like help with?`,
        quickActions: ['Book Appointment', 'Service Info', 'Contact Support']
      }
    }
    
    // Fallback response
    return {
      text: `Thanks for your message! 😊\n\nI'm here to help with:\n• Booking appointments\n• Service information and pricing\n• Available time slots\n• Managing your bookings\n• Location details\n\nCould you please let me know what specific information you need?`,
      quickActions: ['Book Appointment', 'Show Services', 'View My Bookings']
    }
  }

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await generateAIResponse(text)
      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        quickActions: response.quickActions || []
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment. 🙏",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Only Chat History */}
      <div className="w-64 bg-white border-r border-border flex flex-col">
        {/* Chat History - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-3">
            Chat History
          </h3>
          <div className="text-xs text-muted-foreground px-3 py-2 mb-3">Today</div>

          {/* Actual Chat History */}
          {messages.slice(1).map((msg, idx) => (
            <div
              key={idx}
              onClick={() => {
                // Scroll to this message
                const element = document.getElementById(`message-${msg.id}`)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition mb-2"
            >
              <div className="font-semibold text-sm truncate">
                {msg.sender === 'user' ? 'You' : 'AI Assistant'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fixed Buttons */}
        <div className="border-t border-border p-3 space-y-2">
          <button className="w-full flex items-center gap-2 bg-background px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">
              <User className="w-4 h-4" />
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Hey! How can I assist you today?
          </h1>
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
          {messages.length === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Browse help topics</h2>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {quickActions.slice(0, 3).map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action.title)}
                    className="p-6 bg-white border border-border rounded-lg hover:shadow-lg transition text-left"
                  >
                    <div className="text-4xl mb-3">{action.icon}</div>
                    <h3 className="font-bold text-foreground mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.slice(3).map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action.title)}
                    className="p-6 bg-white border border-border rounded-lg hover:shadow-lg transition text-left"
                  >
                    <div className="text-4xl mb-3">{action.icon}</div>
                    <h3 className="font-bold text-foreground mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.slice(1).map((msg) => (
            <div
              key={msg.id}
              id={`message-${msg.id}`}
              className={`flex mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-lg px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.quickActions ? (
                  <div>
                    <p className="mb-3">{msg.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm ml-3 flex-shrink-0">
                  U
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Box at Bottom */}
        <div className="border-t border-border bg-white p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Mic className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="bg-accent text-white p-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
