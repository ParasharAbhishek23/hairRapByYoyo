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
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border overflow-y-auto hidden lg:flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="border-2 border-primary px-2 py-1 rounded">
              <span className="text-xs font-bold">HAIR RAP BY YOYO</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
          <button className="w-full flex items-center gap-2 bg-background px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground px-2 py-1">
            Chat History
          </h3>
          <div className="text-xs text-muted-foreground px-3 py-2">Today</div>

          {/* Actual Chat History */}
          {messages.slice(1).map((msg, idx) => (
            <div
              key={idx}
              onClick={() => {
                // Scroll to this message
                const element = document.getElementById(`message-${msg.id}`)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm truncate">
                {msg.sender === 'user' ? 'You' : 'AI Assistant'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick Actions Menu */}
          <div className="space-y-2 mt-4">
            <div className="px-3 py-2 bg-accent/10 rounded-lg cursor-pointer hover:bg-accent/20 transition">
              <div className="font-semibold text-sm text-accent">
                Book an Appointment
              </div>
              <div className="text-xs text-muted-foreground">
                Haircut, styling, spa & grooming ser
              </div>
            </div>

            <div 
              onClick={() => handleQuickAction('Hair care tips')}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm">Wellness Coach</div>
              <div className="text-xs text-muted-foreground">
                Hair & scalp care tips for today
              </div>
            </div>

            <div 
              onClick={() => handleQuickAction('Show all services')}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm">Explore Services</div>
              <div className="text-xs text-muted-foreground">
                Prices, duration & service details
              </div>
            </div>

            <div 
              onClick={() => handleQuickAction('Salon products')}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm">Salon Products</div>
              <div className="text-xs text-muted-foreground">
                Hair care, beard care & styling products
              </div>
            </div>

            <div 
              onClick={() => handleQuickAction('Current offers')}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm">Offers & Memberships</div>
              <div className="text-xs text-muted-foreground">
                Current deals, packages & loyalty plans
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="font-semibold text-sm">My Appointments</div>
              <div className="text-xs text-muted-foreground">
                View, reschedule or cancel bookings
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="font-semibold text-sm">Order Tracker</div>
              <div className="text-xs text-muted-foreground">
                Your product order is on the way 🚗
              </div>
            </div>

            <div 
              onClick={() => handleQuickAction('Hair consultation')}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-sm">Hair Consultation</div>
              <div className="text-xs text-muted-foreground">
                Personalized style & care advice
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">
            <User className="w-4 h-4" />
            Profile
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Hey! How can I assist you today?
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              U
            </div>
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
          {messages.length > 1 && (
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  id={`message-${msg.id}`}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-accent text-white rounded-br-none"
                        : "bg-white text-foreground border border-border rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Quick Actions */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action)}
                            className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-border px-4 sm:px-8 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs text-muted-foreground mb-3">
              Browse help topics
            </div>
            <div className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition text-muted-foreground">
                <Plus className="w-5 h-5" />
              </button>
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
                className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground"
              >
                <Send className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition text-muted-foreground">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition text-muted-foreground">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
